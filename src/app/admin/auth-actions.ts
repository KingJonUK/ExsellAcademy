"use server";

import { redirect } from "next/navigation";
import { signInAdmin, signOutAdmin } from "@/lib/admin-auth";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");
  const safeNext = next.startsWith("/admin") ? next : "/admin";

  const ok = await signInAdmin(password);
  if (!ok) {
    const params = new URLSearchParams({ error: "1" });
    if (safeNext !== "/admin") params.set("next", safeNext);
    redirect(`/admin/login?${params.toString()}`);
  }

  redirect(safeNext);
}

export async function logoutAction() {
  await signOutAdmin();
  redirect("/admin/login");
}
