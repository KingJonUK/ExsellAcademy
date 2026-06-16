import {
  PrismaClient,
  type CourseCategory,
  type CourseLevel,
  type CourseAccess,
  type LessonType,
  type ApplicationStatus,
  type WorkMode,
} from "@prisma/client";
// Type-only import is erased at runtime, so the "@/..." alias inside this
// module doesn't need to resolve under tsx.
import { courses } from "../src/lib/data/courses";

const prisma = new PrismaClient();

const toCategory = (c: string) => c.toUpperCase() as CourseCategory;
const toLevel = (l: string) => l.toUpperCase() as CourseLevel;
const toAccess = (a: string) => a.toUpperCase() as CourseAccess;
const toLessonType = (t: string) => t.toUpperCase() as LessonType;

async function seedCourses() {
  for (const [index, course] of courses.entries()) {
    const data = {
      title: course.title,
      subtitle: course.subtitle,
      description: course.description,
      category: toCategory(course.category),
      level: toLevel(course.level),
      access: toAccess(course.access),
      pricePennies: course.price !== null ? course.price * 100 : null,
      durationMinutes: course.durationHours * 60,
      cpdHours: course.cpdHours,
      certificate: course.certificate,
      icon: course.icon,
      published: true,
      order: index,
    };

    const saved = await prisma.course.upsert({
      where: { slug: course.slug },
      update: data,
      create: { slug: course.slug, ...data },
    });

    // Deleting modules cascades to lessons and LessonProgress, so never do it
    // when a course already has real learner progress — skip the reseed and
    // keep the existing content/data intact.
    const progressCount = await prisma.lessonProgress.count({
      where: { lesson: { module: { courseId: saved.id } } },
    });
    if (progressCount > 0) {
      console.log(
        `Skipping module reseed for ${course.slug} — ${progressCount} learner progress record(s) exist.`,
      );
      continue;
    }

    await prisma.module.deleteMany({ where: { courseId: saved.id } });
    for (const [mIndex, mod] of course.modules.entries()) {
      await prisma.module.create({
        data: {
          courseId: saved.id,
          title: mod.title,
          order: mIndex,
          lessons: {
            create: mod.lessons.map((lesson, lIndex) => ({
              title: lesson.title,
              type: toLessonType(lesson.type),
              durationMinutes: lesson.minutes,
              order: lIndex,
            })),
          },
        },
      });
    }
  }
  console.log(`Seeded ${courses.length} courses with modules and lessons.`);
}

const sponsorSeeds = [
  {
    email: "partnerships@northwind.org",
    name: "Northwind Foundation",
    organisation: "Northwind Foundation",
    type: "Charitable foundation",
    about: "Funds opportunity programmes for school leavers across the UK.",
  },
  {
    email: "csr@brightfutures.co.uk",
    name: "BrightFutures CSR",
    organisation: "BrightFutures",
    type: "Corporate CSR partner",
    about: "Backs the future sales workforce as part of its social impact mandate.",
  },
  {
    email: "giving@techforgood.io",
    name: "TechForGood",
    organisation: "TechForGood",
    type: "Tech-for-good sponsor",
    about: "Sponsors learners pursuing careers in technology sales.",
  },
];

async function seedSponsors() {
  const ids: string[] = [];
  for (const sponsor of sponsorSeeds) {
    const user = await prisma.user.upsert({
      where: { email: sponsor.email },
      update: { name: sponsor.name, role: "SPONSOR" },
      create: { email: sponsor.email, name: sponsor.name, role: "SPONSOR" },
    });
    const profile = await prisma.sponsorProfile.upsert({
      where: { userId: user.id },
      update: {
        organisation: sponsor.organisation,
        type: sponsor.type,
        about: sponsor.about,
      },
      create: {
        userId: user.id,
        organisation: sponsor.organisation,
        type: sponsor.type,
        about: sponsor.about,
      },
    });
    ids.push(profile.id);
  }
  console.log(`Seeded ${ids.length} sponsors.`);
  return ids;
}

async function seedApplications(sponsorIds: string[]) {
  if ((await prisma.application.count()) > 0) {
    console.log("Applications already present — skipping sample applications.");
    return;
  }

  const foundations = await prisma.course.findUnique({
    where: { slug: "sales-foundations" },
  });
  const prospecting = await prisma.course.findUnique({
    where: { slug: "prospecting-essentials" },
  });

  const samples: Array<{
    fullName: string;
    email: string;
    phone: string;
    age: number;
    location: string;
    educationStatus: string;
    employmentStatus: string;
    careerGoals: string;
    whySales: string;
    availability: string;
    status: ApplicationStatus;
    assignedCourseId?: string | null;
    assignedSponsorId?: string | null;
    reviewNotes?: string;
  }> = [
    {
      fullName: "Aisha Khan",
      email: "aisha.khan@example.com",
      phone: "07700 900111",
      age: 18,
      location: "Manchester",
      educationStatus: "Recently left school/college",
      employmentStatus: "Unemployed",
      careerGoals: "I want to build a long-term career in tech sales and eventually lead a team.",
      whySales: "I love talking to people and I'm motivated by clear goals and progression.",
      availability: "Immediately",
      status: "SUBMITTED",
    },
    {
      fullName: "Daniel Owusu",
      email: "daniel.owusu@example.com",
      phone: "07700 900222",
      age: 21,
      location: "Birmingham",
      educationStatus: "University",
      employmentStatus: "Part-time",
      careerGoals: "Become a confident SDR within a year and move into account management.",
      whySales: "I funded my studies through part-time retail and discovered I'm good at it.",
      availability: "Within 1 month",
      status: "UNDER_REVIEW",
    },
    {
      fullName: "Sofia Ahmed",
      email: "sofia.ahmed@example.com",
      phone: "07700 900333",
      age: 19,
      location: "London",
      educationStatus: "Not in education",
      employmentStatus: "Unemployed",
      careerGoals: "Get my first professional role and prove myself in a sales team.",
      whySales: "I'm ambitious, resilient and want a career with real earning potential.",
      availability: "Immediately",
      status: "APPROVED",
      assignedCourseId: foundations?.id ?? null,
      assignedSponsorId: sponsorIds[0] ?? null,
      reviewNotes: "Strong motivation. Approved onto Sales Foundations with Northwind funding.",
    },
    {
      fullName: "Liam Murphy",
      email: "liam.murphy@example.com",
      phone: "07700 900444",
      age: 24,
      location: "Leeds",
      educationStatus: "Other",
      employmentStatus: "Full-time",
      careerGoals: "Switch careers from hospitality into B2B sales.",
      whySales: "I've spent years selling experiences face to face and want to go further.",
      availability: "Within 3 months",
      status: "MORE_INFO_REQUESTED",
      reviewNotes: "Asked for current notice period and availability for online study.",
    },
    {
      fullName: "Grace Bennett",
      email: "grace.bennett@example.com",
      phone: "07700 900555",
      age: 17,
      location: "Bristol",
      educationStatus: "In education",
      employmentStatus: "Student",
      careerGoals: "Explore whether sales is right for me before I finish college.",
      whySales: "I'm curious and want to understand the commercial world.",
      availability: "Just exploring",
      status: "REJECTED",
      reviewNotes: "Encouraged to start with the free Sales Foundations course and reapply.",
    },
    {
      fullName: "Marcus Reid",
      email: "marcus.reid@example.com",
      phone: "07700 900666",
      age: 22,
      location: "Glasgow",
      educationStatus: "Recently left school/college",
      employmentStatus: "Unemployed",
      careerGoals: "Land a remote SDR role and build a career in software sales.",
      whySales: "I'm self-motivated and learn fast — I just need the opportunity.",
      availability: "Immediately",
      status: "APPROVED",
      assignedCourseId: prospecting?.id ?? null,
      assignedSponsorId: sponsorIds[1] ?? null,
      reviewNotes: "Approved with BrightFutures funding onto Prospecting Essentials.",
    },
  ];

  for (const sample of samples) {
    await prisma.application.create({
      data: { consent: true, ...sample },
    });
  }
  console.log(`Seeded ${samples.length} sample applications.`);
}

const DEMO_EMPLOYER_EMAIL = "talent@acmesales.com";

const candidateSeeds: {
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
    firstName: "Sofia", lastName: "Ahmed", email: "sofia.ahmed@talent.example.com",
    location: "London", workMode: "HYBRID", availability: "Immediately",
    preferredIndustries: ["SaaS", "Technology"], desiredSalaryPennies: 2800000,
    bio: "Ambitious and resilient, motivated by clear targets and progression.",
    score: 87, inPool: true, certs: ["sales-foundations", "communication-skills"],
  },
  {
    firstName: "Marcus", lastName: "Reid", email: "marcus.reid@talent.example.com",
    location: "Glasgow", workMode: "REMOTE", availability: "Immediately",
    preferredIndustries: ["Software", "SaaS"], desiredSalaryPennies: 2900000,
    bio: "Self-motivated fast learner targeting a remote SDR role in software sales.",
    score: 90, inPool: true, certs: ["sales-foundations", "prospecting-essentials", "ai-for-sales"],
  },
  {
    firstName: "Chloe", lastName: "Williams", email: "chloe.williams@talent.example.com",
    location: "London", workMode: "HYBRID", availability: "Immediately",
    preferredIndustries: ["Media", "SaaS"], desiredSalaryPennies: 3200000,
    bio: "Confident communicator with strong negotiation instincts and interview polish.",
    score: 92, inPool: true, certs: ["sales-foundations", "negotiation-basics", "interview-readiness"],
  },
  {
    firstName: "Aisha", lastName: "Khan", email: "aisha.khan@talent.example.com",
    location: "Manchester", workMode: "REMOTE", availability: "Immediately",
    preferredIndustries: ["Technology", "Fintech"], desiredSalaryPennies: 2700000,
    bio: "People-first and goal-driven, keen to build a long-term tech sales career.",
    score: 78, inPool: true, certs: ["sales-foundations", "prospecting-essentials"],
  },
  {
    firstName: "Daniel", lastName: "Owusu", email: "daniel.owusu@talent.example.com",
    location: "Birmingham", workMode: "ONSITE", availability: "Within 1 month",
    preferredIndustries: ["Recruitment", "B2B Services"], desiredSalaryPennies: 2600000,
    bio: "Worked through university in retail and discovered a talent for selling.",
    score: 81, inPool: true, certs: ["sales-foundations"],
  },
  {
    firstName: "Priya", lastName: "Patel", email: "priya.patel@talent.example.com",
    location: "Leeds", workMode: "HYBRID", availability: "Within 1 month",
    preferredIndustries: ["Healthcare", "B2B Services"], desiredSalaryPennies: 3000000,
    bio: "Calm under pressure with a knack for handling objections and building trust.",
    score: 84, inPool: true, certs: ["communication-skills", "objection-handling"],
  },
  {
    firstName: "Tomasz", lastName: "Nowak", email: "tomasz.nowak@talent.example.com",
    location: "Manchester", workMode: "REMOTE", availability: "Within 1 month",
    preferredIndustries: ["Technology"], desiredSalaryPennies: 2750000,
    bio: "Comfortable with sales tooling and AI workflows; organised and productive.",
    score: 80, inPool: true, certs: ["crm-and-sales-technology", "ai-for-sales"],
  },
  {
    firstName: "Jordan", lastName: "Smith", email: "jordan.smith@talent.example.com",
    location: "Bristol", workMode: "ONSITE", availability: "Within 3 months",
    preferredIndustries: ["Retail", "FMCG"], desiredSalaryPennies: 2500000,
    bio: "Personable and consistent, eager to start a structured sales career.",
    score: 73, inPool: true, certs: ["sales-foundations"],
  },
  {
    firstName: "Ella", lastName: "Brown", email: "ella.brown@talent.example.com",
    location: "Liverpool", workMode: "ONSITE", availability: "Just exploring",
    preferredIndustries: ["Property"], desiredSalaryPennies: 2400000,
    bio: "Exploring whether sales is the right path; completing foundational training.",
    score: 70, inPool: false, certs: ["sales-foundations"],
  },
  {
    firstName: "Noah", lastName: "Green", email: "noah.green@talent.example.com",
    location: "Sheffield", workMode: "HYBRID", availability: "Within 1 month",
    preferredIndustries: ["Technology", "Fintech"], desiredSalaryPennies: 2850000,
    bio: "Mid-way through the pathway; profile not yet released to the talent pool.",
    score: 76, inPool: false, certs: [],
  },
];

const jobSeeds: {
  title: string;
  description: string;
  workMode: WorkMode;
  location: string;
  industry: string;
  salaryMinPennies: number;
  salaryMaxPennies: number;
  minReadinessScore: number;
}[] = [
  {
    title: "Sales Development Representative",
    description: "Outbound prospecting and qualification for our SaaS sales team.",
    workMode: "HYBRID", location: "London", industry: "SaaS",
    salaryMinPennies: 2500000, salaryMaxPennies: 3200000, minReadinessScore: 75,
  },
  {
    title: "Junior Account Executive",
    description: "Own a pipeline of small-business deals end to end, with mentoring.",
    workMode: "REMOTE", location: "Remote (UK)", industry: "Software",
    salaryMinPennies: 2800000, salaryMaxPennies: 3600000, minReadinessScore: 80,
  },
  {
    title: "Inside Sales Associate",
    description: "Warm inbound and renewals from our Manchester hub.",
    workMode: "ONSITE", location: "Manchester", industry: "B2B Services",
    salaryMinPennies: 2400000, salaryMaxPennies: 3000000, minReadinessScore: 70,
  },
];

async function seedEmployerAndTalent() {
  // 1. Demo employer the portal operates as.
  const employerUser = await prisma.user.upsert({
    where: { email: DEMO_EMPLOYER_EMAIL },
    update: { name: "Acme Sales Co", role: "EMPLOYER" },
    create: { email: DEMO_EMPLOYER_EMAIL, name: "Acme Sales Co", role: "EMPLOYER" },
  });
  const employer = await prisma.employerProfile.upsert({
    where: { userId: employerUser.id },
    update: {
      companyName: "Acme Sales Co",
      industry: "SaaS",
      location: "London",
      about: "A fast-growing SaaS company hiring trained, motivated entry-level sales talent.",
      hiringCriteria: "Coachable, resilient, strong communicators with a CPD certificate.",
      verified: true,
    },
    create: {
      userId: employerUser.id,
      companyName: "Acme Sales Co",
      industry: "SaaS",
      location: "London",
      about: "A fast-growing SaaS company hiring trained, motivated entry-level sales talent.",
      hiringCriteria: "Coachable, resilient, strong communicators with a CPD certificate.",
      verified: true,
    },
  });

  // 2. Candidate talent pool (only when none exist yet).
  if ((await prisma.learnerProfile.count()) === 0) {
    const allCourses = await prisma.course.findMany({
      select: { id: true, slug: true, title: true, cpdHours: true },
    });
    const courseBySlug = new Map(allCourses.map((c) => [c.slug, c]));
    let certSeq = 1001;

    for (const c of candidateSeeds) {
      const user = await prisma.user.create({
        data: { email: c.email, name: `${c.firstName} ${c.lastName}`, role: "LEARNER" },
      });
      const learner = await prisma.learnerProfile.create({
        data: {
          userId: user.id,
          location: c.location,
          workMode: c.workMode,
          availability: c.availability,
          preferredIndustries: c.preferredIndustries,
          desiredSalaryPennies: c.desiredSalaryPennies,
          bio: c.bio,
          talentReadinessScore: c.score,
          inTalentPool: c.inPool,
        },
      });
      for (const slug of c.certs) {
        const course = courseBySlug.get(slug);
        if (!course) continue;
        await prisma.certificate.create({
          data: {
            certificateId: `EXS-2026-${String(certSeq++).padStart(6, "0")}`,
            learnerId: learner.id,
            courseId: course.id,
            title: course.title,
            cpdHours: course.cpdHours,
            completionDate: new Date("2026-05-20"),
            status: "ACTIVE",
          },
        });
      }
    }
    console.log(`Seeded ${candidateSeeds.length} candidate learner profiles.`);
  } else {
    console.log("Learner profiles already present — skipping candidates.");
  }

  // 3. Jobs for the demo employer.
  if ((await prisma.job.count({ where: { employerId: employer.id } })) === 0) {
    for (const job of jobSeeds) {
      await prisma.job.create({ data: { employerId: employer.id, ...job } });
    }
    console.log(`Seeded ${jobSeeds.length} jobs.`);
  }

  // 4. A little starting pipeline + one placement so the CRMs aren't empty.
  if ((await prisma.candidatePipeline.count()) === 0) {
    const findLearner = (email: string) =>
      prisma.learnerProfile.findFirst({ where: { user: { email } } });
    const sdrJob = await prisma.job.findFirst({
      where: { employerId: employer.id, title: "Sales Development Representative" },
    });
    const aeJob = await prisma.job.findFirst({
      where: { employerId: employer.id, title: "Junior Account Executive" },
    });
    const [chloe, marcus, sofia] = await Promise.all([
      findLearner("chloe.williams@talent.example.com"),
      findLearner("marcus.reid@talent.example.com"),
      findLearner("sofia.ahmed@talent.example.com"),
    ]);

    if (chloe && sdrJob) {
      await prisma.candidatePipeline.create({
        data: {
          employerId: employer.id, learnerId: chloe.id, jobId: sdrJob.id,
          stage: "OFFER_MADE", notes: "Excellent final interview — offer extended.",
        },
      });
    }
    if (marcus && aeJob) {
      await prisma.candidatePipeline.create({
        data: {
          employerId: employer.id, learnerId: marcus.id, jobId: aeJob.id,
          stage: "INTERVIEW_BOOKED", notes: "First interview booked for next week.",
        },
      });
    }
    if (sofia && sdrJob) {
      const pipeline = await prisma.candidatePipeline.create({
        data: {
          employerId: employer.id, learnerId: sofia.id, jobId: sdrJob.id,
          stage: "STARTED", notes: "Accepted offer and started in role.",
        },
      });
      await prisma.placement.create({
        data: {
          learnerId: sofia.id, employerId: employer.id, jobId: sdrJob.id,
          pipelineId: pipeline.id, status: "STARTED",
          startDate: new Date("2026-06-02"), feePennies: 350000, feeStatus: "PENDING",
        },
      });
    }
    console.log("Seeded sample pipeline + placement.");
  }
}

async function seedLearnerLMS() {
  const sofia = await prisma.learnerProfile.findFirst({
    where: { user: { email: "sofia.ahmed@talent.example.com" } },
  });
  if (!sofia) {
    console.log("Demo learner not found — skipping LMS seed.");
    return;
  }

  // Guard: skip if Sofia already has enrollments.
  const existingCount = await prisma.enrollment.count({ where: { learnerId: sofia.id } });
  if (existingCount > 0) {
    console.log("Learner enrollments already present — skipping LMS seed.");
    return;
  }

  const [prospecting, aiForSales, interviewReadiness] = await Promise.all([
    prisma.course.findUnique({ where: { slug: "prospecting-essentials" } }),
    prisma.course.findUnique({ where: { slug: "ai-for-sales" } }),
    prisma.course.findUnique({ where: { slug: "interview-readiness" } }),
  ]);

  // --- Enrollments ---
  if (prospecting) {
    await prisma.enrollment.create({
      data: {
        learnerId: sofia.id,
        courseId: prospecting.id,
        status: "IN_PROGRESS",
        progressPct: 40,
        funded: false,
      },
    });
  }
  if (aiForSales) {
    await prisma.enrollment.create({
      data: {
        learnerId: sofia.id,
        courseId: aiForSales.id,
        status: "IN_PROGRESS",
        progressPct: 20,
        funded: false,
      },
    });
  }
  if (interviewReadiness) {
    await prisma.enrollment.create({
      data: {
        learnerId: sofia.id,
        courseId: interviewReadiness.id,
        status: "NOT_STARTED",
        progressPct: 0,
        funded: false,
      },
    });
  }

  // --- Lesson progress + content for prospecting-essentials ---
  if (prospecting) {
    const modules = await prisma.module.findMany({
      where: { courseId: prospecting.id },
      orderBy: { order: "asc" },
      include: { lessons: { orderBy: { order: "asc" } } },
    });

    // Add body text to key lessons so the player has content to display.
    const contentMap: Record<string, string> = {
      "Ideal customer profiles in plain English":
        "An **Ideal Customer Profile (ICP)** is a description of the company (or person) that would get the most value from your product and, in turn, be most valuable to you.\n\n" +
        "**Why it matters:** Without an ICP, you prospect at random. With one, every outreach effort is targeted at buyers who actually need what you sell.\n\n" +
        "**Three questions to define your ICP:**\n" +
        "1. What industry or vertical is your best-fit customer in?\n" +
        "2. What size is their team or company?\n" +
        "3. What pain do they feel that your product solves?\n\n" +
        "Once you can answer those three questions, you have the foundation of a prospect list that converts.",

      "Research in five minutes":
        "Great outreach starts with great research — but most reps spend too long on it. Here is a five-minute research framework:\n\n" +
        "**Minute 1–2: LinkedIn**\n" +
        "- Check the prospect's current role and how long they've been in it\n" +
        "- Look for recent posts or comments that reveal their priorities\n\n" +
        "**Minute 3: Company news**\n" +
        "- Search '[Company name] news 2026' — look for funding, product launches, hiring sprees or leadership changes\n\n" +
        "**Minute 4: Their website**\n" +
        "- What do they sell? Who are their customers?\n\n" +
        "**Minute 5: Write one insight**\n" +
        "- Turn your research into one personalised observation you'll use in the first line of your email.\n\n" +
        "Five minutes. One insight. That's all you need to stand out.",

      "Build your first target list":
        "**Exercise: Build a 10-prospect target list**\n\n" +
        "Using your ICP definition from the previous lesson, identify 10 companies that match. For each, find the name and email of the decision-maker you'd contact.\n\n" +
        "**Tools to use:**\n" +
        "- LinkedIn Sales Navigator (free trial available)\n" +
        "- Apollo.io (generous free tier)\n" +
        "- Hunter.io (email finder)\n\n" +
        "**Template for each row:**\n" +
        "| Company | Industry | Size | Contact | Role | LinkedIn URL | Email |\n\n" +
        "Aim for quality over quantity. A list of 10 well-researched prospects beats a list of 100 cold names every time.",

      "The first line is everything":
        "The first line of your cold email is the only line that determines whether the rest gets read.\n\n" +
        "**What not to write:**\n" +
        "- 'I hope this email finds you well...'\n" +
        "- 'My name is [X] and I work at [Y]...'\n" +
        "- 'I wanted to reach out because...'\n\n" +
        "**What to write instead:**\n" +
        "Personalise it. Reference something real. Use your research.\n\n" +
        "> 'Saw your post about scaling the BDR team — congrats on the Series B. Most teams at that stage hit a prospecting bottleneck around month 3.'\n\n" +
        "That first line shows you did your homework. It creates curiosity. It gets the rest of the email read.",

      "Tracking the metrics that matter":
        "Most SDRs track the wrong metrics. Here's what actually moves the needle:\n\n" +
        "**Vanity metrics (ignore):**\n" +
        "- Number of emails sent\n" +
        "- Open rate (unreliable since Apple MPP)\n\n" +
        "**Signal metrics (track these):**\n" +
        "| Metric | Target |\n" +
        "| Reply rate | 5–10% |\n" +
        "| Positive reply rate | 2–4% |\n" +
        "| Meetings booked per 100 prospects | 3–5 |\n" +
        "| Touchpoints to first reply | 4–6 |\n\n" +
        "**Weekly review habit:**\n" +
        "Every Friday, spend 10 minutes reviewing your numbers. Which sequence had the best reply rate? Which opening line worked? What should you test next week?\n\n" +
        "Consistent measurement beats hoping you'll remember what worked.",
    };

    for (const mod of modules) {
      for (const lesson of mod.lessons) {
        if (contentMap[lesson.title]) {
          await prisma.lesson.update({
            where: { id: lesson.id },
            data: { body: contentMap[lesson.title] },
          });
        }
      }
    }

    // Mark the first 4 lessons as COMPLETED for Sofia.
    const allLessons = modules.flatMap((m) => m.lessons);
    const toComplete = allLessons.slice(0, 4);
    for (const lesson of toComplete) {
      await prisma.lessonProgress.create({
        data: {
          learnerId: sofia.id,
          lessonId: lesson.id,
          status: "COMPLETED",
          completedAt: new Date("2026-06-10"),
        },
      });
    }

    // --- Final assessment quiz for prospecting-essentials ---
    // Find the "Final assessment" lesson (last lesson, last module).
    const lastModule = modules[modules.length - 1];
    const finalLesson = lastModule?.lessons[lastModule.lessons.length - 1];

    if (finalLesson && finalLesson.title.toLowerCase().includes("final")) {
      const quiz = await prisma.quiz.create({
        data: {
          courseId: prospecting.id,
          moduleId: lastModule.id,
          lessonId: finalLesson.id,
          title: "Prospecting Essentials: Final Assessment",
          passMark: 80,
          isFinalAssessment: true,
        },
      });

      const questions: {
        prompt: string;
        options: string[];
        correctIndex: number;
      }[] = [
        {
          prompt: "What does ICP stand for in B2B sales?",
          options: [
            "Ideal Customer Profile",
            "Internal Contact Person",
            "Inbound Channel Process",
            "Integrated Campaign Plan",
          ],
          correctIndex: 0,
        },
        {
          prompt:
            "Which of the following best describes an effective cold email opening line?",
          options: [
            "Start with your company name and what you do",
            "Begin with 'I hope this email finds you well'",
            "Reference a specific, relevant insight about the prospect",
            "List all the features of your product upfront",
          ],
          correctIndex: 2,
        },
        {
          prompt: "What is a 'cadence' in prospecting?",
          options: [
            "A single follow-up email sent after no reply",
            "A scripted phone call introduction",
            "A structured sequence of outreach touchpoints across channels",
            "A type of CRM pipeline stage",
          ],
          correctIndex: 2,
        },
        {
          prompt: "Which metric is most useful for measuring cold outreach effectiveness?",
          options: [
            "Email open rate",
            "Reply rate",
            "Number of emails sent",
            "Bounce rate",
          ],
          correctIndex: 1,
        },
        {
          prompt:
            "When a prospect doesn't reply to your first outreach, you should:",
          options: [
            "Give up and move to the next prospect immediately",
            "Send the exact same message again the following day",
            "Wait indefinitely without following up",
            "Follow up with a different angle or channel after a few days",
          ],
          correctIndex: 3,
        },
      ];

      for (const [i, q] of questions.entries()) {
        await prisma.quizQuestion.create({
          data: {
            quizId: quiz.id,
            type: "MULTIPLE_CHOICE",
            prompt: q.prompt,
            options: q.options,
            correctAnswer: { index: q.correctIndex },
            points: 1,
            order: i,
          },
        });
      }
      console.log("Seeded final assessment quiz for prospecting-essentials.");
    }
  }

  console.log("Seeded learner LMS data (enrollments, progress, lesson content, quiz).");
}

async function main() {
  await seedCourses();
  const sponsorIds = await seedSponsors();
  await seedApplications(sponsorIds);
  await seedEmployerAndTalent();
  await seedLearnerLMS();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
