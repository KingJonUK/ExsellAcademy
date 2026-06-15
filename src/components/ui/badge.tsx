import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Tone = "brand" | "accent" | "neutral" | "outline" | "amber";

const toneStyles: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700",
  accent: "bg-accent-100 text-accent-800",
  neutral: "bg-slate-100 text-slate-700",
  outline: "border border-slate-300 text-slate-600",
  amber: "bg-amber-100 text-amber-800",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: ComponentProps<"span"> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        toneStyles[tone],
        className,
      )}
      {...props}
    />
  );
}
