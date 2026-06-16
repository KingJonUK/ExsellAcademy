/** Shared domain types for the ExSell Academy platform. */

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export type CourseAccess = "free" | "paid" | "funded";

export type CourseCategory =
  | "Foundations"
  | "Communication"
  | "Prospecting"
  | "Closing"
  | "Technology"
  | "Career";

export interface Lesson {
  title: string;
  /** Minutes of content for this lesson. */
  minutes: number;
  type: "video" | "reading" | "exercise" | "quiz";
}

export interface Module {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  access: CourseAccess;
  /** GBP price for paid courses; null when free or funded. */
  price: number | null;
  durationHours: number;
  cpdHours: number;
  certificate: boolean;
  /** Lucide icon name rendered on cards. */
  icon: string;
  featured?: boolean;
  outcomes: string[];
  skills: string[];
  modules: Module[];
}

export type UserRole = "public" | "learner" | "employer" | "sponsor" | "admin";

export interface NavLink {
  label: string;
  href: string;
}
