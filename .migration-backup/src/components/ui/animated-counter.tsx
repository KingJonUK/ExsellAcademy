"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

/**
 * Counts up to `value` when scrolled into view. Drives the DOM directly via a
 * Framer Motion tween (no React state / re-renders) and respects reduced
 * motion. The initial render shows the final value, so it's correct without JS.
 */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.6,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const format = (n: number) =>
    `${prefix}${n.toLocaleString("en-GB", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.textContent = format(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });
    return () => controls.stop();
    // format is derived from the listed deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, prefix, suffix, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
