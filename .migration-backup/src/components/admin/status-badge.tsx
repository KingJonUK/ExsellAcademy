import type { ApplicationStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Tone = "brand" | "accent" | "neutral" | "outline" | "amber";

const statusMap: Record<
  ApplicationStatus,
  { label: string; tone: Tone; className?: string }
> = {
  SUBMITTED: { label: "Submitted", tone: "neutral" },
  UNDER_REVIEW: { label: "Under review", tone: "brand" },
  MORE_INFO_REQUESTED: { label: "More info", tone: "amber" },
  APPROVED: { label: "Approved", tone: "accent" },
  REJECTED: {
    label: "Rejected",
    tone: "outline",
    className: "border-red-200 bg-red-50 text-red-600",
  },
};

export const applicationStatusLabel = (status: ApplicationStatus) =>
  statusMap[status].label;

export function ApplicationStatusBadge({
  status,
  className,
}: {
  status: ApplicationStatus;
  className?: string;
}) {
  const s = statusMap[status];
  return (
    <Badge tone={s.tone} className={cn(s.className, className)}>
      {s.label}
    </Badge>
  );
}
