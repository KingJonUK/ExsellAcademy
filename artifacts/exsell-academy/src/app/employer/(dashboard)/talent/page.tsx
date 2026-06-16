import { useMemo, useState } from "react";
import Link from "next/link";
import { SlidersHorizontal, Users } from "lucide-react";
import { employerCandidates, type WorkMode } from "@/lib/data/employer-demo";
import { Card } from "@/components/ui/card";
import { Field, Input, Select } from "@/components/ui/form";
import { buttonVariants } from "@/components/ui/button";
import { CandidateCard, type CandidateCardData } from "@/components/employer/candidate-card";

const WORK_MODES: WorkMode[] = ["REMOTE", "HYBRID", "ONSITE"];
const AVAILABILITY_VALUES = [
  "Immediately",
  "Within 1 month",
  "Within 3 months",
  "Just exploring",
];

type Filters = {
  minScore: string;
  workMode: string;
  location: string;
  availability: string;
  industry: string;
};

const EMPTY_FILTERS: Filters = {
  minScore: "",
  workMode: "",
  location: "",
  availability: "",
  industry: "",
};

export default function TalentPoolPage() {
  // Draft values live in the form inputs; `applied` drives the result list.
  const [draft, setDraft] = useState<Filters>(EMPTY_FILTERS);
  const [applied, setApplied] = useState<Filters>(EMPTY_FILTERS);

  const candidates: CandidateCardData[] = useMemo(() => {
    const minScoreNum = Number(applied.minScore);
    return employerCandidates
      .filter((learner) => {
        if (!learner.inTalentPool) return false;
        if (
          applied.minScore &&
          !Number.isNaN(minScoreNum) &&
          (learner.talentReadinessScore ?? 0) < minScoreNum
        ) {
          return false;
        }
        if (
          WORK_MODES.includes(applied.workMode as WorkMode) &&
          learner.workMode !== applied.workMode
        ) {
          return false;
        }
        if (
          applied.location &&
          !(learner.location ?? "")
            .toLowerCase()
            .includes(applied.location.toLowerCase())
        ) {
          return false;
        }
        if (applied.availability && learner.availability !== applied.availability) {
          return false;
        }
        if (
          applied.industry &&
          !learner.preferredIndustries.includes(applied.industry)
        ) {
          return false;
        }
        return true;
      })
      .sort(
        (a, b) =>
          (b.talentReadinessScore ?? 0) - (a.talentReadinessScore ?? 0),
      )
      .map((learner) => ({
        id: learner.id,
        name: learner.user?.name ?? "Candidate",
        location: learner.location,
        workMode: learner.workMode,
        availability: learner.availability,
        score: learner.talentReadinessScore,
        industries: learner.preferredIndustries,
        desiredSalaryPennies: learner.desiredSalaryPennies,
        certificateCount: learner.certificates.length,
      }));
  }, [applied]);

  const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApplied(draft);
  };

  const handleClear = () => {
    setDraft(EMPTY_FILTERS);
    setApplied(EMPTY_FILTERS);
  };

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
          onSubmit={handleApply}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <Field label="Minimum readiness" htmlFor="minScore">
            <Select
              id="minScore"
              name="minScore"
              value={draft.minScore}
              onChange={(e) =>
                setDraft((d) => ({ ...d, minScore: e.target.value }))
              }
            >
              <option value="">Any score</option>
              <option value="70">70+</option>
              <option value="80">80+</option>
              <option value="90">90+</option>
            </Select>
          </Field>

          <Field label="Work mode" htmlFor="workMode">
            <Select
              id="workMode"
              name="workMode"
              value={draft.workMode}
              onChange={(e) =>
                setDraft((d) => ({ ...d, workMode: e.target.value }))
              }
            >
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
              value={draft.availability}
              onChange={(e) =>
                setDraft((d) => ({ ...d, availability: e.target.value }))
              }
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
              value={draft.location}
              onChange={(e) =>
                setDraft((d) => ({ ...d, location: e.target.value }))
              }
            />
          </Field>

          <Field label="Industry" htmlFor="industry">
            <Input
              id="industry"
              name="industry"
              type="text"
              placeholder="e.g. SaaS"
              value={draft.industry}
              onChange={(e) =>
                setDraft((d) => ({ ...d, industry: e.target.value }))
              }
            />
          </Field>

          <div className="flex items-end gap-3">
            <button
              type="submit"
              className={buttonVariants({ variant: "primary" })}
            >
              Apply
            </button>
            <button
              type="button"
              onClick={handleClear}
              className={buttonVariants({ variant: "outline" })}
            >
              Clear
            </button>
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
