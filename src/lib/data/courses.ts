import type { Course } from "@/lib/types";

/**
 * The ExSell Academy course catalogue.
 * Content is authored here for the MVP; later phases move this into the
 * database (see prisma/schema.prisma → Course / Module / Lesson).
 */
export const courses: Course[] = [
  {
    slug: "sales-foundations",
    title: "Sales Foundations",
    subtitle: "The mindset, language and process behind every great salesperson.",
    description:
      "Start here. Build a rock-solid understanding of how modern sales really works — from the buyer's journey to running a confident first conversation. No experience needed.",
    category: "Foundations",
    level: "Beginner",
    access: "free",
    price: null,
    durationHours: 6,
    cpdHours: 6,
    certificate: true,
    icon: "Rocket",
    featured: true,
    outcomes: [
      "Explain the modern B2B and B2C sales process end to end",
      "Map a buyer's journey and identify where deals stall",
      "Run a structured, confident discovery conversation",
      "Use a simple framework to qualify opportunities",
    ],
    skills: ["Sales process", "Buyer psychology", "Discovery", "Qualification"],
    modules: [
      {
        title: "What modern sales really is",
        lessons: [
          { title: "Welcome to ExSell Academy", minutes: 6, type: "video" },
          { title: "The myth of the 'born salesperson'", minutes: 9, type: "video" },
          { title: "How buyers actually decide", minutes: 12, type: "video" },
          { title: "Reflection: your sales story", minutes: 10, type: "exercise" },
        ],
      },
      {
        title: "The sales process step by step",
        lessons: [
          { title: "The seven stages of a deal", minutes: 14, type: "video" },
          { title: "Reading the buyer's journey", minutes: 11, type: "reading" },
          { title: "Qualifying with BANT and beyond", minutes: 13, type: "video" },
          { title: "Module quiz", minutes: 10, type: "quiz" },
        ],
      },
      {
        title: "Your first conversation",
        lessons: [
          { title: "Opening with confidence", minutes: 10, type: "video" },
          { title: "Discovery questions that work", minutes: 12, type: "video" },
          { title: "Practice: a 5-minute discovery call", minutes: 15, type: "exercise" },
          { title: "Final assessment", minutes: 20, type: "quiz" },
        ],
      },
    ],
  },
  {
    slug: "communication-skills",
    title: "Communication Skills",
    subtitle: "Listen, frame and influence like a trusted advisor.",
    description:
      "The number one skill employers ask for. Learn to listen actively, ask sharper questions, handle tough conversations and communicate with clarity across calls, email and video.",
    category: "Communication",
    level: "Beginner",
    access: "free",
    price: null,
    durationHours: 5,
    cpdHours: 5,
    certificate: true,
    icon: "MessagesSquare",
    featured: true,
    outcomes: [
      "Apply active-listening techniques in real conversations",
      "Structure clear, persuasive written messages",
      "Adapt your tone and style to different people",
      "Stay composed and credible under pressure",
    ],
    skills: ["Active listening", "Written comms", "Influence", "Emotional intelligence"],
    modules: [
      {
        title: "Listening to understand",
        lessons: [
          { title: "Why most people listen to reply", minutes: 8, type: "video" },
          { title: "The active-listening loop", minutes: 11, type: "video" },
          { title: "Practice: playback and paraphrase", minutes: 12, type: "exercise" },
        ],
      },
      {
        title: "Writing that gets replies",
        lessons: [
          { title: "The anatomy of a great sales email", minutes: 10, type: "video" },
          { title: "Clarity, brevity and the single ask", minutes: 9, type: "reading" },
          { title: "Module quiz", minutes: 8, type: "quiz" },
        ],
      },
      {
        title: "Influence and difficult conversations",
        lessons: [
          { title: "Framing and reframing", minutes: 11, type: "video" },
          { title: "Staying calm when it gets hard", minutes: 10, type: "video" },
          { title: "Final assessment", minutes: 18, type: "quiz" },
        ],
      },
    ],
  },
  {
    slug: "prospecting-essentials",
    title: "Prospecting Essentials",
    subtitle: "Build pipeline with outreach people actually respond to.",
    description:
      "Learn to research accounts, write outreach that earns a reply, and build a repeatable prospecting routine across phone, email and social — without sounding like a robot.",
    category: "Prospecting",
    level: "Intermediate",
    access: "paid",
    price: 149,
    durationHours: 7,
    cpdHours: 7,
    certificate: true,
    icon: "Telescope",
    featured: true,
    outcomes: [
      "Research and prioritise the right accounts",
      "Write multi-channel outreach that earns replies",
      "Build a daily prospecting routine you can sustain",
      "Track and improve your outreach metrics",
    ],
    skills: ["Cold outreach", "Account research", "Social selling", "Cadences"],
    modules: [
      {
        title: "Targeting the right buyers",
        lessons: [
          { title: "Ideal customer profiles in plain English", minutes: 12, type: "video" },
          { title: "Research in five minutes", minutes: 10, type: "video" },
          { title: "Build your first target list", minutes: 15, type: "exercise" },
        ],
      },
      {
        title: "Outreach that earns a reply",
        lessons: [
          { title: "The first line is everything", minutes: 11, type: "video" },
          { title: "Cold email frameworks", minutes: 13, type: "video" },
          { title: "Calling without the cringe", minutes: 12, type: "video" },
          { title: "Module quiz", minutes: 10, type: "quiz" },
        ],
      },
      {
        title: "Building a prospecting engine",
        lessons: [
          { title: "Cadences and follow-up", minutes: 11, type: "video" },
          { title: "Tracking the metrics that matter", minutes: 9, type: "reading" },
          { title: "Final assessment", minutes: 20, type: "quiz" },
        ],
      },
    ],
  },
  {
    slug: "objection-handling",
    title: "Objection Handling",
    subtitle: "Turn 'no' and 'not now' into momentum.",
    description:
      "Master a calm, structured way to handle pushback on price, timing, competitors and authority — so objections become conversations, not dead ends.",
    category: "Closing",
    level: "Intermediate",
    access: "paid",
    price: 149,
    durationHours: 5,
    cpdHours: 5,
    certificate: true,
    icon: "ShieldCheck",
    outcomes: [
      "Diagnose the real objection behind the words",
      "Apply a repeatable objection-handling framework",
      "Respond to price, timing and competitor pushback",
      "Keep deals moving without being pushy",
    ],
    skills: ["Objection handling", "Negotiation basics", "Confidence", "Empathy"],
    modules: [
      {
        title: "Why objections happen",
        lessons: [
          { title: "Objections are buying signals", minutes: 9, type: "video" },
          { title: "Surface vs real objections", minutes: 11, type: "video" },
          { title: "Practice: name the real concern", minutes: 12, type: "exercise" },
        ],
      },
      {
        title: "The framework",
        lessons: [
          { title: "Acknowledge, explore, respond, confirm", minutes: 13, type: "video" },
          { title: "Handling price the right way", minutes: 12, type: "video" },
          { title: "Module quiz", minutes: 8, type: "quiz" },
        ],
      },
      {
        title: "Role-play and assessment",
        lessons: [
          { title: "Record a 3-minute objection role-play", minutes: 20, type: "exercise" },
          { title: "Final assessment", minutes: 18, type: "quiz" },
        ],
      },
    ],
  },
  {
    slug: "negotiation-basics",
    title: "Negotiation Basics",
    subtitle: "Reach agreements that stick — and protect your value.",
    description:
      "Understand leverage, trade-offs and how to hold your price with confidence. A practical introduction to negotiating fair, durable deals for both sides.",
    category: "Closing",
    level: "Intermediate",
    access: "paid",
    price: 179,
    durationHours: 6,
    cpdHours: 6,
    certificate: true,
    icon: "Handshake",
    outcomes: [
      "Prepare for a negotiation with a clear plan",
      "Understand leverage, anchors and trade-offs",
      "Defend value instead of discounting on reflex",
      "Close agreements both sides will honour",
    ],
    skills: ["Negotiation", "Value framing", "Commercial awareness", "Closing"],
    modules: [
      {
        title: "Preparation wins negotiations",
        lessons: [
          { title: "Know your walk-away and your goal", minutes: 11, type: "video" },
          { title: "Mapping trade-offs", minutes: 10, type: "video" },
          { title: "Plan your next negotiation", minutes: 14, type: "exercise" },
        ],
      },
      {
        title: "At the table",
        lessons: [
          { title: "Anchoring and concessions", minutes: 12, type: "video" },
          { title: "Defending your price", minutes: 11, type: "video" },
          { title: "Module quiz", minutes: 9, type: "quiz" },
        ],
      },
      {
        title: "Closing the agreement",
        lessons: [
          { title: "Summarising and confirming terms", minutes: 9, type: "video" },
          { title: "Final assessment", minutes: 18, type: "quiz" },
        ],
      },
    ],
  },
  {
    slug: "crm-and-sales-technology",
    title: "CRM & Sales Technology",
    subtitle: "Be the candidate who's productive from day one.",
    description:
      "Get hands-on with the tools modern sales teams use every day — CRM hygiene, pipeline management, sequences and reporting — so you walk in already knowing the workflow.",
    category: "Technology",
    level: "Beginner",
    access: "paid",
    price: 129,
    durationHours: 5,
    cpdHours: 5,
    certificate: true,
    icon: "Database",
    outcomes: [
      "Navigate a CRM and keep clean, useful records",
      "Manage a pipeline and forecast honestly",
      "Use sequences and tasks to stay organised",
      "Read the dashboards managers care about",
    ],
    skills: ["CRM", "Pipeline management", "Sales tooling", "Reporting"],
    modules: [
      {
        title: "CRM fundamentals",
        lessons: [
          { title: "What a CRM is really for", minutes: 10, type: "video" },
          { title: "Contacts, accounts and deals", minutes: 12, type: "video" },
          { title: "Practice: log a deal end to end", minutes: 15, type: "exercise" },
        ],
      },
      {
        title: "Working your pipeline",
        lessons: [
          { title: "Stages, tasks and next steps", minutes: 11, type: "video" },
          { title: "Forecasting without fiction", minutes: 10, type: "reading" },
          { title: "Module quiz", minutes: 9, type: "quiz" },
        ],
      },
      {
        title: "Reporting and final assessment",
        lessons: [
          { title: "Dashboards managers love", minutes: 10, type: "video" },
          { title: "Final assessment", minutes: 18, type: "quiz" },
        ],
      },
    ],
  },
  {
    slug: "ai-for-sales",
    title: "AI for Sales",
    subtitle: "Use AI to research, write and prioritise — responsibly.",
    description:
      "Put modern AI tools to work across research, outreach drafting and call prep — while learning where the guardrails are. The edge employers are hiring for right now.",
    category: "Technology",
    level: "Advanced",
    access: "paid",
    price: 199,
    durationHours: 6,
    cpdHours: 6,
    certificate: true,
    icon: "Sparkles",
    featured: true,
    outcomes: [
      "Use AI to research accounts and prospects faster",
      "Draft and refine outreach with strong prompts",
      "Prep for calls and summarise notes with AI",
      "Apply AI responsibly with privacy in mind",
    ],
    skills: ["AI tooling", "Prompting", "Research", "Responsible use"],
    modules: [
      {
        title: "AI as your sales co-pilot",
        lessons: [
          { title: "What AI is great (and bad) at in sales", minutes: 11, type: "video" },
          { title: "Prompting fundamentals", minutes: 13, type: "video" },
          { title: "Practice: research an account with AI", minutes: 15, type: "exercise" },
        ],
      },
      {
        title: "Writing and prep with AI",
        lessons: [
          { title: "Drafting outreach you'd actually send", minutes: 12, type: "video" },
          { title: "Call prep and note summaries", minutes: 11, type: "video" },
          { title: "Module quiz", minutes: 9, type: "quiz" },
        ],
      },
      {
        title: "Responsible AI",
        lessons: [
          { title: "Privacy, accuracy and disclosure", minutes: 10, type: "reading" },
          { title: "Final assessment", minutes: 18, type: "quiz" },
        ],
      },
    ],
  },
  {
    slug: "interview-readiness",
    title: "Interview Readiness",
    subtitle: "Walk into any sales interview ready to win the offer.",
    description:
      "Turn your training into a job. Build a standout CV and LinkedIn, practise common sales interviews, nail the mock sales task, and learn how to negotiate your first offer.",
    category: "Career",
    level: "Beginner",
    access: "free",
    price: null,
    durationHours: 4,
    cpdHours: 4,
    certificate: true,
    icon: "UserCheck",
    outcomes: [
      "Build a CV and LinkedIn that get interviews",
      "Answer common sales interview questions with structure",
      "Deliver a confident mock sales task",
      "Approach your first salary conversation",
    ],
    skills: ["Interviewing", "Personal brand", "Storytelling", "Career readiness"],
    modules: [
      {
        title: "Your professional brand",
        lessons: [
          { title: "A CV that survives 7 seconds", minutes: 10, type: "video" },
          { title: "LinkedIn for entry-level sales", minutes: 9, type: "video" },
          { title: "Build your profile", minutes: 15, type: "exercise" },
        ],
      },
      {
        title: "The interview",
        lessons: [
          { title: "Answering with the STAR method", minutes: 12, type: "video" },
          { title: "The mock sales task", minutes: 13, type: "video" },
          { title: "Module quiz", minutes: 8, type: "quiz" },
        ],
      },
      {
        title: "The offer",
        lessons: [
          { title: "Your first salary conversation", minutes: 9, type: "video" },
          { title: "Final assessment", minutes: 15, type: "quiz" },
        ],
      },
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getFeaturedCourses(): Course[] {
  return courses.filter((course) => course.featured);
}

export const courseCategories = [
  "Foundations",
  "Communication",
  "Prospecting",
  "Closing",
  "Technology",
  "Career",
] as const;

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;
