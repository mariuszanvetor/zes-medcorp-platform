import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

import { productCatalog } from "@/lib/product-catalog";
import { checkServerRateLimit, rateLimitHeaders } from "@/lib/server-rate-limit";

type ProductAssetImageRouteProps = {
  params: Promise<{
    code: string;
    file: string[];
  }>;
};

export async function GET(request: Request, { params }: ProductAssetImageRouteProps) {
  const rateLimit = checkServerRateLimit(request, {
    keyPrefix: "product-image-assets",
    limit: 240,
    windowSeconds: 300,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many product image requests" },
      {
        status: 429,
        headers: rateLimitHeaders(rateLimit),
      },
    );
  }

  const { code, file } = await params;
  const filename = file.join("/");
  const product = productCatalog.find((item) => item.gimaCode === code || item.id === code);
  const imageAudit = product?.galleryImageAudit?.find((item) => item.localFilePath.endsWith(`/${code}/${filename}`));

  if (!imageAudit?.finalHighResUrl) {
    return NextResponse.json({ error: "Product image not available" }, { status: 404 });
  }

  const localPath = path.join(process.cwd(), "data", "product-assets-local", "product-images", code, filename);
  if (fs.existsSync(localPath)) {
    const bytes = fs.readFileSync(localPath);
    return new NextResponse(bytes, {
      headers: {
        "Cache-Control": "public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=604800, immutable",
        "Content-Type": getImageContentType(filename),
        ...rateLimitHeaders(rateLimit),
      },
    });
  }

  const response = await fetch(imageAudit.finalHighResUrl, {
    headers: {
      "User-Agent": "ZESCORP product asset proxy",
    },
    cache: "no-store",
  });

  if (!response.ok || !response.body) {
    return NextResponse.json({ error: "Product image source unavailable" }, { status: 502 });
  }

  const contentType = response.headers.get("content-type") || "image/jpeg";

  return new NextResponse(response.body, {
    headers: {
      "Cache-Control": "public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=604800, immutable",
      "Content-Type": contentType,
      ...rateLimitHeaders(rateLimit),
    },
  });
}

function getImageContentType(filename: string) {
  const extension = path.extname(filename).toLowerCase();
  if (extension === ".png") return "image/png";
  if (extension === ".webp") return "image/webp";
  if (extension === ".gif") return "image/gif";
  return "image/jpeg";
}
