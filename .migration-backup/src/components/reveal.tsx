"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";

/** Fade-and-rise on scroll into view. Honors reduced-motion via Framer Motion. */
export function Reveal({
  delay = 0,
  ...props
}: ComponentProps<typeof motion.div> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    />
  );
}
