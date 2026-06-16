import { applicationSchema } from "@/lib/validations/application";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

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

  const d = parsed.data;

  try {
    const application = await prisma.application.create({
      data: {
        fullName: d.fullName,
        email: d.email,
        phone: d.phone,
        age: d.age,
        location: d.location,
        educationStatus: d.educationStatus,
        employmentStatus: d.employmentStatus,
        careerGoals: d.careerGoals,
        whySales: d.whySales,
        availability: d.availability,
        consent: d.consent,
        safeguardingNotes: d.safeguardingNotes ?? null,
      },
    });

    const reference = `EXS-APP-${application.id.slice(-8).toUpperCase()}`;

    // Log a brief note only — avoid dumping applicant PII.
    console.log(
      `[applications] New funded-place application from ${d.fullName} — id ${application.id}`,
    );

    return Response.json({ ok: true, reference });
  } catch (error) {
    console.error("[applications] failed to persist application", error);
    return Response.json(
      {
        ok: false,
        errors: {
          _form: ["Something went wrong saving your application. Please try again."],
        },
      },
      { status: 500 },
    );
  }
}
