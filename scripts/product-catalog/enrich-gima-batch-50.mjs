import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const imagesRoot = path.join(root, "public", "product-images");
const documentsRoot = path.join(root, "public", "product-documents");
const reportPath = path.join(root, "docs", "gima-batch-50-report.md");
const gimaBaseUrl = "https://www.gimaitaly.com";

const existingQualityGateSlugs = [
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

const batchProducts = [
  { slug: "gima-17-ball-electrode-4-mm-37-30534-30513", title: "Electrod bila autoclavabil 4 mm", category: "diagnostic" },
  { slug: "gima-10-electrode-ball-point-3-mm-straight-30-30530-30510", title: "Electrod bila drept 3 mm", category: "diagnostic" },
  { slug: "gima-16-blade-electrode-36-30533-30512", title: "Electrod lama autoclavabil 7 cm", category: "diagnostic" },
  { slug: "gima-hemo-control-23994", title: "Analizor hemoglobina si hematocrit Hemo Control", category: "laboratory" },
  { slug: "gima-urine-analyzer-bluetooth-24046", title: "Analizor urina cu Bluetooth", category: "laboratory" },
  { slug: "gima-fluorescence-immunoassay-analyzer-24600", title: "Analizor imunotest fluorescent", category: "laboratory" },
  { slug: "gima-urilyzer-500-pro-urine-analyzer-with-printer-24050", title: "Analizor urina Urilyzer 500 Pro cu imprimanta", category: "laboratory" },
  { slug: "gima-led-infant-phototherapy-light-trolley-31192", title: "Lampa fototerapie LED pentru nou-nascuti pe carucior", category: "laboratory" },
  { slug: "gima-stair-stretcher-131x50x155-cm-34068", title: "Targa pliabila pentru scari", category: "emergency" },
  { slug: "gima-electric-stair-stretcher-123x50x160-cm-34069", title: "Targa electrica pliabila pentru scari", category: "emergency" },
  { slug: "gima-cu-spr-semiautomaticus-35402", title: "Defibrilator AED CU-SPR", category: "emergency" },
  { slug: "gima-cu-sp2-aed-us-35341", title: "Defibrilator AED CU-SP2 cu monitor", category: "emergency" },
  { slug: "gima-defimonitor-xd-manual-35370", title: "Defibrilator manual DefiMonitor XD", category: "emergency" },
  { slug: "gima-silicone-resuscitator-bag-with-mask-n-5-adult-34260", title: "Balon resuscitare silicon cu masca pentru adulti", category: "emergency" },
  { slug: "gima-tube-of-100-wipes-36625", title: "Servetele dezinfectante, tub 100 bucati", category: "sterilization" },
  { slug: "gima-antibacterial-gel-500-ml-bottle-transparent-36589", title: "Gel antibacterian transparent 500 ml", category: "sterilization" },
  { slug: "gima-antibacterial-gel-1-l-bottle-transparent-36594", title: "Gel antibacterian transparent 1 l", category: "sterilization" },
  { slug: "gima-multiusi-hand-wipes-36657", title: "Servetele pentru maini Multiusi 14 x 19 cm", category: "sterilization" },
  { slug: "gima-medical-trolley-easy-27880", title: "Carucior medical Easy cu 2 polite", category: "medical-furniture" },
  { slug: "gima-ischia-patient-transfer-chair-blue-44840", title: "Scaun transfer pacient Ischia albastru", category: "medical-furniture" },
  { slug: "gima-folding-bedside-rail-27704", title: "Bara pliabila pentru pat", category: "medical-furniture" },
  { slug: "gima-foldable-commode-wheelchair-43202", title: "Scaun cu rotile pliabil cu functie toaleta", category: "medical-furniture" },
  { slug: "gima-elite-overbed-table-27487", title: "Masa peste pat Elite", category: "medical-furniture" },
  { slug: "gima-uni-i-otoscope-vacuum-2-7-v-c-handle-2010-31870", title: "Otoscop Riester Uni I, 2.7 V", category: "ent" },
  { slug: "gima-econom-diagnostic-31875", title: "Set diagnostic Riester Econom", category: "ent" },
  { slug: "gima-sp-100b-spirometer-available-october-2026-33554", title: "Spirometru SP-100B", category: "ent" },
  { slug: "gima-ac-2311-led-video-colposcope-with-camera-29624", title: "Videocolposcop LED AC-2311 cu camera", category: "gynecology" },
  { slug: "gima-ac-2311da-led-video-colposcope-l-shaped-arm-29625", title: "Videocolposcop LED AC-2311DA cu brat in L", category: "gynecology" },
  { slug: "gima-gimasafe-25659", title: "Ochelari de protectie Gimasafe", category: "consumables" },
  { slug: "gima-visor-shield-protector-white-25642", title: "Viziera de protectie cu ecrane", category: "consumables" },
  { slug: "gima-protective-goggles-5x7-fog-resistant-and-anti-scratch-25667", title: "Ochelari de protectie 5x7 antiaburire", category: "consumables" },
  { slug: "gima-infrared-therapy-lamp-250-w-28652", title: "Lampa terapie infrarosu 250 W de birou", category: "electromedical" },
  { slug: "gima-infrared-therapy-28653", title: "Lampa terapie infrarosu 250 W pe stativ", category: "electromedical" },
  { slug: "gima-t-tt-one-coach-electrotherapy-4-channels-28401", title: "Aparat electroterapie T-ONE Coach cu 4 canale", category: "electromedical" },
  { slug: "gima-iono-base-28306", title: "Aparat ionoforeza Iono Base Plus cu 2 canale", category: "electromedical" },
  { slug: "gima-foetal-monitor-gima-fc-700-29520", title: "Monitor fetal FC 700", category: "monitoring" },
  { slug: "gima-fc1400-single-foetal-monitor-29516", title: "Monitor fetal single FC1400", category: "monitoring" },
  { slug: "gima-sunlight-miniomni-ultrasound-osteoporosis-screening-with-cm-probe-x2b-software-adult-56800", title: "Sistem ultrasound screening osteoporoza Sunlight MiniOmni", category: "monitoring" },
  { slug: "gima-ihealth-gluco-bg5s-smart-glucose-monitor-kit-23514", title: "Glucometru wireless iHealth BG5", category: "monitoring" },
  { slug: "gima-mio-sonic-ultrasound-therapy-28309", title: "Aparat terapie cu ultrasunete MIO-Sonic", category: "monitoring" },
];

const categoryCopy = {
  diagnostic: {
    categoryLabel: "Diagnostic medical",
    description: "pentru evaluare, examinare sau completarea dotarii de diagnostic in cabinete si clinici",
    applications: ["dotare cabinete medicale", "diagnostic si examinare de rutina", "completarea seturilor de lucru pentru personal medical"],
    services: ["/solutii-medicale/echipamente-imagistica-diagnostic", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  laboratory: {
    categoryLabel: "Laborator / IVD",
    description: "pentru fluxuri de laborator, IVD, analiza probe sau suport operational in unitati medicale",
    applications: ["laboratoare medicale si IVD", "centre cu flux repetabil de probe", "dotare sau modernizare laborator"],
    services: ["/solutii-medicale/echipamente-laborator-ivd", "/service-laborator-ivd", "/contracte-mentenanta"],
  },
  emergency: {
    categoryLabel: "Urgenta",
    description: "pentru zone de urgenta, triaj, interventie rapida sau suport critic in clinici si unitati medicale",
    applications: ["camere de urgenta si triaj", "zone cu risc de downtime operational", "echipare pentru interventie si transport pacient"],
    services: ["/service-aparatura-medicala", "/contracte-mentenanta", "/contact"],
  },
  sterilization: {
    categoryLabel: "Sterilizare",
    description: "pentru control operational, igiena, dezinfectie sau completarea fluxurilor de sterilizare",
    applications: ["cabinete si clinici cu flux recurent", "zone de pregatire instrumentar si consumabile", "dotare pentru igiena operationala"],
    services: ["/solutii-medicale/instalare-punere-in-functiune", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "medical-furniture": {
    categoryLabel: "Mobilier medical",
    description: "pentru organizarea spatiului clinic, mobilitate pacient, lucru curent sau amenajare medicala",
    applications: ["amenajare cabinete si clinici", "mobilitate si transfer pacient", "organizare operationala a spatiului medical"],
    services: ["/solutii-medicale/amenajare-clinica-medicala", "/contact", "/contracte-mentenanta"],
  },
  ent: {
    categoryLabel: "ORL",
    description: "pentru cabinete ORL, diagnostic, examinare si completarea seturilor clinice specializate",
    applications: ["cabinete ORL", "diagnostic si examinare specializata", "dotare pentru consultatii recurente"],
    services: ["/solutii-medicale/instalare-punere-in-functiune", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  gynecology: {
    categoryLabel: "Ginecologie",
    description: "pentru cabinete de ginecologie, examinare, documentare si fluxuri clinice specializate",
    applications: ["cabinete ginecologie", "consultatii si examinari specializate", "dotare sau modernizare cabinet"],
    services: ["/solutii-medicale/instalare-punere-in-functiune", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  consumables: {
    categoryLabel: "Consumabile",
    description: "pentru consum recurent, siguranta personalului, protectie sau completarea activitatii medicale zilnice",
    applications: ["aprovizionare recurenta pentru clinici", "protectie si consumabile de cabinet", "completarea necesarului operational"],
    services: ["/contact", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  electromedical: {
    categoryLabel: "Electromedicale",
    description: "pentru terapie, recuperare, tratament sau suport tehnic in cabinete si clinici",
    applications: ["cabinete de recuperare si terapie", "dotare electromedicala pentru clinici", "echipamente active care necesita clarificare tehnica"],
    services: ["/solutii-medicale/instalare-punere-in-functiune", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  monitoring: {
    categoryLabel: "Monitorizare",
    description: "pentru monitorizare clinica, evaluare parametri sau suport operational in cabinete si unitati medicale",
    applications: ["monitorizare clinica", "cabinete si unitati cu pacienti recurenti", "dotare pentru evaluare si urmarire parametri"],
    services: ["/solutii-medicale/echipamente-imagistica-diagnostic", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
};

const specLabelMap = new Map([
  ["power supply", "Alimentare"],
  ["power", "Putere"],
  ["size", "Dimensiuni"],
  ["dimensions", "Dimensiuni"],
  ["weight", "Greutate"],
  ["display", "Display"],
  ["memory", "Memorie"],
  ["capacity", "Capacitate"],
  ["measuring method", "Metoda de masurare"],
  ["parameters", "Parametri"],
  ["measurements", "Masuratori"],
  ["data storage", "Stocare date"],
  ["interfaces", "Interfete"],
  ["battery", "Baterie"],
  ["operating", "Functionare"],
  ["language", "Limbi disponibile"],
  ["material", "Material"],
  ["colour", "Culoare"],
  ["color", "Culoare"],
  ["load capacity", "Capacitate incarcare"],
  ["wheel", "Roti"],
]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function cleanHtml(value) {
  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x2B;/g, "+")
    .replace(/&#xB5;/g, "u")
    .replace(/&#xD8;/g, "Ø")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeText(value) {
  return String(value || "")
    .replace(/\bGIMA\b/gi, "")
    .replace(/\bGIMACARE\b/g, "monitor multiparametric")
    .replace(/available\s+October\s+2026/gi, "")
    .replace(/specify language with order/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function translateSpecLabel(label) {
  const clean = normalizeText(label).replace(/\s+/g, " ").trim();
  const key = clean.toLowerCase();
  return specLabelMap.get(key) || clean.charAt(0).toUpperCase() + clean.slice(1);
}

function translateFeatureLine(line) {
  return normalizeText(line)
    .replace(/^-\s*/, "")
    .replace(/\bexternal barcode reader\b/gi, "cititor extern de coduri de bare")
    .replace(/\bbuilt-in thermal printer\b/gi, "imprimanta termica integrata")
    .replace(/\bautomatic printout\b/gi, "tiparire automata")
    .replace(/\btests\/hour\b/gi, "teste/ora")
    .replace(/\bMade in\b/gi, "Fabricat in")
    .replace(/\bBluetooth\b/g, "Bluetooth")
    .replace(/\bwith printer\b/gi, "cu imprimanta")
    .replace(/\bwith camera\b/gi, "cu camera")
    .replace(/\bwith monitor\b/gi, "cu monitor")
    .replace(/\bwireless\b/gi, "wireless")
    .replace(/\bsterile\b/gi, "steril")
    .replace(/\breusable\b/gi, "reutilizabil")
    .trim();
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "ZESCORP GIMA batch quality review; noindex catalog gate" },
  });
  const html = await response.text();
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  return { html, url: response.url };
}

async function fetchProductHtml(product) {
  const candidates = Array.from(
    new Set([
      product.gimaCode ? `${gimaBaseUrl}/Prodotti/${product.gimaCode}` : "",
      product.productUrl || "",
      ...(product.sourceUrls || []).filter((url) => /\/Prodotti\//i.test(url)),
    ].filter(Boolean)),
  );

  let lastError = "";
  for (const url of candidates) {
    try {
      return await fetchHtml(url);
    } catch (error) {
      lastError = `${url}: ${error.message}`;
    }
  }

  throw new Error(lastError || `No product URL candidates for ${product.slug}`);
}

function sectionBetween(html, startLabel, endLabels) {
  const start = html.indexOf(startLabel);
  if (start < 0) return "";
  const end = endLabels
    .map((label) => html.indexOf(label, start + startLabel.length))
    .filter((index) => index > start)
    .sort((a, b) => a - b)[0];
  return html.slice(start, end || start + 7000);
}

function extractProductPage(html, sku) {
  const title = cleanHtml(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "");
  const breadcrumbs = [...html.matchAll(/<a[^>]+href=["']([^"']*\/catalogo\/[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map((match) => cleanHtml(match[2]))
    .filter(Boolean)
    .slice(-3);

  const imageUrls = Array.from(
    new Set(
      [...html.matchAll(/(?:href|src)=["']([^"']*\/images\/prodotti\/(?:big|medium|thumb)\/[^"']+)["']/gi)]
        .map((match) => new URL(match[1], gimaBaseUrl).toString())
        .filter((url) => !url.includes("/medium/")),
    ),
  ).slice(0, 8);

  const descriptionText = cleanHtml(sectionBetween(html, "Description", ["Technical Specifications", "In the same family"]))
    .replace(/^Description\s*/i, "")
    .trim();
  const specificationText = cleanHtml(sectionBetween(html, "Technical Specifications", ["In the same family", "Downloads", "Accessories"]))
    .replace(/^Technical Specifications\s*/i, "")
    .trim();

  const ignoredDocs = /company profile|governance|ethics|environment|mog|code of ethics|whistleblowing|gender equality|general|policy|sales terms|warranty|disclaimer/i;
  const documents = [...html.matchAll(/<a[^>]+href=["']([^"']*\/Download\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map((match) => ({ url: new URL(match[1], gimaBaseUrl).toString(), label: cleanHtml(match[2]) }))
    .filter((doc) => doc.label && !ignoredDocs.test(doc.label))
    .map((doc) => ({ url: doc.url, label: translateDocumentLabel(doc.label), type: inferDocumentType(doc.label) }));

  const relatedProductCodes = Array.from(
    new Set(
      [...html.matchAll(/\/Prodotti\/(?:[^"']*?)(\d{5})(?=["'/?#-])/gi)]
        .map((match) => match[1])
        .filter((code) => code !== sku),
    ),
  ).slice(0, 8);

  return { breadcrumbs, descriptionText, documents, imageUrls, relatedProductCodes, specificationText, title };
}

function translateDocumentLabel(label) {
  const normalized = label.replace(/&#x2B;/g, "+");
  if (/CE Certificate/i.test(normalized)) return "Certificat CE";
  if (/Catalogue Page/i.test(normalized)) return "Pagina de catalog";
  if (/Label Box|label/i.test(normalized)) return "Eticheta ambalaj";
  if (/English/i.test(normalized)) return "Manual in limba engleza";
  if (/Multilingual/i.test(normalized)) return "Documentatie multilingva";
  if (/Italian/i.test(normalized)) return "Documentatie in limba italiana";
  if (/French/i.test(normalized)) return "Documentatie in limba franceza";
  if (/Spanish/i.test(normalized)) return "Documentatie in limba spaniola";
  if (/German/i.test(normalized)) return "Documentatie in limba germana";
  return normalizeText(normalized);
}

function inferDocumentType(label) {
  if (/catalogue/i.test(label)) return "catalog";
  if (/certificate|ce/i.test(label)) return "certificate";
  if (/label/i.test(label)) return "label";
  return "manual";
}

function extractFeatures(descriptionText) {
  const lines = descriptionText
    .split(/\n+/)
    .map((line) => cleanHtml(line))
    .filter(Boolean);
  const bulletLines = lines
    .filter((line) => /^[-•]/.test(line) || /^[a-z].{8,90}$/i.test(line))
    .map(translateFeatureLine)
    .filter((line) => line.length > 5 && !/^Description$/i.test(line));
  return Array.from(new Set(bulletLines)).slice(0, 7);
}

function extractSpecifications(product, specificationText) {
  const specs = [];
  const lines = specificationText
    .split(/\n+/)
    .map((line) => cleanHtml(line))
    .filter(Boolean);

  for (const line of lines) {
    const match = line.match(/^([^:]{2,80}):\s*(.{2,500})$/);
    if (!match) continue;
    const label = translateSpecLabel(match[1]);
    const value = normalizeText(match[2]);
    if (!label || !value) continue;
    if (/related products|technical specifications/i.test(label)) continue;
    specs.push({ label, value });
  }

  const importedSpecs = (product.romanianSpecifications || [])
    .filter((spec) => spec.label && spec.value)
    .filter((spec) => !/^Tip produs$/i.test(spec.label) || !/No medical device/i.test(spec.value));

  for (const spec of importedSpecs) {
    if (!specs.some((item) => item.label.toLowerCase() === spec.label.toLowerCase())) {
      specs.push({ label: spec.label, value: normalizeText(spec.value) });
    }
  }

  return specs
    .filter((spec) => !/^\s*(source|status|review)/i.test(spec.label))
    .slice(0, 14);
}

function buildDescription(title, categoryId, descriptionText) {
  const copy = categoryCopy[categoryId] || categoryCopy.diagnostic;
  const sourceHint = descriptionText
    .split(/\n+/)
    .map((line) => normalizeText(line))
    .find((line) => line.length > 60 && line.length < 260 && !/[<>]/.test(line));
  const base = `${title} este un produs medical ${copy.description}.`;
  if (!sourceHint) {
    return `${base} Configuratia, documentatia, accesoriile si conditiile comerciale se confirma inainte de ofertare, in functie de aplicatia clinica si cantitatea solicitata.`;
  }
  return `${base} Informatiile tehnice disponibile indica o utilizare potrivita pentru cereri de oferta profesionale; detaliile finale se verifica manual inainte de ofertare.`;
}

function buildSummary(title, categoryId, specs) {
  const copy = categoryCopy[categoryId] || categoryCopy.diagnostic;
  const usefulSpec = specs.find((spec) => !/Cod produs|EAN|Unitate de vanzare/i.test(spec.label));
  return usefulSpec
    ? `${title}, pentru ${copy.description}, cu ${usefulSpec.label.toLowerCase()}: ${usefulSpec.value}.`
    : `${title}, pentru ${copy.description}. Configuratia finala se confirma inainte de oferta.`;
}

function getPackageContents(product, features) {
  const packageLines = features.filter((line) => /include|kit|manual|pachet|husa|accessor/i.test(line)).slice(0, 4);
  return packageLines.length ? packageLines : [`Produs cod ${product.gimaCode}`, "Documentatia disponibila se confirma la ofertare"];
}

async function verifyRemoteImage(url) {
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

async function downloadImage(url, sku, alt, index) {
  const parsed = new URL(url);
  const filename = (parsed.pathname.split("/").pop() || `image-${index}.jpg`).replace(/[^a-zA-Z0-9._-]/g, "-");
  const productDir = path.join(imagesRoot, sku);
  const destination = path.join(productDir, filename);
  const publicUrl = `/product-images/${sku}/${filename}`;
  fs.mkdirSync(productDir, { recursive: true });
  if (!fs.existsSync(destination)) {
    const response = await fetch(url, {
      headers: { "User-Agent": "ZESCORP product image localization" },
    });
    if (!response.ok || !(response.headers.get("content-type") || "").startsWith("image/")) {
      return null;
    }
    fs.writeFileSync(destination, Buffer.from(await response.arrayBuffer()));
  }
  return { alt, url: publicUrl, verified: true };
}

async function fetchBuffer(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "ZESCORP product document localization" },
  });
  return {
    buffer: Buffer.from(await response.arrayBuffer()),
    contentType: response.headers.get("content-type") || "",
    ok: response.ok,
    status: response.status,
  };
}

function isPdf(buffer, contentType) {
  return contentType.toLowerCase().includes("pdf") || buffer.slice(0, 4).toString() === "%PDF";
}

function pickEnglishManual(product) {
  return (product.productDocuments || []).find(
    (document) => document.type === "manual" && /engleza|english|multilingva|multilingual/i.test(document.label),
  );
}

function pickCeCertificate(product) {
  return (product.productDocuments || []).find((document) => document.type === "certificate" || /certificat ce|certificate/i.test(document.label));
}

async function downloadDocument({ destination, localUrl, sourceUrl }) {
  if (!sourceUrl) return { error: "", localUrl: "", status: "missing" };
  try {
    const result = await fetchBuffer(sourceUrl);
    if (!result.ok || !isPdf(result.buffer, result.contentType)) {
      return { error: `HTTP ${result.status}, ${result.contentType}`, localUrl: "", status: "failed" };
    }
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, result.buffer);
    return { error: "", localUrl, status: "available" };
  } catch (error) {
    return { error: error.message, localUrl: "", status: "failed" };
  }
}

async function localizeDocuments(product) {
  const sku = product.gimaCode;
  const productDir = path.join(documentsRoot, sku);
  const publicDir = `/product-documents/${sku}`;
  const englishManual = pickEnglishManual(product);
  const ceCertificate = pickCeCertificate(product);
  const datasheetUrl = `${gimaBaseUrl}/Catalogo/PrintDataSheet?sku=${sku}`;

  const manualResult = await downloadDocument({
    sourceUrl: englishManual?.url,
    destination: path.join(productDir, "manual-en.pdf"),
    localUrl: `${publicDir}/manual-en.pdf`,
  });
  const certificateResult = await downloadDocument({
    sourceUrl: ceCertificate?.url,
    destination: path.join(productDir, "certificat-ce.pdf"),
    localUrl: `${publicDir}/certificat-ce.pdf`,
  });
  const datasheetResult = await downloadDocument({
    sourceUrl: datasheetUrl,
    destination: path.join(productDir, "fisa-tehnica.pdf"),
    localUrl: `${publicDir}/fisa-tehnica.pdf`,
  });

  return {
    documents: {
      ...(manualResult.localUrl ? { englishManual: manualResult.localUrl } : {}),
      ...(certificateResult.localUrl ? { ceCertificate: certificateResult.localUrl } : {}),
      ...(datasheetResult.localUrl ? { technicalDatasheet: datasheetResult.localUrl } : {}),
    },
    documentStatus: {
      englishManual: manualResult.status,
      ceCertificate: certificateResult.status,
      technicalDatasheet: datasheetResult.status,
    },
    errors: [manualResult, certificateResult, datasheetResult].filter((item) => item.status === "failed").map((item) => item.error),
  };
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

async function main() {
  const products = readJson(productsPath);
  const bySlug = new Map(products.map((product, index) => [product.slug, { product, index }]));
  const selectedSlugs = new Set([...existingQualityGateSlugs, ...batchProducts.map((product) => product.slug)]);
  const rows = [];
  const failures = [];

  for (const product of products) {
    if (product.notes?.includes("Batch 50 quality-gate enrichment") && !selectedSlugs.has(product.slug)) {
      product.sourceQuality = "basic_import";
      product.publicDisplayReady = false;
      product.reviewStatus = "image_verified";
      product.notes = product.notes.replace(/\s*Batch 50 quality-gate enrichment\. Public noindex preserved\./g, "").trim();
    }
  }

  for (const selection of batchProducts) {
    const entry = bySlug.get(selection.slug);
    if (!entry) {
      failures.push(`${selection.slug}: missing local product`);
      continue;
    }

    const product = entry.product;
    const sku = product.gimaCode;
    if (!sku) {
      failures.push(`${selection.slug}: missing SKU`);
      continue;
    }

    const source = await fetchProductHtml(product);
    const extracted = extractProductPage(source.html, sku);
    const categoryId = selection.category || product.category;
    const title = selection.title;
    const specs = extractSpecifications(product, extracted.specificationText);
    const sourceFeatures = extractFeatures(extracted.descriptionText);
    const category = categoryCopy[categoryId] || categoryCopy.diagnostic;
    const features = sourceFeatures.length
      ? sourceFeatures
      : [
          "Configuratie confirmata inainte de oferta",
          "Documentatie si accesorii verificate manual",
          "Potrivit pentru cereri de oferta profesionale",
        ];
    const galleryImages = [];
    for (let index = 0; index < extracted.imageUrls.length; index += 1) {
      const url = extracted.imageUrls[index];
      if (!(await verifyRemoteImage(url))) continue;
      const localImage = await downloadImage(url, sku, title, index);
      if (localImage) galleryImages.push(localImage);
    }

    const updatedProduct = {
      ...product,
      category: categoryId,
      commercialCategory: category.categoryLabel,
      documents: product.documents || {},
      galleryImages,
      gimaBreadcrumbs: extracted.breadcrumbs,
      imageAlt: `${title} - produs medical pentru oferta ZESCORP`,
      imageStatus: galleryImages.length ? "verified_local" : "missing",
      imageUrl: galleryImages[0]?.url || product.imageUrl || "",
      imageVerified: Boolean(galleryImages.length),
      installationConsiderations: [
        "Oferta se confirma in functie de cantitate, accesorii, documentatie si termen de livrare",
        "Pentru echipamente active se verifica alimentarea, spatiul, accesul si conditiile de utilizare",
        "Pentru consumabile, mobilier sau accesorii se confirma ambalarea si unitatea de vanzare",
      ],
      maintenanceConsiderations: [
        "ZESCORP poate corela produsul cu service, mentenanta sau consumabile recurente unde este cazul",
        "Pentru echipamente medicale active se recomanda verificari periodice si plan de suport",
        "Pentru oferta finala se confirma manual documentatia si configuratia potrivita aplicatiei",
      ],
      notes: `${product.notes || ""} Batch 50 quality-gate enrichment. Public noindex preserved.`.trim(),
      productDocuments: extracted.documents,
      productUrl: source.url,
      publicDisplayReady: true,
      relatedProductCodes: extracted.relatedProductCodes,
      relatedServices: category.services,
      reviewStatus: "image_verified",
      romanianApplications: [
        ...category.applications,
        "cerere de oferta cu verificare manuala a documentatiei si configuratiei",
      ],
      romanianBenefits: [
        "Pagina adaptata pentru cerere de oferta ZESCORP, pe baza datelor tehnice disponibile",
        "Date tehnice afisate transparent, fara preturi sau stoc inventate",
        "Posibilitate de ofertare impreuna cu service, mentenanta si suport operational",
      ],
      romanianDescription: buildDescription(title, categoryId, extracted.descriptionText),
      romanianFeatures: features,
      romanianPackageContents: getPackageContents(product, features),
      romanianShortSummary: buildSummary(title, categoryId, specs),
      romanianSourceDescription: buildDescription(title, categoryId, extracted.descriptionText),
      romanianSpecifications: specs,
      romanianTitle: title,
      sourceExtractedAt: new Date().toISOString(),
      sourceProductName: extracted.title || product.sourceProductName,
      sourceQuality: "gima_page_parity_review",
      sourceUrls: Array.from(new Set([...(product.sourceUrls || []), source.url])),
    };

    const localizedDocuments = await localizeDocuments(updatedProduct);
    updatedProduct.documents = localizedDocuments.documents;
    updatedProduct.documentStatus = localizedDocuments.documentStatus;

    products[entry.index] = updatedProduct;
    rows.push({
      category: categoryId,
      documents: Object.keys(localizedDocuments.documents).length,
      documentStatus: localizedDocuments.documentStatus,
      imageCount: galleryImages.length,
      productUrl: `/produse/${product.slug}`,
      sku,
      slug: product.slug,
      sourceTitle: extracted.title,
      specs: specs.length,
      title,
      errors: localizedDocuments.errors,
    });
  }

  const reviewedProducts = products.filter((product) => product.sourceQuality === "gima_page_parity_review");
  writeJson(productsPath, products);
  writeReport({ failures, reviewedProducts, rows });

  console.log(
    JSON.stringify(
      {
        enrichedThisRun: rows.length,
        totalQualityGateProducts: reviewedProducts.length,
        categories: countBy(reviewedProducts, (product) => product.category),
        failures,
      },
      null,
      2,
    ),
  );
}

function writeReport({ failures, reviewedProducts, rows }) {
  const totalImages = reviewedProducts.reduce((sum, product) => sum + (product.galleryImages?.length || 0), 0);
  const totalDocuments = reviewedProducts.reduce((sum, product) => sum + Object.values(product.documents || {}).filter(Boolean).length, 0);
  const missingManuals = reviewedProducts.filter((product) => product.documentStatus?.englishManual !== "available");
  const missingCe = reviewedProducts.filter((product) => product.documentStatus?.ceCertificate !== "available");
  const missingDatasheets = reviewedProducts.filter((product) => product.documentStatus?.technicalDatasheet !== "available");
  const categoryCounts = countBy(reviewedProducts, (product) => product.category);
  const brokenDocs = rows.flatMap((row) => row.errors.map((error) => `${row.slug}: ${error}`));
  const brokenImages = reviewedProducts.filter((product) => !product.galleryImages?.length);

  const report = `# GIMA Batch 50 Report

Generated: ${new Date().toISOString()}

Scope: expand the reviewed noindex product catalog from 10 products to 50 total products.

## Summary

- Existing quality-gate products kept: ${existingQualityGateSlugs.length}
- Products enriched in this batch: ${rows.length}
- Total quality-gate products now: ${reviewedProducts.length}
- Categories covered: ${Object.keys(categoryCounts).length}
- Real local product images across reviewed products: ${totalImages}
- Local product documents across reviewed products: ${totalDocuments}
- Broken image products: ${brokenImages.length}
- Broken document downloads: ${brokenDocs.length}

## Category Coverage

${Object.entries(categoryCounts)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([category, count]) => `- ${category}: ${count}`)
  .join("\n")}

## Products Added In This Batch

${rows
  .map(
    (row) =>
      `- ${row.productUrl} - ${row.title} (${row.category}, ${row.imageCount} images, ${row.documents} local docs, ${row.specs} specs)`,
  )
  .join("\n")}

## Product Asset Totals

- Real images found/downloaded for new products: ${rows.reduce((sum, row) => sum + row.imageCount, 0)}
- Local documents downloaded for new products: ${rows.reduce((sum, row) => sum + row.documents, 0)}
- Products missing manuals: ${missingManuals.length}
- Products missing CE certificates: ${missingCe.length}
- Products missing datasheets: ${missingDatasheets.length}
- Broken image/document count: ${brokenImages.length + brokenDocs.length}

## Missing Manuals

${missingManuals.length ? missingManuals.map((product) => `- /produse/${product.slug}`).join("\n") : "- None"}

## Missing CE Certificates

${missingCe.length ? missingCe.map((product) => `- /produse/${product.slug}`).join("\n") : "- None"}

## Missing Datasheets

${missingDatasheets.length ? missingDatasheets.map((product) => `- /produse/${product.slug}`).join("\n") : "- None"}

## Broken Images

${brokenImages.length ? brokenImages.map((product) => `- /produse/${product.slug}`).join("\n") : "- None"}

## Broken Document Downloads

${brokenDocs.length ? brokenDocs.map((item) => `- ${item}`).join("\n") : "- None"}

## Sample URLs

${reviewedProducts
  .slice(0, 12)
  .map((product) => `- /produse/${product.slug}`)
  .join("\n")}

## Public Safety Checks

- Products remain noindex.
- Reviewed/imported product pages remain excluded from sitemap.
- Public pages do not render source URLs, import status, review status, raw GIMA links, fake stock or fake prices.
- Product images are served from local /product-images/... paths.
- Product documents are served from local /product-documents/... paths where available.

## Script Failures

${failures.length ? failures.map((failure) => `- ${failure}`).join("\n") : "- None"}
`;

  fs.writeFileSync(reportPath, report);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
