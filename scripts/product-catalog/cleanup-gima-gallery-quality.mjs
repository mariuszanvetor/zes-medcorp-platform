import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PRODUCTS_PATH = path.join(ROOT, "data/product-catalog/products.json");
const REPORT_PATH = path.join(ROOT, "docs/gima-gallery-cleanup-report.md");
const IMAGE_ROOT = path.join(ROOT, "public/product-images");
const GIMA_BASE = "https://www.gimaitaly.com";

const MIN_DISPLAY_WIDTH = 500;
const MIN_DISPLAY_HEIGHT = 350;
const MIN_DISPLAY_AREA = 180000;

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function absoluteGimaUrl(value) {
  if (!value) return "";
  if (value.startsWith("http")) return value;
  if (value.startsWith("/")) return `${GIMA_BASE}${value}`;
  return `${GIMA_BASE}/${value}`;
}

function toHighResUrl(url) {
  return url.replace("/images/prodotti/thumb/", "/images/prodotti/big/").replace("/images/prodotti/medium/", "/images/prodotti/big/");
}

function localPathForUrl(sku, url) {
  const parsed = new URL(url);
  const filename = path.basename(parsed.pathname);
  return {
    absolutePath: path.join(IMAGE_ROOT, sku, filename),
    publicPath: `/product-images/${sku}/${filename}`,
  };
}

function getJpegSizeFromBuffer(buffer) {
  let offset = 2;

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    if (offset + 4 >= buffer.length) break;
    const length = buffer.readUInt16BE(offset + 2);

    if (
      marker >= 0xc0 &&
      marker <= 0xcf &&
      marker !== 0xc4 &&
      marker !== 0xc8 &&
      marker !== 0xcc
    ) {
      return {
        width: buffer.readUInt16BE(offset + 7),
        height: buffer.readUInt16BE(offset + 5),
      };
    }

    offset += 2 + length;
  }

  return null;
}

function getJpegSize(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return getJpegSizeFromBuffer(fs.readFileSync(filePath));
}

function isDisplayQuality({ width, height }) {
  const area = width * height;
  return width >= MIN_DISPLAY_WIDTH && height >= MIN_DISPLAY_HEIGHT && area >= MIN_DISPLAY_AREA;
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "ZESCORP product gallery quality audit; noindex local catalog review",
    },
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.text();
}

async function fetchBuffer(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "ZESCORP product gallery quality audit; noindex local catalog review",
    },
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("image/")) throw new Error(`not image: ${contentType}`);
  return Buffer.from(await response.arrayBuffer());
}

async function imageExists(url) {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      headers: {
        "User-Agent": "ZESCORP product gallery quality audit; noindex local catalog review",
      },
    });
    return response.ok && (response.headers.get("content-type") || "").includes("image/");
  } catch {
    return false;
  }
}

function extractProductImageUrls(html) {
  const imageUrls = [];
  const seen = new Set();
  const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;

  while ((match = regex.exec(html))) {
    const raw = match[1];
    if (!/\/images\/prodotti\/(thumb|medium|big)\//i.test(raw)) continue;
    const absolute = absoluteGimaUrl(raw);
    const highRes = toHighResUrl(absolute);
    const key = highRes.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    imageUrls.push({
      originalExtractedUrl: absolute,
      finalHighResUrl: highRes,
      wasThumbnail: /\/thumb\//i.test(absolute),
    });
  }

  return imageUrls;
}

function getProductPageUrl(product) {
  if (product.productUrl) return product.productUrl;
  const productSource = product.sourceUrls?.find((url) => url.includes("/Prodotti/"));
  if (productSource) return productSource;
  return product.gimaCode ? `${GIMA_BASE}/Prodotti/${product.gimaCode}` : "";
}

const products = readJson(PRODUCTS_PATH);
const reviewedProducts = products.filter(
  (product) => product.publicDisplayReady && product.sourceQuality === "gima_page_parity_review",
);

const productReports = [];
let keptCount = 0;
let removedCount = 0;
let recoveredHighResCount = 0;
let failedHighResCount = 0;

for (const product of reviewedProducts) {
  const sku = product.gimaCode;
  const pageUrl = getProductPageUrl(product);
  const originalLocalGallery = product.galleryImages ?? [];
  const localDir = path.join(IMAGE_ROOT, sku || product.slug);
  fs.mkdirSync(localDir, { recursive: true });

  const auditRows = [];
  let candidates = [];
  let htmlError = "";

  try {
    const html = await fetchText(pageUrl);
    candidates = extractProductImageUrls(html);
  } catch (error) {
    htmlError = error instanceof Error ? error.message : String(error);
  }

  if (!candidates.length) {
    candidates = originalLocalGallery.map((image) => {
      const filename = path.basename(image.url);
      return {
        originalExtractedUrl: image.url,
        finalHighResUrl: `${GIMA_BASE}/images/prodotti/big/${filename}`,
        wasThumbnail: /_./.test(filename),
      };
    });
  }

  const keptImages = [];
  const removedImages = [];
  const seenPublicPaths = new Set();

  for (const candidate of candidates) {
    const highResAvailable = await imageExists(candidate.finalHighResUrl);
    const finalUrl = highResAvailable ? candidate.finalHighResUrl : candidate.originalExtractedUrl;
    const { absolutePath, publicPath } = localPathForUrl(sku || product.slug, finalUrl);
    let status = "kept";
    let width = 0;
    let height = 0;
    let bytes = 0;
    let reason = "";

    try {
      const buffer = await fetchBuffer(finalUrl);
      const size = getJpegSizeFromBuffer(buffer);
      width = size?.width ?? 0;
      height = size?.height ?? 0;
      bytes = buffer.length;

      if (!size || !isDisplayQuality({ width, height })) {
        status = "removed";
        reason = "nu exista o versiune high-resolution potrivita pentru afisarea publica";
        removedImages.push({ ...candidate, localFilePath: publicPath, width, height, bytes, reason });
      } else {
        fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
        fs.writeFileSync(absolutePath, buffer);
        const galleryImage = {
          url: publicPath,
          alt: product.imageAlt || product.romanianTitle || product.sourceProductName,
          verified: true,
        };
        if (!seenPublicPaths.has(galleryImage.url)) {
          seenPublicPaths.add(galleryImage.url);
          keptImages.push(galleryImage);
          keptCount += 1;
          if (highResAvailable) recoveredHighResCount += 1;
        }
      }
    } catch (error) {
      status = "removed";
      reason = error instanceof Error ? error.message : String(error);
      failedHighResCount += 1;
      removedImages.push({ ...candidate, localFilePath: publicPath, width, height, bytes, reason });
    }

    auditRows.push({
      originalExtractedUrl: candidate.originalExtractedUrl,
      finalHighResUrl: candidate.finalHighResUrl,
      localFilePath: publicPath,
      width,
      height,
      bytes,
      sourceSize: candidate.wasThumbnail ? "thumbnail" : "full-size/listing",
      status,
      reason,
    });
  }

  if (!keptImages.length && product.imageUrl) {
    const fallbackPath = path.join(ROOT, "public", product.imageUrl.replace(/^\//, ""));
    const fallbackSize = getJpegSize(fallbackPath);
    if (fallbackSize && isDisplayQuality(fallbackSize)) {
      keptImages.push({
        url: product.imageUrl,
        alt: product.imageAlt || product.romanianTitle || product.sourceProductName,
        verified: true,
      });
      keptCount += 1;
    }
  }

  const sortedKept = keptImages
    .map((image) => {
      const localPath = path.join(ROOT, "public", image.url.replace(/^\//, ""));
      const size = getJpegSize(localPath) ?? { width: 0, height: 0 };
      return {
        ...image,
        width: size.width,
        height: size.height,
        area: size.width * size.height,
      };
    })
    .sort((a, b) => b.area - a.area)
    .map(({ width, height, area, ...image }) => image);

  removedCount += removedImages.length;

  if (sortedKept.length) {
    product.galleryImages = sortedKept;
    product.imageUrl = sortedKept[0].url;
    product.imageAlt = sortedKept[0].alt;
    product.imageVerified = true;
    product.imageStatus = "verified_local";
  } else {
    product.galleryImages = [];
    product.imageVerified = false;
    product.imageStatus = "missing";
  }

  product.galleryImageAudit = auditRows;

  productReports.push({
    slug: product.slug,
    title: product.romanianTitle || product.sourceProductName,
    pageUrl,
    htmlError,
    keptImages: sortedKept,
    removedImages,
    auditRows,
  });
}

writeJson(PRODUCTS_PATH, products);

const productsWithOneGoodImage = productReports.filter((item) => item.keptImages.length === 1);
const productsWithGallery = productReports.filter((item) => item.keptImages.length > 1);
const productsWithoutGoodImage = productReports.filter((item) => !item.keptImages.length);
const removedRows = productReports.flatMap((item) =>
  item.removedImages.map((image) => ({
    slug: item.slug,
    url: image.originalExtractedUrl,
    finalUrl: image.finalHighResUrl,
    localFilePath: image.localFilePath,
    size: `${image.width}x${image.height}`,
    reason: image.reason || "imagine eliminata",
  })),
);

const auditRows = productReports.flatMap((item) =>
  item.auditRows.map((image) => ({
    slug: item.slug,
    originalExtractedUrl: image.originalExtractedUrl,
    finalHighResUrl: image.finalHighResUrl,
    localFilePath: image.localFilePath,
    resolution: `${image.width}x${image.height}`,
    bytes: image.bytes,
    sourceSize: image.sourceSize,
    status: image.status,
  })),
);

const report = [
  "# GIMA Product Gallery High-Resolution Cleanup Report",
  "",
  "Phase: Product-GIMA-UX-CLEANUP-01 correction",
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Summary",
  "",
  `- Reviewed products audited: ${reviewedProducts.length}`,
  `- Public high-resolution gallery images kept: ${keptCount}`,
  `- High-resolution images recovered/downloaded from GIMA big image paths: ${recoveredHighResCount}`,
  `- Images removed because no suitable high-resolution version was available: ${removedCount}`,
  `- Failed high-resolution downloads: ${failedHighResCount}`,
  `- Products with multi-image high-resolution gallery: ${productsWithGallery.length}`,
  `- Products with one good display image: ${productsWithOneGoodImage.length}`,
  `- Products without a usable local image: ${productsWithoutGoodImage.length}`,
  `- Display threshold: minimum ${MIN_DISPLAY_WIDTH}x${MIN_DISPLAY_HEIGHT}px and ${MIN_DISPLAY_AREA} px area`,
  "",
  "## Products With Multi-Image Gallery",
  "",
  productsWithGallery.length
    ? productsWithGallery.map((item) => `- ${item.slug}: ${item.keptImages.length} imagini`).join("\n")
    : "None.",
  "",
  "## Products With One Good Image",
  "",
  productsWithOneGoodImage.length
    ? productsWithOneGoodImage.map((item) => `- ${item.slug}: ${item.keptImages[0].url}`).join("\n")
    : "None.",
  "",
  "## Image Audit Fields",
  "",
  "| Product | Original extracted URL | Final high-res URL | Local file | Resolution | Bytes | Source size | Status |",
  "| --- | --- | --- | --- | --- | ---: | --- | --- |",
  ...auditRows.map(
    (item) =>
      `| ${item.slug} | ${item.originalExtractedUrl} | ${item.finalHighResUrl} | ${item.localFilePath} | ${item.resolution} | ${item.bytes} | ${item.sourceSize} | ${item.status} |`,
  ),
  "",
  "## Removed Images",
  "",
  removedRows.length
    ? "| Product | Original URL | Attempted high-res URL | Local path | Size | Reason |\n| --- | --- | --- | --- | --- | --- |\n" +
      removedRows
        .map((item) => `| ${item.slug} | ${item.url} | ${item.finalUrl} | ${item.localFilePath} | ${item.size} | ${item.reason} |`)
        .join("\n")
    : "No images were removed.",
  "",
  "## Products Without Usable Images",
  "",
  productsWithoutGoodImage.length
    ? productsWithoutGoodImage.map((item) => `- ${item.slug}`).join("\n")
    : "None.",
  "",
  "## Notes",
  "",
  "- The extractor now converts GIMA thumbnail/medium product image URLs to `/images/prodotti/big/` before downloading.",
  "- Thumbnails are allowed only as UI thumbnails generated by Next/Image from the high-resolution local file; the main carousel image uses local high-resolution files.",
  "- Imported products remain noindex and excluded from the sitemap.",
  "",
].join("\n");

fs.writeFileSync(REPORT_PATH, report);

console.log(
  JSON.stringify(
    {
      reviewedProducts: reviewedProducts.length,
      keptImages: keptCount,
      recoveredHighResImages: recoveredHighResCount,
      removedImages: removedCount,
      productsWithGallery: productsWithGallery.length,
      productsWithOneGoodImage: productsWithOneGoodImage.length,
      productsWithoutGoodImage: productsWithoutGoodImage.length,
      reportPath: REPORT_PATH,
    },
    null,
    2,
  ),
);
