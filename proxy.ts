import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, decrypt } from "@/app/lib/session-crypto";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin-login";
  const isAdminRoot = pathname === "/admin";
  const isProtectedAdmin =
    pathname.startsWith("/admin/") || isAdminRoot;

  if (!isLogin && !isProtectedAdmin) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = await decrypt(token);
  const isAuthenticated =
    Boolean(session?.userId) && session?.role === "super_admin";

  if (isProtectedAdmin && !isAuthenticated) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }

  if (isLogin && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (isAdminRoot && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/admin-login"],
};
