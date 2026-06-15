"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { isLearner, getSessionLearner } from "@/lib/learner-auth";
import { certificateId } from "@/lib/utils";

async function requireLearner() {
  if (!(await isLearner())) redirect("/login");
  const learner = await getSessionLearner();
  if (!learner) redirect("/login");
  return learner;
}

export async function markLessonComplete(formData: FormData) {
  const learner = await requireLearner();
  const lessonId = String(formData.get("lessonId") ?? "");
  const courseId = String(formData.get("courseId") ?? "");
  const courseSlug = String(formData.get("courseSlug") ?? "");
  if (!lessonId || !courseId) return;

  // Upsert LessonProgress → COMPLETED.
  await prisma.lessonProgress.upsert({
    where: { learnerId_lessonId: { learnerId: learner.id, lessonId } },
    create: {
      learnerId: learner.id,
      lessonId,
      status: "COMPLETED",
      completedAt: new Date(),
    },
    update: { status: "COMPLETED", completedAt: new Date() },
  });

  // Recalculate enrollment progress.
  const [totalLessons, completedLessons] = await Promise.all([
    prisma.lesson.count({ where: { module: { courseId } } }),
    prisma.lessonProgress.count({
      where: {
        learnerId: learner.id,
        status: "COMPLETED",
        lesson: { module: { courseId } },
      },
    }),
  ]);

  const progressPct =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  await prisma.enrollment.updateMany({
    where: { learnerId: learner.id, courseId },
    data: {
      progressPct,
      status: progressPct > 0 ? "IN_PROGRESS" : "NOT_STARTED",
    },
  });

  revalidatePath(`/dashboard/courses/${courseSlug}`);
  revalidatePath(`/dashboard/courses`);
}

export async function enrollInCourse(formData: FormData) {
  const learner = await requireLearner();
  const courseId = String(formData.get("courseId") ?? "");
  const courseSlug = String(formData.get("courseSlug") ?? "");
  if (!courseId || !courseSlug) return;

  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course || course.access !== "FREE") return;

  const existing = await prisma.enrollment.findUnique({
    where: { learnerId_courseId: { learnerId: learner.id, courseId } },
  });
  if (existing) {
    redirect(`/dashboard/courses/${courseSlug}`);
  }

  await prisma.enrollment.create({
    data: { learnerId: learner.id, courseId, status: "NOT_STARTED", funded: false },
  });

  revalidatePath("/dashboard/courses");
  redirect(`/dashboard/courses/${courseSlug}`);
}

export async function submitQuiz(formData: FormData) {
  const learner = await requireLearner();
  const quizId = String(formData.get("quizId") ?? "");
  const courseSlug = String(formData.get("courseSlug") ?? "");
  if (!quizId) return;

  // Block duplicate PASSED submissions.
  const alreadyPassed = await prisma.quizAttempt.findFirst({
    where: { quizId, learnerId: learner.id, status: "PASSED" },
  });
  if (alreadyPassed) redirect(`/dashboard/courses/${courseSlug}/quiz/${quizId}`);

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: { orderBy: { order: "asc" } },
      course: { select: { id: true, title: true, cpdHours: true } },
    },
  });
  if (!quiz) return;

  // Grade the attempt.
  let score = 0;
  const answers: Record<string, number> = {};
  for (const q of quiz.questions) {
    const raw = formData.get(`answer_${q.id}`);
    if (raw === null) continue;
    const selected = Number(raw);
    answers[q.id] = selected;
    const correct = (q.correctAnswer as { index: number } | null)?.index;
    if (correct !== undefined && selected === correct) score += q.points;
  }

  const totalPoints = quiz.questions.reduce((s, q) => s + q.points, 0);
  const scorePct = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;
  const passed = scorePct >= quiz.passMark;
  const status = passed ? "PASSED" : "FAILED";

  await prisma.quizAttempt.create({
    data: {
      quizId,
      learnerId: learner.id,
      status,
      score,
      answers,
      submittedAt: new Date(),
    },
  });

  // On pass + final assessment: complete enrollment + issue certificate.
  if (passed && quiz.isFinalAssessment) {
    await prisma.enrollment.updateMany({
      where: { learnerId: learner.id, courseId: quiz.courseId },
      data: { status: "COMPLETED", progressPct: 100, completedAt: new Date() },
    });

    const existingCert = await prisma.certificate.findFirst({
      where: { learnerId: learner.id, courseId: quiz.courseId },
    });

    if (!existingCert) {
      const certCount = await prisma.certificate.count();
      await prisma.certificate.create({
        data: {
          certificateId: certificateId(new Date().getFullYear(), 2000 + certCount),
          learnerId: learner.id,
          courseId: quiz.courseId,
          title: quiz.course.title,
          cpdHours: quiz.course.cpdHours,
          completionDate: new Date(),
          status: "ACTIVE",
        },
      });
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/certificates");
  }

  revalidatePath(`/dashboard/courses/${courseSlug}/quiz/${quizId}`);
  redirect(`/dashboard/courses/${courseSlug}/quiz/${quizId}`);
}
