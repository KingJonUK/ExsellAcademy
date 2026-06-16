import Link from "next/link";
import { ArrowRight, Award, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/ui/progress-ring";
import { formatGBP } from "@/lib/utils";

export type CandidateCardData = {
  id: string;
  name: string;
  location: string | null;
  workMode: string | null;
  availability: string | null;
  score: number | null;
  industries: string[];
  desiredSalaryPennies: number | null;
  certificateCount: number;
};

const workModeLabel: Record<string, string> = {
  REMOTE: "Remote",
  HYBRID: "Hybrid",
  ONSITE: "On-site",
};

export function CandidateCard({ candidate }: { candidate: CandidateCardData }) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-navy">{candidate.name}</h3>
          <p className="mt-0.5 inline-flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin className="size-4" aria-hidden="true" />
            {candidate.location ?? "—"}
          </p>
        </div>
        <ProgressRing value={candidate.score ?? 0} size={64} stroke={7}>
          <span className="font-display text-sm font-extrabold text-navy">
            {candidate.score ?? "—"}
          </span>
        </ProgressRing>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {candidate.workMode ? (
          <Badge tone="brand">{workModeLabel[candidate.workMode] ?? candidate.workMode}</Badge>
        ) : null}
        {candidate.availability ? <Badge tone="neutral">{candidate.availability}</Badge> : null}
      </div>

      {candidate.industries.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {candidate.industries.slice(0, 3).map((industry) => (
            <Badge key={industry} tone="outline">
              {industry}
            </Badge>
          ))}
        </div>
      ) : null}

      <div className="mt-4 flex flex-1 flex-wrap items-end gap-x-4 gap-y-1 text-xs font-medium text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <Award className="size-4 text-slate-400" aria-hidden="true" />
          {candidate.certificateCount} CPD{" "}
          {candidate.certificateCount === 1 ? "certificate" : "certificates"}
        </span>
        <span>{formatGBP(candidate.desiredSalaryPennies)} target</span>
      </div>

      <Link
        href={`/employer/talent/${candidate.id}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600"
      >
        View profile
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
