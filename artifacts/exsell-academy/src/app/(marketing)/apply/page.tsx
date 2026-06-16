import { Check, Sparkles } from "lucide-react";
import { Eyebrow } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { Icon } from "@/components/icon";
import { ApplicationForm } from "@/components/forms/application-form";
import { fundedIncludes } from "@/lib/data/content";

const afterYouApply = [
  {
    icon: "ClipboardCheck",
    title: "We review your application",
    description:
      "Our team reads every application individually and may ask for a little more information.",
  },
  {
    icon: "MessagesSquare",
    title: "We get in touch",
    description:
      "We'll email you the outcome and, where relevant, talk through the next steps with you.",
  },
  {
    icon: "GraduationCap",
    title: "You start learning",
    description:
      "Approved learners are enrolled onto a funded pathway and matched with a sponsor where relevant.",
  },
];

export default function ApplyPage() {
  return (
    <>
      {/* Premium page header */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-aurora">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-50" />
        <div className="container-page py-16 sm:py-24">
          <div className="max-w-3xl">
            <span
              className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-brand-100 bg-white/70 px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-soft backdrop-blur"
              style={{ animationDelay: "40ms" }}
            >
              <Sparkles className="size-4 text-violet-500" />
              ExSell Foundation · fully funded places
            </span>
            <h1
              className="mt-6 animate-fade-up text-hero text-navy"
              style={{ animationDelay: "120ms" }}
            >
              Apply for a{" "}
              <span className="text-gradient">funded place</span>
            </h1>
            <p
              className="mt-5 max-w-2xl animate-fade-up text-lg leading-relaxed text-slate-600"
              style={{ animationDelay: "200ms" }}
            >
              It takes just a few minutes. Share a little about yourself and your
              goals, and our team will take it from there.
            </p>
            <p
              className="mt-6 animate-fade-up text-sm text-slate-500"
              style={{ animationDelay: "280ms" }}
            >
              No cost · No experience needed · Open to all backgrounds
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* Supportive copy */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Eyebrow>What happens next</Eyebrow>
              <h2 className="text-display text-navy">
                A supported journey from day one
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                There&apos;s no catch and no cost. We&apos;ll guide you through
                every step — and we review applications from people of all
                backgrounds.
              </p>

              <ol className="mt-8 space-y-6">
                {afterYouApply.map((item, i) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="relative grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-violet-600 text-white shadow-glow">
                      <Icon name={item.icon} className="size-5" />
                      <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-white text-[10px] font-bold text-brand-700 shadow-soft ring-1 ring-slate-200">
                        {i + 1}
                      </span>
                    </span>
                    <div>
                      <h3 className="font-bold text-navy">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <GlassCard className="mt-10 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-600">
                  What&apos;s included
                </h3>
                <ul className="mt-4 space-y-3">
                  {fundedIncludes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent-100 text-accent-700">
                        <Check className="size-3.5" />
                      </span>
                      <span className="text-sm font-medium text-navy">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>

            {/* Form */}
            <GlassCard className="p-6 shadow-elevated sm:p-8 lg:p-10">
              <ApplicationForm />
            </GlassCard>
          </div>
        </div>
      </section>
    </>
  );
}
