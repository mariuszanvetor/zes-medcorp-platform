import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_ACCESS_COOKIE,
  createAdminAccessToken,
  getAdminAccessStatus,
  verifyAdminPassword,
} from "@/lib/admin-access";

export const runtime = "nodejs";

type AttemptState = {
  count: number;
  resetAt: number;
};

const maxAttempts = 6;
const windowMs = 5 * 60 * 1000;
const attempts = new Map<string, AttemptState>();

export async function POST(request: NextRequest) {
  const status = getAdminAccessStatus();

  if (!status.enabled) {
    return NextResponse.json({
      success: true,
      accessRequired: false,
      mode: status.mode,
    });
  }

  if (!status.passwordConfigured) {
    return NextResponse.json(
      {
        success: false,
        accessRequired: true,
        error: "admin-access-not-configured",
      },
      { status: 503 },
    );
  }

  const clientKey = getClientKey(request);
  const limit = getRateLimitState(clientKey);

  if (!limit.allowed) {
    return NextResponse.json(
      {
        success: false,
        accessRequired: true,
        error: "rate-limited",
        retryAfterSeconds: limit.retryAfterSeconds,
      },
      {
        headers: {
          "Retry-After": String(limit.retryAfterSeconds),
        },
        status: 429,
      },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | Record<string, unknown>
    | null;
  const password = typeof body?.password === "string" ? body.password : "";

  if (!password) {
    recordFailedAttempt(clientKey);

    return NextResponse.json(
      {
        success: false,
        accessRequired: true,
        error: "invalid-password",
      },
      { status: 401 },
    );
  }

  if (!verifyAdminPassword(password)) {
    recordFailedAttempt(clientKey);

    return NextResponse.json(
      {
        success: false,
        accessRequired: true,
        error: "invalid-password",
      },
      { status: 401 },
    );
  }

  attempts.delete(clientKey);

  const response = NextResponse.json({
    success: true,
    accessRequired: true,
    mode: status.mode,
  });

  response.cookies.set({
    httpOnly: true,
    maxAge: status.sessionMaxAgeSeconds,
    name: ADMIN_ACCESS_COOKIE,
    path: "/admin",
    sameSite: "lax",
    secure: shouldUseSecureCookie(request),
    value: createAdminAccessToken(),
  });

  return response;
}

function getRateLimitState(clientKey: string) {
  const now = Date.now();
  const state = attempts.get(clientKey);

  if (!state || state.resetAt <= now) {
    attempts.set(clientKey, {
      count: 0,
      resetAt: now + windowMs,
    });

    return {
      allowed: true,
      retryAfterSeconds: 0,
    };
  }

  if (state.count >= maxAttempts) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((state.resetAt - now) / 1000),
    };
  }

  return {
    allowed: true,
    retryAfterSeconds: 0,
  };
}

function recordFailedAttempt(clientKey: string) {
  const now = Date.now();
  const state = attempts.get(clientKey);

  if (!state || state.resetAt <= now) {
    attempts.set(clientKey, {
      count: 1,
      resetAt: now + windowMs,
    });

    return;
  }

  attempts.set(clientKey, {
    ...state,
    count: state.count + 1,
  });
}

function getClientKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim();

  return ip || request.headers.get("x-real-ip") || "admin-access-local";
}

function shouldUseSecureCookie(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const isLocalhost =
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1") ||
    host.startsWith("[::1]");

  return process.env.NODE_ENV === "production" && !isLocalhost;
}
