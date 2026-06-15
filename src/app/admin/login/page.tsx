import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { loginAction } from "@/app/admin/auth-actions";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/form";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
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
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-soft">
          <div className="flex items-center gap-2 text-brand-700">
            <ShieldCheck className="size-5" />
            <h1 className="text-lg font-bold text-navy">Admin sign in</h1>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Restricted area — staff access only.
          </p>

          <form action={loginAction} className="mt-6 space-y-4">
            <input type="hidden" name="next" value={next ?? "/admin"} />
            <Field label="Password" htmlFor="password" required>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                autoFocus
                invalid={Boolean(error)}
                placeholder="Enter admin password"
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
        </div>

        <p className="mt-5 text-center text-sm text-slate-500">
          <Link href="/" className="font-semibold text-brand-700 hover:underline">
            ← Back to site
          </Link>
        </p>
      </div>
    </main>
  );
}
