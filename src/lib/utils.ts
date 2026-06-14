import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names without conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a GBP price, or "Free" / "Funded" labels for special courses. */
export function formatPrice(price: number | null, funded?: boolean): string {
  if (funded) return "Funded";
  if (price === null || price === 0) return "Free";
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
  }).format(price);
}

/** "12 hrs" style duration label. */
export function formatHours(hours: number): string {
  return `${hours} ${hours === 1 ? "hr" : "hrs"}`;
}

/** Build a public certificate verification id, e.g. EXS-2026-000184. */
export function certificateId(year: number, sequence: number): string {
  return `EXS-${year}-${String(sequence).padStart(6, "0")}`;
}
