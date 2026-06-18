import { NextResponse } from "next/server";

import { productCatalog } from "@/lib/product-catalog";

type ProductAssetImageRouteProps = {
  params: Promise<{
    code: string;
    file: string[];
  }>;
};

export async function GET(_request: Request, { params }: ProductAssetImageRouteProps) {
  const { code, file } = await params;
  const filename = file.join("/");
  const product = productCatalog.find((item) => item.gimaCode === code || item.id === code);
  const imageAudit = product?.galleryImageAudit?.find((item) => item.localFilePath.endsWith(`/${code}/${filename}`));

  if (!imageAudit?.finalHighResUrl) {
    return NextResponse.json({ error: "Product image not available" }, { status: 404 });
  }

  const response = await fetch(imageAudit.finalHighResUrl, {
    headers: {
      "User-Agent": "ZESCORP product asset proxy",
    },
    next: {
      revalidate: 2_592_000,
    },
  });

  if (!response.ok || !response.body) {
    return NextResponse.json({ error: "Product image source unavailable" }, { status: 502 });
  }

  const contentType = response.headers.get("content-type") || "image/jpeg";

  return new NextResponse(response.body, {
    headers: {
      "Cache-Control": "public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=604800, immutable",
      "Content-Type": contentType,
    },
  });
}
