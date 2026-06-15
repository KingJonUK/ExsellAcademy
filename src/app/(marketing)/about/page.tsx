import type { Metadata } from "next";
import Link from "next/link";
import { Target, Rocket, Building2 } from "lucide-react";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { caseStudies } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "About",
  description: siteConfig.description,
};

const engines = [
  {
    icon: "GraduationCap",
    name: "ExSell Academy",
    description:
      "The learning platform: practical, CPD-certified online sales courses built with employers — taking learners from their first commercial conversation to interview-ready.",
  },
  {
    icon: "HeartHandshake",
    name: "ExSell Foundation",
    description:
      "Funded learning: scholarship-style places backed by sponsors so that talented school leavers can train at no cost, regardless of their background or means.",
  },
  {
    icon: "Users",
    name: "ExSell Talent Network",
    description:
      "Recruitment: a pool of certified, assessed candidates that employers can browse by readiness, location and availability — then interview with confidence.",
  },
];

const values = [
  {
    icon: "Route",
    title: "Opportunity",
    description:
      "Talent is everywhere; opportunity is not. We exist to open the door to a sales career for people who would otherwise miss out.",
  },
  {
    icon: "GraduationCap",
    title: "Real skills",
    description:
      "No theory for its own sake. Every course is practical, scored against real-world ability and built around what employers actually need.",
  },
  {
    icon: "Target",
    title: "Measurable impact",
    description:
      "We only stand behind numbers we can prove. Completion, certification and placement are tracked openly — never invented.",
  },
  {
    icon: "Building2",
    title: "Employer-led",
    description:
      "Hiring partners shape what we teach, so a certificate from ExSell signals genuine, job-ready capability — not a box ticked.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50 bg-grid">
        <div className="container-page py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <Eyebrow>About ExSell Academy</Eyebrow>
            <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              {siteConfig.supportingLine} {siteConfig.description}
            </p>
          </div>
        </div>
      </section>

      {/* Why we exist */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeading
            align="left"
            eyebrow="Why we exist"
            title="Talented people are leaving education without the commercial skills employers need"
          />
          <div className="space-y-5 text-lg leading-relaxed text-slate-600">
            <p>
              Every year, capable school leavers finish their education having
              never practised a real commercial conversation, learned how to
              interview, or built the everyday workplace communication skills
              that employers rely on. Bright people miss out on great careers
              simply because nobody taught them how.
            </p>
            <p>
              At the same time, employers tell us the opposite story: they
              struggle to find trained, motivated entry-level sales people they
              can trust. The CVs they receive are unproven, and the cost of a
              mis-hire is high.
            </p>
            <p>
              ExSell Academy exists to close that gap. We train, certify and
              connect the next generation of sales professionals — giving
              learners a genuine route into work, and giving employers a
              shortlist of people whose ability has already been assessed.
            </p>
          </div>
        </div>
      </Section>

      {/* Three engines */}
      <Section className="bg-slate-50">
        <SectionHeading
          eyebrow="How it fits together"
          title="One ecosystem, three connected engines"
          description="Learning, funding and recruitment work as a single pathway — each part feeding the next."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {engines.map((engine, i) => (
            <Reveal key={engine.name} delay={i * 0.08}>
              <div className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
                <span className="absolute right-5 top-4 font-display text-6xl font-extrabold text-slate-100">
                  {i + 1}
                </span>
                <span className="relative grid size-12 place-items-center rounded-xl bg-brand-600 text-white">
                  <Icon name={engine.icon} className="size-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-navy">
                  {engine.name}
                </h3>
                <p className="mt-2 leading-relaxed text-slate-600">
                  {engine.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section>
        <SectionHeading
          eyebrow="What we value"
          title="The principles behind everything we build"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={value.icon} className="size-5" />
                </span>
                <h3 className="mt-4 font-bold text-navy">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Success stories */}
      <Section id="stories" className="bg-slate-50">
        <SectionHeading
          eyebrow="In practice"
          title="What success looks like"
          description="Real testimonials will appear here as our community grows. Until then, here's how the ecosystem works for learners, employers and sponsors."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {caseStudies.map((study) => (
            <div
              key={study.title}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-soft"
            >
              <Badge tone="brand">{study.audience}</Badge>
              <h3 className="mt-4 text-lg font-bold text-navy">
                {study.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {study.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="border-t border-slate-200 bg-white py-20">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-16 text-center text-white shadow-glow sm:px-12">
            <div className="pointer-events-none absolute -right-10 -top-10 size-64 rounded-full bg-brand-500/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 size-64 rounded-full bg-accent-500/20 blur-3xl" />
            <Eyebrow className="relative text-accent-300">
              Join the ecosystem
            </Eyebrow>
            <h2 className="relative text-3xl font-bold sm:text-4xl">
              Find your place at ExSell Academy
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-slate-300">
              Whether you want to launch a sales career, hire trained talent or
              fund the next generation — there&apos;s a path here for you.
            </p>
            <div className="relative mt-8 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
              <Link
                href="/apply"
                className={buttonVariants({ variant: "accent", size: "lg" })}
              >
                Apply to Learn
                <Rocket className="size-5" />
              </Link>
              <Link
                href="/employers"
                className={buttonVariants({ variant: "white", size: "lg" })}
              >
                Hire Talent
                <Building2 className="size-5" />
              </Link>
              <Link
                href="/sponsors"
                className={buttonVariants({
                  variant: "ghost",
                  size: "lg",
                  className: "text-white hover:bg-white/10",
                })}
              >
                Fund a Learner
                <Target className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
