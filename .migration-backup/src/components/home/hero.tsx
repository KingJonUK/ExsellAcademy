import Link from "next/link";
import { ArrowRight, Award, Sparkles, TrendingUp } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-aurora">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-50" />

      <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div>
          <span
            className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-brand-100 bg-white/70 px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-soft backdrop-blur"
            style={{ animationDelay: "40ms" }}
          >
            <Sparkles className="size-4 text-violet-500" />
            CPD-accredited academy + talent network
          </span>

          <h1
            className="mt-6 animate-fade-up text-hero text-navy"
            style={{ animationDelay: "120ms" }}
          >
            Build the sales career{" "}
            <span className="text-gradient">others wish they had</span>
          </h1>

          <p
            className="mt-5 animate-fade-up text-xl font-bold text-ink sm:text-2xl"
            style={{ animationDelay: "180ms" }}
          >
            Learn. Certify. Get hired.
          </p>

          <p
            className="mt-4 max-w-xl animate-fade-up text-lg leading-relaxed text-slate-600"
            style={{ animationDelay: "240ms" }}
          >
            ExSell Academy helps school leavers and emerging professionals build
            real sales skills, earn CPD certification, and get in front of
            employers hiring trained talent.
          </p>

          <div
            className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row sm:flex-wrap"
            style={{ animationDelay: "300ms" }}
          >
            <Link href="/apply" className={buttonVariants({ variant: "primary", size: "lg" })}>
              Apply for funded training
              <ArrowRight className="size-5" />
            </Link>
            <Link href="/courses" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Explore courses
            </Link>
            <Link href="/employers" className={buttonVariants({ variant: "ghost", size: "lg" })}>
              Hire certified talent
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
    <div
      className="relative mx-auto hidden h-[460px] w-full max-w-md animate-fade-in lg:block"
      style={{ animationDelay: "200ms" }}
    >
      {/* main glass panel */}
      <div className="absolute inset-x-0 top-8 rounded-3xl glass-card p-6 shadow-elevated">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Talent readiness</p>
            <p className="font-display text-2xl font-extrabold text-navy">Sofia A.</p>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-accent-600">
              <TrendingUp className="size-3.5" /> +12 this month
            </span>
          </div>
          <ProgressRing value={87} size={88} stroke={9}>
            <span className="font-display text-xl font-extrabold text-navy">
              <AnimatedCounter value={87} />
            </span>
          </ProgressRing>
        </div>
        <div className="mt-6 space-y-4">
          <ProgressLine label="Sales Foundations" value={100} tone="accent" />
          <ProgressLine label="Prospecting Essentials" value={64} tone="brand" />
          <ProgressLine label="Interview Readiness" value={40} tone="violet" />
        </div>
      </div>

      {/* floating certificate card */}
      <div className="absolute -left-6 bottom-3 w-60 animate-float rounded-2xl glass-card p-4 shadow-md">
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

      {/* floating placed card */}
      <div className="absolute -right-4 top-0 flex w-44 animate-float-slow items-center gap-2 rounded-2xl glass-card p-3 shadow-md">
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

const toneBar = {
  accent: "bg-accent-500",
  brand: "bg-brand-500",
  violet: "bg-violet-500",
} as const;

function ProgressLine({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: keyof typeof toneBar;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="font-semibold text-slate-500">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn("h-full rounded-full", toneBar[tone])}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
