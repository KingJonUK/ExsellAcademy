import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Premium frosted-glass panel with an optional gradient hairline border and
 * depth shadow. Use on light or aurora backgrounds.
 */
export function GlassCard({
  className,
  gradient = true,
  ...props
}: ComponentProps<"div"> & { gradient?: boolean }) {
  return (
    <div
      className={cn(
        "glass-card rounded-3xl p-6 shadow-md",
        gradient && "gradient-border",
        className,
      )}
      {...props}
    />
  );
}
