import { z } from "zod";

/**
 * Option lists for the funded-place application enums. Exported so the form can
 * map them to <option> elements and stay in sync with the schema.
 */
export const educationOptions = [
  "In education",
  "Recently left school/college",
  "University",
  "Not in education",
  "Other",
] as const;

export const employmentOptions = [
  "Unemployed",
  "Part-time",
  "Full-time",
  "Student",
  "Other",
] as const;

export const availabilityOptions = [
  "Immediately",
  "Within 1 month",
  "Within 3 months",
  "Just exploring",
] as const;

/** Validation schema for a funded-place (scholarship) application. */
export const applicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number."),
  age: z.coerce
    .number({ message: "Please enter your age." })
    .int("Please enter a whole number.")
    .min(16, "You must be at least 16 to apply.")
    .max(99, "Please enter a valid age."),
  location: z
    .string()
    .trim()
    .min(2, "Please tell us where you're based."),
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
  consent: z.literal(true, {
    message: "You must agree to continue.",
  }),
  safeguardingNotes: z
    .string()
    .trim()
    .max(1000, "Please keep this under 1000 characters.")
    .optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
