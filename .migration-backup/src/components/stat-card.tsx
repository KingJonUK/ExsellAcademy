export function StatCard({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur">
      <div className="font-display text-4xl font-extrabold text-white">{value}</div>
      <div className="mt-1 text-sm font-semibold text-accent-300">{label}</div>
      {note ? <div className="mt-2 text-xs text-slate-400">{note}</div> : null}
    </div>
  );
}
