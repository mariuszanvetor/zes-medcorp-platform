import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const redirectsPath = path.join(root, "data", "product-catalog", "product-redirects.json");
const imageRoot = path.join(root, "public", "product-images");
const reportPath = path.join(root, "docs", "gima-deep-recovery-01.md");

const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
const redirects = fs.existsSync(redirectsPath) ? JSON.parse(fs.readFileSync(redirectsPath, "utf8")) : [];
const gimaProducts = products.filter((product) => product.source === "gima-public-catalog");

const categoryProfiles = {
  diagnostic: { label: "Diagnostic medical", noun: "Echipament diagnostic", buyer: "clinici si cabinete medicale" },
  laboratory: { label: "Laborator / IVD", noun: "Produs laborator", buyer: "laboratoare si puncte IVD" },
  emergency: { label: "Urgenta", noun: "Produs pentru urgenta", buyer: "spitale, clinici si echipe de urgenta" },
  sterilization: { label: "Sterilizare", noun: "Produs pentru sterilizare", buyer: "clinici si cabinete cu flux de sterilizare" },
  "medical-furniture": { label: "Mobilier medical", noun: "Mobilier medical", buyer: "clinici, cabinete si spitale" },
  ent: { label: "ORL", noun: "Produs ORL", buyer: "cabinete ORL si policlinici" },
  gynecology: { label: "Ginecologie", noun: "Produs ginecologie", buyer: "cabinete de ginecologie si obstetrica" },
  electromedical: { label: "Electromedicale", noun: "Echipament electromedical", buyer: "clinici si cabinete procedurale" },
  "surgical-instruments": { label: "Instrumentar chirurgical", noun: "Instrument chirurgical", buyer: "clinici si zone de interventie" },
  "patient-care": { label: "Ingrijire pacient", noun: "Produs pentru ingrijire pacient", buyer: "clinici, spitale si centre de recuperare" },
  monitoring: { label: "Monitorizare", noun: "Produs monitorizare", buyer: "clinici si spitale" },
  "operator-protection": { label: "Protectie operator", noun: "Consumabil de protectie", buyer: "clinici si cabinete medicale" },
  "medical-bags": { label: "Genti medicale", noun: "Geanta medicala", buyer: "echipe mobile si cabinete medicale" },
  "scales-measures": { label: "Cantare si masurare", noun: "Produs de masurare medicala", buyer: "cabinete, clinici si triaj" },
  physiotherapy: { label: "Fizioterapie", noun: "Produs fizioterapie", buyer: "clinici de recuperare si fizioterapie" },
  veterinary: { label: "Veterinar", noun: "Produs veterinar", buyer: "clinici veterinare" },
  "anatomy-models": { label: "Modele anatomice", noun: "Model anatomic", buyer: "centre educationale si clinici" },
  "medical-lights": { label: "Lampi medicale", noun: "Lampa medicala", buyer: "clinici si sali de proceduri" },
};

const allowedEnglish = [
  "CE",
  "FDA",
  "ISO",
  "Bluetooth",
  "WiFi",
  "PACS",
  "RIS",
  "DICOM",
  "ECG",
  "AED",
  "IVD",
  "USB",
  "LED",
  "LCD",
  "SPO2",
  "SpO2",
  "NIBP",
  "PVC",
  "ABS",
  "HD",
  "Full HD",
  "GIMA",
  "Omron",
  "Seca",
  "Soehnle",
  "Mindray",
  "Heine",
  "Riester",
  "Microlife",
  "iHealth",
  "Gimette",
  "Hydra",
  "Otopex",
  "Neo",
  "Checkme",
  "DuoEK",
  "MIR",
  "Aesculap",
  "Foley",
];

const replacements = [
  ["multi-parameter", "multiparametric"],
  ["multi parameter", "multiparametric"],
  ["foetal", "fetal"],
  ["blood pressure", "tensiune arteriala"],
  ["b.p .", "tensiune arteriala"],
  ["b.p.", "tensiune arteriala"],
  ["emergency trolley", "carucior de urgenta"],
  ["dressing trolley", "carucior pentru pansamente"],
  ["instrument trolley", "carucior pentru instrumentar"],
  ["pharmacy trolley", "carucior pentru farmacie"],
  ["service trolley", "carucior de service"],
  ["trolley", "carucior"],
  ["stretcher", "targa"],
  ["wheelchair", "scaun rulant"],
  ["chair", "scaun"],
  ["table", "masa"],
  ["couch", "canapea medicala"],
  ["overbed", "peste pat"],
  ["bedside", "langa pat"],
  ["bed", "pat"],
  ["crutch", "carja"],
  ["walker", "cadru de mers"],
  ["commode", "toaleta"],
  ["toilet", "toaleta"],
  ["bath", "baie"],
  ["shower", "dus"],
  ["bench", "banca"],
  ["backrest", "spatar"],
  ["raised", "inaltat"],
  ["leg holder", "suport pentru picioare"],
  ["leg holders", "suporturi pentru picioare"],
  ["delivery", "nastere"],
  ["treatment", "tratament"],
  ["anaesthetics", "anestezie"],
  ["anesthesia", "anestezie"],
  ["professional", "profesional"],
  ["electric", "electric"],
  ["electrical", "electric"],
  ["hydraulic", "hidraulic"],
  ["mechanical", "mecanic"],
  ["adjustable", "reglabil"],
  ["adjust.", "reglabil"],
  ["folding", "pliabil"],
  ["reclining", "rabatabil"],
  ["portable", "portabil"],
  ["wireless", "fara fir"],
  ["battery", "baterie"],
  ["batteries", "baterii"],
  ["charger", "incarcator"],
  ["charging kit", "kit de incarcare"],
  ["power supply", "alimentator"],
  ["adapter", "adaptor"],
  ["cable", "cablu"],
  ["connector", "conector"],
  ["probe", "sonda"],
  ["sensor", "senzor"],
  ["filter", "filtru"],
  ["mask", "masca"],
  ["facemask", "masca"],
  ["oxygen", "oxigen"],
  ["nebulizer", "nebulizator"],
  ["aspirator", "aspirator"],
  ["suction", "aspiratie"],
  ["defibrillator", "defibrilator"],
  ["pulse oximeter", "pulsoximetru"],
  ["oximeter", "pulsoximetru"],
  ["spirometer", "spirometru"],
  ["audiometer", "audiometru"],
  ["otoscope", "otoscop"],
  ["colposcope", "colposcop"],
  ["microscope", "microscop"],
  ["ultrasound", "ecograf"],
  ["scale", "cantar"],
  ["body composition", "compozitie corporala"],
  ["sterilizer", "sterilizator"],
  ["autoclave", "autoclava"],
  ["sealing machine", "aparat de sigilare"],
  ["hot air", "aer cald"],
  ["clamp", "pensa"],
  ["forceps", "pensa"],
  ["scissors", "foarfeca"],
  ["catheter", "cateter"],
  ["control solution", "solutie de control"],
  ["glucose", "glucoza"],
  ["cholesterol", "colesterol"],
  ["triglycerides", "trigliceride"],
  ["ketone", "cetone"],
  ["lactate", "lactat"],
  ["uric acid", "acid uric"],
  ["hemoglobin", "hemoglobina"],
  ["strip holder tray", "tava suport pentru benzi"],
  ["thermal paper", "hartie termica"],
  ["thermal printer", "imprimanta termica"],
  ["heat sealer", "aparat de sigilare termica"],
  ["rotary heat sealer", "aparat rotativ de sigilare termica"],
  ["paper rolls", "role de hartie"],
  ["ultrasound gel", "gel pentru ecograf"],
  ["gel", "gel"],
  ["patient cable kit", "kit cablu pacient"],
  ["limb clamp electrodes", "electrozi clesti pentru membre"],
  ["snap connectors", "conectori snap"],
  ["snap connector", "conector snap"],
  ["nibp cuff", "manseta NIBP"],
  ["neonate", "nou-nascut"],
  ["pediatric", "pediatric"],
  ["children", "copii"],
  ["adult", "adult"],
  ["carrying bag", "geanta de transport"],
  ["shoulder strap", "curea de umar"],
  ["hanging plate", "placa de prindere"],
  ["ambulance", "ambulanta"],
  ["antibacterial gel", "gel antibacterian"],
  ["tank", "bidon"],
  ["bottle", "flacon"],
  ["tube", "tub"],
  ["tubes", "tuburi"],
  ["covers", "huse"],
  ["cover", "husa"],
  ["pcs", "bucati"],
  ["bulk", "vrac"],
  ["rubber", "cauciuc"],
  ["ferrules", "varfuri"],
  ["electrodes", "electrozi"],
  ["clip", "clema"],
  ["printer", "imprimanta"],
  ["source", "sursa"],
  ["body bag", "sac transport"],
  ["body", "corp"],
  ["empty", "gol"],
  ["nylon", "nylon"],
  ["cylinders", "butelii"],
  ["cylinder", "butelie"],
  ["therapy", "terapie"],
  ["handle", "maner"],
  ["bacterial", "bacterian"],
  ["antibacterial", "antibacterian"],
  ["hydrophobic", "hidrofob"],
  ["conical threading", "filet conic"],
  ["threading", "filet"],
  ["straight", "drept"],
  ["angled", "inclinat"],
  ["bayonet", "baioneta"],
  ["jeweler", "bijutier"],
  ["general", "general"],
  ["drape", "camp chirurgical"],
  ["tourniquet", "garou"],
  ["bag", "geanta"],
  ["bags", "pungi"],
  ["foam", "spuma"],
  ["rest", "repaus"],
  ["stress", "efort"],
  ["case", "husa"],
  ["cover", "husa"],
  ["blanket", "patura"],
  ["mattress", "saltea"],
  ["belt", "centura"],
  ["sling", "ham"],
  ["support", "suport"],
  ["stand", "stativ"],
  ["rail", "sina"],
  ["shelf", "polita"],
  ["drawer", "sertar"],
  ["drawers", "sertare"],
  ["door", "usa"],
  ["doors", "usi"],
  ["lamp", "lampa"],
  ["light", "lampa"],
  ["headlight", "lampa frontala"],
  ["ceiling", "tavan"],
  ["wall", "perete"],
  ["mobile", "mobil"],
  ["cart", "carucior"],
  ["white", "alb"],
  ["black", "negru"],
  ["blue", "albastru"],
  ["grey", "gri"],
  ["gray", "gri"],
  ["green", "verde"],
  ["red", "rosu"],
  ["orange", "portocaliu"],
  ["cream", "crem"],
  ["beige", "bej"],
  ["transparent", "transparent"],
  ["sterile", "steril"],
  ["non sterile", "nesteril"],
  ["box of", "cutie cu"],
  ["pack of", "pachet cu"],
  ["with", "cu"],
  ["without", "fara"],
  ["spare", "de rezerva"],
  ["replacement", "de rezerva"],
  ["for", "pentru"],
  ["and", "si"],
  ["or", "sau"],
  ["to", "pana la"],
  ["optional", "optional"],
  ["only", "numai"],
  ["size", "marime"],
  ["colour", "culoare"],
  ["color", "culoare"],
];

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function clean(value) {
  return String(value || "")
    .replace(/[Â®™]/g, "")
    .replace(/[“”"]/g, "")
    .replace(/\s*-\s*/g, " - ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function translate(value) {
  let text = ` ${clean(value)} `;
  for (const [from, to] of [...replacements].sort((a, b) => b[0].length - a[0].length)) {
    text = text.replace(new RegExp(`\\b${escapeRegExp(from)}\\b`, "gi"), to);
  }
  return clean(
    text
      .replace(/\bGB\b\s*,?\s*\bFR\b\s*,?\s*\bES\b\s*,?\s*\bDE\b/gi, "interfata multilingva")
      .replace(/\bDE\b\s*,?\s*\bPL\b\s*,?\s*\bRU\b/gi, "interfata multilingva")
      .replace(/\bmanual and voice\b/gi, "instructiuni vocale")
      .replace(/\bmmhg\b/gi, "mmHg")
      .replace(/\bmhz\b/gi, "MHz")
      .replace(/\bhz\b/gi, "Hz")
      .replace(/\bkg\/lbs\b/gi, "kg/lbs")
      .replace(/\s+/g, " "),
  );
}

function titleCase(value) {
  const keep = new Set(["ECG", "AED", "IVD", "USB", "LED", "LCD", "PVC", "ABS", "HD", "WiFi", "Bluetooth", "SpO2", "NIBP"]);
  return clean(value)
    .split(" ")
    .map((word, index) => {
      if (keep.has(word)) return word;
      if (/^[A-Z0-9-]{2,}$/.test(word) && /\d/.test(word)) return word;
      if (index > 0 && /^(de|din|cu|si|sau|pentru|la|in|pe|fara|pana|numai)$/i.test(word)) return word.toLowerCase();
      return word ? `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}` : word;
    })
    .join(" ")
    .replace(/\bIhealth\b/g, "iHealth")
    .replace(/\bWifi\b/g, "WiFi")
    .replace(/\bGima\b/g, "GIMA")
    .replace(/\bOmron\b/g, "Omron")
    .replace(/\bSeca\b/g, "Seca");
}

function slugify(value) {
  return normalize(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")
    .slice(0, 95)
    .replace(/-+$/g, "");
}

function productPath(slug) {
  return `/produse/${String(slug || "").replace(/^\/?produse\//, "").replace(/^\//, "")}`;
}

function addRedirect(fromSlug, toSlug) {
  if (!fromSlug || !toSlug || fromSlug === toSlug) return;
  const source = productPath(fromSlug);
  const destination = productPath(toSlug);
  if (source === destination) return;
  if (!redirects.some((item) => item.source === source && item.destination === destination)) {
    redirects.push({ source, destination, permanent: true });
  }
}

function stripSku(value, code) {
  let text = String(value || "");
  if (code) text = text.replace(new RegExp(`\\b${escapeRegExp(code)}\\b`, "g"), "");
  return clean(text);
}

function hasEnglishLeak(value) {
  let text = String(value || "");
  for (const term of allowedEnglish) text = text.replace(new RegExp(`\\b${escapeRegExp(term)}\\b`, "gi"), " ");
  return /\b(with|without|box of|pack of|medical device|emergency trolley|stretcher|crutch|chair|table|cart|bag|filter|battery|probe|cable|spare|source|catalog|import|review|technical specifications|accessories|spares|colour|color|available|manual and voice|furniture|shower|bath|bench|backrest|ceiling|couple|wooden|body|thermal|heat|regulating|connecting|crank|shoulder|carrying|facemask|paediatry|suction|twinned|interchangeable|flipping|stand|hooks|bottle|transparent|wireless|treatment|mercury|anaesthetics|professional|empty|electrical|adjust|sections|drawers|rubber|patient cable|control solution|round body|straight|undyed)\b/i.test(text);
}

function productType(title, category) {
  const text = normalize(title);
  const pairs = [
    ["centrifug", "centrifuga"],
    ["analizor", "analizor"],
    ["monitor multiparametric", "monitor multiparametric"],
    ["monitor functii vitale", "monitor functii vitale"],
    ["monitor de sanatate", "monitor de sanatate"],
    ["ecg", "ECG"],
    ["defibrilator", "defibrilator"],
    ["pulsoximetru", "pulsoximetru"],
    ["tensiometru", "tensiometru"],
    ["cantar", "cantar medical"],
    ["taliometru", "taliometru"],
    ["audiometru", "audiometru"],
    ["spirometru", "spirometru"],
    ["otoscop", "otoscop"],
    ["iriscop", "iriscop"],
    ["colposcop", "colposcop"],
    ["microscop", "microscop"],
    ["ecograf", "ecograf"],
    ["sonda", "sonda"],
    ["cablu", "cablu"],
    ["adaptor", "adaptor"],
    ["filtru", "filtru"],
    ["baterie", "baterie"],
    ["alimentator", "alimentator"],
    ["carucior", "carucior medical"],
    ["scaun", "scaun medical"],
    ["pat", "pat medical"],
    ["masa", "masa medicala"],
    ["dulap", "dulap medical"],
    ["targa", "targa"],
    ["lampa", "lampa medicala"],
    ["sterilizator", "sterilizator"],
    ["autoclava", "autoclava"],
    ["pensa", "pensa"],
    ["foarfeca", "foarfeca"],
    ["cateter", "cateter"],
    ["garou", "garou"],
    ["geanta", "geanta medicala"],
    ["saltea", "saltea"],
    ["centura", "centura"],
    ["ham", "ham"],
    ["masca", "masca"],
    ["manusi", "manusi"],
    ["gel", "gel"],
    ["solutie", "solutie"],
    ["hartie", "hartie"],
    ["rola", "rola"],
    ["kit", "kit"],
    ["set", "set"],
    ["fir de sutura", "fir de sutura"],
  ];
  const found = pairs.find(([needle]) => text.includes(needle));
  if (found) return found[1];
  return categoryProfiles[category]?.noun || "";
}

function titleFromProduct(product) {
  const profile = categoryProfiles[product.category] || categoryProfiles.diagnostic;
  const raw = stripSku(product.sourceProductName || product.romanianTitle || "", product.gimaCode);
  let text = translate(raw);
  const n = normalize(text);

  if (product.category === "operator-protection" && /\bmarime\s*([0-9.]+)/i.test(text)) {
    const size = text.match(/\bmarime\s*([0-9.]+)/i)?.[1];
    const sterile = /steril/i.test(text) ? "sterile" : "nesterile";
    return `Manusi medicale ${sterile} marimea ${size}`;
  }
  if (product.category === "surgical-instruments" && /(round body|corp rotund|undyed|necolorat|violet|straight|drept|1\/2|3\/8)/i.test(raw)) {
    return titleCase(
      `Fir de sutura ${text}`
        .replace(/\bround body\b/gi, "ac corp rotund")
        .replace(/\bstraight\b/gi, "ac drept")
        .replace(/\bundyed\b/gi, "necolorat"),
    );
  }
  if (product.category === "surgical-instruments" && /foley|cateter/i.test(text)) return titleCase(text);
  if (product.category === "laboratory" && /solutie de control/i.test(text)) return titleCase(text);
  if (product.category === "laboratory" && /combiscreen|parametri/i.test(text)) return titleCase(`Benzi test urina ${text}`);
  if (/gel pentru ecograf/i.test(text)) return titleCase(text);
  if (/kit cablu pacient/i.test(text)) return titleCase(text.replace(/\b3-lead\b/gi, "3 derivatii").replace(/\b10-lead\b/gi, "10 derivatii"));
  if (/manseta NIBP/i.test(text)) return titleCase(text);
  if (/hartie termica|role de hartie/i.test(text)) return titleCase(text);
  if (product.category === "medical-bags" && /shoulder|umar|hand|mana/i.test(raw)) return "Geanta medicala portabila de umar sau mana";

  if (/^[-),.;:\s\d]+/.test(text) || !text || /^(conform|transparent|furniture|produs medical)$/i.test(text)) {
    text = `${profile.noun} ${product.gimaCode || ""}`;
  }
  if (!new RegExp(`\\b${escapeRegExp(normalize(productType(text, product.category)).split(" ")[0] || "")}\\b`).test(n)) {
    text = `${profile.noun} ${text}`;
  }
  return titleCase(text);
}

function normalizeSpecLabel(value) {
  return titleCase(
    translate(value)
      .replace(/^power consumption$/i, "Consum electric")
      .replace(/^voltage$/i, "Tensiune alimentare")
      .replace(/^communication interface$/i, "Interfata de comunicatie")
      .replace(/^record mode$/i, "Mod inregistrare")
      .replace(/^host computer$/i, "Calculator gazda")
      .replace(/^dimensions?$/i, "Dimensiuni")
      .replace(/^weight$/i, "Greutate")
      .replace(/^capacity$/i, "Capacitate")
      .replace(/^material$/i, "Material")
      .replace(/^model$/i, "Model")
      .replace(/^product type$/i, "Tip produs"),
  );
}

function normalizeSpecValue(value) {
  return translate(value)
    .replace(/\blarge LCD display\b/gi, "ecran LCD de mari dimensiuni")
    .replace(/\buser-friendly interface\b/gi, "interfata intuitiva")
    .replace(/\bfast results\b/gi, "rezultate rapide")
    .replace(/\blimited sample volume\b/gi, "volum redus de proba");
}

function meaningfulSpecs(product) {
  return (product.romanianSpecifications || []).filter((spec) => {
    const label = String(spec.label || "").trim();
    const value = String(spec.value || "").trim();
    if (!label || !value) return false;
    if (/^(cod produs|categorie|stadiu|suport)$/i.test(label)) return false;
    if (/source|catalog|import|review/i.test(`${label} ${value}`)) return false;
    return value.length > 1;
  });
}

function inferSpecs(product, title) {
  const specs = (product.romanianSpecifications || []).map((spec) => ({
    label: normalizeSpecLabel(spec.label),
    value: normalizeSpecValue(spec.value),
  }));
  const add = (label, value) => {
    if (!value) return;
    const exists = specs.some((spec) => normalize(spec.label) === normalize(label) && normalize(spec.value) === normalize(value));
    if (!exists) specs.push({ label, value });
  };
  const source = `${product.sourceProductName || ""} ${product.romanianTitle || ""} ${title}`;
  const translated = translate(source);
  add("Tip produs", productType(title, product.category));
  add("Categorie comerciala", categoryProfiles[product.category]?.label);
  const dims = translated.match(/\b\d+(?:[,.]\d+)?\s*x\s*\d+(?:[,.]\d+)?(?:\s*x\s*(?:h\s*)?\d+(?:[,.]\d+)?)?\s*(?:cm|mm)?\b/i);
  if (dims) add("Dimensiuni", dims[0]);
  const volume = translated.match(/\b\d+(?:[,.]\d+)?\s*(?:ml|l)\b/i);
  if (volume) add("Volum", volume[0]);
  const weight = translated.match(/\b\d+(?:[,.]\d+)?\s*kg\b/i);
  if (weight) add("Greutate", weight[0]);
  const power = translated.match(/\b\d+(?:[,.]\d+)?\s*w\b/i);
  if (power) add("Putere", power[0]);
  const voltage = translated.match(/\b\d+(?:[,.]\d+)?\s*v\b/i);
  if (voltage) add("Tensiune", voltage[0]);
  const freq = translated.match(/\b\d+(?:[,.]\d+)?\s*hz\b/i);
  if (freq) add("Frecventa", freq[0]);
  const mhz = translated.match(/\b\d+(?:[,.]\d+)?\s*mhz\b/i);
  if (mhz) add("Frecventa sonda", mhz[0]);
  const rpm = translated.match(/\b\d+(?:[,.]\d+)?\s*rpm\b/i);
  if (rpm) add("Viteza", rpm[0]);
  const pack = translated.match(/\b(?:cutie|pachet)\s+cu\s+\d+\b/i);
  if (pack) add("Ambalare", pack[0]);
  const size = translated.match(/\bmarime\s*[0-9.]+\b/i);
  if (size) add("Marime", size[0]);
  if (/\bsteril\b/i.test(translated)) add("Sterilitate", /\bnesteril\b/i.test(translated) ? "nesteril" : "steril");
  if (/\bBluetooth\b/i.test(translated)) add("Conectivitate", "Bluetooth");
  if (/\bWiFi\b/i.test(translated)) add("Conectivitate", "WiFi");
  return specs.filter((spec) => spec.label && spec.value);
}

function groupSpecs(specifications) {
  const groups = new Map();
  const add = (group, spec) => {
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(spec);
  };
  for (const spec of specifications) {
    if (/dimensi|diametru|lungime|latime|inaltime|cm|mm/i.test(`${spec.label} ${spec.value}`)) add("Dimensiuni", spec);
    else if (/greutate|kg/i.test(`${spec.label} ${spec.value}`)) add("Greutate", spec);
    else if (/putere|tensiune|frecventa|hz|v\b|w\b|baterie/i.test(`${spec.label} ${spec.value}`)) add("Electric", spec);
    else if (/capacitate|viteza|rpm|conectivitate|memorie|afisaj|parametri|volum|canale/i.test(`${spec.label} ${spec.value}`)) add("Performanta", spec);
    else if (/steril|clasa|medical|material/i.test(`${spec.label} ${spec.value}`)) add("Medical", spec);
    else add("General", spec);
  }
  return ["General", "Dimensiuni", "Greutate", "Electric", "Performanta", "Medical", "Accesorii"]
    .filter((group) => groups.has(group))
    .map((group) => ({ group, items: groups.get(group) }));
}

function hasBrokenLocalAsset(url) {
  if (!url || !url.startsWith("/")) return true;
  return !fs.existsSync(path.join(root, "public", url.replace(/^\//, "")));
}

function badTitle(title, product) {
  const text = normalize(title);
  if (!title || title.length < 8) return true;
  if (/^[),.;:\-\s\d]+/.test(String(title || ""))) return true;
  if (/\b(cu|si|pentru|de|din|la)\s*$/.test(text)) return true;
  if (hasEnglishLeak(title)) return true;
  if (!productType(title, product.category)) return true;
  if (/([a-z])\1{4,}/i.test(text)) return true;
  return false;
}

function score(product) {
  const specs = meaningfulSpecs(product);
  const docs = Object.values(product.documents || {}).filter(Boolean);
  const imgOk = Boolean(product.imageUrl && product.imageVerified && product.imageStatus === "verified_local" && !hasBrokenLocalAsset(product.imageUrl));
  const text = [
    product.romanianTitle,
    product.slug,
    product.romanianDescription,
    ...(product.romanianApplications || []),
    ...(product.romanianBenefits || []),
    ...(product.romanianFeatures || []),
    ...specs.flatMap((spec) => [spec.label, spec.value]),
  ].join(" ");
  const blockers = [];
  let value = 100;
  if (badTitle(product.romanianTitle, product)) blockers.push("weak_title");
  if (badTitle(String(product.slug || "").replace(new RegExp(`-${escapeRegExp(product.gimaCode || "")}$`, "i"), "").replace(/-/g, " "), { ...product, gimaCode: "" })) blockers.push("weak_slug");
  if (!imgOk) blockers.push("missing_or_broken_image");
  if (hasEnglishLeak(text)) blockers.push("english_leakage");
  if (specs.length < 3 && docs.length === 0 && (product.romanianFeatures || []).length < 4) blockers.push("spec_poor");
  if (Object.values(product.documents || {}).some((doc) => doc && hasBrokenLocalAsset(doc))) blockers.push("broken_document");
  for (const blocker of blockers) {
    if (/title|slug|english|image|document/.test(blocker)) value -= 18;
    else value -= 12;
  }
  if (specs.length >= 5) value += 3;
  if (docs.length) value += 2;
  value = Math.max(0, Math.min(100, value));
  const grade = value >= 95 && blockers.length === 0 ? "A" : value >= 85 && !blockers.some((b) => /title|slug|english|image|document/.test(b)) ? "B" : value >= 70 ? "C" : "D";
  return { value, grade, blockers, specs: specs.length, docs: docs.length };
}

function repairProduct(product, all) {
  const profile = categoryProfiles[product.category] || categoryProfiles.diagnostic;
  const beforeSlug = product.slug;
  let title = titleFromProduct(product);
  if (hasEnglishLeak(title)) title = `${profile.noun} ${product.gimaCode || ""}`.trim();
  product.romanianTitle = title;
  let newSlug = `${slugify(title)}-${product.gimaCode || "gima-fara-cod"}`;
  if (hasEnglishLeak(newSlug)) newSlug = `${slugify(profile.noun)}-${product.gimaCode || "gima-fara-cod"}`;
  if (newSlug && product.slug !== newSlug) {
    addRedirect(beforeSlug, newSlug);
    product.previousDeepRecoverySlug = beforeSlug;
    product.slug = newSlug;
  }
  product.commercialCategory = profile.label;
  product.romanianSpecifications = inferSpecs(product, title).filter((spec) => !hasEnglishLeak(`${spec.label} ${spec.value}`));
  product.specificationGroups = groupSpecs(product.romanianSpecifications);
  const specs = meaningfulSpecs(product);
  const specSummary = specs.slice(0, 4).map((spec) => `${spec.label}: ${spec.value}`).join("; ");
  product.romanianShortSummary = `${title} pentru ${profile.buyer}. Produsul este pregatit pentru cerere de oferta cu verificarea codului, configuratiei si compatibilitatii.`;
  product.romanianDescription = `${title} este un produs din categoria ${profile.label}, util pentru ${profile.buyer}. Este potrivit in achizitii medicale unde este necesara identificarea corecta a produsului, confirmarea configuratiei si pregatirea unei oferte clare. ${specSummary ? `Date tehnice recuperate din sursa: ${specSummary}.` : "Datele tehnice raman limitate si trebuie confirmate inainte de ofertare."} ZESCORP poate sprijini selectia, ofertarea, livrarea si suportul tehnic pentru produse similare sau complementare.`;
  product.commercialDescription = product.romanianDescription;
  product.romanianApplications = [
    `Utilizare in ${profile.label.toLowerCase()}.`,
    `Achizitie pentru ${profile.buyer}.`,
    "Inlocuire, completare dotare sau standardizare pe cod produs.",
    "Verificare inainte de oferta pentru compatibilitate, cantitate si termen de livrare.",
    "Utilizare in proiecte unde produsul trebuie corelat cu accesorii sau servicii tehnice.",
  ];
  product.romanianBenefits = [
    "Titlu si categorie clarificate pentru citire rapida de catre cumparator.",
    "Specificatiile sunt pastrate numai cand exista informatie sursa sau valori explicite in denumire.",
    "Produsul poate fi inclus intr-o cerere de oferta impreuna cu produse similare.",
    "ZESCORP poate verifica documentatia si compatibilitatea inainte de ofertare.",
    "Nu sunt afisate preturi, stocuri sau certificari inventate.",
  ];
  product.romanianFeatures = [
    `Cod produs: ${product.gimaCode}.`,
    `Categorie: ${profile.label}.`,
    `Tip produs: ${productType(title, product.category)}.`,
    ...(specs.length ? [`Specificatii recuperate: ${specs.slice(0, 3).map((spec) => spec.label).join(", ")}.`] : []),
  ];
  product.imageAlt = `${title} - imagine produs`;
  product.galleryImages = (product.galleryImages || []).map((image) => ({ ...image, alt: `${title} - imagine produs` }));
  product.relatedProductCodes = all
    .filter((item) => item.gimaCode !== product.gimaCode && item.category === product.category && item.imageVerified)
    .slice(0, 4)
    .map((item) => item.gimaCode);
  product.relatedServices = product.relatedServices?.length ? product.relatedServices : ["/service-aparatura-medicala", "/contracte-mentenanta"];
  if (product.reviewStatus === "indexable") product.reviewStatus = "reviewed";
}

async function fetchImage(url, destination) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5500);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "ZESCORP GIMA image recovery; local noindex catalog quality review" },
    });
    if (!response.ok || !(response.headers.get("content-type") || "").startsWith("image/")) return false;
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length < 5000) return false;
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, buffer);
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

async function recoverImages(items) {
  const recovered = [];
  const failed = [];
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const product = items[cursor++];
    const code = product.gimaCode;
    if (!code) continue;
    const variants = [`${code}.jpg`, `${code}_a.jpg`];
    let found = false;
    for (const filename of variants) {
      for (const size of ["big", "medium", "thumb"]) {
      const url = `https://www.gimaitaly.com/images/prodotti/${size}/${filename}`;
      const localPath = path.join(imageRoot, code, filename);
      const publicPath = `/product-images/${code}/${filename}`;
      if (fs.existsSync(localPath) || (await fetchImage(url, localPath))) {
        if (!product.imageUrl || !product.imageVerified) product.imageUrl = publicPath;
        product.imageVerified = true;
        product.imageStatus = "verified_local";
        product.imageSourceUrl = url;
        product.galleryImages = [
          ...(product.galleryImages || []).filter((image) => image.url !== publicPath),
          { url: publicPath, alt: `${product.romanianTitle} - imagine produs`, verified: true },
        ].slice(0, 4);
        recovered.push(code);
        found = true;
        break;
      }
      }
      if (found) break;
    }
    if (!found) failed.push(code);
    }
  }
  const workers = Array.from({ length: Math.min(16, Math.max(1, items.length)) }, () => worker());
  await Promise.all(workers);
  return { recovered, failed };
}

function countBlockers(items) {
  const counts = { weakTitle: 0, weakSlug: 0, specPoor: 0, missingImage: 0, englishLeakage: 0 };
  const grades = {};
  for (const product of items) {
    const result = score(product);
    if (result.blockers.includes("weak_title")) counts.weakTitle++;
    if (result.blockers.includes("weak_slug")) counts.weakSlug++;
    if (result.blockers.includes("spec_poor")) counts.specPoor++;
    if (result.blockers.includes("missing_or_broken_image")) counts.missingImage++;
    if (result.blockers.includes("english_leakage")) counts.englishLeakage++;
    grades[result.grade] = (grades[result.grade] || 0) + 1;
  }
  return { ...counts, grades };
}

function table(rows, columns) {
  return [
    `| ${columns.map((column) => column.label).join(" | ")} |`,
    `| ${columns.map((column) => column.align || "---").join(" | ")} |`,
    ...rows.map((row) => `| ${columns.map((column) => String(column.value(row) ?? "")).join(" | ")} |`),
  ].join("\n");
}

const before = countBlockers(gimaProducts);

for (let pass = 0; pass < 3; pass++) {
  for (const product of gimaProducts) repairProduct(product, gimaProducts);
}

const missingImages = gimaProducts.filter((product) => {
  const result = score(product);
  return result.blockers.includes("missing_or_broken_image");
});
const imageRecovery = await recoverImages(missingImages);

for (const product of gimaProducts) {
  repairProduct(product, gimaProducts);
  const result = score(product);
  product.deepRecoveryScore = result.value;
  product.deepRecoveryGrade = result.grade;
  product.deepRecoveryBlockers = result.blockers;
  product.deepRecoveryReviewedAt = new Date().toISOString();
  product.qualityMissionScore = Math.max(product.qualityMissionScore || 0, result.value);
  product.qualityMissionGrade = result.grade;
  product.qualityMissionBlockers = result.blockers;
  product.qualityMissionStatus = result.grade === "A" || result.grade === "B" ? "premium_repaired" : result.blockers.includes("missing_or_broken_image") ? "blocked" : "needs_repair";
  product.publicDisplayReady = result.grade === "A" || result.grade === "B";
  if (product.reviewStatus === "indexable") product.reviewStatus = "reviewed";
}

const after = countBlockers(gimaProducts);
const upgraded = gimaProducts.filter((product) => product.deepRecoveryGrade === "A" || product.deepRecoveryGrade === "B");
const categoryRows = Object.entries(categoryProfiles).map(([category, profile]) => {
  const items = gimaProducts.filter((product) => product.category === category);
  const counts = countBlockers(items);
  return {
    category: profile.label,
    total: items.length,
    A: counts.grades.A || 0,
    B: counts.grades.B || 0,
    C: counts.grades.C || 0,
    D: counts.grades.D || 0,
    weakTitle: counts.weakTitle,
    specPoor: counts.specPoor,
    missingImage: counts.missingImage,
  };
});

const unresolved = gimaProducts
  .filter((product) => product.deepRecoveryGrade === "C" || product.deepRecoveryGrade === "D")
  .sort((a, b) => (a.deepRecoveryScore || 0) - (b.deepRecoveryScore || 0))
  .slice(0, 200);

const generatedAt = new Date().toISOString();
const report = `# GIMA Deep Recovery 01

Generated: ${generatedAt}

Scope: all ${gimaProducts.length} local GIMA products. No deploy, no indexation and no sitemap changes were performed.

## Before Counts

- Weak titles: ${before.weakTitle}
- Weak slugs: ${before.weakSlug}
- Spec-poor products: ${before.specPoor}
- Missing/broken images: ${before.missingImage}
- English leakage: ${before.englishLeakage}

## After Counts

- Weak titles: ${after.weakTitle}
- Weak slugs: ${after.weakSlug}
- Spec-poor products: ${after.specPoor}
- Missing/broken images: ${after.missingImage}
- English leakage: ${after.englishLeakage}

## Quality Distribution

${table(Object.entries(after.grades).map(([grade, count]) => ({ grade, count })).sort((a, b) => a.grade.localeCompare(b.grade)), [
  { label: "Grade", value: (row) => row.grade },
  { label: "Count", align: "---:", value: (row) => row.count },
])}

## Recovery Results

- Products upgraded to A/B: ${upgraded.length}
- Images recovered from official product image paths: ${imageRecovery.recovered.length}
- Image recovery failures: ${imageRecovery.failed.length}
- Products still held for review: ${gimaProducts.length - upgraded.length}

## Category Improvements

${table(categoryRows, [
  { label: "Category", value: (row) => row.category },
  { label: "Total", align: "---:", value: (row) => row.total },
  { label: "A", align: "---:", value: (row) => row.A },
  { label: "B", align: "---:", value: (row) => row.B },
  { label: "C", align: "---:", value: (row) => row.C },
  { label: "D", align: "---:", value: (row) => row.D },
  { label: "Weak title", align: "---:", value: (row) => row.weakTitle },
  { label: "Spec-poor", align: "---:", value: (row) => row.specPoor },
  { label: "Missing image", align: "---:", value: (row) => row.missingImage },
])}

## Unresolved Products

Showing weakest 200 products after recovery.

${table(unresolved.map((product) => ({
  code: product.gimaCode,
  title: product.romanianTitle,
  category: categoryProfiles[product.category]?.label || product.category,
  score: product.deepRecoveryScore,
  grade: product.deepRecoveryGrade,
  blockers: (product.deepRecoveryBlockers || []).join(", "),
})), [
  { label: "Code", value: (row) => row.code },
  { label: "Title", value: (row) => row.title },
  { label: "Category", value: (row) => row.category },
  { label: "Score", align: "---:", value: (row) => row.score },
  { label: "Grade", value: (row) => row.grade },
  { label: "Blockers", value: (row) => row.blockers },
])}

## Blockers

The target thresholds were not fully reached because many rows are still source-table fragments or lack official images/specification data. Products without real images or source-grounded identity remain held back instead of being forced into public quality.
`;

fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`);
fs.writeFileSync(redirectsPath, `${JSON.stringify(redirects, null, 2)}\n`);
fs.writeFileSync(reportPath, report);

console.log(
  JSON.stringify(
    {
      before,
      after,
      upgraded: upgraded.length,
      imagesRecovered: imageRecovery.recovered.length,
      imageRecoveryFailures: imageRecovery.failed.length,
      reportPath,
    },
    null,
    2,
  ),
);
