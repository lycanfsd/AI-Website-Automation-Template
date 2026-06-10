import { NextResponse, type NextRequest } from "next/server";
import {
  adminSessionCookieName,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";

const protectedPagePrefixes = [
  "/dashboard",
  "/review-generator",
  "/follow-up-generator",
  "/settings",
  "/admin/leads",
  "/tools/review-response",
  "/tools/lead-follow-up",
];

const protectedApiPaths = [
  "/api/admin",
  "/api/review-response",
  "/api/lead-follow-up",
];

function isProtectedPage(pathname: string) {
  return protectedPagePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function isProtectedApi(pathname: string) {
  return protectedApiPaths.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const protectedApi = isProtectedApi(pathname);

  if (!isProtectedPage(pathname) && !protectedApi) {
    return NextResponse.next();
  }

  const isAuthenticated = await verifyAdminSessionToken(
    request.cookies.get(adminSessionCookieName)?.value,
  );

  if (isAuthenticated) {
    return NextResponse.next();
  }

  if (protectedApi) {
    return NextResponse.json(
      { error: "Admin authentication is required." },
      { status: 401 },
    );
  }

  const loginUrl = new URL("/admin-login", request.url);
  loginUrl.searchParams.set(
    "next",
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/review-generator/:path*",
    "/follow-up-generator/:path*",
    "/settings/:path*",
    "/admin/leads/:path*",
    "/tools/review-response/:path*",
    "/tools/lead-follow-up/:path*",
    "/api/admin/:path*",
    "/api/review-response/:path*",
    "/api/lead-follow-up/:path*",
  ],
};
