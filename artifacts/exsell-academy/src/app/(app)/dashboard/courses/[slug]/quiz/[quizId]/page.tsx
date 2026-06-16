import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Award, Check, ChevronRight, RefreshCw, XCircle } from "lucide-react";
import {
  useLearnerStore,
  getQuizById,
  getEnrollment,
  getLastAttempt,
  getCertificateForCourse,
} from "@/lib/data/learner-demo";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { QuizPlayer } from "@/components/learner/quiz-player";

export default function QuizPage() {
  useLearnerStore();
  const { slug, quizId } = useParams<{ slug: string; quizId: string }>();
  const searchParams = useSearchParams();
  const isRetry = searchParams.get("retry") === "1";

  const quiz = getQuizById(quizId);

  if (!quiz || quiz.course.slug !== slug) {
    return (
      <div className="mx-auto max-w-3xl py-16 text-center">
        <p className="font-semibold text-navy">Assessment not found</p>
        <p className="mt-1 text-sm text-slate-500">
          The assessment you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href={`/dashboard/courses/${slug}`}
          className={buttonVariants({ variant: "primary", size: "md", className: "mt-6" })}
        >
          Back to course
        </Link>
      </div>
    );
  }

  const enrollment = getEnrollment(quiz.courseId);
  const lastAttempt = getLastAttempt(quiz.id);

  const passed = lastAttempt?.status === "PASSED";
  const failed = lastAttempt?.status === "FAILED";
  // A pass is terminal. A failure shows the result by default, but a "Try again"
  // (?retry=1) re-renders the form so the learner can re-attempt.
  const showResult = passed || (failed && !isRetry);

  // Certificate (if passed and final assessment).
  const certificate =
    passed && quiz.isFinalAssessment
      ? getCertificateForCourse(quiz.courseId)
      : null;

  const totalPoints = quiz.questions.reduce((s, q) => s + q.points, 0);
  const score = lastAttempt?.score ?? 0;
  const scorePct = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;

  // Shape questions for the client component (strip correctAnswer).
  const clientQuestions = quiz.questions.map((q) => ({
    id: q.id,
    prompt: q.prompt,
    type: q.type,
    options: q.options ?? [],
    order: q.order,
  }));

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link
          href="/dashboard/courses"
          className="transition-colors hover:text-brand-600"
        >
          My Courses
        </Link>
        <ChevronRight className="size-4" />
        <Link
          href={`/dashboard/courses/${slug}`}
          className="transition-colors hover:text-brand-600"
        >
          {quiz.course.title}
        </Link>
        <ChevronRight className="size-4" />
        <span className="font-semibold text-navy">{quiz.title}</span>
      </nav>

      <GlassCard className="p-6 sm:p-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <Badge tone={quiz.isFinalAssessment ? "accent" : "brand"}>
              {quiz.isFinalAssessment ? "Final assessment" : "Module quiz"}
            </Badge>
            <h1 className="mt-3 font-display text-2xl font-extrabold text-navy sm:text-3xl">
              {quiz.title}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {quiz.questions.length} question
              {quiz.questions.length !== 1 ? "s" : ""} · Pass mark{" "}
              {quiz.passMark}%
            </p>
          </div>
        </div>

        {/* Result screen */}
        {showResult ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-slate-100 bg-slate-50/60 py-10 text-center">
              <ProgressRing
                value={scorePct}
                size={120}
                stroke={10}
                ringClassName={passed ? "text-accent-500" : "text-red-400"}
              >
                <span className="text-2xl font-extrabold text-navy">
                  {scorePct}%
                </span>
              </ProgressRing>

              {passed ? (
                <div>
                  <Badge tone="accent" className="mb-2">
                    <Check className="size-3.5" strokeWidth={3} />
                    Passed
                  </Badge>
                  <p className="font-bold text-navy">
                    Well done! You scored {score}/{totalPoints}.
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    You needed {quiz.passMark}% to pass.
                  </p>
                </div>
              ) : (
                <div>
                  <Badge tone="neutral" className="mb-2">
                    <XCircle className="size-3.5" />
                    Not passed
                  </Badge>
                  <p className="font-bold text-navy">
                    You scored {score}/{totalPoints} ({scorePct}%).
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    You need {quiz.passMark}% to pass. Review the lessons and
                    try again.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {!passed && enrollment ? (
                <Link
                  href={`/dashboard/courses/${slug}/quiz/${quizId}?retry=1`}
                  className={buttonVariants({ variant: "primary", size: "md" })}
                >
                  <RefreshCw className="size-4" />
                  Try again
                </Link>
              ) : null}

              {certificate ? (
                <Link
                  href={`/verify/${certificate.certificateId}`}
                  className={buttonVariants({ variant: "accent", size: "md" })}
                >
                  <Award className="size-4" />
                  View certificate
                </Link>
              ) : null}

              <Link
                href={`/dashboard/courses/${slug}`}
                className={buttonVariants({
                  variant: "secondary",
                  size: "md",
                })}
              >
                Back to course
              </Link>
            </div>
          </div>
        ) : (
          /* Quiz form — allow retake on failure */
          enrollment ? (
            <QuizPlayer
              quiz={{ ...quiz, questions: clientQuestions }}
              courseSlug={slug}
            />
          ) : (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
              You need to be enrolled in this course to take the assessment.
            </div>
          )
        )}
      </GlassCard>
    </div>
  );
}
