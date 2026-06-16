import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

export const EMPLOYER_COOKIE = "exsell_employer";

/** The seeded demo company the portal operates as (single-tenant preview). */
export const DEMO_EMPLOYER_EMAIL = "talent@acmesales.com";

/**
 * Configured employer password, or null when access must fail closed (prod +
 * unset). A convenience default is used only outside production — matches the
 * admin-auth approach. Replaced by real multi-tenant auth (Clerk) later.
 */
function employerPassword(): string | null {
  const configured = process.env.EMPLOYER_PASSWORD;
  if (configured && configured.length > 0) return configured;
  return process.env.NODE_ENV === "production" ? null : "exsell-employer";
}

export function employerToken(): string | null {
  const password = employerPassword();
  if (!password) return null;
  return Buffer.from(`exsell-employer:${password}`).toString("base64");
}

export async function isEmployer(): Promise<boolean> {
  const token = employerToken();
  if (!token) return false;
  const store = await cookies();
  return store.get(EMPLOYER_COOKIE)?.value === token;
}

export async function signInEmployer(password: string): Promise<boolean> {
  const expected = employerPassword();
  const token = employerToken();
  if (!expected || !token || password !== expected) return false;
  const store = await cookies();
  store.set(EMPLOYER_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
  });
  return true;
}

export async function signOutEmployer(): Promise<void> {
  const store = await cookies();
  store.delete(EMPLOYER_COOKIE);
}

/** Resolve the demo employer profile the portal acts as. */
export async function getSessionEmployer() {
  return prisma.employerProfile.findFirst({
    where: { user: { email: DEMO_EMPLOYER_EMAIL } },
  });
}
