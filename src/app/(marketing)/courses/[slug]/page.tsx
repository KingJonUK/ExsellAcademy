import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  CircleCheckBig,
  Clock,
  Play,
  Sparkles,
} from "lucide-react";
import type { Course, Lesson } from "@/lib/types";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CourseCard } from "@/components/course-card";
import { buttonVariants } from "@/components/ui/button";
import { courses, getCourse } from "@/lib/data/courses";
import { formatHours, formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) {
    return { title: "Course not found" };
  }
  return {
    title: course.title,
    description: course.subtitle,
  };
}

const accessTone = {
  free: "accent",
  paid: "brand",
  funded: "amber",
} as const;

/** Render the right icon for a lesson type. */
function LessonTypeIcon({ type }: { type: Lesson["type"] }) {
  const className = "size-4 text-brand-600";
  switch (type) {
    case "video":
      return <Play className={className} aria-hidden="true" />;
    case "reading":
      return <BookOpen className={className} aria-hidden="true" />;
    case "exercise":
      return <Sparkles className={className} aria-hidden="true" />;
    case "quiz":
      return <Icon name="ClipboardCheck" className={className} />;
    default:
      return <BookOpen className={className} aria-hidden="true" />;
  }
}

function EnrolCard({ course }: { course: Course }) {
  const isFunded = course.access === "funded";
  const isFree = course.access === "free";
  const totalLessons = course.modules.reduce(
    (n, m) => n + m.lessons.length,
    0,
  );
  const primaryLabel = isFunded || isFree ? "Enrol now" : "Get started";

  const facts: { label: string; value: string }[] = [
    { label: "Price", value: formatPrice(course.price, isFunded) },
    { label: "CPD hours", value: `${course.cpdHours} hrs` },
    { label: "Total duration", value: formatHours(course.durationHours) },
    { label: "Lessons", value: `${totalLessons} lessons` },
    { label: "Level", value: course.level },
  ];

  return (
    <Card className="p-7 lg:sticky lg:top-24">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">
          Enrol
        </span>
        <Badge tone={accessTone[course.access]}>
          {formatPrice(course.price, isFunded)}
        </Badge>
      </div>

      <dl className="mt-5 divide-y divide-slate-100">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="flex items-center justify-between py-3 text-sm"
          >
            <dt className="text-slate-500">{fact.label}</dt>
            <dd className="font-semibold text-navy">{fact.value}</dd>
          </div>
        ))}
        {course.certificate ? (
          <div className="flex items-center justify-between py-3 text-sm">
            <dt className="text-slate-500">Certificate</dt>
            <dd className="inline-flex items-center gap-1.5 font-semibold text-accent-700">
              <CircleCheckBig className="size-4" aria-hidden="true" />
              Included
            </dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-6 flex flex-col gap-3">
        <Link
          href="/apply"
          className={buttonVariants({ variant: "primary", size: "lg" })}
        >
          {primaryLabel}
          <ArrowRight className="size-5" aria-hidden="true" />
        </Link>
        <Link
          href="/contact"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Ask a question
        </Link>
      </div>
    </Card>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const totalLessons = course.modules.reduce(
    (n, m) => n + m.lessons.length,
    0,
  );
  const relatedCourses = courses
    .filter((c) => c.slug !== course.slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container-page py-12 sm:py-14 lg:py-16">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500"
          >
            <Link href="/" className="transition-colors hover:text-brand-600">
              Home
            </Link>
            <ChevronRight className="size-4 text-slate-300" aria-hidden="true" />
            <Link
              href="/courses"
              className="transition-colors hover:text-brand-600"
            >
              Courses
            </Link>
            <ChevronRight className="size-4 text-slate-300" aria-hidden="true" />
            <span className="font-medium text-navy">{course.title}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={accessTone[course.access]}>
                  {formatPrice(course.price, course.access === "funded")}
                </Badge>
                <Badge tone="neutral">{course.level}</Badge>
                <Badge tone="outline">{course.category}</Badge>
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-navy sm:text-5xl">
                {course.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
                {course.subtitle}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4" aria-hidden="true" />
                  {formatHours(course.durationHours)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="Award" className="size-4 text-slate-500" />
                  {course.cpdHours} CPD hrs
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="GraduationCap" className="size-4 text-slate-500" />
                  {course.level}
                </span>
                {course.certificate ? (
                  <span className="inline-flex items-center gap-1.5 text-accent-700">
                    <CircleCheckBig className="size-4" aria-hidden="true" />
                    Certificate
                  </span>
                ) : null}
              </div>
            </div>

            {/* Spacer column on lg — the enrol card lives in the main grid below
                so it can stick alongside the long curriculum. */}
            <div className="hidden lg:block" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Main two-column */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          {/* Left column */}
          <div className="space-y-12">
            {/* About */}
            <Reveal>
              <div>
                <h2 className="text-2xl font-bold text-navy">
                  About this course
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">
                  {course.description}
                </p>
              </div>
            </Reveal>

            {/* What you'll learn */}
            <Reveal delay={0.05}>
              <div>
                <h2 className="text-2xl font-bold text-navy">
                  What you&apos;ll learn
                </h2>
                <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {course.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-3">
                      <CircleCheckBig
                        className="mt-0.5 size-5 shrink-0 text-accent-600"
                        aria-hidden="true"
                      />
                      <span className="text-slate-600">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Skills */}
            <Reveal delay={0.1}>
              <div>
                <h2 className="text-2xl font-bold text-navy">
                  Skills you&apos;ll gain
                </h2>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {course.skills.map((skill) => (
                    <Badge key={skill} tone="brand" className="px-3.5 py-1.5">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Curriculum */}
            <Reveal delay={0.15}>
              <div>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <h2 className="text-2xl font-bold text-navy">Curriculum</h2>
                  <p className="text-sm font-medium text-slate-500">
                    {course.modules.length} modules · {totalLessons} lessons
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  {course.modules.map((module, moduleIndex) => (
                    <div
                      key={module.title}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft"
                    >
                      <div className="flex items-center gap-4 border-b border-slate-100 bg-slate-50 px-5 py-4">
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-600 text-sm font-bold text-white">
                          {moduleIndex + 1}
                        </span>
                        <div>
                          <h3 className="font-bold text-navy">
                            {module.title}
                          </h3>
                          <p className="text-xs font-medium text-slate-500">
                            {module.lessons.length} lessons
                          </p>
                        </div>
                      </div>
                      <ul className="divide-y divide-slate-100">
                        {module.lessons.map((lesson) => (
                          <li
                            key={lesson.title}
                            className="flex items-center gap-3 px-5 py-3"
                          >
                            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-50 ring-1 ring-brand-100">
                              <LessonTypeIcon type={lesson.type} />
                            </span>
                            <span className="flex-1 text-sm text-slate-700">
                              {lesson.title}
                            </span>
                            <span className="shrink-0 text-xs font-medium text-slate-400">
                              {lesson.minutes} min
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right column — enrol card */}
          <aside>
            <EnrolCard course={course} />
          </aside>
        </div>
      </Section>

      {/* Related courses */}
      {relatedCourses.length > 0 ? (
        <Section className="bg-slate-50">
          <SectionHeading
            align="left"
            eyebrow="Keep going"
            title="Related courses"
            description="Build on what you've learnt with the next step in your sales career."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedCourses.map((related) => (
              <CourseCard key={related.slug} course={related} />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
