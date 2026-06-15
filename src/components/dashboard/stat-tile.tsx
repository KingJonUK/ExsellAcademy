import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Compact KPI tile for the dashboard stat row: an icon chip, a large value and
 * a supporting label. Optionally swap the icon chip for custom content (e.g. a
 * progress ring) via the `visual` slot.
 */
export function StatTile({
  icon: IconCmp,
  value,
  label,
  hint,
  visual,
  tone = "brand",
  className,
}: {
  icon?: LucideIcon;
  value: ReactNode;
  label: string;
  hint?: string;
  visual?: ReactNode;
  tone?: "brand" | "accent";
  className?: string;
}) {
  const chipTone =
    tone === "accent"
      ? "bg-accent-100 text-accent-700"
      : "bg-brand-50 text-brand-600 ring-1 ring-brand-100";

  return (
    <Card className={cn("flex items-center gap-4", className)}>
      {visual ? (
        <div className="shrink-0">{visual}</div>
      ) : IconCmp ? (
        <span
          className={cn(
            "grid size-12 shrink-0 place-items-center rounded-xl",
            chipTone,
          )}
        >
          <IconCmp className="size-6" aria-hidden="true" />
        </span>
      ) : null}
      <div className="min-w-0">
        <p className="font-display text-2xl font-extrabold leading-tight text-navy">
          {value}
        </p>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        {hint ? <p className="mt-0.5 text-xs text-slate-400">{hint}</p> : null}
      </div>
    </Card>
  );
}
