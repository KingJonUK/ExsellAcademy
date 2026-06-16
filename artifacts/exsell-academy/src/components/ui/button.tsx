import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "accent"
  | "secondary"
  | "outline"
  | "ghost"
  | "white";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-60";

const variantStyles: Record<Variant, string> = {
  primary: "bg-brand-600 text-white shadow-soft hover:bg-brand-700 hover:-translate-y-0.5",
  accent: "bg-accent-500 text-navy shadow-soft hover:bg-accent-400 hover:-translate-y-0.5",
  secondary: "bg-brand-50 text-brand-700 hover:bg-brand-100",
  outline:
    "border border-slate-300 bg-white text-ink hover:border-brand-400 hover:text-brand-700",
  ghost: "text-ink hover:bg-slate-100",
  white: "bg-white text-brand-700 shadow-soft hover:-translate-y-0.5",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variantStyles[variant], sizeStyles[size], className);
}

export function Button({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return (
    <button className={buttonVariants({ variant, size, className })} {...props} />
  );
}
