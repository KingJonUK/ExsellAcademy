/**
 * No-op `next/headers` shim for any stray imports. Real auth/session state
 * lives in src/lib/auth.tsx (client-side). These should not be used.
 */
export async function cookies() {
  return {
    get: (_name: string) => undefined as { value: string } | undefined,
    set: (_name: string, _value: string, _opts?: unknown) => {},
    delete: (_name: string) => {},
  };
}

export async function headers() {
  return new Headers();
}
