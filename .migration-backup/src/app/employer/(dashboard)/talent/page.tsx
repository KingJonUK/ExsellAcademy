import type { Metadata } from "next";
import Link from "next/link";
import type { Prisma, WorkMode } from "@prisma/client";
import { Inbox, SlidersHorizontal, Users } from "lucide-react";
import { prisma } from "@/lib/db";
import { getSessionEmployer } from "@/lib/employer-auth";
import { Card } from "@/components/ui/card";
import { Field, Input, Select } from "@/components/ui/form";
import { buttonVariants } from "@/components/ui/button";
import { CandidateCard, type CandidateCardData } from "@/components/employer/candidate-card";

export const metadata: Metadata = {
  title: "Talent pool · ExSell Academy",
};

const WORK_MODES: WorkMode[] = ["REMOTE", "HYBRID", "ONSITE"];
const AVAILABILITY_VALUES = [
  "Immediately",
  "Within 1 month",
  "Within 3 months",
  "Just exploring",
];

type Search = {
  minScore?: string;
  workMode?: string;
  location?: string;
  availability?: string;
  industry?: string;
};

export default async function TalentPoolPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const employer = await getSessionEmployer();
  if (!employer) {
    return (
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold text-navy">Talent pool</h1>
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

  const params = await searchParams;

  const minScore = params.minScore?.trim() ?? "";
  const workMode = params.workMode?.trim() ?? "";
  const location = params.location?.trim() ?? "";
  const availability = params.availability?.trim() ?? "";
  const industry = params.industry?.trim() ?? "";

  const where: Prisma.LearnerProfileWhereInput = { inTalentPool: true };

  const minScoreNum = Number(minScore);
  if (minScore && !Number.isNaN(minScoreNum)) {
    where.talentReadinessScore = { gte: minScoreNum };
  }
  if (WORK_MODES.includes(workMode as WorkMode)) {
    where.workMode = workMode as WorkMode;
  }
  if (location) {
    where.location = { contains: location, mode: "insensitive" };
  }
  if (availability) {
    where.availability = availability;
  }
  if (industry) {
    where.preferredIndustries = { has: industry };
  }

  const learners = await prisma.learnerProfile.findMany({
    where,
    orderBy: { talentReadinessScore: "desc" },
    include: { user: true, _count: { select: { certificates: true } } },
  });

  const candidates: CandidateCardData[] = learners.map((learner) => ({
    id: learner.id,
    name: learner.user?.name ?? "Candidate",
    location: learner.location,
    workMode: learner.workMode,
    availability: learner.availability,
    score: learner.talentReadinessScore,
    industries: learner.preferredIndustries,
    desiredSalaryPennies: learner.desiredSalaryPennies,
    certificateCount: learner._count.certificates,
  }));

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold text-navy">Talent pool</h1>
      <p className="mt-1 text-sm text-slate-500">
        Certified, talent-readiness-scored candidates ready for your roles.
      </p>

      {/* Filter toolbar */}
      <Card className="mt-6">
        <div className="mb-4 flex items-center gap-2 text-sm font-bold text-navy">
          <SlidersHorizontal className="size-4 text-slate-400" aria-hidden="true" />
          Filters
        </div>
        <form
          method="get"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <Field label="Minimum readiness" htmlFor="minScore">
            <Select id="minScore" name="minScore" defaultValue={minScore}>
              <option value="">Any score</option>
              <option value="70">70+</option>
              <option value="80">80+</option>
              <option value="90">90+</option>
            </Select>
          </Field>

          <Field label="Work mode" htmlFor="workMode">
            <Select id="workMode" name="workMode" defaultValue={workMode}>
              <option value="">Any</option>
              <option value="REMOTE">Remote</option>
              <option value="HYBRID">Hybrid</option>
              <option value="ONSITE">On-site</option>
            </Select>
          </Field>

          <Field label="Availability" htmlFor="availability">
            <Select
              id="availability"
              name="availability"
              defaultValue={availability}
            >
              <option value="">Any</option>
              {AVAILABILITY_VALUES.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Location" htmlFor="location">
            <Input
              id="location"
              name="location"
              type="text"
              placeholder="e.g. London"
              defaultValue={location}
            />
          </Field>

          <Field label="Industry" htmlFor="industry">
            <Input
              id="industry"
              name="industry"
              type="text"
              placeholder="e.g. SaaS"
              defaultValue={industry}
            />
          </Field>

          <div className="flex items-end gap-3">
            <button
              type="submit"
              className={buttonVariants({ variant: "primary" })}
            >
              Apply
            </button>
            <Link
              href="/employer/talent"
              className={buttonVariants({ variant: "outline" })}
            >
              Clear
            </Link>
          </div>
        </form>
      </Card>

      {/* Results */}
      <p className="mt-6 text-sm font-semibold text-slate-500">
        {candidates.length}{" "}
        {candidates.length === 1 ? "candidate" : "candidates"} found
      </p>

      {candidates.length === 0 ? (
        <Card className="mt-4 flex flex-col items-center gap-2 py-12 text-center">
          <Users className="size-8 text-slate-300" aria-hidden="true" />
          <p className="text-sm font-semibold text-navy">
            No matching candidates
          </p>
          <p className="max-w-sm text-sm text-slate-500">
            Try widening your filters or clearing them to see the full talent
            pool.
          </p>
        </Card>
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      )}
    </div>
  );
}
