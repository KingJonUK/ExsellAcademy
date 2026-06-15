import Link from "next/link";
import { ArrowRight, Award, Sparkles, TrendingUp } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid">
      {/* ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 size-96 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute -right-16 top-32 size-96 rounded-full bg-accent-200/40 blur-3xl" />
      </div>

      <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <span
            className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-soft"
            style={{ animationDelay: "40ms" }}
          >
            <Sparkles className="size-4 text-accent-500" />
            CPD-accredited sales academy + talent network
          </span>

          <h1
            className="mt-6 animate-fade-up text-4xl font-extrabold leading-[1.05] text-navy sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "120ms" }}
          >
            Launch your sales career with{" "}
            <span className="text-gradient">certified training</span>
          </h1>

          <p
            className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-slate-600"
            style={{ animationDelay: "200ms" }}
          >
            ExSell Academy helps school leavers and emerging professionals build
            real sales skills, earn CPD certification, and access career
            opportunities with employers looking for trained sales talent.
          </p>

          <div
            className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row sm:flex-wrap"
            style={{ animationDelay: "280ms" }}
          >
            <Link href="/apply" className={buttonVariants({ variant: "primary", size: "lg" })}>
              Apply for Funded Training
              <ArrowRight className="size-5" />
            </Link>
            <Link href="/courses" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Explore Courses
            </Link>
            <Link href="/employers" className={buttonVariants({ variant: "ghost", size: "lg" })}>
              Hire Certified Talent
            </Link>
          </div>

          <p
            className="mt-6 animate-fade-up text-sm text-slate-500"
            style={{ animationDelay: "360ms" }}
          >
            Free courses to get started · Funded places available · No experience
            needed
          </p>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto hidden h-[420px] w-full max-w-md lg:block">
      {/* main dashboard-style panel */}
      <div className="absolute inset-x-0 top-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-glow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Talent Readiness</p>
            <p className="font-display text-2xl font-extrabold text-navy">Sofia A.</p>
          </div>
          <ScoreRing value={87} />
        </div>
        <div className="mt-6 space-y-4">
          <ProgressLine label="Sales Foundations" value={100} />
          <ProgressLine label="Prospecting Essentials" value={64} />
          <ProgressLine label="Interview Readiness" value={40} />
        </div>
      </div>

      {/* floating certificate card */}
      <div
        className="absolute -left-6 bottom-2 w-60 animate-float rounded-2xl border border-slate-200 bg-white p-4 shadow-soft"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-accent-100 text-accent-700">
            <Award className="size-5" />
          </span>
          <div>
            <p className="text-xs font-semibold text-navy">CPD Certificate</p>
            <p className="text-xs text-slate-500">EXS-2026-000184</p>
          </div>
        </div>
      </div>

      {/* floating badge card */}
      <div className="absolute -right-4 top-0 flex w-44 animate-float items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-soft">
        <span className="grid size-9 place-items-center rounded-lg bg-brand-50 text-brand-600">
          <TrendingUp className="size-5" />
        </span>
        <div>
          <p className="text-xs font-semibold text-navy">Placed</p>
          <p className="text-[11px] text-slate-500">SDR · London</p>
        </div>
      </div>
    </div>
  );
}

function ScoreRing({ value }: { value: number }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="relative grid size-16 place-items-center">
      <svg className="size-16 -rotate-90" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={radius} fill="none" stroke="currentColor" strokeWidth="6" className="text-slate-100" />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-accent-500"
        />
      </svg>
      <span className="absolute text-sm font-bold text-navy">{value}</span>
    </div>
  );
}

function ProgressLine({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="font-semibold text-slate-500">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn(
            "h-full rounded-full",
            value === 100 ? "bg-accent-500" : "bg-brand-500",
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
