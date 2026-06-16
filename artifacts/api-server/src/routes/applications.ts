import { Router, type IRouter } from "express";
import { z } from "zod";
import { randomBytes } from "node:crypto";

const router: IRouter = Router();

const educationOptions = [
  "In education",
  "Recently left school/college",
  "University",
  "Not in education",
  "Other",
] as const;

const employmentOptions = [
  "Unemployed",
  "Part-time",
  "Full-time",
  "Student",
  "Other",
] as const;

const availabilityOptions = [
  "Immediately",
  "Within 1 month",
  "Within 3 months",
  "Just exploring",
] as const;

const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a valid phone number."),
  age: z.coerce
    .number({ message: "Please enter your age." })
    .int("Please enter a whole number.")
    .min(16, "You must be at least 16 to apply.")
    .max(99, "Please enter a valid age."),
  location: z.string().trim().min(2, "Please tell us where you're based."),
  educationStatus: z.enum(educationOptions, {
    message: "Please select your education status.",
  }),
  employmentStatus: z.enum(employmentOptions, {
    message: "Please select your employment status.",
  }),
  careerGoals: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(1000, "Please keep this under 1000 characters."),
  whySales: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(1000, "Please keep this under 1000 characters."),
  availability: z.enum(availabilityOptions, {
    message: "Please choose your availability.",
  }),
  consent: z.literal(true, { message: "You must agree to continue." }),
  safeguardingNotes: z
    .string()
    .trim()
    .max(1000, "Please keep this under 1000 characters.")
    .optional(),
});

/** In-memory store — persists for the lifetime of the server process. */
const applications: Array<{ id: string; reference: string; submittedAt: string; fullName: string; email: string }> = [];

router.post("/applications", (req, res) => {
  const parsed = applicationSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
    return;
  }

  const d = parsed.data;
  const id = randomBytes(8).toString("hex");
  const reference = `EXS-APP-${id.slice(-8).toUpperCase()}`;

  applications.push({
    id,
    reference,
    submittedAt: new Date().toISOString(),
    fullName: d.fullName,
    email: d.email,
  });

  req.log.info(
    { id, reference, name: d.fullName },
    "[applications] new funded-place application received",
  );

  res.status(201).json({ ok: true, reference });
});

export default router;
