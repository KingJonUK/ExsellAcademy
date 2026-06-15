import { Check } from "lucide-react";
import { Icon } from "@/components/icon";
import { GrowLine } from "@/components/ui/grow-line";
import { pathway } from "@/lib/data/content";
import { cn } from "@/lib/utils";

/**
 * Visual certification roadmap (not a table). Reuses the marketing `pathway`
 * and paints completed / current / upcoming states, joined by an animated
 * `GrowLine` connector with premium nodes.
 */
export function CertificationJourney({
  completedSteps,
}: {
  completedSteps: number;
}) {
  return (
    <div className="relative">
      {/* Horizontal connector (lg+): a track plus an animated growing fill. */}
      <div className="pointer-events-none absolute inset-x-0 top-7 hidden lg:block">
        <div className="h-0.5 w-full rounded-full bg-slate-200" />
        <GrowLine className="absolute inset-x-0 top-0 h-0.5 rounded-full bg-gradient-to-r from-brand-500 via-violet-500 to-accent-500" />
      </div>

      <ol className="relative grid gap-x-3 gap-y-8 sm:grid-cols-2 lg:grid-cols-7">
        {pathway.map((step, i) => {
          const done = i < completedSteps;
          const current = i === completedSteps;
          return (
            <li
              key={step.label}
              className="flex flex-col items-center text-center"
            >
              <span
                className={cn(
                  "relative grid size-14 place-items-center rounded-2xl ring-1 transition-colors",
                  done
                    ? "bg-gradient-to-br from-accent-500 to-accent-600 text-white ring-accent-500 shadow-glow"
                    : current
                      ? "bg-gradient-to-br from-brand-600 to-violet-600 text-white ring-brand-500 shadow-glow"
                      : "bg-white text-slate-400 ring-slate-200 shadow-soft",
                )}
              >
                {done ? (
                  <Check className="size-6" aria-hidden="true" strokeWidth={3} />
                ) : (
                  <Icon name={step.icon} className="size-6" />
                )}
                <span
                  className={cn(
                    "absolute -right-2 -top-2 grid size-5 place-items-center rounded-full text-[10px] font-bold text-white ring-2 ring-white",
                    done
                      ? "bg-accent-600"
                      : current
                        ? "bg-brand-700"
                        : "bg-slate-300",
                  )}
                >
                  {i + 1}
                </span>
                {current ? (
                  <span className="absolute inset-0 -z-10 animate-float rounded-2xl bg-brand-400/30 blur-md" />
                ) : null}
              </span>
              <h3
                className={cn(
                  "mt-3 text-sm font-bold",
                  done || current ? "text-navy" : "text-slate-400",
                )}
              >
                {step.label}
              </h3>
              <p
                className={cn(
                  "mt-1 text-xs",
                  current
                    ? "font-semibold text-brand-600"
                    : "text-slate-500",
                )}
              >
                {current ? "In progress" : done ? "Complete" : step.description}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
