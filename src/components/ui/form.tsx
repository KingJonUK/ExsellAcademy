import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const controlBase =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-ink shadow-sm transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 disabled:cursor-not-allowed disabled:opacity-60";

export function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      className={cn("mb-1.5 block text-sm font-medium text-ink", className)}
      {...props}
    />
  );
}

export function Input({
  className,
  invalid,
  ...props
}: ComponentProps<"input"> & { invalid?: boolean }) {
  return (
    <input
      className={cn(controlBase, invalid && "border-red-400 focus:ring-red-400/30", className)}
      {...props}
    />
  );
}

export function Textarea({
  className,
  invalid,
  ...props
}: ComponentProps<"textarea"> & { invalid?: boolean }) {
  return (
    <textarea
      className={cn(controlBase, "min-h-28 resize-y", invalid && "border-red-400 focus:ring-red-400/30", className)}
      {...props}
    />
  );
}

export function Select({
  className,
  invalid,
  ...props
}: ComponentProps<"select"> & { invalid?: boolean }) {
  return (
    <select
      className={cn(controlBase, "appearance-none bg-[length:1.25rem] pr-10", invalid && "border-red-400 focus:ring-red-400/30", className)}
      {...props}
    />
  );
}

/** Label + control + optional hint / error message wrapper. */
export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor}>
        {label}
        {required ? <span className="ml-0.5 text-red-500">*</span> : null}
      </Label>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}
