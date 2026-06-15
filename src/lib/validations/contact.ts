import { z } from "zod";

/**
 * Topic options for the contact form. Exported so the form can map them to
 * <option> elements and stay in sync with the schema enum.
 */
export const topicOptions = [
  "I want to learn",
  "I'm an employer",
  "I'm a sponsor",
  "Something else",
] as const;

/** Validation schema for a general contact message. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),
  topic: z.enum(topicOptions, {
    message: "Please choose a topic.",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(2000, "Please keep your message under 2000 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;
