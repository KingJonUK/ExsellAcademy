import {
  PrismaClient,
  type CourseCategory,
  type CourseLevel,
  type CourseAccess,
  type LessonType,
  type ApplicationStatus,
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

async function main() {
  await seedCourses();
  const sponsorIds = await seedSponsors();
  await seedApplications(sponsorIds);
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
