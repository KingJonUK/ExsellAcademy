import {
  type LucideIcon,
  BadgeCheck,
  Briefcase,
  LayoutDashboard,
  Users,
  Workflow,
} from "lucide-react";

export type EmployerNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

/** Employer portal navigation (plain module so the server layout can import it). */
export const employerNav: EmployerNavItem[] = [
  { label: "Dashboard", href: "/employer", icon: LayoutDashboard },
  { label: "Talent pool", href: "/employer/talent", icon: Users },
  { label: "Pipeline", href: "/employer/pipeline", icon: Workflow },
  { label: "Placements", href: "/employer/placements", icon: BadgeCheck },
  { label: "Roles", href: "/employer/roles", icon: Briefcase },
];
