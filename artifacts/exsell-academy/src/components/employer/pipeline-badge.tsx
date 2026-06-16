import type { PipelineStage } from "@/lib/data/employer-demo";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Tone = "brand" | "accent" | "neutral" | "outline" | "amber";

const stageMap: Record<PipelineStage, { label: string; tone: Tone; className?: string }> = {
  SUBMITTED: { label: "Shortlisted", tone: "neutral" },
  INTERVIEW_REQUESTED: { label: "Interview requested", tone: "brand" },
  INTERVIEW_BOOKED: { label: "Interview booked", tone: "brand" },
  OFFER_MADE: { label: "Offer made", tone: "amber" },
  OFFER_ACCEPTED: { label: "Offer accepted", tone: "accent" },
  STARTED: { label: "Started", tone: "accent" },
  REJECTED: {
    label: "Not progressing",
    tone: "outline",
    className: "border-red-200 bg-red-50 text-red-600",
  },
};

export const pipelineStageLabel = (stage: PipelineStage) => stageMap[stage].label;

/** Ordered stages for building pipeline boards / advance controls. */
export const PIPELINE_STAGES: PipelineStage[] = [
  "SUBMITTED",
  "INTERVIEW_REQUESTED",
  "INTERVIEW_BOOKED",
  "OFFER_MADE",
  "OFFER_ACCEPTED",
  "STARTED",
  "REJECTED",
];

export function PipelineStageBadge({
  stage,
  className,
}: {
  stage: PipelineStage;
  className?: string;
}) {
  const s = stageMap[stage];
  return (
    <Badge tone={s.tone} className={cn(s.className, className)}>
      {s.label}
    </Badge>
  );
}
