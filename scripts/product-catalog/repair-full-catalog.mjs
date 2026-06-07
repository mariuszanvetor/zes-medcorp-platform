import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const reportPath = path.join(root, "docs", "gima-full-repair-report.md");

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
  "FFP2",
  "FFP3",
  "IIR",
  "NRD",
  "HD",
  "LUX",
  "Lux",
  "Storz",
  "Wolf",
  "Olympus",
  "Pentax",
  "Heine",
  "Riester",
  "Littmann",
  "Aesculap",
  "Cherokee",
  "BD",
  "3M",
  "Aura",
  "GIMA",
];

const categories = {
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

const replacements = [
  [/\bMULTI[- ]PARAMETER\b/gi, "multiparametric"],
  [/\bPARAMETERS\b/gi, "parametri"],
  [/\bPARAMETER\b/gi, "parametru"],
  [/\bFOETAL\b/gi, "fetal"],
  [/\bFETAL\b/gi, "fetal"],
  [/\bEMERGENCY TROLLEY\b/gi, "carucior de urgenta"],
  [/\bDRESSING TROLLEY\b/gi, "carucior pentru pansamente"],
  [/\bPATIENT TRANSFER CHAIR\b/gi, "scaun pentru transfer pacient"],
  [/\bOVERBED TABLE\b/gi, "masa peste pat"],
  [/\bTROLLEY\b/gi, "carucior"],
  [/\bCHAIR\b/gi, "scaun"],
  [/\bTABLE\b/gi, "masa"],
  [/\bCOUCH\b/gi, "canapea medicala"],
  [/\bSTOOL\b/gi, "taburet"],
  [/\bBED\b/gi, "pat"],
  [/\bCABINET\b/gi, "dulap"],
  [/\bLIFTER\b/gi, "ridicator"],
  [/\bWHEELCHAIR\b/gi, "scaun rulant"],
  [/\bSTRETCHER\b/gi, "targa"],
  [/\bMONITOR\b/gi, "monitor"],
  [/\bANALYZER\b/gi, "analizor"],
  [/\bANALYSER\b/gi, "analizor"],
  [/\bCENTRIFUGE\b/gi, "centrifuga"],
  [/\bMICROSCOPE\b/gi, "microscop"],
  [/\bPIPETTE\b/gi, "pipeta"],
  [/\bURINE\b/gi, "urina"],
  [/\bGLUCOSE\b/gi, "glucoza"],
  [/\bCHOLESTEROL\b/gi, "colesterol"],
  [/\bHEMOGLOBIN\b/gi, "hemoglobina"],
  [/\bHEMATOCRIT\b/gi, "hematocrit"],
  [/\bLANCETS\b/gi, "lancete"],
  [/\bLANCET\b/gi, "lanceta"],
  [/\bSTRIPS\b/gi, "benzi"],
  [/\bSTRIP\b/gi, "banda"],
  [/\bCONTROL SOLUTION\b/gi, "solutie de control"],
  [/\bSOLUTION\b/gi, "solutie"],
  [/\bMETER\b/gi, "aparat de masurare"],
  [/\bPRINTER\b/gi, "imprimanta"],
  [/\bPAPER\b/gi, "hartie"],
  [/\bULTRASOUND\b/gi, "ecograf"],
  [/\bDOPPLER\b/gi, "Doppler"],
  [/\bSTETHOSCOPE\b/gi, "stetoscop"],
  [/\bSPHYGMOMANOMETER\b/gi, "tensiometru"],
  [/\bTHERMOMETER\b/gi, "termometru"],
  [/\bOTOSCOPE\b/gi, "otoscop"],
  [/\bOPHTHALMOSCOPE\b/gi, "oftalmoscop"],
  [/\bDERMATOSCOPE\b/gi, "dermatoscop"],
  [/\bRETINOSCOPE\b/gi, "retinoscop"],
  [/\bCOLPOSCOPE\b/gi, "colposcop"],
  [/\bHEADLIGHT\b/gi, "lampa frontala"],
  [/\bLIGHT SOURCE\b/gi, "sursa de lumina"],
  [/\bMEDICAL LIGHT\b/gi, "lampa medicala"],
  [/\bLIGHT\b/gi, "lampa"],
  [/\bMIRROR\b/gi, "oglinda"],
  [/\bLOUPE\b/gi, "lupa"],
  [/\bLOUPES\b/gi, "lupe"],
  [/\bCABLE\b/gi, "cablu"],
  [/\bBATTERY\b/gi, "baterie"],
  [/\bCHARGER\b/gi, "incarcator"],
  [/\bCONNECTOR\b/gi, "conector"],
  [/\bADAPTER\b/gi, "adaptor"],
  [/\bADAPTOR\b/gi, "adaptor"],
  [/\bPROBE\b/gi, "sonda"],
  [/\bSENSOR\b/gi, "senzor"],
  [/\bELECTRODES\b/gi, "electrozi"],
  [/\bELECTRODE\b/gi, "electrod"],
  [/\bFOLEY CATHETER\b/gi, "cateter Foley"],
  [/\bRECTAL CATHETERS\b/gi, "catetere rectale"],
  [/\bRECTAL CATHETER\b/gi, "cateter rectal"],
  [/\bCATHETERS\b/gi, "catetere"],
  [/\bCATHETER\b/gi, "cateter"],
  [/\bBALLOON\b/gi, "balonas"],
  [/\bLUBRICANT\b/gi, "lubrifiant"],
  [/\bSKIN STAPLE REMOVER\b/gi, "extractor pentru agrafe cutanate"],
  [/\bSTAPLE REMOVER\b/gi, "extractor pentru agrafe"],
  [/\bSCALPELS\b/gi, "bisturie"],
  [/\bSCALPEL\b/gi, "bisturiu"],
  [/\bBLADE\b/gi, "lama"],
  [/\bBLADES\b/gi, "lame"],
  [/\bSCISSORS\b/gi, "foarfeca"],
  [/\bFORCEPS\b/gi, "pensa"],
  [/\bCLAMP\b/gi, "pensa"],
  [/\bNEEDLE HOLDER\b/gi, "portac"],
  [/\bSTRAIGHT\b/gi, "drept"],
  [/\bCURVED\b/gi, "curbat"],
  [/\bSHARP\b/gi, "ascutit"],
  [/\bBLUNT\b/gi, "bont"],
  [/\bDRAPES\b/gi, "campuri medicale"],
  [/\bDRAPE\b/gi, "camp medical"],
  [/\bSTOCKINETTE LEGGING\b/gi, "manson textil steril"],
  [/\bPAIR OF LEGGINGS\b/gi, "pereche de mansete textile sterile"],
  [/\bLEGGING\b/gi, "manson textil"],
  [/\bNON[- ]WOVEN\b/gi, "netesut"],
  [/\bBI[- ]LAYER\b/gi, "dublu strat"],
  [/\bSTERILE\b/gi, "steril"],
  [/\bDISPOSABLE\b/gi, "de unica folosinta"],
  [/\bREUSABLE\b/gi, "reutilizabil"],
  [/\bSURGICAL\b/gi, "chirurgical"],
  [/\bGLOVES\b/gi, "manusi"],
  [/\bMASKS\b/gi, "masti"],
  [/\bMASK\b/gi, "masca"],
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
  [/\bBAG\b/gi, "geanta"],
  [/\bCASE\b/gi, "cutie"],
  [/\bCOVER\b/gi, "husa"],
  [/\bKIT\b/gi, "kit"],
  [/\bSET\b/gi, "set"],
  [/\bSCALE\b/gi, "cantar"],
  [/\bSCALES\b/gi, "cantare"],
  [/\bMEASURER\b/gi, "masurator"],
  [/\bFURNITURE\b/gi, "mobilier"],
  [/\bEMERGENCY\b/gi, "urgenta"],
  [/\bFIRST AID\b/gi, "prim ajutor"],
  [/\bHYDRAULIC\b/gi, "hidraulic"],
  [/\bELECTRIC\b/gi, "electric"],
  [/\bLIGHT GREY\b/gi, "gri deschis"],
  [/\bLIGHT GRAY\b/gi, "gri deschis"],
  [/\bDIGITAL\b/gi, "digital"],
  [/\bPROFESSIONAL\b/gi, "profesional"],
  [/\bVETERINARY\b/gi, "veterinar"],
  [/\bEXAMINATION\b/gi, "examinare"],
  [/\bOPERATION\b/gi, "operatie"],
  [/\bSCREW\b/gi, "surub"],
  [/\bCLIP\b/gi, "clema"],
  [/\bMOUTH\b/gi, "gura"],
  [/\bPAW\b/gi, "laba"],
  [/\bEFFECTIVE\b/gi, "eficient"],
  [/\bFILTERING\b/gi, "filtranta"],
  [/\bFABRIC\b/gi, "material"],
  [/\bCONIC\b/gi, "conic"],
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
  [/\bPINK\b/gi, "roz"],
  [/\bDARK\b/gi, "inchis"],
  [/\bSKY\b/gi, "albastru deschis"],
  [/\bPURPLE\b/gi, "mov"],
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
  [/\bBOXES OF\b/gi, "cutii cu"],
  [/\bBOX OF\b/gi, "cutie cu"],
  [/\bBOX\b/gi, "cutie"],
  [/\bBAG OF\b/gi, "punga cu"],
  [/\bSPARE\b/gi, "piesa de schimb"],
  [/\bOPTIONAL\b/gi, "optional"],
  [/\bWITH\b/gi, "cu"],
  [/\bWITHOUT\b/gi, "fara"],
  [/\bFOR\b/gi, "pentru"],
  [/\bAND\b/gi, "si"],
];

const leakPatterns = [
  /\b(power|voltage|communication|interface|record mode|host computer|large display|user[- ]friendly|fast results|sample volume)\b/i,
  /\b(description|features|package contents|applications|benefits|specifications|delivery|support|category|product code)\b/i,
  /\b(trolley|chair|table|analyzer|analyser|centrifuge|microscope|stethoscope|thermometer|sphygmomanometer)\b/i,
  /\b(sterile|drape|forceps|clamp|straight|curved|disposable|gloves|mask|bag|scale|light|headlight)\b/i,
  /\b(v-neck|woman|women|man|men|navy|teal|top|tops|tunic|pants|trousers|jacket|basket|case|cover|adapter|adaptor|children|adult|optional|suitable|only|provided|from|with|size guide|line)\b/i,
  /\b(kit of|silicone|straps?|steel chain|operator'?s protection|3-ply|ply|pink|dark|sky|other colours|boxes of|box of|colour|color)\b/i,
  /\b(respirator|reusable|safe comfort|layer|classified|according|kid|age|valve|ear loops|headband|conical|cashmere|stars|skull|rainbow|wave)\b/i,
  /\b(catheter|balloon|rectal|purple|lubricant|box|2-way|3-way|staple|blade|scalpel|foley|fabric|effective|filtering)\b/i,
];

function clean(value) {
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
  let result = clean(value);
  for (const [pattern, replacement] of replacements) result = result.replace(pattern, replacement);
  return result
    .replace(/\bGima\b/g, "GIMA")
    .replace(/\bFfp2\b/g, "FFP2")
    .replace(/\bFfp3\b/g, "FFP3")
    .replace(/\bIir\b/g, "IIR")
    .replace(/\bNrd\b/g, "NRD")
    .replace(/\bLed\b/g, "LED")
    .replace(/\bLcd\b/g, "LCD")
    .replace(/\bUsb\b/g, "USB")
    .replace(/\bWifi\b/g, "WiFi")
    .replace(/\bBluetooth\b/gi, "Bluetooth")
    .replace(/\bIvd\b/g, "IVD")
    .replace(/\bOrl\b/g, "ORL")
    .replace(/\bCe\b/g, "CE")
    .replace(/\bIso\b/g, "ISO")
    .replace(/\s+/g, " ")
    .trim();
}

function titleCase(value) {
  const raw = romanianize(value).toLowerCase();
  const protectedTerms = new Set(allowedEnglishTerms.map((term) => term.toLowerCase()));
  return raw
    .split(" ")
    .map((word, index) => {
      const bare = word.replace(/[^a-z0-9]/gi, "").toLowerCase();
      if (protectedTerms.has(bare)) return word.replace(new RegExp(bare, "i"), [...allowedEnglishTerms].find((term) => term.toLowerCase() === bare) || word);
      if (index === 0) return word.charAt(0).toUpperCase() + word.slice(1);
      return word;
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripAllowedTerms(value) {
  let text = String(value || "");
  for (const term of allowedEnglishTerms) {
    text = text.replace(new RegExp(`\\b${escapeRegExp(term)}\\b`, "gi"), " ");
  }
  return text;
}

function hasEnglishLeak(value) {
  const text = stripAllowedTerms(value);
  return leakPatterns.some((pattern) => pattern.test(text));
}

function looksLikeTableArtifact(value, sku) {
  const text = clean(value);
  const withoutSku = text.replace(String(sku || ""), " ");
  const numbers = withoutSku.match(/\b\d{4,}\b/g) || [];
  const words = withoutSku.match(/[A-Za-z]{3,}/g) || [];
  if (!words.length || words.length < 2) return true;
  if (numbers.length > 1) return true;
  if (/•/.test(text)) return true;
  if (/^(xs|s|m|l|xl|xxl|xxxl)\b/i.test(text)) return true;
  if (/^(size guide|class i|needs|see the list|produs medical|operator'?s protection)\b/i.test(text)) return true;
  if (/^(rosu|alb|negru|albastru|verde|gri|mov|violet|galben|portocaliu)(\s*&\s*|\s+si\s+)?(rosu|alb|negru|albastru|verde|gri|mov|violet|galben|portocaliu)?$/i.test(text)) return true;
  if (/\b(gb|fr|it|es|pt|de|se|gr|ro)\s*,\s*(gb|fr|it|es|pt|de|se|gr|ro)\b/i.test(text)) return true;
  if (/^([a-z]{1,3}\s*)?[\d\s.,x+-]+$/i.test(text)) return true;
  return false;
}

function repairTitle(product) {
  const source = product.sourceProductName || product.romanianTitle || "";
  if (looksLikeTableArtifact(source, product.gimaCode)) return "";
  const translated = titleCase(source)
    .replace(/^•?\s*\d{5}\s+/, "")
    .replace(/\s+-\s+$/g, "")
    .replace(/\s+\*\*?/g, "")
    .replace(/\blampa gri\b/gi, "gri deschis")
    .replace(/\s+/g, " ")
    .trim();
  if (looksLikeTableArtifact(translated, product.gimaCode)) return "";
  if (hasEnglishLeak(translated)) return "";
  return translated;
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

function uniqueSlug(base, sku, used, currentSlug) {
  const rootSlug = slugify(`${base} ${sku}`) || `produs-medical-${sku}`;
  if (currentSlug === rootSlug && !used.has(rootSlug)) {
    used.add(rootSlug);
    return rootSlug;
  }
  let candidate = rootSlug;
  let suffix = 2;
  while (used.has(candidate)) {
    candidate = `${rootSlug}-${suffix}`;
    suffix += 1;
  }
  used.add(candidate);
  return candidate;
}

function fileExists(publicPath) {
  if (!publicPath || !String(publicPath).startsWith("/")) return false;
  const filePath = path.join(root, "public", publicPath.replace(/^\//, ""));
  return fs.existsSync(filePath) && fs.statSync(filePath).size > 1000;
}

function sanitizeDocuments(product) {
  const documents = product.documents || {};
  const sanitized = {};
  const status = {};
  for (const key of ["englishManual", "ceCertificate", "technicalDatasheet"]) {
    if (documents[key] && fileExists(documents[key])) {
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

function cleanSpecifications(product) {
  const category = categories[product.category]?.label || "Echipamente medicale";
  const rawSpecs = Array.isArray(product.romanianSpecifications) ? product.romanianSpecifications : [];
  const repaired = [];
  for (const spec of rawSpecs) {
    const label = romanianize(spec.label || "");
    const value = romanianize(spec.value || "");
    if (!label || !value) continue;
    if (hasEnglishLeak(label) || hasEnglishLeak(value)) continue;
    if (/^stadiu$/i.test(label) || /disponibil pentru cerere/i.test(value)) continue;
    repaired.push({ label, value });
  }
  const withBasics = [
    { label: "Cod produs", value: product.gimaCode },
    { label: "Categorie", value: category },
    ...repaired.filter((spec) => !["Cod produs", "Categorie"].includes(spec.label)),
  ];
  const seen = new Set();
  return withBasics.filter((spec) => {
    const key = `${spec.label}:${spec.value}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 10);
}

function scoreProduct(product, title) {
  const hasImage = product.imageStatus === "verified_local" && product.galleryImages?.length && product.galleryImages.every((image) => fileExists(image.url));
  const hasTitle = Boolean(title && !hasEnglishLeak(title) && !looksLikeTableArtifact(title, product.gimaCode));
  const hasDescription = Boolean(product.romanianDescription && !hasEnglishLeak(product.romanianDescription));
  const hasSlug = Boolean(product.slug && product.slug.endsWith(String(product.gimaCode || "")));
  const hasSpecs = Array.isArray(product.romanianSpecifications) && product.romanianSpecifications.length >= 2;
  const noLeaks = !publicContentHasEnglishLeak(product);
  const breakdown = {
    titleQuality: hasTitle ? 25 : 0,
    localizationQuality: hasDescription && noLeaks ? 22 : 8,
    imagePresence: hasImage ? 25 : 0,
    urlQuality: hasSlug ? 10 : 4,
    ctaCompleteness: 10,
    metadataSafety: noLeaks ? 8 : 0,
    specificationQuality: hasSpecs ? 10 : 5,
  };
  const total = Math.min(100, Object.values(breakdown).reduce((sum, value) => sum + value, 0));
  return { total, breakdown };
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

function applyRepair(product, usedSlugs) {
  sanitizeDocuments(product);
  product.reviewStatus = product.reviewStatus === "indexable" ? "reviewed" : product.reviewStatus;
  product.indexableAt = null;

  const category = categories[product.category] || categories.diagnostic;
  const repairedTitle = repairTitle(product);
  const hasImage = product.imageStatus === "verified_local" && product.galleryImages?.length && product.galleryImages.every((image) => fileExists(image.url));

  if (!product.gimaCode || !hasImage || !repairedTitle) {
    product.publicDisplayReady = false;
    product.catalogStatus = hasImage ? "image_verified" : "localized";
    product.qualityScore = hasImage ? 78 : 50;
    if (!repairedTitle && product.gimaCode) product.romanianTitle = `${category.label} cod ${product.gimaCode}`;
    product.slug = uniqueSlug(product.romanianTitle || `produs medical ${product.gimaCode || product.id}`, product.gimaCode || product.id, usedSlugs, "");
    return { repaired: false, reason: !hasImage ? "missing_image" : "weak_title" };
  }

  product.romanianTitle = repairedTitle;
  product.slug = uniqueSlug(repairedTitle, product.gimaCode, usedSlugs, "");
  product.commercialCategory = category.label;
  product.subcategory = category.label;
  product.romanianShortSummary = `${repairedTitle} pentru ${category.applications[0]}, disponibil pentru oferta personalizata prin ZESCORP.`;
  product.romanianDescription =
    `${repairedTitle} este un produs din categoria ${category.label.toLowerCase()}, pregatit pentru cereri de oferta profesionale prin ZESCORP. ` +
    "Configuratia, cantitatea, accesoriile si documentatia se confirma inainte de ofertare, in functie de aplicatia clinica.";
  product.romanianApplications = category.applications.map((item) => `Utilizare in ${item}`);
  product.romanianBenefits = [
    "Oferta personalizata in functie de aplicatie si cantitate",
    "Posibilitate de corelare cu instalare, service si mentenanta",
    "Suport ZESCORP pentru clarificarea configuratiei inainte de achizitie",
  ];
  product.romanianFeatures = ["Produs medical pentru cerere de oferta", "Configuratie verificata inainte de ofertare", "Suport comercial si tehnic ZESCORP"];
  product.romanianPackageContents = ["Continutul pachetului se confirma in functie de configuratia solicitata"];
  product.romanianSpecifications = cleanSpecifications(product);
  product.installationConsiderations = [
    "Verificarea configuratiei, cantitatii si termenului inainte de ofertare",
    "Confirmarea accesoriilor si consumabilelor necesare pentru utilizare",
    "Corelarea produsului cu fluxul operational al clinicii, cabinetului sau laboratorului",
  ];
  product.maintenanceConsiderations = [
    "Suport pentru service si mentenanta in functie de tipul produsului",
    "Clarificarea documentatiei si a consumabilelor recurente",
    "Recomandari pentru continuitate operationala si utilizare corecta",
  ];
  product.relatedServices = category.relatedServices;
  product.imageAlt = `${repairedTitle} - produs medical pentru oferta ZESCORP`;
  product.galleryImages = (product.galleryImages || []).map((image) => ({ ...image, alt: product.imageAlt, verified: true }));

  const score = scoreProduct(product, repairedTitle);
  product.qualityScore = score.total;
  product.qualityBreakdown = score.breakdown;
  product.catalogStatus = score.total >= 90 && !publicContentHasEnglishLeak(product) ? "ready_for_publish" : "image_verified";
  product.publicDisplayReady = product.catalogStatus === "ready_for_publish";
  product.reviewStatus = product.publicDisplayReady ? "image_verified" : "translated";
  return { repaired: product.publicDisplayReady, reason: product.publicDisplayReady ? "ready" : "below_score" };
}

function buildReport({ beforeReady, products, stats, categoryCounts }) {
  const belowScore = products.filter((product) => (product.qualityScore || 0) < 90);
  const missingImages = products.filter((product) => product.imageStatus !== "verified_local");
  const weakTranslations = products.filter((product) => !product.publicDisplayReady && (product.imageStatus === "verified_local"));
  const categoryRows = Object.entries(categoryCounts)
    .sort((a, b) => b[1].total - a[1].total)
    .map(([category, counts]) => `| ${categories[category]?.label || category} | ${counts.total} | ${counts.ready} | ${counts.missingImage} | ${counts.weakTitle} |`)
    .join("\n");

  return `# GIMA Full Repair Report

Generated: ${new Date().toISOString()}

## Summary

- Products in local catalog: ${products.length}
- ready_for_publish before repair: ${beforeReady}
- ready_for_publish after repair: ${products.filter((product) => product.catalogStatus === "ready_for_publish").length}
- Products repaired/promoted in this pass: ${stats.promoted}
- Products still needs_review / below threshold: ${products.length - products.filter((product) => product.catalogStatus === "ready_for_publish").length}
- Products missing verified local images: ${missingImages.length}
- Products with weak translations/titles held for review: ${weakTranslations.length}
- Products below score 90: ${belowScore.length}
- Product pages indexable: ${products.filter((product) => product.reviewStatus === "indexable").length}

## Repair Rules

- No new products imported.
- Only existing local products and already-verified local images were used.
- Technical specifications were not invented; unsafe or mixed-language specs were removed.
- Products without verified local images remain below publish threshold.
- Products with weak PDF/table titles remain in review.
- All products remain noindex until a separate indexation approval phase.

## Category Coverage After Repair

| Category | Total | Ready for publish | Missing image | Weak/title repair needed |
| --- | ---: | ---: | ---: | ---: |
${categoryRows}

## Still Missing Images

${missingImages
  .slice(0, 120)
  .map((product) => `- ${product.gimaCode || "no-code"}: ${product.romanianTitle || product.sourceProductName}`)
  .join("\n")}

## Weak Translations / Titles Held For Review

${weakTranslations
  .slice(0, 160)
  .map((product) => `- ${product.gimaCode || "no-code"}: ${product.sourceProductName || product.romanianTitle}`)
  .join("\n")}

## Products Below Score 90

${belowScore
  .slice(0, 160)
  .map((product) => `- ${product.gimaCode || "no-code"}: ${product.romanianTitle || product.sourceProductName} — score ${product.qualityScore || 0}`)
  .join("\n")}

## Recommendation

This catalog is ready for another repair pass focused on:
- source-page title extraction for weak PDF/table rows;
- image recovery for products missing \`/images/prodotti/big/<sku>.jpg\`;
- manual review of operator protection, surgical consumables, apparel-like rows and accessory tables;
- document download expansion where useful.

It is not ready for indexation.
`;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function main() {
  const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
  const beforeReady = products.filter((product) => product.catalogStatus === "ready_for_publish").length;
  const usedSlugs = new Set();
  const stats = { promoted: 0, weakTitle: 0, missingImage: 0, belowScore: 0 };

  for (const product of products) {
    const result = applyRepair(product, usedSlugs);
    if (result.repaired) stats.promoted += 1;
    else if (result.reason === "missing_image") stats.missingImage += 1;
    else if (result.reason === "weak_title") stats.weakTitle += 1;
    else stats.belowScore += 1;
  }

  products.sort((a, b) => String(a.gimaCode || "").localeCompare(String(b.gimaCode || "")));

  const categoryCounts = {};
  for (const product of products) {
    const category = product.category || "diagnostic";
    if (!categoryCounts[category]) categoryCounts[category] = { total: 0, ready: 0, missingImage: 0, weakTitle: 0 };
    categoryCounts[category].total += 1;
    if (product.catalogStatus === "ready_for_publish") categoryCounts[category].ready += 1;
    if (product.imageStatus !== "verified_local") categoryCounts[category].missingImage += 1;
    if (!product.publicDisplayReady && product.imageStatus === "verified_local") categoryCounts[category].weakTitle += 1;
  }

  fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`);
  fs.writeFileSync(reportPath, buildReport({ beforeReady, products, stats, categoryCounts }));
  console.log(JSON.stringify({ beforeReady, afterReady: products.filter((product) => product.catalogStatus === "ready_for_publish").length, stats }, null, 2));
}

main();
