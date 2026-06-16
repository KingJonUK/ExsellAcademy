/**
 * Authored marketing content for the public site.
 * Stats are honest placeholders — no fabricated public numbers (see `impactStats`).
 */

export interface IconItem {
  /** Lucide icon name resolved in `@/components/icon`. */
  icon: string;
  title: string;
  description: string;
}

export const trustBadges: { icon: string; label: string }[] = [
  { icon: "BadgeCheck", label: "CPD accredited" },
  { icon: "Building2", label: "Employer partnered" },
  { icon: "Route", label: "Career pathway" },
  { icon: "Award", label: "Certificate included" },
  { icon: "Briefcase", label: "Recruitment support" },
];

export const problems: IconItem[] = [
  {
    icon: "MessageSquareOff",
    title: "No sales confidence",
    description:
      "School leavers finish education without ever practising a real commercial conversation.",
  },
  {
    icon: "UserX",
    title: "No interview readiness",
    description:
      "Bright people miss out on roles simply because nobody taught them how to interview.",
  },
  {
    icon: "Network",
    title: "No workplace communication",
    description:
      "The everyday skills employers rely on — listening, writing, influence — go untaught.",
  },
  {
    icon: "SearchX",
    title: "Employers can't find talent",
    description:
      "Companies struggle to find trained, motivated entry-level sales people they can trust.",
  },
];

export const solutions: IconItem[] = [
  {
    icon: "GraduationCap",
    title: "Learn",
    description:
      "Complete structured, practical online sales training built with employers — not theory from a textbook.",
  },
  {
    icon: "Award",
    title: "Certify",
    description:
      "Pass assessments and earn CPD-recognised certification you can verify and share on LinkedIn.",
  },
  {
    icon: "Briefcase",
    title: "Get placed",
    description:
      "Meet our criteria and enter the ExSell talent network, visible to employers hiring sales-ready people.",
  },
];

export interface PathwayStep {
  label: string;
  description: string;
  icon: string;
}

export const pathway: PathwayStep[] = [
  { label: "Apply", description: "Tell us your goals", icon: "FileText" },
  { label: "Learn", description: "Complete your courses", icon: "GraduationCap" },
  { label: "Pass", description: "Clear your assessments", icon: "ClipboardCheck" },
  { label: "Certify", description: "Earn your CPD certificate", icon: "Award" },
  { label: "Join the pool", description: "Enter the talent network", icon: "Users" },
  { label: "Interview", description: "Meet hiring employers", icon: "MessagesSquare" },
  { label: "Get hired", description: "Start your sales career", icon: "Rocket" },
];

/**
 * Honest, pre-launch metrics. We deliberately do not invent public numbers;
 * these describe the model until real outcome data exists.
 */
export const impactStats: {
  value: number;
  suffix?: string;
  label: string;
  note?: string;
}[] = [
  { value: 8, label: "Career-focused courses", note: "Foundations to interview-ready" },
  { value: 44, label: "CPD hours available", note: "Across the full pathway" },
  { value: 100, suffix: "%", label: "Certified on completion", note: "Meet the criteria, earn the certificate" },
  { value: 3, label: "Connected products", note: "Academy, Foundation, Talent Network" },
];

export const employerBenefits: IconItem[] = [
  {
    icon: "ShieldCheck",
    title: "Pre-trained candidates",
    description: "Every candidate has completed structured sales training before you meet them.",
  },
  {
    icon: "MessagesSquare",
    title: "Assessed communication",
    description: "Communication and role-play are scored, so you see real ability, not just a CV.",
  },
  {
    icon: "Award",
    title: "CPD certified",
    description: "Candidates arrive with verifiable, CPD-recognised certification.",
  },
  {
    icon: "Target",
    title: "Interview-ready profiles",
    description: "Filter by score, location and availability to shortlist in minutes.",
  },
  {
    icon: "TrendingDown",
    title: "Reduced hiring risk",
    description: "Assessed readiness means fewer mis-hires and faster ramp-up.",
  },
  {
    icon: "HeartHandshake",
    title: "Social impact alignment",
    description: "Hiring through ExSell helps fund opportunity for the next generation.",
  },
];

export const candidateFilters: string[] = [
  "Location",
  "Remote / hybrid / on-site",
  "Talent readiness score",
  "Certification level",
  "Industry interest",
  "Availability",
  "Salary expectation",
];

export interface SponsorPackage {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export const sponsorPackages: SponsorPackage[] = [
  {
    name: "Supporter",
    price: "£500",
    cadence: "one-off",
    description: "Fund a learner through a full funded pathway.",
    features: [
      "Sponsor one funded learner",
      "Quarterly impact summary",
      "Named on our supporters wall",
    ],
  },
  {
    name: "Partner",
    price: "£2,500",
    cadence: "per year",
    description: "Back a cohort and track outcomes in real time.",
    features: [
      "Sponsor up to six learners",
      "Live impact dashboard access",
      "Branded case study",
      "Quarterly outcome reports",
    ],
    highlighted: true,
  },
  {
    name: "Founding Sponsor",
    price: "Bespoke",
    cadence: "CSR partnership",
    description: "Shape the programme as a strategic funding partner.",
    features: [
      "Multi-cohort sponsorship",
      "Co-branded talent pipeline",
      "Board-ready impact reporting",
      "Named programme partnership",
    ],
  },
];

export interface CaseStudy {
  audience: "Learner" | "Employer" | "Sponsor";
  title: string;
  body: string;
}

/**
 * Case-study style explanations rather than fabricated testimonials —
 * replaced with real quotes once the first cohorts complete.
 */
export const caseStudies: CaseStudy[] = [
  {
    audience: "Learner",
    title: "From school leaver to sales-ready in weeks",
    body: "A typical ExSell learner arrives with no commercial experience. Through funded courses, scored role-plays and interview coaching, they build a verifiable profile and enter the talent pool ready to interview with confidence.",
  },
  {
    audience: "Employer",
    title: "A shortlist you can trust",
    body: "Instead of sifting hundreds of unproven CVs, an employer partner browses certified candidates filtered by readiness score and availability — then requests interviews with people who have already proven they can communicate and sell.",
  },
  {
    audience: "Sponsor",
    title: "Funding that you can measure",
    body: "A sponsor funds a cohort and watches completion rates, certificates earned and placements achieved on a live dashboard — turning CSR spend into measurable social impact and a future-ready workforce.",
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const generalFaqs: Faq[] = [
  {
    question: "Who is ExSell Academy for?",
    answer:
      "School leavers, career changers and emerging professionals who want to build real sales skills and access genuine career opportunities — whether you're brand new or brushing up.",
  },
  {
    question: "Do I need experience to start?",
    answer:
      "No. Our Sales Foundations and Communication Skills courses assume zero experience and take you from the basics to confident, practical ability.",
  },
  {
    question: "Is the certification recognised?",
    answer:
      "Yes — courses are CPD-recognised. On completion you earn a certificate with a unique ID and a public verification page you can share with employers and on LinkedIn.",
  },
  {
    question: "How do I get into the talent network?",
    answer:
      "Complete your courses, pass the assessments and submit a sales role-play. Meet the talent-readiness threshold and your profile becomes visible to hiring employers.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Several foundational courses are free. Others are paid, and funded places are available through the ExSell Foundation for eligible learners — apply for a funded place to learn at no cost.",
  },
];

export const fundedFaqs: Faq[] = [
  {
    question: "What does a funded place include?",
    answer:
      "Full access to your funded pathway of courses, all assessments, CPD certification, interview coaching and entry to the employer talent network — at no cost to you.",
  },
  {
    question: "Am I eligible?",
    answer:
      "Funded places prioritise school leavers and people facing barriers to employment. We review every application individually — apply and we'll let you know.",
  },
  {
    question: "How long does it take?",
    answer:
      "Most learners complete a funded pathway in a few weeks of part-time study. You learn online at your own pace, with support along the way.",
  },
  {
    question: "What happens after I apply?",
    answer:
      "Our team reviews your application, may request more information, and then approves you onto a funded course and matches you with a sponsor where relevant.",
  },
];

export const fundedIncludes: string[] = [
  "Full funded course pathway",
  "All quizzes and assessments",
  "CPD-recognised certification",
  "Scored sales role-play feedback",
  "Interview readiness coaching",
  "Entry to the employer talent network",
];

export const fundedEligibility: string[] = [
  "Aged 16 or over",
  "Based in the UK",
  "Motivated to start a career in sales",
  "Able to study online part-time",
];
