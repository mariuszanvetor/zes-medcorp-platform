import { NextResponse } from "next/server";

import { productCatalog } from "@/lib/product-catalog";
import { checkServerRateLimit, rateLimitHeaders } from "@/lib/server-rate-limit";

type ProductAssetDocumentRouteProps = {
  params: Promise<{
    code: string;
    file: string[];
  }>;
};

export async function GET(request: Request, { params }: ProductAssetDocumentRouteProps) {
  const rateLimit = checkServerRateLimit(request, {
    keyPrefix: "product-document-assets",
    limit: 120,
    windowSeconds: 300,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many product document requests" },
      {
        status: 429,
        headers: rateLimitHeaders(rateLimit),
      },
    );
  }

  const { code, file } = await params;
  const publicUrl = `/api/product-assets/documents/${code}/${file.join("/")}`;
  const product = productCatalog.find((item) => item.gimaCode === code || item.id === code);
  const documentAsset = product?.documentAssetAudit?.find((item) => item.publicUrl === publicUrl);

  if (!documentAsset?.sourceUrl || documentAsset.status !== "available") {
    return NextResponse.json({ error: "Product document not available" }, { status: 404 });
  }

  const sourceUrl = new URL(documentAsset.sourceUrl);

  if (sourceUrl.hostname !== "www.gimaitaly.com") {
    return NextResponse.json({ error: "Product document source not allowed" }, { status: 403 });
  }

  const response = await fetch(sourceUrl, {
    headers: {
      "User-Agent": "ZESCORP product document proxy",
    },
    cache: "no-store",
  });

  if (!response.ok || !response.body) {
    return NextResponse.json({ error: "Product document source unavailable" }, { status: 502 });
  }

  const filename = file.at(-1) || "document-produs.pdf";

  return new NextResponse(response.body, {
    headers: {
      "Cache-Control": "public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=604800, immutable",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Content-Type": response.headers.get("content-type") || "application/pdf",
      ...rateLimitHeaders(rateLimit),
    },
  });
}
