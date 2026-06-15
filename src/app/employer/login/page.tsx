import type { Metadata } from "next";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { employerLoginAction } from "@/app/employer/auth-actions";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/form";

export const metadata: Metadata = {
  title: "Employer portal sign in",
  robots: { index: false, follow: false },
};

export default async function EmployerLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 bg-grid px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-3xl glass-card p-7 shadow-elevated">
          <div className="flex items-center gap-2 text-brand-700">
            <Building2 className="size-5" />
            <h1 className="text-lg font-bold text-navy">Employer portal</h1>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to browse certified candidates and manage your pipeline.
          </p>

          <form action={employerLoginAction} className="mt-6 space-y-4">
            <input type="hidden" name="next" value={next ?? "/employer"} />
            <Field label="Employer password" htmlFor="password" required>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                autoFocus
                invalid={Boolean(error)}
                placeholder="Enter employer password"
              />
            </Field>
            {error ? (
              <p className="text-xs font-medium text-red-600">
                Incorrect password. Please try again.
              </p>
            ) : null}
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>

          <p className="mt-4 text-xs text-slate-500">
            Preview access to a shared demo company. Individual employer accounts
            arrive with full authentication.
          </p>
        </div>

        <p className="mt-5 text-center text-sm text-slate-500">
          <Link href="/employers" className="font-semibold text-brand-700 hover:underline">
            ← Employer info
          </Link>
        </p>
      </div>
    </main>
  );
}
