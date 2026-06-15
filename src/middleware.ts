import { NextResponse, type NextRequest } from "next/server";

const ADMIN_COOKIE = "exsell_admin";

// Mirror of adminToken() in src/lib/admin-auth.ts. btoa(...) === Buffer base64
// for ASCII. Returns null when admin must fail closed (production without
// ADMIN_PASSWORD), so no cookie value can grant access.
function expectedToken(): string | null {
  const configured = process.env.ADMIN_PASSWORD;
  const password =
    configured && configured.length > 0
      ? configured
      : process.env.NODE_ENV === "production"
        ? null
        : "exsell-admin";
  if (!password) return null;
  return btoa(`exsell:${password}`);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const token = expectedToken();
  const authed =
    token !== null && req.cookies.get(ADMIN_COOKIE)?.value === token;

  if (!authed && !isLoginPage) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = pathname === "/admin" ? "" : `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  if (authed && isLoginPage) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
