import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
import { CourseCard } from "@/components/course-card";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { GrowLine } from "@/components/ui/grow-line";
import { buttonVariants } from "@/components/ui/button";
import { courses } from "@/lib/data/courses";
import {
  caseStudies,
  employerBenefits,
  generalFaqs,
  impactStats,
  pathway,
  problems,
  solutions,
  trustBadges,
} from "@/lib/data/content";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Trust bar */}
      <section className="border-y border-slate-200 bg-slate-50/60">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-6">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600"
            >
              <Icon name={badge.icon} className="size-5 text-brand-600" />
              {badge.label}
            </div>
          ))}
        </div>
      </section>

      {/* Problem */}
      <Section>
        <SectionHeading
          eyebrow="The problem"
          title="School leavers enter the world without the commercial skills employers need"
          description="Talented people miss out on great careers — and employers can't find the trained entry-level sales talent they're desperate for."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((item, i) => (
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

      {/* Solution */}
      <Section className="bg-slate-50">
        <SectionHeading
          eyebrow="The solution"
          eyebrowTone="violet"
          title="We train, certify and connect the next generation of sales professionals"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {solutions.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <GlassCard className="relative h-full overflow-hidden p-8">
                <span className="absolute right-5 top-3 font-display text-7xl font-extrabold text-slate-900/[0.04]">
                  {i + 1}
                </span>
                <span className="relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-violet-600 text-white shadow-glow">
                  <Icon name={item.icon} className="size-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-navy">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Pathway */}
      <Section>
        <SectionHeading
          eyebrow="The pathway"
          title="From application to your first sales role"
          description="A clear, supported journey — every step designed to get you hired."
        />
        <div className="relative mt-16">
          <GrowLine className="absolute inset-x-0 top-7 hidden h-0.5 bg-gradient-to-r from-brand-500 via-violet-500 to-accent-500 lg:block" />
          <ol className="relative grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-7">
            {pathway.map((step, i) => (
              <li key={step.label} className="flex flex-col items-center text-center">
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

      {/* Course preview */}
      <Section className="bg-slate-50">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Courses"
            title="Practical courses, built with employers"
            description="From your first sales conversation to interview-ready — learn the skills that get you hired."
          />
          <Link href="/courses" className={buttonVariants({ variant: "outline" })}>
            View all courses
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 6).map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </Section>

      {/* Impact */}
      <section className="relative overflow-hidden bg-midnight py-24 text-white">
        <div className="pointer-events-none absolute inset-0 -z-0 opacity-60">
          <div className="absolute -left-20 top-0 size-96 rounded-full bg-brand-600/30 blur-3xl" />
          <div className="absolute -right-10 bottom-0 size-96 rounded-full bg-violet-600/25 blur-3xl" />
        </div>
        <div className="container-page relative">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow tone="light">Our model</Eyebrow>
            <h2 className="text-display">A measurable pathway to opportunity</h2>
            <p className="mt-4 text-slate-300">
              We don&apos;t publish numbers we can&apos;t stand behind. Here&apos;s
              the model — real outcome data will appear here as our first cohorts
              complete.
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl glass-dark p-6 text-center"
              >
                <div className="font-display text-5xl font-extrabold text-white">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix ?? ""} />
                </div>
                <div className="mt-1 text-sm font-semibold text-accent-300">
                  {stat.label}
                </div>
                {stat.note ? (
                  <div className="mt-2 text-xs text-slate-400">{stat.note}</div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employer */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>For employers</Eyebrow>
            <h2 className="text-display text-navy">
              Hire sales-ready talent before your competitors do
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Skip the unproven CVs. Browse certified candidates whose
              communication and selling ability have already been assessed.
            </p>
            <ul className="mt-6 space-y-3">
              {employerBenefits.slice(0, 4).map((benefit) => (
                <li key={benefit.title} className="flex gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-accent-600" />
                  <span className="text-slate-600">
                    <span className="font-semibold text-navy">{benefit.title}.</span>{" "}
                    {benefit.description}
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/employers" className={buttonVariants({ className: "mt-8" })}>
              Become an Employer Partner
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {employerBenefits.slice(0, 4).map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.06}>
                <GlassCard className="h-full p-5">
                  <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon name={benefit.icon} className="size-5" />
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-navy">{benefit.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {benefit.description}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Sponsor band */}
      <section className="relative overflow-hidden bg-midnight py-20 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute right-0 top-0 size-96 rounded-full bg-violet-600/30 blur-3xl" />
          <div className="absolute -left-10 bottom-0 size-80 rounded-full bg-accent-500/20 blur-3xl" />
        </div>
        <div className="container-page relative flex flex-col items-center gap-8 text-center lg:flex-row lg:text-left">
          <div className="flex-1">
            <Eyebrow tone="light">For sponsors</Eyebrow>
            <h2 className="text-display">Fund a learner. Change a career path.</h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              Back the next generation of sales talent and track your social impact
              with live outcome reporting.
            </p>
          </div>
          <Link href="/sponsors" className={buttonVariants({ variant: "accent", size: "lg" })}>
            Sponsor a Learner
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>

      {/* Case studies */}
      <Section className="bg-slate-50">
        <SectionHeading
          eyebrow="How it works in practice"
          title="Built for learners, employers and sponsors"
          description="Real testimonials will appear here as our community grows. Until then, here's what success looks like across the ecosystem."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {caseStudies.map((study, i) => (
            <Reveal key={study.title} delay={i * 0.08}>
              <GlassCard className="flex h-full flex-col p-7">
                <Badge tone="brand">{study.audience}</Badge>
                <h3 className="mt-4 text-lg font-bold text-navy">{study.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {study.body}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Questions, answered"
            description="Can't find what you're looking for? Our team is happy to help."
          />
          <Accordion items={generalFaqs} />
        </div>
      </Section>

      {/* Final CTA */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-midnight px-6 py-20 text-center text-white shadow-elevated sm:px-12">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-10 -top-10 size-72 rounded-full bg-brand-500/30 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 size-72 rounded-full bg-violet-500/25 blur-3xl" />
            </div>
            <h2 className="relative text-display">Ready to start?</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-slate-300">
              Whether you want to learn, hire or fund the future workforce —
              there&apos;s a place for you at ExSell Academy.
            </p>
            <div className="relative mt-8 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
              <Link href="/apply" className={buttonVariants({ variant: "accent", size: "lg" })}>
                Apply for funded training
              </Link>
              <Link href="/courses" className={buttonVariants({ variant: "white", size: "lg" })}>
                Explore courses
              </Link>
              <Link
                href="/employers"
                className={buttonVariants({
                  variant: "ghost",
                  size: "lg",
                  className: "text-white hover:bg-white/10",
                })}
              >
                Hire talent
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
