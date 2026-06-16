import type { Metadata } from "next";
import { BadgeCheck } from "lucide-react";
import { prisma } from "@/lib/db";
import { getSessionEmployer } from "@/lib/employer-auth";
import { PlacementStatusBadge } from "@/components/admin/placement-status-badge";
import { GlassCard } from "@/components/ui/glass-card";

export const metadata: Metadata = {
  title: "Placements",
};

function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function PlacementsPage() {
  const employer = await getSessionEmployer();

  if (!employer) {
    return (
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-navy">Placements</h1>
        <GlassCard className="mt-6">
          <p className="text-sm font-semibold text-navy">No employer profile found</p>
          <p className="mt-1 text-sm text-slate-500">
            Seed the demo data to explore the employer portal. Run{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-navy">
              npm run db:seed
            </code>{" "}
            and refresh.
          </p>
        </GlassCard>
      </div>
    );
  }

  const placements = await prisma.placement.findMany({
    where: { employerId: employer.id },
    include: { learner: { include: { user: true } }, job: true },
    orderBy: { createdAt: "desc" },
  });

  const count = placements.length;

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold text-navy">Placements</h1>
      <p className="mt-1 text-sm text-slate-500">
        Candidates you have taken on. ExSell tracks fees and check-ins on the
        admin side.
      </p>

      {count === 0 ? (
        <GlassCard className="mt-6">
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <BadgeCheck className="size-10 text-slate-300" aria-hidden="true" />
            <p className="text-sm font-semibold text-navy">No placements yet</p>
            <p className="max-w-sm text-sm text-slate-500">
              Placements appear here once a candidate accepts an offer or starts a
              role from your pipeline.
            </p>
          </div>
        </GlassCard>
      ) : (
        <GlassCard className="mt-6 p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <th className="px-6 py-3 font-semibold">Candidate</th>
                  <th className="px-6 py-3 font-semibold">Role</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Start date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {placements.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-navy">
                      {p.learner.user.name ?? p.learner.user.email}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {p.job?.title ?? "—"}
                    </td>
                    <td className="px-6 py-4">
                      <PlacementStatusBadge status={p.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                      {p.startDate ? formatDate(p.startDate) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
