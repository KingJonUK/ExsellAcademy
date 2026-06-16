import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Log in",
  description:
    "Log in to your ExSell Academy account to continue your sales training and track your progress.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold text-navy">
        Welcome back
      </h1>
      <p className="mt-2 text-slate-600">
        Log in to continue your training and track your progress.
      </p>

      <div className="mt-8">
        <LoginForm next={next} error={error === "1"} />
      </div>

      <p className="mt-8 text-center text-sm text-slate-600">
        New to ExSell?{" "}
        <Link
          href="/register"
          className="font-semibold text-brand-700 hover:text-brand-800"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
