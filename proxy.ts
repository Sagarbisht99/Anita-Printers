import { NextRequest, NextResponse } from "next/server";
import { applySecurityHeaders } from "@/app/lib/security/headers";
import { COOKIE_NAME, decrypt } from "@/app/lib/session-crypto";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";
  const isAdminRoot = pathname === "/admin";
  const isProtectedAdmin =
    (pathname.startsWith("/admin/") || isAdminRoot) && !isLogin;

  let response: NextResponse;

  if (!isLogin && !isProtectedAdmin) {
    response = NextResponse.next();
  } else {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const session = await decrypt(token);
    const isAuthenticated =
      Boolean(session?.userId) && session?.role === "super_admin";

    if (isProtectedAdmin && !isAuthenticated) {
      response = NextResponse.redirect(new URL("/admin/login", request.url));
    } else if (isLogin && isAuthenticated) {
      response = NextResponse.redirect(
        new URL("/admin/dashboard", request.url),
      );
    } else if (isAdminRoot && isAuthenticated) {
      response = NextResponse.redirect(
        new URL("/admin/dashboard", request.url),
      );
    } else {
      response = NextResponse.next();
    }
  }

  applySecurityHeaders(response);

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    response.headers.set("Cache-Control", "no-store, max-age=0");
  }

  if (pathname.startsWith("/api/")) {
    response.headers.set("Cache-Control", "no-store, max-age=0");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico)$).*)"],
};
