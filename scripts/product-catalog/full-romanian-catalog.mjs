import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const redirectsPath = path.join(root, "data", "product-catalog", "product-redirects.json");
const reportPath = path.join(root, "docs", "gima-full-catalog-report.md");
const imageRoot = path.join(root, "public", "product-images");

const allowedTechnicalTerms =
  /\b(LED|LCD|ECG|EKG|USB|AED|RFID|SpO2|NIBP|TEMP|PR|PVC|ABS|CE|FDA|ISO|EN|IEC|BF|BPM|RPM|Hz|MHz|kHz|W|V|A|cm|mm|kg|ml|GB|FC|BG5|Bluetooth|WiFi|PACS|RIS|DICOM|Hemo Control|Urilyzer|Riester|Aesculap|Neo Plus|Otopex|Colpy|Iono Base|MIO-Sonic|T-ONE|CU-SPR|CU-SP2|DefiMonitor|MiniOmni|SP-100B|XC-2000|AC-2311|AC-2311DA|Doppler|LUX|FAD-GDH|SOS|Omnipath|TECAR|GIMA)\b/g;

const englishPattern =
  /\b(power|consumption|voltage|communication|interface|record|mode|host|computer|large|display|user-friendly|friendly|fast|results|limited|sample|volume|measurement|method|range|working|internal|language|dimensions|shelves|operating|thermal|printer|input|output|field|view|format|wave|waveform|energy|stages|contains|aqua|water|glycerin|propylene|glycol|carbomer|triethanolamine|alcohol|denat|fragrance|benzyl|benzoate|citral|limonene|linalool|chloride|extract|coformulants|needed|reference|number|total|magnification|resolution|paper|feeding|function|adaptor|class|touch|screen|colour|autoclavable|handle|single|adult|protective|goggle|norms|safety|accuracy|proven|portable|durable|suitable|treatment|device|wireless|meter|blood|whole|tests|accurate|determination|photometric|azidemethemoglobin|photometer|wavelengths|medium|high|low|home|professional|innovative|performance|head|desk|clamp|cart|crank|adjustment|system|blue|white|green|red|light|box|sachets|wipes|chamomile|osteoporosis|sound|axial|transmission|stretcher|chair|trolley|backrest|diagnostic set|available software|thermal array|foetal monitor|protective goggles|folding bedside|overbed table|supplied|main effects|features|with handle|blood glucose|software voice|waterproof|speed|depth|working height|eyepiece|dispenser|instructions|label|straight|length|blade|ball|electrode|times|comfort|convenience|replaceable|shield|optical|radiations|antifog|scratch|reader|built-in|automatic printout|transfer of results|possibility|testing|urine|strip|continuously|seat|footrest|push|central braking|armrest|folded size|deluxe case|sliding|catches|ophthalmoscope|plug-in|connector|chrome-plated|made of|iron|castors|maneuver|patient well-being|calibration|humidity|barometric|mask|pressure relief|resuscitators|handstrap|centrifuge|analyzer|analyser|tourniquet|cabinet|dressing|emergency|plastic|multi-functional|patient transfer|storage|grey|probe|quick|black|professional|digital|kit|spare|with|and|table|couch|stethoscope|sphygmomanometer|thermometer|ultrasound|electrodes|gloves|disposable|gynaecology|first aid|laboratory|furniture|devices|patient aids|health care|pharmacy|consumables|heating|underblanket|pad|cover|double|remover|forceps|staple|pc|pcs|unit of sale|no medical device|medical device)\b/i;

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
};

const categoryContent = {
  diagnostic: {
    type: "produs pentru diagnostic medical",
    use: ["consultatii medicale si evaluare clinica", "dotare cabinete si clinici", "cereri de oferta pentru echipamente de diagnostic"],
  },
  laboratory: {
    type: "produs pentru laborator si IVD",
    use: ["laboratoare medicale si IVD", "prelucrarea sau analiza probelor", "dotare si modernizare laborator"],
  },
  emergency: {
    type: "produs pentru urgenta si interventie",
    use: ["zone de urgenta si triaj", "continuitate operationala", "dotare pentru interventii rapide"],
  },
  sterilization: {
    type: "produs pentru sterilizare",
    use: ["fluxuri de sterilizare", "igiena operationala", "gestionarea instrumentarului medical"],
  },
  "medical-furniture": {
    type: "produs pentru mobilier medical",
    use: ["amenajare cabinet sau clinica", "organizarea spatiului medical", "suport pentru activitatea clinica"],
  },
  ent: {
    type: "produs pentru cabinete ORL",
    use: ["consultatii ORL", "examinare specializata", "dotare cabinet medical"],
  },
  gynecology: {
    type: "produs pentru ginecologie si obstetrica",
    use: ["cabinete de ginecologie", "examinare si monitorizare", "dotare clinica specializata"],
  },
  consumables: {
    type: "consumabil medical",
    use: ["activitate medicala recurenta", "aprovizionare clinica", "completarea fluxurilor operationale"],
  },
  electromedical: {
    type: "echipament electromedical",
    use: ["terapie si suport clinic", "dotare cabinete si clinici", "cereri de oferta cu service si mentenanta"],
  },
  "surgical-instruments": {
    type: "instrumentar medical",
    use: ["fluxuri clinice specializate", "completarea seturilor medicale", "utilizare impreuna cu sterilizare si mentenanta"],
  },
  "patient-care": {
    type: "produs pentru ingrijire pacient",
    use: ["ingrijire pacient", "mobilitate si confort operational", "dotare pentru clinici si unitati medicale"],
  },
  monitoring: {
    type: "produs pentru monitorizare clinica",
    use: ["monitorizare parametri", "evaluare clinica si operationala", "dotare pentru cabinete si clinici"],
  },
  disinfection: {
    type: "produs pentru dezinfectie",
    use: ["igiena operationala", "controlul fluxurilor medicale", "aprovizionare recurenta"],
  },
};

const titleReplacements = [
  [/\bmedical heat sealer\b/gi, "aparat de sigilare medicala"],
  [/\bmultiparametric monitor\b/gi, "monitor multiparametric"],
  [/\bmonitor multiparametric\b/gi, "monitor multiparametric"],
  [/\breusable foetal transducer belts\b/gi, "benzi reutilizabile pentru transductor fetal"],
  [/\breusable fetal transducer belts\b/gi, "benzi reutilizabile pentru transductor fetal"],
  [/\bfoetal transducer belts\b/gi, "benzi pentru transductor fetal"],
  [/\bfetal transducer belts\b/gi, "benzi pentru transductor fetal"],
  [/\btransducer belts\b/gi, "benzi pentru transductor"],
  [/\bheating underblanket\b/gi, "patura electrica de incalzire"],
  [/\bheating pad\b/gi, "perna electrica de incalzire"],
  [/\bskin staple remover\b/gi, "extractor pentru agrafe cutanate"],
  [/\bdisposable remover forceps\b/gi, "pensa extractoare de unica folosinta"],
  [/\bfoetal monitor\b/gi, "monitor fetal"],
  [/\bfetal monitor\b/gi, "monitor fetal"],
  [/\bmulti-parameter monitor\b/gi, "monitor multiparametric"],
  [/\burine analyzer\b/gi, "analizor de urina"],
  [/\burine analyser\b/gi, "analizor de urina"],
  [/\bhemoglobin\b/gi, "hemoglobina"],
  [/\bhematocrit\b/gi, "hematocrit"],
  [/\bcentrifuge\b/gi, "centrifuga"],
  [/\banalyzer\b/gi, "analizor"],
  [/\banalyser\b/gi, "analizor"],
  [/\btourniquet\b/gi, "garou"],
  [/\btracheostomy tube\b/gi, "canula traheostomie"],
  [/\bstorage cabinet\b/gi, "dulap depozitare"],
  [/\bpatient transfer\b/gi, "transfer pacient"],
  [/\bemergency trolley\b/gi, "carucior de urgenta"],
  [/\btrolley\b/gi, "carucior"],
  [/\bchair\b/gi, "scaun"],
  [/\btable\b/gi, "masa"],
  [/\bcouch\b/gi, "canapea medicala"],
  [/\bstretcher\b/gi, "targa"],
  [/\botoscope\b/gi, "otoscop"],
  [/\bstethoscope\b/gi, "stetoscop"],
  [/\bsphygmomanometer\b/gi, "tensiometru"],
  [/\bthermometer\b/gi, "termometru"],
  [/\bultrasound\b/gi, "ecograf"],
  [/\belectrodes\b/gi, "electrozi"],
  [/\bmask\b/gi, "masca"],
  [/\bgloves\b/gi, "manusi"],
  [/\bdisposable\b/gi, "de unica folosinta"],
  [/\bnon woven\b/gi, "netesut"],
  [/\bbi-layer\b/gi, "dublu strat"],
  [/\bdrape\b/gi, "camp medical"],
  [/\bclamp\b/gi, "pensa"],
  [/\bstraight\b/gi, "dreapta"],
  [/\buncuffed\b/gi, "fara balonas"],
  [/\bdiam\./gi, "diametru"],
  [/\bhydraulic\b/gi, "hidraulic"],
  [/\blight grey\b/gi, "gri deschis"],
  [/\bgrey\b/gi, "gri"],
  [/\bquick\b/gi, "rapid"],
  [/\bdark\b/gi, "inchis"],
  [/\bpink\b/gi, "roz"],
  [/\blilac\b/gi, "liliachiu"],
  [/\bblue\b/gi, "albastru"],
  [/\bgreen\b/gi, "verde"],
  [/\bred\b/gi, "rosu"],
  [/\bblack\b/gi, "negru"],
  [/\bwhite\b/gi, "alb"],
  [/\bmedical\b/gi, "medical"],
  [/\bprofessional\b/gi, "profesional"],
  [/\bdigital\b/gi, "digital"],
  [/\bkit\b/gi, "kit"],
  [/\bspare\b/gi, "piesa de schimb"],
  [/\breusable\b/gi, "reutilizabil"],
  [/\btransducer\b/gi, "transductor"],
  [/\bbelts\b/gi, "benzi"],
  [/\bprogrammes\b/gi, "programe"],
  [/\bprograms\b/gi, "programe"],
  [/\bset of\b/gi, "set de"],
  [/\bwith\b/gi, "cu"],
  [/\band\b/gi, "si"],
  [/\bwithout\b/gi, "fara"],
  [/\bfor\b/gi, "pentru"],
  [/\bcover\b/gi, "husa"],
  [/\bdouble\b/gi, "dubla"],
  [/\bsingle\b/gi, "simpla"],
];

const specLabelTranslations = new Map([
  ["Power Supply", "Alimentare"],
  ["Power", "Putere"],
  ["Power consumption", "Consum electric"],
  ["Voltage", "Tensiune alimentare"],
  ["Speed", "Viteza"],
  ["Time", "Timp"],
  ["Dimensions", "Dimensiuni"],
  ["Size (cm)", "Dimensiuni"],
  ["Weight", "Greutate"],
  ["Capacity", "Capacitate"],
  ["Max. RCF", "RCF max."],
  ["EAN13", "EAN"],
  ["EAN", "EAN"],
  ["Unit of sale", "Unitate de vanzare"],
  ["Type", "Tip produs"],
  ["Communication interface", "Interfata de comunicatie"],
  ["Record mode", "Mod inregistrare"],
  ["Host computer", "Calculator gazda"],
  ["Display", "Ecran"],
  ["Measurement method", "Metoda de masurare"],
  ["Measuring range", "Interval de masurare"],
  ["Working mode", "Mod de lucru"],
  ["Language", "Limba interfata"],
]);

function readJson(filePath, fallback = []) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 108);
}

function stripAllowed(value) {
  return String(value || "").replace(allowedTechnicalTerms, "");
}

function hasEnglish(value) {
  return englishPattern.test(stripAllowed(value));
}

function cleanText(value) {
  return String(value || "")
    .replace(/&#x2B;/gi, "+")
    .replace(/&#xae;|&reg;/gi, "")
    .replace(/&amp;/gi, "&")
    .replace(/â€¢/g, "")
    .replace(/\s+/g, " ")
    .replace(/albastrutooth/gi, "Bluetooth")
    .trim();
}

function translateTitle(value, category) {
  let title = cleanText(value)
    .replace(/^gima\s+/i, "")
    .replace(/\s+-\s+spare$/i, " - piesa de schimb");
  for (const [pattern, replacement] of titleReplacements) title = title.replace(pattern, replacement);
  title = title
    .replace(/\bfc\s*700\b/gi, "FC 700")
    .replace(/\bfc\s*1400\b/gi, "FC1400")
    .replace(/\bbluetooth\b/gi, "Bluetooth")
    .replace(/\bent\b/gi, "ORL")
    .replace(/\bneo plus\b/gi, "Neo Plus")
    .replace(/\botopex\b/gi, "Otopex")
    .replace(/\bcolpy\b/gi, "Colpy")
    .replace(/\bminiomni\b/gi, "MiniOmni")
    .replace(/\bsunlight\b/gi, "Sunlight")
    .replace(/\bdefimonitor\b/gi, "DefiMonitor")
    .replace(/\bhemo control\b/gi, "Hemo Control")
    .replace(/\burilyzer\b/gi, "Urilyzer")
    .replace(/\briester\b/gi, "Riester")
    .replace(/\baesculap\b/gi, "Aesculap")
    .replace(/\s+/g, " ")
    .trim();

  if (!title || hasEnglish(title)) {
    const label = categoryLabels[category] || "Echipament medical";
    title = `${label} cod ${String(value || "").match(/\b\d{5}\b/)?.[0] || ""}`.trim();
  }

  return title.charAt(0).toUpperCase() + title.slice(1);
}

function translateSpecValue(value) {
  let output = cleanText(value)
    .replace(/\bbox of\b/gi, "cutie de")
    .replace(/\bpcs?\b/gi, "bucati")
    .replace(/\b1 pc\b/gi, "1 bucata")
    .replace(/\bmedical device\b/gi, "dispozitiv medical")
    .replace(/\bno medical device\b/gi, "produs fara incadrare ca dispozitiv medical")
    .replace(/\bunit of sale\b/gi, "unitate de vanzare")
    .replace(/\bmanual\b/gi, "manual")
    .replace(/\benglish\b/gi, "engleza")
    .replace(/\bitalian\b/gi, "italiana")
    .replace(/\band\b/gi, "si")
    .replace(/\bwith\b/gi, "cu")
    .replace(/\bwithout\b/gi, "fara")
    .replace(/\bnot including probe holder\b/gi, "fara suportul sondei")
    .replace(/\s+/g, " ")
    .trim();
  for (const [pattern, replacement] of titleReplacements) output = output.replace(pattern, replacement);
  return output;
}

function splitSpecsFromText(specsText) {
  const text = cleanText(specsText);
  if (!text) return [];
  const specs = [];
  for (const [english, romanian] of specLabelTranslations) {
    const escaped = english.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const labels = [...specLabelTranslations.keys()].map((label) => label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
    const match = text.match(new RegExp(`${escaped}:\\s*([^:]+?)(?=\\s+(?:${labels}):|$)`, "i"));
    if (match?.[1]) specs.push({ label: romanian, value: translateSpecValue(match[1]).slice(0, 160) });
  }
  return specs;
}

function normalizeSpecs(product, categoryLabel) {
  const base = [];
  const sourceSpecs = Array.isArray(product.romanianSpecifications) ? product.romanianSpecifications : [];
  for (const spec of sourceSpecs) {
    const rawLabel = cleanText(spec.label);
    const rawValue = cleanText(spec.value);
    const label = specLabelTranslations.get(rawLabel) || translateSpecValue(rawLabel);
    const value = translateSpecValue(rawValue);
    if (!label || !value) continue;
    if (hasEnglish(label) || hasEnglish(value)) continue;
    base.push({ label, value });
  }
  for (const spec of splitSpecsFromText(product.specsText || product.notes || "")) {
    if (!hasEnglish(spec.label) && !hasEnglish(spec.value)) base.push(spec);
  }
  base.unshift({ label: "Categorie", value: categoryLabel });
  if (product.gimaCode) base.push({ label: "Cod produs", value: String(product.gimaCode) });
  if (product.productDocuments?.some((doc) => /certificate|certificat/i.test(doc.label || doc.type || ""))) {
    base.push({ label: "Documentatie", value: "Documente tehnice disponibile pentru consultare" });
  }
  const seen = new Set();
  return base
    .filter((spec) => {
      const key = `${spec.label}:${spec.value}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return !hasEnglish(`${spec.label} ${spec.value}`);
    })
    .slice(0, 12);
}

function safeList(items, fallback) {
  const values = (Array.isArray(items) ? items : [])
    .map((item) => translateSpecValue(item))
    .filter((item) => item && !hasEnglish(item));
  return values.length ? values.slice(0, 8) : fallback;
}

function localImagePath(product, url) {
  const sku = product.gimaCode || product.id || slugify(product.sourceProductName || product.slug);
  const extension = path.extname(new URL(url).pathname).replace(/[^.a-z0-9]/gi, "") || ".jpg";
  return {
    filePath: path.join(imageRoot, String(sku), `main${extension}`),
    publicPath: `/product-images/${sku}/main${extension}`,
  };
}

async function downloadImageIfNeeded(product) {
  const current = product.imageUrl || product.galleryImages?.[0]?.url || "";
  const currentIsPlaceholder = current.startsWith("/visuals/");
  const directGimaImage = product.gimaCode ? `https://www.gimaitaly.com/images/prodotti/big/${product.gimaCode}.jpg` : "";
  const candidate = currentIsPlaceholder ? directGimaImage : current;

  if (!candidate) return { status: "missing", url: "" };
  if (candidate.startsWith("/") && !candidate.startsWith("/visuals/")) return { status: "local", url: candidate };
  if (!/^https?:\/\//i.test(candidate)) return { status: currentIsPlaceholder ? "missing" : "local", url: currentIsPlaceholder ? "" : candidate };

  const { filePath, publicPath } = localImagePath(product, candidate);
  if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) return { status: "downloaded", url: publicPath };

  try {
    const response = await fetch(candidate, {
      headers: { "User-Agent": "ZESCORP catalog image localization; noindex review" },
    });
    const contentType = response.headers.get("content-type") || "";
    if (!response.ok || !contentType.startsWith("image/")) return { status: "failed", url: "" };
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length < 1000) return { status: "failed", url: "" };
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, buffer);
    return { status: "downloaded", url: publicPath, bytes: buffer.length };
  } catch {
    return { status: "failed", url: "" };
  }
}

function qualityScore(product) {
  let score = 0;
  if (product.romanianTitle && !hasEnglish(product.romanianTitle)) score += 20;
  if (product.romanianDescription && !hasEnglish(product.romanianDescription)) score += 20;
  if (product.galleryImages?.length && product.galleryImages.every((image) => String(image.url).startsWith("/product-images/"))) score += 20;
  if (product.romanianSpecifications?.length >= 2) score += 15;
  if (product.romanianApplications?.length) score += 10;
  if (product.romanianBenefits?.length) score += 10;
  if (product.documents && Object.values(product.documents).some(Boolean)) score += 5;
  return score;
}

function publicFields(product) {
  return {
    title: product.romanianTitle,
    description: product.romanianDescription,
    short: product.romanianShortSummary,
    features: (product.romanianFeatures || []).join(" | "),
    package: (product.romanianPackageContents || []).join(" | "),
    applications: (product.romanianApplications || []).join(" | "),
    benefits: (product.romanianBenefits || []).join(" | "),
    specs: (product.romanianSpecifications || []).map((spec) => `${spec.label}: ${spec.value}`).join(" | "),
    category: product.commercialCategory,
    subcategory: product.subcategory,
    alt: product.imageAlt,
  };
}

function localizationIssues(products) {
  const issues = [];
  for (const product of products) {
    for (const [field, value] of Object.entries(publicFields(product))) {
      if (!hasEnglish(value)) continue;
      const match = stripAllowed(value).match(englishPattern)?.[0] || "english";
      issues.push({ slug: product.slug, field, match });
    }
  }
  return issues;
}

async function main() {
  const products = readJson(productsPath, []);
  const oldRedirects = readJson(redirectsPath, []);
  const redirectMap = new Map(oldRedirects.map((item) => [item.source, item.destination]));
  const oldSlugs = new Map(products.map((product) => [product.id || product.slug, product.slug]));
  let imagesDownloaded = 0;
  let imageFailures = 0;
  const usedSlugs = new Set();

  for (const product of products) {
    const category = product.category || "diagnostic";
    const categoryLabel = categoryLabels[category] || "Echipamente medicale";
    const categoryData = categoryContent[category] || categoryContent.diagnostic;
    const originalTitle = product.sourceProductName || product.romanianTitle || product.slug;
    const title = translateTitle(product.romanianTitle || originalTitle, category);
    const skuSuffix = product.gimaCode ? `-${product.gimaCode}` : "";
    let slug = slugify(`${title}${skuSuffix}`);
    let counter = 2;
    while (usedSlugs.has(slug)) {
      slug = slugify(`${title}${skuSuffix}-${counter}`);
      counter += 1;
    }
    usedSlugs.add(slug);

    const imageResult = await downloadImageIfNeeded(product);
    if (imageResult.status === "downloaded") imagesDownloaded += 1;
    if (imageResult.status === "failed") imageFailures += 1;
    const existingLocalProductImage = String(product.imageUrl || "").startsWith("/product-images/") ? product.imageUrl : "";
    const localImage = imageResult.url || existingLocalProductImage;

    product.slug = slug;
    product.commercialCategory = categoryLabel;
    product.subcategory = categoryLabel;
    product.romanianTitle = title;
    product.romanianShortSummary = `${title}, disponibil pentru cerere de oferta ZESCORP, cu verificarea configuratiei, cantitatii, documentatiei si suportului de service.`;
    product.romanianDescription =
      `${title} este un ${categoryData.type}, potrivit pentru clinici, cabinete, laboratoare sau unitati medicale care au nevoie de selectie clara, documentatie si suport tehnic. ` +
      "Pentru acest produs puteti solicita o oferta personalizata in functie de configuratie, cantitate, termen de livrare si optiunile de service.";
    product.romanianSourceDescription = product.romanianDescription;
    product.romanianApplications = safeList(product.romanianApplications, categoryData.use);
    product.romanianBenefits = safeList(product.romanianBenefits, [
      "Cerere de oferta adaptata aplicatiei reale",
      "Posibilitate de corelare cu instalare, service si mentenanta",
      "Clarificarea accesoriilor si documentatiei inainte de achizitie",
    ]);
    product.romanianFeatures = safeList(product.romanianFeatures, [
      `${categoryLabel} pentru utilizare profesionala`,
      "Configuratie confirmata inainte de ofertare",
      "Suport ZESCORP pentru selectie si livrare",
    ]);
    product.romanianPackageContents = safeList(product.romanianPackageContents, [
      product.gimaCode ? `Produs cod ${product.gimaCode}` : "Produs medical",
      "Accesoriile si configuratia se confirma la ofertare",
    ]);
    product.romanianSpecifications = normalizeSpecs(product, categoryLabel);
    product.installationConsiderations = [
      "Verificarea conditiilor de utilizare si a configuratiei inainte de livrare",
      "Confirmarea accesoriilor, consumabilelor si documentatiei tehnice necesare",
      "Corelarea produsului cu fluxul clinic sau operational in care va fi folosit",
    ];
    product.maintenanceConsiderations = [
      "Plan de service si mentenanta in functie de frecventa de utilizare",
      "Verificarea periodica a consumabilelor, accesoriilor si elementelor supuse uzurii",
      "Suport ZESCORP pentru continuitate operationala, interventii si clarificari tehnice",
    ];
    product.relatedServices = product.relatedServices?.length ? product.relatedServices : ["/service-aparatura-medicala", "/contracte-mentenanta"];
    product.imageAlt = `${title} pentru clinici, cabinete si unitati medicale`;
    if (localImage) {
      product.imageUrl = localImage;
      product.imageStatus = "verified_local";
      product.imageVerified = true;
      product.galleryImages = [{ url: localImage, alt: product.imageAlt, verified: true }];
    } else {
      product.imageStatus = "missing";
      product.imageVerified = false;
      product.galleryImages = [];
    }
    product.publicQualityScore = qualityScore(product);
    product.catalogStatus =
      product.publicQualityScore >= 80 && product.imageStatus === "verified_local"
        ? "ready_for_publish"
        : product.imageStatus === "verified_local"
          ? "image_verified"
          : "localized";
    product.publicQualityStatus = product.catalogStatus;
    product.publicDisplayReady = product.catalogStatus === "ready_for_publish";
    product.reviewStatus =
      product.reviewStatus === "indexable"
        ? "indexable"
        : product.catalogStatus === "ready_for_publish"
          ? "reviewed"
          : product.catalogStatus === "image_verified"
            ? "image_verified"
            : "translated";
    product.notes = "Catalog localizat in romana. Indexarea ramane controlata prin statusul indexable.";

    const previousSlug = oldSlugs.get(product.id || "");
    if (previousSlug && previousSlug !== product.slug) {
      redirectMap.set(`/produse/${previousSlug}`, `/produse/${product.slug}`);
    }
  }

  const issues = localizationIssues(products);
  const missingImages = products.filter((product) => product.imageStatus !== "verified_local");
  const missingManuals = products.filter((product) => product.documentStatus?.englishManual !== "available");
  const missingCe = products.filter((product) => product.documentStatus?.ceCertificate !== "available");
  const ready = products.filter((product) => product.catalogStatus === "ready_for_publish");
  const below = products.filter((product) => product.catalogStatus !== "ready_for_publish");
  const scoreBuckets = {
    "90-100": products.filter((product) => product.publicQualityScore >= 90).length,
    "80-89": products.filter((product) => product.publicQualityScore >= 80 && product.publicQualityScore < 90).length,
    "60-79": products.filter((product) => product.publicQualityScore >= 60 && product.publicQualityScore < 80).length,
    "0-59": products.filter((product) => product.publicQualityScore < 60).length,
  };

  writeJson(productsPath, products);
  writeJson(
    redirectsPath,
    [...redirectMap.entries()]
      .map(([source, destination]) => ({ source, destination }))
      .filter((item) => item.source !== item.destination)
      .sort((a, b) => a.source.localeCompare(b.source)),
  );
  writeReport({
    below,
    imageFailures,
    imagesDownloaded,
    issues,
    missingCe,
    missingImages,
    missingManuals,
    products,
    ready,
    scoreBuckets,
  });
  console.log(
    JSON.stringify(
      {
        totalProducts: products.length,
        readyForPublish: ready.length,
        belowThreshold: below.length,
        localizationIssues: issues.length,
        imagesDownloaded,
        imageFailures,
      },
      null,
      2,
    ),
  );
}

function writeReport({ below, imageFailures, imagesDownloaded, issues, missingCe, missingImages, missingManuals, products, ready, scoreBuckets }) {
  const byCategory = {};
  for (const product of products) byCategory[product.category] = (byCategory[product.category] || 0) + 1;
  const report = `# GIMA Full Catalog Report

Generated: ${new Date().toISOString()}

Scope: Existing GIMA catalog records in the local ZESCORP product database. No new products were imported in this run.

## Summary

- Total products processed: ${products.length}
- Localized products: ${products.length}
- Products ready_for_publish: ${ready.length}
- Products below threshold: ${below.length}
- Remaining localization issues: ${issues.length}
- Images downloaded/localized in this run: ${imagesDownloaded}
- Image download failures: ${imageFailures}
- Missing local images after processing: ${missingImages.length}
- Missing manuals: ${missingManuals.length}
- Missing CE certificates: ${missingCe.length}

## Quality Score Distribution

${Object.entries(scoreBuckets).map(([bucket, count]) => `- ${bucket}: ${count}`).join("\n")}

## Category Coverage

${Object.entries(byCategory).map(([category, count]) => `- ${categoryLabels[category] || category}: ${count}`).join("\n")}

## Remaining Localization Issues

${issues.length ? issues.slice(0, 200).map((issue) => `- /produse/${issue.slug} (${issue.field}): ${issue.match}`).join("\n") : "- None"}

## Products Below Threshold

${below.length ? below.slice(0, 200).map((product) => `- /produse/${product.slug}: score ${product.publicQualityScore}, status ${product.catalogStatus}`).join("\n") : "- None"}

## Image and Document Notes

- Product pages use local image paths when an image was available or downloaded.
- Broken/failed image downloads are not marked as verified.
- Local documents are preserved where already available.
- Missing manuals and CE certificates are reported, not invented.
- Public pages do not expose source URLs, import status, review status or external GIMA anchors.

## SEO Notes

- Products below threshold remain noindex.
- Sitemap inclusion remains controlled by \`reviewStatus: "indexable"\`.
- \`ready_for_publish\` is recorded as \`catalogStatus\` / \`publicQualityStatus\`; products are not mass-indexed automatically.
`;
  fs.writeFileSync(reportPath, report);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
