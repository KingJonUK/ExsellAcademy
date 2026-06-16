import { contactSchema } from "@/lib/validations/contact";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { ok: false, errors: { _form: ["Invalid request body."] } },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // No database yet — log a brief note only, avoiding sender PII / message body.
  console.log(
    `[contact] New enquiry — topic: "${parsed.data.topic}"`,
  );

  return Response.json({ ok: true });
}
