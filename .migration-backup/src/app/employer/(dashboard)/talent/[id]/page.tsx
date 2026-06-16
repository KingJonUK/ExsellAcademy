import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  CalendarClock,
  ChevronLeft,
  ExternalLink,
  FileText,
  MapPin,
  PoundSterling,
  Sparkles,
  Video,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { getSessionEmployer } from "@/lib/employer-auth";
import { requestInterview } from "@/app/employer/(dashboard)/actions";
import { GlassCard } from "@/components/ui/glass-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Field, Select } from "@/components/ui/form";
import { buttonVariants } from "@/components/ui/button";
import { PipelineStageBadge } from "@/components/employer/pipeline-badge";
import { formatGBP, formatHours } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Candidate profile · ExSell Academy",
};

const workModeLabel: Record<string, string> = {
  REMOTE: "Remote",
  HYBRID: "Hybrid",
  ONSITE: "On-site",
};

/** Plain-English readiness band for a 0–100 talent-readiness score. */
function readinessLabel(score: number | null): string {
  if (score === null) return "Not yet scored";
  if (score >= 90) return "Exceptional";
  if (score >= 80) return "Highly ready";
  if (score >= 70) return "Work ready";
  if (score >= 50) return "Developing";
  return "Early stage";
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function CandidateProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const employer = await getSessionEmployer();
  if (!employer) {
    return (
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-navy">Candidate profile</h1>
        <Card className="mt-6 flex flex-col items-center gap-2 py-10 text-center">
          <FileText className="size-8 text-slate-300" aria-hidden="true" />
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

  const { id } = await params;

  const learner = await prisma.learnerProfile.findUnique({
    where: { id },
    include: {
      user: true,
      certificates: { orderBy: { issuedAt: "desc" } },
    },
  });

  if (!learner || !learner.inTalentPool) notFound();

  const [existing, jobs] = await Promise.all([
    prisma.candidatePipeline.findFirst({
      where: { employerId: employer.id, learnerId: learner.id },
    }),
    prisma.job.findMany({
      where: { employerId: employer.id, status: "OPEN" },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const name = learner.user?.name ?? "Candidate";
  const score = learner.talentReadinessScore;

  return (
    <div className="mx-auto max-w-5xl">
      {/* Breadcrumb */}
      <Link
        href="/employer/talent"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-brand-700"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Back to talent pool
      </Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Header / readiness */}
          <Card className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:text-left">
            <ProgressRing value={score ?? 0} size={140}>
              <span className="flex flex-col items-center leading-tight">
                <span className="font-display text-3xl font-extrabold text-navy">
                  {score ?? "—"}
                </span>
                <span className="text-xs font-semibold text-slate-400">/ 100</span>
              </span>
            </ProgressRing>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-navy">{name}</h1>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-500">
                <MapPin className="size-4" aria-hidden="true" />
                {learner.location ?? "Location not set"}
              </p>
              <div className="mt-3">
                <Badge tone="brand">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  {readinessLabel(score)}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Bio */}
          {learner.bio ? (
            <Card>
              <h2 className="text-sm font-bold text-navy">About</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                {learner.bio}
              </p>
            </Card>
          ) : null}

          {/* Key details */}
          <Card>
            <h2 className="text-sm font-bold text-navy">At a glance</h2>

            {learner.preferredIndustries.length > 0 ? (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Preferred industries
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {learner.preferredIndustries.map((industry) => (
                    <Badge key={industry} tone="outline">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}

            <dl className="mt-4 grid gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-2.5">
                <CalendarClock
                  className="mt-0.5 size-4 shrink-0 text-slate-400"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Availability
                  </dt>
                  <dd className="text-sm font-semibold text-navy">
                    {learner.availability ?? "—"}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-slate-400"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Work mode
                  </dt>
                  <dd className="text-sm font-semibold text-navy">
                    {learner.workMode
                      ? (workModeLabel[learner.workMode] ?? learner.workMode)
                      : "—"}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <PoundSterling
                  className="mt-0.5 size-4 shrink-0 text-slate-400"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Salary target
                  </dt>
                  <dd className="text-sm font-semibold text-navy">
                    {formatGBP(learner.desiredSalaryPennies)}
                  </dd>
                </div>
              </div>
            </dl>
          </Card>

          {/* Certificates */}
          <Card>
            <h2 className="text-sm font-bold text-navy">
              CPD certificates
              <span className="ml-2 text-xs font-semibold text-slate-400">
                {learner.certificates.length}
              </span>
            </h2>

            {learner.certificates.length === 0 ? (
              <div className="mt-4 flex flex-col items-center gap-2 py-6 text-center">
                <Award className="size-7 text-slate-300" aria-hidden="true" />
                <p className="text-sm text-slate-500">No certificates yet.</p>
              </div>
            ) : (
              <ul className="mt-4 divide-y divide-slate-100">
                {learner.certificates.map((cert) => (
                  <li
                    key={cert.id}
                    className="flex items-start justify-between gap-3 py-3"
                  >
                    <div className="min-w-0">
                      <p className="inline-flex items-center gap-2 font-semibold text-navy">
                        <Award
                          className="size-4 shrink-0 text-brand-600"
                          aria-hidden="true"
                        />
                        {cert.title}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {formatHours(cert.cpdHours)} CPD · Issued{" "}
                        {formatDate(cert.issuedAt)}
                      </p>
                    </div>
                    <Link
                      href={`/verify/${cert.certificateId}`}
                      className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-600 transition-colors hover:text-brand-700"
                    >
                      Verify
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {/* Media placeholders */}
          <Card>
            <h2 className="text-sm font-bold text-navy">CV & introduction</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm font-medium text-slate-400">
                <FileText className="size-4" aria-hidden="true" />
                CV — placeholder
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm font-medium text-slate-400">
                <Video className="size-4" aria-hidden="true" />
                Video intro — placeholder
              </span>
            </div>
          </Card>
        </div>

        {/* Sidebar — request interview / pipeline status */}
        <div>
          <GlassCard className="lg:sticky lg:top-8">
            {existing ? (
              <>
                <h2 className="font-semibold text-navy">In your pipeline</h2>
                <p className="mt-1 text-sm text-slate-500">
                  You&apos;re already tracking this candidate.
                </p>
                <div className="mt-4">
                  <PipelineStageBadge stage={existing.stage} />
                </div>
                <Link
                  href="/employer/pipeline"
                  className={buttonVariants({
                    variant: "outline",
                    className: "mt-5 w-full",
                  })}
                >
                  View in pipeline
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </>
            ) : (
              <>
                <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <BadgeCheck className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-semibold text-navy">Request interview</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Add {name.split(" ")[0]} to your pipeline and request an
                  interview.
                </p>

                <form action={requestInterview} className="mt-5 flex flex-col gap-4">
                  <input type="hidden" name="learnerId" value={learner.id} />

                  <Field label="Role (optional)" htmlFor="jobId">
                    <Select id="jobId" name="jobId" defaultValue="">
                      <option value="">No specific role</option>
                      {jobs.map((job) => (
                        <option key={job.id} value={job.id}>
                          {job.title}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <button
                    type="submit"
                    className={buttonVariants({
                      variant: "primary",
                      className: "w-full",
                    })}
                  >
                    Request interview
                  </button>
                </form>
              </>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
