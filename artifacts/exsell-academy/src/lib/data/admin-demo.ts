/**
 * Static demo data for the ADMIN area of ExSell Academy.
 *
 * Mirrors the shapes the original Prisma-backed admin pages expected
 * (Application / SponsorProfile / Placement with their includes). The data
 * lives in mutable in-memory arrays so the converted client pages can mutate
 * it (status changes, allocations, placement updates) and reflect the changes
 * with local React state. Source of truth: .migration-backup/prisma/seed.ts.
 */
import { courses } from "@/lib/data/courses";

export type ApplicationStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "MORE_INFO_REQUESTED"
  | "APPROVED"
  | "REJECTED";

export type PlacementStatus =
  | "PENDING"
  | "STARTED"
  | "FEE_DUE"
  | "FEE_PAID"
  | "COMPLETED"
  | "FELL_THROUGH";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface AdminCourseRef {
  id: string;
  title: string;
}

export interface AdminSponsor {
  id: string;
  organisation: string;
  type: string | null;
  about: string | null;
}

export interface AdminApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  age: number;
  location: string | null;
  educationStatus: string;
  employmentStatus: string;
  careerGoals: string;
  whySales: string;
  availability: string;
  status: ApplicationStatus;
  reviewNotes: string | null;
  safeguardingNotes: string | null;
  assignedCourseId: string | null;
  assignedSponsorId: string | null;
  createdAt: Date;
}

export interface AdminPlacement {
  id: string;
  status: PlacementStatus;
  feeStatus: PaymentStatus;
  feePennies: number | null;
  startDate: Date | null;
  check30: Date | null;
  check60: Date | null;
  check90: Date | null;
  createdAt: Date;
  learner: { user: { name: string | null; email: string } };
  employer: { companyName: string };
  job: { title: string } | null;
}

/** Published courses available for funded-course allocation (id = slug). */
export const adminCourses: AdminCourseRef[] = courses.map((c) => ({
  id: c.slug,
  title: c.title,
}));

export const publishedCourseCount = courses.length;

export const adminSponsors: AdminSponsor[] = [
  {
    id: "sp-northwind",
    organisation: "Northwind Foundation",
    type: "Charitable foundation",
    about: "Funds opportunity programmes for school leavers across the UK.",
  },
  {
    id: "sp-brightfutures",
    organisation: "BrightFutures",
    type: "Corporate CSR partner",
    about:
      "Backs the future sales workforce as part of its social impact mandate.",
  },
  {
    id: "sp-techforgood",
    organisation: "TechForGood",
    type: "Tech-for-good sponsor",
    about: "Sponsors learners pursuing careers in technology sales.",
  },
];

// Descending application dates so "recent" ordering is realistic.
const day = (n: number) => new Date(2026, 4, n);

export const adminApplications: AdminApplication[] = [
  {
    id: "app-aisha-khan",
    fullName: "Aisha Khan",
    email: "aisha.khan@example.com",
    phone: "07700 900111",
    age: 18,
    location: "Manchester",
    educationStatus: "Recently left school/college",
    employmentStatus: "Unemployed",
    careerGoals:
      "I want to build a long-term career in tech sales and eventually lead a team.",
    whySales:
      "I love talking to people and I'm motivated by clear goals and progression.",
    availability: "Immediately",
    status: "SUBMITTED",
    reviewNotes: null,
    safeguardingNotes: null,
    assignedCourseId: null,
    assignedSponsorId: null,
    createdAt: day(18),
  },
  {
    id: "app-daniel-owusu",
    fullName: "Daniel Owusu",
    email: "daniel.owusu@example.com",
    phone: "07700 900222",
    age: 21,
    location: "Birmingham",
    educationStatus: "University",
    employmentStatus: "Part-time",
    careerGoals:
      "Become a confident SDR within a year and move into account management.",
    whySales:
      "I funded my studies through part-time retail and discovered I'm good at it.",
    availability: "Within 1 month",
    status: "UNDER_REVIEW",
    reviewNotes: null,
    safeguardingNotes: null,
    assignedCourseId: null,
    assignedSponsorId: null,
    createdAt: day(16),
  },
  {
    id: "app-sofia-ahmed",
    fullName: "Sofia Ahmed",
    email: "sofia.ahmed@example.com",
    phone: "07700 900333",
    age: 19,
    location: "London",
    educationStatus: "Not in education",
    employmentStatus: "Unemployed",
    careerGoals:
      "Get my first professional role and prove myself in a sales team.",
    whySales:
      "I'm ambitious, resilient and want a career with real earning potential.",
    availability: "Immediately",
    status: "APPROVED",
    reviewNotes:
      "Strong motivation. Approved onto Sales Foundations with Northwind funding.",
    safeguardingNotes: null,
    assignedCourseId: "sales-foundations",
    assignedSponsorId: "sp-northwind",
    createdAt: day(13),
  },
  {
    id: "app-liam-murphy",
    fullName: "Liam Murphy",
    email: "liam.murphy@example.com",
    phone: "07700 900444",
    age: 24,
    location: "Leeds",
    educationStatus: "Other",
    employmentStatus: "Full-time",
    careerGoals: "Switch careers from hospitality into B2B sales.",
    whySales:
      "I've spent years selling experiences face to face and want to go further.",
    availability: "Within 3 months",
    status: "MORE_INFO_REQUESTED",
    reviewNotes:
      "Asked for current notice period and availability for online study.",
    safeguardingNotes: null,
    assignedCourseId: null,
    assignedSponsorId: null,
    createdAt: day(10),
  },
  {
    id: "app-grace-bennett",
    fullName: "Grace Bennett",
    email: "grace.bennett@example.com",
    phone: "07700 900555",
    age: 17,
    location: "Bristol",
    educationStatus: "In education",
    employmentStatus: "Student",
    careerGoals:
      "Explore whether sales is right for me before I finish college.",
    whySales: "I'm curious and want to understand the commercial world.",
    availability: "Just exploring",
    status: "REJECTED",
    reviewNotes:
      "Encouraged to start with the free Sales Foundations course and reapply.",
    safeguardingNotes:
      "Under 18 — parental consent confirmed before any future enrolment.",
    assignedCourseId: null,
    assignedSponsorId: null,
    createdAt: day(7),
  },
  {
    id: "app-marcus-reid",
    fullName: "Marcus Reid",
    email: "marcus.reid@example.com",
    phone: "07700 900666",
    age: 22,
    location: "Glasgow",
    educationStatus: "Recently left school/college",
    employmentStatus: "Unemployed",
    careerGoals:
      "Land a remote SDR role and build a career in software sales.",
    whySales:
      "I'm self-motivated and learn fast — I just need the opportunity.",
    availability: "Immediately",
    status: "APPROVED",
    reviewNotes:
      "Approved with BrightFutures funding onto Prospecting Essentials.",
    safeguardingNotes: null,
    assignedCourseId: "prospecting-essentials",
    assignedSponsorId: "sp-brightfutures",
    createdAt: day(4),
  },
];

export const adminPlacements: AdminPlacement[] = [
  {
    id: "plc-sofia-ahmed",
    status: "STARTED",
    feeStatus: "PENDING",
    feePennies: 350000,
    startDate: new Date(2026, 5, 2),
    check30: null,
    check60: null,
    check90: null,
    createdAt: day(20),
    learner: { user: { name: "Sofia Ahmed", email: "sofia.ahmed@talent.example.com" } },
    employer: { companyName: "Acme Sales Co" },
    job: { title: "Sales Development Representative" },
  },
  {
    id: "plc-marcus-reid",
    status: "FEE_PAID",
    feeStatus: "PAID",
    feePennies: 360000,
    startDate: new Date(2026, 3, 14),
    check30: new Date(2026, 4, 14),
    check60: null,
    check90: null,
    createdAt: day(12),
    learner: { user: { name: "Marcus Reid", email: "marcus.reid@talent.example.com" } },
    employer: { companyName: "Acme Sales Co" },
    job: { title: "Junior Account Executive" },
  },
  {
    id: "plc-chloe-williams",
    status: "COMPLETED",
    feeStatus: "PAID",
    feePennies: 340000,
    startDate: new Date(2026, 1, 3),
    check30: new Date(2026, 2, 3),
    check60: new Date(2026, 3, 3),
    check90: new Date(2026, 4, 3),
    createdAt: day(2),
    learner: { user: { name: "Chloe Williams", email: "chloe.williams@talent.example.com" } },
    employer: { companyName: "Acme Sales Co" },
    job: { title: "Sales Development Representative" },
  },
];

const CHECK_INS = ["check30", "check60", "check90"] as const;
export type CheckIn = (typeof CHECK_INS)[number];

/* ----------------------------- Read helpers ----------------------------- */

export function getApplications(
  status?: ApplicationStatus,
): AdminApplication[] {
  const rows = status
    ? adminApplications.filter((a) => a.status === status)
    : adminApplications.slice();
  return rows.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getApplication(id: string): AdminApplication | undefined {
  return adminApplications.find((a) => a.id === id);
}

export function getCourseRef(id: string | null): AdminCourseRef | null {
  if (!id) return null;
  return adminCourses.find((c) => c.id === id) ?? null;
}

export function getSponsorRef(id: string | null): AdminSponsor | null {
  if (!id) return null;
  return adminSponsors.find((s) => s.id === id) ?? null;
}

export function getSponsorsWithApplications() {
  return adminSponsors
    .slice()
    .sort((a, b) => a.organisation.localeCompare(b.organisation))
    .map((sponsor) => ({
      ...sponsor,
      assignedApplications: adminApplications
        .filter((a) => a.assignedSponsorId === sponsor.id)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .map((a) => ({ id: a.id, fullName: a.fullName, status: a.status })),
    }));
}

export function getPlacements(): AdminPlacement[] {
  return adminPlacements
    .slice()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

/* ----------------------------- Mutations -------------------------------- */

export function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
  reviewNotes: string,
): void {
  const app = getApplication(id);
  if (!app) return;
  app.status = status;
  app.reviewNotes = reviewNotes.trim() || null;
}

export function updateApplicationCourse(id: string, courseId: string): void {
  const app = getApplication(id);
  if (!app) return;
  app.assignedCourseId = courseId || null;
}

export function updateApplicationSponsor(id: string, sponsorId: string): void {
  const app = getApplication(id);
  if (!app) return;
  app.assignedSponsorId = sponsorId || null;
}

export function updatePlacementStatus(
  id: string,
  status: PlacementStatus,
): void {
  const placement = adminPlacements.find((p) => p.id === id);
  if (!placement) return;
  placement.status = status;
}

export function updateFeeStatus(
  id: string,
  feeStatus: PaymentStatus,
  feePennies?: number,
): void {
  const placement = adminPlacements.find((p) => p.id === id);
  if (!placement) return;
  placement.feeStatus = feeStatus;
  if (feePennies !== undefined && !Number.isNaN(feePennies) && feePennies >= 0) {
    placement.feePennies = feePennies;
  }
}

export function togglePlacementCheckIn(id: string, which: CheckIn): void {
  const placement = adminPlacements.find((p) => p.id === id);
  if (!placement) return;
  placement[which] = placement[which] ? null : new Date();
}
