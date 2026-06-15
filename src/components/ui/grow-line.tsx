"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** A connector line that grows from the left when scrolled into view. */
export function GrowLine({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("origin-left", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
