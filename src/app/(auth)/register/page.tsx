import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Create account",
  description:
    "Create your ExSell Academy account to start certified sales training, hire talent, or sponsor a learner.",
};

export default function RegisterPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold text-navy">
        Create your account
      </h1>
      <p className="mt-2 text-slate-600">
        Join ExSell Academy to learn, hire or fund the future sales workforce.
      </p>

      <div className="mt-8">
        <RegisterForm />
      </div>

      <p className="mt-8 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-brand-700 hover:text-brand-800"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
