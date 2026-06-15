import type { Metadata } from "next";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Lock,
  PlayCircle,
  Video,
} from "lucide-react";
import { getSessionLearner } from "@/lib/learner-auth";
import { prisma } from "@/lib/db";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { markLessonComplete } from "@/app/(app)/dashboard/courses/actions";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type LessonType = "VIDEO" | "READING" | "EXERCISE" | "QUIZ";

const typeBadgeTone: Record<LessonType, "brand" | "neutral" | "amber" | "accent"> = {
  VIDEO: "brand",
  READING: "neutral",
  EXERCISE: "amber",
  QUIZ: "accent",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { title: true },
  });
  return { title: lesson?.title ?? "Lesson" };
}

export default async function LessonPlayerPage({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}) {
  const { slug, lessonId } = await params;
  const learner = await getSessionLearner();
  if (!learner) redirect("/login");

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      module: {
        include: {
          course: { select: { id: true, title: true, slug: true } },
        },
      },
      progress: { where: { learnerId: learner.id } },
      quiz: { select: { id: true } },
    },
  });

  if (!lesson || lesson.module.course.slug !== slug) notFound();

  // If this is a quiz-type lesson with a linked quiz, redirect to the quiz player.
  if (lesson.type === "QUIZ" && lesson.quiz) {
    redirect(`/dashboard/courses/${slug}/quiz/${lesson.quiz.id}`);
  }

  // Verify enrollment.
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      learnerId_courseId: {
        learnerId: learner.id,
        courseId: lesson.module.courseId,
      },
    },
  });

  // Fetch all lessons for sidebar + prev/next.
  const allModules = await prisma.module.findMany({
    where: { courseId: lesson.module.courseId },
    orderBy: { order: "asc" },
    include: {
      lessons: {
        orderBy: { order: "asc" },
        include: {
          progress: { where: { learnerId: learner.id } },
          quiz: { select: { id: true } },
        },
      },
    },
  });

  const allLessons = allModules.flatMap((m) => m.lessons);
  const currentIdx = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null;
  const nextLesson =
    currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null;

  const isCompleted = lesson.progress[0]?.status === "COMPLETED";
  const typeKey = lesson.type as LessonType;

  return (
    <div className="mx-auto max-w-6xl">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
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
          {lesson.module.course.title}
        </Link>
        <ChevronRight className="size-4" />
        <span className="font-semibold text-navy">{lesson.title}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* Main content */}
        <div className="space-y-6">
          <GlassCard className="p-6 sm:p-8">
            <div className="flex flex-wrap items-start gap-3">
              <Badge tone={typeBadgeTone[typeKey]} className="shrink-0">
                {typeKey.charAt(0) + typeKey.slice(1).toLowerCase()}
              </Badge>
              <Badge tone="neutral" className="shrink-0">
                {lesson.durationMinutes} min
              </Badge>
              {isCompleted ? (
                <Badge tone="accent" className="shrink-0">
                  <Check className="size-3" strokeWidth={3} />
                  Completed
                </Badge>
              ) : null}
            </div>

            <h1 className="mt-4 font-display text-2xl font-extrabold text-navy sm:text-3xl">
              {lesson.title}
            </h1>

            {/* Content area */}
            <div className="mt-6">
              {lesson.type === "VIDEO" ? (
                <div className="space-y-4">
                  <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-navy text-white">
                    <div className="text-center">
                      <Video className="mx-auto mb-3 size-12 opacity-40" />
                      <p className="text-sm font-medium opacity-60">
                        Video content coming soon
                      </p>
                    </div>
                  </div>
                  {lesson.body ? (
                    <LessonBody body={lesson.body} />
                  ) : null}
                </div>
              ) : (
                <LessonBody body={lesson.body ?? "Lesson content coming soon."} />
              )}
            </div>
          </GlassCard>

          {/* Navigation footer */}
          <div className="flex items-center justify-between gap-4">
            {prevLesson ? (
              <Link
                href={
                  prevLesson.type === "QUIZ" && prevLesson.quiz
                    ? `/dashboard/courses/${slug}/quiz/${prevLesson.quiz.id}`
                    : `/dashboard/courses/${slug}/${prevLesson.id}`
                }
                className={buttonVariants({ variant: "secondary", size: "sm" })}
              >
                <ArrowLeft className="size-4" />
                Previous
              </Link>
            ) : (
              <div />
            )}

            <div className="flex gap-3">
              {!isCompleted && enrollment ? (
                <form action={markLessonComplete}>
                  <input type="hidden" name="lessonId" value={lessonId} />
                  <input
                    type="hidden"
                    name="courseId"
                    value={lesson.module.courseId}
                  />
                  <input type="hidden" name="courseSlug" value={slug} />
                  <Button type="submit" variant="accent" size="sm">
                    <Check className="size-4" strokeWidth={3} />
                    Mark complete
                  </Button>
                </form>
              ) : null}

              {nextLesson ? (
                <Link
                  href={
                    nextLesson.type === "QUIZ" && nextLesson.quiz
                      ? `/dashboard/courses/${slug}/quiz/${nextLesson.quiz.id}`
                      : `/dashboard/courses/${slug}/${nextLesson.id}`
                  }
                  className={buttonVariants({ variant: "primary", size: "sm" })}
                >
                  Next
                  <ArrowRight className="size-4" />
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        {/* Sidebar: lesson list */}
        <aside className="hidden lg:block">
          <GlassCard className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto p-0">
            <div className="border-b border-slate-100 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Course contents
              </p>
            </div>
            <ul className="py-1">
              {allModules.map((mod) => (
                <li key={mod.id}>
                  <p className="px-4 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {mod.title}
                  </p>
                  <ul>
                    {mod.lessons.map((l) => {
                      const done = l.progress[0]?.status === "COMPLETED";
                      const isCurrent = l.id === lessonId;
                      const href =
                        l.type === "QUIZ" && l.quiz
                          ? `/dashboard/courses/${slug}/quiz/${l.quiz.id}`
                          : `/dashboard/courses/${slug}/${l.id}`;
                      return (
                        <li key={l.id}>
                          <Link
                            href={href}
                            className={cn(
                              "flex items-center gap-2.5 px-4 py-2 text-xs transition-colors",
                              isCurrent
                                ? "bg-brand-50 font-semibold text-brand-700"
                                : done
                                  ? "text-slate-400 hover:bg-slate-50"
                                  : "text-slate-600 hover:bg-slate-50",
                            )}
                          >
                            <span
                              className={cn(
                                "grid size-5 shrink-0 place-items-center rounded-full",
                                done
                                  ? "bg-accent-500 text-white"
                                  : isCurrent
                                    ? "border-2 border-brand-600 text-brand-600"
                                    : "border-2 border-slate-200 text-slate-300",
                              )}
                            >
                              {done ? (
                                <Check className="size-3" strokeWidth={3} />
                              ) : isCurrent ? (
                                <PlayCircle className="size-3" />
                              ) : (
                                <Lock className="size-2.5" />
                              )}
                            </span>
                            <span className="min-w-0 truncate">{l.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </GlassCard>
        </aside>
      </div>
    </div>
  );
}

/** Render lesson body as simple formatted prose. */
function LessonBody({ body }: { body: string }) {
  const lines = body.split("\n");
  return (
    <div className="prose prose-slate max-w-none">
      {lines.map((line, i) => {
        if (line.startsWith("# "))
          return (
            <h2 key={i} className="text-xl font-bold text-navy">
              {line.slice(2)}
            </h2>
          );
        if (line.startsWith("## "))
          return (
            <h3 key={i} className="text-lg font-bold text-navy">
              {line.slice(3)}
            </h3>
          );
        if (line.startsWith("**") && line.endsWith("**"))
          return (
            <p key={i} className="font-semibold text-navy">
              {line.slice(2, -2)}
            </p>
          );
        if (line.startsWith("- "))
          return (
            <p key={i} className="flex gap-2 text-slate-700">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-500" />
              {line.slice(2)}
            </p>
          );
        if (line.startsWith("> "))
          return (
            <blockquote
              key={i}
              className="border-l-4 border-brand-300 pl-4 text-slate-600 italic"
            >
              {line.slice(2)}
            </blockquote>
          );
        if (line.trim() === "") return <div key={i} className="h-3" />;
        return (
          <p key={i} className="leading-relaxed text-slate-700">
            {line}
          </p>
        );
      })}
    </div>
  );
}
