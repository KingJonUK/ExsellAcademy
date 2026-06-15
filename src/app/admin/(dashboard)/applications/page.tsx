import Link from "next/link";
import type { ApplicationStatus } from "@prisma/client";
import { Inbox } from "lucide-react";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import {
  ApplicationStatusBadge,
  applicationStatusLabel,
} from "@/components/admin/status-badge";

const STATUSES: ApplicationStatus[] = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "MORE_INFO_REQUESTED",
  "APPROVED",
  "REJECTED",
];

function isStatus(value: string | undefined): value is ApplicationStatus {
  return value !== undefined && STATUSES.includes(value as ApplicationStatus);
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: statusParam } = await searchParams;
  const status = isStatus(statusParam) ? statusParam : undefined;

  const applications = await prisma.application.findMany({
    where: status ? { status } : {},
    orderBy: { createdAt: "desc" },
    include: { assignedCourse: true, assignedSponsor: true },
  });

  const count = applications.length;
  const countLabel = status
    ? `${count} ${applicationStatusLabel(status)} application${count === 1 ? "" : "s"}`
    : `${count} application${count === 1 ? "" : "s"}`;

  const chipBase =
    "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors";
  const activeChip = "bg-brand-600 text-white";
  const inactiveChip =
    "border border-slate-300 text-slate-600 hover:border-brand-400";

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold text-navy">Applications</h1>
      <p className="mt-1 text-sm text-slate-500">{countLabel}</p>

      {/* Filter chips */}
      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href="/admin/applications"
          className={`${chipBase} ${status ? inactiveChip : activeChip}`}
        >
          All
        </Link>
        {STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/applications?status=${s}`}
            className={`${chipBase} ${status === s ? activeChip : inactiveChip}`}
          >
            {applicationStatusLabel(s)}
          </Link>
        ))}
      </div>

      {count === 0 ? (
        <Card className="mt-6">
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <Inbox className="size-10 text-slate-300" aria-hidden="true" />
            <p className="text-sm font-semibold text-navy">
              No applications found
            </p>
            <p className="text-sm text-slate-500">
              {status
                ? "There are no applications with this status yet."
                : "Applications will appear here once they are submitted."}
            </p>
          </div>
        </Card>
      ) : (
        <Card className="mt-6 p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <th className="px-6 py-3 font-semibold">Applicant</th>
                  <th className="px-6 py-3 font-semibold">Location</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Course</th>
                  <th className="px-6 py-3 font-semibold">Sponsor</th>
                  <th className="px-6 py-3 font-semibold">Applied</th>
                  <th className="px-6 py-3 font-semibold" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-navy">{a.fullName}</div>
                      <div className="text-slate-500">{a.email}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {a.location ?? "—"}
                    </td>
                    <td className="px-6 py-4">
                      <ApplicationStatusBadge status={a.status} />
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {a.assignedCourse?.title ?? "—"}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {a.assignedSponsor?.organisation ?? "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                      {formatDate(a.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/applications/${a.id}`}
                        className={buttonVariants({
                          variant: "outline",
                          size: "sm",
                        })}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
