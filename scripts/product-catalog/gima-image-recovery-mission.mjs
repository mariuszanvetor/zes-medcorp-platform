import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const imageRoot = path.join(root, "public", "product-images");
const reportPath = path.join(root, "docs", "gima-image-recovery-mission.md");
const gimaBase = "https://www.gimaitaly.com";

const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
const gimaProducts = products.filter((product) => product.source === "gima-public-catalog");

const MIN_WIDTH = 220;
const MIN_HEIGHT = 160;
const MIN_BYTES = 4000;

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function hasBrokenLocalAsset(url) {
  if (!url || !url.startsWith("/")) return true;
  return !fs.existsSync(path.join(root, "public", url.replace(/^\//, "")));
}

function imageMissing(product) {
  return !product.imageUrl || !product.imageVerified || product.imageStatus !== "verified_local" || hasBrokenLocalAsset(product.imageUrl);
}

function categoryCounts(items) {
  const counts = {};
  for (const product of items) counts[product.category] = (counts[product.category] || 0) + 1;
  return counts;
}

function absoluteGimaUrl(value) {
  if (!value) return "";
  if (value.startsWith("http")) return value;
  if (value.startsWith("/")) return `${gimaBase}${value}`;
  return `${gimaBase}/${value}`;
}

function toHighResUrl(url) {
  return url.replace("/images/prodotti/thumb/", "/images/prodotti/big/").replace("/images/prodotti/medium/", "/images/prodotti/big/");
}

function getJpegSize(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset++;
      continue;
    }
    const marker = buffer[offset + 1];
    if (offset + 4 >= buffer.length) break;
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5), type: "jpeg" };
    }
    offset += 2 + length;
  }
  return null;
}

function getPngSize(buffer) {
  if (buffer.length < 24) return null;
  if (buffer.slice(0, 8).toString("hex") !== "89504e470d0a1a0a") return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20), type: "png" };
}

function imageSize(buffer) {
  return getJpegSize(buffer) || getPngSize(buffer) || null;
}

function isGoodImage(buffer, size) {
  if (!size) return false;
  if (buffer.length < MIN_BYTES) return false;
  if (size.width < MIN_WIDTH || size.height < MIN_HEIGHT) return false;
  return true;
}

function safeFilename(url) {
  const parsed = new URL(url);
  const base = path.basename(parsed.pathname) || "image.jpg";
  return base.replace(/[^a-zA-Z0-9._-]/g, "-");
}

async function fetchText(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "ZESCORP product image recovery; noindex catalog quality review" },
    });
    const text = await response.text();
    return { ok: response.ok, status: response.status, text };
  } catch (error) {
    return { ok: false, status: 0, text: "", error: error instanceof Error ? error.message : String(error) };
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchImage(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "ZESCORP product image recovery; noindex catalog quality review" },
    });
    if (!response.ok || !(response.headers.get("content-type") || "").startsWith("image/")) {
      return { ok: false, status: response.status, buffer: null, size: null };
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    const size = imageSize(buffer);
    return { ok: isGoodImage(buffer, size), status: response.status, buffer, size };
  } catch (error) {
    return { ok: false, status: 0, buffer: null, size: null, error: error instanceof Error ? error.message : String(error) };
  } finally {
    clearTimeout(timeout);
  }
}

function getProductPageUrl(product) {
  if (product.productUrl) return product.productUrl;
  const fromSource = product.sourceUrls?.find((url) => /\/Prodotti\//i.test(url));
  if (fromSource) return fromSource;
  return product.gimaCode ? `${gimaBase}/Prodotti/${product.gimaCode}` : "";
}

function extractImageCandidates(html, code) {
  const candidates = [];
  const seen = new Set();
  const add = (raw, source) => {
    if (!raw) return;
    if (!/\/images\/prodotti\/(thumb|medium|big)\//i.test(raw)) return;
    if (/picture_nd|logo|icon|banner/i.test(raw)) return;
    const absolute = absoluteGimaUrl(raw);
    const variants = [toHighResUrl(absolute), absolute];
    for (const url of variants) {
      const key = url.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      candidates.push({ url, source });
    }
  };

  for (const match of html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)) add(match[1], "product-page-img");
  for (const match of html.matchAll(/(?:href|data-src|data-full|data-image)=["']([^"']+)["']/gi)) add(match[1], "product-page-attr");

  if (code) {
    for (const folder of ["big", "medium", "thumb"]) {
      for (const suffix of ["", "_a", "_b", "_c", "_d"]) {
        add(`/images/prodotti/${folder}/${code}${suffix}.jpg`, "sku-inferred");
      }
    }
  }
  return candidates;
}

async function recoverProduct(product) {
  const code = product.gimaCode || product.id || product.slug;
  const pageUrl = getProductPageUrl(product);
  const htmlResult = pageUrl ? await fetchText(pageUrl) : { ok: false, status: 0, text: "" };
  const candidates = extractImageCandidates(htmlResult.text, product.gimaCode);
  const localDir = path.join(imageRoot, String(code || "unknown"));
  const kept = [];
  const audit = [];
  const seenFiles = new Set();

  for (const candidate of candidates.slice(0, 16)) {
    const result = await fetchImage(candidate.url);
    const filename = safeFilename(candidate.url);
    const publicPath = `/product-images/${code}/${filename}`;
    audit.push({
      source: candidate.source,
      url: candidate.url,
      status: result.ok ? "kept" : "failed",
      resolution: result.size ? `${result.size.width}x${result.size.height}` : "",
      bytes: result.buffer?.length || 0,
      httpStatus: result.status,
    });
    if (!result.ok || !result.buffer) continue;
    if (seenFiles.has(publicPath)) continue;
    seenFiles.add(publicPath);
    fs.mkdirSync(localDir, { recursive: true });
    fs.writeFileSync(path.join(localDir, filename), result.buffer);
    kept.push({
      url: publicPath,
      alt: `${product.romanianTitle || product.sourceProductName || "Produs medical"} - imagine produs`,
      verified: true,
      width: result.size.width,
      height: result.size.height,
      area: result.size.width * result.size.height,
    });
  }

  if (kept.length) {
    const sorted = kept.sort((a, b) => b.area - a.area).map(({ width, height, area, ...image }) => image);
    product.imageUrl = sorted[0].url;
    product.imageAlt = sorted[0].alt;
    product.imageVerified = true;
    product.imageStatus = "verified_local";
    product.galleryImages = sorted.slice(0, 6);
    product.galleryImageAudit = audit;
    return { recovered: true, code, title: product.romanianTitle, pageUrl, kept: sorted.length, audit };
  }
  product.galleryImageAudit = audit;
  return { recovered: false, code, title: product.romanianTitle, pageUrl, kept: 0, pageStatus: htmlResult.status, audit };
}

const beforeMissing = gimaProducts.filter(imageMissing);
const rows = [];
let cursor = 0;

async function worker() {
  while (cursor < beforeMissing.length) {
    const product = beforeMissing[cursor++];
    rows.push(await recoverProduct(product));
  }
}

const workers = Array.from({ length: Math.min(8, beforeMissing.length) }, () => worker());
await Promise.all(workers);

const afterMissing = gimaProducts.filter(imageMissing);

for (const product of gimaProducts) {
  if (product.reviewStatus === "indexable") product.reviewStatus = "reviewed";
  if (product.imageVerified && product.imageStatus === "verified_local" && product.deepRecoveryBlockers?.includes("missing_or_broken_image")) {
    product.deepRecoveryBlockers = product.deepRecoveryBlockers.filter((item) => item !== "missing_or_broken_image");
  }
}

fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`);

const recovered = rows.filter((row) => row.recovered);
const failed = rows.filter((row) => !row.recovered);
const affectedBefore = categoryCounts(beforeMissing);
const affectedAfter = categoryCounts(afterMissing);

function table(rows, columns) {
  return [
    `| ${columns.map((column) => column.label).join(" | ")} |`,
    `| ${columns.map((column) => column.align || "---").join(" | ")} |`,
    ...rows.map((row) => `| ${columns.map((column) => String(column.value(row) ?? "")).join(" | ")} |`),
  ].join("\n");
}

const categoryRows = Object.keys({ ...affectedBefore, ...affectedAfter })
  .sort()
  .map((category) => ({
    category,
    before: affectedBefore[category] || 0,
    after: affectedAfter[category] || 0,
    recovered: (affectedBefore[category] || 0) - (affectedAfter[category] || 0),
  }));

const report = `# GIMA Image Recovery Mission

Generated: ${new Date().toISOString()}

Scope: products missing verified local images. Images were recovered only from official GIMA product pages and official product image paths. No deploy, no indexation and no sitemap changes were performed.

## Summary

- Missing images before: ${beforeMissing.length}
- Missing images after: ${afterMissing.length}
- Products recovered: ${recovered.length}
- Unrecoverable after this pass: ${afterMissing.length}

## Category Impact

${table(categoryRows, [
  { label: "Category", value: (row) => row.category },
  { label: "Before", align: "---:", value: (row) => row.before },
  { label: "After", align: "---:", value: (row) => row.after },
  { label: "Recovered", align: "---:", value: (row) => row.recovered },
])}

## Recovered Images

${recovered.length ? table(recovered.slice(0, 500), [
  { label: "Code", value: (row) => row.code },
  { label: "Title", value: (row) => row.title },
  { label: "Images", align: "---:", value: (row) => row.kept },
  { label: "Page", value: (row) => row.pageUrl },
]) : "No additional images recovered."}

## Unrecoverable Products

Showing first 500 unrecoverable rows.

${table(failed.slice(0, 500), [
  { label: "Code", value: (row) => row.code },
  { label: "Title", value: (row) => row.title },
  { label: "Page status", align: "---:", value: (row) => row.pageStatus },
  { label: "Page", value: (row) => row.pageUrl },
])}

## Notes

- Product pages returning only placeholder image \`picture_nd\` were not accepted.
- Images below ${MIN_WIDTH}x${MIN_HEIGHT}px or below ${MIN_BYTES} bytes were rejected.
- Shared/group images from official product pages were accepted when they passed quality checks.
`;

fs.writeFileSync(reportPath, report);

console.log(
  JSON.stringify(
    {
      beforeMissing: beforeMissing.length,
      afterMissing: afterMissing.length,
      recovered: recovered.length,
      unrecoverable: afterMissing.length,
      reportPath,
    },
    null,
    2,
  ),
);
