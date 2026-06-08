import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const redirectsPath = path.join(root, "data", "product-catalog", "product-redirects.json");
const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
const redirects = JSON.parse(fs.readFileSync(redirectsPath, "utf8"));
const generatedAt = new Date().toISOString();

const categoryOnlyTitlePattern =
  /^(laborator \/ ivd|mobilier medical|instrumentar chirurgical|protectie operator|fizioterapie|ginecologie|sterilizare|lampi medicale|produs|echipament diagnostic|urgenta|monitorizare|dezinfectie|consumabile|baterie|cutie cu \d+)$/i;
const weakSlugPattern =
  /\b(product|equipment|device|chair|trolley|pack|bag|battery|adapter|cable|sheet|roll|paper|spare|replacement|single|double|stainless|steel|upper|lower|only|optional|medical-furniture|operator-protection|surgical-instruments|colour|wireless|glucose|patient|gowns|probe|cuff|sterilization|male|female|balloon|mlbox|catheter|suction|rectal|dark|box|ear|loops|relative|sensitivity)\b/i;
const englishPattern =
  /\b(product|equipment|device|chair|trolley|pack|bag|battery|adapter|cable|sheet|roll|paper|spare|replacement|single|double|stainless|steel|upper|lower|only|optional|nurse|watch|shoes|catheter|light|lamp|protective|surgical|furniture|physiotherapy|gynecology|sterilization|probe|sensor|cuff|gowns|gown|size|wrist|channel|patient|headlight|colour|deficiency|plates|paediatric|connector|mouthpiece|soap|sachet|bottle|cover|integrated|stand alone|wireless|blood|glucose|urine|drugs|cassette|strip|self|facemask|height|seal|absorbable|sutures|gauge|braided|pouches|adjustable|hydraulic|holder|tables|lifter|load|variable|treatment|rails|printer|cohesive|male|female|balloon|mlbox|suction|rectal|dark|box|ear loops|loops|relative|sensitivity|distributes|pressure|especially|diabetics|user|skin)\b/i;
const allowed = ["CE", "FDA", "ISO", "Bluetooth", "WiFi", "PACS", "RIS", "DICOM", "USB", "LED", "LCD", "ECG", "EKG", "SpO2", "AED", "IVD", "PVC", "ABS", "GIMA", "Omron", "Riester", "Sony", "Tuttnauer", "Edan", "Mindray", "Chison", "Philips", "Zoll", "Braun", "Ethicon", "Vicryl", "Cherokee", "Checkme", "Foley", "Nelaton"];

function stripDiacritics(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function decode(value) {
  return String(value || "")
    .replace(/&#x2b;/gi, "+")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function textForLeak(value) {
  let text = ` ${stripDiacritics(decode(value)).toLowerCase()} `;
  for (const term of allowed) text = text.replace(new RegExp(`\\b${stripDiacritics(term).toLowerCase()}\\b`, "g"), " ");
  return text;
}

function hasEnglishLeak(value) {
  return englishPattern.test(textForLeak(value));
}

const replacements = [
  [/\bMale Nelaton Cateter\b/gi, "Cateter Nelaton masculin"],
  [/\bFemale Nelaton Cateter\b/gi, "Cateter Nelaton feminin"],
  [/\bSuction Cateter\b/gi, "Cateter de aspiratie"],
  [/\bRectal Catheters\b/gi, "Catetere rectale"],
  [/\b2-way Foley Cateter\b/gi, "Cateter Foley cu 2 cai"],
  [/\b3-way Foley Cateter\b/gi, "Cateter Foley cu 3 cai"],
  [/\bCatheter\b/gi, "cateter"],
  [/\bCateter\b/gi, "cateter"],
  [/\bBalloon\b/gi, "balon"],
  [/\bMlbox\b/gi, "ml, cutie"],
  [/\bDark Greenbox\b/gi, "verde inchis, cutie"],
  [/\bDark Albastru\b/gi, "albastru inchis"],
  [/\bDark Verde\b/gi, "verde inchis"],
  [/\bEar Loops\b/gi, "elastice auriculare"],
  [/\bRelative Sensitivity\b/gi, "sensibilitate relativa"],
  [/\bGlucose\b/gi, "glucoza"],
  [/\bWireless\b/gi, "fara fir"],
  [/\bColour\b/gi, "color"],
  [/\bColor\b/gi, "color"],
  [/\bGowns\b/gi, "halate"],
  [/\bGown\b/gi, "halat"],
  [/\bProbe\b/gi, "sonda"],
  [/\bCuff\b/gi, "manseta"],
  [/\bSterilization\b/gi, "sterilizare"],
  [/\bSurgical\b/gi, "chirurgical"],
  [/\bBattery\b/gi, "baterie"],
  [/\bCable\b/gi, "cablu"],
  [/\bAdapter\b/gi, "adaptor"],
  [/\bSingle\b/gi, "simplu"],
  [/\bDouble\b/gi, "dublu"],
  [/\bBox\b/gi, "cutie"],
  [/\bPack\b/gi, "pachet"],
  [/\bStrip\b/gi, "banda"],
  [/\bCassette\b/gi, "caseta"],
  [/\bSelf Test\b/gi, "autotest"],
  [/\bTest\b/gi, "test"],
  [/\bMonitor\b/gi, "monitor"],
  [/\bPatient\b/gi, "pacient"],
  [/\bLight\b/gi, "lumina"],
  [/\bPrinter\b/gi, "imprimanta"],
  [/\bHolder\b/gi, "suport"],
  [/\bHydraulic\b/gi, "hidraulic"],
  [/\bAdjustable\b/gi, "reglabil"],
  [/\bHeight\b/gi, "inaltime"],
  [/\bFacemask\b/gi, "masca faciala"],
  [/\bMouthpiece\b/gi, "piesa bucala"],
  [/\bBlood\b/gi, "sange"],
  [/\bUrine\b/gi, "urina"],
  [/\bDrug\b/gi, "drog"],
  [/\bDrugs\b/gi, "droguri"],
  [/\bSensitivity\b/gi, "sensibilitate"],
  [/\bdistributes pressure\b/gi, "distribuie presiunea"],
  [/\bespecially\b/gi, "in special"],
  [/\bdiabetics\b/gi, "pacienti diabetici"],
  [/\bnurse\b/gi, "personal medical"],
  [/\buser\b/gi, "utilizator"],
  [/\bskin\b/gi, "piele"],
];

function cleanText(value) {
  let text = decode(value);
  for (const [pattern, replacement] of replacements) text = text.replace(pattern, replacement);
  return text
    .replace(/^\s*-\s*/, "")
    .replace(/\s*-\s*$/g, "")
    .replace(/\bCh\/fr\b/gi, "CH/FR")
    .replace(/\bCm\b/g, "cm")
    .replace(/\bMl\b/g, "ml")
    .replace(/\bXs\b/g, "XS")
    .replace(/\bXl\b/g, "XL")
    .replace(/\bXxl\b/g, "XXL")
    .replace(/\bXxxl\b/g, "XXXL")
    .replace(/\bBfe\b/g, "BFE")
    .replace(/\bPc\b/g, "PC")
    .replace(/\bBp\b/g, "BP")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function toTitleCase(value) {
  const keep = new Set(["GIMA", "CE", "FDA", "ISO", "USB", "LED", "LCD", "ECG", "EKG", "SpO2", "AED", "IVD", "PVC", "ABS", "CH/FR", "BFE", "PC", "BP", "Foley", "Nelaton"]);
  return cleanText(value)
    .split(" ")
    .filter(Boolean)
    .map((word, index) => {
      const clean = word.replace(/[,:;()]/g, "");
      if (keep.has(clean)) return word;
      if (index > 0 && /^(de|din|cu|si|sau|pentru|la|in|pe|fara|pana|cu|al|a)$/i.test(word)) return word.toLowerCase();
      return `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
    })
    .join(" ");
}

function slugify(value, code) {
  return `${stripDiacritics(cleanText(value))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 92)
    .replace(/-+$/g, "")}-${code}`.replace(/-{2,}/g, "-");
}

function categoryLabel(product) {
  const labels = {
    laboratory: "laborator / IVD",
    "surgical-instruments": "instrumentar chirurgical",
    "operator-protection": "protectie medicala",
    diagnostic: "diagnostic medical",
    monitoring: "monitorizare clinica",
    emergency: "urgenta",
    sterilization: "sterilizare",
    "medical-furniture": "mobilier medical",
  };
  return labels[product.category] || "echipamente medicale";
}

function rewriteDescription(product) {
  const title = product.romanianTitle;
  const category = categoryLabel(product);
  return `${title} este un produs din categoria ${category}, prezentat pentru cereri de oferta profesionale in clinici, cabinete, laboratoare sau unitati medicale. Pagina este structurata pentru cumparatori care trebuie sa identifice rapid codul produsului, imaginile, documentele si informatiile tehnice disponibile. ZESCORP poate verifica aplicatia, cantitatea, compatibilitatea cu produse similare si optiunile de livrare, service sau mentenanta inainte de ofertare.`;
}

function updatePublicCopy(product) {
  const title = product.romanianTitle;
  product.romanianShortSummary = `${title} pentru ${categoryLabel(product)}.`;
  product.romanianDescription = rewriteDescription(product);
  product.commercialDescription = product.romanianDescription;
  product.romanianApplications = [
    `Utilizare in fluxuri de ${categoryLabel(product)}.`,
    "Cereri de oferta pentru clinici, cabinete, spitale sau laboratoare.",
    "Completarea necesarului operational cu produse si accesorii compatibile.",
  ];
  product.romanianBenefits = [
    "Identificare clara prin titlu comercial si cod produs.",
    "Potrivit pentru comparatie cu produse similare si alternative disponibile.",
    "ZESCORP poate pregati oferta in functie de cantitate, aplicatie si termen.",
  ];
  const cleanArray = (items) => (items || []).map(cleanText).filter((item) => item && !hasEnglishLeak(item));
  product.romanianFeatures = cleanArray(product.romanianFeatures);
  product.romanianPackageContents = cleanArray(product.romanianPackageContents);
  product.installationConsiderations = cleanArray(product.installationConsiderations);
  product.maintenanceConsiderations = cleanArray(product.maintenanceConsiderations);
  product.serviceConsiderations = cleanArray(product.serviceConsiderations);
  product.romanianSpecifications = (product.romanianSpecifications || [])
    .map((item) => ({ label: cleanText(item.label), value: cleanText(item.value) }))
    .filter((item) => item.label && item.value && !hasEnglishLeak(`${item.label} ${item.value}`));
  product.specificationGroups = (product.specificationGroups || [])
    .map((group) => ({
      ...group,
      items: (group.items || [])
        .map((item) => ({ label: cleanText(item.label), value: cleanText(item.value) }))
        .filter((item) => item.label && item.value && !hasEnglishLeak(`${item.label} ${item.value}`)),
    }))
    .filter((group) => group.items.length);
  product.imageAlt = `${title} - imagine produs`;
  product.galleryImages = (product.galleryImages || []).map((image) => ({ ...image, alt: `${title} - imagine produs` }));
}

function hasBlockingIdentity(product) {
  const title = product.romanianTitle || "";
  return (
    !title ||
    title.length < 9 ||
    categoryOnlyTitlePattern.test(stripDiacritics(title)) ||
    /^\d+[a-z]?\s/i.test(stripDiacritics(title).toLowerCase()) ||
    hasEnglishLeak(title) ||
    hasEnglishLeak(product.slug) ||
    weakSlugPattern.test(product.slug || "")
  );
}

let repaired = 0;
let heldBack = 0;

for (const product of products.filter((item) => item.masterpieceStatus === "premium_ready")) {
  const beforeSlug = product.slug;
  product.romanianTitle = toTitleCase(product.romanianTitle || product.sourceProductName || product.id);
  product.slug = slugify(product.romanianTitle, product.gimaCode || product.id);
  if (beforeSlug && beforeSlug !== product.slug && !redirects.some((redirect) => redirect.source === `/produse/${beforeSlug}`)) {
    redirects.push({ source: `/produse/${beforeSlug}`, destination: `/produse/${product.slug}`, permanent: true });
  }
  updatePublicCopy(product);
  product.deployReadinessBlockers = [];
  if (hasBlockingIdentity(product) || hasEnglishLeak(product.romanianDescription)) {
    product.masterpieceStatus = "source_limited";
    product.publicDisplayReady = false;
    product.catalogStatus = "needs_review";
    product.deployReadinessBlockers = ["launch_identity_or_language_blocker"];
    product.launchAuditStatus = "held_back";
    product.launchAuditReason = "Product identity or public text still required manual review after final cleanup.";
    heldBack += 1;
  } else {
    product.launchAuditStatus = "cleaned";
    product.launchAuditCleanedAt = generatedAt;
    repaired += 1;
  }
}

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
fs.writeFileSync(redirectsPath, JSON.stringify(redirects, null, 2));
console.log(JSON.stringify({ repaired, heldBack }, null, 2));
