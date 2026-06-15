import { cookies } from "next/headers";

export const ADMIN_COOKIE = "exsell_admin";

/**
 * The configured admin password, or null when admin access must fail closed.
 *
 * A convenience default is used only outside production (local/preview). In
 * production we never fall back to a publicly-known default — if ADMIN_PASSWORD
 * is unset, admin is disabled entirely rather than accepting a known password.
 */
function adminPassword(): string | null {
  const configured = process.env.ADMIN_PASSWORD;
  if (configured && configured.length > 0) return configured;
  return process.env.NODE_ENV === "production" ? null : "exsell-admin";
}

/**
 * Opaque session token derived from the password, or null when admin is
 * disabled. Standard base64 of an ASCII string, so the Node server actions and
 * the edge middleware compute the same value (Buffer base64 === btoa for ASCII).
 */
export function adminToken(): string | null {
  const password = adminPassword();
  if (!password) return null;
  return Buffer.from(`exsell:${password}`).toString("base64");
}

export async function isAdmin(): Promise<boolean> {
  const token = adminToken();
  if (!token) return false;
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === token;
}

/** Returns true and sets the session cookie when the password is configured and matches. */
export async function signInAdmin(password: string): Promise<boolean> {
  const expected = adminPassword();
  const token = adminToken();
  if (!expected || !token || password !== expected) return false;
  const store = await cookies();
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
  });
  return true;
}

export async function signOutAdmin(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}
