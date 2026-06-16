import { ProgressRing as SharedProgressRing } from "@/components/ui/progress-ring";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { cn } from "@/lib/utils";

/**
 * Dashboard progress ring — a thin wrapper around the shared
 * `@/components/ui/progress-ring` so there is a single ring implementation.
 * Renders an animated counter in the centre with an optional small label.
 */
export function ProgressRing({
  value,
  size = 64,
  strokeWidth = 6,
  label,
  className,
  trackClassName = "text-slate-200",
  arcClassName = "text-accent-500",
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  /** Optional small label rendered under the value. */
  label?: string;
  className?: string;
  trackClassName?: string;
  arcClassName?: string;
}) {
  const valueSize = size >= 96 ? "text-2xl" : "text-sm";

  return (
    <SharedProgressRing
      value={value}
      size={size}
      stroke={strokeWidth}
      className={className}
      trackClassName={trackClassName}
      ringClassName={arcClassName}
    >
      <span className="flex flex-col items-center leading-none">
        <span className={cn("font-display font-extrabold text-navy", valueSize)}>
          <AnimatedCounter value={Math.min(100, Math.max(0, value))} />
        </span>
        {label ? (
          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            {label}
          </span>
        ) : null}
      </span>
    </SharedProgressRing>
  );
}
