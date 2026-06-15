import { applicationSchema } from "@/lib/validations/application";

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

  const parsed = applicationSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // No database yet — generate a human-readable reference and acknowledge.
  const reference = `EXS-APP-${Date.now().toString(36).toUpperCase()}`;

  // Log a brief note only — avoid dumping applicant PII.
  console.log(
    `[applications] New funded-place application from ${parsed.data.fullName} — ref ${reference}`,
  );

  return Response.json({ ok: true, reference });
}
