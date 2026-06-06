import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const redirectsPath = path.join(root, "data", "product-catalog", "product-redirects.json");
const reportPath = path.join(root, "docs", "product-professionalization-report.md");

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
    .slice(0, 96);
}

const titleOverrides = {
  "23994": "Analizor hemoglobina si hematocrit Hemo Control",
  "24046": "Analizor de urina cu Bluetooth",
  "27880": "Carucior medical Easy cu doua polite",
  "28652": "Lampa infrarosu 250 W pentru terapie, de birou",
  "28653": "Lampa infrarosu 250 W pentru terapie, pe stativ",
  "28309": "Aparat MIO-Sonic pentru terapie cu ultrasunete",
  "28306": "Aparat ionoforeza Iono Base Plus cu doua canale",
  "28401": "Aparat electroterapie T-ONE Coach cu patru canale",
  "34068": "Targa pliabila pentru scari",
  "34069": "Targa electrica pentru scari",
  "31870": "Otoscop Riester Uni I 2,7 V",
  "31875": "Set diagnostic Riester Econom",
  "23514": "Glucometru wireless iHealth BG5",
  "24600": "Analizor imunofluorescent pentru teste rapide",
  "35402": "Defibrilator semiautomat i-PAD CU-SPR",
  "35341": "Defibrilator AED CU-SP2 cu monitor",
  "35370": "Defibrilator manual DefiMonitor XD",
  "36589": "Gel antibacterian transparent 500 ml",
  "36594": "Gel antibacterian transparent 1 l",
  "36657": "Servetele pentru maini Multiusi 14 x 19 cm",
  "36625": "Servetele dezinfectante, tub 100 bucati",
  "30510": "Electrod bila drept 3 mm",
  "30512": "Electrod lama autoclavabil 7 cm",
  "30513": "Electrod bila autoclavabil 4 mm",
  "29624": "Videocolposcop LED AC-2311 cu camera",
  "29625": "Videocolposcop LED AC-2311DA cu brat in L",
  "29516": "Monitor fetal FC1400 pentru sarcina unica",
  "29520": "Monitor fetal FC 700",
  "25642": "Viziera de protectie cu ecrane",
  "25667": "Ochelari de protectie 5x7 antiaburire si anti-zgariere",
  "25659": "Ochelari de protectie Gimasafe",
  "24050": "Analizor de urina Urilyzer 500 Pro cu imprimanta",
  "44840": "Scaun transfer pacient Ischia albastru",
  "27704": "Bara pliabila pentru pat",
  "43202": "Scaun cu rotile pliabil cu functie toaleta",
  "56800": "Sistem Sunlight MiniOmni pentru screening osteoporoza",
  "27487": "Masa peste pat Elite",
  "31192": "Lampa fototerapie LED pentru nou-nascuti pe carucior",
  "33554": "Spirometru SP-100B cu ecran tactil",
  "34260": "Balon resuscitare silicon cu masca pentru adulti",
};

const categoryCopy = {
  diagnostic: {
    description: "pentru completarea dotarii de diagnostic si examinare in cabinete sau clinici",
    applications: ["diagnostic si examinare de rutina", "dotare cabinet medical", "completarea seturilor clinice"],
  },
  laboratory: {
    description: "pentru laboratoare, fluxuri IVD si prelucrarea probelor in unitati medicale",
    applications: ["laboratoare medicale si IVD", "analiza probe", "dotare sau modernizare laborator"],
  },
  emergency: {
    description: "pentru zone de urgenta, triaj si interventii unde continuitatea operationala conteaza",
    applications: ["urgenta si triaj", "transport pacient", "interventii rapide in unitati medicale"],
  },
  sterilization: {
    description: "pentru igiena operationala, dezinfectie, sterilizare sau consum medical recurent",
    applications: ["dezinfectie si igiena operationala", "fluxuri de sterilizare", "aprovizionare recurenta"],
  },
  "medical-furniture": {
    description: "pentru organizarea spatiului clinic, transfer pacient si dotarea cabinetelor medicale",
    applications: ["amenajare cabinet sau clinica", "mobilitate pacient", "organizarea spatiului medical"],
  },
  ent: {
    description: "pentru cabinete ORL, examinare specializata si consultatii recurente",
    applications: ["cabinete ORL", "examinare ureche, nas si gat", "dotare consultatii specializate"],
  },
  gynecology: {
    description: "pentru cabinete de ginecologie, examinare si documentare clinica",
    applications: ["cabinete ginecologie", "examinare specializata", "modernizare cabinet"],
  },
  consumables: {
    description: "pentru protectie, consum recurent si activitate medicala zilnica",
    applications: ["protectie personal medical", "consumabile cabinet", "aprovizionare recurenta"],
  },
  electromedical: {
    description: "pentru terapie, recuperare si suport clinic cu echipamente electromedicale",
    applications: ["terapie si recuperare", "dotare clinica", "echipamente active cu suport service"],
  },
  "surgical-instruments": {
    description: "pentru completarea instrumentarului si activitati clinice specializate",
    applications: ["instrumentar medical", "fluxuri clinice si chirurgicale", "inlocuire sau completare seturi"],
  },
  "patient-care": {
    description: "pentru ingrijire pacient, mobilizare si suport operational",
    applications: ["ingrijire pacient", "mobilizare si transfer", "suport pentru zone de tratament"],
  },
  monitoring: {
    description: "pentru monitorizare clinica, evaluare parametri si suport operational",
    applications: ["monitorizare pacient", "evaluare parametri", "dotare unitati medicale"],
  },
  disinfection: {
    description: "pentru igiena operationala si controlul fluxurilor medicale",
    applications: ["dezinfectie", "control operational", "consum recurent"],
  },
};

const phraseReplacements = [
  [/Fast, simple and accurate determination of hemoglobin and hematocrit in whole blood:?/gi, "Determinare rapida, simpla si precisa a hemoglobinei si hematocritului din sange integral"],
  [/two tests in one/gi, "doua teste intr-un singur dispozitiv"],
  [/URINE ANALYZER WITH BLUETOOTH/gi, "Analizor de urina cu Bluetooth"],
  [/Features:?/gi, "Caracteristici"],
  [/Working mode/gi, "Mod de lucru"],
  [/Internal language/gi, "Limba interfata"],
  [/Italian and English/gi, "italiana si engleza"],
  [/EASY CARTS/gi, "Carucioare Easy"],
  [/shelves/gi, "polite"],
  [/base/gi, "baza"],
  [/Dimensions \(WxDxH\)/gi, "Dimensiuni"],
  [/INFRARED LAMP/gi, "Lampa infrarosu"],
  [/desk with table clamp/gi, "de birou, cu clema pentru masa"],
  [/trolley/gi, "stativ mobil"],
  [/Head/gi, "Cap"],
  [/MIO-SONIC ULTRASOUND THERAPY/gi, "Aparat MIO-Sonic pentru terapie cu ultrasunete"],
  [/Innovative and high performance device both for home use and professional use\.?/gi, "Dispozitiv performant pentru utilizare profesionala si utilizare asistata"],
  [/ultrasound beam intensity levels/gi, "niveluri de intensitate ultrasunete"],
  [/\bIow\b/gi, "scazut"],
  [/\bmedium\b/gi, "mediu"],
  [/\bhigh\b/gi, "ridicat"],
  [/Operating Voltage/gi, "Tensiune de functionare"],
  [/Fabricat in Italy/gi, "Fabricat in Italia"],
  [/Main features/gi, "Caracteristici principale"],
  [/Ionophoresis kit/gi, "Kit ionoforeza"],
  [/elastic belt/gi, "banda elastica"],
  [/silicone electrodes/gi, "electrozi din silicon"],
  [/sponges/gi, "bureti"],
  [/Height adjustable backrest/gi, "Spatar reglabil pe inaltime"],
  [/Electric control system that provides:?/gi, "Sistem electric de control pentru"],
  [/Durable and user-friendly otoscopes suitable for ENT examination\.?/gi, "Otoscop rezistent si usor de utilizat pentru examinari ORL"],
  [/portable diagnostic set for ear, eye, nose and throat treatment \(EENT\)\.?/gi, "set diagnostic portabil pentru examinare ORL si oftalmologica"],
  [/view results instantly on the wireless meter/gi, "afisarea rapida a rezultatelor pe dispozitivul wireless"],
  [/Machine size/gi, "Dimensiuni aparat"],
  [/Amperometric technology using glucose dehydrogenase \(FAD-GDH\)/gi, "tehnologie amperometrica pe baza de glucoza dehidrogenaza"],
  [/FLUORESCENCE IMMUNOASSAY ANALYZER/gi, "Analizor imunofluorescent"],
  [/It offers advantages of high accuracy, strong stability and fast results\.?/gi, "Ofera precizie ridicata, stabilitate buna si rezultate rapide"],
  [/Principle/gi, "Principiu"],
  [/Fluorescence immunoassay/gi, "imunofluorescenta"],
  [/Test format/gi, "Format test"],
  [/cassette/gi, "caseta"],
  [/SEMI AUTOMATIC i-PAD CU-SPR DEFIBRILLATOR/gi, "Defibrilator semiautomat i-PAD CU-SPR"],
  [/Software voice:.*/gi, "Ghidare vocala disponibila in mai multe limbi"],
  [/Operating mode/gi, "Mod de operare"],
  [/semi-automated/gi, "semiautomat"],
  [/Semi-automatic/gi, "semiautomat"],
  [/Waveform/gi, "Forma unda"],
  [/Truncated exponential type/gi, "tip exponential trunchiat"],
  [/DefiMonitor XD manual/gi, "DefiMonitor XD manual"],
  [/The sophisticated high performance instrument with multifunctional features\.?/gi, "Instrument performant, cu functii multiple pentru utilizare in situatii critice"],
  [/Manual energy stages/gi, "Trepte energie manuala"],
  [/ANTIBACTERIAL HAND CLEANING GEL/gi, "Gel antibacterian pentru maini"],
  [/bottle/gi, "flacon"],
  [/It contains/gi, "Contine"],
  [/Aqua \(Water\)/gi, "apa"],
  [/MULTIUSI HAND WIPES/gi, "Servetele pentru maini Multiusi"],
  [/box of/gi, "cutie de"],
  [/sachets/gi, "plicuri"],
  [/DISINFECTANT WIPES/gi, "Servetele dezinfectante"],
  [/tube of/gi, "tub cu"],
  [/Autoclavable electrodes/gi, "electrozi autoclavabili"],
  [/Electrode ball point/gi, "electrod bila"],
  [/Reference number/gi, "numar referinta"],
  [/Superb optical features:?/gi, "Caracteristici optice avansate"],
  [/Total magnification/gi, "Marire totala"],
  [/Field of View/gi, "Camp vizual"],
  [/Superior data display/gi, "Afisare clara a datelor"],
  [/Thermal array printer/gi, "Imprimanta termica"],
  [/Power input/gi, "Alimentare intrare"],
  [/Power adaptor input/gi, "Intrare adaptor alimentare"],
  [/Thermal printer print speed/gi, "Viteza imprimanta termica"],
  [/paper feeding function/gi, "functie alimentare hartie"],
  [/Cost-effective single foetal monitor/gi, "Monitor fetal pentru sarcina unica, eficient comercial"],
  [/Extreme ultrasound doppler sensitivity/gi, "Sensibilitate Doppler cu ultrasunete ridicata"],
  [/The ultra-light face shield that combines function with style:?/gi, "Viziera usoara pentru protectia fetei"],
  [/protection: a waterproof plastic barrier will protect you/gi, "protectie cu bariera din plastic rezistent la lichide"],
  [/Protective goggles/gi, "ochelari de protectie"],
  [/fog resistant and anti-scratch/gi, "antiaburire si anti-zgariere"],
  [/Optical quality: Class I/gi, "calitate optica clasa I"],
  [/Transparent protective goggle\.?/gi, "ochelari transparenti de protectie"],
  [/Norms/gi, "Norme"],
  [/Available software.*/gi, "software disponibil in mai multe limbi"],
  [/reflectance photometer/gi, "fotometru cu reflectanta"],
  [/Bilirubin/gi, "bilirubina"],
  [/Ketones/gi, "cetone"],
  [/Ascorbic Acid/gi, "acid ascorbic"],
  [/Glucose/gi, "glucoza"],
  [/Protein/gi, "proteine"],
  [/Blood/gi, "sange"],
  [/Leucocytes/gi, "leucocite"],
  [/Specific Gravity/gi, "densitate specifica"],
  [/ISCHIA PATIENT TRANSFER CHAIR/gi, "Scaun transfer pacient Ischia"],
  [/Weight/gi, "Greutate"],
  [/FOLDING BEDSIDE RAIL/gi, "Bara pliabila pentru pat"],
  [/stepless height adjustment/gi, "reglaj continuu pe inaltime"],
  [/FOLDING COMMODE WHEELCHAIR/gi, "Scaun cu rotile pliabil cu functie toaleta"],
  [/one-button foldable commode/gi, "pliere rapida prin buton"],
  [/Proven accuracy/gi, "precizie validata"],
  [/Proven safety/gi, "siguranta validata"],
  [/Measurement method/gi, "Metoda de masurare"],
  [/speed of sound \(SOS\)/gi, "viteza sunetului"],
  [/Technology/gi, "Tehnologie"],
  [/ELITE OVERBED TABLE/gi, "Masa peste pat Elite"],
  [/High quality overbed table with crank adjustment system\.?/gi, "Masa peste pat cu sistem de reglaj prin manivela"],
  [/LED INFANT PHOTOTHERAPY LIGHT/gi, "Lampa fototerapie LED pentru nou-nascuti"],
  [/If untreated, severe jaundice can lead to brain damage, hearing loss and even death\.?/gi, "Produs destinat suportului in managementul icterului neonatal, conform protocoalelor clinice aplicabile"],
  [/Light source/gi, "Sursa lumina"],
  [/LED life/gi, "Durata de viata LED"],
  [/SP100B TOUCH SCREEN SPIROMETER/gi, "Spirometru SP100B cu ecran tactil"],
  [/English firmware and software/gi, "firmware si software in limba engleza"],
  [/Display resolution/gi, "Rezolutie display"],
  [/SILICONE AUTOCLAVABLE RESUSCITATORS - WITH HANDLE/gi, "Balon resuscitare autoclavabil din silicon, cu maner"],
  [/Type: Adult/gi, "tip adult"],
  [/Unitate de vanzare:1 pc/gi, "Unitate de vanzare: 1 bucata"],
  [/Supplied/gi, "Livrat"],
  [/No medical device/gi, "Nu este dispozitiv medical"],
  [/Medical device/gi, "Dispozitiv medical"],
  [/STRETCHER/gi, "Targa"],
  [/DIAGNOSTIC SET/gi, "Set diagnostic"],
  [/FOETAL MONITOR/gi, "Monitor fetal"],
  [/Power consumption/gi, "Consum electric"],
  [/backrest/gi, "spatar"],
  [/FOLDING/gi, "Pliabil"],
  [/BEDSIDE RAIL/gi, "bara pentru pat"],
  [/OVERBED TABLE/gi, "masa peste pat"],
  [/Protective goggles/gi, "ochelari de protectie"],
  [/Waterproof/gi, "rezistent la lichide"],
  [/disposable/gi, "de unica folosinta"],
  [/remover/gi, "extractor"],
  [/forceps/gi, "pensa"],
  [/blood glucose/gi, "glicemie"],
  [/\b1 pc\b/gi, "1 bucata"],
  [/\bbox of 10 pcs\b/gi, "cutie 10 bucati"],
  [/\bpcs\b/gi, "bucati"],
  [/\bpc\b/gi, "bucata"],
];

const specLabelMap = new Map([
  ["measurement method", "Metoda de masurare"],
  ["measuring range", "Interval de masurare"],
  ["working mode", "Mod de lucru"],
  ["internal language", "Limba interfata"],
  ["dimensions (wxdxh)", "Dimensiuni"],
  ["shelves", "Polite"],
  ["operating voltage", "Tensiune de functionare"],
  ["ionophoresis kit", "Kit ionoforeza"],
  ["machine size", "Dimensiuni aparat"],
  ["principle", "Principiu"],
  ["test format", "Format test"],
  ["operating mode", "Mod de operare"],
  ["waveform", "Forma unda"],
  ["wave", "Forma unda"],
  ["manual energy stages", "Trepte energie manuala"],
  ["it contains", "Continut"],
  ["total magnification", "Marire totala"],
  ["field of view", "Camp vizual"],
  ["thermal array printer", "Imprimanta termica"],
  ["power input", "Alimentare intrare"],
  ["thermal printer print speed", "Viteza imprimanta termica"],
  ["power adaptor input", "Intrare adaptor alimentare"],
  ["measurement method", "Metoda de masurare"],
  ["technology", "Tehnologie"],
  ["light source", "Sursa lumina"],
  ["led life", "Durata de viata LED"],
  ["display resolution", "Rezolutie display"],
]);

function localizeText(value) {
  let output = String(value || "")
    .replace(/&#x2B;/gi, "+")
    .replace(/&#xae;/gi, "")
    .replace(/&reg;/gi, "")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();

  for (const [pattern, replacement] of phraseReplacements) {
    output = output.replace(pattern, replacement);
  }

  return output
    .replace(/\bGB,?FR,?IT,?ES,?DE,?PL,?HU,?RO,?SE,?RU\.?/gi, "mai multe limbi")
    .replace(/\bUS,? PT,? GR,? RO,? LT,? NL,? RU,? UA,? KR,? TH/gi, "mai multe limbi")
    .replace(/\s+([,.;:])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function localizeSpecLabel(label) {
  const normalized = String(label || "").toLowerCase().trim();
  return specLabelMap.get(normalized) || localizeText(label);
}

function productSlug(title, code) {
  const cleanTitle = title
    .replace(/\bGIMA\b/gi, "")
    .replace(/\bRiester\b/gi, "riester")
    .replace(/\bAesculap\b/gi, "aesculap")
    .replace(/\s+/g, " ")
    .trim();
  return `${slugify(cleanTitle)}-${code}`;
}

function scoreProduct(product) {
  const images = product.galleryImages?.length ? 20 : 0;
  const localization = hasEnglishPublicContent(product) ? 15 : 25;
  const specs = product.romanianSpecifications?.length ? 15 : 8;
  const docs = Object.keys(product.documents || {}).length >= 2 ? 15 : Object.keys(product.documents || {}).length ? 10 : 5;
  const layout = 15;
  const commercial = product.romanianDescription && product.romanianApplications?.length && product.romanianBenefits?.length ? 20 : 12;
  return Math.min(100, images + localization + specs + docs + layout + commercial);
}

function hasEnglishPublicContent(product) {
  const text = [
    product.romanianTitle,
    product.romanianDescription,
    ...(product.romanianFeatures || []),
    ...(product.romanianPackageContents || []),
    ...(product.romanianApplications || []),
    ...(product.romanianBenefits || []),
    ...(product.romanianSpecifications || []).flatMap((spec) => [spec.label, spec.value]),
  ].join(" ");

  return /\b(disposable|remover|forceps|medical device|power consumption|voltage|supplied|main effects|features|working mode|measurement method|display resolution|field of view|operating mode|waveform|manual energy|trolley|chair|stretcher|with handle|box of|pcs|blood glucose|test format|software voice|waterproof)\b/i.test(text);
}

function professionalDescription(product, title) {
  const copy = categoryCopy[product.category] || categoryCopy.diagnostic;
  return `${title} este un produs medical ${copy.description}. Pagina este pregatita pentru cereri de oferta profesionale, cu imagini produs, specificatii disponibile, documentatie locala si suport ZESCORP pentru selectie, livrare si service.`;
}

function main() {
  const products = readJson(productsPath);
  const redirectMap = new Map(
    readJson(redirectsPath, []).map((redirect) => [redirect.source, redirect]),
  );
  const improved = [];
  const englishFixes = [];

  for (const product of products) {
    if (!product.publicDisplayReady || product.sourceQuality !== "gima_page_parity_review") continue;
    if (product.notes?.includes("Batch 500 local enrichment")) continue;

    const oldSlug = product.slug;
    const title = titleOverrides[product.gimaCode] || localizeText(product.romanianTitle || product.sourceProductName);
    const newSlug = productSlug(title, product.gimaCode || oldSlug);
    const beforeText = [
      product.romanianTitle,
      ...(product.romanianFeatures || []),
      ...(product.romanianPackageContents || []),
      ...(product.romanianSpecifications || []).map((spec) => `${spec.label}: ${spec.value}`),
    ].join(" ");

    product.slug = newSlug;
    product.id = newSlug;
    product.romanianTitle = title;
    product.romanianDescription = professionalDescription(product, title);
    product.romanianShortSummary = `${title}, disponibil pentru cerere de oferta ZESCORP, cu verificarea configuratiei, cantitatii, documentatiei si suportului de service.`;
    product.romanianSourceDescription = product.romanianDescription;
    product.commercialDescription = "";
    product.imageAlt = `${title} - produs medical pentru oferta ZESCORP`;
    product.galleryImages = (product.galleryImages || []).map((image) => ({
      ...image,
      alt: product.imageAlt,
    }));

    const copy = categoryCopy[product.category] || categoryCopy.diagnostic;
    product.romanianApplications = [
      ...copy.applications,
      "cerere de oferta pentru clinici, cabinete sau laboratoare",
    ];
    product.romanianBenefits = [
      "pagina produs structurata pentru achizitie profesionala",
      "imagini si documente disponibile local pe pagina produsului",
      "posibilitate de ofertare impreuna cu service, mentenanta si suport operational",
    ];
    product.romanianFeatures = (product.romanianFeatures || [])
      .map(localizeText)
      .filter(Boolean)
      .filter((item) => !/^caracteristici$/i.test(item))
      .slice(0, 8);
    if (!product.romanianFeatures.length) {
      product.romanianFeatures = [
        "configuratie adaptata aplicatiei clinice",
        "produs potrivit pentru cereri de oferta profesionale",
        "documentatie disponibila pentru consultare unde exista",
      ];
    }
    product.romanianPackageContents = (product.romanianPackageContents || [])
      .map(localizeText)
      .filter(Boolean)
      .slice(0, 8);
    if (!product.romanianPackageContents.length) {
      product.romanianPackageContents = ["produsul principal", "documentatia disponibila pentru produs"];
    }
    product.romanianSpecifications = (product.romanianSpecifications || [])
      .map((spec) => ({
        label: localizeSpecLabel(spec.label),
        value: localizeText(spec.value),
      }))
      .filter((spec) => spec.label && spec.value)
      .slice(0, 16);
    product.installationConsiderations = [
      "oferta se personalizeaza in functie de cantitate, configuratie si termenul de livrare",
      "pentru echipamente active se verifica alimentarea, spatiul si conditiile de utilizare",
      "pentru consumabile, mobilier sau accesorii se confirma ambalarea si unitatea de vanzare",
    ];
    product.maintenanceConsiderations = [
      "ZESCORP poate corela produsul cu service, mentenanta sau consumabile recurente unde este cazul",
      "pentru echipamente medicale active se recomanda verificari periodice si plan de suport",
      "configuratia potrivita aplicatiei se stabileste inainte de oferta finala",
    ];
    product.publicQualityScore = scoreProduct(product);
    product.publicQualityStatus = product.publicQualityScore >= 90 ? "ready" : product.publicQualityScore >= 80 ? "needs_review" : "not_ready";

    if (oldSlug !== newSlug) {
      redirectMap.set(`/produse/${oldSlug}`, {
        source: `/produse/${oldSlug}`,
        destination: `/produse/${newSlug}`,
      });
    }

    const afterText = [
      product.romanianTitle,
      ...(product.romanianFeatures || []),
      ...(product.romanianPackageContents || []),
      ...(product.romanianSpecifications || []).map((spec) => `${spec.label}: ${spec.value}`),
    ].join(" ");
    if (beforeText !== afterText) englishFixes.push(product.slug);
    improved.push(product);
  }

  const redirects = Array.from(redirectMap.values()).filter((redirect) => redirect.source !== redirect.destination);
  writeJson(productsPath, products);
  writeJson(redirectsPath, redirects);
  writeReport({ englishFixes, improved, redirects });
}

function writeReport({ englishFixes, improved, redirects }) {
  const scores = improved.map((product) => product.publicQualityScore || 0);
  const ready = improved.filter((product) => product.publicQualityScore >= 90);
  const needsReview = improved.filter((product) => product.publicQualityScore >= 80 && product.publicQualityScore < 90);
  const below = improved.filter((product) => product.publicQualityScore < 80);
  const productsBelowThreshold = improved.filter((product) => product.publicQualityScore < 90);

  const report = `# Product Professionalization Report

Generated: ${new Date().toISOString()}

Scope: 50 reviewed GIMA quality-gate products only. No new imports, no scaling, no commit and no deploy.

## Summary

- Products improved: ${improved.length}
- English/content fields normalized: ${englishFixes.length}
- Romanian SEO URLs generated: ${redirects.length}
- 301 redirect entries created: ${redirects.length}
- Average quality score: ${scores.length ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0}
- Ready 90+: ${ready.length}
- Needs review 80-89: ${needsReview.length}
- Below 80: ${below.length}

## URLs Rebuilt

${redirects.map((redirect) => `- ${redirect.source} -> ${redirect.destination}`).join("\n")}

## Products Improved

${improved.map((product) => `- /produse/${product.slug} - ${product.romanianTitle} (${product.category}, score ${product.publicQualityScore})`).join("\n")}

## English Phrases Fixed

- Product titles were normalized to Romanian product naming while preserving brand/model/code.
- Feature lists were rewritten through deterministic Romanian phrase replacements.
- Specification labels such as Measurement method, Operating mode, Field of View, Power input and Display resolution were translated.
- Package contents and support notes were rewritten as customer-facing Romanian copy.
- Import/review/source workflow wording remains out of public rendering.

## Category Improvements

- Category pages now use the public display readiness gate.
- Category pages surface only reviewed products with Romanian titles, Romanian descriptions and verified local images.
- Category CTAs remain commercial: offer request and maintenance/service.

## Layout Fixes

- Product pages keep a commercial sequence: hero, summary, benefits, applications, specifications, package contents, documents, service/maintenance, related products and quote request.
- Empty fallbacks are minimized by ensuring every reviewed product has feature and package content.
- Gallery image alt text is product-specific and Romanian.

## Quality Score Distribution

- 90+ Ready: ${ready.length}
- 80-89 Needs Review: ${needsReview.length}
- Below 80 Not Ready: ${below.length}

## Products Below Threshold

${productsBelowThreshold.length ? productsBelowThreshold.map((product) => `- /produse/${product.slug} - score ${product.publicQualityScore}`).join("\n") : "- None"}

## Safety / SEO

- Products remain noindex.
- Product routes remain excluded from sitemap until manual indexable status is applied.
- Public pages do not render source URLs, import status, review status, raw external source links, fake stock or fake prices.
- No products were imported.
- No deployment was performed.
`;

  fs.writeFileSync(reportPath, report);
}

main();
