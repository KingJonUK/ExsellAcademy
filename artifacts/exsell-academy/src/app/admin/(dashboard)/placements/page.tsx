import { useState } from "react";
import { CalendarCheck, Handshake, Inbox, PoundSterling } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/form";
import { formatGBP } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  FeeStatusBadge,
  PLACEMENT_STATUSES,
  PAYMENT_STATUSES,
  PlacementStatusBadge,
  placementStatusLabel,
} from "@/components/admin/placement-status-badge";
import {
  getPlacements,
  type AdminPlacement,
  type PaymentStatus,
  type PlacementStatus,
} from "@/lib/data/admin-demo";
import { setFeeStatus, setPlacementStatus, toggleCheckIn } from "./actions";

function formatDate(date: Date | null) {
  if (!date) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const CHECK_INS = [
  { which: "check30", label: "30d" },
  { which: "check60", label: "60d" },
  { which: "check90", label: "90d" },
] as const;

type StatTile = {
  label: string;
  value: string | number;
  icon: typeof Handshake;
  tone: string;
};

export default function PlacementsPage() {
  const { toast } = useToast();
  const [placements, setPlacements] = useState<AdminPlacement[]>(() =>
    getPlacements(),
  );

  function refresh() {
    setPlacements(getPlacements());
  }

  function handleStatus(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setPlacementStatus(id, String(fd.get("status") ?? "") as PlacementStatus);
    refresh();
    toast({ title: "Placement updated", description: "Status saved." });
  }

  function handleFee(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setFeeStatus(
      id,
      String(fd.get("feeStatus") ?? "") as PaymentStatus,
      String(fd.get("feePounds") ?? ""),
    );
    refresh();
    toast({ title: "Fee updated", description: "Fee details saved." });
  }

  function handleCheckIn(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    toggleCheckIn(id, String(fd.get("which") ?? ""));
    refresh();
  }

  const feesDue = placements.filter((p) => p.feeStatus === "PENDING").length;
  const feesPaid = placements.filter((p) => p.feeStatus === "PAID").length;
  const paidValue = placements
    .filter((p) => p.feeStatus === "PAID")
    .reduce((sum, p) => sum + (p.feePennies ?? 0), 0);

  const tiles: StatTile[] = [
    {
      label: "Total placements",
      value: placements.length,
      icon: Handshake,
      tone: "bg-brand-50 text-brand-700",
    },
    {
      label: "Fees due",
      value: feesDue,
      icon: PoundSterling,
      tone: "bg-amber-100 text-amber-800",
    },
    {
      label: "Fees paid",
      value: feesPaid,
      icon: CalendarCheck,
      tone: "bg-accent-100 text-accent-800",
    },
    {
      label: "Total fees paid",
      value: formatGBP(paidValue),
      icon: PoundSterling,
      tone: "bg-brand-50 text-brand-700",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold text-navy">Placements</h1>
      <p className="mt-1 text-sm text-slate-500">
        Track placement fees and 30/60/90-day check-ins
      </p>

      {/* Stat tiles */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      {placements.length === 0 ? (
        <Card className="mt-6">
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <Inbox className="size-10 text-slate-300" aria-hidden="true" />
            <p className="text-sm font-semibold text-navy">No placements yet</p>
            <p className="text-sm text-slate-500">
              Placements will appear here once candidates are placed with
              employers.
            </p>
          </div>
        </Card>
      ) : (
        <Card className="mt-6 p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <th className="px-6 py-3 font-semibold">Candidate</th>
                  <th className="px-6 py-3 font-semibold">Employer</th>
                  <th className="px-6 py-3 font-semibold">Role</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Fee</th>
                  <th className="px-6 py-3 font-semibold">Start date</th>
                  <th className="px-6 py-3 font-semibold">Check-ins</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {placements.map((p) => (
                  <tr key={p.id} className="align-top hover:bg-slate-50">
                    {/* Candidate */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-navy">
                        {p.learner.user.name ?? "—"}
                      </div>
                      <div className="text-slate-500">
                        {p.learner.user.email}
                      </div>
                    </td>

                    {/* Employer */}
                    <td className="px-6 py-4 text-slate-600">
                      {p.employer.companyName}
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4 text-slate-600">
                      {p.job?.title ?? "—"}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <PlacementStatusBadge status={p.status} />
                        <form
                          onSubmit={(e) => handleStatus(e, p.id)}
                          className="flex gap-1.5"
                        >
                          <Select
                            name="status"
                            defaultValue={p.status}
                            aria-label="Placement status"
                            className="h-9 w-32 px-2.5 py-1.5"
                          >
                            {PLACEMENT_STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {placementStatusLabel(s)}
                              </option>
                            ))}
                          </Select>
                          <Button type="submit" variant="outline" size="sm">
                            Save
                          </Button>
                        </form>
                      </div>
                    </td>

                    {/* Fee */}
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-navy">
                            {formatGBP(p.feePennies)}
                          </span>
                          <FeeStatusBadge status={p.feeStatus} />
                        </div>
                        <form
                          onSubmit={(e) => handleFee(e, p.id)}
                          className="flex flex-wrap gap-1.5"
                        >
                          <Select
                            name="feeStatus"
                            defaultValue={p.feeStatus}
                            aria-label="Fee status"
                            className="h-9 w-28 px-2.5 py-1.5"
                          >
                            {PAYMENT_STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </Select>
                          <Input
                            name="feePounds"
                            type="number"
                            min={0}
                            step="1"
                            placeholder="fee £"
                            aria-label="Fee in pounds"
                            className="h-9 w-24 px-2.5 py-1.5"
                          />
                          <Button type="submit" variant="outline" size="sm">
                            Save
                          </Button>
                        </form>
                      </div>
                    </td>

                    {/* Start date */}
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                      {formatDate(p.startDate)}
                    </td>

                    {/* Check-ins */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {CHECK_INS.map(({ which, label }) => {
                          const date = p[which];
                          return (
                            <form
                              key={which}
                              onSubmit={(e) => handleCheckIn(e, p.id)}
                              className="contents"
                            >
                              <input type="hidden" name="which" value={which} />
                              <Button
                                type="submit"
                                size="sm"
                                variant={date ? "accent" : "outline"}
                                className="h-9 px-3"
                                title={
                                  date
                                    ? `${label} checked in ${formatDate(date)} — click to clear`
                                    : `Mark ${label} check-in`
                                }
                              >
                                {date ? formatDate(date) : `Set ${label}`}
                              </Button>
                            </form>
                          );
                        })}
                      </div>
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
