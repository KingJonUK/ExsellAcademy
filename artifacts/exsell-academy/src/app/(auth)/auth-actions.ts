/**
 * Client-side auth helpers for the learner area. The real sign-in/out is now
 * handled by `useAuth()` in the login page + layout; these helpers remain as
 * thin utilities so existing imports keep working.
 */
export function safeNextPath(next?: string | null): string {
  const value = (next ?? "").trim();
  return value.startsWith("/") && !value.startsWith("//") ? value : "/dashboard";
}
