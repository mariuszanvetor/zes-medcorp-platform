import { NextResponse } from "next/server";

import { analyzeZESFile } from "@/lib/zes-file-analysis";

export async function POST(request: Request) {
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

  return NextResponse.json(result);
}
