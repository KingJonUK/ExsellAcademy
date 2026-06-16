"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardNav } from "@/components/dashboard/nav";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string): boolean {
  if (href === "#") return false;
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
}

export function SidebarNav({
  className,
  onItemClick,
  variant = "desktop",
}: {
  className?: string;
  onItemClick?: () => void;
  variant?: "desktop" | "mobile";
}) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      {dashboardNav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={onItemClick}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all",
              active
                ? variant === "desktop"
                  ? "bg-gradient-to-r from-brand-50 to-violet-50 text-brand-700 shadow-soft"
                  : "bg-brand-50 text-brand-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-navy",
            )}
          >
            {active && variant === "desktop" ? (
              <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-brand-600 to-violet-600" />
            ) : null}
            <item.icon className="size-5" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
