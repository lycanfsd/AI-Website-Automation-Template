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

const loginWindowMs = 10 * 60 * 1000;
const loginLockoutMs = 10 * 60 * 1000;
const maxLoginFailures = 5;

type LoginAttempt = {
  count: number;
  firstAttemptAt: number;
  lockedUntil?: number;
};

const loginAttempts = new Map<string, LoginAttempt>();

function getLoginAttemptKey(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function getLoginAttempt(key: string) {
  const now = Date.now();
  const attempt = loginAttempts.get(key);

  if (!attempt || now - attempt.firstAttemptAt > loginWindowMs) {
    const freshAttempt: LoginAttempt = { count: 0, firstAttemptAt: now };
    loginAttempts.set(key, freshAttempt);
    return freshAttempt;
  }

  return attempt;
}

function isLoginLocked(key: string) {
  const attempt = getLoginAttempt(key);

  return Boolean(attempt.lockedUntil && attempt.lockedUntil > Date.now());
}

function recordFailedLogin(key: string) {
  const attempt = getLoginAttempt(key);
  attempt.count += 1;

  if (attempt.count >= maxLoginFailures) {
    attempt.lockedUntil = Date.now() + loginLockoutMs;
  }

  loginAttempts.set(key, attempt);
}

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

  const loginAttemptKey = getLoginAttemptKey(request);

  if (isLoginLocked(loginAttemptKey)) {
    return NextResponse.json(
      { error: "Too many login attempts. Wait a few minutes and try again." },
      { status: 429 },
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
    recordFailedLogin(loginAttemptKey);

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

  loginAttempts.delete(loginAttemptKey);

  response.cookies.set(
    adminSessionCookieName,
    token,
    getAdminCookieOptions(),
  );

  return response;
}
