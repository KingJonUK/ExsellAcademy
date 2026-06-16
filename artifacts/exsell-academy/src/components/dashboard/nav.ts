import {
  type LucideIcon,
  Award,
  BookOpen,
  LayoutDashboard,
  Settings,
  Target,
} from "lucide-react";

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

/**
 * Shared dashboard navigation. Kept in a plain (non-"use client") module so
 * both the server layout and the client mobile drawer can import the real
 * array — importing data out of a client module yields client references.
 * Active state is computed at render time from usePathname() in SidebarNav.
 */
export const dashboardNav: DashboardNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Courses", href: "/dashboard/courses", icon: BookOpen },
  { label: "Certificates", href: "/dashboard/certificates", icon: Award },
  { label: "Talent Profile", href: "#", icon: Target },
  { label: "Settings", href: "#", icon: Settings },
];
