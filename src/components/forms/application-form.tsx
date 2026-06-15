"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import {
  ArrowRight,
  ChevronLeft,
  CircleCheckBig,
  Loader2,
  PartyPopper,
} from "lucide-react";
import {
  applicationSchema,
  educationOptions,
  employmentOptions,
  availabilityOptions,
  type ApplicationInput,
} from "@/lib/validations/application";
import { Field, Input, Textarea, Select } from "@/components/ui/form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Raw form-field types. `age` uses `z.coerce.number()`, so its *input* is a
 * string from the <input> while the validated *output* (`ApplicationInput`) is
 * a number — hence the input/output split in the `useForm` generics below.
 */
type FormInput = z.input<typeof applicationSchema>;

const steps = [
  { title: "About you", description: "The basics so we can get in touch." },
  { title: "Your goals", description: "Tell us where you want to go." },
  {
    title: "Availability & consent",
    description: "A few last details before you submit.",
  },
] as const;

/** Fields validated at each step before the learner can advance. */
const stepFields: (keyof FormInput)[][] = [
  ["fullName", "email", "phone", "age", "location"],
  ["educationStatus", "employmentStatus", "careerGoals", "whySales"],
  ["availability", "safeguardingNotes", "consent"],
];

type SubmitState =
  | { status: "idle" | "submitting" | "error"; message?: string }
  | { status: "success"; reference: string };

export function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [submit, setSubmit] = useState<SubmitState>({ status: "idle" });

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormInput, unknown, ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    mode: "onTouched",
  });

  const isLast = step === steps.length - 1;

  async function handleContinue() {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  const onSubmit = handleSubmit(async (values) => {
    setSubmit({ status: "submitting" });
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setSubmit({ status: "success", reference: data.reference });
      } else {
        setSubmit({
          status: "error",
          message:
            "We couldn't submit your application. Please check your answers and try again.",
        });
      }
    } catch {
      setSubmit({
        status: "error",
        message:
          "Something went wrong sending your application. Please try again in a moment.",
      });
    }
  });

  if (submit.status === "success") {
    return (
      <div className="rounded-2xl border border-accent-200 bg-accent-50 p-8 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent-100 text-accent-700">
          <PartyPopper className="size-7" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-2xl font-bold text-navy">Application received</h3>
        <p className="mt-2 text-slate-600">
          Thank you — your funded-place application is in. Keep your reference
          safe:
        </p>
        <p className="mx-auto mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 font-mono text-sm font-semibold text-navy shadow-soft">
          <CircleCheckBig className="size-4 text-accent-600" aria-hidden="true" />
          {submit.reference}
        </p>
        <p className="mt-5 text-sm leading-relaxed text-slate-600">
          Our team will review your application and email you the next steps. In
          the meantime, why not explore what you&apos;ll be learning?
        </p>
        <Link
          href="/courses"
          className={buttonVariants({ variant: "primary", className: "mt-6" })}
        >
          Explore courses
          <ArrowRight className="size-4" />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-brand-600">
            Step {step + 1} of {steps.length}
          </p>
          <p className="text-sm font-medium text-slate-500">
            {steps[step].title}
          </p>
        </div>
        <div className="mt-3 flex gap-2" role="presentation">
          {steps.map((s, i) => (
            <span
              key={s.title}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors duration-300",
                i <= step ? "bg-brand-600" : "bg-slate-200",
              )}
            />
          ))}
        </div>
        <p className="mt-3 text-sm text-slate-500">{steps[step].description}</p>
      </div>

      {/* Step 1 — About you */}
      {step === 0 && (
        <div className="space-y-5">
          <Field
            label="Full name"
            htmlFor="fullName"
            required
            error={errors.fullName?.message}
          >
            <Input
              id="fullName"
              autoComplete="name"
              placeholder="Alex Taylor"
              invalid={!!errors.fullName}
              {...register("fullName")}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Email"
              htmlFor="email"
              required
              error={errors.email?.message}
            >
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                invalid={!!errors.email}
                {...register("email")}
              />
            </Field>
            <Field
              label="Phone"
              htmlFor="phone"
              required
              error={errors.phone?.message}
            >
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="07123 456789"
                invalid={!!errors.phone}
                {...register("phone")}
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Age"
              htmlFor="age"
              required
              error={errors.age?.message}
            >
              <Input
                id="age"
                type="number"
                inputMode="numeric"
                min={16}
                max={99}
                placeholder="18"
                invalid={!!errors.age}
                {...register("age")}
              />
            </Field>
            <Field
              label="Location"
              htmlFor="location"
              required
              hint="Town or city"
              error={errors.location?.message}
            >
              <Input
                id="location"
                autoComplete="address-level2"
                placeholder="Manchester"
                invalid={!!errors.location}
                {...register("location")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* Step 2 — Your goals */}
      {step === 1 && (
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Education status"
              htmlFor="educationStatus"
              required
              error={errors.educationStatus?.message}
            >
              <Select
                id="educationStatus"
                defaultValue=""
                invalid={!!errors.educationStatus}
                {...register("educationStatus")}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {educationOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Select>
            </Field>
            <Field
              label="Employment status"
              htmlFor="employmentStatus"
              required
              error={errors.employmentStatus?.message}
            >
              <Select
                id="employmentStatus"
                defaultValue=""
                invalid={!!errors.employmentStatus}
                {...register("employmentStatus")}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {employmentOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <Field
            label="What are your career goals?"
            htmlFor="careerGoals"
            required
            hint="A sentence or two about where you'd like your career to go."
            error={errors.careerGoals?.message}
          >
            <Textarea
              id="careerGoals"
              placeholder="I'd love to build a career in sales and one day lead a team…"
              invalid={!!errors.careerGoals}
              {...register("careerGoals")}
            />
          </Field>

          <Field
            label="Why sales?"
            htmlFor="whySales"
            required
            hint="What draws you to a career in sales?"
            error={errors.whySales?.message}
          >
            <Textarea
              id="whySales"
              placeholder="I enjoy talking to people and solving problems…"
              invalid={!!errors.whySales}
              {...register("whySales")}
            />
          </Field>
        </div>
      )}

      {/* Step 3 — Availability & consent */}
      {step === 2 && (
        <div className="space-y-5">
          <Field
            label="When could you start?"
            htmlFor="availability"
            required
            error={errors.availability?.message}
          >
            <Select
              id="availability"
              defaultValue=""
              invalid={!!errors.availability}
              {...register("availability")}
            >
              <option value="" disabled>
                Select an option
              </option>
              {availabilityOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </Select>
          </Field>

          <Field
            label="Anything we should know?"
            htmlFor="safeguardingNotes"
            hint="Optional and confidential — let us know about any support needs or circumstances so we can help."
            error={errors.safeguardingNotes?.message}
          >
            <Textarea
              id="safeguardingNotes"
              placeholder="Optional — anything that would help us support you."
              invalid={!!errors.safeguardingNotes}
              {...register("safeguardingNotes")}
            />
          </Field>

          <div>
            <label
              htmlFor="consent"
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-300 bg-white p-4 transition-colors hover:border-brand-400"
            >
              <input
                id="consent"
                type="checkbox"
                className="mt-0.5 size-5 shrink-0 rounded border-slate-300 text-brand-600 focus:ring-2 focus:ring-brand-500/30"
                {...register("consent")}
              />
              <span className="text-sm leading-relaxed text-slate-600">
                I agree to be contacted by ExSell Academy about my application
                and consent to my information being handled in line with the
                privacy terms.
                <span className="ml-0.5 text-red-500">*</span>
              </span>
            </label>
            {errors.consent ? (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {errors.consent.message}
              </p>
            ) : null}
          </div>

          {submit.status === "error" && submit.message ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {submit.message}
            </p>
          ) : null}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            className={buttonVariants({ variant: "outline" })}
            disabled={submit.status === "submitting"}
          >
            <ChevronLeft className="size-4" />
            Back
          </button>
        ) : (
          <span />
        )}

        {isLast ? (
          <button
            type="submit"
            className={buttonVariants({ variant: "accent" })}
            disabled={submit.status === "submitting"}
          >
            {submit.status === "submitting" ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                Submit application
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleContinue}
            className={buttonVariants({ variant: "primary" })}
          >
            Continue
            <ArrowRight className="size-4" />
          </button>
        )}
      </div>
    </form>
  );
}
