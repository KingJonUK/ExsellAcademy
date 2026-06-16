import { useSyncExternalStore } from "react";
import { courses as catalogue } from "@/lib/data/courses";
import { certificateId } from "@/lib/utils";

/**
 * Client-side demo store for the LEARNER area (Sofia Ahmed persona).
 *
 * Mirrors the shapes the original Prisma-backed pages expected (courses with
 * modules/lessons, enrollments, lesson progress, certificates, a final-
 * assessment quiz + attempts) but holds everything in-memory and exposes a
 * tiny reactive store so that enroll / mark-complete / quiz-submit mutations
 * update the UI via React state.
 */

export type LessonType = "VIDEO" | "READING" | "EXERCISE" | "QUIZ";
export type EnrollmentStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export const DEMO_LEARNER = {
  id: "learner-sofia",
  talentReadinessScore: 87,
  user: {
    name: "Sofia Ahmed",
    email: "sofia.ahmed@talent.example.com",
  },
};

export interface DemoLesson {
  id: string;
  title: string;
  type: LessonType;
  durationMinutes: number;
  order: number;
  body: string | null;
  moduleId: string;
  courseId: string;
  /** Linked quiz id when this lesson is a graded quiz, otherwise null. */
  quiz: { id: string } | null;
}

export interface DemoModule {
  id: string;
  title: string;
  order: number;
  courseId: string;
  lessons: DemoLesson[];
}

export interface DemoCourse {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: string;
  access: string;
  icon: string;
  durationMinutes: number;
  cpdHours: number;
  certificate: boolean;
  modules: DemoModule[];
}

export interface DemoQuestion {
  id: string;
  prompt: string;
  type: string;
  options: string[];
  order: number;
  points: number;
  correctAnswer: { index: number };
}

export interface DemoQuiz {
  id: string;
  courseId: string;
  title: string;
  passMark: number;
  isFinalAssessment: boolean;
  course: { id: string; title: string; slug: string; cpdHours: number };
  questions: DemoQuestion[];
}

export interface DemoEnrollment {
  id: string;
  courseId: string;
  status: EnrollmentStatus;
  progressPct: number;
  funded: boolean;
  enrolledAt: Date;
  completedAt: Date | null;
}

export interface DemoCertificate {
  id: string;
  certificateId: string;
  courseId: string;
  title: string;
  cpdHours: number;
  issuedAt: Date;
  completionDate: Date;
  status: "ACTIVE";
  course: { slug: string };
}

export interface DemoQuizAttempt {
  id: string;
  quizId: string;
  status: "PASSED" | "FAILED";
  score: number;
  answers: Record<string, number>;
  startedAt: Date;
  submittedAt: Date;
}

// ---------------------------------------------------------------------------
// Build the course/module/lesson graph from the static catalogue.
// ---------------------------------------------------------------------------

const PROSPECTING_FINAL_QUIZ_ID = "quiz-prospecting-final";

/** Lesson body content keyed by lesson title (mirrors the original seed). */
const lessonBodies: Record<string, string> = {
  "Ideal customer profiles in plain English":
    "An **Ideal Customer Profile (ICP)** is a description of the company (or person) that would get the most value from your product and, in turn, be most valuable to you.\n\n" +
    "**Why it matters:** Without an ICP, you prospect at random. With one, every outreach effort is targeted at buyers who actually need what you sell.\n\n" +
    "**Three questions to define your ICP:**\n" +
    "- What industry or vertical is your best-fit customer in?\n" +
    "- What size is their team or company?\n" +
    "- What pain do they feel that your product solves?\n\n" +
    "Once you can answer those three questions, you have the foundation of a prospect list that converts.",
  "Research in five minutes":
    "Great outreach starts with great research — but most reps spend too long on it. Here is a five-minute research framework:\n\n" +
    "**Minute 1–2: LinkedIn**\n" +
    "- Check the prospect's current role and how long they've been in it\n" +
    "- Look for recent posts or comments that reveal their priorities\n\n" +
    "**Minute 3: Company news**\n" +
    "- Search '[Company name] news 2026' — look for funding, product launches, hiring sprees or leadership changes\n\n" +
    "**Minute 4: Their website**\n" +
    "- What do they sell? Who are their customers?\n\n" +
    "**Minute 5: Write one insight**\n" +
    "- Turn your research into one personalised observation you'll use in the first line of your email.\n\n" +
    "Five minutes. One insight. That's all you need to stand out.",
  "Build your first target list":
    "**Exercise: Build a 10-prospect target list**\n\n" +
    "Using your ICP definition from the previous lesson, identify 10 companies that match. For each, find the name and email of the decision-maker you'd contact.\n\n" +
    "**Tools to use:**\n" +
    "- LinkedIn Sales Navigator (free trial available)\n" +
    "- Apollo.io (generous free tier)\n" +
    "- Hunter.io (email finder)\n\n" +
    "Aim for quality over quantity. A list of 10 well-researched prospects beats a list of 100 cold names every time.",
  "The first line is everything":
    "The first line of your cold email is the only line that determines whether the rest gets read.\n\n" +
    "**What not to write:**\n" +
    "- 'I hope this email finds you well...'\n" +
    "- 'My name is [X] and I work at [Y]...'\n" +
    "- 'I wanted to reach out because...'\n\n" +
    "**What to write instead:**\n" +
    "Personalise it. Reference something real. Use your research.\n\n" +
    "> 'Saw your post about scaling the BDR team — congrats on the Series B. Most teams at that stage hit a prospecting bottleneck around month 3.'\n\n" +
    "That first line shows you did your homework. It creates curiosity. It gets the rest of the email read.",
  "Tracking the metrics that matter":
    "Most SDRs track the wrong metrics. Here's what actually moves the needle:\n\n" +
    "**Vanity metrics (ignore):**\n" +
    "- Number of emails sent\n" +
    "- Open rate (unreliable since Apple MPP)\n\n" +
    "**Signal metrics (track these):**\n" +
    "- Reply rate (target 5–10%)\n" +
    "- Positive reply rate (target 2–4%)\n" +
    "- Meetings booked per 100 prospects (target 3–5)\n\n" +
    "**Weekly review habit:**\n" +
    "Every Friday, spend 10 minutes reviewing your numbers. Which sequence had the best reply rate? Which opening line worked? What should you test next week?\n\n" +
    "Consistent measurement beats hoping you'll remember what worked.",
};

function buildCourses(): DemoCourse[] {
  return catalogue.map((course) => {
    const courseId = course.slug;
    const isProspecting = course.slug === "prospecting-essentials";
    const lastModuleIndex = course.modules.length - 1;

    const modules: DemoModule[] = course.modules.map((mod, mIdx) => {
      const moduleId = `${courseId}-m${mIdx}`;
      const lastLessonIndex = mod.lessons.length - 1;

      const lessons: DemoLesson[] = mod.lessons.map((lesson, lIdx) => {
        const id = `${courseId}-m${mIdx}-l${lIdx}`;
        const type = lesson.type.toUpperCase() as LessonType;
        const isFinalLesson =
          mIdx === lastModuleIndex && lIdx === lastLessonIndex;
        const quiz =
          isProspecting && isFinalLesson && type === "QUIZ"
            ? { id: PROSPECTING_FINAL_QUIZ_ID }
            : null;
        return {
          id,
          title: lesson.title,
          type,
          durationMinutes: lesson.minutes,
          order: lIdx,
          body: lessonBodies[lesson.title] ?? null,
          moduleId,
          courseId,
          quiz,
        };
      });

      return { id: moduleId, title: mod.title, order: mIdx, courseId, lessons };
    });

    return {
      id: courseId,
      slug: course.slug,
      title: course.title,
      subtitle: course.subtitle,
      description: course.description,
      category: course.category,
      level: course.level,
      access: course.access.toUpperCase(),
      icon: course.icon,
      durationMinutes: course.durationHours * 60,
      cpdHours: course.cpdHours,
      certificate: course.certificate,
      modules,
    };
  });
}

const demoCourses = buildCourses();
const coursesById = new Map(demoCourses.map((c) => [c.id, c]));
const coursesBySlug = new Map(demoCourses.map((c) => [c.slug, c]));

function buildProspectingQuiz(): DemoQuiz {
  const prospecting = coursesBySlug.get("prospecting-essentials")!;
  const questions: { prompt: string; options: string[]; correctIndex: number }[] = [
    {
      prompt: "What does ICP stand for in B2B sales?",
      options: [
        "Ideal Customer Profile",
        "Internal Contact Person",
        "Inbound Channel Process",
        "Integrated Campaign Plan",
      ],
      correctIndex: 0,
    },
    {
      prompt:
        "Which of the following best describes an effective cold email opening line?",
      options: [
        "Start with your company name and what you do",
        "Begin with 'I hope this email finds you well'",
        "Reference a specific, relevant insight about the prospect",
        "List all the features of your product upfront",
      ],
      correctIndex: 2,
    },
    {
      prompt: "What is a 'cadence' in prospecting?",
      options: [
        "A single follow-up email sent after no reply",
        "A scripted phone call introduction",
        "A structured sequence of outreach touchpoints across channels",
        "A type of CRM pipeline stage",
      ],
      correctIndex: 2,
    },
    {
      prompt: "Which metric is most useful for measuring cold outreach effectiveness?",
      options: ["Email open rate", "Reply rate", "Number of emails sent", "Bounce rate"],
      correctIndex: 1,
    },
    {
      prompt: "When a prospect doesn't reply to your first outreach, you should:",
      options: [
        "Give up and move to the next prospect immediately",
        "Send the exact same message again the following day",
        "Wait indefinitely without following up",
        "Follow up with a different angle or channel after a few days",
      ],
      correctIndex: 3,
    },
  ];

  return {
    id: PROSPECTING_FINAL_QUIZ_ID,
    courseId: prospecting.id,
    title: "Prospecting Essentials: Final Assessment",
    passMark: 80,
    isFinalAssessment: true,
    course: {
      id: prospecting.id,
      title: prospecting.title,
      slug: prospecting.slug,
      cpdHours: prospecting.cpdHours,
    },
    questions: questions.map((q, i) => ({
      id: `${PROSPECTING_FINAL_QUIZ_ID}-q${i}`,
      prompt: q.prompt,
      type: "MULTIPLE_CHOICE",
      options: q.options,
      order: i,
      points: 1,
      correctAnswer: { index: q.correctIndex },
    })),
  };
}

const demoQuizzes = [buildProspectingQuiz()];
const quizzesById = new Map(demoQuizzes.map((q) => [q.id, q]));

// ---------------------------------------------------------------------------
// Mutable reactive store.
// ---------------------------------------------------------------------------

interface LearnerState {
  enrollments: DemoEnrollment[];
  lessonProgress: Record<string, { status: "COMPLETED"; completedAt: Date }>;
  certificates: DemoCertificate[];
  quizAttempts: DemoQuizAttempt[];
}

function seedState(): LearnerState {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  const enrollments: DemoEnrollment[] = [
    {
      id: "enr-prospecting",
      courseId: "prospecting-essentials",
      status: "IN_PROGRESS",
      progressPct: 40,
      funded: false,
      enrolledAt: new Date(now - 1 * day),
      completedAt: null,
    },
    {
      id: "enr-ai",
      courseId: "ai-for-sales",
      status: "IN_PROGRESS",
      progressPct: 20,
      funded: false,
      enrolledAt: new Date(now - 2 * day),
      completedAt: null,
    },
    {
      id: "enr-interview",
      courseId: "interview-readiness",
      status: "NOT_STARTED",
      progressPct: 0,
      funded: false,
      enrolledAt: new Date(now - 3 * day),
      completedAt: null,
    },
  ];

  // First 4 lessons of prospecting-essentials completed → 40%.
  const prospecting = coursesById.get("prospecting-essentials")!;
  const prospectingLessons = prospecting.modules.flatMap((m) => m.lessons);
  const lessonProgress: LearnerState["lessonProgress"] = {};
  for (const lesson of prospectingLessons.slice(0, 4)) {
    lessonProgress[lesson.id] = {
      status: "COMPLETED",
      completedAt: new Date("2026-06-10"),
    };
  }

  // Sofia already holds two certificates from earlier courses.
  const certificates: DemoCertificate[] = [
    makeCertificate("sales-foundations", "EXS-2026-001001", new Date("2026-05-20")),
    makeCertificate("communication-skills", "EXS-2026-001002", new Date("2026-05-20")),
  ];

  return { enrollments, lessonProgress, certificates, quizAttempts: [] };
}

function makeCertificate(
  courseId: string,
  certId: string,
  date: Date,
): DemoCertificate {
  const course = coursesById.get(courseId)!;
  return {
    id: `cert-${courseId}`,
    certificateId: certId,
    courseId,
    title: course.title,
    cpdHours: course.cpdHours,
    issuedAt: date,
    completionDate: date,
    status: "ACTIVE",
    course: { slug: course.slug },
  };
}

let state: LearnerState = seedState();

const listeners = new Set<() => void>();

function emit() {
  // Replace top-level refs so consumers reading the snapshot re-render.
  state = {
    enrollments: [...state.enrollments],
    lessonProgress: { ...state.lessonProgress },
    certificates: [...state.certificates],
    quizAttempts: [...state.quizAttempts],
  };
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot() {
  return state;
}

/** Subscribe a component to the learner store; returns the current snapshot. */
export function useLearnerStore(): LearnerState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

// ---------------------------------------------------------------------------
// Read selectors.
// ---------------------------------------------------------------------------

export function getSessionLearner() {
  return DEMO_LEARNER;
}

export function getCourseBySlug(slug: string): DemoCourse | undefined {
  return coursesBySlug.get(slug);
}

export function getCourseById(id: string): DemoCourse | undefined {
  return coursesById.get(id);
}

export function getQuizById(id: string): DemoQuiz | undefined {
  return quizzesById.get(id);
}

export function getLessonById(id: string): DemoLesson | undefined {
  for (const course of demoCourses) {
    for (const mod of course.modules) {
      const found = mod.lessons.find((l) => l.id === id);
      if (found) return found;
    }
  }
  return undefined;
}

export function listEnrollments(): (DemoEnrollment & { course: DemoCourse })[] {
  return [...state.enrollments]
    .sort((a, b) => b.enrolledAt.getTime() - a.enrolledAt.getTime())
    .map((e) => ({ ...e, course: coursesById.get(e.courseId)! }));
}

export function getEnrollment(courseId: string): DemoEnrollment | undefined {
  return state.enrollments.find((e) => e.courseId === courseId);
}

export function listCertificates(): DemoCertificate[] {
  return [...state.certificates].sort(
    (a, b) => b.issuedAt.getTime() - a.issuedAt.getTime(),
  );
}

export function getCertificateForCourse(
  courseId: string,
): DemoCertificate | undefined {
  return state.certificates.find((c) => c.courseId === courseId);
}

export function isLessonComplete(lessonId: string): boolean {
  return state.lessonProgress[lessonId]?.status === "COMPLETED";
}

export function getLastAttempt(quizId: string): DemoQuizAttempt | undefined {
  const attempts = state.quizAttempts.filter((a) => a.quizId === quizId);
  if (attempts.length === 0) return undefined;
  return attempts.reduce((latest, a) =>
    a.startedAt.getTime() > latest.startedAt.getTime() ? a : latest,
  );
}

// ---------------------------------------------------------------------------
// Mutations.
// ---------------------------------------------------------------------------

function issueCertificate(courseId: string) {
  const course = coursesById.get(courseId);
  if (!course || !course.certificate) return;
  if (state.certificates.some((c) => c.courseId === courseId)) return;
  const now = new Date();
  state.certificates.push({
    id: `cert-${courseId}-${now.getTime()}`,
    certificateId: certificateId(now.getFullYear(), 2000 + state.certificates.length),
    courseId,
    title: course.title,
    cpdHours: course.cpdHours,
    issuedAt: now,
    completionDate: now,
    status: "ACTIVE",
    course: { slug: course.slug },
  });
}

/** Enroll the demo learner in a FREE course. Returns the course slug. */
export function enrollInCourse(courseId: string): string | null {
  const course = coursesById.get(courseId);
  if (!course || course.access !== "FREE") return null;
  if (!state.enrollments.some((e) => e.courseId === courseId)) {
    state.enrollments.push({
      id: `enr-${courseId}-${Date.now()}`,
      courseId,
      status: "NOT_STARTED",
      progressPct: 0,
      funded: false,
      enrolledAt: new Date(),
      completedAt: null,
    });
    emit();
  }
  return course.slug;
}

/** Mark a lesson complete and recompute the course's progress. */
export function markLessonComplete(lessonId: string, courseId: string): void {
  const enrollment = state.enrollments.find((e) => e.courseId === courseId);
  if (!enrollment) return;

  state.lessonProgress[lessonId] = {
    status: "COMPLETED",
    completedAt: new Date(),
  };

  const course = coursesById.get(courseId);
  if (!course) return;
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter(
    (l) => state.lessonProgress[l.id]?.status === "COMPLETED",
  ).length;

  const progressPct =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const hasFinalQuiz = demoQuizzes.some(
    (q) => q.courseId === courseId && q.isFinalAssessment,
  );
  const fullyComplete = progressPct === 100 && !hasFinalQuiz;

  enrollment.progressPct = progressPct;
  enrollment.status = fullyComplete
    ? "COMPLETED"
    : progressPct > 0
      ? "IN_PROGRESS"
      : "NOT_STARTED";
  if (fullyComplete) {
    enrollment.completedAt = new Date();
    issueCertificate(courseId);
  }

  emit();
}

export interface QuizResult {
  status: "PASSED" | "FAILED";
  score: number;
  totalPoints: number;
  scorePct: number;
}

/** Grade and record a quiz attempt. Returns the graded result. */
export function submitQuiz(
  quizId: string,
  answers: Record<string, number>,
): QuizResult | null {
  const quiz = quizzesById.get(quizId);
  if (!quiz) return null;

  const enrollment = state.enrollments.find((e) => e.courseId === quiz.courseId);
  if (!enrollment) return null;

  const alreadyPassed = state.quizAttempts.find(
    (a) => a.quizId === quizId && a.status === "PASSED",
  );

  let score = 0;
  for (const q of quiz.questions) {
    const selected = answers[q.id];
    if (selected === undefined) continue;
    if (selected === q.correctAnswer.index) score += q.points;
  }
  const totalPoints = quiz.questions.reduce((s, q) => s + q.points, 0);
  const scorePct = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;

  if (alreadyPassed) {
    return {
      status: "PASSED",
      score: alreadyPassed.score,
      totalPoints,
      scorePct:
        totalPoints > 0
          ? Math.round((alreadyPassed.score / totalPoints) * 100)
          : 0,
    };
  }

  const passed = scorePct >= quiz.passMark;
  const status = passed ? "PASSED" : "FAILED";
  const now = new Date();

  state.quizAttempts.push({
    id: `attempt-${quizId}-${now.getTime()}`,
    quizId,
    status,
    score,
    answers,
    startedAt: now,
    submittedAt: now,
  });

  if (passed && quiz.isFinalAssessment) {
    enrollment.status = "COMPLETED";
    enrollment.progressPct = 100;
    enrollment.completedAt = now;
    issueCertificate(quiz.courseId);
  }

  emit();
  return { status, score, totalPoints, scorePct };
}
