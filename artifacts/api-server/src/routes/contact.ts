import { Router, type IRouter } from "express";
import { z } from "zod";

const router: IRouter = Router();

const topicOptions = [
  "I want to learn",
  "I'm an employer",
  "I'm a sponsor",
  "Something else",
] as const;

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  topic: z.enum(topicOptions, { message: "Please choose a topic." }),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(2000, "Please keep your message under 2000 characters."),
});

router.post("/contact", (req, res) => {
  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
    return;
  }

  req.log.info(
    { topic: parsed.data.topic },
    "[contact] new enquiry received",
  );

  res.json({ ok: true });
});

export default router;
