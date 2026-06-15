import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, Star } from "lucide-react";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/stat-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sponsorPackages, caseStudies } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "For Sponsors",
  description:
    "Fund a learner and change a career path. Back the next generation of sales talent with ExSell Academy and track your social impact through live dashboards and quarterly outcome reporting.",
};

const missionPoints: { icon: string; title: string; description: string }[] = [
  {
    icon: "GraduationCap",
    title: "Open doors with skills",
    description:
      "We turn motivation into employable, assessed sales ability — the practical skills that schools rarely teach.",
  },
  {
    icon: "HeartHandshake",
    title: "Reach those facing barriers",
    description:
      "Funded places prioritise school leavers and people facing barriers to employment, removing cost as an obstacle.",
  },
  {
    icon: "Briefcase",
    title: "Connect talent to careers",
    description:
      "Every funded learner enters a pathway that ends in real employer opportunities, not just a certificate.",
  },
];

// Illustrative placeholder metrics for the sample dashboard preview.
const dashboardMetrics: { value: string; label: string; note?: string }[] = [
  { value: "24", label: "Learners funded", note: "Across your sponsorship" },
  { value: "92%", label: "Completion rate", note: "Of enrolled learners" },
  { value: "21", label: "Certificates earned", note: "CPD-recognised" },
  { value: "15", label: "Placements achieved", note: "Into sales roles" },
];

const dashboardProgress: { label: string; value: number }[] = [
  { label: "Cohort completion", value: 92 },
  { label: "Interview-ready", value: 78 },
  { label: "Placed into roles", value: 63 },
];

const reportingFeatures: { icon: string; title: string; description: string }[] = [
  {
    icon: "FileText",
    title: "Quarterly impact reports",
    description:
      "Board-ready summaries of how your funding translated into completions, certifications and placements.",
  },
  {
    icon: "Database",
    title: "Live impact dashboard",
    description:
      "Track your sponsored learners in real time — enrolment, progress and outcomes, all in one place.",
  },
  {
    icon: "Telescope",
    title: "Outcome tracking",
    description:
      "We follow learners through to placement and beyond, so your CSR spend maps to measurable results.",
  },
];

export default function SponsorsPage() {
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
            <Eyebrow>For sponsors</Eyebrow>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-6xl">
              Fund a learner.{" "}
              <span className="text-gradient">Change a career path.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Your sponsorship gives a motivated learner the training,
              certification and employer connections they need to start a sales
              career — and helps build the future sales workforce. Every place
              you fund is an opportunity you create.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact"
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                Sponsor a Learner
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/contact"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Talk to our team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social impact mission */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Our mission</Eyebrow>
            <h2 className="text-3xl font-bold text-navy sm:text-4xl">
              Turning potential into opportunity
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Too many capable people leave education without a route into a
              rewarding career — and employers can&apos;t find the trained,
              entry-level sales talent they need. Sponsors close that gap. By
              funding a place, you give someone the skills, confidence and
              certification to be hired, while helping to grow a pipeline of
              work-ready talent for the industry.
            </p>
          </div>
          <div className="grid gap-4">
            {missionPoints.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.06}>
                <div className="flex h-full gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-100 text-accent-700">
                    <Icon name={point.icon} className="size-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-navy">
                      {point.title}
                    </h3>
                    <p className="mt-1 leading-relaxed text-slate-600">
                      {point.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Sponsor packages */}
      <Section className="bg-slate-50">
        <SectionHeading
          eyebrow="Sponsorship"
          title="Choose how you make an impact"
          description="Whether you fund a single learner or back an entire cohort, every package turns your support into measurable outcomes."
        />
        <div className="mt-12 grid items-start gap-6 md:grid-cols-3">
          {sponsorPackages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.08}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border bg-white p-7 shadow-soft",
                  pkg.highlighted
                    ? "border-brand-200 ring-2 ring-brand-500 md:scale-[1.03]"
                    : "border-slate-200",
                )}
              >
                {pkg.highlighted ? (
                  <Badge
                    tone="brand"
                    className="absolute -top-3 left-7 shadow-soft"
                  >
                    <Star className="size-3.5" />
                    Most popular
                  </Badge>
                ) : null}
                <h3 className="text-lg font-bold text-navy">{pkg.name}</h3>
                <p className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-extrabold text-navy">
                    {pkg.price}
                  </span>
                  <span className="text-sm font-medium text-slate-500">
                    {pkg.cadence}
                  </span>
                </p>
                <p className="mt-3 leading-relaxed text-slate-600">
                  {pkg.description}
                </p>
                <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent-600" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={buttonVariants({
                    variant: pkg.highlighted ? "primary" : "outline",
                    className: "mt-7 w-full",
                  })}
                >
                  Sponsor a Learner
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-500">
          Looking for something tailored to your CSR goals? We&apos;ll build a
          bespoke partnership around the impact you want to create.
        </p>
      </Section>

      {/* Impact dashboard preview */}
      <section className="relative overflow-hidden bg-navy py-20 text-white sm:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-10 -top-10 size-72 rounded-full bg-brand-500/25 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 size-72 rounded-full bg-accent-500/20 blur-3xl" />
        </div>
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow className="text-accent-300">See your impact</Eyebrow>
            <h2 className="text-3xl font-bold sm:text-4xl">
              A dashboard that shows your difference
            </h2>
            <p className="mt-4 text-slate-300">
              Watch your sponsorship turn into completions, certificates and
              placements. The preview below uses sample figures to show what
              you&apos;ll see.
            </p>
          </div>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-semibold">
                  <Sparkles className="size-5 text-accent-300" />
                  Sample impact dashboard
                </div>
                <Badge tone="accent">Illustrative data</Badge>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {dashboardMetrics.map((metric) => (
                  <StatCard key={metric.label} {...metric} />
                ))}
              </div>

              <div className="mt-6 grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 sm:grid-cols-3">
                {dashboardProgress.map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-300">
                        {item.label}
                      </span>
                      <span className="font-semibold text-accent-300">
                        {item.value}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-accent-500"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reporting & outcomes */}
      <Section>
        <SectionHeading
          eyebrow="Reporting & outcomes"
          title="Funding you can measure"
          description="Sponsorship shouldn't be a leap of faith. We track outcomes end to end and report back, so you always know the difference you're making."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reportingFeatures.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-soft">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-600 text-white">
                  <Icon name={feature.icon} className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">
                  {feature.title}
                </h3>
                <p className="mt-2 leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Case studies (sponsor + relevant outcomes) */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {caseStudies
            .filter((study) => study.audience !== "Employer")
            .map((study) => (
              <div
                key={study.title}
                className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-7"
              >
                <Badge tone="accent">{study.audience}</Badge>
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
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 px-6 py-16 text-center text-white shadow-glow sm:px-12">
            <div className="pointer-events-none absolute -right-10 -top-10 size-64 rounded-full bg-brand-500/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 size-64 rounded-full bg-accent-500/20 blur-3xl" />
            <h2 className="relative text-3xl font-bold sm:text-4xl">
              Back the next generation of sales talent
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-brand-100">
              Fund a learner today and turn your support into measurable social
              impact — with the reporting to prove it.
            </p>
            <div className="relative mt-8 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className={buttonVariants({ variant: "accent", size: "lg" })}
              >
                Sponsor a Learner
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/contact"
                className={buttonVariants({ variant: "white", size: "lg" })}
              >
                Talk to our team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
