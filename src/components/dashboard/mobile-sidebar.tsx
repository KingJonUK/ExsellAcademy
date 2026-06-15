"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { dashboardNav } from "@/components/dashboard/nav";
import { cn } from "@/lib/utils";

/**
 * Mobile-only sidebar drawer. The trigger button shows on small screens; the
 * desktop sidebar (in the layout) takes over from lg+.
 */
export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="grid size-10 place-items-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[80%] flex-col border-r border-slate-200 bg-white p-5 shadow-glow">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
                aria-label="Close navigation menu"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="mt-8 flex flex-1 flex-col gap-1">
              {dashboardNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                    item.active
                      ? "bg-brand-50 text-brand-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-navy",
                  )}
                >
                  <item.icon className="size-5" aria-hidden="true" />
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="mt-4 text-sm font-semibold text-slate-500 hover:text-brand-700"
            >
              ← Back to site
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
