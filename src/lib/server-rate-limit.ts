import { createHash } from "node:crypto";

export type ServerRateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function checkServerRateLimit(
  request: Request,
  options: {
    keyPrefix: string;
    limit: number;
    windowSeconds: number;
  },
): ServerRateLimitResult {
  const now = Date.now();
  const windowMs = options.windowSeconds * 1000;
  const key = `${options.keyPrefix}:${createClientFingerprint(request)}`;
  const existing = buckets.get(key);

  purgeExpiredBuckets(now);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      allowed: true,
      limit: options.limit,
      remaining: Math.max(0, options.limit - 1),
      resetSeconds: options.windowSeconds,
    };
  }

  if (existing.count >= options.limit) {
    return {
      allowed: false,
      limit: options.limit,
      remaining: 0,
      resetSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;

  return {
    allowed: true,
    limit: options.limit,
    remaining: Math.max(0, options.limit - existing.count),
    resetSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

export function rateLimitHeaders(result: ServerRateLimitResult) {
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(result.resetSeconds),
    ...(result.allowed ? {} : { "Retry-After": String(result.resetSeconds) }),
  };
}

function createClientFingerprint(request: Request) {
  const headers = request.headers;
  const forwardedFor = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = headers.get("x-real-ip")?.trim();
  const vercelIp = headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  const userAgent = headers.get("user-agent")?.slice(0, 120) ?? "unknown-agent";
  const client = forwardedFor || vercelIp || realIp || "unknown-ip";

  return createHash("sha256").update(`${client}|${userAgent}`).digest("hex");
}

function purgeExpiredBuckets(now: number) {
  if (buckets.size < 5_000) return;

  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}
