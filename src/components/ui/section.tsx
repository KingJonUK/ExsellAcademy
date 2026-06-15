import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A full-width page section with a centered content container. */
export function Section({
  className,
  containerClassName,
  children,
  ...props
}: ComponentProps<"section"> & { containerClassName?: string }) {
  return (
    <section className={cn("py-16 sm:py-20 lg:py-24", className)} {...props}>
      <div className={cn("container-page", containerClassName)}>{children}</div>
    </section>
  );
}

export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-600",
        className,
      )}
      {...props}
    />
  );
}

/** Heading block: optional eyebrow, title and supporting description. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-3xl font-bold text-navy sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}
