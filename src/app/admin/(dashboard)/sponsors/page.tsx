import Link from "next/link";
import { HeartHandshake, Users } from "lucide-react";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ApplicationStatusBadge } from "@/components/admin/status-badge";

export default async function SponsorsPage() {
  const sponsors = await prisma.sponsorProfile.findMany({
    orderBy: { organisation: "asc" },
    include: {
      assignedApplications: {
        select: { id: true, fullName: true, status: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold text-navy">Sponsors</h1>
      <p className="mt-1 text-sm text-slate-500">
        Track the funded learners backed by each sponsor
      </p>

      {sponsors.length === 0 ? (
        <Card className="mt-6">
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <HeartHandshake className="size-10 text-slate-300" aria-hidden="true" />
            <p className="text-sm font-semibold text-navy">No sponsors yet</p>
            <p className="text-sm text-slate-500">
              Sponsor organisations will appear here once they are added.
            </p>
          </div>
        </Card>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {sponsors.map((sponsor) => {
            const total = sponsor.assignedApplications.length;
            const approved = sponsor.assignedApplications.filter(
              (a) => a.status === "APPROVED",
            ).length;

            return (
              <Card key={sponsor.id} className="flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-navy">
                      {sponsor.organisation}
                    </h2>
                    {sponsor.type ? (
                      <Badge tone="brand" className="mt-2">
                        {sponsor.type}
                      </Badge>
                    ) : null}
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <HeartHandshake className="size-5" aria-hidden="true" />
                  </span>
                </div>

                {sponsor.about ? (
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {sponsor.about}
                  </p>
                ) : null}

                {/* Stat line */}
                <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 text-sm">
                  <span className="inline-flex items-center gap-1.5 text-slate-600">
                    <Users className="size-4 text-slate-400" aria-hidden="true" />
                    <span className="font-bold text-navy">{total}</span>
                    assigned learner{total === 1 ? "" : "s"}
                  </span>
                  <span className="text-slate-600">
                    <span className="font-bold text-navy">{approved}</span>{" "}
                    approved
                  </span>
                </div>

                {/* Learners list */}
                <div className="mt-4">
                  {total === 0 ? (
                    <p className="text-sm text-slate-400">
                      No learners assigned yet.
                    </p>
                  ) : (
                    <ul className="divide-y divide-slate-100">
                      {sponsor.assignedApplications.map((a) => (
                        <li key={a.id}>
                          <Link
                            href={`/admin/applications/${a.id}`}
                            className="flex items-center justify-between gap-3 py-2.5 transition-colors hover:text-brand-700"
                          >
                            <span className="text-sm font-semibold text-navy">
                              {a.fullName}
                            </span>
                            <ApplicationStatusBadge status={a.status} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
