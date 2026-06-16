import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, GraduationCap, HeartHandshake, Mail, Phone } from "lucide-react";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, Select, Textarea } from "@/components/ui/form";
import { ApplicationStatusBadge } from "@/components/admin/status-badge";
import {
  assignCourse,
  assignSponsor,
  setApplicationStatus,
} from "@/app/admin/(dashboard)/applications/actions";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm text-ink">{value || "—"}</dd>
    </div>
  );
}

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const application = await prisma.application.findUnique({
    where: { id },
    include: { assignedCourse: true, assignedSponsor: true },
  });

  if (!application) notFound();

  const [courses, sponsors] = await Promise.all([
    prisma.course.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      select: { id: true, title: true },
    }),
    prisma.sponsorProfile.findMany({
      orderBy: { organisation: "asc" },
      select: { id: true, organisation: true },
    }),
  ]);

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/admin/applications"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-brand-700"
      >
        <ArrowLeft className="size-4" /> All applications
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy">{application.fullName}</h1>
          <p className="mt-1 text-sm text-slate-500">
            Applied {formatDate(application.createdAt)}
          </p>
        </div>
        <ApplicationStatusBadge status={application.status} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Applicant details */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-sm font-bold text-navy">Applicant details</h2>
            <dl className="mt-4 grid grid-cols-2 gap-4">
              <DetailRow
                label="Email"
                value={
                  <a
                    href={`mailto:${application.email}`}
                    className="inline-flex items-center gap-1.5 text-brand-700 hover:underline"
                  >
                    <Mail className="size-3.5" /> {application.email}
                  </a>
                }
              />
              <DetailRow
                label="Phone"
                value={
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="size-3.5 text-slate-400" /> {application.phone}
                  </span>
                }
              />
              <DetailRow label="Age" value={application.age} />
              <DetailRow label="Location" value={application.location} />
              <DetailRow label="Education" value={application.educationStatus} />
              <DetailRow label="Employment" value={application.employmentStatus} />
              <DetailRow label="Availability" value={application.availability} />
            </dl>
          </Card>

          <Card>
            <h2 className="text-sm font-bold text-navy">Career goals</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {application.careerGoals}
            </p>
            <h2 className="mt-5 text-sm font-bold text-navy">Why sales?</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {application.whySales}
            </p>
            {application.safeguardingNotes ? (
              <>
                <h2 className="mt-5 text-sm font-bold text-navy">
                  Safeguarding notes
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {application.safeguardingNotes}
                </p>
              </>
            ) : null}
          </Card>
        </div>

        {/* Review & allocation */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-sm font-bold text-navy">Review decision</h2>
            <form action={setApplicationStatus} className="mt-4 space-y-3">
              <input type="hidden" name="id" value={application.id} />
              <Field label="Review notes" htmlFor="reviewNotes">
                <Textarea
                  id="reviewNotes"
                  name="reviewNotes"
                  defaultValue={application.reviewNotes ?? ""}
                  placeholder="Add a note about this decision (optional)"
                  className="min-h-20"
                />
              </Field>
              <div className="flex flex-wrap gap-2">
                <Button type="submit" name="status" value="APPROVED" variant="accent" size="sm">
                  Approve
                </Button>
                <Button
                  type="submit"
                  name="status"
                  value="MORE_INFO_REQUESTED"
                  variant="outline"
                  size="sm"
                >
                  Request info
                </Button>
                <Button
                  type="submit"
                  name="status"
                  value="UNDER_REVIEW"
                  variant="secondary"
                  size="sm"
                >
                  Under review
                </Button>
                <Button
                  type="submit"
                  name="status"
                  value="REJECTED"
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  Reject
                </Button>
              </div>
            </form>
          </Card>

          <Card>
            <h2 className="flex items-center gap-2 text-sm font-bold text-navy">
              <GraduationCap className="size-4 text-brand-600" /> Funded course
            </h2>
            <form action={assignCourse} className="mt-3 space-y-3">
              <input type="hidden" name="id" value={application.id} />
              <Select
                name="courseId"
                defaultValue={application.assignedCourseId ?? ""}
                aria-label="Funded course"
              >
                <option value="">— Not assigned —</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </Select>
              <Button type="submit" variant="secondary" size="sm">
                Save course
              </Button>
            </form>
          </Card>

          <Card>
            <h2 className="flex items-center gap-2 text-sm font-bold text-navy">
              <HeartHandshake className="size-4 text-brand-600" /> Sponsor
            </h2>
            <form action={assignSponsor} className="mt-3 space-y-3">
              <input type="hidden" name="id" value={application.id} />
              <Select
                name="sponsorId"
                defaultValue={application.assignedSponsorId ?? ""}
                aria-label="Sponsor"
              >
                <option value="">— Not assigned —</option>
                {sponsors.map((sponsor) => (
                  <option key={sponsor.id} value={sponsor.id}>
                    {sponsor.organisation}
                  </option>
                ))}
              </Select>
              <Button type="submit" variant="secondary" size="sm">
                Save sponsor
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
