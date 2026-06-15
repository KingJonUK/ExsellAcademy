"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Label } from "@/components/ui/form";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
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

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <Label htmlFor="password" className="mb-0">
            Password
          </Label>
          <Link
            href="#"
            className="text-xs font-semibold text-brand-700 hover:text-brand-800"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
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
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          name="remember"
          className="size-4 rounded border-slate-300 text-brand-600 focus:ring-2 focus:ring-brand-500/30"
        />
        Remember me
      </label>

      <Button type="submit" size="lg" className="w-full">
        Log in
      </Button>

      {notice ? (
        <p
          role="status"
          className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-medium text-amber-800"
        >
          Authentication isn&apos;t connected in this preview yet.
        </p>
      ) : null}

      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-xs font-medium uppercase tracking-wide text-slate-400">
            or
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <Button type="submit" variant="outline" size="lg" className="w-full">
          Continue with Google
        </Button>
        <Button type="submit" variant="outline" size="lg" className="w-full">
          Continue with LinkedIn
        </Button>
      </div>
    </form>
  );
}
