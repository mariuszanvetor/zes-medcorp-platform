import { NextResponse } from "next/server";

import {
  generateZESGuideResponse,
  type ZESGuideApiRequest,
} from "@/lib/zes-ai";

export async function POST(request: Request) {
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
  });

  return NextResponse.json(response);
}
