import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
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
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 to-brand-900 py-20 text-white sm:py-28">
        <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-brand-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 size-72 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="container-page relative">
          <div className="max-w-2xl">
            <Eyebrow className="text-accent-300">ExSell Foundation</Eyebrow>
            <h1 className="text-4xl font-bold sm:text-5xl">
              Funded training places for future sales talent
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-brand-100">
              The ExSell Foundation funds the full training pathway for eligible
              learners — CPD-certified courses, scored role-play feedback,
              interview coaching and entry to the employer talent network, at no
              cost to you.
            </p>
            <div className="mt-8 flex flex-col flex-wrap gap-3 sm:flex-row">
              <Link
                href="#apply"
                className={buttonVariants({ variant: "accent", size: "lg" })}
              >
                Apply for a funded place
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/courses"
                className={buttonVariants({ variant: "white", size: "lg" })}
              >
                Explore courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <Section>
        <SectionHeading
          eyebrow="Who it's for"
          title="Built for people ready to start a sales career"
          description="Funded places prioritise those who'd benefit most. If that sounds like you, we'd love to hear from you."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {audience.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={item.icon} className="size-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
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
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fundedIncludes.map((item, i) => (
            <Reveal key={item} delay={i * 0.05}>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent-100 text-accent-700">
                  <Check className="size-4" />
                </span>
                <span className="font-semibold text-navy">{item}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Eligibility */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Eligibility</Eyebrow>
            <h2 className="text-3xl font-bold text-navy sm:text-4xl">
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
            {fundedEligibility.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                  <Check className="size-5" />
                </span>
                <span className="font-semibold text-navy">{item}</span>
              </li>
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
        <ol className="mt-12 grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-7">
          {pathway.map((step, i) => (
            <li
              key={step.label}
              className="flex flex-col items-center text-center"
            >
              <span className="relative grid size-12 place-items-center rounded-xl bg-white text-brand-600 ring-1 ring-brand-100">
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
            <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl">
              Apply for a funded place
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              It takes a few minutes. Tell us about yourself and your goals, and
              our team will review your application and be in touch with the next
              steps.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-10">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}
