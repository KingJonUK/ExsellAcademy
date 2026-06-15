import { NextResponse, type NextRequest } from "next/server";

const ADMIN_COOKIE = "exsell_admin";

// Mirror of adminToken() in src/lib/admin-auth.ts. btoa(...) === Buffer base64
// for ASCII, so the value set by the server action matches here in edge.
function expectedToken(): string {
  const pw = process.env.ADMIN_PASSWORD ?? "exsell-admin";
  return btoa(`exsell:${pw}`);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const authed = req.cookies.get(ADMIN_COOKIE)?.value === expectedToken();

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
