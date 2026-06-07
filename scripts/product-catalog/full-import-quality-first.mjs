import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const sessionsPath = path.join(root, "data", "product-catalog", "import-sessions.json");
const reportPath = path.join(root, "docs", "gima-full-import-report.md");
const auditPath = path.join(root, "docs", "gima-full-quality-audit.md");
const catalogPagesPath = path.join(os.tmpdir(), "gima_catalog_2024_pages.json");
const imageRoot = path.join(root, "public", "product-images");
const documentRoot = path.join(root, "public", "product-documents");

const gimaBaseUrl = "https://www.gimaitaly.com";
const sourceCatalogUrl = "https://www.gimaitaly.com/en/assets/cataloghi/GIMA_International_Catalogue_2024_LR_ENG.pdf";
const today = new Date().toISOString().slice(0, 10);

const categoryDefinitions = {
  diagnostic: {
    label: "Diagnostic medical",
    applications: ["cabinete medicale", "clinici multidisciplinare", "evaluare si diagnostic clinic"],
    relatedServices: ["/solutii-medicale/echipamente-imagistica-diagnostic", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  laboratory: {
    label: "Laborator / IVD",
    applications: ["laboratoare medicale", "fluxuri IVD", "prelucrarea si analiza probelor"],
    relatedServices: ["/solutii-medicale/echipamente-laborator-ivd", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  emergency: {
    label: "Urgenta",
    applications: ["zone de urgenta", "truse de interventie", "suport pentru echipe mobile"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta", "/solutii-medicale/instalare-punere-in-functiune"],
  },
  sterilization: {
    label: "Sterilizare",
    applications: ["sterilizare instrumentar", "fluxuri de cabinet", "zone de pregatire instrumentar"],
    relatedServices: ["/solutii-medicale/instalare-punere-in-functiune", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "medical-furniture": {
    label: "Mobilier medical",
    applications: ["amenajare clinica", "organizare spatiu medical", "mobilier pentru pacienti si personal"],
    relatedServices: ["/solutii-medicale/amenajare-clinica-medicala", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  ent: {
    label: "ORL",
    applications: ["cabinete ORL", "diagnostic ORL", "dotare specializata pentru consultatii"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  gynecology: {
    label: "Ginecologie",
    applications: ["cabinete ginecologie", "obstetrica", "monitorizare si consultatii specializate"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  consumables: {
    label: "Consumabile",
    applications: ["consumabile recurente", "dotare operationala", "cabinete si laboratoare medicale"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  electromedical: {
    label: "Electromedicale",
    applications: ["terapie", "diagnostic si tratament", "echipamente active pentru fluxuri clinice"],
    relatedServices: ["/solutii-medicale/instalare-punere-in-functiune", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "surgical-instruments": {
    label: "Instrumentar chirurgical",
    applications: ["instrumentar pentru interventii", "cabinete si clinici", "fluxuri de sterilizare"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "patient-care": {
    label: "Ingrijire pacient",
    applications: ["ingrijire pacient", "mobilizare si suport", "clinici, cabinete si unitati medicale"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  monitoring: {
    label: "Monitorizare",
    applications: ["monitorizare clinica", "evaluare parametri", "suport pentru decizie operationala"],
    relatedServices: ["/solutii-medicale/echipamente-imagistica-diagnostic", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  disinfection: {
    label: "Dezinfectie",
    applications: ["dezinfectie si control operational", "fluxuri medicale sigure", "necesar recurent pentru clinici"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "operator-protection": {
    label: "Protectie operator",
    applications: ["protectia personalului medical", "consumabile de protectie", "activitate clinica sigura"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "medical-bags": {
    label: "Genti medicale",
    applications: ["truse de interventie", "echipe mobile", "transport organizat pentru materiale medicale"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "scales-measures": {
    label: "Cantare si masurare",
    applications: ["masurare medicala", "podoscopie", "evaluare pacient in cabinet sau clinica"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  physiotherapy: {
    label: "Fizioterapie",
    applications: ["recuperare medicala", "fizioterapie", "dotare sali de terapie"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  veterinary: {
    label: "Veterinar",
    applications: ["clinici veterinare", "interventii veterinare", "dotare operationala veterinara"],
    relatedServices: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "anatomy-models": {
    label: "Modele anatomice",
    applications: ["educatie medicala", "instruire clinica", "cabinete si institutii de formare"],
    relatedServices: ["/service-aparatura-medicala"],
  },
  "medical-lights": {
    label: "Lampi medicale",
    applications: ["iluminare de examinare", "iluminare chirurgicala", "cabinete si sali de interventie"],
    relatedServices: ["/solutii-medicale/instalare-punere-in-functiune", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
};

const allowedEnglishTerms = [
  "CE",
  "FDA",
  "ISO",
  "Bluetooth",
  "WiFi",
  "PACS",
  "RIS",
  "DICOM",
  "ECG",
  "EKG",
  "LED",
  "LCD",
  "USB",
  "PVC",
  "ABS",
  "RFID",
  "AAA",
  "MDR",
  "IVD",
  "ORL",
];

const romanianReplacements = [
  [/\bCENTRIFUGE\b/gi, "centrifuga"],
  [/\bANALYZER\b/gi, "analizor"],
  [/\bANALYSER\b/gi, "analizor"],
  [/\bMONITOR\b/gi, "monitor"],
  [/\bMULTI[- ]PARAMETER\b/gi, "multiparametric"],
  [/\bPARAMETERS\b/gi, "parametri"],
  [/\bPARAMETER\b/gi, "parametru"],
  [/\bFOETAL\b/gi, "fetal"],
  [/\bFETAL\b/gi, "fetal"],
  [/\bULTRASOUND\b/gi, "ecograf"],
  [/\bDOPPLER\b/gi, "Doppler"],
  [/\bECG\b/gi, "ECG"],
  [/\bHOLTER\b/gi, "Holter"],
  [/\bSTETHOSCOPE\b/gi, "stetoscop"],
  [/\bSPHYGMOMANOMETER\b/gi, "tensiometru"],
  [/\bTHERMOMETER\b/gi, "termometru"],
  [/\bOTOSCOPE\b/gi, "otoscop"],
  [/\bCOLPOSCOPE\b/gi, "colposcop"],
  [/\bMICROSCOPE\b/gi, "microscop"],
  [/\bPIPETTE\b/gi, "pipeta"],
  [/\bTUBE\b/gi, "tub"],
  [/\bSYRINGE\b/gi, "seringa"],
  [/\bFOLEY CATHETER\b/gi, "cateter Foley"],
  [/\bRECTAL CATHETERS\b/gi, "catetere rectale"],
  [/\bRECTAL CATHETER\b/gi, "cateter rectal"],
  [/\bCATHETERS\b/gi, "catetere"],
  [/\bCATHETER\b/gi, "cateter"],
  [/\bBALLOON\b/gi, "balonas"],
  [/\bLUBRICANT\b/gi, "lubrifiant"],
  [/\bPURPLE\b/gi, "mov"],
  [/\b2-WAY\b/gi, "cu 2 cai"],
  [/\b3-WAY\b/gi, "cu 3 cai"],
  [/\bNEEDLE\b/gi, "ac"],
  [/\bLANCETS\b/gi, "lancete"],
  [/\bLANCET\b/gi, "lanceta"],
  [/\bGLOVES\b/gi, "manusi"],
  [/\bMASKS\b/gi, "masti"],
  [/\bMASK\b/gi, "masca"],
  [/\bDRAPE\b/gi, "camp medical"],
  [/\bDRAPES\b/gi, "campuri medicale"],
  [/\bNON[- ]WOVEN\b/gi, "netesut"],
  [/\bBI[- ]LAYER\b/gi, "dublu strat"],
  [/\bSTERILE\b/gi, "steril"],
  [/\bDISPOSABLE\b/gi, "de unica folosinta"],
  [/\bREUSABLE\b/gi, "reutilizabil"],
  [/\bRESPIRATOR\b/gi, "masca respiratorie"],
  [/\bVALVE\b/gi, "valva"],
  [/\bEAR LOOPS\b/gi, "benzi pentru urechi"],
  [/\bHEADBAND\b/gi, "banda pentru cap"],
  [/\bCONICAL\b/gi, "conic"],
  [/\bLAYER\b/gi, "strat"],
  [/\bLAYERS\b/gi, "straturi"],
  [/\bTYPE\b/gi, "tip"],
  [/\bCLASSIFIED\b/gi, "clasificat"],
  [/\bKID\b/gi, "copil"],
  [/\bAGE\b/gi, "varsta"],
  [/\bSURGICAL\b/gi, "chirurgical"],
  [/\bSCISSORS\b/gi, "foarfeca"],
  [/\bFORCEPS\b/gi, "pensa"],
  [/\bCLAMP\b/gi, "pensa"],
  [/\bNEEDLE HOLDER\b/gi, "portac"],
  [/\bSTRAIGHT\b/gi, "drept"],
  [/\bCURVED\b/gi, "curbat"],
  [/\bSHARP\b/gi, "ascutit"],
  [/\bBLUNT\b/gi, "bont"],
  [/\bTROLLEY\b/gi, "carucior"],
  [/\bCART\b/gi, "carucior"],
  [/\bCHAIR\b/gi, "scaun"],
  [/\bTABLE\b/gi, "masa"],
  [/\bCOUCH\b/gi, "canapea medicala"],
  [/\bBED\b/gi, "pat"],
  [/\bCABINET\b/gi, "dulap"],
  [/\bSTOOL\b/gi, "taburet"],
  [/\bSTRETCHER\b/gi, "targa"],
  [/\bLIFTER\b/gi, "ridicator"],
  [/\bWHEELCHAIR\b/gi, "scaun rulant"],
  [/\bWALKER\b/gi, "cadru de mers"],
  [/\bCRUTCH\b/gi, "carja"],
  [/\bBAG\b/gi, "geanta"],
  [/\bKIT\b/gi, "kit"],
  [/\bSET\b/gi, "set"],
  [/\bSCALE\b/gi, "cantar"],
  [/\bSCALES\b/gi, "cantare"],
  [/\bMEASURER\b/gi, "masurator"],
  [/\bLIGHT\b/gi, "lampa"],
  [/\bHEADLIGHT\b/gi, "lampa frontala"],
  [/\bLAMP\b/gi, "lampa"],
  [/\bMIRROR\b/gi, "oglinda"],
  [/\bLOUPE\b/gi, "lupa"],
  [/\bLOUPES\b/gi, "lupe"],
  [/\bELECTRODES\b/gi, "electrozi"],
  [/\bELECTRODE\b/gi, "electrod"],
  [/\bCABLE\b/gi, "cablu"],
  [/\bBATTERY\b/gi, "baterie"],
  [/\bCHARGER\b/gi, "incarcator"],
  [/\bADAPTOR\b/gi, "adaptor"],
  [/\bCONNECTOR\b/gi, "conector"],
  [/\bPROBE\b/gi, "sonda"],
  [/\bSENSOR\b/gi, "senzor"],
  [/\bPRINTER\b/gi, "imprimanta"],
  [/\bPAPER\b/gi, "hartie"],
  [/\bSTRIPS\b/gi, "benzi"],
  [/\bSTRIP\b/gi, "banda"],
  [/\bCONTROL SOLUTION\b/gi, "solutie de control"],
  [/\bSOLUTION\b/gi, "solutie"],
  [/\bURINE\b/gi, "urina"],
  [/\bBLOOD\b/gi, "sange"],
  [/\bGLUCOSE\b/gi, "glucoza"],
  [/\bCHOLESTEROL\b/gi, "colesterol"],
  [/\bHEMOGLOBIN\b/gi, "hemoglobina"],
  [/\bHEMATOCRIT\b/gi, "hematocrit"],
  [/\bFURNITURE\b/gi, "mobilier"],
  [/\bEMERGENCY\b/gi, "urgenta"],
  [/\bFIRST AID\b/gi, "prim ajutor"],
  [/\bMEDICAL\b/gi, "medical"],
  [/\bPROFESSIONAL\b/gi, "profesional"],
  [/\bDIGITAL\b/gi, "digital"],
  [/\bV[- ]NECK TOP\b/gi, "bluza medicala cu decolteu in V"],
  [/\bTOP\b/gi, "bluza medicala"],
  [/\bTUNIC\b/gi, "tunica medicala"],
  [/\bPANTS\b/gi, "pantaloni"],
  [/\bTROUSERS\b/gi, "pantaloni"],
  [/\bJACKET\b/gi, "jacheta"],
  [/\bWOMAN\b/gi, "dama"],
  [/\bWOMEN\b/gi, "dama"],
  [/\bMAN\b/gi, "barbati"],
  [/\bMEN\b/gi, "barbati"],
  [/\bUNISEX\b/gi, "unisex"],
  [/\bNAVY\b/gi, "bleumarin"],
  [/\bTEAL\b/gi, "turcoaz"],
  [/\bCIEL\b/gi, "albastru deschis"],
  [/\bORIGINALS\b/gi, "Originals"],
  [/\bORIGINAL\b/gi, "Original"],
  [/\bHYDRAULIC\b/gi, "hidraulic"],
  [/\bELECTRIC\b/gi, "electric"],
  [/\bMANUAL\b/gi, "manual"],
  [/\bBLUE\b/gi, "albastru"],
  [/\bGREEN\b/gi, "verde"],
  [/\bRED\b/gi, "rosu"],
  [/\bBLACK\b/gi, "negru"],
  [/\bWHITE\b/gi, "alb"],
  [/\bGREY\b/gi, "gri"],
  [/\bGRAY\b/gi, "gri"],
  [/\bYELLOW\b/gi, "galben"],
  [/\bORANGE\b/gi, "portocaliu"],
  [/\bSMALL\b/gi, "mic"],
  [/\bMEDIUM\b/gi, "mediu"],
  [/\bLARGE\b/gi, "mare"],
  [/\bEXTRA LARGE\b/gi, "foarte mare"],
  [/\bBOX OF\b/gi, "cutie cu"],
  [/\bBOX\b/gi, "cutie"],
  [/\bBAG OF\b/gi, "punga cu"],
  [/\bSPARE\b/gi, "piesa de schimb"],
  [/\bWITH\b/gi, "cu"],
  [/\bWITHOUT\b/gi, "fara"],
  [/\bFOR\b/gi, "pentru"],
  [/\bAND\b/gi, "si"],
];

const specTranslations = [
  [/^Power supply$/i, "Alimentare"],
  [/^Power$/i, "Putere"],
  [/^Voltage$/i, "Tensiune alimentare"],
  [/^Frequency$/i, "Frecventa"],
  [/^Dimensions?$/i, "Dimensiuni"],
  [/^Size$/i, "Dimensiuni"],
  [/^Weight$/i, "Greutate"],
  [/^Capacity$/i, "Capacitate"],
  [/^Speed$/i, "Viteza"],
  [/^Time$/i, "Timp"],
  [/^Memory$/i, "Memorie"],
  [/^Connection$/i, "Conexiune"],
  [/^Interface$/i, "Interfata"],
  [/^Display$/i, "Afisaj"],
  [/^Battery$/i, "Baterie"],
  [/^Material$/i, "Material"],
  [/^Colour$/i, "Culoare"],
  [/^Color$/i, "Culoare"],
  [/^Length$/i, "Lungime"],
  [/^Width$/i, "Latime"],
  [/^Height$/i, "Inaltime"],
  [/^Diameter$/i, "Diametru"],
  [/^Unit of sale$/i, "Unitate de vanzare"],
  [/^Minimum order$/i, "Comanda minima"],
  [/^Type$/i, "Tip produs"],
  [/^EAN13?$/i, "EAN"],
  [/^Languages?$/i, "Limbi disponibile"],
  [/^Warranty$/i, "Garantie"],
];

const englishLeakPatterns = [
  /\b(power|voltage|communication|interface|record mode|host computer|large display|user[- ]friendly|fast results|sample volume)\b/i,
  /\b(description|features|package contents|applications|benefits|specifications|delivery|support|category|product code)\b/i,
  /\b(trolley|chair|table|analyzer|analyser|centrifuge|microscope|stethoscope|thermometer|sphygmomanometer)\b/i,
  /\b(sterile|drape|forceps|clamp|straight|curved|disposable|gloves|mask|bag|scale|light|headlight)\b/i,
  /\b(v-neck|woman|women|man|men|navy|teal|top|tops|tunic|pants|trousers|jacket|basket|case|cover|adapter|adaptor|children|adult|optional|suitable|only|provided|from|with|size guide|line)\b/i,
  /\b(kit of|silicone|straps?|steel chain|operator'?s protection|3-ply|ply|pink|dark|sky|other colours|boxes of|box of|colour|color)\b/i,
  /\b(respirator|reusable|safe comfort|layer|classified|according|kid|age|valve|ear loops|headband|conical|cashmere|stars|skull|rainbow|wave)\b/i,
  /\b(catheter|balloon|rectal|purple|lubricant|box|2-way|3-way)\b/i,
];

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    if (!current.startsWith("--")) continue;
    const key = current.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) args[key] = true;
    else {
      args[key] = next;
      index += 1;
    }
  }
  return args;
}

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function writeText(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
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

function cleanText(value) {
  return String(value || "")
    .replace(/â€™/g, "'")
    .replace(/â„¢/g, "")
    .replace(/Â®/g, "")
    .replace(/Â°/g, "°")
    .replace(/Ã˜/g, "diametru")
    .replace(/ï¬/g, "fi")
    .replace(/ï¬‚/g, "fl")
    .replace(/Î¼/g, "u")
    .replace(/Âµ/g, "u")
    .replace(/Â/g, "")
    .replace(/â€¢/g, "")
    .replace(/\/g\d+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function romanianize(value) {
  let result = cleanText(value);
  for (const [pattern, replacement] of romanianReplacements) result = result.replace(pattern, replacement);
  result = result
    .replace(/\bGima\b/g, "GIMA")
    .replace(/\bLed\b/g, "LED")
    .replace(/\bLcd\b/g, "LCD")
    .replace(/\bUsb\b/g, "USB")
    .replace(/\bWifi\b/g, "WiFi")
    .replace(/\bBluetooth\b/gi, "Bluetooth")
    .replace(/\bEcG\b/g, "ECG")
    .replace(/\bIvd\b/g, "IVD")
    .replace(/\bCe\b/g, "CE")
    .replace(/\bIso\b/g, "ISO")
    .replace(/\bFda\b/g, "FDA");
  return result.replace(/\s+/g, " ").trim();
}

function titleCaseRomanian(value) {
  const clean = romanianize(value).toLowerCase();
  const protectedTerms = new Map([
    ["gima", "GIMA"],
    ["ecg", "ECG"],
    ["ekg", "EKG"],
    ["led", "LED"],
    ["lcd", "LCD"],
    ["usb", "USB"],
    ["wifi", "WiFi"],
    ["bluetooth", "Bluetooth"],
    ["ivd", "IVD"],
    ["orL".toLowerCase(), "ORL"],
    ["ce", "CE"],
    ["iso", "ISO"],
  ]);
  const words = clean.split(" ").map((word, index) => {
    const bare = word.replace(/[^a-z0-9]/gi, "").toLowerCase();
    if (protectedTerms.has(bare)) return word.replace(new RegExp(bare, "i"), protectedTerms.get(bare));
    if (index === 0) return word.charAt(0).toUpperCase() + word.slice(1);
    return word;
  });
  return words.join(" ").replace(/\s+/g, " ").trim();
}

function normalizeProductTitle(sourceTitle, sku, category) {
  const translated = titleCaseRomanian(sourceTitle);
  if (!translated || hasEnglishLeak(translated) || !titleLooksReady(translated, sku)) {
    return `${categoryDefinitions[category]?.label || "Produs medical"} cod ${sku}`;
  }
  return translated;
}

function titleLooksReady(value, sku = "") {
  const originalText = cleanText(value);
  if (/^produs medical cod \d{5}$/i.test(originalText)) return false;
  if (/^produs medical \d{5}$/i.test(originalText)) return false;
  if (/\bcod\s+\d{5}\b/i.test(originalText)) return false;
  if (/^size guide\b/i.test(originalText)) return false;
  if (/^tops?\s+si\s+pantaloni$/i.test(originalText)) return false;
  if (/^(rosu|alb|negru|albastru|verde|gri|violet|galben|portocaliu|bleumarin)(\s*&\s*|\s+si\s+)?(rosu|alb|negru|albastru|verde|gri|violet|galben|portocaliu|bleumarin)?$/i.test(originalText)) return false;
  const text = originalText.replace(String(sku), " ");
  const words = text.match(/[A-Za-z]{3,}/g) || [];
  const numbers = text.match(/\b\d{4,}\b/g) || [];
  if (words.length < 2) return false;
  if (numbers.length > 2) return false;
  if (/^(xs|s|m|l|xl|xxl|xxxl)\b/i.test(text) && numbers.length) return false;
  return true;
}

function hasEnglishLeak(value) {
  let text = String(value || "");
  for (const term of allowedEnglishTerms) text = text.replace(new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi"), " ");
  return englishLeakPatterns.some((pattern) => pattern.test(text));
}

function pageCategory(pageNumber, text) {
  const haystack = cleanText(text).toLowerCase();
  if (pageNumber >= 26 && pageNumber <= 44) return "laboratory";
  if (pageNumber >= 45 && pageNumber <= 62) return "operator-protection";
  if (pageNumber >= 63 && pageNumber <= 101) return "surgical-instruments";
  if (pageNumber >= 102 && pageNumber <= 109) return "medical-bags";
  if (pageNumber >= 110 && pageNumber <= 121) return "scales-measures";
  if (pageNumber >= 122 && pageNumber <= 153) return "patient-care";
  if (pageNumber >= 154 && pageNumber <= 209) return "medical-furniture";
  if (pageNumber >= 210 && pageNumber <= 233) return "physiotherapy";
  if (pageNumber >= 234 && pageNumber <= 247) return "gynecology";
  if (pageNumber >= 248 && pageNumber <= 262) return "electromedical";
  if (pageNumber >= 263 && pageNumber <= 267) return "ent";
  if (pageNumber >= 268 && pageNumber <= 276) return "medical-lights";
  if (pageNumber >= 277 && pageNumber <= 346) return "diagnostic";
  if (pageNumber >= 347 && pageNumber <= 377) return "monitoring";
  if (pageNumber >= 378 && pageNumber <= 449) return "emergency";
  if (pageNumber >= 450 && pageNumber <= 469) return "sterilization";
  if (pageNumber >= 470 && pageNumber <= 473) return "veterinary";
  if (pageNumber >= 474 && pageNumber <= 479) return "anatomy-models";
  if (/laboratory|glucose|urine|centrifuge|microscope|analyzer/i.test(haystack)) return "laboratory";
  if (/emergency|first aid|defibrillator|resuscit/i.test(haystack)) return "emergency";
  if (/furniture|trolley|chair|couch|cabinet|bed/i.test(haystack)) return "medical-furniture";
  if (/ecg|monitor|ultrasound|holter/i.test(haystack)) return "monitoring";
  if (/steril|autoclave/i.test(haystack)) return "sterilization";
  return "diagnostic";
}

function extractCandidateTitle(line, sku) {
  const cleaned = cleanText(line)
    .replace(new RegExp(`^.*?\\b${sku}\\b\\s*`), "")
    .replace(/\bGIMA\s*code\b/gi, "")
    .replace(/\bMinimum\s+order\b/gi, "")
    .replace(/\bLanguages?\b/gi, "")
    .replace(/\bGB,\s*FR,\s*IT,\s*ES.*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
  if (cleaned.length >= 4 && /[a-z]/i.test(cleaned)) return cleaned.slice(0, 140);
  return "";
}

function getPageLines(page) {
  return String(page.text || "")
    .split(/\r?\n/)
    .map((line) => cleanText(line))
    .filter(Boolean);
}

function loadCandidateProducts(limit) {
  if (!fs.existsSync(catalogPagesPath)) {
    throw new Error(`Missing extracted GIMA catalog pages at ${catalogPagesPath}`);
  }
  const pages = readJson(catalogPagesPath, []);
  const candidates = new Map();

  for (const page of pages) {
    const category = pageCategory(Number(page.page), page.text || "");
    const lines = getPageLines(page);
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      const matches = [...line.matchAll(/\b(\d{5})\b/g)].map((match) => match[1]);
      for (const sku of matches) {
        if (Number(sku) < 10000 || Number(sku) > 99999) continue;
        let title = extractCandidateTitle(line, sku);
        if (!title) title = extractCandidateTitle(lines[index + 1] || "", sku);
        if (!title) title = extractCandidateTitle(`${line} ${lines[index + 1] || ""}`, sku);
        if (!title || /^\d+$/.test(title)) title = `Produs medical ${sku}`;
        if (!candidates.has(sku)) {
          candidates.set(sku, {
            sku,
            sourceProductName: title,
            page: Number(page.page),
            category,
            pageText: cleanText(page.text || "").slice(0, 3000),
          });
        }
      }
    }
  }

  const result = [...candidates.values()].sort((a, b) => a.sku.localeCompare(b.sku));
  return limit ? result.slice(0, limit) : result;
}

function buildIndexes(products) {
  const bySku = new Map();
  const bySlug = new Map();
  for (let index = 0; index < products.length; index += 1) {
    const product = products[index];
    if (product.gimaCode) bySku.set(String(product.gimaCode), index);
    if (product.slug) bySlug.set(product.slug, index);
  }
  return { bySku, bySlug };
}

function uniqueSlug(base, sku, bySlug, existingSlug) {
  if (existingSlug) return existingSlug;
  const rootSlug = slugify(`${base} ${sku}`) || `produs-medical-${sku}`;
  let candidate = rootSlug;
  let suffix = 2;
  while (bySlug.has(candidate)) {
    candidate = `${rootSlug}-${suffix}`;
    suffix += 1;
  }
  bySlug.set(candidate, true);
  return candidate;
}

function getJpegDimensions(buffer) {
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) break;
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5) };
    }
    offset += 2 + length;
  }
  return { width: 0, height: 0 };
}

async function fetchBuffer(url, timeoutMs = 20000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "ZESCORP noindex product catalog asset verifier; office@zescorp.ro" },
    });
    if (!response.ok) return { ok: false, status: response.status, contentType: response.headers.get("content-type") || "", buffer: Buffer.alloc(0) };
    const contentType = response.headers.get("content-type") || "";
    const arrayBuffer = await response.arrayBuffer();
    return { ok: true, status: response.status, contentType, buffer: Buffer.from(arrayBuffer) };
  } finally {
    clearTimeout(timeout);
  }
}

async function ensureProductImage(sku, existingProduct, dryRun) {
  const existingLocal = existingProduct?.galleryImages?.find((image) => String(image.url || "").startsWith("/product-images/"));
  if (existingLocal) {
    const filePath = path.join(root, "public", existingLocal.url.replace(/^\//, ""));
    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
      const buffer = fs.readFileSync(filePath);
      const dimensions = getJpegDimensions(buffer);
      return {
        status: "verified_local",
        imageUrl: existingLocal.url,
        galleryImages: existingProduct.galleryImages,
        imageAudit: existingProduct.galleryImageAudit || [
          {
            originalExtractedUrl: existingProduct.imageSourceUrl || "",
            finalHighResUrl: existingProduct.imageSourceUrl || "",
            localFilePath: existingLocal.url,
            width: dimensions.width,
            height: dimensions.height,
            bytes: buffer.length,
            sourceSize: dimensions.width && dimensions.height ? "local" : "local-unmeasured",
            status: "kept-existing",
          },
        ],
      };
    }
  }

  const remoteUrl = `${gimaBaseUrl}/images/prodotti/big/${sku}.jpg`;
  const localDir = path.join(imageRoot, sku);
  const localPath = path.join(localDir, `${sku}.jpg`);
  const publicPath = `/product-images/${sku}/${sku}.jpg`;

  if (fs.existsSync(localPath) && fs.statSync(localPath).size > 1000) {
    const buffer = fs.readFileSync(localPath);
    const dimensions = getJpegDimensions(buffer);
    return {
      status: "verified_local",
      imageUrl: publicPath,
      galleryImages: [{ url: publicPath, alt: "", verified: true }],
      imageAudit: [
        {
          originalExtractedUrl: remoteUrl,
          finalHighResUrl: remoteUrl,
          localFilePath: publicPath,
          width: dimensions.width,
          height: dimensions.height,
          bytes: buffer.length,
          sourceSize: "full-size",
          status: "verified-local-cache",
        },
      ],
    };
  }

  const result = await fetchBuffer(remoteUrl);
  if (!result.ok || !result.contentType.startsWith("image/") || result.buffer.length < 3000) {
    return {
      status: "missing",
      imageUrl: "",
      galleryImages: [],
      imageAudit: [
        {
          originalExtractedUrl: remoteUrl,
          finalHighResUrl: "",
          localFilePath: "",
          width: 0,
          height: 0,
          bytes: 0,
          sourceSize: "missing",
          status: `failed-${result.status || "network"}`,
          reason: "No verified high-resolution GIMA image found at the expected big image path.",
        },
      ],
    };
  }

  const dimensions = getJpegDimensions(result.buffer);
  if (dimensions.width && dimensions.height && (dimensions.width < 220 || dimensions.height < 180)) {
    return {
      status: "missing",
      imageUrl: "",
      galleryImages: [],
      imageAudit: [
        {
          originalExtractedUrl: remoteUrl,
          finalHighResUrl: remoteUrl,
          localFilePath: "",
          width: dimensions.width,
          height: dimensions.height,
          bytes: result.buffer.length,
          sourceSize: "too-small",
          status: "rejected-small-image",
          reason: "Image was available but below the display quality threshold.",
        },
      ],
    };
  }

  if (!dryRun) {
    fs.mkdirSync(localDir, { recursive: true });
    fs.writeFileSync(localPath, result.buffer);
  }

  return {
    status: "verified_local",
    imageUrl: publicPath,
    galleryImages: [{ url: publicPath, alt: "", verified: true }],
    imageAudit: [
      {
        originalExtractedUrl: remoteUrl,
        finalHighResUrl: remoteUrl,
        localFilePath: publicPath,
        width: dimensions.width,
        height: dimensions.height,
        bytes: result.buffer.length,
        sourceSize: "full-size",
        status: "downloaded",
      },
    ],
  };
}

function parseSpecifications(candidate) {
  const specs = [
    { label: "Cod produs", value: candidate.sku },
    { label: "Categorie", value: categoryDefinitions[candidate.category]?.label || "Echipamente medicale" },
  ];
  const text = candidate.pageText;
  const patterns = [
    [/Power supply:\s*([^.\n]+?)(?=\s+[A-Z][A-Za-z ]{2,}:|$)/i, "Alimentare"],
    [/Power:\s*([^.\n]+?)(?=\s+[A-Z][A-Za-z ]{2,}:|$)/i, "Putere"],
    [/Dimensions?:\s*([^.\n]+?)(?=\s+[A-Z][A-Za-z ]{2,}:|$)/i, "Dimensiuni"],
    [/Size\s*[-:]\s*([^.\n]+?)(?=\s+[A-Z][A-Za-z ]{2,}:|$)/i, "Dimensiuni"],
    [/Weight:\s*([^.\n]+?)(?=\s+[A-Z][A-Za-z ]{2,}:|$)/i, "Greutate"],
    [/Capacity:\s*([^.\n]+?)(?=\s+[A-Z][A-Za-z ]{2,}:|$)/i, "Capacitate"],
    [/Material:\s*([^.\n]+?)(?=\s+[A-Z][A-Za-z ]{2,}:|$)/i, "Material"],
    [/Colour:\s*([^.\n]+?)(?=\s+[A-Z][A-Za-z ]{2,}:|$)/i, "Culoare"],
    [/Color:\s*([^.\n]+?)(?=\s+[A-Z][A-Za-z ]{2,}:|$)/i, "Culoare"],
  ];
  for (const [pattern, label] of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) specs.push({ label, value: romanianize(match[1]).slice(0, 160) });
  }

  const seen = new Set();
  return specs
    .map((spec) => ({ label: translateSpecLabel(spec.label), value: romanianize(spec.value) }))
    .filter((spec) => {
      const key = `${spec.label}:${spec.value}`;
      if (!spec.value || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 12);
}

function translateSpecLabel(label) {
  for (const [pattern, translation] of specTranslations) {
    if (pattern.test(label)) return translation;
  }
  return romanianize(label);
}

function buildProduct(candidate, existing, imageResult, bySlug) {
  const category = candidate.category;
  const categoryInfo = categoryDefinitions[category] || categoryDefinitions.diagnostic;
  const preserveExistingContent = Boolean(existing?.publicDisplayReady && existing.sourceQuality === "gima_page_parity_review");
  const title = normalizeProductTitle(candidate.sourceProductName, candidate.sku, category);
  const slug = uniqueSlug(title, candidate.sku, bySlug, preserveExistingContent ? existing?.slug : "");
  const imageAlt = `${title} - produs medical pentru oferta ZESCORP`;
  const specs = parseSpecifications(candidate);
  const publicDisplayCandidate =
    imageResult.status === "verified_local" &&
    titleLooksReady(title, candidate.sku) &&
    !hasEnglishLeak(title) &&
    !hasEnglishLeak(specs.map((spec) => `${spec.label} ${spec.value}`).join(" "));
  const documents = existing?.documents || {};
  const documentStatus = {
    englishManual: documents.englishManual ? "available" : "missing",
    ceCertificate: documents.ceCertificate ? "available" : "missing",
    technicalDatasheet: documents.technicalDatasheet ? "available" : "missing",
  };

  const description =
    `${title} este un produs din categoria ${categoryInfo.label.toLowerCase()}, disponibil pentru cereri de oferta profesionale prin ZESCORP. ` +
    "Configuratia, accesoriile, documentatia si conditiile comerciale se confirma in functie de aplicatia clinica, cantitate si termenul dorit.";

  const product = {
    ...(existing || {}),
    id: existing?.id || slug,
    slug,
    source: "gima-public-catalog",
    sourceBrand: "GIMA",
    sourceProductName: candidate.sourceProductName,
    gimaCode: candidate.sku,
    category,
    subcategory: categoryInfo.label,
    productUrl: `${gimaBaseUrl}/Prodotti/${candidate.sku}`,
    sourceUrls: Array.from(new Set([...(existing?.sourceUrls || []), `${gimaBaseUrl}/Prodotti/${candidate.sku}`, sourceCatalogUrl])),
    reviewStatus: imageResult.status === "verified_local" ? "image_verified" : "translated",
    importedAt: existing?.importedAt || today,
    reviewedAt: existing?.reviewedAt || null,
    approvedAt: existing?.approvedAt || null,
    indexableAt: null,
    commercialDescription: "",
    applications: [],
    installationConsiderations: existing?.installationConsiderations?.length
      ? existing.installationConsiderations
      : [
          "Verificarea configuratiei, cantitatii si termenului inainte de ofertare",
          "Confirmarea accesoriilor si consumabilelor necesare pentru utilizare",
          "Corelarea produsului cu fluxul operational al clinicii, cabinetului sau laboratorului",
        ],
    maintenanceConsiderations: existing?.maintenanceConsiderations?.length
      ? existing.maintenanceConsiderations
      : [
          "Suport pentru service si mentenanta in functie de tipul produsului",
          "Clarificarea documentatiei si a consumabilelor recurente",
          "Recomandari pentru continuitate operationala si utilizare corecta",
        ],
    relatedServices: categoryInfo.relatedServices,
    notes: "Full GIMA catalog import. Product remains noindex until manual ZESCORP approval.",
    romanianTitle: preserveExistingContent ? existing.romanianTitle : title,
    romanianShortSummary: preserveExistingContent
      ? existing.romanianShortSummary
      : `${title} pentru ${categoryInfo.applications[0]}, disponibil pentru oferta personalizata, suport tehnic si mentenanta.`,
    romanianDescription: preserveExistingContent ? existing.romanianDescription : description,
    romanianApplications: preserveExistingContent
      ? existing.romanianApplications
      : categoryInfo.applications.map((item) => `Utilizare in ${item}`),
    romanianBenefits: preserveExistingContent
      ? existing.romanianBenefits
      : [
          "Oferta personalizata in functie de aplicatie, cantitate si termen",
          "Posibilitate de corelare cu instalare, service si mentenanta",
          "Suport ZESCORP pentru clarificarea configuratiei inainte de achizitie",
        ],
    romanianFeatures: preserveExistingContent
      ? existing.romanianFeatures
      : ["Produs medical pentru cerere de oferta", "Configuratie verificata inainte de ofertare", "Suport comercial si tehnic ZESCORP"],
    romanianPackageContents: preserveExistingContent
      ? existing.romanianPackageContents
      : ["Continutul pachetului se confirma in functie de configuratia solicitata"],
    romanianSpecifications: preserveExistingContent ? existing.romanianSpecifications : specs,
    commercialCategory: categoryInfo.label,
    imageUrl: imageResult.imageUrl || existing?.imageUrl || "",
    imageSourceUrl: "",
    imageVerified: imageResult.status === "verified_local",
    imageStatus: imageResult.status,
    galleryImages: (imageResult.galleryImages.length ? imageResult.galleryImages : existing?.galleryImages || []).map((image) => ({
      ...image,
      alt: image.alt || imageAlt,
    })),
    galleryImageAudit: imageResult.imageAudit,
    imageAlt,
    documents,
    documentStatus,
    productDocuments: [],
    relatedProductCodes: existing?.relatedProductCodes || [],
    gimaBreadcrumbs: [categoryInfo.label],
    sourceExtractedAt: new Date().toISOString(),
    sourceQuality: preserveExistingContent ? existing.sourceQuality : "full_catalog_pdf_image_verified",
  };

  const score = scoreProduct(product, publicDisplayCandidate);
  product.qualityScore = score.total;
  product.qualityBreakdown = score.breakdown;
  product.catalogStatus = statusForScore(product, score.total, publicDisplayCandidate);
  product.publicDisplayReady = product.catalogStatus === "ready_for_publish";
  product.reviewStatus = product.publicDisplayReady ? "image_verified" : product.reviewStatus;
  return product;
}

function scoreProduct(product, publicDisplayCandidate) {
  const hasRomanian = Boolean(
    product.romanianTitle &&
      product.romanianDescription &&
      titleLooksReady(product.romanianTitle, product.gimaCode) &&
      !hasEnglishLeak(product.romanianTitle) &&
      !hasEnglishLeak(product.romanianDescription),
  );
  const hasSpecs = Array.isArray(product.romanianSpecifications) && product.romanianSpecifications.length >= 2 && !hasEnglishLeak(product.romanianSpecifications.map((spec) => `${spec.label} ${spec.value}`).join(" "));
  const hasImage = product.imageStatus === "verified_local" && product.galleryImages?.length;
  const hasSlug = product.slug && !hasEnglishLeak(product.slug.replaceAll("-", " "));
  const hasDocuments = Boolean(product.documents?.englishManual || product.documents?.ceCertificate || product.documents?.technicalDatasheet);
  const hasCta = true;
  const noBroken = hasImage && product.galleryImages.every((image) => String(image.url || "").startsWith("/product-images/"));
  const noLeaks = publicDisplayCandidate && !hasEnglishLeak(product.romanianFeatures?.join(" ") || "") && !hasEnglishLeak(product.romanianBenefits?.join(" ") || "");
  const breakdown = {
    romanianLocalization: hasRomanian ? 25 : 8,
    imageQuality: hasImage ? 25 : 0,
    documentAvailability: hasDocuments ? 8 : 2,
    specificationCompleteness: hasSpecs ? 15 : 6,
    urlQuality: hasSlug ? 10 : 4,
    commercialCtaCompleteness: hasCta ? 10 : 0,
    noBrokenAssetsOrMetadataLeaks: noBroken && noLeaks ? 7 : noBroken ? 4 : 0,
  };
  const total = Object.values(breakdown).reduce((sum, value) => sum + value, 0);
  return { total, breakdown };
}

function statusForScore(product, score, publicDisplayCandidate) {
  if (!product.romanianTitle || !product.gimaCode) return "excluded";
  if (score >= 90 && publicDisplayCandidate) return "ready_for_publish";
  if (product.imageStatus === "verified_local" && score >= 70) return "image_verified";
  if (product.romanianTitle && product.romanianDescription) return "localized";
  return "needs_review";
}

function publicContentHasEnglishLeak(product) {
  return [
    product.romanianTitle,
    product.romanianDescription,
    product.romanianShortSummary,
    ...(product.romanianFeatures || []),
    ...(product.romanianBenefits || []),
    ...(product.romanianApplications || []),
    ...(product.romanianPackageContents || []),
    ...(product.romanianSpecifications || []).map((spec) => `${spec.label} ${spec.value}`),
    ...(product.installationConsiderations || []),
    ...(product.maintenanceConsiderations || []),
  ].some(hasEnglishLeak);
}

function documentExists(publicPath) {
  if (!publicPath || !String(publicPath).startsWith("/product-documents/")) return false;
  const filePath = path.join(root, "public", String(publicPath).replace(/^\//, ""));
  return fs.existsSync(filePath) && fs.statSync(filePath).size > 1000;
}

function sanitizeDocuments(product) {
  const documents = product.documents || {};
  const sanitized = {};
  const status = {};

  for (const key of ["englishManual", "ceCertificate", "technicalDatasheet"]) {
    if (documents[key] && documentExists(documents[key])) {
      sanitized[key] = documents[key];
      status[key] = "available";
    } else {
      status[key] = documents[key] ? "failed" : "missing";
    }
  }

  product.documents = sanitized;
  product.documentStatus = status;
  product.productDocuments = [];
}

function enforcePublicQualityGate(products) {
  let demotedForEnglish = 0;
  let demotedForMissingImage = 0;
  let demotedForMissingCode = 0;

  for (const product of products) {
    sanitizeDocuments(product);

    if (!product.gimaCode) {
      product.publicDisplayReady = false;
      product.catalogStatus = "needs_review";
      product.qualityScore = 0;
      product.romanianTitle = product.romanianTitle && !hasEnglishLeak(product.romanianTitle) ? product.romanianTitle : "Produs medical in revizuire";
      demotedForMissingCode += 1;
      continue;
    }

    if (product.imageStatus !== "verified_local" || !product.galleryImages?.length) {
      if (product.publicDisplayReady) demotedForMissingImage += 1;
      product.publicDisplayReady = false;
      if (product.gimaCode) product.romanianTitle = `${categoryDefinitions[product.category]?.label || "Produs medical"} cod ${product.gimaCode}`;
      if (product.catalogStatus === "ready_for_publish") product.catalogStatus = "localized";
      continue;
    }

    const hasLocalProductDocument = Boolean(
      product.documents?.englishManual || product.documents?.ceCertificate || product.documents?.technicalDatasheet,
    );
    if (product.sourceQuality !== "gima_page_parity_review" && !hasLocalProductDocument) {
      product.publicDisplayReady = false;
      if (product.gimaCode) product.romanianTitle = `${categoryDefinitions[product.category]?.label || "Produs medical"} cod ${product.gimaCode}`;
      if (product.catalogStatus === "ready_for_publish") product.catalogStatus = "image_verified";
      product.qualityScore = Math.min(product.qualityScore || 0, 89);
      continue;
    }

    if (product.category === "operator-protection" || product.category === "surgical-instruments") {
      product.publicDisplayReady = false;
      if (product.catalogStatus === "ready_for_publish") product.catalogStatus = "image_verified";
      product.qualityScore = Math.min(product.qualityScore || 0, 89);
      continue;
    }

    if (publicContentHasEnglishLeak(product)) {
      if (product.publicDisplayReady) demotedForEnglish += 1;
      product.publicDisplayReady = false;
      if (product.catalogStatus === "ready_for_publish") product.catalogStatus = "image_verified";
      product.qualityScore = Math.min(product.qualityScore || 0, 89);
    }
  }

  return { demotedForEnglish, demotedForMissingImage, demotedForMissingCode };
}

async function processWithConcurrency(items, concurrency, worker) {
  let index = 0;
  const results = [];
  const workers = Array.from({ length: concurrency }, async () => {
    while (index < items.length) {
      const currentIndex = index;
      index += 1;
      results[currentIndex] = await worker(items[currentIndex], currentIndex);
    }
  });
  await Promise.all(workers);
  return results;
}

function buildImportReport({ candidates, products, added, updated, unchanged, imageStats, categoryCounts, qualityCounts, sessionId }) {
  const totalImported = products.length;
  const importedCodes = new Set(products.map((product) => product.gimaCode).filter(Boolean));
  const discoveredCodes = new Set(candidates.map((candidate) => candidate.sku));
  const missingImported = [...discoveredCodes].filter((sku) => !importedCodes.has(sku));
  const categories = Object.entries(categoryCounts)
    .sort((a, b) => b[1].total - a[1].total)
    .map(([category, counts]) => `| ${categoryDefinitions[category]?.label || category} | ${counts.total} | ${counts.ready} | ${counts.needsReview} | ${counts.missingImage} |`)
    .join("\n");

  return `# GIMA Full Import Report

Generated: ${new Date().toISOString()}

Session: ${sessionId}

Source:
- Official GIMA public catalogue PDF: ${sourceCatalogUrl}
- Official GIMA public product/image paths used internally for asset verification.

## Summary

- Total GIMA SKU candidates discovered: ${candidates.length}
- Total products now in local catalog: ${totalImported}
- Products added in this run: ${added}
- Products updated in this run: ${updated}
- Products unchanged/preserved: ${unchanged}
- Products not imported from discovered set: ${missingImported.length}
- Products ready_for_publish locally: ${qualityCounts.ready_for_publish || 0}
- Products needing review/local repair: ${qualityCounts.needs_review || 0}
- Products localized below publish threshold: ${qualityCounts.localized || 0}
- Products image_verified below publish threshold: ${qualityCounts.image_verified || 0}
- Products excluded: ${qualityCounts.excluded || 0}
- Indexing: all imported products remain noindex because none are marked \`reviewStatus: "indexable"\`.
- Sitemap: imported/noindex products remain excluded from sitemap.

## Image Audit

- Real local product images verified: ${imageStats.verified}
- Products missing product images: ${imageStats.missing}
- Broken image count written to public pages: 0
- Placeholder images used for ready_for_publish products: 0

## Category Coverage

| Category | Total products | Ready for publish | Needs review | Missing image |
| --- | ---: | ---: | ---: | ---: |
${categories}

## Document Coverage

- Local English manuals found: ${products.filter((product) => product.documents?.englishManual).length}
- Local CE certificates found: ${products.filter((product) => product.documents?.ceCertificate).length}
- Local technical datasheets found: ${products.filter((product) => product.documents?.technicalDatasheet).length}
- Products missing manuals: ${products.filter((product) => !product.documents?.englishManual).length}
- Products missing CE certificates: ${products.filter((product) => !product.documents?.ceCertificate).length}
- Products missing technical datasheets: ${products.filter((product) => !product.documents?.technicalDatasheet).length}

## Sample URLs

${products
  .filter((product) => product.catalogStatus === "ready_for_publish")
  .slice(0, 20)
  .map((product) => `- /produse/${product.slug}`)
  .join("\n")}

## Notes

- Product source metadata is retained only in data fields for audit and is not rendered on public product pages.
- Products below quality threshold stay noindex and are hidden from public category grids by \`publicDisplayReady: false\`.
- The next repair pass should focus on missing images, product page parity data, and document localization before any indexation phase.
`;
}

function buildQualityAudit({ products, candidates }) {
  const ready = products.filter((product) => product.catalogStatus === "ready_for_publish");
  const below90 = products.filter((product) => (product.qualityScore || 0) < 90);
  const missingImages = products.filter((product) => product.imageStatus !== "verified_local");
  const publicEnglishLeakage = products.filter((product) => product.publicDisplayReady && publicContentHasEnglishLeak(product));
  const localizationIssues = products.filter(publicContentHasEnglishLeak);

  const scoreBuckets = [
    ["90-100", products.filter((product) => (product.qualityScore || 0) >= 90).length],
    ["80-89", products.filter((product) => (product.qualityScore || 0) >= 80 && (product.qualityScore || 0) < 90).length],
    ["70-79", products.filter((product) => (product.qualityScore || 0) >= 70 && (product.qualityScore || 0) < 80).length],
    ["0-69", products.filter((product) => (product.qualityScore || 0) < 70).length],
  ];

  return `# GIMA Full Quality Audit

Generated: ${new Date().toISOString()}

## Verdict

- Catalog imported locally: ${products.length} products.
- Source SKU candidates discovered: ${candidates.length}.
- Ready for repair pass: yes.
- Ready for indexation: no.

Products stay noindex until a separate manual approval phase sets \`reviewStatus: "indexable"\`.

## Quality Summary

- ready_for_publish: ${ready.length}
- needs review / below score 90: ${below90.length}
- missing verified local image: ${missingImages.length}
- public English leakage candidates: ${publicEnglishLeakage.length}
- localization issues held for repair: ${localizationIssues.length}
- broken public image links written: 0
- broken public document links written: 0

## Score Distribution

${scoreBuckets.map(([bucket, count]) => `- ${bucket}: ${count}`).join("\n")}

## Products Below Score 90

${below90
  .slice(0, 150)
  .map((product) => `- ${product.gimaCode}: ${product.romanianTitle || product.sourceProductName} — score ${product.qualityScore || 0}, status ${product.catalogStatus || product.reviewStatus}`)
  .join("\n")}

## Products Missing Images

${missingImages
  .slice(0, 150)
  .map((product) => `- ${product.gimaCode}: ${product.romanianTitle || product.sourceProductName}`)
  .join("\n")}

## Public English Leakage Candidates

${publicEnglishLeakage
  .slice(0, 150)
  .map((product) => `- ${product.gimaCode}: ${product.romanianTitle || product.sourceProductName}`)
  .join("\n") || "- None detected by the automated dictionary."}

## Localization Issues Held For Repair

${localizationIssues
  .slice(0, 150)
  .map((product) => `- ${product.gimaCode || "no-code"}: ${product.romanianTitle || product.sourceProductName}`)
  .join("\n") || "- None detected by the automated dictionary."}

## Remaining Repair Recommendations

- Fetch product-page parity data for high-value products that still rely mainly on catalogue table text.
- Add local technical datasheets where commercially useful; do not expose external source links.
- Manually review titles that were normalized to generic category names.
- Keep all product pages noindex until localization, image, document and commercial review pass.
`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const limit = args.limit ? Number(args.limit) : 0;
  const concurrency = Math.max(1, Number(args.concurrency || 4));
  const dryRun = Boolean(args["dry-run"]);
  const sessionId = `gima-full-import-${new Date().toISOString().replace(/[:.]/g, "-")}`;

  const products = readJson(productsPath, []);
  const sessions = readJson(sessionsPath, []);
  const candidates = loadCandidateProducts(limit || undefined);
  const indexes = buildIndexes(products);
  let added = 0;
  let updated = 0;
  let unchanged = 0;
  const imageStats = { verified: 0, missing: 0 };

  console.log(`Discovered ${candidates.length} GIMA SKU candidates. Processing with concurrency ${concurrency}.`);

  await processWithConcurrency(candidates, concurrency, async (candidate, index) => {
    const existingIndex = indexes.bySku.get(candidate.sku);
    const existing = existingIndex !== undefined ? products[existingIndex] : null;
    const imageResult = await ensureProductImage(candidate.sku, existing, dryRun);
    if (imageResult.status === "verified_local") imageStats.verified += 1;
    else imageStats.missing += 1;

    const product = buildProduct(candidate, existing, imageResult, indexes.bySlug);
    if (existingIndex !== undefined) {
      const previous = JSON.stringify(products[existingIndex]);
      products[existingIndex] = product;
      if (previous === JSON.stringify(product)) unchanged += 1;
      else updated += 1;
    } else {
      products.push(product);
      indexes.bySku.set(candidate.sku, products.length - 1);
      indexes.bySlug.set(product.slug, products.length - 1);
      added += 1;
    }

    if ((index + 1) % 250 === 0) {
      console.log(`Processed ${index + 1}/${candidates.length} products...`);
    }
  });

  products.sort((a, b) => String(a.gimaCode || "").localeCompare(String(b.gimaCode || "")));
  const qualityGateActions = enforcePublicQualityGate(products);

  const categoryCounts = {};
  const qualityCounts = {};
  for (const product of products) {
    const category = product.category || "diagnostic";
    if (!categoryCounts[category]) categoryCounts[category] = { total: 0, ready: 0, needsReview: 0, missingImage: 0 };
    categoryCounts[category].total += 1;
    if (product.catalogStatus === "ready_for_publish") categoryCounts[category].ready += 1;
    if (product.catalogStatus !== "ready_for_publish") categoryCounts[category].needsReview += 1;
    if (product.imageStatus !== "verified_local") categoryCounts[category].missingImage += 1;
    qualityCounts[product.catalogStatus || "needs_review"] = (qualityCounts[product.catalogStatus || "needs_review"] || 0) + 1;
  }

  const session = {
    sessionId,
    source: "gima-full-import-quality-first",
    date: new Date().toISOString(),
    candidateSkus: candidates.length,
    productsTotal: products.length,
    added,
    updated,
    unchanged,
    imageStats,
    qualityGateActions,
    qualityCounts,
    noindexPreserved: products.every((product) => product.reviewStatus !== "indexable"),
  };

  if (!dryRun) {
    writeJson(productsPath, products);
    writeJson(sessionsPath, [...sessions, session]);
    writeText(reportPath, buildImportReport({ candidates, products, added, updated, unchanged, imageStats, categoryCounts, qualityCounts, sessionId }));
    writeText(auditPath, buildQualityAudit({ products, candidates }));
  }

  console.log(JSON.stringify(session, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
