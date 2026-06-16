"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

/** Floating "Apply" pill that slides in once the user scrolls past the hero. */
export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href="/apply"
      className={cn(
        "fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:bg-brand-700",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <Rocket className="size-4" aria-hidden="true" />
      <span className="hidden sm:inline">Apply for Funded Training</span>
      <span className="sm:hidden">Apply</span>
    </Link>
  );
}
