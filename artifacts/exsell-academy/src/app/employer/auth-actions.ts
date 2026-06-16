/**
 * Client-side employer auth helpers. The actual sign-in/out is performed via
 * `useAuth()` in the login page / layout; these remain as thin helpers for any
 * callers expecting the original module shape.
 */
export function safeEmployerNext(next: string | null | undefined): string {
  const value = next ?? "/employer";
  return value.startsWith("/employer") ? value : "/employer";
}
