import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Label } from "@/components/ui/form";
import { useAuth } from "@/lib/auth";
import { safeNextPath } from "@/app/(auth)/auth-actions";

export function LoginForm({
  next,
  error,
}: {
  next?: string;
  error?: boolean;
}) {
  const router = useRouter();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [failed, setFailed] = useState(Boolean(error));

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    if (signIn("learner", password)) {
      router.push(safeNextPath(next));
    } else {
      setFailed(true);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {failed ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-800"
        >
          Incorrect password — use the demo credentials below.
        </p>
      ) : null}

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

      <Button type="submit" size="lg" className="w-full">
        Log in
      </Button>

      {/* Demo credentials */}
      <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm">
        <p className="font-semibold text-brand-800">Demo access</p>
        <p className="mt-0.5 text-brand-700">
          Any email · Password:{" "}
          <span className="font-mono font-bold">exsell-learner</span>
        </p>
      </div>
    </form>
  );
}
