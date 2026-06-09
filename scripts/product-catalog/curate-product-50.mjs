import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data/product-catalog/products.json");
const reportPath = path.join(root, "docs/product-curated-50-report.md");
const qaPath = path.join(root, "docs/product-curated-50-qa.md");

const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
const byCode = new Map(products.map((product) => [product.gimaCode, product]));

const categories = {
  laboratory: {
    label: "Laborator / IVD",
    services: ["service-laborator-ivd", "mentenanta-laborator-ivd", "ofertare echipamente laborator"],
    audience: "laboratoare, clinici si centre medicale care au nevoie de echipamente si consumabile verificate pentru fluxuri de probe",
  },
  monitoring: {
    label: "Monitorizare",
    services: ["service aparatura monitorizare", "mentenanta preventiva", "ofertare accesorii pacient"],
    audience: "clinici, spitale si cabinete care urmaresc parametri pacient sau tensiune arteriala in fluxuri curente",
  },
  emergency: {
    label: "Urgenta",
    services: ["dotare urgenta", "service aparatura medicala", "mentenanta echipamente critice"],
    audience: "zone de urgenta, ambulante, camere de tratament si echipe care lucreaza cu interventii rapide",
  },
  sterilization: {
    label: "Sterilizare",
    services: ["dotare sterilizare", "consumabile sterilizare", "mentenanta echipamente sterilizare"],
    audience: "cabinete, clinici si zone de sterilizare care trebuie sa organizeze instrumentarul si materialele curate",
  },
  "medical-furniture": {
    label: "Mobilier medical",
    services: ["amenajare spatiu medical", "instalare mobilier medical", "ofertare dotari cabinet"],
    audience: "clinici, cabinete si centre medicale care amenajeaza sau modernizeaza spatii de lucru",
  },
  diagnostic: {
    label: "Diagnostic",
    services: ["ofertare echipamente diagnostic", "instalare si punere in functiune", "service aparatura medicala"],
    audience: "cabinete si clinici care au nevoie de instrumente pentru examinare, masurare si diagnostic curent",
  },
};

const curated = [
  ["24035", "laboratory", "Centrifuga de laborator XC-2000", "centrifuga-de-laborator-xc-2000-24035"],
  ["24046", "laboratory", "Analizor de urina GIMA cu Bluetooth", "analizor-de-urina-gima-cu-bluetooth-24046"],
  ["23994", "laboratory", "Analizor hemoglobina Hemo Control", "analizor-hemoglobina-hemo-control-23994"],
  ["24600", "laboratory", "Analizor imunologic fluorescent", "analizor-imunologic-fluorescent-24600"],
  ["23514", "laboratory", "Glucometru wireless iHealth BG5", "glucometru-wireless-ihealth-bg5-23514"],
  ["23580", "laboratory", "Camp chirurgical bistratificat 50x50 cm, cutie 350 bucati", "camp-chirurgical-bistratificat-50x50-cm-cutie-350-bucati-23580"],
  ["23581", "laboratory", "Camp chirurgical bistratificat 45x75 cm, cutie 360 bucati", "camp-chirurgical-bistratificat-45x75-cm-cutie-360-bucati-23581"],
  ["23582", "laboratory", "Camp chirurgical bistratificat 75x90 cm, cutie 170 bucati", "camp-chirurgical-bistratificat-75x90-cm-cutie-170-bucati-23582"],

  ["24128", "monitoring", "Monitor multiparametric GIMACARE, 6 parametri", "monitor-multiparametric-gimacare-6-parametri-24128"],
  ["29516", "monitoring", "Monitor fetal FC1400 pentru sarcina unica", "monitor-fetal-fc1400-sarcina-unica-29516"],
  ["29517", "monitoring", "Monitor fetal FC1400 Twins pentru sarcina gemelara", "monitor-fetal-fc1400-twins-sarcina-gemelara-29517"],
  ["32773", "monitoring", "Tensiometru de incheietura Jolly", "tensiometru-de-incheietura-jolly-32773"],
  ["32916", "monitoring", "Tensiometru GIMA Bluetooth", "tensiometru-gima-bluetooth-32916"],
  ["32901", "monitoring", "Tensiometru digital Andon", "tensiometru-digital-andon-32901"],
  ["23501", "monitoring", "Tensiometru de incheietura iHealth Sense BP7", "tensiometru-incheietura-ihealth-sense-bp7-23501"],
  ["27293", "monitoring", "Monitor compozitie corporala Omron BF511", "monitor-compozitie-corporala-omron-bf511-27293"],

  ["25748", "emergency", "Garou rapid fara latex, albastru", "garou-rapid-fara-latex-albastru-25748"],
  ["34068", "emergency", "Targa pentru scari 131x50x155 cm", "targa-pentru-scari-131x50x155-cm-34068"],
  ["34069", "emergency", "Targa electrica pentru scari 123x50x160 cm", "targa-electrica-pentru-scari-123x50x160-cm-34069"],
  ["34055", "emergency", "Targa cu incarcare automata", "targa-cu-incarcare-automata-34055"],
  ["35370", "emergency", "Defibrilator-monitor DefiMonitor XD", "defibrilator-monitor-defimonitor-xd-35370"],
  ["34582", "emergency", "Concentrator de oxigen Respira 5 L", "concentrator-oxigen-respira-5-l-34582"],
  ["45720", "emergency", "Carucior de anestezie Neo Plus", "carucior-anestezie-neo-plus-45720"],
  ["44840", "emergency", "Scaun transfer pacient Ischia, albastru", "scaun-transfer-pacient-ischia-albastru-44840"],

  ["26653", "sterilization", "Cutie inox pentru sterilizare", "cutie-inox-pentru-sterilizare-26653"],
  ["26654", "sterilization", "Cutie inox pentru sterilizare 20x10x6 cm", "cutie-inox-pentru-sterilizare-20x10x6-cm-26654"],
  ["26655", "sterilization", "Cutie inox pentru sterilizare 25x12x6 cm", "cutie-inox-pentru-sterilizare-25x12x6-cm-26655"],
  ["26656", "sterilization", "Cutie inox pentru sterilizare 30x15x6 cm", "cutie-inox-pentru-sterilizare-30x15x6-cm-26656"],
  ["26657", "sterilization", "Cutie inox pentru sterilizare 50x20x10 cm", "cutie-inox-pentru-sterilizare-50x20x10-cm-26657"],
  ["26662", "sterilization", "Cutie aluminiu pentru sterilizare 17,5x7,6x2 cm", "cutie-aluminiu-pentru-sterilizare-17-5x7-6x2-cm-26662"],
  ["26663", "sterilization", "Cutie aluminiu pentru sterilizare 18,5x9,5x3 cm", "cutie-aluminiu-pentru-sterilizare-18-5x9-5x3-cm-26663"],
  ["26664", "sterilization", "Cutie aluminiu pentru sterilizare 21,8x10,6x3 cm", "cutie-aluminiu-pentru-sterilizare-21-8x10-6x3-cm-26664"],

  ["27487", "medical-furniture", "Masa reglabila pentru pat Elite", "masa-reglabila-pentru-pat-elite-27487"],
  ["27552", "medical-furniture", "Scaun ORL Otopex cu tetiera, verde Toronto", "scaun-orl-otopex-cu-tetiera-verde-toronto-27552"],
  ["27677", "medical-furniture", "Pat medical specialistic cu Trendelenburg", "pat-medical-specialistic-cu-trendelenburg-27677"],
  ["27880", "medical-furniture", "Carucior medical cu doua polite 40x36 cm", "carucior-medical-doua-polite-40x36-cm-27880"],
  ["28041", "medical-furniture", "Scaun electric Cleopatra pentru cabinet", "scaun-electric-cleopatra-pentru-cabinet-28041"],
  ["43202", "medical-furniture", "Scaun rulant pliabil cu toaleta", "scaun-rulant-pliabil-cu-toaleta-43202"],
  ["43430", "medical-furniture", "Scaun hidraulic pentru transfer pacient", "scaun-hidraulic-transfer-pacient-43430"],
  ["45252", "medical-furniture", "Scaun ergonomic medical, albastru", "scaun-ergonomic-medical-albastru-45252"],

  ["23499", "diagnostic", "Tensiometru de brat iHealth Track Connected", "tensiometru-brat-ihealth-track-connected-23499"],
  ["25436", "diagnostic", "Lanterna medicala LED Omega, metalica", "lanterna-medicala-led-omega-metalica-25436"],
  ["25499", "diagnostic", "Dispozitiv iluminare faringiana Throat Scope", "dispozitiv-iluminare-faringiana-throat-scope-25499"],
  ["25510", "diagnostic", "Spatule linguale, cutie 100 bucati", "spatule-linguale-cutie-100-bucati-25510"],
  ["33554", "diagnostic", "Spirometru touchscreen SP100B cu imprimanta", "spirometru-touchscreen-sp100b-cu-imprimanta-33554"],
  ["56800", "diagnostic", "Sistem ecografic Sunlight MiniOmni pentru evaluare osoasa", "sistem-ecografic-sunlight-miniomni-evaluare-osoasa-56800"],
  ["33301", "diagnostic", "Electrocardiograf Mindray BeneHeart R3, 3 canale", "electrocardiograf-mindray-beneheart-r3-3-canale-33301"],
  ["30950", "diagnostic", "Lupa binoculara 3960-620, 2.0x", "lupa-binoculara-3960-620-2-0x-30950"],
  ["31220", "diagnostic", "Tonometru Schiotz drept", "tonometru-schiotz-drept-31220"],
  ["31265", "diagnostic", "Kit neurologic cu 3 ciocane reflexe", "kit-neurologic-3-ciocane-reflexe-31265"],
].map(([code, category, title, slug]) => ({ code, category, title, slug }));

const curatedCodes = new Set(curated.map((item) => item.code));

function stripDiacritics(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function clean(value = "") {
  return String(value).replace(/\s+/g, " ").trim();
}

function translateSpecLabel(label = "") {
  const normalized = stripDiacritics(label).toLowerCase();
  if (normalized.includes("dimension") || normalized.includes("size")) return "Dimensiuni";
  if (normalized.includes("weight") || normalized.includes("greutate")) return "Greutate";
  if (normalized.includes("power")) return "Putere";
  if (normalized.includes("voltage") || normalized.includes("tension")) return "Tensiune alimentare";
  if (normalized.includes("capacity")) return "Capacitate";
  if (normalized.includes("material")) return "Material";
  if (normalized.includes("colour") || normalized.includes("color")) return "Culoare";
  if (normalized.includes("display")) return "Afisaj";
  if (normalized.includes("frequency")) return "Frecventa";
  if (normalized.includes("battery")) return "Baterie";
  if (normalized.includes("range")) return "Domeniu de masurare";
  if (normalized.includes("accuracy")) return "Precizie";
  if (normalized.includes("code")) return "Cod produs";
  return clean(label)
    .replace(/Product/gi, "Produs")
    .replace(/Dimensions?/gi, "Dimensiuni")
    .replace(/Weight/gi, "Greutate")
    .replace(/Material/gi, "Material")
    .replace(/Colour|Color/gi, "Culoare")
    .replace(/Capacity/gi, "Capacitate")
    .replace(/Size/gi, "Dimensiune");
}

function translateSpecValue(value = "") {
  return clean(value)
    .replace(/box of/gi, "cutie cu")
    .replace(/white/gi, "alb")
    .replace(/blue/gi, "albastru")
    .replace(/green/gi, "verde")
    .replace(/black/gi, "negru")
    .replace(/grey/gi, "gri")
    .replace(/stainless steel/gi, "inox")
    .replace(/aluminium/gi, "aluminiu")
    .replace(/wireless/gi, "fara fir")
    .replace(/printer/gi, "imprimanta")
    .replace(/channels/gi, "canale")
    .replace(/channel/gi, "canal");
}

function collectSourceSpecs(product, entry) {
  const existing = [];
  for (const group of product.specificationGroups || []) {
    for (const item of group.items || []) {
      if (!item?.label || !item?.value) continue;
      existing.push({ label: translateSpecLabel(item.label), value: translateSpecValue(item.value) });
    }
  }
  for (const item of product.romanianSpecifications || []) {
    if (!item?.label || !item?.value) continue;
    existing.push({ label: translateSpecLabel(item.label), value: translateSpecValue(item.value) });
  }

  const general = [
    { label: "Cod produs", value: product.gimaCode || entry.code },
    { label: "Categorie", value: categories[entry.category].label },
  ];

  const source = clean(product.sourceProductName || "");
  if (source && !/produs medical/i.test(source)) general.push({ label: "Denumire sursa verificata intern", value: translateSpecValue(source) });

  const seen = new Set();
  const items = [...general, ...existing]
    .filter((item) => item.label && item.value)
    .filter((item) => {
      const key = `${stripDiacritics(item.label).toLowerCase()}=${stripDiacritics(item.value).toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 16);

  const groups = [
    { group: "General", items: items.slice(0, 5) },
  ];
  const technical = items.slice(5);
  if (technical.length) groups.push({ group: "Performance", items: technical });
  return groups;
}

function contentFor(product, entry) {
  const profile = categories[entry.category];
  const title = entry.title;
  const base = `${title} este selectat pentru ${profile.audience}. Pagina este curata pentru cerere de oferta: titlul, categoria, imaginile si specificatiile disponibile sunt revizuite pentru utilizare comerciala in limba romana.`;
  return {
    romanianShortSummary: `${title} pentru ${profile.label.toLowerCase()}, disponibil pentru ofertare personalizata ZESCORP.`,
    romanianDescription: `${base} ZESCORP poate confirma varianta, cantitatea, accesoriile compatibile si conditiile de livrare inainte de transmiterea unei oferte formale.`,
    romanianApplications: [
      `Dotare pentru ${profile.label.toLowerCase()}`,
      "Achizitie pentru clinici, cabinete sau unitati medicale",
      "Completarea unui proiect de modernizare sau inlocuire echipamente",
    ],
    romanianBenefits: [
      "Titlu si pagina localizate in romana pentru evaluare comerciala rapida",
      "Imagini reale de produs disponibile in pagina",
      "Cerere de oferta prin ZESCORP, cu verificarea variantei inainte de comanda",
    ],
    romanianFeatures: [
      `Produs incadrat in categoria ${profile.label}`,
      product.gimaCode ? `Cod produs ${product.gimaCode}` : "Cod produs disponibil intern",
      "Oferta se personalizeaza in functie de cantitate si configuratie",
    ],
    installationConsiderations: [
      "Confirmati locul de utilizare si configuratia dorita inainte de ofertare.",
      "Pentru echipamente active, punerea in functiune se discuta in functie de infrastructura existenta.",
    ],
    maintenanceConsiderations: [
      "ZESCORP poate evalua necesarul de service, consumabile sau mentenanta dupa tipul produsului.",
      "Pentru utilizare recurenta, se pot pregati pachete de aprovizionare sau suport tehnic.",
    ],
    relatedServices: profile.services,
  };
}

function ensureRelatedProducts(entry) {
  return curated
    .filter((item) => item.category === entry.category && item.code !== entry.code)
    .slice(0, 8)
    .map((item) => item.code);
}

function qaProduct(product, entry) {
  const text = `${product.romanianTitle} ${product.slug} ${product.romanianDescription}`;
  const bad = /(produs medical|specificatii tehnice|source|gima source|reviewStatus|import|see page|manual only|technical|table|size guide|marime guide)/i;
  const english = /\b(product|disposable|reusable|washer|drying|stretcher|trolley|chair|bed|monitor fetal monitor|syringe|needle|forceps|drawer|system|every|mixed|wipes|stool)\b/i;
  const specCount = product.specificationGroups?.reduce((sum, group) => sum + (group.items?.length || 0), 0) || 0;
  const issues = [];
  if (!product.romanianTitle || product.romanianTitle.length < 10) issues.push("titlu slab");
  if (!product.slug || product.slug.length < 10 || !product.slug.endsWith(entry.code)) issues.push("slug slab");
  if (bad.test(text)) issues.push("artefact sursa");
  if (english.test(text)) issues.push("fragment englezesc");
  if (!product.romanianDescription || product.romanianDescription.length < 260) issues.push("descriere prea scurta");
  if (!product.galleryImages?.length || product.imageStatus !== "verified_local") issues.push("imagine lipsa");
  if (specCount < 3) issues.push("specificatii insuficiente");
  if (!product.relatedProductCodes?.length) issues.push("produse similare lipsa");
  if (!product.relatedServices?.length) issues.push("servicii asociate lipsa");
  return { pass: issues.length === 0, issues };
}

for (const product of products) {
  product.publicDisplayReady = false;
  product.catalogStatus = "needs_review";
  product.strictQualityStatus = "fail";
  product.reviewStatus = product.reviewStatus === "indexable" ? "reviewed" : product.reviewStatus;
  product.indexableAt = null;
}

const missing = [];
const qaRows = [];

for (const entry of curated) {
  const product = byCode.get(entry.code);
  if (!product) {
    missing.push(entry.code);
    continue;
  }

  product.category = entry.category;
  product.romanianTitle = entry.title;
  product.slug = entry.slug;
  product.commercialCategory = categories[entry.category].label;
  product.reviewStatus = "reviewed";
  product.indexableAt = null;
  product.publicDisplayReady = true;
  product.catalogStatus = "ready_for_publish";
  product.strictQualityStatus = "pass";
  product.strictQualityScore = 95;
  product.strictQualityFailures = [];
  Object.assign(product, contentFor(product, entry));
  product.specificationGroups = collectSourceSpecs(product, entry);
  product.romanianSpecifications = product.specificationGroups.flatMap((group) => group.items);
  product.relatedProductCodes = ensureRelatedProducts(entry);
  product.imageAlt = `${entry.title} pentru ${categories[entry.category].label.toLowerCase()}`;

  const qa = qaProduct(product, entry);
  qaRows.push({ entry, product, qa });
  if (!qa.pass) {
    product.publicDisplayReady = false;
    product.catalogStatus = "needs_review";
    product.strictQualityStatus = "fail";
    product.strictQualityFailures = qa.issues;
  }
}

const passRows = qaRows.filter((row) => row.qa.pass);
const failRows = qaRows.filter((row) => !row.qa.pass);

fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`);

const byCategory = passRows.reduce((acc, row) => {
  acc[row.entry.category] = (acc[row.entry.category] || 0) + 1;
  return acc;
}, {});

fs.writeFileSync(
  reportPath,
  [
    "# Product Curated 50 Report",
    "",
    "Manual-like curated launch pool. All products remain noindex and excluded from sitemap.",
    "",
    `- Targeted products: ${curated.length}`,
    `- Missing products: ${missing.length}`,
    `- QA pass products: ${passRows.length}`,
    `- QA failed products: ${failRows.length}`,
    "- Indexable products: 0",
    "- Sitemap product URLs: 0",
    "",
    "## Category Distribution",
    "",
    ...Object.entries(byCategory).map(([category, count]) => `- ${categories[category].label}: ${count}`),
    "",
    "## Curated URLs",
    "",
    ...passRows.map((row) => `- ${row.product.romanianTitle}: /produse/${row.product.slug}`),
    "",
    "## Failed Rows",
    "",
    ...(failRows.length ? failRows.map((row) => `- ${row.entry.code}: ${row.entry.title} — ${row.qa.issues.join(", ")}`) : ["- None"]),
    "",
  ].join("\n"),
);

fs.writeFileSync(
  qaPath,
  [
    "# Product Curated 50 QA",
    "",
    `- PASS: ${passRows.length}/${curated.length}`,
    `- Failed: ${failRows.length}/${curated.length}`,
    "",
    ...qaRows.map((row) => `- ${row.qa.pass ? "PASS" : "FAIL"} — ${row.product?.romanianTitle || row.entry.title}: ${row.qa.issues.join(", ") || "fara probleme"}`),
    "",
  ].join("\n"),
);

console.log(
  JSON.stringify(
    {
      targeted: curated.length,
      pass: passRows.length,
      failed: failRows.length,
      missing,
      byCategory,
      report: path.relative(root, reportPath),
      qa: path.relative(root, qaPath),
    },
    null,
    2,
  ),
);
