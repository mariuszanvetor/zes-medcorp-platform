import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const publicDocumentsRoot = path.join(root, "public", "product-documents");
const reportPath = path.join(root, "docs", "gima-product-assets-report.md");
const gimaBaseUrl = "https://www.gimaitaly.com";

const selectedProducts = [
  "gima-xc-2000-centrifuge-24035",
  "gima-gimacare-multi-parameter-monitor-6-parameters-gb-fr-it-es-24128",
  "gima-non-woven-bi-layer-drape-50x50-cm-23580",
  "gima-aesculap-foerster-ballenger-clamp-straight-18-cm-bf112r-39240",
  "gima-quick-tourniquet-blue-25748",
  "gima-hydraulic-patient-transfer-chair-43430",
  "gima-emergency-trolley-neo-plus-45720",
  "gima-ent-chair-otopex-27552",
  "gima-foot-warmer-with-massage-28668",
  "gima-colpy-gima-led-colposcope-29600",
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

async function fetchBuffer(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "ZESCORP product asset localization; noindex catalog review" },
  });
  const buffer = Buffer.from(await response.arrayBuffer());
  return {
    ok: response.ok,
    status: response.status,
    contentType: response.headers.get("content-type") || "",
    buffer,
  };
}

async function verifyImage(url) {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      headers: { "User-Agent": "ZESCORP product image verifier" },
    });
    return response.ok && (response.headers.get("content-type") || "").startsWith("image/");
  } catch {
    return false;
  }
}

function isPdf(buffer, contentType) {
  return contentType.toLowerCase().includes("pdf") || buffer.slice(0, 4).toString() === "%PDF";
}

function pickEnglishManual(product) {
  return (product.productDocuments || []).find((document) =>
    document.type === "manual" &&
    /engleza|english/i.test(document.label) &&
    !/company|policy|disclaimer|sales|warranty|governance|ethics/i.test(document.label)
  );
}

function pickCeCertificate(product) {
  return (product.productDocuments || []).find((document) => document.type === "certificate" || /certificat ce|certificate/i.test(document.label));
}

async function downloadDocument({ destination, localUrl, reportLabel, sourceUrl }) {
  if (!sourceUrl) return { status: "missing", localUrl: "", error: "Missing source URL" };

  try {
    const result = await fetchBuffer(sourceUrl);
    if (!result.ok || !isPdf(result.buffer, result.contentType)) {
      return {
        status: "failed",
        localUrl: "",
        error: `${reportLabel} download failed or was not PDF: HTTP ${result.status}, ${result.contentType}`,
      };
    }
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, result.buffer);
    return { status: "available", localUrl, error: "" };
  } catch (error) {
    return { status: "failed", localUrl: "", error: `${reportLabel} download error: ${error.message}` };
  }
}

async function main() {
  const products = readJson(productsPath);
  const rows = [];
  const brokenImages = [];
  const brokenDownloads = [];
  const missingManuals = [];
  const missingCertificates = [];
  const missingDatasheets = [];

  for (const slug of selectedProducts) {
    const product = products.find((item) => item.slug === slug);
    if (!product) continue;
    const sku = product.gimaCode;
    const productDir = path.join(publicDocumentsRoot, sku);
    const publicDir = `/product-documents/${sku}`;
    const englishManual = pickEnglishManual(product);
    const ceCertificate = pickCeCertificate(product);
    const technicalDatasheetUrl = `${gimaBaseUrl}/Catalogo/PrintDataSheet?sku=${sku}`;

    const imageChecks = [];
    for (const image of product.galleryImages || []) {
      const ok = await verifyImage(image.url);
      imageChecks.push(ok);
      if (!ok) brokenImages.push(`${slug}: ${image.url}`);
    }

    const manualResult = await downloadDocument({
      sourceUrl: englishManual?.url,
      destination: path.join(productDir, "manual-en.pdf"),
      localUrl: `${publicDir}/manual-en.pdf`,
      reportLabel: "English manual",
    });
    const certificateResult = await downloadDocument({
      sourceUrl: ceCertificate?.url,
      destination: path.join(productDir, "certificat-ce.pdf"),
      localUrl: `${publicDir}/certificat-ce.pdf`,
      reportLabel: "CE certificate",
    });
    const datasheetResult = await downloadDocument({
      sourceUrl: technicalDatasheetUrl,
      destination: path.join(productDir, "fisa-tehnica.pdf"),
      localUrl: `${publicDir}/fisa-tehnica.pdf`,
      reportLabel: "Technical datasheet",
    });

    if (manualResult.status === "missing") missingManuals.push(slug);
    if (certificateResult.status === "missing") missingCertificates.push(slug);
    if (datasheetResult.status === "missing") missingDatasheets.push(slug);
    for (const result of [manualResult, certificateResult, datasheetResult]) {
      if (result.status === "failed") brokenDownloads.push(`${slug}: ${result.error}`);
    }

    product.documents = {
      ...(manualResult.localUrl ? { englishManual: manualResult.localUrl } : {}),
      ...(certificateResult.localUrl ? { ceCertificate: certificateResult.localUrl } : {}),
      ...(datasheetResult.localUrl ? { technicalDatasheet: datasheetResult.localUrl } : {}),
    };
    product.documentStatus = {
      englishManual: manualResult.status,
      ceCertificate: certificateResult.status,
      technicalDatasheet: datasheetResult.status,
    };
    product.imageStatus = imageChecks.every(Boolean) ? "verified" : "missing";

    rows.push({
      slug,
      sku,
      images: product.galleryImages?.length || 0,
      verifiedImages: imageChecks.filter(Boolean).length,
      englishManual: manualResult.status,
      ceCertificate: certificateResult.status,
      technicalDatasheet: datasheetResult.status,
      localDocuments: Object.values(product.documents).length,
    });
  }

  writeJson(productsPath, products);
  writeReport({ brokenDownloads, brokenImages, missingCertificates, missingDatasheets, missingManuals, rows });
  console.log(
    JSON.stringify(
      {
        productsChecked: rows.length,
        brokenImages: brokenImages.length,
        brokenDownloads: brokenDownloads.length,
        localDocuments: rows.reduce((sum, row) => sum + row.localDocuments, 0),
      },
      null,
      2,
    ),
  );
}

function writeReport({ brokenDownloads, brokenImages, missingCertificates, missingDatasheets, missingManuals, rows }) {
  const report = `# GIMA Product Assets Report

Generated: ${new Date().toISOString()}

Scope: 10 quality-gate products. Public product pages use local document links only.

## Summary

- Products checked: ${rows.length}
- Total gallery images found: ${rows.reduce((sum, row) => sum + row.images, 0)}
- Verified gallery images: ${rows.reduce((sum, row) => sum + row.verifiedImages, 0)}
- Local documents stored: ${rows.reduce((sum, row) => sum + row.localDocuments, 0)}
- Broken images: ${brokenImages.length}
- Broken downloads: ${brokenDownloads.length}

## Product Asset Matrix

${rows
  .map(
    (row) =>
      `- ${row.slug}: ${row.verifiedImages}/${row.images} images, manual=${row.englishManual}, ce=${row.ceCertificate}, datasheet=${row.technicalDatasheet}`,
  )
  .join("\n")}

## Missing Manuals

${missingManuals.length ? missingManuals.map((slug) => `- ${slug}`).join("\n") : "- None"}

## Missing CE Certificates

${missingCertificates.length ? missingCertificates.map((slug) => `- ${slug}`).join("\n") : "- None"}

## Missing Technical Datasheets

${missingDatasheets.length ? missingDatasheets.map((slug) => `- ${slug}`).join("\n") : "- None"}

## Broken Downloads

${brokenDownloads.length ? brokenDownloads.map((item) => `- ${item}`).join("\n") : "- None"}

## Broken Images

${brokenImages.length ? brokenImages.map((item) => `- ${item}`).join("\n") : "- None"}

## Public UX Rules

- Product pages expose only local document links.
- Product pages do not display source URLs, import status, review status, or external source references.
- Imported products remain noindex and excluded from sitemap.
`;

  fs.writeFileSync(reportPath, report);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
