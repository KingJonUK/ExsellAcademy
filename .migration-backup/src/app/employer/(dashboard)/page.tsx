import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  Inbox,
  Layers,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { getSessionEmployer } from "@/lib/employer-auth";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Card } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { buttonVariants } from "@/components/ui/button";
import { PipelineStageBadge } from "@/components/employer/pipeline-badge";

export const metadata: Metadata = {
  title: "Talent dashboard · ExSell Academy",
};

function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type StatTile = {
  label: string;
  value: number;
  icon: typeof Users;
  tone: string;
};

export default async function EmployerDashboardPage() {
  const employer = await getSessionEmployer();
  if (!employer) {
    return (
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-navy">Talent dashboard</h1>
        <Card className="mt-6 flex flex-col items-center gap-2 py-10 text-center">
          <Inbox className="size-8 text-slate-300" aria-hidden="true" />
          <p className="text-sm text-slate-500">
            Demo employer not seeded — run{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-navy">
              npm run db:seed
            </code>
          </p>
        </Card>
      </div>
    );
  }

  const [available, interviews, inPipeline, placements, recent] =
    await Promise.all([
      prisma.learnerProfile.count({ where: { inTalentPool: true } }),
      prisma.candidatePipeline.count({
        where: {
          employerId: employer.id,
          stage: { in: ["INTERVIEW_REQUESTED", "INTERVIEW_BOOKED"] },
        },
      }),
      prisma.candidatePipeline.count({
        where: { employerId: employer.id, stage: { not: "REJECTED" } },
      }),
      prisma.placement.count({ where: { employerId: employer.id } }),
      prisma.candidatePipeline.findMany({
        where: { employerId: employer.id },
        include: { learner: { include: { user: true } }, job: true },
        orderBy: { updatedAt: "desc" },
        take: 5,
      }),
    ]);

  const tiles: StatTile[] = [
    {
      label: "Candidates available",
      value: available,
      icon: Users,
      tone: "bg-brand-50 text-brand-700",
    },
    {
      label: "Interviews requested",
      value: interviews,
      icon: CalendarClock,
      tone: "bg-amber-100 text-amber-800",
    },
    {
      label: "In pipeline",
      value: inPipeline,
      icon: Layers,
      tone: "bg-accent-100 text-accent-800",
    },
    {
      label: "Placements",
      value: placements,
      icon: TrendingUp,
      tone: "bg-brand-50 text-brand-700",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold text-navy">
        Welcome to your talent dashboard
      </h1>
      <p className="mt-1 text-sm text-slate-500">{employer.companyName}</p>

      {/* Stat tiles */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => (
          <Card key={tile.label} className="flex items-center gap-4">
            <span
              className={`grid size-12 shrink-0 place-items-center rounded-xl ${tile.tone}`}
            >
              <tile.icon className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-3xl font-bold text-navy">
                <AnimatedCounter value={tile.value} />
              </p>
              <p className="text-sm text-slate-500">{tile.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Recent activity */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-navy">Recent activity</h2>
            <Link
              href="/employer/pipeline"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
            >
              View pipeline <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className="mt-6 flex flex-col items-center gap-2 py-8 text-center">
              <Inbox className="size-8 text-slate-300" aria-hidden="true" />
              <p className="text-sm text-slate-500">No activity yet.</p>
              <p className="text-xs text-slate-400">
                Shortlist candidates from the talent pool to get started.
              </p>
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-slate-100">
              {recent.map((entry) => (
                <li
                  key={entry.id}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/employer/talent/${entry.learnerId}`}
                      className="truncate font-semibold text-navy transition-colors hover:text-brand-700"
                    >
                      {entry.learner.user?.name ?? "Candidate"}
                    </Link>
                    <p className="truncate text-xs text-slate-500">
                      {entry.job?.title ?? "No specific role"} ·{" "}
                      {formatDate(entry.updatedAt)}
                    </p>
                  </div>
                  <PipelineStageBadge stage={entry.stage} />
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* CTA */}
        <GlassCard className="flex flex-col">
          <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
            <Sparkles className="size-5" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-lg font-bold text-navy">
            Discover work-ready talent
          </h2>
          <p className="mt-1 flex-1 text-sm text-slate-600">
            Browse certified, talent-readiness-scored candidates and shortlist
            your next hire in minutes.
          </p>
          <Link
            href="/employer/talent"
            className={buttonVariants({ variant: "primary", className: "mt-5 w-full" })}
          >
            Explore the talent pool
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </GlassCard>
      </div>
    </div>
  );
}
