"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckBig, Loader2 } from "lucide-react";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  contactSchema,
  topicOptions,
  type ContactInput,
} from "@/lib/validations/contact";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", topic: undefined, message: "" },
  });

  async function onSubmit(values: ContactInput) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      reset();
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong sending your message. Please try again, or email us directly.",
      );
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-accent-200 bg-accent-50/60 px-6 py-12 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-accent-100 text-accent-700">
          <CircleCheckBig className="size-7" />
        </span>
        <h3 className="mt-5 text-xl font-bold text-navy">
          Thanks — we&apos;ll be in touch
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
          Your message is on its way to our team. We aim to reply within a
          couple of working days.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <Field
        label="Your name"
        htmlFor="name"
        required
        error={errors.name?.message}
      >
        <Input
          id="name"
          autoComplete="name"
          placeholder="Alex Taylor"
          invalid={!!errors.name}
          aria-invalid={!!errors.name}
          {...register("name")}
        />
      </Field>

      <Field
        label="Email address"
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
          aria-invalid={!!errors.email}
          {...register("email")}
        />
      </Field>

      <Field
        label="What's this about?"
        htmlFor="topic"
        required
        error={errors.topic?.message}
      >
        <Select
          id="topic"
          defaultValue=""
          invalid={!!errors.topic}
          aria-invalid={!!errors.topic}
          {...register("topic")}
        >
          <option value="" disabled>
            Choose a topic…
          </option>
          {topicOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        label="Your message"
        htmlFor="message"
        required
        error={errors.message?.message}
        hint="Tell us a little about what you're looking for."
      >
        <Textarea
          id="message"
          rows={5}
          placeholder="I'd like to know more about…"
          invalid={!!errors.message}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
      </Field>

      {submitError ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {submitError}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}
