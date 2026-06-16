"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";

export function MobileSidebar({ learnerName }: { learnerName?: string }) {
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

            {learnerName ? (
              <p className="mt-4 text-sm font-semibold text-slate-500">
                {learnerName}
              </p>
            ) : null}

            <SidebarNav
              variant="mobile"
              className="mt-6 flex-1"
              onItemClick={() => setOpen(false)}
            />

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
