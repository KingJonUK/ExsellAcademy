import { useLocation, useParams as useWouterParams, useSearch } from "wouter";

/** `next/navigation` useRouter() shim backed by wouter. */
export function useRouter() {
  const [, navigate] = useLocation();
  return {
    push: (href: string) => navigate(href),
    replace: (href: string) => navigate(href, { replace: true }),
    back: () => window.history.back(),
    forward: () => window.history.forward(),
    refresh: () => {},
    prefetch: () => {},
  };
}

export function usePathname(): string {
  const [location] = useLocation();
  return location;
}

export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  return useWouterParams() as T;
}

export function useSearchParams(): URLSearchParams {
  const search = useSearch();
  return new URLSearchParams(search);
}

/**
 * Client-side fallback for any stray server-component `redirect()` call.
 * Auth gating is normally handled by <RequireAuth> in App.tsx, so prefer that.
 */
export function redirect(href: string): never {
  if (typeof window !== "undefined") {
    window.location.assign(href);
  }
  throw new Error("REDIRECT");
}

export function notFound(): never {
  throw new Error("NEXT_NOT_FOUND");
}
