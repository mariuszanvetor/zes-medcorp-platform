import { NextResponse } from "next/server";

import { checkServerRateLimit, rateLimitHeaders } from "@/lib/server-rate-limit";
import { analyzeZESFile } from "@/lib/zes-file-analysis";

export async function POST(request: Request) {
  const rateLimit = checkServerRateLimit(request, {
    keyPrefix: "zes-file-analysis",
    limit: 8,
    windowSeconds: 300,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "Prea multe fisiere trimise intr-un interval scurt. Va rugam sa incercati mai tarziu.",
      },
      {
        status: 429,
        headers: rateLimitHeaders(rateLimit),
      },
    );
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid multipart form data." },
      { status: 400 },
    );
  }

  const fileValue = formData.get("file");
  const userMessageValue = formData.get("message");

  if (!(fileValue instanceof File)) {
    return NextResponse.json(
      { ok: false, error: "Fisierul lipseste." },
      { status: 422 },
    );
  }

  let result;
  try {
    result = await analyzeZESFile({
      file: fileValue,
      userMessage: typeof userMessageValue === "string" ? userMessageValue : "",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Fisierul nu a putut fi analizat.",
      },
      { status: 422 },
    );
  }

  return NextResponse.json(result, {
    headers: {
      ...rateLimitHeaders(rateLimit),
      "Cache-Control": "no-store",
    },
  });
}
