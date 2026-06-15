import type { ReactNode } from "react";
import Link from "next/link";
import { Bell, LogOut } from "lucide-react";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";
import { dashboardNav } from "@/components/dashboard/nav";
import { cn } from "@/lib/utils";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-ink">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white px-5 py-6 lg:flex">
        <Logo />

        <nav className="mt-10 flex flex-1 flex-col gap-1">
          {dashboardNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                item.active
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-navy",
              )}
              aria-current={item.active ? "page" : undefined}
            >
              <item.icon className="size-5" aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User block + back to site */}
        <div className="mt-6 border-t border-slate-200 pt-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-accent-500 text-sm font-bold text-white shadow-soft">
              SA
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-navy">Sofia Ahmed</p>
              <p className="text-xs text-slate-500">Learner</p>
            </div>
          </div>
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-brand-700"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Back to site
          </Link>
        </div>
      </aside>

      {/* Content column (offset for sidebar on lg+) */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <MobileSidebar />

          {/* Page title slot */}
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="lg:hidden">
              <Logo />
            </span>
            <span className="hidden text-sm font-semibold text-slate-500 lg:inline">
              Learner Dashboard
            </span>
          </div>

          <Badge tone="brand" className="hidden sm:inline-flex">
            Preview
          </Badge>

          <button
            type="button"
            className="relative grid size-10 place-items-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell className="size-5" aria-hidden="true" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-accent-500 ring-2 ring-white" />
          </button>
        </header>

        <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
