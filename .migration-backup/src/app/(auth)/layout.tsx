import Link from "next/link";
import { ArrowLeft, CircleCheckBig } from "lucide-react";
import { Logo } from "@/components/logo";

const valueBullets = [
  "CPD-accredited courses built with hiring employers",
  "Funded learning pathways for school leavers",
  "Get certified, then matched with real sales roles",
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white lg:flex-row">
      {/* Left brand panel */}
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-navy p-10 text-white lg:flex lg:w-1/2 lg:flex-col xl:p-14">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute -left-24 -top-24 size-96 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 size-96 rounded-full bg-accent-500/20 blur-3xl" />
        </div>

        <div className="relative z-10">
          <Logo variant="light" />
        </div>

        <div className="relative z-10 mt-auto max-w-md">
          <h2 className="font-display text-3xl font-extrabold leading-[1.1] xl:text-4xl">
            The career launchpad for future sales professionals.
          </h2>
          <p className="mt-5 text-brand-100">
            Learn, certify and get placed — all in one place. Join the next
            generation building real commercial skills with ExSell Academy.
          </p>

          <ul className="mt-8 space-y-4">
            {valueBullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <CircleCheckBig className="mt-0.5 size-5 shrink-0 text-accent-300" />
                <span className="text-sm text-brand-50">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 mt-10 text-xs text-brand-200/80">
          CPD-accredited sales academy · Funded places available
        </p>
      </aside>

      {/* Right content area */}
      <main className="flex flex-1 flex-col bg-white px-5 py-8 sm:px-8 lg:w-1/2">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-brand-700"
            >
              <ArrowLeft className="size-4" />
              Back to home
            </Link>
          </div>

          {/* Logo shown on mobile where the brand panel is hidden */}
          <div className="mt-8 lg:hidden">
            <Logo variant="dark" />
          </div>

          <div className="flex flex-1 flex-col justify-center py-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
