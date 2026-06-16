import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Award,
  Check,
  ChevronRight,
  Lock,
  PlayCircle,
} from "lucide-react";
import {
  useLearnerStore,
  getCourseBySlug,
  getEnrollment,
  isLessonComplete,
} from "@/lib/data/learner-demo";
import { GlassCard } from "@/components/ui/glass-card";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { ProgressRing } from "@/components/ui/progress-ring";
import { cn } from "@/lib/utils";

type LessonType = "VIDEO" | "READING" | "EXERCISE" | "QUIZ";

const lessonTypeLabel: Record<LessonType, string> = {
  VIDEO: "Video",
  READING: "Reading",
  EXERCISE: "Exercise",
  QUIZ: "Quiz",
};

const lessonTypeTone: Record<LessonType, string> = {
  VIDEO: "text-brand-600",
  READING: "text-violet-600",
  EXERCISE: "text-amber-600",
  QUIZ: "text-accent-600",
};

export default function CourseOverviewPage() {
  useLearnerStore();
  const { slug } = useParams<{ slug: string }>();
  const course = getCourseBySlug(slug);

  if (!course) {
    return (
      <div className="mx-auto max-w-5xl py-16 text-center">
        <p className="font-semibold text-navy">Course not found</p>
        <p className="mt-1 text-sm text-slate-500">
          The course you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/dashboard/courses"
          className={buttonVariants({ variant: "primary", size: "md", className: "mt-6" })}
        >
          Back to My Courses
        </Link>
      </div>
    );
  }

  const enrollment = getEnrollment(course.id);

  const allLessons = course.modules.flatMap((m) => m.lessons);
  const completedIds = new Set(
    allLessons.filter((l) => isLessonComplete(l.id)).map((l) => l.id),
  );

  // First incomplete lesson for "Continue" button.
  const nextLesson = allLessons.find((l) => !completedIds.has(l.id));

  return (
    <div className="mx-auto max-w-5xl">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link
          href="/dashboard/courses"
          className="hover:text-brand-600 transition-colors"
        >
          My Courses
        </Link>
        <ChevronRight className="size-4" />
        <span className="font-semibold text-navy">{course.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Left: module/lesson tree */}
        <div className="space-y-6">
          {/* Course header */}
          <div className="flex items-center gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-violet-50 text-brand-600 ring-1 ring-brand-100">
              <Icon name={course.icon ?? "BookOpen"} className="size-7" />
            </span>
            <div>
              <h1 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
                {course.title}
              </h1>
              <p className="mt-1 text-sm text-slate-600">{course.subtitle}</p>
            </div>
          </div>

          {/* Module list */}
          <div className="space-y-4">
            {course.modules.map((mod, mIdx) => (
              <GlassCard key={mod.id} className="overflow-hidden p-0">
                <div className="border-b border-slate-100 bg-slate-50/60 px-5 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Module {mIdx + 1}
                  </p>
                  <h2 className="font-bold text-navy">{mod.title}</h2>
                </div>
                <ul className="divide-y divide-slate-100">
                  {mod.lessons.map((lesson) => {
                    const done = completedIds.has(lesson.id);
                    const isQuiz = lesson.type === "QUIZ";
                    const href = isQuiz && lesson.quiz
                      ? `/dashboard/courses/${slug}/quiz/${lesson.quiz.id}`
                      : `/dashboard/courses/${slug}/${lesson.id}`;
                    const typeKey = lesson.type as LessonType;

                    return (
                      <li key={lesson.id}>
                        <Link
                          href={href}
                          className={cn(
                            "flex items-center gap-3 px-5 py-3.5 text-sm transition-colors hover:bg-slate-50",
                            done ? "text-slate-500" : "text-navy",
                          )}
                        >
                          <span
                            className={cn(
                              "grid size-6 shrink-0 place-items-center rounded-full",
                              done
                                ? "bg-accent-500 text-white"
                                : "border-2 border-slate-200 text-slate-300",
                            )}
                          >
                            {done ? (
                              <Check
                                className="size-3.5"
                                strokeWidth={3}
                                aria-hidden="true"
                              />
                            ) : (
                              <Lock className="size-3" aria-hidden="true" />
                            )}
                          </span>
                          <span className="min-w-0 flex-1">{lesson.title}</span>
                          <span
                            className={cn(
                              "shrink-0 text-xs font-medium",
                              lessonTypeTone[typeKey],
                            )}
                          >
                            {lessonTypeLabel[typeKey]} ·{" "}
                            {lesson.durationMinutes}m
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Right: progress sidebar */}
        <aside className="space-y-5">
          <GlassCard className="p-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <ProgressRing
                value={enrollment?.progressPct ?? 0}
                size={100}
                stroke={8}
                ringClassName={
                  enrollment?.status === "COMPLETED"
                    ? "text-accent-500"
                    : "text-brand-600"
                }
              >
                <span className="text-xl font-extrabold text-navy">
                  {enrollment?.progressPct ?? 0}%
                </span>
              </ProgressRing>

              <div>
                <p className="font-bold text-navy">
                  {enrollment?.status === "COMPLETED"
                    ? "Completed!"
                    : enrollment?.status === "NOT_STARTED"
                      ? "Not started"
                      : "In progress"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {completedIds.size} / {allLessons.length} lessons complete
                </p>
              </div>

              {enrollment ? (
                nextLesson ? (
                  <Link
                    href={
                      nextLesson.type === "QUIZ" && nextLesson.quiz
                        ? `/dashboard/courses/${slug}/quiz/${nextLesson.quiz.id}`
                        : `/dashboard/courses/${slug}/${nextLesson.id}`
                    }
                    className={buttonVariants({
                      variant: "primary",
                      size: "md",
                      className: "w-full",
                    })}
                  >
                    <PlayCircle className="size-4" />
                    {completedIds.size === 0 ? "Start course" : "Continue"}
                  </Link>
                ) : (
                  <Link
                    href="/dashboard/certificates"
                    className={buttonVariants({
                      variant: "accent",
                      size: "md",
                      className: "w-full",
                    })}
                  >
                    <Award className="size-4" />
                    View certificate
                  </Link>
                )
              ) : null}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Duration</dt>
                <dd className="font-semibold text-navy">
                  {Math.round(course.durationMinutes / 60)} hrs
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">CPD hours</dt>
                <dd className="font-semibold text-navy">{course.cpdHours}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Certificate</dt>
                <dd className="font-semibold text-navy">
                  {course.certificate ? "Included" : "Not included"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Level</dt>
                <dd className="font-semibold text-navy capitalize">
                  {course.level.toLowerCase()}
                </dd>
              </div>
            </dl>
          </GlassCard>

          {!enrollment && (
            <GlassCard className="bg-brand-50 p-5">
              <p className="text-sm text-brand-800">
                You&apos;re not enrolled in this course yet.
              </p>
              <Link
                href={`/courses/${slug}`}
                className={buttonVariants({
                  variant: "primary",
                  size: "sm",
                  className: "mt-3 w-full",
                })}
              >
                View enrolment options
              </Link>
            </GlassCard>
          )}
        </aside>
      </div>
    </div>
  );
}
