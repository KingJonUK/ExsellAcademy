import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, BadgeCheck, ShieldCheck, Award, GraduationCap } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/logo";

const CERT_PATTERN = /^EXS-\d{4}-\d{6}$/i;

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const isValid = CERT_PATTERN.test(id);

  return (
    <Section>
      <div className="mx-auto max-w-2xl">
        {isValid ? (
          <ValidCertificate id={id.toUpperCase()} />
        ) : (
          <NotFound id={id} />
        )}
      </div>
    </Section>
  );
}

function ValidCertificate({ id }: { id: string }) {
  // Stable sample data for the preview certificate.
  const learnerName = "Sofia Ahmed";
  const programme = "Sales Foundations";
  const cpdHours = 6;
  const completionDate = "14 March 2026";

  return (
    <div className="text-center">
      <Badge tone="accent" className="px-4 py-1.5 text-sm">
        <ShieldCheck className="size-4" />
        Verified certificate
      </Badge>
      <h1 className="mt-5 font-display text-3xl font-extrabold text-navy sm:text-4xl">
        Certificate verified
      </h1>
      <p className="mt-3 text-slate-600">
        This certificate was issued by ExSell Academy and is valid.
      </p>

      {/* Certificate card */}
      <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-glow">
        {/* Gradient header strip */}
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-navy px-7 py-7 text-white sm:px-9">
          <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-accent-500/20 blur-3xl" />
          <div className="relative flex items-center justify-between gap-4">
            <Logo variant="light" />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-accent-200 ring-1 ring-white/20">
              <BadgeCheck className="size-4" />
              Verified
            </span>
          </div>
          <p className="relative mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">
            Certificate of completion
          </p>
        </div>

        {/* Body */}
        <div className="px-7 py-8 sm:px-9">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <p className="text-sm text-slate-500">This is to certify that</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-navy">
                {learnerName}
              </p>
              <p className="mt-4 text-sm text-slate-500">
                has successfully completed
              </p>
              <p className="mt-1 flex items-center gap-2 text-lg font-bold text-navy">
                <GraduationCap className="size-5 text-brand-600" />
                {programme}
              </p>
            </div>

            {/* QR placeholder */}
            <div className="flex shrink-0 flex-col items-center gap-2">
              <QrPlaceholder />
              <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Scan to verify
              </span>
            </div>
          </div>

          {/* Detail grid */}
          <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-3">
            <Detail icon={<Award className="size-4 text-brand-600" />} label="CPD hours" value={`${cpdHours} hours`} />
            <Detail label="Completion date" value={completionDate} />
            <Detail label="Certificate ID" value={id} mono />
          </dl>

          <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">
            This certificate was issued by ExSell Academy and is valid. CPD hours
            shown are awarded on successful completion of the programme.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/courses" className={buttonVariants({ variant: "primary" })}>
          Explore our courses
        </Link>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Back to home
        </Link>
      </div>
    </div>
  );
}

function Detail({
  icon,
  label,
  value,
  mono,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="bg-white px-5 py-4">
      <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
        {icon}
        {label}
      </dt>
      <dd
        className={
          mono
            ? "mt-1 font-mono text-sm font-semibold text-navy"
            : "mt-1 text-sm font-semibold text-navy"
        }
      >
        {value}
      </dd>
    </div>
  );
}

/** Decorative QR placeholder — no external dependency. */
function QrPlaceholder() {
  // A fixed pseudo-random pattern so it renders identically every time.
  const pattern = [
    1, 1, 1, 0, 1, 0, 1,
    1, 0, 1, 1, 0, 0, 1,
    1, 0, 1, 0, 1, 1, 1,
    0, 1, 0, 1, 0, 1, 0,
    1, 1, 1, 0, 1, 0, 1,
    0, 0, 1, 1, 0, 1, 1,
    1, 1, 0, 1, 1, 0, 1,
  ];
  return (
    <div
      aria-label="QR code placeholder"
      role="img"
      className="grid size-24 grid-cols-7 gap-px rounded-xl border border-slate-200 bg-white p-2 shadow-sm"
    >
      {pattern.map((cell, i) => (
        <span
          key={i}
          className={cell ? "rounded-[1px] bg-navy" : "rounded-[1px] bg-transparent"}
        />
      ))}
    </div>
  );
}

function NotFound({ id }: { id: string }) {
  return (
    <div className="text-center">
      <Badge tone="amber" className="px-4 py-1.5 text-sm">
        <ShieldCheck className="size-4" />
        Not verified
      </Badge>
      <h1 className="mt-5 font-display text-3xl font-extrabold text-navy sm:text-4xl">
        Certificate not found
      </h1>
      <p className="mt-3 text-slate-600">
        We couldn&apos;t find a certificate matching the reference below. Please
        check the ID and try again.
      </p>

      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
        <p className="text-xs font-medium uppercase tracking-wide text-amber-700">
          Searched reference
        </p>
        <p className="mt-1 break-all font-mono text-sm font-semibold text-amber-900">
          {id}
        </p>
      </div>

      <p className="mt-6 text-sm text-slate-500">
        Valid ExSell Academy certificate IDs look like{" "}
        <span className="font-mono font-semibold text-slate-700">
          EXS-2026-000184
        </span>
        .
      </p>

      <div className="mt-8 flex justify-center">
        <Link
          href="/"
          className={buttonVariants({ variant: "outline" })}
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
