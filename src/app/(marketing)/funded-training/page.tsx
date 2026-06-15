import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, HeartHandshake, Sparkles } from "lucide-react";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
import { GlassCard } from "@/components/ui/glass-card";
import { GrowLine } from "@/components/ui/grow-line";
import { buttonVariants } from "@/components/ui/button";
import { ApplicationForm } from "@/components/forms/application-form";
import {
  fundedFaqs,
  fundedIncludes,
  fundedEligibility,
  pathway,
} from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Funded Training",
  description:
    "Apply for a funded place on ExSell Academy's sales training pathway. The ExSell Foundation supports school leavers and people facing barriers to employment with fully funded, CPD-certified training and a route to real sales careers.",
};

const audience = [
  {
    icon: "GraduationCap",
    title: "School leavers",
    description:
      "Finishing school or college and ready to build practical, employable sales skills from scratch.",
  },
  {
    icon: "Route",
    title: "Career changers",
    description:
      "Looking for a fresh start in a career with genuine progression and earning potential.",
  },
  {
    icon: "HeartHandshake",
    title: "Facing barriers",
    description:
      "Held back by cost or circumstance — a funded place removes the financial hurdle to getting started.",
  },
];

export default function FundedTrainingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-aurora">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-50" />
        <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div>
            <span
              className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-accent-100 bg-white/70 px-4 py-1.5 text-sm font-semibold text-accent-700 shadow-soft backdrop-blur"
              style={{ animationDelay: "40ms" }}
            >
              <HeartHandshake className="size-4 text-accent-500" />
              ExSell Foundation
            </span>

            <h1
              className="mt-6 animate-fade-up text-hero text-navy"
              style={{ animationDelay: "120ms" }}
            >
              Funded training places for{" "}
              <span className="text-gradient">future sales talent</span>
            </h1>

            <p
              className="mt-5 max-w-xl animate-fade-up text-lg leading-relaxed text-slate-600"
              style={{ animationDelay: "240ms" }}
            >
              The ExSell Foundation funds the full training pathway for eligible
              learners — CPD-certified courses, scored role-play feedback,
              interview coaching and entry to the employer talent network, at no
              cost to you.
            </p>

            <div
              className="mt-8 flex animate-fade-up flex-col flex-wrap gap-3 sm:flex-row"
              style={{ animationDelay: "300ms" }}
            >
              <Link
                href="#apply"
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                Apply for a funded place
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/courses"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Explore courses
              </Link>
            </div>

            <p
              className="mt-6 animate-fade-up text-sm text-slate-500"
              style={{ animationDelay: "360ms" }}
            >
              Fully funded places · No cost to you · No experience needed
            </p>
          </div>

          <FundedHeroVisual />
        </div>
      </section>

      {/* Who it's for */}
      <Section>
        <SectionHeading
          eyebrow="Who it's for"
          title="Built for people ready to start a sales career"
          description="Funded places prioritise those who'd benefit most. If that sounds like you, we'd love to hear from you."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {audience.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <GlassCard className="relative h-full overflow-hidden p-8">
                <span className="absolute right-5 top-3 font-display text-7xl font-extrabold text-slate-900/[0.04]">
                  {i + 1}
                </span>
                <span className="relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-violet-600 text-white shadow-glow">
                  <Icon name={item.icon} className="size-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What's included */}
      <Section className="bg-slate-50">
        <SectionHeading
          eyebrow="What's included"
          title="Everything you need, fully funded"
          description="A funded place gives you the complete ExSell pathway — nothing held back."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fundedIncludes.map((item, i) => (
            <Reveal key={item} delay={i * 0.05}>
              <GlassCard className="flex h-full items-start gap-3 p-5">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent-100 text-accent-700">
                  <Check className="size-4" />
                </span>
                <span className="font-semibold text-navy">{item}</span>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Eligibility */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Eligibility</Eyebrow>
            <h2 className="text-display text-navy">
              Could you qualify for a funded place?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              We review every application individually. Meeting the criteria
              below is a great starting point — apply and our team will be in
              touch.
            </p>
            <Link
              href="#apply"
              className={buttonVariants({ className: "mt-8" })}
            >
              Start your application
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="grid gap-4">
            {fundedEligibility.map((item, i) => (
              <Reveal key={item} delay={i * 0.06}>
                <GlassCard className="flex items-center gap-3 p-5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                    <Check className="size-5" />
                  </span>
                  <span className="font-semibold text-navy">{item}</span>
                </GlassCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* How it works */}
      <Section className="bg-slate-50">
        <SectionHeading
          eyebrow="How it works"
          title="From application to your first sales role"
          description="A clear, supported journey — every step designed to get you hired."
        />
        <div className="relative mt-16">
          <GrowLine className="absolute inset-x-0 top-7 hidden h-0.5 bg-gradient-to-r from-brand-500 via-violet-500 to-accent-500 lg:block" />
          <ol className="relative grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-7">
            {pathway.map((step, i) => (
              <li
                key={step.label}
                className="flex flex-col items-center text-center"
              >
                <span className="relative grid size-14 place-items-center rounded-2xl border border-slate-200 bg-white text-brand-600 shadow-soft">
                  <Icon name={step.icon} className="size-6" />
                  <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-3 text-sm font-bold text-navy">{step.label}</h3>
                <p className="mt-1 text-xs text-slate-500">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Funded training, explained"
            description="More questions about funded places? Our team is happy to help."
          />
          <Accordion items={fundedFaqs} />
        </div>
      </Section>

      {/* Apply */}
      <section id="apply" className="scroll-mt-24 border-t border-slate-200 bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Badge tone="accent">Applications open</Badge>
            <h2 className="mt-4 text-display text-navy">
              Apply for a funded place
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              It takes a few minutes. Tell us about yourself and your goals, and
              our team will review your application and be in touch with the next
              steps.
            </p>
          </div>
          <GlassCard className="mx-auto mt-10 max-w-2xl p-6 shadow-elevated sm:p-10">
            <ApplicationForm />
          </GlassCard>
        </div>
      </section>
    </>
  );
}

function FundedHeroVisual() {
  return (
    <div
      className="relative mx-auto hidden h-[440px] w-full max-w-md animate-fade-in lg:block"
      style={{ animationDelay: "200ms" }}
    >
      {/* main glass panel */}
      <div className="absolute inset-x-0 top-8 rounded-3xl glass-card p-7 shadow-elevated">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Your funded place</p>
            <p className="font-display text-2xl font-extrabold text-navy">
              Fully funded
            </p>
          </div>
          <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-violet-600 text-white shadow-glow">
            <HeartHandshake className="size-6" />
          </span>
        </div>
        <ul className="mt-6 space-y-3">
          {[
            "CPD-certified courses",
            "Scored role-play feedback",
            "Interview coaching",
            "Entry to the talent network",
          ].map((line) => (
            <li key={line} className="flex items-center gap-3 text-sm">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent-100 text-accent-700">
                <Check className="size-3.5" />
              </span>
              <span className="font-medium text-slate-600">{line}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 p-4">
          <span className="text-sm font-semibold text-navy">Your cost</span>
          <span className="font-display text-2xl font-extrabold text-accent-600">
            £0
          </span>
        </div>
      </div>

      {/* floating cost card */}
      <div className="absolute -left-6 bottom-3 w-56 animate-float rounded-2xl glass-card p-4 shadow-md">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Sparkles className="size-5" />
          </span>
          <div>
            <p className="text-xs font-semibold text-navy">Backed by sponsors</p>
            <p className="text-xs text-slate-500">No cost to learners</p>
          </div>
        </div>
      </div>

      {/* floating certificate card */}
      <div className="absolute -right-4 top-0 flex w-44 animate-float-slow items-center gap-2 rounded-2xl glass-card p-3 shadow-md">
        <span className="grid size-9 place-items-center rounded-lg bg-accent-100 text-accent-700">
          <Icon name="Award" className="size-5" />
        </span>
        <div>
          <p className="text-xs font-semibold text-navy">CPD Certificate</p>
          <p className="text-[11px] text-slate-500">On completion</p>
        </div>
      </div>
    </div>
  );
}
