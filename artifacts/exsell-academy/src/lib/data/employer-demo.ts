/**
 * Static demo data for the EMPLOYER portal (Acme Sales Co persona).
 *
 * This replaces the original Prisma-backed queries with an in-memory store so
 * the converted Vite + React app keeps full functional parity. Mutations
 * (request interview, advance pipeline stage, post a role) mutate these arrays
 * and the pages mirror the changes with local React state. Seed data mirrors
 * `.migration-backup/prisma/seed.ts`.
 */
import { courses } from "@/lib/data/courses";

export type WorkMode = "REMOTE" | "HYBRID" | "ONSITE";

export type PipelineStage =
  | "SUBMITTED"
  | "INTERVIEW_REQUESTED"
  | "INTERVIEW_BOOKED"
  | "OFFER_MADE"
  | "OFFER_ACCEPTED"
  | "STARTED"
  | "REJECTED";

export type PlacementStatus =
  | "PENDING"
  | "STARTED"
  | "FEE_DUE"
  | "FEE_PAID"
  | "COMPLETED"
  | "FELL_THROUGH";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface DemoUser {
  name: string;
  email: string;
}

export interface DemoCertificate {
  id: string;
  certificateId: string;
  title: string;
  cpdHours: number;
  issuedAt: Date;
}

export interface DemoLearner {
  id: string;
  user: DemoUser;
  location: string | null;
  workMode: WorkMode | null;
  availability: string | null;
  preferredIndustries: string[];
  desiredSalaryPennies: number | null;
  bio: string | null;
  talentReadinessScore: number | null;
  inTalentPool: boolean;
  certificates: DemoCertificate[];
}

export interface DemoJob {
  id: string;
  title: string;
  description: string | null;
  workMode: WorkMode;
  location: string | null;
  industry: string | null;
  minReadinessScore: number | null;
  status: "OPEN" | "CLOSED";
  createdAt: Date;
}

export interface DemoPipelineEntry {
  id: string;
  employerId: string;
  learnerId: string;
  jobId: string | null;
  stage: PipelineStage;
  notes: string | null;
  updatedAt: Date;
}

export interface DemoPlacement {
  id: string;
  learnerId: string;
  employerId: string;
  jobId: string | null;
  pipelineId: string;
  status: PlacementStatus;
  startDate: Date | null;
  feePennies: number | null;
  feeStatus: PaymentStatus;
  createdAt: Date;
}

/** The seeded demo company the portal operates as (single-tenant preview). */
export const demoEmployer = {
  id: "emp-acme",
  companyName: "Acme Sales Co",
  industry: "SaaS",
  location: "London",
};

const courseBySlug = new Map(courses.map((c) => [c.slug, c]));

let certSeq = 1001;
function buildCerts(slugs: string[]): DemoCertificate[] {
  return slugs
    .map((slug) => {
      const course = courseBySlug.get(slug);
      if (!course) return null;
      const certificateId = `EXS-2026-${String(certSeq++).padStart(6, "0")}`;
      return {
        id: `cert-${certificateId}`,
        certificateId,
        title: course.title,
        cpdHours: course.cpdHours,
        issuedAt: new Date("2026-05-20"),
      } satisfies DemoCertificate;
    })
    .filter((c): c is DemoCertificate => c !== null);
}

const candidateSeeds: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  workMode: WorkMode;
  availability: string;
  preferredIndustries: string[];
  desiredSalaryPennies: number;
  bio: string;
  score: number;
  inPool: boolean;
  certs: string[];
}[] = [
  {
    id: "ln-sofia", firstName: "Sofia", lastName: "Ahmed", email: "sofia.ahmed@talent.example.com",
    location: "London", workMode: "HYBRID", availability: "Immediately",
    preferredIndustries: ["SaaS", "Technology"], desiredSalaryPennies: 2800000,
    bio: "Ambitious and resilient, motivated by clear targets and progression.",
    score: 87, inPool: true, certs: ["sales-foundations", "communication-skills"],
  },
  {
    id: "ln-marcus", firstName: "Marcus", lastName: "Reid", email: "marcus.reid@talent.example.com",
    location: "Glasgow", workMode: "REMOTE", availability: "Immediately",
    preferredIndustries: ["Software", "SaaS"], desiredSalaryPennies: 2900000,
    bio: "Self-motivated fast learner targeting a remote SDR role in software sales.",
    score: 90, inPool: true, certs: ["sales-foundations", "prospecting-essentials", "ai-for-sales"],
  },
  {
    id: "ln-chloe", firstName: "Chloe", lastName: "Williams", email: "chloe.williams@talent.example.com",
    location: "London", workMode: "HYBRID", availability: "Immediately",
    preferredIndustries: ["Media", "SaaS"], desiredSalaryPennies: 3200000,
    bio: "Confident communicator with strong negotiation instincts and interview polish.",
    score: 92, inPool: true, certs: ["sales-foundations", "negotiation-basics", "interview-readiness"],
  },
  {
    id: "ln-aisha", firstName: "Aisha", lastName: "Khan", email: "aisha.khan@talent.example.com",
    location: "Manchester", workMode: "REMOTE", availability: "Immediately",
    preferredIndustries: ["Technology", "Fintech"], desiredSalaryPennies: 2700000,
    bio: "People-first and goal-driven, keen to build a long-term tech sales career.",
    score: 78, inPool: true, certs: ["sales-foundations", "prospecting-essentials"],
  },
  {
    id: "ln-daniel", firstName: "Daniel", lastName: "Owusu", email: "daniel.owusu@talent.example.com",
    location: "Birmingham", workMode: "ONSITE", availability: "Within 1 month",
    preferredIndustries: ["Recruitment", "B2B Services"], desiredSalaryPennies: 2600000,
    bio: "Worked through university in retail and discovered a talent for selling.",
    score: 81, inPool: true, certs: ["sales-foundations"],
  },
  {
    id: "ln-priya", firstName: "Priya", lastName: "Patel", email: "priya.patel@talent.example.com",
    location: "Leeds", workMode: "HYBRID", availability: "Within 1 month",
    preferredIndustries: ["Healthcare", "B2B Services"], desiredSalaryPennies: 3000000,
    bio: "Calm under pressure with a knack for handling objections and building trust.",
    score: 84, inPool: true, certs: ["communication-skills", "objection-handling"],
  },
  {
    id: "ln-tomasz", firstName: "Tomasz", lastName: "Nowak", email: "tomasz.nowak@talent.example.com",
    location: "Manchester", workMode: "REMOTE", availability: "Within 1 month",
    preferredIndustries: ["Technology"], desiredSalaryPennies: 2750000,
    bio: "Comfortable with sales tooling and AI workflows; organised and productive.",
    score: 80, inPool: true, certs: ["crm-and-sales-technology", "ai-for-sales"],
  },
  {
    id: "ln-jordan", firstName: "Jordan", lastName: "Smith", email: "jordan.smith@talent.example.com",
    location: "Bristol", workMode: "ONSITE", availability: "Within 3 months",
    preferredIndustries: ["Retail", "FMCG"], desiredSalaryPennies: 2500000,
    bio: "Personable and consistent, eager to start a structured sales career.",
    score: 73, inPool: true, certs: ["sales-foundations"],
  },
  {
    id: "ln-ella", firstName: "Ella", lastName: "Brown", email: "ella.brown@talent.example.com",
    location: "Liverpool", workMode: "ONSITE", availability: "Just exploring",
    preferredIndustries: ["Property"], desiredSalaryPennies: 2400000,
    bio: "Exploring whether sales is the right path; completing foundational training.",
    score: 70, inPool: false, certs: ["sales-foundations"],
  },
  {
    id: "ln-noah", firstName: "Noah", lastName: "Green", email: "noah.green@talent.example.com",
    location: "Sheffield", workMode: "HYBRID", availability: "Within 1 month",
    preferredIndustries: ["Technology", "Fintech"], desiredSalaryPennies: 2850000,
    bio: "Mid-way through the pathway; profile not yet released to the talent pool.",
    score: 76, inPool: false, certs: [],
  },
];

export const employerCandidates: DemoLearner[] = candidateSeeds.map((c) => ({
  id: c.id,
  user: { name: `${c.firstName} ${c.lastName}`, email: c.email },
  location: c.location,
  workMode: c.workMode,
  availability: c.availability,
  preferredIndustries: c.preferredIndustries,
  desiredSalaryPennies: c.desiredSalaryPennies,
  bio: c.bio,
  talentReadinessScore: c.score,
  inTalentPool: c.inPool,
  certificates: buildCerts(c.certs),
}));

export const employerJobs: DemoJob[] = [
  {
    id: "job-sdr",
    title: "Sales Development Representative",
    description: "Outbound prospecting and qualification for our SaaS sales team.",
    workMode: "HYBRID", location: "London", industry: "SaaS",
    minReadinessScore: 75, status: "OPEN", createdAt: new Date("2026-04-01"),
  },
  {
    id: "job-ae",
    title: "Junior Account Executive",
    description: "Own a pipeline of small-business deals end to end, with mentoring.",
    workMode: "REMOTE", location: "Remote (UK)", industry: "Software",
    minReadinessScore: 80, status: "OPEN", createdAt: new Date("2026-04-03"),
  },
  {
    id: "job-isa",
    title: "Inside Sales Associate",
    description: "Warm inbound and renewals from our Manchester hub.",
    workMode: "ONSITE", location: "Manchester", industry: "B2B Services",
    minReadinessScore: 70, status: "OPEN", createdAt: new Date("2026-04-05"),
  },
];

export const employerPipeline: DemoPipelineEntry[] = [
  {
    id: "pipe-chloe", employerId: demoEmployer.id, learnerId: "ln-chloe", jobId: "job-sdr",
    stage: "OFFER_MADE", notes: "Excellent final interview — offer extended.",
    updatedAt: new Date("2026-05-28"),
  },
  {
    id: "pipe-marcus", employerId: demoEmployer.id, learnerId: "ln-marcus", jobId: "job-ae",
    stage: "INTERVIEW_BOOKED", notes: "First interview booked for next week.",
    updatedAt: new Date("2026-05-26"),
  },
  {
    id: "pipe-sofia", employerId: demoEmployer.id, learnerId: "ln-sofia", jobId: "job-sdr",
    stage: "STARTED", notes: "Accepted offer and started in role.",
    updatedAt: new Date("2026-06-02"),
  },
];

export const employerPlacements: DemoPlacement[] = [
  {
    id: "plc-sofia", learnerId: "ln-sofia", employerId: demoEmployer.id, jobId: "job-sdr",
    pipelineId: "pipe-sofia", status: "STARTED", startDate: new Date("2026-06-02"),
    feePennies: 350000, feeStatus: "PENDING", createdAt: new Date("2026-06-02"),
  },
];

let idSeq = 1;
export function nextId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${idSeq++}`;
}

export function getCandidate(id: string): DemoLearner | undefined {
  return employerCandidates.find((c) => c.id === id);
}

export function getJob(id: string | null): DemoJob | undefined {
  if (!id) return undefined;
  return employerJobs.find((j) => j.id === id);
}

export function findPipelineForLearner(learnerId: string): DemoPipelineEntry | undefined {
  return employerPipeline.find(
    (p) => p.employerId === demoEmployer.id && p.learnerId === learnerId,
  );
}
