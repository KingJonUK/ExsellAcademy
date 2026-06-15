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
} from "lucide-react";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
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
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50 bg-grid">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 -top-24 size-96 rounded-full bg-brand-200/40 blur-3xl" />
          <div className="absolute -right-16 top-32 size-96 rounded-full bg-accent-200/40 blur-3xl" />
        </div>
        <div className="container-page py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <Eyebrow>For employers</Eyebrow>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-6xl">
              Hire sales-ready talent before your{" "}
              <span className="text-gradient">competitors do</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Skip the unproven CVs. Browse certified candidates whose
              communication and selling ability have already been assessed, then
              shortlist and interview with confidence.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
            </div>
          </div>
        </div>
      </section>

      {/* The problem */}
      <Section>
        <SectionHeading
          eyebrow="The problem"
          title="The problem with entry-level hiring"
          description="Finding motivated, trained junior sales people is hard — and the usual process leaves you guessing until it's too late."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {hiringPains.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
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
          title="The ExSell solution"
          description="Every candidate in our network is trained, assessed and certified before they reach your shortlist."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {employerBenefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-soft">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-600 text-white">
                  <Icon name={benefit.icon} className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">
                  {benefit.title}
                </h3>
                <p className="mt-2 leading-relaxed text-slate-600">
                  {benefit.description}
                </p>
              </div>
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
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* Checklist of components */}
          <div className="grid gap-4 sm:grid-cols-2">
            {readinessComponents.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.05}>
                <div className="flex h-full gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
                  <CircleCheckBig className="mt-0.5 size-5 shrink-0 text-accent-600" />
                  <div>
                    <h3 className="text-sm font-bold text-navy">{c.label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {c.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Illustrative candidate card on a dark panel */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white shadow-glow">
              <div className="pointer-events-none absolute -right-10 -top-10 size-56 rounded-full bg-brand-500/30 blur-3xl" />
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

              <div className="relative mt-7 flex items-end justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div>
                  <p className="text-sm font-semibold text-slate-300">
                    Talent Readiness Score
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Sample value for illustration
                  </p>
                </div>
                <p className="font-display text-4xl font-extrabold text-white">
                  87
                  <span className="text-xl text-slate-400">/100</span>
                </p>
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
        <ol className="mt-12 grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-6">
          {placementSteps.map((step, i) => (
            <li key={step.title} className="flex flex-col items-center text-center">
              <span className="relative grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
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

        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
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
        </div>
      </Section>

      {/* Pricing model */}
      <Section>
        <SectionHeading
          eyebrow="Pricing"
          title="A success-based pricing model"
          description="Browsing is free. You only pay when you successfully hire — so the risk stays with us, not you."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-soft">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
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
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-500">
          Exact placement fees are agreed with you up front and depend on role
          and volume. Get in touch for a tailored quote.
        </p>
      </Section>

      {/* Final CTA */}
      <section className="border-t border-slate-200 bg-white py-20">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-16 text-center text-white shadow-glow sm:px-12">
            <div className="pointer-events-none absolute -right-10 -top-10 size-64 rounded-full bg-brand-500/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 size-64 rounded-full bg-accent-500/20 blur-3xl" />
            <h2 className="relative text-3xl font-bold sm:text-4xl">
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
