"use server";

import { redirect } from "next/navigation";
import { signInLearner, signOutLearner } from "@/lib/learner-auth";

export async function learnerLoginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "").trim();

  const ok = await signInLearner(password);
  if (!ok) {
    const params = new URLSearchParams({ error: "1" });
    if (next) params.set("next", next);
    redirect(`/login?${params.toString()}`);
  }

  const safeNext =
    next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
  redirect(safeNext);
}

export async function learnerLogoutAction() {
  await signOutLearner();
  redirect("/login");
}
