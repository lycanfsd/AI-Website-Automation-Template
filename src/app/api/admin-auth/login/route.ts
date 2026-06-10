import { NextResponse, type NextRequest } from "next/server";
import {
  adminSessionCookieName,
  createAdminSessionToken,
  getAdminCookieOptions,
  getSafeAdminNextPath,
  isAdminPasswordConfigured,
  isAdminPasswordMatch,
} from "@/lib/admin-auth";

type LoginPayload = {
  password?: unknown;
  next?: unknown;
};

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isAdminPasswordConfigured()) {
    return NextResponse.json(
      {
        error:
          "Admin login is not configured. Set ADMIN_PASSWORD in the server environment.",
      },
      { status: 503 },
    );
  }

  let payload: LoginPayload;

  try {
    payload = (await request.json()) as LoginPayload;
  } catch {
    return NextResponse.json(
      { error: "Submit a password to continue." },
      { status: 400 },
    );
  }

  const password = typeof payload.password === "string" ? payload.password : "";

  if (!isAdminPasswordMatch(password)) {
    return NextResponse.json(
      { error: "Incorrect admin password." },
      { status: 401 },
    );
  }

  const nextPath = getSafeAdminNextPath(
    typeof payload.next === "string" ? payload.next : null,
  );
  const response = NextResponse.json({ ok: true, next: nextPath });
  const token = await createAdminSessionToken();

  response.cookies.set(
    adminSessionCookieName,
    token,
    getAdminCookieOptions(),
  );

  return response;
}
