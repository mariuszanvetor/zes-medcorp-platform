import { NextResponse } from "next/server";

import {
  generateZESGuideResponse,
  type ZESGuideApiRequest,
} from "@/lib/zes-ai";
import { checkServerRateLimit, rateLimitHeaders } from "@/lib/server-rate-limit";

export async function POST(request: Request) {
  const rateLimit = checkServerRateLimit(request, {
    keyPrefix: "zes-guide",
    limit: 24,
    windowSeconds: 300,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "Prea multe solicitari intr-un interval scurt. Va rugam sa reveniti in cateva minute.",
      },
      {
        status: 429,
        headers: rateLimitHeaders(rateLimit),
      },
    );
  }

  let payload: ZESGuideApiRequest;

  try {
    payload = (await request.json()) as ZESGuideApiRequest;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  if (!payload?.message || typeof payload.message !== "string" || !payload.message.trim()) {
    return NextResponse.json(
      { ok: false, error: "Message is required." },
      { status: 422 },
    );
  }

  const response = await generateZESGuideResponse({
    message: payload.message.trim(),
    state: payload.state ?? null,
    history: Array.isArray(payload.history) ? payload.history.slice(-8) : [],
    fileAnalyses: Array.isArray(payload.fileAnalyses)
      ? payload.fileAnalyses.slice(0, 3)
      : [],
  });

  return NextResponse.json(response, {
    headers: {
      ...rateLimitHeaders(rateLimit),
      "Cache-Control": "no-store",
    },
  });
}
