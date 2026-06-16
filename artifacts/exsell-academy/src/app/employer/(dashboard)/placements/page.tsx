import { BadgeCheck } from "lucide-react";
import {
  demoEmployer,
  employerPlacements,
  getCandidate,
  getJob,
} from "@/lib/data/employer-demo";
import { PlacementStatusBadge } from "@/components/admin/placement-status-badge";
import { GlassCard } from "@/components/ui/glass-card";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function PlacementsPage() {
  const placements = [...employerPlacements]
    .filter((p) => p.employerId === demoEmployer.id)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

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
                {placements.map((p) => {
                  const learner = getCandidate(p.learnerId);
                  const job = getJob(p.jobId);
                  return (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-semibold text-navy">
                        {learner?.user.name ?? learner?.user.email ?? "—"}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {job?.title ?? "—"}
                      </td>
                      <td className="px-6 py-4">
                        <PlacementStatusBadge status={p.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                        {p.startDate ? formatDate(p.startDate) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
