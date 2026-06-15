"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/lib/site";
import { Logo } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // a11y: move focus into the menu when it opens; close on Escape.
  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="container-page pt-3">
        <nav
          aria-label="Main navigation"
          className={cn(
            "flex h-14 items-center justify-between gap-4 rounded-2xl pl-4 pr-3 transition-all duration-300",
            scrolled
              ? "glass gradient-border shadow-md"
              : "border border-white/50 bg-white/55 backdrop-blur-md",
          )}
        >
          <Logo />

          <div className="hidden items-center gap-1 lg:flex">
            {mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-900/5 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              Login
            </Link>
            <Link href="/apply" className={buttonVariants({ variant: "primary", size: "sm" })}>
              Apply Now
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-xl text-ink transition-colors hover:bg-slate-900/5 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </nav>
      </div>

      {open ? (
        <div id="mobile-menu" className="container-page lg:hidden">
          <div className="mt-2 flex flex-col gap-1 rounded-2xl glass-card p-3 shadow-md">
            {mainNav.map((link, i) => (
              <Link
                key={link.href}
                ref={i === 0 ? firstLinkRef : undefined}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-slate-900/5"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className={buttonVariants({ variant: "outline" })}
              >
                Login
              </Link>
              <Link
                href="/apply"
                onClick={() => setOpen(false)}
                className={buttonVariants({ variant: "primary" })}
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
