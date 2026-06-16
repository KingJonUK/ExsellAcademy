import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "dark",
  href = "/",
}: {
  className?: string;
  variant?: "dark" | "light";
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="ExSell Academy home"
    >
      <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 font-display text-lg font-extrabold text-white shadow-soft">
        E
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight">
        <span className={variant === "light" ? "text-white" : "text-navy"}>
          ExSell
        </span>{" "}
        <span
          className={cn(
            "font-semibold",
            variant === "light" ? "text-slate-300" : "text-slate-400",
          )}
        >
          Academy
        </span>
      </span>
    </Link>
  );
}
