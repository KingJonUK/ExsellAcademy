import { cn } from "@/lib/utils";

/**
 * Circular progress ring, mirroring the hero ScoreRing approach with an
 * inline SVG. Size scales the SVG box; value (0–100) drives the arc.
 */
export function ProgressRing({
  value,
  size = 64,
  strokeWidth = 6,
  label,
  className,
  trackClassName = "text-slate-100",
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
  const clamped = Math.min(100, Math.max(0, value));
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  const valueSize = size >= 96 ? "text-2xl" : "text-sm";

  return (
    <div
      className={cn("relative grid place-items-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        className="-rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={trackClassName}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={arcClassName}
        />
      </svg>
      <span className="absolute flex flex-col items-center leading-none">
        <span className={cn("font-display font-extrabold text-navy", valueSize)}>
          {clamped}
        </span>
        {label ? (
          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            {label}
          </span>
        ) : null}
      </span>
    </div>
  );
}
