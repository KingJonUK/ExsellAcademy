import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Redirect, useLocation } from "wouter";

/**
 * Client-side password gate that mirrors the original Next.js middleware +
 * cookie-token auth. This is a single-tenant preview app: each role unlocks a
 * fixed seeded persona (learner = Sofia Ahmed, employer = Acme Sales Co).
 * Passwords come from VITE_* env vars, falling back to the original dev
 * defaults so the preview works out of the box.
 */
export type Role = "learner" | "admin" | "employer";

const PASSWORDS: Record<Role, string> = {
  learner: import.meta.env.VITE_LEARNER_PASSWORD || "exsell-learner",
  admin: import.meta.env.VITE_ADMIN_PASSWORD || "exsell-admin",
  employer: import.meta.env.VITE_EMPLOYER_PASSWORD || "exsell-employer",
};

const STORAGE_KEY: Record<Role, string> = {
  learner: "exsell_learner",
  admin: "exsell_admin",
  employer: "exsell_employer",
};

type AuthState = Record<Role, boolean>;

interface AuthContextValue {
  authed: AuthState;
  signIn: (role: Role, password: string) => boolean;
  signOut: (role: Role) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function read(role: Role): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY[role]) === "1";
  } catch {
    return false;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState<AuthState>(() => ({
    learner: read("learner"),
    admin: read("admin"),
    employer: read("employer"),
  }));

  const signIn = (role: Role, password: string): boolean => {
    if (password !== PASSWORDS[role]) return false;
    try {
      localStorage.setItem(STORAGE_KEY[role], "1");
    } catch {
      /* ignore */
    }
    setAuthed((s) => ({ ...s, [role]: true }));
    return true;
  };

  const signOut = (role: Role): void => {
    try {
      localStorage.removeItem(STORAGE_KEY[role]);
    } catch {
      /* ignore */
    }
    setAuthed((s) => ({ ...s, [role]: false }));
  };

  return (
    <AuthContext.Provider value={{ authed, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

/** Route guard: redirects to the role's login page when not authenticated. */
export function RequireAuth({
  role,
  loginPath,
  children,
}: {
  role: Role;
  loginPath: string;
  children: ReactNode;
}) {
  const { authed } = useAuth();
  const [location] = useLocation();
  if (!authed[role]) {
    const next = encodeURIComponent(location || "/");
    return <Redirect to={`${loginPath}?next=${next}`} />;
  }
  return <>{children}</>;
}
