import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Eyebrow } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/icon";
import { ApplicationForm } from "@/components/forms/application-form";
import { fundedIncludes } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply for a funded place at ExSell Academy. Tell us about yourself and your goals, and our team will review your application and be in touch with the next steps — fully funded, CPD-certified sales training and a route to real careers.",
};

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
      {/* Page header */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container-page py-12 sm:py-16">
          <div className="max-w-2xl">
            <Eyebrow>ExSell Foundation</Eyebrow>
            <h1 className="text-3xl font-bold text-navy sm:text-4xl">
              Apply for a funded place
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              It takes just a few minutes. Share a little about yourself and your
              goals, and our team will take it from there.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* Supportive copy */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Eyebrow>What happens next</Eyebrow>
              <h2 className="text-2xl font-bold text-navy sm:text-3xl">
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
                    <span className="relative grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon name={item.icon} className="size-5" />
                      <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
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

              <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
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
              </div>
            </div>

            {/* Form */}
            <Card className="p-6 sm:p-8 lg:p-10">
              <ApplicationForm />
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
