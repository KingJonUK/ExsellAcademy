import type { PlacementStatus, PaymentStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Tone = "brand" | "accent" | "neutral" | "outline" | "amber";

const placementMap: Record<PlacementStatus, { label: string; tone: Tone; className?: string }> = {
  PENDING: { label: "Pending", tone: "neutral" },
  STARTED: { label: "Started", tone: "brand" },
  FEE_DUE: { label: "Fee due", tone: "amber" },
  FEE_PAID: { label: "Fee paid", tone: "accent" },
  COMPLETED: { label: "Completed", tone: "accent" },
  FELL_THROUGH: {
    label: "Fell through",
    tone: "outline",
    className: "border-red-200 bg-red-50 text-red-600",
  },
};

const feeMap: Record<PaymentStatus, { label: string; tone: Tone }> = {
  PENDING: { label: "Unpaid", tone: "amber" },
  PAID: { label: "Paid", tone: "accent" },
  FAILED: { label: "Failed", tone: "outline" },
  REFUNDED: { label: "Refunded", tone: "neutral" },
};

export const placementStatusLabel = (status: PlacementStatus) => placementMap[status].label;
export const PLACEMENT_STATUSES = Object.keys(placementMap) as PlacementStatus[];
export const PAYMENT_STATUSES = Object.keys(feeMap) as PaymentStatus[];

export function PlacementStatusBadge({
  status,
  className,
}: {
  status: PlacementStatus;
  className?: string;
}) {
  const s = placementMap[status];
  return (
    <Badge tone={s.tone} className={cn(s.className, className)}>
      {s.label}
    </Badge>
  );
}

export function FeeStatusBadge({ status }: { status: PaymentStatus }) {
  const s = feeMap[status];
  return <Badge tone={s.tone}>{s.label}</Badge>;
}
