import Link from "next/link";
import {
  ArrowRight,
  CircleCheckBig,
  Clock,
  FileText,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Inbox,
  PoundSterling,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { ApplicationStatusBadge } from "@/components/admin/status-badge";
import {
  adminApplications,
  adminPlacements,
  adminSponsors,
  getApplications,
  publishedCourseCount,
  type ApplicationStatus,
} from "@/lib/data/admin-demo";

const STATUSES: ApplicationStatus[] = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "MORE_INFO_REQUESTED",
  "APPROVED",
  "REJECTED",
];

function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type StatTile = {
  label: string;
  value: number;
  icon: typeof FileText;
  tone: string;
};

export default function DashboardPage() {
  const total = adminApplications.length;
  const sponsorCount = adminSponsors.length;
  const publishedCourses = publishedCourseCount;
  const fundedAllocations = adminApplications.filter(
    (a) => a.status === "APPROVED" && a.assignedCourseId !== null,
  ).length;
  const placementCount = adminPlacements.length;
  const placementFeesDue = adminPlacements.filter(
    (p) => p.feeStatus === "PENDING",
  ).length;
  const recent = getApplications().slice(0, 6);

  // Count applications by status (default 0 for missing).
  const counts = STATUSES.reduce<Record<ApplicationStatus, number>>(
    (acc, status) => {
      acc[status] = 0;
      return acc;
    },
    {} as Record<ApplicationStatus, number>,
  );
  for (const a of adminApplications) {
    counts[a.status] += 1;
  }

  const awaitingReview = counts.SUBMITTED + counts.UNDER_REVIEW;

  const tiles: StatTile[] = [
    {
      label: "Total applications",
      value: total,
      icon: FileText,
      tone: "bg-brand-50 text-brand-700",
    },
    {
      label: "Awaiting review",
      value: awaitingReview,
      icon: Clock,
      tone: "bg-amber-100 text-amber-800",
    },
    {
      label: "Approved",
      value: counts.APPROVED,
      icon: CircleCheckBig,
      tone: "bg-accent-100 text-accent-800",
    },
    {
      label: "Funded allocations",
      value: fundedAllocations,
      icon: GraduationCap,
      tone: "bg-brand-50 text-brand-700",
    },
    {
      label: "Sponsors",
      value: sponsorCount,
      icon: HeartHandshake,
      tone: "bg-accent-100 text-accent-800",
    },
    {
      label: "Placements",
      value: placementCount,
      icon: Handshake,
      tone: "bg-brand-50 text-brand-700",
    },
    {
      label: "Fees due",
      value: placementFeesDue,
      icon: PoundSterling,
      tone: "bg-amber-100 text-amber-800",
    },
    {
      label: "Published courses",
      value: publishedCourses,
      icon: GraduationCap,
      tone: "bg-slate-100 text-slate-700",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">
        Foundation applications at a glance
      </p>

      {/* Stat tiles */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => (
          <Card key={tile.label} className="flex items-center gap-4">
            <span
              className={`grid size-12 shrink-0 place-items-center rounded-xl ${tile.tone}`}
            >
              <tile.icon className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-3xl font-bold text-navy">{tile.value}</p>
              <p className="text-sm text-slate-500">{tile.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* By status */}
      <Card className="mt-6">
        <h2 className="text-sm font-bold text-navy">By status</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {STATUSES.map((status) => (
            <div
              key={status}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2"
            >
              <ApplicationStatusBadge status={status} />
              <span className="text-sm font-bold text-navy">
                {counts[status]}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent applications */}
      <Card className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-navy">Recent applications</h2>
          <Link
            href="/admin/applications"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
          >
            View all <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="mt-6 flex flex-col items-center gap-2 py-8 text-center">
            <Inbox className="size-8 text-slate-300" aria-hidden="true" />
            <p className="text-sm text-slate-500">No applications yet.</p>
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <th className="pb-2 pr-4 font-semibold">Applicant</th>
                  <th className="pb-2 pr-4 font-semibold">Location</th>
                  <th className="pb-2 pr-4 font-semibold">Status</th>
                  <th className="pb-2 pr-4 font-semibold">Applied</th>
                  <th className="pb-2 font-semibold" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recent.map((a) => (
                  <tr key={a.id}>
                    <td className="py-3 pr-4 font-semibold text-navy">
                      {a.fullName}
                    </td>
                    <td className="py-3 pr-4 text-slate-600">
                      {a.location ?? "—"}
                    </td>
                    <td className="py-3 pr-4">
                      <ApplicationStatusBadge status={a.status} />
                    </td>
                    <td className="py-3 pr-4 whitespace-nowrap text-slate-500">
                      {formatDate(a.createdAt)}
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/admin/applications/${a.id}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
                      >
                        View <ArrowRight className="size-3.5" aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
