import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, LogOut } from "lucide-react";
import { isEmployer, getSessionEmployer } from "@/lib/employer-auth";
import { employerLogoutAction } from "@/app/employer/auth-actions";
import { employerNav } from "@/components/employer/nav";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function EmployerLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (!(await isEmployer())) redirect("/employer/login");
  const employer = await getSessionEmployer();
  const company = employer?.companyName ?? "Employer";

  return (
    <div className="min-h-screen bg-slate-50 text-ink">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white px-5 py-6 lg:flex">
        <Logo />
        <Badge tone="brand" className="mt-3 w-fit">
          Employer · Preview
        </Badge>

        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {employerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-navy"
            >
              <item.icon className="size-5" aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 border-t border-slate-200 pt-5">
          <p className="truncate text-sm font-bold text-navy">{company}</p>
          <p className="text-xs text-slate-500">Demo company</p>
          <div className="mt-3 space-y-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-brand-700"
            >
              <ArrowUpRight className="size-4" aria-hidden="true" />
              View site
            </Link>
            <form action={employerLogoutAction}>
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

      {/* Content column */}
      <div className="lg:pl-64">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <Logo />
          <form action={employerLogoutAction}>
            <button
              type="submit"
              className="grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"
              aria-label="Sign out"
            >
              <LogOut className="size-5" />
            </button>
          </form>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-4 py-2 lg:hidden">
          {employerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
