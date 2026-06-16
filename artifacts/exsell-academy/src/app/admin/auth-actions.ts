/**
 * Client-side admin auth helpers. The original Next.js server actions
 * (cookie-based sign in/out) are replaced by the shared client password gate
 * in `@/lib/auth` (useAuth). The login page and dashboard layout call
 * `useAuth().signIn("admin", password)` / `signOut("admin")` directly, so
 * these exports remain only for compatibility and are simple no-ops.
 */
export function loginAction(): void {
  /* handled by useAuth().signIn in the login page */
}

export function logoutAction(): void {
  /* handled by useAuth().signOut in the dashboard layout */
}
