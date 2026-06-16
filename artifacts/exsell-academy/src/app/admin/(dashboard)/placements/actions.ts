import {
  togglePlacementCheckIn,
  updateFeeStatus,
  updatePlacementStatus,
  type CheckIn,
  type PaymentStatus,
  type PlacementStatus,
} from "@/lib/data/admin-demo";

const PLACEMENT_STATUSES: PlacementStatus[] = [
  "PENDING",
  "STARTED",
  "FEE_DUE",
  "FEE_PAID",
  "COMPLETED",
  "FELL_THROUGH",
];
const PAYMENT_STATUSES: PaymentStatus[] = ["PENDING", "PAID", "FAILED", "REFUNDED"];
const CHECK_INS = ["check30", "check60", "check90"] as const;

export function setPlacementStatus(id: string, status: PlacementStatus): void {
  if (!id || !PLACEMENT_STATUSES.includes(status)) return;
  updatePlacementStatus(id, status);
}

export function setFeeStatus(
  id: string,
  feeStatus: PaymentStatus,
  feePoundsRaw: string,
): void {
  if (!id || !PAYMENT_STATUSES.includes(feeStatus)) return;
  let feePennies: number | undefined;
  const trimmed = feePoundsRaw.trim();
  if (trimmed) {
    const pounds = Number(trimmed);
    if (!Number.isNaN(pounds) && pounds >= 0) feePennies = Math.round(pounds * 100);
  }
  updateFeeStatus(id, feeStatus, feePennies);
}

export function toggleCheckIn(id: string, which: string): void {
  if (!id || !CHECK_INS.includes(which as CheckIn)) return;
  togglePlacementCheckIn(id, which as CheckIn);
}
