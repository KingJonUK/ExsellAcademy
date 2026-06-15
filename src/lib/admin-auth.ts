import { cookies } from "next/headers";

export const ADMIN_COOKIE = "exsell_admin";

/** The fallback password is only for local/preview use; set ADMIN_PASSWORD in prod. */
function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "exsell-admin";
}

/**
 * Opaque session token derived from the password. Standard base64 of an ASCII
 * string, so the Node server actions and the edge middleware compute the same
 * value (Buffer.toString("base64") === btoa(...) for ASCII input).
 */
export function adminToken(): string {
  return Buffer.from(`exsell:${adminPassword()}`).toString("base64");
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === adminToken();
}

/** Returns true and sets the session cookie when the password matches. */
export async function signInAdmin(password: string): Promise<boolean> {
  if (password !== adminPassword()) return false;
  const store = await cookies();
  store.set(ADMIN_COOKIE, adminToken(), {
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
