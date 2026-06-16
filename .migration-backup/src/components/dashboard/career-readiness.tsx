"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const STAGES = ["Foundations", "Certified", "Talent pool", "Interview-ready"] as const;

/**
 * Animated career-readiness meter: a horizontal gradient bar that fills from the
 * left when scrolled into view (honours reduced-motion via Framer Motion).
 */
export function CareerReadiness({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const clamped = Math.min(100, Math.max(0, value));
  // Roughly which stage the learner has reached.
  const reachedStage = Math.round((clamped / 100) * (STAGES.length - 1));

  return (
    <div className={cn("w-full", className)}>
      <div
        className="relative h-3.5 overflow-hidden rounded-full bg-slate-100 ring-1 ring-inset ring-slate-200"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Career readiness"
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 via-violet-500 to-accent-500 shadow-[0_0_18px_-2px_rgba(124,58,237,0.55)]"
          initial={{ width: 0 }}
          whileInView={{ width: `${clamped}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <ol className="mt-3 flex justify-between text-[11px] font-semibold">
        {STAGES.map((stage, i) => (
          <li
            key={stage}
            className={cn(
              "flex-1 text-center",
              i === 0 && "text-left",
              i === STAGES.length - 1 && "text-right",
              i <= reachedStage ? "text-navy" : "text-slate-400",
            )}
          >
            {stage}
          </li>
        ))}
      </ol>
    </div>
  );
}
