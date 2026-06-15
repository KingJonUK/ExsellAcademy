import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Clock,
  GraduationCap,
  PlayCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { ProgressRing } from "@/components/ui/progress-ring";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { StatTile } from "@/components/dashboard/stat-tile";
import { CareerReadiness } from "@/components/dashboard/career-readiness";
import { CertificationJourney } from "@/components/dashboard/certification-journey";
import { getCourse } from "@/lib/data/courses";
import { pathway } from "@/lib/data/content";
import type { Course } from "@/lib/types";

export const metadata: Metadata = {
  title: "Learner Dashboard",
};

/** Sample learner state — preview only, no auth or persistence. */
const TALENT_SCORE = 87;
const READINESS = 78;

const inProgress: { course: Course; progress: number; tone: BarTone }[] = [
  { course: getCourse("prospecting-essentials")!, progress: 64, tone: "brand" },
  { course: getCourse("ai-for-sales")!, progress: 38, tone: "violet" },
  { course: getCourse("interview-readiness")!, progress: 20, tone: "accent" },
];

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
    <div className="mx-auto max-w-6xl space-y-10">
      {/* Welcome header */}
      <Reveal>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Welcome back, Sofia
          </h1>
          <Badge tone="brand">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Preview
          </Badge>
        </div>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">
          You&apos;re making great progress. Keep your momentum to raise your
          Talent Score and unlock the employer network.
        </p>
      </Reveal>

      {/* Hero stat row: Talent Score panel + stat tiles */}
      <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <TalentScorePanel />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid h-full gap-5 sm:grid-cols-2">
            <StatTile
              icon={BookOpen}
              value={3}
              label="Courses in progress"
              tone="brand"
            />
            <StatTile
              icon={Award}
              value={2}
              label="Certificates earned"
              tone="accent"
            />
            <StatTile
              icon={Clock}
              value={24}
              label="CPD hours"
              tone="violet"
              hint="Across the full pathway"
            />
            <StatTile
              icon={GraduationCap}
              value={COMPLETED_STEPS}
              suffix={`/${pathway.length}`}
              label="Pathway steps"
              tone="brand"
              hint="On track to get hired"
            />
          </div>
        </Reveal>
      </div>

      {/* Career readiness meter */}
      <Reveal>
        <GlassCard className="p-7">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <div>
              <h2 className="text-lg font-bold text-navy">Career readiness</h2>
              <p className="mt-1 text-sm text-slate-500">
                How close you are to being interview-ready for employers
              </p>
            </div>
            <span className="font-display text-2xl font-extrabold text-navy">
              <AnimatedCounter value={READINESS} suffix="%" />
            </span>
          </div>
          <CareerReadiness value={READINESS} className="mt-6" />
        </GlassCard>
      </Reveal>

      {/* Continue learning */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-navy">Continue learning</h2>
            <p className="mt-1 text-sm text-slate-500">
              Pick up where you left off
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            All courses
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="space-y-4">
          {inProgress.map(({ course, progress, tone }, i) => (
            <Reveal key={course.slug} delay={i * 0.06}>
              <GlassCard className="flex flex-col gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated sm:flex-row sm:items-center sm:gap-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-violet-50 text-brand-600 ring-1 ring-brand-100">
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
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {course.category} · {course.durationHours} hrs ·{" "}
                    {course.cpdHours} CPD
                  </p>
                  <ProgressBar value={progress} tone={tone} className="mt-3" />
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
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Certification journey */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-navy">Certification journey</h2>
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

        <GlassCard className="overflow-x-auto p-7">
          <div className="min-w-[640px] lg:min-w-0">
            <CertificationJourney completedSteps={COMPLETED_STEPS} />
          </div>
        </GlassCard>
      </section>

      {/* Your certificates */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-navy">Your certificates</h2>
            <p className="mt-1 text-sm text-slate-500">
              CPD-recognised and publicly verifiable
            </p>
          </div>
          <Link
            href="/verify/EXS-2026-000184"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            Verify a certificate
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {certificates.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.06}>
              <GlassCard className="flex h-full flex-col gap-4 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-glow">
                    <Award className="size-6" aria-hidden="true" />
                  </span>
                  <Badge tone="accent">{cert.cpdHours} CPD hrs</Badge>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-navy">{cert.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Issued {cert.date}
                  </p>
                  <p className="mt-2 font-mono text-xs text-slate-400">
                    {cert.id}
                  </p>
                </div>
                <Link
                  href={`/verify/${cert.id}`}
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "self-start",
                  })}
                >
                  View certificate
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

/** Hero panel: large Talent Score ring with a growth indicator + supporting copy. */
function TalentScorePanel() {
  return (
    <GlassCard className="relative h-full overflow-hidden p-7 sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="relative flex flex-col items-center gap-7 sm:flex-row sm:items-center sm:gap-8">
        <ProgressRing
          value={TALENT_SCORE}
          size={150}
          stroke={12}
          ringClassName="text-brand-600"
        >
          <span className="flex items-baseline">
            <span className="text-display font-extrabold leading-none text-navy">
              <AnimatedCounter value={TALENT_SCORE} />
            </span>
            <span className="ml-0.5 font-display text-lg font-bold text-slate-400">
              /100
            </span>
          </span>
        </ProgressRing>

        <div className="min-w-0 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
            Talent Score
          </p>
          <h2 className="mt-1 font-display text-2xl font-extrabold text-navy">
            Sofia Ahmed
          </h2>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-100 px-3 py-1 text-sm font-semibold text-accent-700">
            <TrendingUp className="size-4" aria-hidden="true" />
            +12 this month
          </span>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Your live employability score, assessed across courses,
            communication and role-play.
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

type BarTone = "brand" | "accent" | "violet";

const barTones: Record<BarTone, string> = {
  brand: "bg-brand-500",
  accent: "bg-accent-500",
  violet: "bg-violet-500",
};

function ProgressBar({
  value,
  tone,
  className,
}: {
  value: number;
  tone: BarTone;
  className?: string;
}) {
  return (
    <div
      className={`h-2 overflow-hidden rounded-full bg-slate-100 ${className ?? ""}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full ${barTones[tone]}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
