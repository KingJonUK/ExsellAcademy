import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
import { CourseCard } from "@/components/course-card";
import { StatCard } from "@/components/stat-card";
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
      <section className="border-y border-slate-200 bg-slate-50">
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
          title="School leavers are entering the world without the commercial skills employers need"
          description="Talented people miss out on great careers — and employers can't find the trained entry-level sales talent they're desperate for."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((item, i) => (
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

      {/* Solution */}
      <Section className="bg-slate-50">
        <SectionHeading
          eyebrow="The solution"
          title="We train, certify and connect the next generation of sales professionals"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {solutions.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
                <span className="absolute right-5 top-4 font-display text-6xl font-extrabold text-slate-100">
                  {i + 1}
                </span>
                <span className="relative grid size-12 place-items-center rounded-xl bg-brand-600 text-white">
                  <Icon name={item.icon} className="size-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-navy">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
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
        <ol className="mt-12 grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-7">
          {pathway.map((step, i) => (
            <li key={step.label} className="flex flex-col items-center text-center">
              <span className="relative grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
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

      {/* Course preview */}
      <Section className="bg-slate-50">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Courses"
            title="Practical courses, built with employers"
            description="From your first sales conversation to interview-ready — learn the skills that get you hired."
          />
          <Link
            href="/courses"
            className={buttonVariants({ variant: "outline" })}
          >
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
      <section className="bg-navy py-20 text-white">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow className="text-accent-300">Our model</Eyebrow>
            <h2 className="text-3xl font-bold sm:text-4xl">
              A measurable pathway to opportunity
            </h2>
            <p className="mt-4 text-slate-300">
              We don&apos;t publish numbers we can&apos;t stand behind. Here&apos;s
              the model — real outcome data will appear here as our first cohorts
              complete.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Employer */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>For employers</Eyebrow>
            <h2 className="text-3xl font-bold text-navy sm:text-4xl">
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
                    <span className="font-semibold text-navy">
                      {benefit.title}.
                    </span>{" "}
                    {benefit.description}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/employers"
              className={buttonVariants({ className: "mt-8" })}
            >
              Become an Employer Partner
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {employerBenefits.slice(0, 4).map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"
              >
                <span className="grid size-10 place-items-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon name={benefit.icon} className="size-5" />
                </span>
                <h3 className="mt-3 text-sm font-bold text-navy">
                  {benefit.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Sponsor band */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-900 py-16 text-white">
        <div className="container-page flex flex-col items-center gap-8 text-center lg:flex-row lg:text-left">
          <div className="flex-1">
            <Eyebrow className="text-accent-300">For sponsors</Eyebrow>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Fund a learner. Change a career path.
            </h2>
            <p className="mt-3 max-w-2xl text-brand-100">
              Back the next generation of sales talent and track your social
              impact with live outcome reporting.
            </p>
          </div>
          <Link
            href="/sponsors"
            className={buttonVariants({ variant: "accent", size: "lg" })}
          >
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
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {caseStudies.map((study) => (
            <div
              key={study.title}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-soft"
            >
              <Badge tone="brand">{study.audience}</Badge>
              <h3 className="mt-4 text-lg font-bold text-navy">{study.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {study.body}
              </p>
            </div>
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
      <section className="border-t border-slate-200 bg-white py-20">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-16 text-center text-white shadow-glow sm:px-12">
            <div className="pointer-events-none absolute -right-10 -top-10 size-64 rounded-full bg-brand-500/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 size-64 rounded-full bg-accent-500/20 blur-3xl" />
            <h2 className="relative text-3xl font-bold sm:text-4xl">
              Ready to start?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-slate-300">
              Whether you want to learn, hire or fund the future workforce —
              there&apos;s a place for you at ExSell Academy.
            </p>
            <div className="relative mt-8 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
              <Link href="/apply" className={buttonVariants({ variant: "accent", size: "lg" })}>
                Apply for Funded Training
              </Link>
              <Link href="/courses" className={buttonVariants({ variant: "white", size: "lg" })}>
                Explore Courses
              </Link>
              <Link
                href="/employers"
                className={buttonVariants({
                  variant: "ghost",
                  size: "lg",
                  className: "text-white hover:bg-white/10",
                })}
              >
                Hire Talent
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
