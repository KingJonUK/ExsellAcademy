import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, GraduationCap, HeartHandshake, Mail, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, Select, Textarea } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ApplicationStatusBadge } from "@/components/admin/status-badge";
import {
  adminCourses,
  adminSponsors,
  getApplication,
  type AdminApplication,
  type ApplicationStatus,
} from "@/lib/data/admin-demo";
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

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const found = getApplication(id);
  const [application, setApplication] = useState<AdminApplication | undefined>(
    found,
  );
  const [reviewNotes, setReviewNotes] = useState(found?.reviewNotes ?? "");
  const [courseId, setCourseId] = useState(found?.assignedCourseId ?? "");
  const [sponsorId, setSponsorId] = useState(found?.assignedSponsorId ?? "");

  if (!application) {
    return (
      <div className="mx-auto max-w-4xl">
        <Link
          href="/admin/applications"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-brand-700"
        >
          <ArrowLeft className="size-4" /> All applications
        </Link>
        <Card className="mt-6">
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <p className="text-sm font-semibold text-navy">
              Application not found
            </p>
            <p className="text-sm text-slate-500">
              This application may have been removed.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  function refresh() {
    setApplication({ ...getApplication(id)! });
  }

  function handleStatus(status: ApplicationStatus) {
    setApplicationStatus(id, status, reviewNotes);
    refresh();
    toast({ title: "Decision saved", description: "Application status updated." });
  }

  function handleCourse(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    assignCourse(id, courseId);
    refresh();
    toast({ title: "Course saved", description: "Funded course allocation updated." });
  }

  function handleSponsor(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    assignSponsor(id, sponsorId);
    refresh();
    toast({ title: "Sponsor saved", description: "Sponsor allocation updated." });
  }

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
            <div className="mt-4 space-y-3">
              <Field label="Review notes" htmlFor="reviewNotes">
                <Textarea
                  id="reviewNotes"
                  name="reviewNotes"
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Add a note about this decision (optional)"
                  className="min-h-20"
                />
              </Field>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  onClick={() => handleStatus("APPROVED")}
                  variant="accent"
                  size="sm"
                >
                  Approve
                </Button>
                <Button
                  type="button"
                  onClick={() => handleStatus("MORE_INFO_REQUESTED")}
                  variant="outline"
                  size="sm"
                >
                  Request info
                </Button>
                <Button
                  type="button"
                  onClick={() => handleStatus("UNDER_REVIEW")}
                  variant="secondary"
                  size="sm"
                >
                  Under review
                </Button>
                <Button
                  type="button"
                  onClick={() => handleStatus("REJECTED")}
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  Reject
                </Button>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="flex items-center gap-2 text-sm font-bold text-navy">
              <GraduationCap className="size-4 text-brand-600" /> Funded course
            </h2>
            <form onSubmit={handleCourse} className="mt-3 space-y-3">
              <Select
                name="courseId"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                aria-label="Funded course"
              >
                <option value="">— Not assigned —</option>
                {adminCourses.map((course) => (
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
            <form onSubmit={handleSponsor} className="mt-3 space-y-3">
              <Select
                name="sponsorId"
                value={sponsorId}
                onChange={(e) => setSponsorId(e.target.value)}
                aria-label="Sponsor"
              >
                <option value="">— Not assigned —</option>
                {adminSponsors.map((sponsor) => (
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
