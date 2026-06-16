import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Award,
  BookOpen,
  Clock,
  GraduationCap,
  PlayCircle,
  TrendingUp,
} from "lucide-react";
import { getSessionLearner } from "@/lib/learner-auth";
import { prisma } from "@/lib/db";
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
import { pathway } from "@/lib/data/content";

export const metadata: Metadata = { title: "Learner Dashboard" };

export default async function DashboardPage() {
  const learner = await getSessionLearner();
  if (!learner) redirect("/login");

  const [enrollments, certificates] = await Promise.all([
    prisma.enrollment.findMany({
      where: { learnerId: learner.id },
      include: { course: true },
      orderBy: { enrolledAt: "desc" },
    }),
    prisma.certificate.findMany({
      where: { learnerId: learner.id, status: "ACTIVE" },
      orderBy: { issuedAt: "desc" },
    }),
  ]);

  const inProgressEnrollments = enrollments
    .filter((e) => e.status === "IN_PROGRESS" || e.status === "NOT_STARTED")
    .slice(0, 3);

  const totalCpdHours = certificates.reduce((s, c) => s + c.cpdHours, 0);
  const talentScore = learner.talentReadinessScore ?? 0;
  const readiness = talentScore;
  const name = learner.user.name?.split(" ")[0] ?? "there";

  // Pathway progress: +1 for having applied (always), +1 per certificate.
  const completedSteps = Math.min(1 + certificates.length, pathway.length - 1);

  const tones = ["brand", "violet", "accent"] as const;

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      {/* Welcome header */}
      <Reveal>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Welcome back, {name}
          </h1>
        </div>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">
          {enrollments.length > 0
            ? "You're making great progress. Keep your momentum to raise your Talent Score and unlock the employer network."
            : "Start your first course to build your sales skills and earn CPD certification."}
        </p>
      </Reveal>

      {/* Hero stat row */}
      <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <TalentScorePanel score={talentScore} name={learner.user.name ?? "Learner"} />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid h-full gap-5 sm:grid-cols-2">
            <StatTile
              icon={BookOpen}
              value={enrollments.filter((e) => e.status === "IN_PROGRESS").length}
              label="Courses in progress"
              tone="brand"
            />
            <StatTile
              icon={Award}
              value={certificates.length}
              label="Certificates earned"
              tone="accent"
            />
            <StatTile
              icon={Clock}
              value={totalCpdHours}
              label="CPD hours"
              tone="violet"
              hint="Across completed courses"
            />
            <StatTile
              icon={GraduationCap}
              value={completedSteps}
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
              <AnimatedCounter value={readiness} suffix="%" />
            </span>
          </div>
          <CareerReadiness value={readiness} className="mt-6" />
        </GlassCard>
      </Reveal>

      {/* Continue learning */}
      {inProgressEnrollments.length > 0 ? (
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-navy">Continue learning</h2>
              <p className="mt-1 text-sm text-slate-500">
                Pick up where you left off
              </p>
            </div>
            <Link
              href="/dashboard/courses"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
            >
              All courses
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="space-y-4">
            {inProgressEnrollments.map(({ course, progressPct }, i) => (
              <Reveal key={course.slug} delay={i * 0.06}>
                <GlassCard className="flex flex-col gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated sm:flex-row sm:items-center sm:gap-5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-violet-50 text-brand-600 ring-1 ring-brand-100">
                    <Icon name={course.icon ?? "BookOpen"} className="size-6" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="truncate font-bold text-navy">
                        {course.title}
                      </h3>
                      <span className="shrink-0 text-sm font-semibold text-slate-500">
                        {progressPct}%
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {course.category} · {Math.round(course.durationMinutes / 60)} hrs ·{" "}
                      {course.cpdHours} CPD
                    </p>
                    <ProgressBar
                      value={progressPct}
                      tone={tones[i % tones.length]}
                      className="mt-3"
                    />
                  </div>

                  <Link
                    href={`/dashboard/courses/${course.slug}`}
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
      ) : (
        <Reveal>
          <GlassCard className="p-7 text-center">
            <BookOpen className="mx-auto mb-4 size-10 text-slate-300" />
            <p className="font-semibold text-navy">No courses in progress</p>
            <p className="mt-1 text-sm text-slate-500">
              Browse the catalogue to start learning.
            </p>
            <Link
              href="/courses"
              className={buttonVariants({
                variant: "primary",
                size: "md",
                className: "mt-5",
              })}
            >
              Browse courses
              <ArrowRight className="size-4" />
            </Link>
          </GlassCard>
        </Reveal>
      )}

      {/* Certification journey */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-navy">Certification journey</h2>
            <p className="mt-1 text-sm text-slate-500">
              {completedSteps} of {pathway.length} steps complete
              {completedSteps < pathway.length
                ? ` — next up: ${pathway[completedSteps]?.label}`
                : " — journey complete!"}
            </p>
          </div>
          {completedSteps < pathway.length ? (
            <Badge tone="accent">
              <GraduationCap className="size-3.5" aria-hidden="true" />
              On track
            </Badge>
          ) : null}
        </div>

        <GlassCard className="overflow-x-auto p-7">
          <div className="min-w-[640px] lg:min-w-0">
            <CertificationJourney completedSteps={completedSteps} />
          </div>
        </GlassCard>
      </section>

      {/* Your certificates */}
      {certificates.length > 0 ? (
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-navy">Your certificates</h2>
              <p className="mt-1 text-sm text-slate-500">
                CPD-recognised and publicly verifiable
              </p>
            </div>
            <Link
              href="/dashboard/certificates"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
            >
              View all
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {certificates.slice(0, 2).map((cert, i) => (
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
                      Issued{" "}
                      {cert.issuedAt.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p className="mt-2 font-mono text-xs text-slate-400">
                      {cert.certificateId}
                    </p>
                  </div>
                  <Link
                    href={`/verify/${cert.certificateId}`}
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                      className: "self-start",
                    })}
                  >
                    View certificate
                    <ArrowRight className="size-4" />
                  </Link>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function TalentScorePanel({
  score,
  name,
}: {
  score: number;
  name: string;
}) {
  return (
    <GlassCard className="relative h-full overflow-hidden p-7 sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="relative flex flex-col items-center gap-7 sm:flex-row sm:items-center sm:gap-8">
        <ProgressRing
          value={score}
          size={150}
          stroke={12}
          ringClassName="text-brand-600"
        >
          <span className="flex items-baseline">
            <span className="text-display font-extrabold leading-none text-navy">
              <AnimatedCounter value={score} />
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
            {name}
          </h2>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-100 px-3 py-1 text-sm font-semibold text-accent-700">
            <TrendingUp className="size-4" aria-hidden="true" />
            CPD certified
          </span>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Your live employability score, assessed across courses, communication
            and role-play.
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
