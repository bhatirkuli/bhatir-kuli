import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { ROLES } from "@/constants/roles";

/**
 * Route protection table. Each entry's `roles` list is who may access any
 * path starting with `prefix`. This is checked BEFORE the request reaches
 * any page or API route handler.
 *
 * Note: this is one layer of defense, not the only one. Every sensitive API
 * route also calls requireRole() from lib/apiAuth.js internally — so
 * authorization still holds even if a route were ever reachable through a
 * path this table doesn't cover.
 */
const PROTECTED_ROUTES = [
  { prefix: "/admin", roles: [ROLES.ADMIN] },
  { prefix: "/api/admin", roles: [ROLES.ADMIN] },
  { prefix: "/moderator", roles: [ROLES.ADMIN, ROLES.MODERATOR] },
  { prefix: "/api/moderator", roles: [ROLES.ADMIN, ROLES.MODERATOR] },
  { prefix: "/dashboard", roles: [ROLES.ADMIN, ROLES.MODERATOR, ROLES.CUSTOMER] },
  { prefix: "/api/dashboard", roles: [ROLES.ADMIN, ROLES.MODERATOR, ROLES.CUSTOMER] },
];

export async function proxy(req) {
  const { pathname } = req.nextUrl;
  const isApiRoute = pathname.startsWith("/api/");

  const matched = PROTECTED_ROUTES.find((route) => pathname.startsWith(route.prefix));
  if (!matched) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Not signed in at all
  if (!token) {
    if (isApiRoute) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Signed in, but wrong role for this route
  if (!matched.roles.includes(token.role)) {
    if (isApiRoute) {
      return NextResponse.json(
        { success: false, message: "You do not have permission to access this resource" },
        { status: 403 }
      );
    }
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/moderator/:path*",
    "/dashboard/:path*",
    "/api/admin/:path*",
    "/api/moderator/:path*",
    "/api/dashboard/:path*",
  ],
};