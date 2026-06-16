import Link from "next/link";
import { BookOpen, Clock, PlayCircle } from "lucide-react";
import { useLearnerStore, listEnrollments } from "@/lib/data/learner-demo";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { ProgressRing } from "@/components/ui/progress-ring";
import { cn } from "@/lib/utils";

const statusTone: Record<string, "brand" | "accent" | "neutral"> = {
  NOT_STARTED: "neutral",
  IN_PROGRESS: "brand",
  COMPLETED: "accent",
};

const statusLabel: Record<string, string> = {
  NOT_STARTED: "Not started",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
};

export default function MyCoursesPage() {
  useLearnerStore();
  const enrollments = listEnrollments();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          My Courses
        </h1>
        <p className="mt-2 text-slate-600">
          {enrollments.length} course{enrollments.length !== 1 ? "s" : ""}{" "}
          enrolled
        </p>
      </div>

      {enrollments.length === 0 ? (
        <GlassCard className="py-16 text-center">
          <BookOpen className="mx-auto mb-4 size-12 text-slate-300" />
          <p className="font-semibold text-navy">No courses yet</p>
          <p className="mt-1 text-sm text-slate-500">
            Browse the catalogue to start learning.
          </p>
          <Link
            href="/courses"
            className={cn(
              buttonVariants({ variant: "primary", size: "md" }),
              "mt-6",
            )}
          >
            Browse courses
          </Link>
        </GlassCard>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {enrollments.map((enrollment) => {
            const { course, progressPct, status } = enrollment;
            const totalLessons = course.modules.flatMap((m) => m.lessons).length;
            const tone = statusTone[status] ?? "neutral";
            const firstLesson = course.modules
              .flatMap((m) => m.lessons)
              .at(0);

            return (
              <GlassCard
                key={enrollment.id}
                className="flex flex-col gap-5 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-violet-50 text-brand-600 ring-1 ring-brand-100">
                    <Icon name={course.icon ?? "BookOpen"} className="size-6" />
                  </span>
                  <Badge tone={tone}>{statusLabel[status]}</Badge>
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="font-bold text-navy">{course.title}</h2>
                  <p className="mt-1 truncate text-xs text-slate-500">
                    <Clock className="mr-1 inline size-3" />
                    {Math.round(course.durationMinutes / 60)} hrs ·{" "}
                    {totalLessons} lessons · {course.cpdHours} CPD
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <ProgressRing
                    value={progressPct}
                    size={52}
                    stroke={5}
                    ringClassName={
                      status === "COMPLETED"
                        ? "text-accent-500"
                        : "text-brand-600"
                    }
                  >
                    <span className="text-[10px] font-bold text-navy">
                      {progressPct}%
                    </span>
                  </ProgressRing>

                  <Link
                    href={
                      status === "COMPLETED" || !firstLesson
                        ? `/dashboard/courses/${course.slug}`
                        : `/dashboard/courses/${course.slug}`
                    }
                    className={buttonVariants({
                      variant: status === "COMPLETED" ? "secondary" : "primary",
                      size: "sm",
                      className: "flex-1",
                    })}
                  >
                    <PlayCircle className="size-4" aria-hidden="true" />
                    {status === "COMPLETED" ? "Review" : status === "NOT_STARTED" ? "Start" : "Resume"}
                  </Link>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
