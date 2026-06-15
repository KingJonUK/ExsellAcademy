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
  active?: boolean;
};

/**
 * Shared dashboard navigation. Kept in a plain (non-"use client") module so
 * both the server layout and the client mobile drawer can import the real
 * array — importing data out of a client module yields client references.
 */
export const dashboardNav: DashboardNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, active: true },
  { label: "My Courses", href: "#", icon: BookOpen },
  { label: "Certificates", href: "#", icon: Award },
  { label: "Talent Profile", href: "#", icon: Target },
  { label: "Settings", href: "#", icon: Settings },
];
