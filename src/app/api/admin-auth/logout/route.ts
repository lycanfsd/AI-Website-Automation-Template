import { NextResponse, type NextRequest } from "next/server";
import {
  adminSessionCookieName,
  getClearedAdminCookieOptions,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/admin-login", request.url), {
    status: 303,
  });

  response.cookies.set(
    adminSessionCookieName,
    "",
    getClearedAdminCookieOptions(),
  );

  return response;
}
