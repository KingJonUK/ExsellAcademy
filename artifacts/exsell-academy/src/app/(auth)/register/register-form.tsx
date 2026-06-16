import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/form";

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(true);
    // No backend — simulate account creation then route to login.
    window.setTimeout(() => router.push("/login"), 900);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field label="Full name" htmlFor="name">
        <div className="relative">
          <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Sofia Ahmed"
            className="pl-10"
          />
        </div>
      </Field>

      <Field label="Email address" htmlFor="email">
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="pl-10"
          />
        </div>
      </Field>

      <Field label="Password" htmlFor="password" hint="Use at least 8 characters.">
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Create a password"
            className="px-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2.5 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-slate-400 transition-colors hover:text-slate-600"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </Field>

      <Field label="I'm joining as" htmlFor="role">
        <Select id="role" name="role" defaultValue="learner">
          <option value="learner">I&apos;m a learner</option>
          <option value="employer">I&apos;m an employer</option>
          <option value="sponsor">I&apos;m a sponsor</option>
        </Select>
      </Field>

      <label className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-600">
        <input
          type="checkbox"
          name="consent"
          className="mt-0.5 size-4 shrink-0 rounded border-slate-300 text-brand-600 focus:ring-2 focus:ring-brand-500/30"
        />
        <span>
          I agree to the{" "}
          <a
            href="/terms"
            className="font-semibold text-brand-700 hover:text-brand-800"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="font-semibold text-brand-700 hover:text-brand-800"
          >
            Privacy Policy
          </a>
          .
        </span>
      </label>

      <Button type="submit" size="lg" className="w-full">
        Create account
      </Button>

      {notice ? (
        <p
          role="status"
          className="rounded-xl border border-accent-200 bg-accent-50 px-4 py-3 text-center text-sm font-medium text-accent-800"
        >
          Account created — taking you to the login page…
        </p>
      ) : null}
    </form>
  );
}
