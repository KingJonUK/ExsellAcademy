import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, LogOut } from "lucide-react";
import { Logo } from "@/components/logo";
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { isLearner, getSessionLearner } from "@/lib/learner-auth";
import { learnerLogoutAction } from "@/app/(auth)/auth-actions";

// All learner pages query the database — never prerender them at build time.
export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: ReactNode }) {
  if (!(await isLearner())) redirect("/login");

  const learner = await getSessionLearner();
  const name = learner?.user.name ?? "Learner";
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50 text-ink">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200/80 bg-white/70 px-5 py-6 backdrop-blur-xl lg:flex">
        <Logo />

        <SidebarNav className="mt-10 flex-1" />

        {/* User block */}
        <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white/60 p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-accent-500 text-sm font-bold text-white shadow-soft">
              {initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-navy">{name}</p>
              <p className="text-xs text-slate-500">Learner</p>
            </div>
          </div>
          <div className="mt-4 space-y-2 border-t border-slate-100 pt-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-brand-700"
            >
              <ArrowUpRight className="size-4" aria-hidden="true" />
              View site
            </Link>
            <form action={learnerLogoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-red-600"
              >
                <LogOut className="size-4" aria-hidden="true" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Content column (offset for sidebar on lg+) */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="glass sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200/80 px-4 sm:px-6 lg:px-8">
          <MobileSidebar learnerName={name} />

          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="lg:hidden">
              <Logo />
            </span>
            <span className="hidden text-sm font-semibold text-slate-500 lg:inline">
              Learner Dashboard
            </span>
          </div>
        </header>

        <main className="relative px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          {/* Soft aurora wash behind dashboard content */}
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-aurora opacity-40" />
          {children}
        </main>
      </div>
    </div>
  );
}
