/**
 * Client-side learner mutations. These now delegate to the in-memory demo
 * store (see `@/lib/data/learner-demo`) instead of Prisma + server actions.
 */
export {
  enrollInCourse,
  markLessonComplete,
  submitQuiz,
  type QuizResult,
} from "@/lib/data/learner-demo";
