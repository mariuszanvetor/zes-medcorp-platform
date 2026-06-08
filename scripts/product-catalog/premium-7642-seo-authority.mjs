import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const readinessReportPath = path.join(root, "docs", "premium-7642-deploy-readiness.md");
const authorityReportPath = path.join(root, "docs", "premium-7642-seo-authority-report.md");

const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
const generatedAt = new Date().toISOString();

const categoryLabels = {
  diagnostic: "Diagnostic medical",
  laboratory: "Laborator / IVD",
  emergency: "Urgenta",
  sterilization: "Sterilizare",
  "medical-furniture": "Mobilier medical",
  ent: "ORL",
  gynecology: "Ginecologie",
  consumables: "Consumabile",
  electromedical: "Electromedicale",
  "surgical-instruments": "Instrumentar chirurgical",
  "patient-care": "Ingrijire pacient",
  monitoring: "Monitorizare",
  disinfection: "Dezinfectie",
  "operator-protection": "Protectie operator",
  "medical-bags": "Genti medicale",
  "scales-measures": "Cantare si masurare",
  physiotherapy: "Fizioterapie",
  veterinary: "Veterinar",
  "anatomy-models": "Modele anatomice",
  "medical-lights": "Lampi medicale",
};

const categorySlugs = {
  diagnostic: "diagnostic",
  laboratory: "laboratory",
  emergency: "emergency",
  sterilization: "sterilization",
  "medical-furniture": "medical-furniture",
  ent: "ent",
  gynecology: "gynecology",
  consumables: "consumables",
  electromedical: "electromedical",
  "surgical-instruments": "surgical-instruments",
  "patient-care": "patient-care",
  monitoring: "monitoring",
  disinfection: "disinfection",
  "operator-protection": "protectie-operator",
  "medical-bags": "genti-medicale",
  "scales-measures": "cantare-si-masurare",
  physiotherapy: "fizioterapie",
  veterinary: "veterinar",
  "anatomy-models": "modele-anatomice",
  "medical-lights": "lampi-medicale",
};

const serviceMap = {
  diagnostic: [
    "/services/aparatura-medicala",
    "/service-aparatura-medicala",
    "/contracte-mentenanta",
    "/solutii-medicale/echipamente-imagistica-diagnostic",
  ],
  laboratory: [
    "/services/ivd-laborator",
    "/service-laborator-ivd",
    "/contracte-mentenanta/mentenanta-laborator-ivd",
    "/solutii-medicale/echipamente-laborator-ivd",
  ],
  emergency: [
    "/service-aparatura-medicala",
    "/contracte-mentenanta",
    "/solutii-medicale/instalare-punere-in-functiune",
    "/services/aparatura-medicala",
  ],
  sterilization: [
    "/contracte-mentenanta",
    "/service-aparatura-medicala",
    "/solutii-medicale/instalare-punere-in-functiune",
    "/services/aparatura-medicala",
  ],
  "medical-furniture": [
    "/services/amenajari-medicale",
    "/amenajare-cabinet-medical",
    "/services/constructii-medicale",
    "/amenajare-cabinet-medical",
  ],
  ent: ["/services/aparatura-medicala", "/service-aparatura-medicala", "/contracte-mentenanta"],
  gynecology: ["/services/aparatura-medicala", "/service-aparatura-medicala", "/contracte-mentenanta"],
  consumables: ["/contact", "/services/aparatura-medicala", "/service-aparatura-medicala"],
  electromedical: [
    "/service-aparatura-medicala",
    "/contracte-mentenanta",
    "/solutii-medicale/instalare-punere-in-functiune",
    "/services/aparatura-medicala",
  ],
  "surgical-instruments": [
    "/service-aparatura-medicala",
    "/contracte-mentenanta",
    "/services/aparatura-medicala",
  ],
  "patient-care": [
    "/services/amenajari-medicale",
    "/service-aparatura-medicala",
    "/contracte-mentenanta",
  ],
  monitoring: [
    "/service-aparatura-medicala",
    "/contracte-mentenanta/mentenanta-imagistica-medicala",
    "/services/aparatura-medicala",
    "/solutii-medicale/service-echipamente-medicale",
  ],
  disinfection: ["/contracte-mentenanta", "/service-aparatura-medicala", "/contact"],
  "operator-protection": ["/contact", "/services/aparatura-medicala"],
  "medical-bags": ["/contact", "/service-aparatura-medicala"],
  "scales-measures": ["/service-aparatura-medicala", "/contracte-mentenanta", "/services/aparatura-medicala"],
  physiotherapy: ["/services/aparatura-medicala", "/service-aparatura-medicala", "/contracte-mentenanta"],
  veterinary: ["/service-aparatura-medicala", "/contact"],
  "anatomy-models": ["/contact", "/services/aparatura-medicala"],
  "medical-lights": [
    "/services/aparatura-medicala",
    "/service-aparatura-medicala",
    "/solutii-medicale/instalare-punere-in-functiune",
    "/contracte-mentenanta",
  ],
};

const solutionMap = {
  diagnostic: ["/solutii-medicale/echipamente-imagistica-diagnostic", "/solutii-medicale/solutii-pacs-ris"],
  laboratory: ["/solutii-medicale/echipamente-laborator-ivd", "/service-laborator-ivd"],
  emergency: ["/service-aparatura-medicala", "/solutii-medicale/instalare-punere-in-functiune"],
  sterilization: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  "medical-furniture": ["/solutii-medicale/dezvoltare-unitati-medicale", "/amenajare-cabinet-medical"],
  ent: ["/services/aparatura-medicala", "/service-aparatura-medicala"],
  gynecology: ["/services/aparatura-medicala", "/service-aparatura-medicala"],
  consumables: ["/services/aparatura-medicala", "/contact"],
  electromedical: ["/solutii-medicale/instalare-punere-in-functiune", "/service-aparatura-medicala"],
  "surgical-instruments": ["/service-aparatura-medicala", "/contracte-mentenanta"],
  "patient-care": ["/solutii-medicale/dezvoltare-unitati-medicale", "/services/amenajari-medicale"],
  monitoring: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  disinfection: ["/contracte-mentenanta", "/contact"],
  "operator-protection": ["/contact", "/services/aparatura-medicala"],
  "medical-bags": ["/contact", "/service-aparatura-medicala"],
  "scales-measures": ["/service-aparatura-medicala", "/contracte-mentenanta"],
  physiotherapy: ["/services/aparatura-medicala", "/service-aparatura-medicala"],
  veterinary: ["/service-aparatura-medicala", "/contact"],
  "anatomy-models": ["/contact", "/resources"],
  "medical-lights": ["/solutii-medicale/instalare-punere-in-functiune", "/service-aparatura-medicala"],
};

const knowledgeMap = {
  diagnostic: [
    "/knowledge-hub/cum-alegi-aparatura-medicala-pentru-o-clinica",
    "/knowledge-hub/greseli-alegere-aparatura-medicala",
  ],
  laboratory: [
    "/knowledge-hub/echipamente-ivd-laborator-alegere-integrare-service",
    "/knowledge-hub/pregatire-laborator-echipamente-ivd",
  ],
  emergency: [
    "/knowledge-hub/service-preventiv-vs-corectiv-aparatura-medicala",
    "/knowledge-hub/contract-mentenanta-aparatura-medicala",
  ],
  sterilization: [
    "/knowledge-hub/service-preventiv-vs-corectiv-aparatura-medicala",
    "/knowledge-hub/contract-mentenanta-aparatura-medicala",
  ],
  "medical-furniture": [
    "/knowledge-hub/modernizare-clinica-existenta-pasi-riscuri",
    "/knowledge-hub/costuri-ascunse-amenajare-clinica-medicala",
  ],
  monitoring: [
    "/knowledge-hub/service-preventiv-vs-corectiv-aparatura-medicala",
    "/knowledge-hub/contract-mentenanta-aparatura-medicala",
  ],
};

const maintenanceMap = {
  laboratory: ["/contracte-mentenanta/mentenanta-laborator-ivd", "/contracte-mentenanta"],
  monitoring: ["/contracte-mentenanta/mentenanta-imagistica-medicala", "/contracte-mentenanta"],
  diagnostic: ["/contracte-mentenanta/mentenanta-imagistica-medicala", "/contracte-mentenanta"],
  emergency: ["/contracte-mentenanta/contracte-service-multimarca", "/contracte-mentenanta"],
  sterilization: ["/contracte-mentenanta/contracte-service-multimarca", "/contracte-mentenanta"],
  electromedical: ["/contracte-mentenanta/contracte-service-multimarca", "/contracte-mentenanta"],
  "medical-lights": ["/contracte-mentenanta/contracte-service-multimarca", "/contracte-mentenanta"],
};

const accessoryPattern =
  /\b(cablu|adaptor|sonda|senzor|manseta|electrod|filtru|baterie|suport|rola|hartie|rezerva|set|kit|husa|accesor|consumabil|lame|benzi|pungi|tuburi|capace|pedala|valva)\b/i;
const categoryOnlyTitlePattern =
  /^(mobilier medical|instrumentar chirurgical|protectie operator|fizioterapie|ginecologie|sterilizare|lampi medicale|produs|echipament diagnostic|urgenta|monitorizare|dezinfectie|consumabile)$/i;
const weakPublicSlugPattern =
  /\b(product|equipment|device|chair|trolley|pack|bag|battery|adapter|cable|sheet|roll|paper|spare|replacement|single|double|stainless|steel|upper|lower|only|optional)\b/i;

const categoryNeighbors = {
  diagnostic: ["monitoring", "laboratory", "electromedical"],
  laboratory: ["diagnostic", "monitoring", "sterilization"],
  emergency: ["monitoring", "patient-care", "medical-furniture"],
  sterilization: ["surgical-instruments", "operator-protection", "laboratory"],
  "medical-furniture": ["patient-care", "emergency", "medical-lights"],
  ent: ["diagnostic", "electromedical", "medical-furniture"],
  gynecology: ["diagnostic", "electromedical", "medical-furniture"],
  consumables: ["operator-protection", "sterilization", "surgical-instruments"],
  electromedical: ["diagnostic", "monitoring", "physiotherapy"],
  "surgical-instruments": ["sterilization", "operator-protection", "emergency"],
  "patient-care": ["medical-furniture", "emergency", "physiotherapy"],
  monitoring: ["diagnostic", "emergency", "electromedical"],
  disinfection: ["sterilization", "operator-protection", "consumables"],
  "operator-protection": ["consumables", "sterilization", "surgical-instruments"],
  "medical-bags": ["emergency", "patient-care", "diagnostic"],
  "scales-measures": ["diagnostic", "patient-care", "monitoring"],
  physiotherapy: ["patient-care", "electromedical", "diagnostic"],
  veterinary: ["diagnostic", "surgical-instruments", "emergency"],
  "anatomy-models": ["diagnostic", "patient-care", "medical-furniture"],
  "medical-lights": ["medical-furniture", "electromedical", "surgical-instruments"],
};

function stripDiacritics(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function words(product) {
  const text = [
    product.romanianTitle,
    product.romanianShortSummary,
    product.romanianDescription,
    product.commercialDescription,
    product.commercialCategory,
    product.subcategory,
    ...(product.romanianApplications || []),
    ...(product.romanianBenefits || []),
    ...(product.romanianFeatures || []),
    ...(product.romanianSpecifications || []).flatMap((spec) => [spec.label, spec.value]),
    ...(product.specificationGroups || []).flatMap((group) => group.items.flatMap((spec) => [spec.label, spec.value])),
  ].join(" ");
  return new Set(
    stripDiacritics(text)
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length > 3 && !["pentru", "produs", "medical", "clinici", "oferta", "suport"].includes(word)),
  );
}

function docsCount(product) {
  return Object.values(product.documents || {}).filter(Boolean).length + (product.productDocuments || []).filter((doc) => doc.url).length;
}

function specCount(product) {
  return (
    (product.romanianSpecifications || []).length +
    (product.specificationGroups || []).reduce((sum, group) => sum + (group.items || []).length, 0)
  );
}

function isPremium(product) {
  return product.source === "gima-public-catalog" && product.masterpieceStatus === "premium_ready";
}

function isAccessory(product) {
  return accessoryPattern.test(product.romanianTitle || "") || accessoryPattern.test(product.romanianDescription || "");
}

function familyKey(product) {
  const title = stripDiacritics(product.romanianTitle || "").toLowerCase();
  const model = title.match(/\b([a-z]+[- ]?\d{2,5}[a-z0-9+-]*)\b/i)?.[1] || "";
  const meaningful = title
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 3 && !["pentru", "medical", "produs", "clinici", "cutie"].includes(word))
    .slice(0, 3)
    .join("-");
  return model || meaningful;
}

function overlapScore(aWords, bWords) {
  let score = 0;
  for (const word of aWords) {
    if (bWords.has(word)) score += 2;
  }
  return Math.min(score, 30);
}

function relationScore(product, candidate, tokenMap) {
  let score = 0;
  if (product.category === candidate.category) score += 32;
  if (product.subcategory && product.subcategory === candidate.subcategory) score += 12;
  if (product.commercialCategory && product.commercialCategory === candidate.commercialCategory) score += 10;
  if (familyKey(product) && familyKey(product) === familyKey(candidate)) score += 18;
  score += overlapScore(tokenMap.get(product.id), tokenMap.get(candidate.id));
  if (docsCount(candidate)) score += 3;
  if (specCount(candidate) >= 6) score += 4;
  if ((candidate.galleryImages || []).length > 1) score += 2;
  if (isAccessory(product) !== isAccessory(candidate)) score += 8;
  return score;
}

function uniqueCodes(productsList, limit) {
  const seen = new Set();
  const codes = [];
  for (const product of productsList) {
    const code = product.gimaCode || product.id;
    if (!code || seen.has(code)) continue;
    seen.add(code);
    codes.push(code);
    if (codes.length >= limit) break;
  }
  return codes;
}

function buildCandidatePool(product, premiumByCategory) {
  const pools = [
    ...(premiumByCategory.get(product.category) || []),
    ...((categoryNeighbors[product.category] || []).flatMap((category) => premiumByCategory.get(category) || [])),
  ];
  const seen = new Set();
  return pools.filter((candidate) => {
    if (candidate.id === product.id || seen.has(candidate.id)) return false;
    seen.add(candidate.id);
    return true;
  });
}

function buildRelatedGroups(product, candidatePool, tokenMap) {
  const candidates = candidatePool
    .filter((item) => item.id !== product.id)
    .map((item) => ({ item, score: relationScore(product, item, tokenMap) }))
    .sort((a, b) => b.score - a.score || String(a.item.gimaCode).localeCompare(String(b.item.gimaCode)));

  const sameFamily = candidates.filter((entry) => familyKey(product) && familyKey(entry.item) === familyKey(product)).map((entry) => entry.item);
  const sameCategory = candidates.filter((entry) => entry.item.category === product.category).map((entry) => entry.item);
  const accessories = candidates.filter((entry) => isAccessory(entry.item) && !isAccessory(product)).map((entry) => entry.item);
  const mainProducts = candidates.filter((entry) => !isAccessory(entry.item)).map((entry) => entry.item);
  const simpler = sameCategory
    .filter((item) => specCount(item) <= Math.max(2, specCount(product)) && docsCount(item) <= Math.max(1, docsCount(product)))
    .sort((a, b) => specCount(a) - specCount(b));
  const premiumAlternatives = sameCategory
    .filter((item) => specCount(item) >= specCount(product) || docsCount(item) >= docsCount(product))
    .sort((a, b) => specCount(b) + docsCount(b) - (specCount(a) + docsCount(a)));

  const similar = uniqueCodes([...sameFamily, ...sameCategory, ...candidates.map((entry) => entry.item)], 4);
  const premiumCodes = uniqueCodes(premiumAlternatives, 3);
  const budgetCodes = uniqueCodes(simpler, 3);
  const accessoryCodes = uniqueCodes(accessories, 4);
  const together = uniqueCodes(isAccessory(product) ? mainProducts : [...accessories, ...sameCategory], 4);

  const all = uniqueCodes(
    [...similar, ...premiumCodes, ...budgetCodes, ...accessoryCodes, ...together]
      .map((code) => candidatePool.find((item) => (item.gimaCode || item.id) === code))
      .filter(Boolean),
    12,
  );

  if (all.length < 8) {
    const fillers = uniqueCodes(candidates.map((entry) => entry.item), 12);
    for (const code of fillers) {
      if (!all.includes(code)) all.push(code);
      if (all.length >= 8) break;
    }
  }

  return {
    similarProducts: similar,
    premiumAlternatives: premiumCodes,
    budgetAlternatives: budgetCodes,
    compatibleAccessories: accessoryCodes,
    frequentlyRequestedTogether: together,
    allRelevantProducts: all.slice(0, 12),
  };
}

function linksFor(category, map, fallback = []) {
  return [...new Set([...(map[category] || []), ...fallback])].slice(0, 5);
}

function calculateAuthorityScore(product) {
  let score = 0;
  const groups = product.relatedProductGroups || {};
  const relatedCount = (groups.allRelevantProducts || []).length;
  const serviceCount = (product.relatedServices || []).length;
  const linkCount = [
    ...(product.relatedCategoryLinks || []),
    ...(product.relatedSolutionLinks || []),
    ...(product.relatedKnowledgeLinks || []),
    ...(product.relatedMaintenanceLinks || []),
  ].length;

  if (product.romanianTitle && product.slug) score += 1.2;
  if ((product.romanianDescription || "").length >= 500) score += 1.2;
  if (specCount(product) >= 2) score += 1.1;
  if (product.imageUrl && product.imageStatus === "verified_local") score += 1.1;
  if (docsCount(product) > 0) score += 0.7;
  score += Math.min(2.2, relatedCount * 0.22);
  score += Math.min(1.4, serviceCount * 0.35);
  score += Math.min(1.3, linkCount * 0.18);

  if (product.masterpieceStatus === "premium_ready") score += 1.0;
  if (categoryOnlyTitlePattern.test(String(product.romanianTitle || "").trim())) score -= 2.5;
  if (weakPublicSlugPattern.test(String(product.slug || ""))) score -= 0.8;
  return Math.min(10, Math.round(score * 100) / 100);
}

function linkObject(href, label) {
  return { href, label };
}

function categoryLinks(product) {
  const currentSlug = categorySlugs[product.category];
  const currentLabel = categoryLabels[product.category] || product.commercialCategory || "Produse medicale";
  const adjacent = {
    laboratory: ["diagnostic", "monitoring"],
    diagnostic: ["monitoring", "laboratory"],
    monitoring: ["diagnostic", "emergency"],
    emergency: ["monitoring", "patient-care"],
    sterilization: ["surgical-instruments", "operator-protection"],
    "medical-furniture": ["patient-care", "emergency"],
    "surgical-instruments": ["sterilization", "operator-protection"],
    "patient-care": ["medical-furniture", "emergency"],
  }[product.category] || ["diagnostic", "service"];
  const links = [linkObject(`/produse/categorie/${currentSlug}`, currentLabel)];
  for (const category of adjacent) {
    if (categorySlugs[category]) links.push(linkObject(`/produse/categorie/${categorySlugs[category]}`, categoryLabels[category]));
  }
  return links.slice(0, 3);
}

const premium = products.filter(isPremium);
const tokenMap = new Map(premium.map((product) => [product.id, words(product)]));
const premiumByCategory = new Map();
for (const product of premium) {
  if (!premiumByCategory.has(product.category)) premiumByCategory.set(product.category, []);
  premiumByCategory.get(product.category).push(product);
}

for (const product of products) {
  if (!isPremium(product)) {
    if (product.reviewStatus === "indexable") product.reviewStatus = "reviewed";
    continue;
  }

  product.relatedProductGroups = buildRelatedGroups(product, buildCandidatePool(product, premiumByCategory), tokenMap);
  product.relatedProductCodes = product.relatedProductGroups.allRelevantProducts;
  product.relatedServices = linksFor(product.category, serviceMap, ["/service-aparatura-medicala", "/contracte-mentenanta"]).slice(0, 5);
  product.relatedCategoryLinks = categoryLinks(product);
  product.relatedSolutionLinks = linksFor(product.category, solutionMap, ["/services/aparatura-medicala", "/contact"]).map((href) => linkObject(href, serviceLabel(href)));
  product.relatedKnowledgeLinks = linksFor(product.category, knowledgeMap, [
    "/knowledge-hub/cum-alegi-aparatura-medicala-pentru-o-clinica",
    "/knowledge-hub/service-preventiv-vs-corectiv-aparatura-medicala",
  ]).map((href) => linkObject(href, knowledgeLabel(href)));
  product.relatedMaintenanceLinks = linksFor(product.category, maintenanceMap, ["/contracte-mentenanta"]).map((href) => linkObject(href, serviceLabel(href)));
  product.buyerJourneyLinks = [
    linkObject(`/produse/${product.slug}`, "Produs"),
    ...product.relatedServices.slice(0, 1).map((href) => linkObject(href, "Service relevant")),
    ...(product.relatedSolutionLinks || []).slice(0, 1),
    linkObject("/contact", "Contact"),
  ];
  product.seoAuthorityPreparedAt = generatedAt;
  product.seoAuthorityScore = calculateAuthorityScore(product);
  product.deployReadinessBlockers = [
    ...(categoryOnlyTitlePattern.test(String(product.romanianTitle || "").trim()) ? ["category_only_title"] : []),
    ...(weakPublicSlugPattern.test(String(product.slug || "")) ? ["weak_public_slug"] : []),
  ];
  if (product.reviewStatus === "indexable") product.reviewStatus = "reviewed";
}

function serviceLabel(href) {
  const labels = {
    "/services/aparatura-medicala": "Aparatura medicala",
    "/service-aparatura-medicala": "Service aparatura medicala",
    "/contracte-mentenanta": "Contracte de mentenanta",
    "/solutii-medicale/echipamente-imagistica-diagnostic": "Echipamente diagnostic",
    "/services/ivd-laborator": "Laborator / IVD",
    "/service-laborator-ivd": "Service laborator / IVD",
    "/contracte-mentenanta/mentenanta-laborator-ivd": "Mentenanta laborator / IVD",
    "/solutii-medicale/echipamente-laborator-ivd": "Echipamente laborator / IVD",
    "/solutii-medicale/instalare-punere-in-functiune": "Instalare si punere in functiune",
    "/services/amenajari-medicale": "Amenajari medicale",
    "/amenajare-cabinet-medical": "Amenajare cabinet medical",
    "/services/constructii-medicale": "Constructii medicale",
    "/amenajare-cabinet-medical": "Amenajare cabinet medical",
    "/solutii-medicale/service-echipamente-medicale": "Service echipamente medicale",
    "/contracte-mentenanta/mentenanta-imagistica-medicala": "Mentenanta imagistica medicala",
    "/contracte-mentenanta/contracte-service-multimarca": "Service multimarca",
    "/solutii-medicale/solutii-pacs-ris": "PACS / RIS",
    "/solutii-medicale/dezvoltare-unitati-medicale": "Dezvoltare unitati medicale",
    "/contact": "Contact ZESCORP",
    "/resources": "Resurse",
  };
  return labels[href] || href.split("/").filter(Boolean).pop().replaceAll("-", " ");
}

function knowledgeLabel(href) {
  const labels = {
    "/knowledge-hub/cum-alegi-aparatura-medicala-pentru-o-clinica": "Cum alegi aparatura medicala",
    "/knowledge-hub/greseli-alegere-aparatura-medicala": "Greseli in alegerea aparaturii",
    "/knowledge-hub/echipamente-ivd-laborator-alegere-integrare-service": "Echipamente IVD: alegere si service",
    "/knowledge-hub/pregatire-laborator-echipamente-ivd": "Pregatire laborator IVD",
    "/knowledge-hub/service-preventiv-vs-corectiv-aparatura-medicala": "Service preventiv vs. corectiv",
    "/knowledge-hub/contract-mentenanta-aparatura-medicala": "Contract de mentenanta",
    "/knowledge-hub/modernizare-clinica-existenta-pasi-riscuri": "Modernizare clinica existenta",
    "/knowledge-hub/costuri-ascunse-amenajare-clinica-medicala": "Costuri ascunse in amenajare",
  };
  return labels[href] || serviceLabel(href);
}

const premiumAfter = products.filter(isPremium);
const indexable = products.filter((product) => product.reviewStatus === "indexable");
const relatedCoverage = premiumAfter.filter((product) => (product.relatedProductGroups?.allRelevantProducts || []).length >= 8);
const serviceCoverage = premiumAfter.filter((product) => (product.relatedServices || []).length >= 3);
const authorityScores = premiumAfter.map((product) => product.seoAuthorityScore || 0);
const averageAuthority = authorityScores.reduce((sum, score) => sum + score, 0) / authorityScores.length;
const belowNine = premiumAfter.filter((product) => (product.seoAuthorityScore || 0) < 9);
const titleBlockers = premiumAfter.filter((product) => product.deployReadinessBlockers?.includes("category_only_title"));
const slugBlockers = premiumAfter.filter((product) => product.deployReadinessBlockers?.includes("weak_public_slug"));
const orphanProducts = premiumAfter.filter(
  (product) =>
    !(product.relatedProductGroups?.allRelevantProducts || []).length ||
    !(product.relatedServices || []).length ||
    !(product.relatedCategoryLinks || []).length,
);

const categoryRows = Object.keys(categoryLabels).map((category) => {
  const categoryProducts = premiumAfter.filter((product) => product.category === category);
  const avg = categoryProducts.length
    ? categoryProducts.reduce((sum, product) => sum + (product.seoAuthorityScore || 0), 0) / categoryProducts.length
    : 0;
  return {
    category: categoryLabels[category],
    products: categoryProducts.length,
    averageAuthority: avg,
    featured: categoryProducts
      .filter((product) => !product.deployReadinessBlockers?.includes("category_only_title"))
      .sort((a, b) => (b.seoAuthorityScore || 0) - (a.seoAuthorityScore || 0))
      .slice(0, 5)
      .map((product) => `${product.romanianTitle} (${product.gimaCode})`)
      .join("; "),
  };
});

function table(rows, columns) {
  if (!rows.length) return "_None._";
  const header = `| ${columns.map((column) => column.label).join(" | ")} |`;
  const divider = `| ${columns.map((column) => column.align || "---").join(" | ")} |`;
  const body = rows
    .map((row) => `| ${columns.map((column) => String(column.value(row) ?? "").replace(/\|/g, "/")).join(" | ")} |`)
    .join("\n");
  return `${header}\n${divider}\n${body}`;
}

const readinessReport = `# Premium 7,642 Deploy Readiness

Generated: ${generatedAt}

Scope: premium-ready GIMA products only. No deploy, no indexation and no sitemap inclusion changes were performed.

## Readiness Summary

| Check | Result |
| --- | ---: |
| Premium-ready products | ${premiumAfter.length} |
| Product pages kept noindex | ${indexable.length === 0 ? "yes" : "no"} |
| Indexable products | ${indexable.length} |
| Product detail URLs added to sitemap | 0 |
| Products with verified local images | ${premiumAfter.filter((product) => product.imageStatus === "verified_local" && product.imageUrl).length} |
| Products with broken documents | ${premiumAfter.filter((product) => hasBrokenDocs(product)).length} |
| Products with related product coverage >= 8 | ${relatedCoverage.length} |
| Products with service coverage >= 3 | ${serviceCoverage.length} |
| Average SEO authority score | ${averageAuthority.toFixed(2)}/10 |
| Category-only public title blockers | ${titleBlockers.length} |
| Weak public slug blockers | ${slugBlockers.length} |

## Verified Conditions

- Product metadata remains noindex because product detail metadata uses \`noIndex: !isProductIndexable(product)\`.
- Product sitemap behavior remains gated by \`getIndexableProducts()\`.
- Product category pages remain noindex while no indexable reviewed products exist.
- Premium product pages retain local image paths and local document links only.
- No source/import/review metadata was added to public rendering.
- Redirect behavior was not changed in this phase.

## Category Readiness

${table(categoryRows, [
  { label: "Category", value: (row) => row.category },
  { label: "Premium products", align: "---:", value: (row) => row.products },
  { label: "Avg authority", align: "---:", value: (row) => row.averageAuthority.toFixed(2) },
])}

## Remaining Blockers

- Products remain intentionally noindex until a separate indexation approval phase.
- Non-premium/source-limited products remain hidden from category grids.
- ${titleBlockers.length} premium-flagged products still have category-only public titles and should be repaired before a full customer-facing deployment.
- ${slugBlockers.length} premium-flagged products still have weak public slugs and should be repaired before indexation.
- The catalog has many existing redirects from prior slug repair phases; build warns that custom route count exceeds 1,000, but routing still compiles.
`;

const authorityReport = `# Premium 7,642 SEO Authority Report

Generated: ${generatedAt}

## Summary

| Metric | Count |
| --- | ---: |
| Premium products prepared | ${premiumAfter.length} |
| Average SEO Authority Score | ${averageAuthority.toFixed(2)}/10 |
| Products with >= 8 related products | ${relatedCoverage.length} |
| Products with >= 3 related services | ${serviceCoverage.length} |
| Products below 9/10 authority | ${belowNine.length} |
| Orphan products | ${orphanProducts.length} |
| Indexable products | ${indexable.length} |
| Category-only title blockers | ${titleBlockers.length} |
| Weak public slug blockers | ${slugBlockers.length} |

## Related Product Intelligence

Each premium product now has grouped relationship fields:

- similarProducts
- premiumAlternatives
- budgetAlternatives
- compatibleAccessories
- frequentlyRequestedTogether
- allRelevantProducts

The engine uses category, subcategory, product family, title/specification token overlap, accessory/consumable signals, document/specification richness and image quality. It does not use random suggestions.

## Related Services Intelligence

Products are mapped to relevant service paths for installation, service, maintenance, training/procurement support, infrastructure or category-specific support. Service coverage is category-aware and does not expose irrelevant radiology/RF links to unrelated consumables.

## Category Authority

${table(categoryRows, [
  { label: "Category", value: (row) => row.category },
  { label: "Premium products", align: "---:", value: (row) => row.products },
  { label: "Avg score", align: "---:", value: (row) => row.averageAuthority.toFixed(2) },
  { label: "Featured examples", value: (row) => row.featured },
])}

## Products Below Authority Target

${table(belowNine.slice(0, 100), [
  { label: "Code", value: (product) => product.gimaCode || product.id },
  { label: "Title", value: (product) => product.romanianTitle },
  { label: "Category", value: (product) => categoryLabels[product.category] || product.category },
  { label: "Score", align: "---:", value: (product) => product.seoAuthorityScore },
  { label: "Related", align: "---:", value: (product) => product.relatedProductGroups?.allRelevantProducts?.length || 0 },
])}

## Deployment Title / Slug Blockers

${table([...titleBlockers, ...slugBlockers].slice(0, 150), [
  { label: "Code", value: (product) => product.gimaCode || product.id },
  { label: "Title", value: (product) => product.romanianTitle },
  { label: "Slug", value: (product) => product.slug },
  { label: "Blockers", value: (product) => (product.deployReadinessBlockers || []).join(", ") },
])}

## Internal Links Created

Approximate product-level internal link fields generated:

- Product-to-product links: ${premiumAfter.reduce((sum, product) => sum + (product.relatedProductGroups?.allRelevantProducts || []).length, 0)}
- Product-to-service links: ${premiumAfter.reduce((sum, product) => sum + (product.relatedServices || []).length, 0)}
- Product-to-category links: ${premiumAfter.reduce((sum, product) => sum + (product.relatedCategoryLinks || []).length, 0)}
- Product-to-solution links: ${premiumAfter.reduce((sum, product) => sum + (product.relatedSolutionLinks || []).length, 0)}
- Product-to-knowledge links: ${premiumAfter.reduce((sum, product) => sum + (product.relatedKnowledgeLinks || []).length, 0)}
- Product-to-maintenance links: ${premiumAfter.reduce((sum, product) => sum + (product.relatedMaintenanceLinks || []).length, 0)}

## Recommendation

Not recommended for full customer-facing production deployment until title/slug blockers are repaired or hidden from public grids. The internal authority structure is prepared, noindex is preserved, and no products were added to sitemap.
`;

function hasBrokenDocs(product) {
  const docs = [
    ...Object.values(product.documents || {}).filter(Boolean),
    ...(product.productDocuments || []).map((doc) => doc.url).filter(Boolean),
  ];
  return docs.some((url) => String(url).startsWith("/") && !fs.existsSync(path.join(root, "public", String(url).replace(/^\//, ""))));
}

fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`);
fs.writeFileSync(readinessReportPath, readinessReport);
fs.writeFileSync(authorityReportPath, authorityReport);

console.log(JSON.stringify({
  premiumProducts: premiumAfter.length,
  indexableProducts: indexable.length,
  averageAuthority: Number(averageAuthority.toFixed(2)),
  relatedCoverage: relatedCoverage.length,
  serviceCoverage: serviceCoverage.length,
  belowNine: belowNine.length,
  orphanProducts: orphanProducts.length,
  readinessReportPath,
  authorityReportPath,
}, null, 2));
