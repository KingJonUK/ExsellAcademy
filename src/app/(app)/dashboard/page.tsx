import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CircleCheckBig,
  Clock,
  GraduationCap,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { StatTile } from "@/components/dashboard/stat-tile";
import { getCourse } from "@/lib/data/courses";
import { pathway } from "@/lib/data/content";
import type { Course } from "@/lib/types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Learner Dashboard",
};

const READINESS = 87;

/** Sample learner state — preview only, no auth or persistence. */
const inProgress: { course: Course; progress: number }[] = [
  { course: getCourse("prospecting-essentials")!, progress: 64 },
  { course: getCourse("ai-for-sales")!, progress: 38 },
  { course: getCourse("interview-readiness")!, progress: 20 },
];

const recommended = getCourse("objection-handling")!;

const certificates = [
  {
    id: "EXS-2026-000184",
    title: "Sales Foundations",
    cpdHours: 6,
    date: "12 May 2026",
  },
  {
    id: "EXS-2026-000201",
    title: "Communication Skills",
    cpdHours: 5,
    date: "28 May 2026",
  },
];

// First three pathway steps complete for this preview learner.
const COMPLETED_STEPS = 3;

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Welcome header */}
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
            Welcome back, Sofia <span aria-hidden="true">👋</span>
          </h1>
          <Badge tone="brand">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Preview
          </Badge>
        </div>
        <p className="mt-2 text-slate-600">
          You&apos;re making great progress. Keep your momentum up to raise your
          talent readiness and unlock the employer network.
        </p>
      </div>

      {/* Stat tiles */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          visual={<ProgressRing value={READINESS} size={56} strokeWidth={5} />}
          value={`${READINESS}/100`}
          label="Talent readiness"
        />
        <StatTile icon={BookOpen} value={3} label="Courses in progress" />
        <StatTile
          icon={Award}
          value={2}
          label="Certificates earned"
          tone="accent"
        />
        <StatTile icon={Clock} value={24} label="CPD hours" />
      </div>

      {/* Two-column: readiness panel + continue learning */}
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Talent readiness panel */}
        <Card className="flex flex-col">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-navy">Talent readiness</h2>
              <p className="mt-1 text-sm text-slate-500">
                Your live employability score
              </p>
            </div>
            <ProgressRing value={READINESS} size={104} strokeWidth={8} />
          </div>
          <div className="mt-6 rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-navy">
              What raises your score
            </p>
            <ul className="mt-3 space-y-2.5 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <CircleCheckBig
                  className="mt-0.5 size-4 shrink-0 text-accent-600"
                  aria-hidden="true"
                />
                Finishing your in-progress courses
              </li>
              <li className="flex items-start gap-2.5">
                <CircleCheckBig
                  className="mt-0.5 size-4 shrink-0 text-accent-600"
                  aria-hidden="true"
                />
                Passing assessments first time
              </li>
              <li className="flex items-start gap-2.5">
                <CircleCheckBig
                  className="mt-0.5 size-4 shrink-0 text-accent-600"
                  aria-hidden="true"
                />
                Submitting a scored sales role-play
              </li>
            </ul>
          </div>
        </Card>

        {/* Continue learning */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-navy">Continue learning</h2>
            <Link
              href="#"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              My courses
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="space-y-3">
            {inProgress.map(({ course, progress }) => (
              <Card
                key={course.slug}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                  <Icon name={course.icon} className="size-6" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="truncate font-bold text-navy">
                      {course.title}
                    </h3>
                    <span className="shrink-0 text-sm font-semibold text-slate-500">
                      {progress}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-brand-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <Link
                  href={`/courses/${course.slug}`}
                  className={buttonVariants({
                    variant: "secondary",
                    size: "sm",
                    className: "shrink-0",
                  })}
                >
                  <PlayCircle className="size-4" aria-hidden="true" />
                  Resume
                </Link>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Recommended + certificates */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recommended next */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-navy">Recommended next</h2>
          <Card className="flex h-full flex-col bg-gradient-to-br from-brand-700 to-brand-900 text-white">
            <div className="flex items-start justify-between gap-3">
              <span className="grid size-12 place-items-center rounded-xl bg-white/15 text-white">
                <Icon name={recommended.icon} className="size-6" />
              </span>
              <Badge tone="accent">{recommended.level}</Badge>
            </div>
            <h3 className="mt-5 text-xl font-bold">{recommended.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-100">
              {recommended.subtitle}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-brand-100">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden="true" />
                {recommended.durationHours} hrs
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="size-4" aria-hidden="true" />
                {recommended.cpdHours} CPD hrs
              </span>
            </div>
            <Link
              href={`/courses/${recommended.slug}`}
              className={buttonVariants({
                variant: "white",
                size: "md",
                className: "mt-6 self-start",
              })}
            >
              Start course
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Card>
        </section>

        {/* Certificates */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-navy">Your certificates</h2>
          <div className="space-y-3">
            {certificates.map((cert) => (
              <Card
                key={cert.id}
                className="flex items-center gap-4 p-5"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-100 text-accent-700">
                  <Award className="size-6" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-bold text-navy">{cert.title}</h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {cert.cpdHours} CPD hrs · {cert.date}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-slate-400">
                    {cert.id}
                  </p>
                </div>
                <Link
                  href={`/verify/${cert.id}`}
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "shrink-0",
                  })}
                >
                  View
                </Link>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Career pathway tracker */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-navy">Career pathway</h2>
            <p className="mt-1 text-sm text-slate-500">
              {COMPLETED_STEPS} of {pathway.length} steps complete — next up:{" "}
              <span className="font-semibold text-navy">
                {pathway[COMPLETED_STEPS]?.label}
              </span>
            </p>
          </div>
          <Badge tone="accent">
            <GraduationCap className="size-3.5" aria-hidden="true" />
            On track
          </Badge>
        </div>

        <Card className="overflow-x-auto">
          <ol className="flex min-w-max gap-2 sm:min-w-0 sm:justify-between">
            {pathway.map((step, i) => {
              const done = i < COMPLETED_STEPS;
              const current = i === COMPLETED_STEPS;
              return (
                <li
                  key={step.label}
                  className="flex w-28 flex-col items-center text-center"
                >
                  <span
                    className={cn(
                      "relative grid size-12 place-items-center rounded-xl ring-1 transition-colors",
                      done
                        ? "bg-accent-500 text-white ring-accent-500"
                        : current
                          ? "bg-brand-600 text-white ring-brand-600"
                          : "bg-slate-50 text-slate-400 ring-slate-200",
                    )}
                  >
                    {done ? (
                      <CircleCheckBig className="size-6" aria-hidden="true" />
                    ) : (
                      <Icon name={step.icon} className="size-6" />
                    )}
                    <span
                      className={cn(
                        "absolute -right-2 -top-2 grid size-5 place-items-center rounded-full text-[10px] font-bold text-white",
                        done
                          ? "bg-accent-600"
                          : current
                            ? "bg-brand-700"
                            : "bg-slate-300",
                      )}
                    >
                      {i + 1}
                    </span>
                  </span>
                  <h3
                    className={cn(
                      "mt-3 text-sm font-bold",
                      done || current ? "text-navy" : "text-slate-400",
                    )}
                  >
                    {step.label}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {current ? "In progress" : step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </Card>
      </section>
    </div>
  );
}
