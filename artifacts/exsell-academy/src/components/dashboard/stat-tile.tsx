import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { cn } from "@/lib/utils";

type Tone = "brand" | "accent" | "violet";

const chipTones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-600 ring-1 ring-brand-100",
  accent: "bg-accent-100 text-accent-700 ring-1 ring-accent-200",
  violet: "bg-violet-50 text-violet-600 ring-1 ring-violet-200",
};

/**
 * Premium KPI tile for the dashboard stat row: a glass panel with an icon chip
 * (or custom `visual` slot) and a large animated value. Pass a numeric `value`
 * to drive an `AnimatedCounter`, or a `ReactNode` for a pre-formatted value.
 */
export function StatTile({
  icon: IconCmp,
  value,
  suffix,
  prefix,
  label,
  hint,
  visual,
  tone = "brand",
  className,
}: {
  icon?: LucideIcon;
  value: ReactNode | number;
  suffix?: string;
  prefix?: string;
  label: string;
  hint?: ReactNode;
  visual?: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <GlassCard
      className={cn(
        "flex items-center gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated",
        className,
      )}
    >
      {visual ? (
        <div className="shrink-0">{visual}</div>
      ) : IconCmp ? (
        <span
          className={cn(
            "grid size-12 shrink-0 place-items-center rounded-2xl",
            chipTones[tone],
          )}
        >
          <IconCmp className="size-6" aria-hidden="true" />
        </span>
      ) : null}
      <div className="min-w-0">
        <p className="font-display text-3xl font-extrabold leading-none text-navy">
          {typeof value === "number" ? (
            <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
          ) : (
            value
          )}
        </p>
        <p className="mt-1.5 text-sm font-semibold text-slate-500">{label}</p>
        {hint ? <p className="mt-1 text-xs font-medium text-slate-400">{hint}</p> : null}
      </div>
    </GlassCard>
  );
}
