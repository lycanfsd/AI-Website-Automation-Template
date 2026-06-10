const encoder = new TextEncoder();

export const adminSessionCookieName = "clientflow_admin_session";
export const adminSessionMaxAgeSeconds = 60 * 60 * 8;

type AdminSessionPayload = {
  role: "admin";
  exp: number;
  iat: number;
  version: 1;
};

function getAdminSessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    process.env.ADMIN_PASSWORD?.trim() ||
    ""
  );
}

export function isAdminPasswordConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD?.trim());
}

export function isAdminPasswordMatch(password: string) {
  const configuredPassword = process.env.ADMIN_PASSWORD?.trim();

  if (!configuredPassword || !password) {
    return false;
  }

  return constantTimeEqual(password, configuredPassword);
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    maxAge: adminSessionMaxAgeSeconds,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}

export function getClearedAdminCookieOptions() {
  return {
    ...getAdminCookieOptions(),
    maxAge: 0,
  };
}

export function getSafeAdminNextPath(nextPath: string | null | undefined) {
  if (!nextPath || !nextPath.startsWith("/") || nextPath.startsWith("//")) {
    return "/dashboard";
  }

  return nextPath;
}

function base64UrlEncode(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/u, "");
}

function base64UrlDecodeText(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "=",
  );
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) {
    return false;
  }

  let mismatch = 0;
  for (let index = 0; index < a.length; index += 1) {
    mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return mismatch === 0;
}

async function signTokenPayload(payload: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload),
  );

  return base64UrlEncode(new Uint8Array(signature));
}

export async function createAdminSessionToken() {
  const secret = getAdminSessionSecret();

  if (!secret) {
    throw new Error("Admin auth is not configured.");
  }

  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = {
    role: "admin",
    iat: now,
    exp: now + adminSessionMaxAgeSeconds,
    version: 1,
  };
  const encodedPayload = base64UrlEncode(
    encoder.encode(JSON.stringify(payload)),
  );
  const signature = await signTokenPayload(encodedPayload, secret);

  return `${encodedPayload}.${signature}`;
}

export async function verifyAdminSessionToken(token: string | undefined) {
  const secret = getAdminSessionSecret();

  if (!token || !secret) {
    return false;
  }

  const [encodedPayload, receivedSignature] = token.split(".");

  if (!encodedPayload || !receivedSignature) {
    return false;
  }

  const expectedSignature = await signTokenPayload(encodedPayload, secret);

  if (!constantTimeEqual(receivedSignature, expectedSignature)) {
    return false;
  }

  try {
    const payload = JSON.parse(
      base64UrlDecodeText(encodedPayload),
    ) as Partial<AdminSessionPayload>;

    return (
      payload.role === "admin" &&
      payload.version === 1 &&
      typeof payload.exp === "number" &&
      payload.exp > Math.floor(Date.now() / 1000)
    );
  } catch {
    return false;
  }
}
