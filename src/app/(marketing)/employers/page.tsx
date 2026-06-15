import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CircleCheckBig,
  Clock,
  MapPin,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { GrowLine } from "@/components/ui/grow-line";
import { ProgressRing } from "@/components/ui/progress-ring";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { employerBenefits, candidateFilters } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "For Employers",
  description:
    "Hire sales-ready talent before your competitors do. Browse CPD-certified candidates whose communication and selling ability have already been assessed — and pay only when you successfully hire.",
};

const hiringPains: { icon: string; title: string; description: string }[] = [
  {
    icon: "SearchX",
    title: "Unproven CVs",
    description:
      "Entry-level CVs all look the same — they tell you what someone studied, never whether they can actually sell.",
  },
  {
    icon: "Clock",
    title: "Slow ramp-up",
    description:
      "Untrained hires take months to become productive while quota and pipeline wait.",
  },
  {
    icon: "TrendingDown",
    title: "Costly mis-hires",
    description:
      "A wrong entry-level hire burns onboarding time, management hours and team morale.",
  },
  {
    icon: "MessageSquareOff",
    title: "No assessed skills",
    description:
      "Interviews rarely reveal real communication ability until someone is already on the phones.",
  },
];

const readinessComponents: { label: string; description: string }[] = [
  {
    label: "Course completion",
    description: "Structured sales training finished end to end.",
  },
  {
    label: "Quiz results",
    description: "Knowledge checks passed across every module.",
  },
  {
    label: "Role-play score",
    description: "A recorded sales scenario, marked against a rubric.",
  },
  {
    label: "Communication score",
    description: "Clarity, listening and influence, assessed by our team.",
  },
  {
    label: "Profile completeness",
    description: "A full, verified candidate profile employers can trust.",
  },
  {
    label: "Interview readiness",
    description: "Coaching completed and signed off before going live.",
  },
];

const placementSteps: { icon: string; title: string; description: string }[] = [
  {
    icon: "Users",
    title: "Browse certified candidates",
    description: "See assessed, CPD-certified talent — not raw applications.",
  },
  {
    icon: "SlidersHorizontal",
    title: "Filter & shortlist",
    description: "Narrow by readiness score, location and availability in minutes.",
  },
  {
    icon: "MessagesSquare",
    title: "Request an interview",
    description: "Send a request straight to candidates that fit your role.",
  },
  {
    icon: "Briefcase",
    title: "Interview",
    description: "Meet people who have already proven they can communicate.",
  },
  {
    icon: "Handshake",
    title: "Offer & placement",
    description: "Make your offer and we help confirm the placement.",
  },
  {
    icon: "BadgeCheck",
    title: "30 / 60 / 90-day check-ins",
    description: "We stay in touch to support a successful first 90 days.",
  },
];

const pricingTiers: {
  icon: string;
  name: string;
  highlight: string;
  description: string;
  features: string[];
}[] = [
  {
    icon: "Telescope",
    name: "Browse for free",
    highlight: "£0 to access",
    description:
      "Create an employer account and explore certified candidate profiles at no cost — no subscription, no commitment.",
    features: [
      "Unlimited browsing of the talent pool",
      "Filter and shortlist candidates",
      "Request interviews directly",
    ],
  },
  {
    icon: "Handshake",
    name: "Pay on success",
    highlight: "Placement fee",
    description:
      "You pay a single placement fee only when you successfully hire a candidate through ExSell — nothing before then.",
    features: [
      "No fee until you hire",
      "30 / 60 / 90-day onboarding support",
      "Transparent, agreed up front",
    ],
  },
  {
    icon: "Building2",
    name: "Volume & partnership",
    highlight: "Bespoke",
    description:
      "Hiring at scale? We offer preferential terms and a dedicated pipeline for ongoing partnership employers.",
    features: [
      "Preferential rates for volume hiring",
      "Co-branded talent pipeline",
      "Named account support",
    ],
  },
];

export default function EmployersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-aurora">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-50" />
        <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div>
            <span
              className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-brand-100 bg-white/70 px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-soft backdrop-blur"
              style={{ animationDelay: "40ms" }}
            >
              <Sparkles className="size-4 text-violet-500" />
              For employers
            </span>

            <h1
              className="mt-6 animate-fade-up text-hero text-navy"
              style={{ animationDelay: "120ms" }}
            >
              Hire sales-ready talent before your{" "}
              <span className="text-gradient">competitors do</span>
            </h1>

            <p
              className="mt-5 max-w-xl animate-fade-up text-lg leading-relaxed text-slate-600"
              style={{ animationDelay: "240ms" }}
            >
              Skip the unproven CVs. Browse certified candidates whose
              communication and selling ability have already been assessed, then
              shortlist and interview with confidence.
            </p>

            <div
              className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ animationDelay: "300ms" }}
            >
              <Link
                href="/contact"
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                Become an Employer Partner
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/contact"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Book a call
              </Link>
              <Link
                href="/employer"
                className={buttonVariants({ variant: "ghost", size: "lg" })}
              >
                Employer login
              </Link>
            </div>

            <p
              className="mt-6 animate-fade-up text-sm text-slate-500"
              style={{ animationDelay: "360ms" }}
            >
              Free to browse · Pay only on a successful hire · 30 / 60 / 90-day
              support
            </p>
          </div>

          <EmployerHeroVisual />
        </div>
      </section>

      {/* The problem */}
      <Section>
        <SectionHeading
          eyebrow="The problem"
          title="The problem with entry-level hiring"
          description="Finding motivated, trained junior sales people is hard — and the usual process leaves you guessing until it's too late."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {hiringPains.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <span className="grid size-11 place-items-center rounded-xl bg-red-50 text-red-500">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <h3 className="mt-4 font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The solution */}
      <Section className="bg-slate-50">
        <SectionHeading
          eyebrow="The solution"
          eyebrowTone="violet"
          title="The ExSell solution"
          description="Every candidate in our network is trained, assessed and certified before they reach your shortlist."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {employerBenefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 0.08}>
              <GlassCard className="relative h-full overflow-hidden p-8">
                <span className="absolute right-5 top-3 font-display text-7xl font-extrabold text-slate-900/[0.04]">
                  {i + 1}
                </span>
                <span className="relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-violet-600 text-white shadow-glow">
                  <Icon name={benefit.icon} className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">
                  {benefit.title}
                </h3>
                <p className="mt-2 leading-relaxed text-slate-600">
                  {benefit.description}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Candidate quality framework */}
      <Section>
        <SectionHeading
          eyebrow="Candidate quality"
          title="The Talent Readiness Score"
          description="A single, transparent measure of how prepared a candidate is — built from six assessed dimensions, so you know what you're getting before you interview."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* Checklist of components */}
          <div className="grid gap-4 sm:grid-cols-2">
            {readinessComponents.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.06}>
                <GlassCard className="flex h-full gap-3 p-5">
                  <CircleCheckBig className="mt-0.5 size-5 shrink-0 text-accent-600" />
                  <div>
                    <h3 className="text-sm font-bold text-navy">{c.label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {c.description}
                    </p>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>

          {/* Illustrative candidate card on a dark panel */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[2rem] bg-midnight p-8 text-white shadow-elevated">
              <div className="pointer-events-none absolute -right-10 -top-10 size-56 rounded-full bg-brand-500/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-8 size-48 rounded-full bg-violet-600/25 blur-3xl" />
              <div className="relative flex items-center justify-between">
                <Badge tone="accent">Illustrative profile</Badge>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-300">
                  <BadgeCheck className="size-4" />
                  CPD certified
                </span>
              </div>

              <div className="relative mt-6 flex items-center gap-4">
                <span className="grid size-16 place-items-center rounded-2xl bg-white/10 font-display text-2xl font-extrabold text-white ring-1 ring-white/15">
                  S
                </span>
                <div>
                  <p className="font-display text-2xl font-extrabold">
                    Sofia A.
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-300">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="size-4" />
                      London
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-4" />
                      Available now
                    </span>
                  </p>
                </div>
              </div>

              <div className="relative mt-7 flex items-center justify-between gap-4 rounded-2xl glass-dark p-5">
                <div>
                  <p className="text-sm font-semibold text-slate-300">
                    Talent Readiness Score
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Sample value for illustration
                  </p>
                </div>
                <ProgressRing
                  value={87}
                  size={92}
                  stroke={9}
                  trackClassName="text-white/10"
                  ringClassName="text-accent-400"
                >
                  <span className="font-display text-2xl font-extrabold text-white">
                    <AnimatedCounter value={87} />
                  </span>
                </ProgressRing>
              </div>

              <div className="relative mt-6 grid grid-cols-2 gap-3 text-sm">
                {[
                  "Sales Foundations complete",
                  "Role-play scored",
                  "Communication assessed",
                  "Interview-ready",
                ].map((line) => (
                  <span
                    key={line}
                    className="inline-flex items-center gap-2 text-slate-300"
                  >
                    <Check className="size-4 shrink-0 text-accent-400" />
                    {line}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* How placements work */}
      <Section className="bg-slate-50">
        <SectionHeading
          eyebrow="The process"
          title="How placements work"
          description="A clear path from browsing the talent pool to a supported, successful hire."
        />
        <div className="relative mt-16">
          <GrowLine className="absolute inset-x-0 top-7 hidden h-0.5 bg-gradient-to-r from-brand-500 via-violet-500 to-accent-500 lg:block" />
          <ol className="relative grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-6">
            {placementSteps.map((step, i) => (
              <li key={step.title} className="flex flex-col items-center text-center">
                <span className="relative grid size-14 place-items-center rounded-2xl border border-slate-200 bg-white text-brand-600 shadow-soft">
                  <Icon name={step.icon} className="size-6" />
                  <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-3 text-sm font-bold text-navy">{step.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <GlassCard className="mt-12 p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-navy">
            <SlidersHorizontal className="size-4 text-brand-600" />
            Filter by
          </div>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {candidateFilters.map((filter) => (
              <Badge key={filter} tone="outline">
                {filter}
              </Badge>
            ))}
          </div>
        </GlassCard>
      </Section>

      {/* Pricing model */}
      <Section>
        <SectionHeading
          eyebrow="Pricing"
          title="A success-based pricing model"
          description="Browsing is free. You only pay when you successfully hire — so the risk stays with us, not you."
        />
        <div className="mt-12 grid items-start gap-6 md:grid-cols-3">
          {pricingTiers.map((tier, i) => {
            const featured = i === 1;
            return (
              <Reveal key={tier.name} delay={i * 0.08}>
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl p-7 shadow-md",
                    featured
                      ? "gradient-border bg-white ring-1 ring-brand-500/20 md:scale-[1.03]"
                      : "border border-slate-200 bg-white shadow-soft",
                  )}
                >
                  {featured ? (
                    <Badge tone="brand" className="absolute -top-3 left-7 shadow-soft">
                      <Sparkles className="size-3.5" />
                      Most popular
                    </Badge>
                  ) : null}
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-2xl",
                      featured
                        ? "bg-gradient-to-br from-brand-600 to-violet-600 text-white shadow-glow"
                        : "bg-brand-50 text-brand-600",
                    )}
                  >
                    <Icon name={tier.icon} className="size-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-navy">{tier.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-brand-600">
                    {tier.highlight}
                  </p>
                  <p className="mt-3 leading-relaxed text-slate-600">
                    {tier.description}
                  </p>
                  <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-2.5 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent-600" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-500">
          Exact placement fees are agreed with you up front and depend on role
          and volume. Get in touch for a tailored quote.
        </p>
      </Section>

      {/* Final CTA */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-midnight px-6 py-20 text-center text-white shadow-elevated sm:px-12">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-10 -top-10 size-72 rounded-full bg-brand-500/30 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 size-72 rounded-full bg-violet-500/25 blur-3xl" />
            </div>
            <h2 className="relative text-display">
              Ready to meet your next sales hire?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-slate-300">
              Create a free employer account, browse certified candidates and
              start shortlisting people who can already sell.
            </p>
            <div className="relative mt-8 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className={buttonVariants({ variant: "accent", size: "lg" })}
              >
                Become an Employer Partner
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/contact"
                className={buttonVariants({ variant: "white", size: "lg" })}
              >
                Book a call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function EmployerHeroVisual() {
  return (
    <div
      className="relative mx-auto hidden h-[460px] w-full max-w-md animate-fade-in lg:block"
      style={{ animationDelay: "200ms" }}
    >
      {/* main glass panel — shortlist preview */}
      <div className="absolute inset-x-0 top-8 rounded-3xl glass-card p-6 shadow-elevated">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Your shortlist</p>
            <p className="font-display text-2xl font-extrabold text-navy">
              Certified talent
            </p>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-accent-600">
              <BadgeCheck className="size-3.5" /> All CPD assessed
            </span>
          </div>
          <ProgressRing value={87} size={88} stroke={9}>
            <span className="font-display text-xl font-extrabold text-navy">
              <AnimatedCounter value={87} />
            </span>
          </ProgressRing>
        </div>
        <div className="mt-6 space-y-3">
          {[
            { name: "Sofia A.", role: "SDR · London", score: 87 },
            { name: "Marcus T.", role: "Sales Exec · Leeds", score: 82 },
            { name: "Priya N.", role: "SDR · Remote", score: 79 },
          ].map((c) => (
            <div
              key={c.name}
              className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-brand-50 font-display text-sm font-extrabold text-brand-700">
                  {c.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">{c.name}</p>
                  <p className="text-xs text-slate-500">{c.role}</p>
                </div>
              </div>
              <span className="font-display text-lg font-extrabold text-navy">
                {c.score}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* floating placed card */}
      <div className="absolute -left-6 bottom-3 w-56 animate-float rounded-2xl glass-card p-4 shadow-md">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-accent-100 text-accent-700">
            <TrendingUp className="size-5" />
          </span>
          <div>
            <p className="text-xs font-semibold text-navy">Placed</p>
            <p className="text-xs text-slate-500">Pay only on success</p>
          </div>
        </div>
      </div>

      {/* floating availability card */}
      <div className="absolute -right-4 top-0 flex w-44 animate-float-slow items-center gap-2 rounded-2xl glass-card p-3 shadow-md">
        <span className="grid size-9 place-items-center rounded-lg bg-brand-50 text-brand-600">
          <Clock className="size-5" />
        </span>
        <div>
          <p className="text-xs font-semibold text-navy">Available now</p>
          <p className="text-[11px] text-slate-500">Ready to interview</p>
        </div>
      </div>
    </div>
  );
}
