import { NextResponse, type NextRequest } from "next/server";

// Mirrors of adminToken()/employerToken(). btoa(...) === Buffer base64 for
// ASCII, so values match those set by the server actions. A null token means
// fail closed (production with the password env var unset).
function tokenFor(prefix: string, envValue: string | undefined, devDefault: string): string | null {
  const password =
    envValue && envValue.length > 0
      ? envValue
      : process.env.NODE_ENV === "production"
        ? null
        : devDefault;
  if (!password) return null;
  return btoa(`${prefix}:${password}`);
}

type Gate = { cookie: string; token: string | null; login: string; home: string };

function gateFor(pathname: string): Gate {
  if (pathname.startsWith("/employer")) {
    return {
      cookie: "exsell_employer",
      token: tokenFor("exsell-employer", process.env.EMPLOYER_PASSWORD, "exsell-employer"),
      login: "/employer/login",
      home: "/employer",
    };
  }
  return {
    cookie: "exsell_admin",
    token: tokenFor("exsell", process.env.ADMIN_PASSWORD, "exsell-admin"),
    login: "/admin/login",
    home: "/admin",
  };
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const gate = gateFor(pathname);
  const isLoginPage = pathname === gate.login;
  const authed =
    gate.token !== null && req.cookies.get(gate.cookie)?.value === gate.token;

  if (!authed && !isLoginPage) {
    const url = req.nextUrl.clone();
    url.pathname = gate.login;
    url.search = pathname === gate.home ? "" : `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  if (authed && isLoginPage) {
    const url = req.nextUrl.clone();
    url.pathname = gate.home;
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/employer", "/employer/:path*"],
};
