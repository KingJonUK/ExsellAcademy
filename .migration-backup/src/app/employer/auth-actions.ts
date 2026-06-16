"use server";

import { redirect } from "next/navigation";
import { signInEmployer, signOutEmployer } from "@/lib/employer-auth";

export async function employerLoginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/employer");
  const safeNext = next.startsWith("/employer") ? next : "/employer";

  const ok = await signInEmployer(password);
  if (!ok) {
    const params = new URLSearchParams({ error: "1" });
    if (safeNext !== "/employer") params.set("next", safeNext);
    redirect(`/employer/login?${params.toString()}`);
  }

  redirect(safeNext);
}

export async function employerLogoutAction() {
  await signOutEmployer();
  redirect("/employer/login");
}
