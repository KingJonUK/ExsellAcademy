import {
  type LucideIcon,
  Award,
  BadgeCheck,
  Briefcase,
  Building2,
  Circle,
  ClipboardCheck,
  Database,
  FileText,
  GraduationCap,
  Handshake,
  HeartHandshake,
  MessageSquareOff,
  MessagesSquare,
  Network,
  Rocket,
  Route,
  SearchX,
  ShieldCheck,
  Sparkles,
  Target,
  Telescope,
  TrendingDown,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** Curated registry so data files can reference icons by string name. */
const registry: Record<string, LucideIcon> = {
  Award,
  BadgeCheck,
  Briefcase,
  Building2,
  ClipboardCheck,
  Database,
  FileText,
  GraduationCap,
  Handshake,
  HeartHandshake,
  MessageSquareOff,
  MessagesSquare,
  Network,
  Rocket,
  Route,
  SearchX,
  ShieldCheck,
  Sparkles,
  Target,
  Telescope,
  TrendingDown,
  UserCheck,
  UserX,
  Users,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = registry[name] ?? Circle;
  return <Cmp className={cn("size-5", className)} aria-hidden="true" />;
}
