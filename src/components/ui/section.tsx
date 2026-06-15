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

const eyebrowTones = {
  brand: "text-brand-600",
  light: "text-brand-300",
  accent: "text-accent-600",
  violet: "text-violet-600",
} as const;

export function Eyebrow({
  className,
  tone = "brand",
  ...props
}: ComponentProps<"p"> & { tone?: keyof typeof eyebrowTones }) {
  return (
    <p
      className={cn(
        "mb-3 text-sm font-semibold uppercase tracking-[0.18em]",
        eyebrowTones[tone],
        className,
      )}
      {...props}
    />
  );
}

/** Heading block: optional eyebrow, title and supporting description. */
export function SectionHeading({
  eyebrow,
  eyebrowTone,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  eyebrowTone?: keyof typeof eyebrowTones;
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
      {eyebrow ? <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow> : null}
      <h2 className="text-display text-navy">{title}</h2>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}
