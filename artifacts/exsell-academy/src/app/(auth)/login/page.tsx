import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? undefined;
  const error = searchParams.get("error") === "1";

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold text-navy">
        Welcome back
      </h1>
      <p className="mt-2 text-slate-600">
        Log in to continue your training and track your progress.
      </p>

      <div className="mt-8">
        <LoginForm next={next} error={error} />
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
