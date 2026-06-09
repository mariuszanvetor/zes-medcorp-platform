import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data/product-catalog/products.json");
const redirectsPath = path.join(root, "data/product-catalog/product-redirects.json");
const reportPath = path.join(root, "docs/product-premium-pool-repair-report.md");

const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
const redirects = fs.existsSync(redirectsPath) ? JSON.parse(fs.readFileSync(redirectsPath, "utf8")) : [];

const categoryProfiles = {
  diagnostic: {
    label: "Diagnostic medical",
    audience: "cabinete, clinici si unitati medicale care au nevoie de evaluare rapida si documentata",
    applications: ["diagnostic clinic curent", "triaj si evaluare pacient", "dotare cabinet medical"],
    benefits: ["sprijina fluxuri clinice mai clare", "ajuta la standardizarea dotarii", "poate fi ofertat impreuna cu accesorii si suport tehnic"],
    services: ["ofertare echipamente de diagnostic", "instalare si punere in functiune", "service aparatura medicala"],
  },
  laboratory: {
    label: "Laborator / IVD",
    audience: "laboratoare, clinici si centre medicale care lucreaza cu probe si fluxuri IVD",
    applications: ["prelucrare probe", "dotare laborator", "suport pentru activitate IVD"],
    benefits: ["contribuie la organizarea fluxului de laborator", "poate fi inclus in pachete de dotare", "permite solicitarea unei oferte adaptate volumului de lucru"],
    services: ["ofertare laborator / IVD", "instalare echipamente laborator", "mentenanta preventiva"],
  },
  emergency: {
    label: "Urgenta",
    audience: "zone de urgenta, ambulante, clinici si echipe care lucreaza cu interventii rapide",
    applications: ["interventii rapide", "dotare camera de urgenta", "suport pentru echipe mobile"],
    benefits: ["sustine disponibilitatea operationala", "ajuta la organizarea echiparii de urgenta", "poate fi combinat cu accesorii si consumabile potrivite"],
    services: ["dotare urgenta", "service si suport tehnic", "pachete de consumabile"],
  },
  sterilization: {
    label: "Sterilizare",
    audience: "cabinete, clinici si zone de sterilizare care au nevoie de fluxuri curate si controlate",
    applications: ["sterilizare instrumentar", "pregatire consumabile", "organizare flux cabinet"],
    benefits: ["sustine proceduri mai ordonate", "reduce riscul de lipsa materiale auxiliare", "se poate integra in planul de mentenanta si consumabile"],
    services: ["dotare sterilizare", "mentenanta echipamente sterilizare", "consumabile medicale"],
  },
  "medical-furniture": {
    label: "Mobilier medical",
    audience: "clinici, cabinete si centre medicale care amenajeaza sau modernizeaza spatii de lucru",
    applications: ["amenajare spatiu medical", "organizare cabinet", "dotare zone de examinare"],
    benefits: ["imbunatateste ergonomia spatiului", "ajuta la standardizarea dotarii", "poate fi ofertat impreuna cu servicii de amenajare"],
    services: ["amenajare medicala", "ofertare mobilier medical", "instalare si integrare"],
  },
  ent: {
    label: "ORL",
    audience: "cabinete ORL si clinici cu servicii de diagnostic specializat",
    applications: ["diagnostic ORL", "dotare cabinet specializat", "examinare pacient"],
    benefits: ["completeaza fluxul de consultatie", "ajuta la dotarea coerenta a cabinetului", "permite selectia accesoriilor compatibile"],
    services: ["dotare cabinet ORL", "service echipamente ORL", "ofertare accesorii"],
  },
  gynecology: {
    label: "Ginecologie",
    audience: "cabinete de ginecologie, obstetrica si clinici specializate",
    applications: ["consultatii ginecologice", "dotare cabinet", "proceduri clinice specializate"],
    benefits: ["sprijina confortul si eficienta consultatiei", "ajuta la completarea dotarii de cabinet", "poate fi ofertat cu accesorii relevante"],
    services: ["dotare cabinet ginecologie", "instalare echipamente", "service si mentenanta"],
  },
  consumables: {
    label: "Consumabile",
    audience: "clinici, cabinete si departamente care au nevoie de necesar recurent",
    applications: ["consum medical recurent", "proceduri curente", "completare stoc operational"],
    benefits: ["ajuta la planificarea necesarului", "poate fi comandat pe loturi", "reduce riscul de lipsa materiale in fluxul clinic"],
    services: ["ofertare consumabile", "pachete recurente", "suport pentru aprovizionare"],
  },
  electromedical: {
    label: "Electromedicale",
    audience: "clinici si cabinete care folosesc echipamente electrice pentru diagnostic, terapie sau suport clinic",
    applications: ["utilizare clinica specializata", "dotare cabinet", "suport pentru tratament sau evaluare"],
    benefits: ["completeaza infrastructura tehnica a cabinetului", "poate fi integrat cu servicii de instalare", "permite planificarea mentenantei"],
    services: ["ofertare electromedicale", "instalare si punere in functiune", "service aparatura medicala"],
  },
  "surgical-instruments": {
    label: "Instrumentar chirurgical",
    audience: "cabinete, clinici si sali de interventie care au nevoie de instrumentar specific",
    applications: ["proceduri medicale", "interventii clinice", "completare truse instrumentar"],
    benefits: ["ajuta la completarea seturilor de lucru", "poate fi ofertat pe configuratii", "sprijina planificarea fluxului de sterilizare"],
    services: ["ofertare instrumentar", "consumabile si accesorii", "suport pentru flux sterilizare"],
  },
  "patient-care": {
    label: "Ingrijire pacient",
    audience: "spitale, clinici si centre care organizeaza ingrijirea si mobilizarea pacientilor",
    applications: ["ingrijire pacient", "mobilizare si suport", "dotare sectii si cabinete"],
    benefits: ["sprijina confortul pacientului", "ajuta la organizarea activitatii operationale", "poate fi inclus in proiecte de dotare"],
    services: ["dotare sectii", "ofertare echipamente ingrijire", "service si suport"],
  },
  monitoring: {
    label: "Monitorizare",
    audience: "clinici, spitale si zone de supraveghere care urmaresc parametri pacient",
    applications: ["monitorizare clinica", "suport pentru triaj", "dotare zone de consultatie sau supraveghere"],
    benefits: ["sprijina urmarirea parametrilor", "ajuta la standardizarea dotarii", "poate fi completat cu accesorii si service"],
    services: ["ofertare monitorizare", "instalare si configurare", "service monitoare pacient"],
  },
  disinfection: {
    label: "Dezinfectie",
    audience: "clinici si cabinete care au nevoie de control operational pentru igiena",
    applications: ["dezinfectie si igiena", "fluxuri de lucru curate", "suport pentru siguranta operationala"],
    benefits: ["sprijina organizarea igienei", "poate fi planificat ca necesar recurent", "completeaza dotarea cabinetului"],
    services: ["ofertare produse dezinfectie", "pachete recurente", "consultanta pentru fluxuri"],
  },
  "operator-protection": {
    label: "Protectie operator",
    audience: "personal medical, clinici si cabinete care standardizeaza echiparea echipelor",
    applications: ["echipare personal medical", "protectie individuala", "uniformizare echipe clinice"],
    benefits: ["ajuta la identificarea marimilor si variantelor", "poate fi ofertat pe loturi", "sustine aprovizionarea recurenta"],
    services: ["ofertare echipamente protectie", "pachete pentru personal", "consumabile recurente"],
  },
  "medical-bags": {
    label: "Genti medicale",
    audience: "echipe mobile, ambulante, cabinete si servicii de interventie",
    applications: ["transport echipamente", "truse interventie", "organizare materiale mobile"],
    benefits: ["sprijina accesul rapid la materiale", "ajuta la organizarea truselor", "poate fi configurat dupa tipul de interventie"],
    services: ["dotare truse medicale", "ofertare accesorii", "suport pentru echipe mobile"],
  },
  "scales-measures": {
    label: "Cantare si masurare",
    audience: "cabinete, clinici si centre care fac evaluari antropometrice sau masuratori clinice",
    applications: ["masurare clinica", "evaluare pacient", "dotare cabinet"],
    benefits: ["sprijina masuratori mai consecvente", "completeaza dotarea de diagnostic", "poate fi integrat in proiecte de cabinet"],
    services: ["ofertare echipamente masurare", "instalare si suport", "service echipamente medicale"],
  },
  physiotherapy: {
    label: "Fizioterapie",
    audience: "centre de recuperare, clinici si cabinete de fizioterapie",
    applications: ["recuperare medicala", "terapie si suport pacient", "dotare sala fizioterapie"],
    benefits: ["completeaza fluxul de recuperare", "poate fi configurat dupa serviciile clinicii", "permite planificarea suportului tehnic"],
    services: ["dotare fizioterapie", "instalare echipamente", "mentenanta si service"],
  },
  veterinary: {
    label: "Veterinar",
    audience: "clinici veterinare si cabinete cu fluxuri de diagnostic sau interventie",
    applications: ["dotare clinica veterinara", "interventii veterinare", "suport operational"],
    benefits: ["completeaza necesarul clinicii", "poate fi ofertat cu accesorii", "sprijina planificarea dotarii"],
    services: ["dotare veterinara", "service echipamente", "consumabile si accesorii"],
  },
  "anatomy-models": {
    label: "Modele anatomice",
    audience: "institutii de educatie medicala, clinici si centre de instruire",
    applications: ["instruire medicala", "demonstratii anatomice", "educatie pacient sau personal"],
    benefits: ["sprijina invatarea vizuala", "poate fi inclus in pachete educationale", "ajuta la standardizarea materialelor didactice"],
    services: ["ofertare modele anatomice", "pachete educationale", "consultanta pentru selectie"],
  },
  "medical-lights": {
    label: "Iluminare medicala",
    audience: "cabinete, clinici si zone de examinare care necesita iluminare functionala",
    applications: ["examinare pacient", "proceduri in cabinet", "dotare spatiu medical"],
    benefits: ["sprijina vizibilitatea in proceduri", "poate fi integrat in amenajare", "ajuta la standardizarea dotarii cabinetului"],
    services: ["ofertare iluminare medicala", "instalare si integrare", "service si suport"],
  },
};

const allowedTechnicalTerms = new Set(["ce", "fda", "iso", "bluetooth", "wifi", "wi fi", "pacs", "ris", "dicom", "usb", "led", "spo2", "ecg", "monitor", "adult", "pediatric"]);
const leakageTerms = [
  "designed",
  "technical",
  "manual",
  "product",
  "disposable",
  "single use",
  "re usable",
  "reusable",
  "washer",
  "drying",
  "display",
  "button",
  "large",
  "small",
  "medium",
  "children",
  "kid",
  "with",
  "without",
  "strap",
  "straps",
  "headband",
  "bags",
  "box",
  "professional",
  "sneaker",
  "clogs",
  "stretcher",
  "stretchers",
  "mask",
  "masks",
  "filter",
  "filters",
  "support",
  "holder",
  "accessories",
  "accessory",
  "speculum",
  "otoscope",
  "ophthalmoscope",
  "thermometer",
  "stethoscope",
  "chart",
  "couch",
  "cart",
  "trolley",
  "belt",
  "buckle",
  "clamp",
  "forceps",
  "retractor",
  "needle",
  "needles",
  "cups",
  "compression",
  "lacets",
  "drawers",
  "drawer",
  "syringe",
  "syringes",
  "pads",
  "face",
  "instruments",
  "packed",
  "quality",
  "system",
  "guide",
  "size",
  "sizes",
  "every",
  "colours",
  "mixed",
  "surfaces",
  "wipes",
  "masking",
  "faceshield",
  "connection",
  "rail",
  "angled",
  "gallipot",
  "nebulizer",
  "binocular",
  "loupe",
  "sphygmomanometeet",
  "sphygmomanometer",
  "blades",
  "blade",
  "paed",
  "smart",
  "trolleys",
  "andsparesfor",
  "ontrolley",
];

const titleReplacementRules = [
  [/Bluza Medicala/gi, "Bluză medicală"],
  [/Pantaloni Originals/gi, "Pantaloni medicali Originals"],
  [/Pantaloni/gi, "Pantaloni medicali"],
  [/Decolteu V/gi, "decolteu în V"],
  [/\bDama\b/gi, "damă"],
  [/\bBarbati\b/gi, "bărbați"],
  [/\bWomen\b/gi, "damă"],
  [/\bMen\b/gi, "bărbați"],
  [/\bNavy Albastru\b/gi, "bleumarin"],
  [/\bTeal Albastru\b/gi, "albastru-verzui"],
  [/\bCiel\b/gi, "bleu"],
  [/\bClogs\b/gi, "Saboți medicali"],
  [/\bSneaker[s]?\b/gi, "Încălțăminte medicală"],
  [/\bDisposable\b/gi, "de unică folosință"],
  [/\bReusable\b/gi, "reutilizabil"],
  [/\bSingle Use\b/gi, "de unică folosință"],
  [/\bLarge\b/gi, "mare"],
  [/\bMedium\b/gi, "mediu"],
  [/\bSmall\b/gi, "mic"],
  [/\bAdult\b/gi, "adult"],
  [/\bPediatric\b/gi, "pediatric"],
  [/\bChildren\b/gi, "copii"],
  [/\bKid\b/gi, "copil"],
  [/\bWith\b/gi, "cu"],
  [/\bWithout\b/gi, "fără"],
  [/\bStraps?\b/gi, "baretă"],
  [/\bHeadband\b/gi, "bandă de cap"],
  [/\bBags?\b/gi, "geantă"],
  [/\bBox\b/gi, "cutie"],
  [/\bProfessional\b/gi, "profesional"],
  [/\bStretcher[s]?\b/gi, "targă"],
  [/\bMasks?\b/gi, "mască"],
  [/\bLaryngeal\b/gi, "laringiană"],
  [/\bFilter[s]?\b/gi, "filtru"],
  [/\bSupport\b/gi, "suport"],
  [/\bHolder\b/gi, "suport"],
  [/\bAccessories\b/gi, "accesorii"],
  [/\bAccessory\b/gi, "accesoriu"],
  [/\bSpeculum\b/gi, "specul"],
  [/\bOtoscope\b/gi, "otoscop"],
  [/\bOphthalmoscope\b/gi, "oftalmoscop"],
  [/\bThermometer\b/gi, "termometru"],
  [/\bStethoscope\b/gi, "stetoscop"],
  [/\bDisplay\b/gi, "afișaj"],
  [/\bButton\b/gi, "buton"],
  [/\bChart\b/gi, "diagramă"],
  [/\bCouch\b/gi, "canapea de examinare"],
  [/\bCart\b/gi, "cărucior"],
  [/\bTrolley\b/gi, "cărucior"],
  [/\bBelt\b/gi, "centură"],
  [/\bBuckle\b/gi, "cataramă"],
  [/\bClamp\b/gi, "clampă"],
  [/\bForceps\b/gi, "pensă"],
  [/\bRetractor\b/gi, "depărtător"],
  [/\bNeedles?\b/gi, "ace"],
  [/\bCups\b/gi, "cupe"],
  [/\bCompression\b/gi, "compresie"],
  [/\bLacets\b/gi, "șireturi"],
  [/\bTrolleys\b/gi, "cărucioare"],
  [/\bDrawers\b/gi, "sertare"],
  [/\bDrawer\b/gi, "sertar"],
  [/\bPartition\b/gi, "separator"],
  [/\bSystem\b/gi, "sistem"],
  [/\bAndsparesfor\b/gi, "piese de schimb pentru"],
  [/\bOntrolley\b/gi, "pe cărucior"],
  [/\bCartridge Syringe\b/gi, "Seringă carpulă"],
  [/\bSyringes\b/gi, "seringi"],
  [/\bSyringe\b/gi, "seringă"],
  [/\bBoxes\b/gi, "cutii"],
  [/\bPads\b/gi, "tampoane"],
  [/\bFaceshield\b/gi, "Vizieră de protecție"],
  [/\bMixed Sizes\b/gi, "dimensiuni mixte"],
  [/\bCentral Pin specul\b/gi, "Specul cu pin central"],
  [/\bMiddle Screw specul\b/gi, "Specul cu șurub median"],
  [/\bTache specul\b/gi, "Specul Tache"],
  [/\bDisinfectant Wipes\b/gi, "șervețele dezinfectante"],
  [/\bSurfaces\b/gi, "suprafețe"],
  [/\bConnection\b/gi, "conexiune"],
  [/\bRail\b/gi, "șină"],
  [/\bAngled\b/gi, "în unghi"],
  [/\bS\/s\b/gi, "inox"],
  [/\bGallipot\b/gi, "bol medical"],
  [/\bDiam\./gi, "diametru"],
  [/\bSmart Nebulizer\b/gi, "Nebulizator Smart"],
  [/\bNebulizer\b/gi, "nebulizator"],
  [/\bBinocular Loupe\b/gi, "lupă binoculară"],
  [/\bLoupe\b/gi, "lupă"],
  [/\bSphygmomanometeet R\b/gi, "tensiometru"],
  [/\bSphygmomanometer\b/gi, "tensiometru"],
  [/\bBlades Set\b/gi, "set lame"],
  [/\bBlades\b/gi, "lame"],
  [/\bBlade\b/gi, "lamă"],
  [/\bPaed\b/gi, "pediatric"],
  [/\bDispenser pentru de unică folosință cupe\b/gi, "Dispenser pentru cupe de unică folosință"],
  [/\bFc\b/g, "FC"],
  [/\bGb\b/g, "GB"],
  [/\bFr\b/g, "FR"],
  [/\bIt\b/g, "IT"],
  [/\bEs\b/g, "ES"],
  [/\bDe\b/g, "DE"],
  [/\bXxs\b/g, "XXS"],
  [/\bXs\b/g, "XS"],
  [/\bXl\b/g, "XL"],
  [/\bXxl\b/g, "XXL"],
];

const languageListPattern = /(?:\s*[-,]\s*)?\b(?:GB|FR|IT|ES|DE|EN|PT|NL)(?:\s*,\s*(?:GB|FR|IT|ES|DE|EN|PT|NL)){1,}\b/gi;
const sourceArtifactPattern = /(marime guide|size guide|technical|specificatii tehnice|class i|manual|only|numai|pagina|catalog|table|tabel|all products are packed|every model|andsparesfor|holloware\s+-\s+chirurgical instruments|masking|size|\bquality\b)/i;

function normalizeText(value = "") {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function hasEnglishLeakage(value = "") {
  const normalized = normalizeText(value);
  return leakageTerms.some((term) => !allowedTechnicalTerms.has(term) && new RegExp(`(^| )${escapeRegExp(term)}( |$)`).test(normalized));
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function cleanSpacing(value = "") {
  return value
    .replace(languageListPattern, "")
    .replace(/\s+-\s+-\s+/g, " - ")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;:])/g, "$1")
    .replace(/\s+-\s*$/g, "")
    .trim();
}

function repairTitle(product) {
  let title = product.romanianTitle || product.sourceProductName || "";
  if (sourceArtifactPattern.test(title)) return null;

  title = cleanSpacing(title);
  for (const [pattern, replacement] of titleReplacementRules) {
    title = title.replace(pattern, replacement);
  }
  title = cleanSpacing(title);

  title = title
    .replace(/\bMedicala\b/g, "medicală")
    .replace(/\bMasca\b/g, "Mască")
    .replace(/\bRezistenta\b/g, "Rezistență")
    .replace(/\bTensiometru\b/g, "Tensiometru")
    .replace(/\bFlotatie\b/g, "flotație")
    .replace(/\bAdaptor\b/g, "Adaptor")
    .replace(/\bOriginals - damă\b/g, "Originals pentru damă")
    .replace(/\bLinia\b/g, "linia")
    .replace(/\bmedicali medicali\b/gi, "medicali")
    .replace(/\bmedicală medicală\b/gi, "medicală")
    .replace(/\bChirurgical Face mască\b/gi, "Mască chirurgicală")
    .replace(/\bChirurgical Face Mască\b/gi, "Mască chirurgicală")
    .replace(/\bFace mască\b/gi, "mască facială")
    .replace(/clampă+/gi, "clampă")
    .replace(/\bMasa\b/g, "Masă");

  if (/cherokee/i.test(title) && /bluz/i.test(title) && !/uniforma|medical/i.test(title)) {
    title = `Bluză medicală Cherokee ${title.replace(/cherokee/i, "").trim()}`;
  }
  if (/cherokee/i.test(title) && /pantaloni/i.test(title) && !/medical/i.test(title)) {
    title = title.replace(/Pantaloni/i, "Pantaloni medicali");
  }

  title = cleanSpacing(title);

  if (title.length < 8 || /([a-z])\1{3,}/i.test(normalizeText(title))) return null;
  if (/^(produs|echipament|dispozitiv|articol)\b/i.test(normalizeText(title))) return null;
  if (/^[\d\s.,/()°+-]+$/.test(title)) return null;
  if (hasEnglishLeakage(title)) return null;

  return title;
}

function inferCategory(product, title) {
  const normalized = normalizeText(`${title} ${product.sourceProductName || ""} ${product.subcategory || ""}`);
  if (/\b(bluza|pantaloni|sabot|incaltaminte|uniforma|masca|halat|protectie|boneta|manusi)\b/.test(normalized)) return "operator-protection";
  if (/\b(geant|trusa|rucsac|bag)\b/.test(normalized)) return "medical-bags";
  if (/\b(steriliz|autoclav|sigilar|pungi sterilizare)\b/.test(normalized)) return "sterilization";
  if (/\b(monitor|ecg|tensiometru|pulsoximetru|spirometru|termometru)\b/.test(normalized)) return "monitoring";
  if (/\b(laborator|centrifuga|pipeta|eprubeta|microscop|analizor)\b/.test(normalized)) return "laboratory";
  if (/\b(urgenta|targa|resuscitare|prim ajutor|defibrilator)\b/.test(normalized)) return "emergency";
  if (/\b(pensa|clampa|foarfeca|bisturiu|departator|instrumentar)\b/.test(normalized)) return "surgical-instruments";
  return product.category;
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function buildSlug(title, code, usedSlugs) {
  const base = slugify(`${title} ${code || ""}`);
  let slug = base;
  let suffix = 2;
  while (usedSlugs.has(slug)) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }
  usedSlugs.add(slug);
  return slug;
}

function normalizeSpecGroups(product) {
  const groups = Array.isArray(product.specificationGroups) ? product.specificationGroups : [];
  if (groups.length) return groups;
  const specs = Array.isArray(product.romanianSpecifications) ? product.romanianSpecifications : [];
  if (!specs.length) return [];
  return [{ group: "General", items: specs.filter((item) => item?.label && item?.value) }];
}

function specCount(product) {
  const groups = normalizeSpecGroups(product);
  const groupedCount = groups.reduce((count, group) => count + (group.items?.length || 0), 0);
  return groupedCount || product.romanianSpecifications?.length || 0;
}

function buildCommercialContent(product, title, category) {
  const profile = categoryProfiles[category] || categoryProfiles.diagnostic;
  const code = product.gimaCode ? ` Cod produs: ${product.gimaCode}.` : "";
  const summary = `${title} este potrivit pentru ${profile.audience}.`;
  const description = `${title} este o optiune comerciala pentru ${profile.audience}, cand achizitia trebuie corelata cu utilizarea reala, cantitatea necesara si accesoriile compatibile.${code} ZESCORP poate pregati oferta in functie de configuratie, disponibilitate, documentatie si cerintele operationale ale clinicii, fara a inventa preturi sau stoc.`;

  const applications = uniqueStrings([...(product.romanianApplications || []), ...profile.applications]).slice(0, 5);
  const benefits = uniqueStrings([...(product.romanianBenefits || []), ...profile.benefits]).slice(0, 5);
  const features = uniqueStrings([...(product.romanianFeatures || []), `Categorie comerciala: ${profile.label}`, "Oferta se confirma inainte de achizitie", "Potrivit pentru cereri de oferta B2B"]).slice(0, 6);
  const relatedServices = uniqueStrings([...(product.relatedServices || []), ...profile.services]).slice(0, 6);
  const installationConsiderations = uniqueStrings([
    ...(product.installationConsiderations || []),
    "confirmarea variantei si a accesoriilor inainte de ofertare",
    "verificarea compatibilitatii cu fluxul clinic existent",
  ]).slice(0, 5);
  const maintenanceConsiderations = uniqueStrings([
    ...(product.maintenanceConsiderations || []),
    "disponibilitatea consumabilelor si accesoriilor se verifica la cererea de oferta",
    "pentru echipamente active, se recomanda planificarea suportului tehnic si a mentenantei",
  ]).slice(0, 5);

  return {
    romanianShortSummary: summary,
    romanianDescription: description,
    romanianApplications: applications,
    romanianBenefits: benefits,
    romanianFeatures: features,
    relatedServices,
    installationConsiderations,
    maintenanceConsiderations,
  };
}

function uniqueStrings(values) {
  const seen = new Set();
  const result = [];
  for (const value of values) {
    const cleaned = cleanSpacing(String(value || ""));
    if (!cleaned) continue;
    const key = normalizeText(cleaned);
    if (seen.has(key) || hasEnglishLeakage(cleaned)) continue;
    seen.add(key);
    result.push(cleaned);
  }
  return result;
}

function isGenericDescription(description) {
  const normalized = normalizeText(description);
  return [
    "este un produs din categoria",
    "prezentat pentru cereri de oferta profesionale",
    "pagina este structurata pentru cumparatori",
    "produs disponibil pentru cerere de oferta",
  ].some((pattern) => normalized.includes(pattern));
}

function passesStrictGate(product) {
  const title = product.romanianTitle || "";
  const slug = product.slug || "";
  const description = product.romanianDescription || product.commercialDescription || "";
  const specs = specCount(product);

  return Boolean(
    product.publicDisplayReady &&
      product.imageStatus === "verified_local" &&
      product.galleryImages?.length &&
      title.length >= 8 &&
      slug.length >= 8 &&
      !/([a-z])\1{3,}/i.test(normalizeText(title)) &&
      !/^(produs|echipament|dispozitiv|articol)\b/i.test(normalizeText(title)) &&
      !/^(specificatii tehnice|technical|class|manual|numai|pentru)\b/i.test(normalizeText(title)) &&
      !/^(produs|echipament|dispozitiv|articol|specificatii tehnice|technical|manual)\b/i.test(normalizeText(slug.replaceAll("-", " "))) &&
      !hasEnglishLeakage(title) &&
      !hasEnglishLeakage(slug.replaceAll("-", " ")) &&
      !hasEnglishLeakage(description) &&
      description.length >= 180 &&
      !isGenericDescription(description) &&
      (specs >= 5 || product.productDocuments?.length || product.romanianFeatures?.length),
  );
}

const premiumCandidate = (product) =>
  product.masterpieceStatus === "premium_ready" &&
  product.launchRepairStatus === "passed" &&
  (!product.deployReadinessBlockers || product.deployReadinessBlockers.length === 0);

const before = {
  candidates: 0,
  genericDescriptions: 0,
  strictPass: 0,
  indexable: 0,
};

for (const product of products) {
  if (premiumCandidate(product)) {
    before.candidates += 1;
    if (isGenericDescription(product.romanianDescription || "")) before.genericDescriptions += 1;
    if (product.strictQualityStatus === "pass") before.strictPass += 1;
  }
  if (product.reviewStatus === "indexable") before.indexable += 1;
}

const usedSlugs = new Set(products.map((product) => product.slug).filter(Boolean));
const redirectKeys = new Set(redirects.map((redirect) => redirect.source));
const repaired = [];
const heldBack = [];
const examples = [];

for (const product of products) {
  if (product.reviewStatus === "indexable") {
    product.reviewStatus = "reviewed";
    product.indexableAt = null;
  }

  if (!premiumCandidate(product)) continue;

  const oldTitle = product.romanianTitle || "";
  const oldSlug = product.slug || "";
  const title = repairTitle(product);

  if (!title) {
    product.publicDisplayReady = false;
    product.catalogStatus = "needs_review";
    product.strictQualityStatus = "fail";
    product.strictQualityScore = Math.min(product.strictQualityScore || 0, 69);
    product.strictQualityFailures = uniqueStrings([...(product.strictQualityFailures || []), "title_not_repairable"]);
    heldBack.push({ code: product.gimaCode, title: oldTitle, reason: "Titlu sursa/artifact sau netraductibil automat" });
    continue;
  }

  usedSlugs.delete(oldSlug);
  const category = inferCategory(product, title);
  const slug = buildSlug(title, product.gimaCode, usedSlugs);
  const content = buildCommercialContent(product, title, category);

  product.romanianTitle = title;
  product.slug = slug;
  product.category = category;
  product.commercialCategory = categoryProfiles[category]?.label || product.commercialCategory;
  product.reviewStatus = "reviewed";
  product.indexableAt = null;
  product.publicDisplayReady = true;
  product.specificationGroups = normalizeSpecGroups(product);
  Object.assign(product, content);

  if (oldSlug && oldSlug !== slug) {
    const source = `/produse/${oldSlug}`;
    const destination = `/produse/${slug}`;
    if (!redirectKeys.has(source)) {
      redirects.push({ source, destination, permanent: true });
      redirectKeys.add(source);
    }
  }

  if (passesStrictGate(product)) {
    product.catalogStatus = "ready_for_publish";
    product.strictQualityStatus = "pass";
    product.strictQualityScore = Math.max(product.strictQualityScore || 0, 91);
    product.strictQualityFailures = [];
    repaired.push(product);
    if (examples.length < 30 && (oldTitle !== title || oldSlug !== slug)) {
      examples.push({ code: product.gimaCode, beforeTitle: oldTitle, afterTitle: title, beforeSlug: oldSlug, afterSlug: slug, category });
    }
  } else {
    product.publicDisplayReady = false;
    product.catalogStatus = "needs_review";
    product.strictQualityStatus = "fail";
    product.strictQualityScore = Math.min(product.strictQualityScore || 0, 79);
    product.strictQualityFailures = uniqueStrings([...(product.strictQualityFailures || []), "strict_gate_failed_after_repair"]);
    heldBack.push({ code: product.gimaCode, title, reason: "Nu trece gate-ul strict dupa repararea automata" });
  }
}

const after = {
  candidates: 0,
  displayReady: 0,
  strictPass: 0,
  indexable: 0,
  sitemapProductUrls: 0,
  byCategory: {},
};

for (const product of products) {
  if (premiumCandidate(product)) after.candidates += 1;
  if (product.strictQualityStatus === "pass" && product.catalogStatus === "ready_for_publish" && product.publicDisplayReady) {
    after.displayReady += 1;
    after.byCategory[product.category] = (after.byCategory[product.category] || 0) + 1;
  }
  if (product.strictQualityStatus === "pass") after.strictPass += 1;
  if (product.reviewStatus === "indexable") after.indexable += 1;
}

products.sort((a, b) => Number(a.gimaCode || 0) - Number(b.gimaCode || 0));
redirects.sort((a, b) => a.source.localeCompare(b.source));

fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`);
fs.writeFileSync(redirectsPath, `${JSON.stringify(redirects, null, 2)}\n`);

const report = [
  "# Product Premium Pool Repair Report",
  "",
  "Local repair pass for the previously approved premium launch pool. This pass intentionally keeps all products noindex and does not add product URLs to the sitemap.",
  "",
  "## Before",
  "",
  `- Premium candidates inspected: ${before.candidates}`,
  `- Generic descriptions detected: ${before.genericDescriptions}`,
  `- Strict pass before repair: ${before.strictPass}`,
  `- Indexable products before repair: ${before.indexable}`,
  "",
  "## After",
  "",
  `- Products repaired and display-ready under strict gate: ${repaired.length}`,
  `- Products held back for manual/source review: ${heldBack.length}`,
  `- Indexable products after repair: ${after.indexable}`,
  `- Product URLs intended for sitemap: ${after.sitemapProductUrls}`,
  "",
  "## Display-ready products by category",
  "",
  ...Object.entries(after.byCategory)
    .sort((a, b) => b[1] - a[1])
    .map(([category, count]) => `- ${category}: ${count}`),
  "",
  "## Sample title and slug repairs",
  "",
  ...examples.slice(0, 30).map((item) => `- ${item.code}: ${item.beforeTitle} -> ${item.afterTitle} (${item.beforeSlug} -> ${item.afterSlug})`),
  "",
  "## Held-back examples",
  "",
  ...heldBack.slice(0, 80).map((item) => `- ${item.code || "fara cod"}: ${item.title} — ${item.reason}`),
  "",
  "## Safety conclusion",
  "",
  "- No products were made indexable.",
  "- Product detail URLs must remain excluded from sitemap until a separate indexation phase.",
  "- Held-back products should not be forced into public grids or indexation without source/manual review.",
  "- This repair improves the public noindex catalog pool but does not authorize mass SEO launch.",
  "",
];

fs.writeFileSync(reportPath, `${report.join("\n")}\n`);

console.log(
  JSON.stringify(
    {
      before,
      after,
      repaired: repaired.length,
      heldBack: heldBack.length,
      report: path.relative(root, reportPath),
    },
    null,
    2,
  ),
);
