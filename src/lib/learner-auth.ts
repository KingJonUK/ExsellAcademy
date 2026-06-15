import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

export const LEARNER_COOKIE = "exsell_learner";

/** The seeded demo learner the portal operates as (single-tenant preview). */
export const DEMO_LEARNER_EMAIL = "sofia.ahmed@talent.example.com";

function learnerPassword(): string | null {
  const configured = process.env.LEARNER_PASSWORD;
  if (configured && configured.length > 0) return configured;
  return process.env.NODE_ENV === "production" ? null : "exsell-learner";
}

export function learnerToken(): string | null {
  const password = learnerPassword();
  if (!password) return null;
  return Buffer.from(`exsell-learner:${password}`).toString("base64");
}

export async function isLearner(): Promise<boolean> {
  const token = learnerToken();
  if (!token) return false;
  const store = await cookies();
  return store.get(LEARNER_COOKIE)?.value === token;
}

export async function signInLearner(password: string): Promise<boolean> {
  const expected = learnerPassword();
  const token = learnerToken();
  if (!expected || !token || password !== expected) return false;
  const store = await cookies();
  store.set(LEARNER_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
  });
  return true;
}

export async function signOutLearner(): Promise<void> {
  const store = await cookies();
  store.delete(LEARNER_COOKIE);
}

/** Resolve the demo learner profile the dashboard acts as. */
export async function getSessionLearner() {
  return prisma.learnerProfile.findFirst({
    where: { user: { email: DEMO_LEARNER_EMAIL } },
    include: { user: true },
  });
}
