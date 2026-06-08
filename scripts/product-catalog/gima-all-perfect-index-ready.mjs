import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data/product-catalog/products.json");
const redirectsPath = path.join(root, "data/product-catalog/product-redirects.json");
const reportPath = path.join(root, "docs/gima-all-perfect-index-ready-report.md");
const qaPath = path.join(root, "docs/gima-all-random-qa-100.md");
const googlePath = path.join(root, "docs/gima-all-google-test.md");

const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
const redirects = fs.existsSync(redirectsPath) ? JSON.parse(fs.readFileSync(redirectsPath, "utf8")) : [];

const categoryProfiles = {
  diagnostic: {
    label: "Diagnostic medical",
    buyer: "clinici, cabinete medicale, centre de diagnostic si ambulatorii",
    where: "cabinete de consultatie, camere de triaj, ambulatorii si zone de evaluare rapida",
    what: "masurare, evaluare si documentare clinica",
    procurement: "aplicatia clinica, accesoriile compatibile, garantia si suportul de service",
    services: ["/solutii-medicale/echipamente-imagistica-diagnostic", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  laboratory: {
    label: "Laborator / IVD",
    buyer: "laboratoare medicale, clinici cu puncte de recoltare si unitati IVD",
    where: "laboratoare, camere de prelucrare probe si zone de lucru IVD",
    what: "prelucrarea probelor, analiza de laborator si organizarea fluxului IVD",
    procurement: "capacitatea, metoda de lucru, consumabilele, documentatia si service-ul",
    services: ["/solutii-medicale/echipamente-laborator-ivd", "/service-laborator-ivd", "/contracte-mentenanta"],
  },
  emergency: {
    label: "Urgenta",
    buyer: "spitale, clinici, centre de urgente, ambulante si echipe mobile",
    where: "zone de urgenta, camere de interventie, truse mobile si puncte de prim-ajutor",
    what: "interventie rapida, mobilizare, oxigenoterapie si suport operational",
    procurement: "robustetea, curatarea, compatibilitatea cu fluxul de urgenta si accesoriile",
    services: ["/service-aparatura-medicala", "/contracte-mentenanta", "/solutii-medicale/instalare-punere-in-functiune"],
  },
  sterilization: {
    label: "Sterilizare",
    buyer: "cabinete, clinici, stomatologie, laboratoare si unitati cu flux de instrumentar",
    where: "zone de sterilizare, camere de pregatire instrumentar si cabinete cu activitate procedurala",
    what: "sterilizare, sigilare, trasabilitate si pregatirea instrumentarului",
    procurement: "capacitatea, compatibilitatea cu instrumentarul, documentatia si consumabilele",
    services: ["/solutii-medicale/instalare-punere-in-functiune", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "medical-furniture": {
    label: "Mobilier medical",
    buyer: "clinici, cabinete, spitale si investitori care amenajeaza spatii medicale",
    where: "cabinete, sali de tratament, zone de consultatie, saloane si spatii operationale",
    what: "organizarea spatiului, ergonomie clinica si suport pentru fluxul pacientilor",
    procurement: "dimensiunile, materialele, igienizarea, mobilitatea si integrarea in spatiu",
    services: ["/solutii-medicale/amenajare-clinica-medicala", "/services/amenajari-medicale", "/contracte-mentenanta"],
  },
  ent: {
    label: "ORL",
    buyer: "cabinete ORL, policlinici si centre specializate",
    where: "cabinete ORL si camere de consultatie specializata",
    what: "examinare ORL, iluminare, vizualizare si diagnostic de cabinet",
    procurement: "compatibilitatea cu instrumentarul existent, iluminarea, accesoriile si service-ul",
    services: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  gynecology: {
    label: "Ginecologie",
    buyer: "cabinete de ginecologie, obstetrica si clinici materno-fetale",
    where: "cabinete de ginecologie, camere de consultatie si zone de monitorizare",
    what: "consultatie, monitorizare si suport pentru fluxuri materno-fetale",
    procurement: "compatibilitatea, documentatia, accesoriile si integrarea in cabinet",
    services: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  electromedical: {
    label: "Electromedicale",
    buyer: "clinici si cabinete de proceduri cu echipamente electromedicale",
    where: "sali de proceduri, cabinete specializate si zone de tratament controlat",
    what: "proceduri electromedicale si suport tehnic pentru activitate clinica",
    procurement: "aplicatia clinica, accesoriile, consumabilele si conditiile de mentenanta",
    services: ["/solutii-medicale/instalare-punere-in-functiune", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "surgical-instruments": {
    label: "Instrumentar chirurgical",
    buyer: "cabinete, clinici si unitati cu activitate procedurala",
    where: "sali de tratament, camere de interventie si zone de sterilizare",
    what: "instrumentar, consumabile si accesorii pentru proceduri medicale",
    procurement: "cantitatea, sterilitatea, compatibilitatea cu fluxul si documentatia disponibila",
    services: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "patient-care": {
    label: "Ingrijire pacient",
    buyer: "spitale, clinici, centre de ingrijire si unitati de recuperare",
    where: "saloane, camere de tratament, zone de transfer si ingrijire pacient",
    what: "mobilizare, transfer, confort si suport operational pentru pacient",
    procurement: "capacitatea, materialele, curatarea, dimensiunile si compatibilitatea cu fluxul",
    services: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  monitoring: {
    label: "Monitorizare",
    buyer: "clinici, spitale, ambulatorii si unitati care urmaresc parametri clinici",
    where: "cabinete, triaj, ambulatoriu si zone de monitorizare pacient",
    what: "monitorizare clinica, evaluare parametri si suport operational",
    procurement: "parametrii masurati, accesoriile, conectivitatea, consumabilele si service-ul",
    services: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "operator-protection": {
    label: "Protectie operator",
    buyer: "clinici, spitale, cabinete si echipe care standardizeaza protectia personalului",
    where: "cabinete, zone de proceduri, triaj si fluxuri cu risc operational",
    what: "protectia personalului, igiena si siguranta fluxurilor medicale",
    procurement: "marimile, nivelul de protectie, cantitatea, ambalarea si necesarul recurent",
    services: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "medical-bags": {
    label: "Genti medicale",
    buyer: "echipe mobile, ambulante, clinici si personal de interventie",
    where: "interventii mobile, transport materiale si truse medicale organizate",
    what: "transport, organizare si acces rapid la materiale sau instrumentar",
    procurement: "capacitatea, compartimentarea, materialele si scenariul de interventie",
    services: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "scales-measures": {
    label: "Cantare si masurare",
    buyer: "clinici, cabinete, centre de recuperare si unitati pediatrice",
    where: "cabinete de consultatie, triaj, pediatrie, recuperare si evaluare pacient",
    what: "cantarire, masurare si evaluare antropometrica",
    procurement: "capacitatea, precizia, clasa de utilizare, dimensiunile si intretinerea",
    services: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  physiotherapy: {
    label: "Fizioterapie",
    buyer: "clinici de recuperare, fizioterapie si cabinete de tratament",
    where: "sali de recuperare, camere de terapie si zone de exercitii asistate",
    what: "recuperare, terapie, mobilizare si suport pentru pacient",
    procurement: "aplicatia terapeutica, accesoriile, siguranta si intretinerea",
    services: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  veterinary: {
    label: "Veterinar",
    buyer: "clinici veterinare, cabinete si centre cu activitate de interventie",
    where: "cabinete veterinare, sali de tratament si zone de interventie",
    what: "dotare veterinara, examinare, tratament si suport operational",
    procurement: "aplicatia veterinara, dimensiunile, accesoriile si curatarea",
    services: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "anatomy-models": {
    label: "Modele anatomice",
    buyer: "institutii educationale, clinici si centre de instruire",
    where: "sali de curs, training medical si demonstratii clinice",
    what: "educatie medicala, instruire si demonstratie anatomica",
    procurement: "nivelul de detaliu, durabilitatea, aplicatia didactica si cantitatea",
    services: ["/contact"],
  },
  "medical-lights": {
    label: "Lampi medicale",
    buyer: "clinici, cabinete, sali de tratament si unitati de proceduri",
    where: "cabinete de examinare, camere de tratament si zone cu iluminare dedicata",
    what: "iluminare pentru examinare, proceduri si lucru clinic de precizie",
    procurement: "tipul de montaj, intensitatea, bratul, alimentarea si mentenanta",
    services: ["/solutii-medicale/instalare-punere-in-functiune", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
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
  "HD",
  "TFT",
  "AED",
  "SpO2",
  "NIBP",
  "EtCO2",
  "GIMA",
  "Heine",
  "Riester",
  "Littmann",
  "Aesculap",
  "Omron",
  "Mindray",
  "Microlife",
  "Chison",
  "Seca",
  "Soehnle",
  "3M",
];

const phraseReplacements = [
  [/\bBLOOD PRESSURE MONITOR\b/gi, "tensiometru"],
  [/\bB\.P\.?\s*MONITOR\b/gi, "tensiometru"],
  [/\bWRIST\b/gi, "pentru incheietura"],
  [/\bARM\b/gi, "pentru brat"],
  [/\bMULTI[- ]?PARAMETER\b/gi, "multiparametric"],
  [/\bPATIENT MONITOR\b/gi, "monitor pacient"],
  [/\bFOETAL\b/gi, "fetal"],
  [/\bFETAL\b/gi, "fetal"],
  [/\bMONITOR\b/gi, "monitor"],
  [/\bECG\b/gi, "ECG"],
  [/\bELECTROCARDIOGRAPH\b/gi, "electrocardiograf"],
  [/\bPULSE OXIMETER\b/gi, "pulsoximetru"],
  [/\bOXIMETER\b/gi, "pulsoximetru"],
  [/\bDEFIBRILLATOR\b/gi, "defibrilator"],
  [/\bOXYGEN CONCENTRATOR\b/gi, "concentrator de oxigen"],
  [/\bOXYGEN MASK\b/gi, "masca de oxigen"],
  [/\bOXYGEN\b/gi, "oxigen"],
  [/\bEMERGENCY TROLLEY\b/gi, "carucior de urgenta"],
  [/\bDRESSING TROLLEY\b/gi, "carucior pentru pansamente"],
  [/\bTROLLEY\b/gi, "carucior"],
  [/\bCART\b/gi, "carucior"],
  [/\bCHAIR\b/gi, "scaun"],
  [/\bSTOOL\b/gi, "taburet"],
  [/\bTABLE\b/gi, "masa"],
  [/\bBED\b/gi, "pat"],
  [/\bSTRETCHER\b/gi, "targa"],
  [/\bBASKET\b/gi, "cos"],
  [/\bCRUTCHES?\b/gi, "carje"],
  [/\bWALKER\b/gi, "cadru de mers"],
  [/\bPATIENT LIFTER\b/gi, "ridicator pacient"],
  [/\bLIFTER\b/gi, "ridicator"],
  [/\bWHEELCHAIR\b/gi, "scaun rulant"],
  [/\bSTERILIZER\b/gi, "sterilizator"],
  [/\bAUTOCLAVE\b/gi, "autoclava"],
  [/\bSEALING MACHINE\b/gi, "aparat de sigilare"],
  [/\bHEAT SEALER\b/gi, "aparat de sigilare"],
  [/\bLABELER\b/gi, "etichetator"],
  [/\bCENTRIFUGE\b/gi, "centrifuga"],
  [/\bANALYZER\b/gi, "analizor"],
  [/\bANALYSER\b/gi, "analizor"],
  [/\bTEST TUBES?\b/gi, "eprubete"],
  [/\bTUBES?\b/gi, "tuburi"],
  [/\bCUVETTES?\b/gi, "cuvete"],
  [/\bMICROSCOPE\b/gi, "microscop"],
  [/\bDISPENSER\b/gi, "dispenser"],
  [/\bHEADLIGHT\b/gi, "lampa frontala"],
  [/\bLAMP\b/gi, "lampa"],
  [/\bLIGHT\b/gi, "lampa"],
  [/\bOTOSCOPE\b/gi, "otoscop"],
  [/\bDERMATOSCOPE\b/gi, "dermatoscop"],
  [/\bRETINOSCOPE\b/gi, "retinoscop"],
  [/\bAUDIOMETER\b/gi, "audiometru"],
  [/\bSPECULA?\b/gi, "specul"],
  [/\bPROBE\b/gi, "sonda"],
  [/\bTRANSDUCER\b/gi, "traductor"],
  [/\bULTRASOUND\b/gi, "ecograf"],
  [/\bDOPPLER\b/gi, "Doppler"],
  [/\bCABLE\b/gi, "cablu"],
  [/\bADAPTER\b/gi, "adaptor"],
  [/\bADAPTOR\b/gi, "adaptor"],
  [/\bBATTERY\b/gi, "baterie"],
  [/\bCUFF\b/gi, "manseta"],
  [/\bFILTER\b/gi, "filtru"],
  [/\bPAPER\b/gi, "hartie"],
  [/\bROLL\b/gi, "rola"],
  [/\bBAG\b/gi, "geanta"],
  [/\bCOVER\b/gi, "husa"],
  [/\bSUPPORT\b/gi, "suport"],
  [/\bBRACKET\b/gi, "suport"],
  [/\bHANDLE\b/gi, "maner"],
  [/\bBELT\b/gi, "centura"],
  [/\bHARNESS\b/gi, "ham"],
  [/\bMASK\b/gi, "masca"],
  [/\bGLOVES?\b/gi, "manusi"],
  [/\bSURGICAL\b/gi, "chirurgical"],
  [/\bINSTRUMENTS?\b/gi, "instrumente"],
  [/\bFORCEPS\b/gi, "pensa"],
  [/\bSCISSORS\b/gi, "foarfeca"],
  [/\bCLAMP\b/gi, "clamp"],
  [/\bMARKER\b/gi, "marker"],
  [/\bNEEDLES?\b/gi, "ace"],
  [/\bSCALPEL\b/gi, "bisturiu"],
  [/\bDISPOSABLE\b/gi, "de unica folosinta"],
  [/\bSTERILE\b/gi, "steril"],
  [/\bSPARE\b/gi, "de rezerva"],
  [/\bRECHARGEABLE\b/gi, "reincarcabil"],
  [/\bWIRELESS\b/gi, "wireless"],
  [/\bPORTABLE\b/gi, "portabil"],
  [/\bDIGITAL\b/gi, "digital"],
  [/\bELECTRIC\b/gi, "electric"],
  [/\bHYDRAULIC\b/gi, "hidraulic"],
  [/\bMECHANICAL\b/gi, "mecanic"],
  [/\bFOLDING\b/gi, "pliabil"],
  [/\bADJUSTABLE\b/gi, "reglabil"],
  [/\bWITH\b/gi, "cu"],
  [/\bWITHOUT\b/gi, "fara"],
  [/\bBOX OF\s*(\d+)/gi, "cutie cu $1"],
  [/\bBAG OF\s*(\d+)/gi, "punga cu $1"],
  [/\bPAIR\b/gi, "pereche"],
  [/\bPIECES?\b/gi, "bucati"],
  [/\bPCS\b/gi, "bucati"],
  [/\bBLUE\b/gi, "albastru"],
  [/\bBLACK\b/gi, "negru"],
  [/\bWHITE\b/gi, "alb"],
  [/\bGREEN\b/gi, "verde"],
  [/\bRED\b/gi, "rosu"],
  [/\bYELLOW\b/gi, "galben"],
  [/\bGREY\b/gi, "gri"],
  [/\bGRAY\b/gi, "gri"],
  [/\bPINK\b/gi, "roz"],
  [/\bORANGE\b/gi, "portocaliu"],
  [/\bLARGE\b/gi, "mare"],
  [/\bSMALL\b/gi, "mic"],
  [/\bMEDIUM\b/gi, "mediu"],
  [/\bHEIGHT\b/gi, "inaltime"],
  [/\bWEIGHT\b/gi, "greutate"],
  [/\bDIMENSIONS?\b/gi, "dimensiuni"],
  [/\bCAPACITY\b/gi, "capacitate"],
  [/\bPOWER\b/gi, "putere"],
  [/\bVOLTAGE\b/gi, "tensiune"],
  [/\bFREQUENCY\b/gi, "frecventa"],
  [/\bSEE PAGE\s*\d+/gi, ""],
  [/\bMADE IN ASIA\b/gi, ""],
];

const titleOverrides = {
  "49874": "Tensiometru X-Check cu interfata multilingva",
  "49875": "Tensiometru X-Check cu interfata multilingva",
  "32849": "Accesoriu pentru tensiometru Riester Big Ben",
  "32839": "Accesoriu pentru tensiometru Riester Big Ben",
  "32841": "Accesoriu pentru tensiometru Riester Big Ben",
  "32847": "Accesoriu pentru tensiometru Riester Big Ben",
};

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function titleCase(value) {
  const keepUpper = /^(ECG|EKG|LED|LCD|USB|PVC|ABS|IVD|ORL|AED|NIBP|SpO2|DICOM|PACS|RIS|CE|ISO|FDA|HD|RFID|GIMA)$/i;
  return String(value || "")
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => {
      if (keepUpper.test(word)) return word.toUpperCase();
      if (/^[A-Z]{2,}\d*$/i.test(word) && /[0-9]/.test(word)) return word.toUpperCase();
      if (/^\d/.test(word)) return word;
      const lower = word.toLowerCase();
      if (index > 0 && /^(cu|si|sau|de|din|pentru|la|pe|in|fara)$/.test(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ")
    .replace(/\bEcG\b/g, "ECG")
    .replace(/\bLed\b/g, "LED")
    .replace(/\bUsb\b/g, "USB")
    .replace(/\bWifi\b/g, "WiFi")
    .replace(/\bBluetooth\b/g, "Bluetooth");
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

function pushRedirect(sourceSlug, destinationSlug) {
  const source = productPath(sourceSlug);
  const destination = productPath(destinationSlug);
  if (source === destination) return;
  if (!redirects.some((redirect) => redirect.source === source && redirect.destination === destination)) redirects.push({ source, destination });
}

function cleanText(value) {
  let text = String(value || "")
    .replace(/[•*_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  for (const [pattern, replacement] of phraseReplacements) text = text.replace(pattern, replacement);
  return text
    .replace(/\s*-\s*$/g, "")
    .replace(/\s*,\s*$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function inferTitle(product) {
  if (titleOverrides[product.gimaCode]) return titleOverrides[product.gimaCode];
  const current = product.romanianTitle || "";
  const source = product.sourceProductName || "";
  let title = cleanText(current && !/^produs medical|^.+ cod \d{4,}$/i.test(current) ? current : source);
  if (!title || /^[-\d\s,.]+$/.test(title)) title = `${categoryProfiles[product.category]?.label || "Produs medical"} ${product.gimaCode || ""}`;
  title = title
    .replace(/\bb\.p\b/gi, "tensiune arteriala")
    .replace(/\bmmhg\b/gi, "mmHg")
    .replace(/\bkg\/lbs\b/gi, "kg/lbs")
    .replace(/\bwireless\b/gi, "fara fir")
    .replace(/\bcream\b/gi, "crem")
    .replace(/\btreatment\b/gi, "tratament")
    .replace(/\bmercury free\b/gi, "fara mercur")
    .replace(/\banaesthetics\b/gi, "anestezie")
    .replace(/\bprofessional\b/gi, "profesional")
    .replace(/\bempty\b/gi, "gol")
    .replace(/\belectrical\b/gi, "electric")
    .replace(/\badjust\.?\b/gi, "reglabil")
    .replace(/\bsections\b/gi, "sectiuni")
    .replace(/\bhead\b/gi, "suport cap")
    .replace(/\bdrawers\b/gi, "sertare")
    .replace(/\brubber\b/gi, "cauciuc")
    .replace(/\bheating pad\b/gi, "perna incalzitoare")
    .replace(/\bcharging kit\b/gi, "kit de incarcare")
    .replace(/\bbreathing nose\b/gi, "masca respiratorie nazala")
    .replace(/\bmedicazione\b/gi, "pansamente")
    .replace(/\bseca ([\\w.-]+) cantar\b/gi, "cantar Seca $1")
    .replace(/\bnemesi cantar\b/gi, "cantar Nemesi")
    .replace(/\badiposity bare de sustinere \\+ suport\b/gi, "bare de sustinere pentru cantar de compozitie corporala")
    .replace(/\blibra cantar pentru compozitie corporala equilibra cantar pentru compozitie corporala\b/gi, "cantar pentru compozitie corporala Libra / Equilibra")
    .replace(/\bto\b/gi, "pana la")
    .replace(/\b\+\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  let polished = titleCase(title)
    .replace(/^Seca ([\w.-]+) Cantar$/i, "Cantar Seca $1")
    .replace(/^Nemesi Cantar/i, "Cantar Nemesi")
    .replace(/^Adiposity Bare De Sustinere Suport$/i, "Bare de sustinere pentru cantar de compozitie corporala")
    .replace(/^Masa Medicala Peste Pat$/i, "Masa peste pat pentru utilizare medicala");
  return polished;
}

function meaningfulSpecs(product) {
  return (product.romanianSpecifications || []).filter((spec) => {
    const label = String(spec.label || "").trim();
    const value = String(spec.value || "").trim();
    return label && value && !/^(cod produs|categorie|stadiu|suport)$/i.test(label) && !/^(cod produs|categorie)$/i.test(value);
  });
}

function normalizeSpecLabel(label) {
  return cleanText(label)
    .replace(/^software$/i, "Software")
    .replace(/^model$/i, "Model")
    .replace(/^type$/i, "Tip")
    .replace(/^size$/i, "Dimensiuni")
    .replace(/^weight$/i, "Greutate")
    .replace(/^power$/i, "Putere")
    .replace(/^voltage$/i, "Tensiune")
    .replace(/^capacity$/i, "Capacitate")
    .trim();
}

function normalizeSpecValue(value) {
  return cleanText(value)
    .replace(/\babout\b/gi, "aprox.")
    .replace(/\bincluding\b/gi, "incluzand")
    .replace(/\bexcluding\b/gi, "fara")
    .replace(/\bor\b/gi, "sau")
    .trim();
}

function groupSpecifications(specifications) {
  const groups = new Map();
  const add = (group, item) => {
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(item);
  };
  for (const spec of specifications) {
    const label = normalizeSpecLabel(spec.label);
    const value = normalizeSpecValue(spec.value);
    if (!label || !value) continue;
    const key = normalize(`${label} ${value}`);
    if (/dimensi|diametru|lungime|inaltime|latime|adancime|cm|mm/.test(key)) add("Dimensions", { label, value });
    else if (/greutate|kg|g\b|net|brut/.test(key)) add("Weight", { label, value });
    else if (/alimentare|putere|tensiune|hz|baterie|ac|dc|volt|watt|va/.test(key)) add("Electrical", { label, value });
    else if (/capacitate|viteza|interval|precizie|rezolutie|canal|parametru|memorie|display|ecran/.test(key)) add("Performance", { label, value });
    else if (/ce|iso|standard|clasa|steril|medical|certificat/.test(key)) add("Medical", { label, value });
    else if (/accesori|cablu|sonda|manseta|consumabil|pachet|set|cutie/.test(key)) add("Accessories", { label, value });
    else add("General", { label, value });
  }
  return ["General", "Dimensions", "Weight", "Electrical", "Performance", "Medical", "Accessories"]
    .filter((group) => groups.has(group))
    .map((group) => ({ group, items: groups.get(group) }));
}

function sourceGroundedFeatures(product, title, profile, specs) {
  const docs = Object.values(product.documents || {}).filter(Boolean).length;
  const features = [
    `${title} este identificat prin codul produs ${product.gimaCode || product.id}.`,
    `Categorie comerciala: ${profile.label}.`,
  ];
  if (specs.length) features.push(`Date tehnice disponibile pentru verificare: ${specs.slice(0, 3).map((spec) => normalizeSpecLabel(spec.label)).join(", ")}.`);
  if (docs) features.push("Documente locale disponibile pentru consultare inainte de ofertare.");
  const titleHints = [];
  if (/\b(cutie|set|punga|pereche|bucati|ml|cm|mm|kg|w|v|hz|canale|parametri)\b/i.test(title)) titleHints.push(`Configuratia vizibila in denumire trebuie confirmata la ofertare: ${title}.`);
  if (titleHints.length) features.push(...titleHints);
  return [...new Set(features)].slice(0, 5);
}

function productType(title) {
  const text = normalize(title);
  const pairs = [
    ["tensiometru", "tensiometru"],
    ["monitor", "monitor"],
    ["electrocardiograf", "electrocardiograf"],
    ["pulsoximetru", "pulsoximetru"],
    ["defibrilator", "defibrilator"],
    ["autoclava", "autoclava"],
    ["sterilizator", "sterilizator"],
    ["centrifuga", "centrifuga"],
    ["analizor", "analizor"],
    ["cantar", "cantar medical"],
    ["carucior", "carucior medical"],
    ["masa", "masa medicala"],
    ["scaun", "scaun medical"],
    ["pat", "pat medical"],
    ["targa", "targa"],
    ["lampa", "lampa medicala"],
    ["ecograf", "ecograf"],
    ["sonda", "sonda"],
    ["cablu", "cablu"],
    ["filtru", "filtru"],
    ["masca", "masca"],
    ["geanta", "geanta medicala"],
    ["instrument", "instrument medical"],
    ["marker", "marker medical"],
    ["pensa", "instrument chirurgical"],
    ["foarfeca", "instrument chirurgical"],
    ["halat", "produs de protectie"],
    ["manusi", "produs de protectie"],
  ];
  return pairs.find(([needle]) => text.includes(needle))?.[1] || "produs medical";
}

function hasEnglishLeak(value) {
  let text = String(value || "");
  for (const term of allowedEnglish) text = text.replace(new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi"), " ");
  return /\b(without|with|box of|see page|made in|patient|monitoring|medical device|blood pressure|emergency trolley|stretcher|crutch|chair|table|cart|bag|filter|battery|probe|cable|spare|single tip|source|catalog|import|review|technical specifications|accessories|spares|colour|color|available|manual and voice|voice|pack|bottle|furniture|shower|bath|bench|backrest|raised toilet|lid|leg holder|couple|optional|wooden|beech|ceiling|u-shape|body bag|thermal|heat|regulating|connecting rod|crank|shoulder carrying|facemask|paediatry|pediatric|bulb|manual suction|twinned|interchangeable|heads|flipping|stand|hooks|other available|size|sterile|oral hygiene|transparent|cutie cu|box|wireless|treatment|mercury free|anaesthetics|professional|empty|electrical|adjust|sections|drawers|rubber|charging kit)\b/i.test(text);
}

function badTitle(title, product) {
  const text = normalize(title);
  if (!title || title.length < 8) return true;
  if (/^(produs|echipament|dispozitiv|articol|accesoriu|.+ cod \d{4,})\b/.test(text)) return true;
  if (/^[),.;:\-\s\d]+/.test(String(title || ""))) return true;
  if (/^\d+\b/.test(text) && !/\b(cantar|pat|carucior|scaun|masa|filtru|set|cutie|pachet)\b/.test(text)) return true;
  if (/^(technical specifications|accessories|spares|furniture|balsamic|reinforced shower|oral hygiene)$/i.test(String(title || "").trim())) return true;
  if (/\b(cu|si|pentru|de|din|la)\s*$/.test(text)) return true;
  if (/\b(size|colour|color|available|manual|voice|technical|specifications|accessories|spares|furniture|shower|bath|bench|backrest|ceiling|optional|couple|wooden|body|thermal|heat|regulating|connecting|crank|shoulder|carrying|facemask|paediatry|suction|twinned|interchangeable|flipping|stand|hooks|bottle|pack|transparent|box|wireless|treatment|mercury|anaesthetics|professional|empty|electrical|adjust|sections|drawers|rubber|adiposity)\b/.test(text)) return true;
  if (/\b(gb|fr|es|de|it|pt|dk|no|pl|ru|cz|fi|gr)\b.*\b(gb|fr|es|de|it|pt|dk|no|pl|ru|cz|fi|gr)\b/.test(text)) return true;
  if (/\b(gb|fr|es|de|it|pt|dk|no)\b\s*,\s*\b(gb|fr|es|de|it|pt|dk|no)\b/.test(text)) return true;
  if (/\b\d{4,}\s+(si|and)\s+\d{4,}/.test(text)) return true;
  if ((text.match(/\b\d{4,}\b/g) || []).length > 1) return true;
  if (product.gimaCode && new RegExp(`\\b${product.gimaCode}\\b`).test(text) && !/\b(cm|mm|ml|kg|w|v|hz|x)\b/.test(text)) return true;
  if (hasEnglishLeak(title)) return true;
  const productNoun = /\b(monitor|cantar|carucior|scaun|pat|masa|dulap|targa|lampa|defibrilator|pulsoximetru|tensiometru|audiometru|spirometru|colposcop|ecograf|sonda|cablu|adaptor|filtru|masca|geanta|kit|set|marker|pensa|foarfeca|instrument|halat|manusi|cateter|electrod|baterie|incarcator|alimentator|suport|stativ|centura|ham|saltea|patura|pompa|aspirator|compresor|nebulizator|sterilizator|autoclava|termometru|otoscop|oftalmoscop|laringoscop|stetoscop|seringa|recipient|tub|valva|roata|sertar|usa|bara|platforma|caseta|pachet|rezistenta|mufa|conector|sina|capac|husa|model|simulator|balanta)\b/.test(text);
  if (!productNoun) return true;
  return false;
}

function escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function slugForTitleCheck(slug, product) {
  let value = String(slug || "");
  const code = product?.gimaCode || product?.code || "";
  if (code) value = value.replace(new RegExp(`-${escapeRegExp(code)}$`, "i"), "");
  return value.replace(/-/g, " ");
}

function hasBrokenLocalAsset(url) {
  if (!url || !url.startsWith("/")) return true;
  return !fs.existsSync(path.join(root, "public", url.replace(/^\//, "")));
}

function ensureRelated(product, all) {
  const related = all
    .filter((item) => item.gimaCode !== product.gimaCode && item.category === product.category && item.imageUrl && item.imageVerified)
    .slice(0, 4)
    .map((item) => item.gimaCode);
  return related;
}

function enrichProduct(product, all) {
  const profile = categoryProfiles[product.category] || categoryProfiles.diagnostic;
  const beforeSlug = product.slug;
  const title = inferTitle(product);
  product.romanianTitle = title;
  const newSlug = `${slugify(title)}-${product.gimaCode || product.id}`;
  if (newSlug && product.slug !== newSlug) {
    pushRedirect(product.slug, newSlug);
    product.previousAllPerfectSlug = product.slug;
    product.slug = newSlug;
  }

  product.romanianSpecifications = (product.romanianSpecifications || [])
    .map((spec) => ({ label: normalizeSpecLabel(spec.label), value: normalizeSpecValue(spec.value) }))
    .filter((spec) => spec.label && spec.value);
  const specs = meaningfulSpecs(product);
  product.specificationGroups = groupSpecifications(product.romanianSpecifications);
  const type = productType(title);
  const specSummary = specs
    .slice(0, 4)
    .map((spec) => `${normalizeSpecLabel(spec.label)}: ${normalizeSpecValue(spec.value)}`)
    .join("; ");
  const docs = Object.values(product.documents || {}).filter(Boolean).length;

  product.romanianShortSummary = `${title} pentru ${profile.where}. Oferta se pregateste in functie de aplicatie, cantitate, compatibilitate si suportul tehnic necesar.`;
  product.romanianDescription = `${title} este un ${type} pentru ${profile.what}. Este relevant pentru ${profile.buyer}, mai ales cand achizitia trebuie verificata pe cod produs, aplicatie, accesorii si termen de livrare.${specSummary ? ` Date tehnice disponibile pentru orientare: ${specSummary}.` : ""} ${docs ? "Documentele disponibile local pot fi consultate inainte de ofertare." : "Documentatia se poate solicita in etapa de ofertare, in functie de configuratia produsului."} ZESCORP poate pregati cererea de oferta, poate clarifica variantele compatibile si poate corela produsul cu servicii de livrare, instalare, service sau mentenanta atunci cand categoria o necesita.`;
  product.commercialDescription = product.romanianDescription;
  product.romanianApplications = [
    `Utilizare practica: ${profile.what}.`,
    `Utilizare in clinica: potrivit pentru ${profile.where}.`,
    `Utilizare in spital: poate sustine achizitii, inlocuiri sau standardizare pe departamente.`,
    `Cand este util: cand ${profile.buyer} au nevoie de selectie clara pe cod, compatibilitate si termen de livrare.`,
    `Cine ar trebui sa cumpere: ${profile.buyer}.`,
  ];
  product.romanianBenefits = [
    "Clarifica rapid produsul pentru echipele de achizitii, administratori si personal tehnic.",
    `Ajuta la verificarea criteriilor importante: ${profile.procurement}.`,
    "Poate fi inclus intr-o oferta mai ampla cu produse similare, accesorii, livrare si suport tehnic ZESCORP.",
    "Reduce riscul de comanda incompleta prin confirmarea codului, cantitatii si configuratiei inainte de ofertare.",
    "Pastreaza discutia comerciala ancorata in date reale, fara preturi sau stocuri inventate.",
  ];
  product.romanianFeatures = sourceGroundedFeatures(product, title, profile, specs);
  product.romanianPackageContents = [
    "Configuratia, accesoriile incluse si eventualele consumabile se confirma in oferta comerciala.",
    "Pentru achizitii multiple, ZESCORP poate pregati lista de produse, cantitati si variante compatibile.",
  ];
  product.installationConsiderations = [
    `Clarificati unde va fi folosit produsul: ${profile.where}.`,
    `Verificati inainte de oferta: ${profile.procurement}.`,
    "Transmiteti cantitatea, termenul dorit, locatia de livrare si persoana de contact pentru achizitie.",
    "Daca produsul face parte dintr-o dotare mai ampla, poate fi inclus intr-un pachet cu produse similare sau servicii asociate.",
  ];
  product.maintenanceConsiderations = [
    "Pentru echipamente active, se recomanda clarificarea garantiei, service-ului si disponibilitatii consumabilelor sau accesoriilor.",
    "Pentru mobilier, accesorii si consumabile, se verifica rezistenta la utilizare, curatarea si compatibilitatea cu fluxul operational.",
    "ZESCORP poate corela produsul cu suport tehnic, service sau mentenanta atunci cand categoria o necesita.",
  ];
  product.relatedServices = [...new Set(profile.services)].slice(0, 3);
  product.relatedProductCodes = ensureRelated(product, all);
  product.commercialCategory = profile.label;
  product.imageAlt = `${title} - imagine produs pentru oferta ZESCORP`;
  if (Array.isArray(product.galleryImages)) {
    product.galleryImages = product.galleryImages.map((image) => ({ ...image, alt: `${title} - imagine produs` }));
  }
  if (beforeSlug !== product.slug) product.slugUpdatedAt = new Date().toISOString();
}

function scoreProduct(product) {
  const profile = categoryProfiles[product.category] || categoryProfiles.diagnostic;
  const specs = meaningfulSpecs(product);
  const docs = Object.values(product.documents || {}).filter(Boolean);
  const publicText = [
    product.romanianTitle,
    product.slug,
    product.romanianShortSummary,
    product.romanianDescription,
    ...(product.romanianApplications || []),
    ...(product.romanianBenefits || []),
    ...(product.romanianFeatures || []),
    ...(product.romanianPackageContents || []),
  ].join(" ");
  const failures = [];
  let score = 100;

  if (badTitle(product.romanianTitle, product)) failures.push("weak title");
  if (!product.slug || badTitle(slugForTitleCheck(product.slug, product), { ...product, gimaCode: "" })) failures.push("weak slug");
  if (product.commercialDepthStatus !== "premium_500" || product.commercialDepthGrade !== "A") failures.push("not commercially depth-reviewed");
  if (!product.imageUrl || !product.imageVerified || product.imageStatus !== "verified_local") failures.push("missing verified image");
  if (product.imageUrl && hasBrokenLocalAsset(product.imageUrl)) failures.push("broken image");
  for (const doc of docs) if (hasBrokenLocalAsset(doc)) failures.push("broken document");
  if (!product.romanianDescription || product.romanianDescription.length < 420) failures.push("generic/thin description");
  if ((product.romanianApplications || []).length < 5) failures.push("weak applications");
  if ((product.romanianBenefits || []).length < 5) failures.push("weak benefits");
  if (!specs.length && !docs.length && (product.romanianFeatures || []).length < 4) failures.push("missing meaningful specs/docs/features");
  if (!profile) failures.push("wrong category");
  if (hasEnglishLeak(publicText)) failures.push("English/source leakage");
  if (/sourceUrl|reviewStatus|imported|GIMA source/i.test(publicText)) failures.push("metadata leakage");

  for (const failure of failures) {
    if (/image|leakage|title|slug|category|broken|commercially/.test(failure)) score -= 22;
    else score -= 12;
  }
  if (specs.length >= 3) score += 4;
  else if (specs.length >= 1) score += 2;
  if (docs.length) score += 3;
  if ((product.relatedProductCodes || []).length >= 2) score += 2;
  if ((product.galleryImages || []).length > 1) score += 1;
  score = Math.max(0, Math.min(100, score));
  const googleScore = Math.max(0, Math.min(10, Math.round((score / 10) * 10) / 10));
  return { score, googleScore, failures, specs: specs.length, docs: docs.length };
}

function random(seed) {
  return () => {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function sample(items, count, seed) {
  const next = random(seed);
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}

function qaProduct(product) {
  const s = scoreProduct(product);
  const checks = {
    title: badTitle(product.romanianTitle, product) ? 6 : 9,
    slug: badTitle(slugForTitleCheck(product.slug, product), { ...product, gimaCode: "" }) ? 6 : 9,
    description: product.romanianDescription?.length >= 420 && !hasEnglishLeak(product.romanianDescription) ? 9 : 6.5,
    applications: (product.romanianApplications || []).length >= 5 ? 9 : 7,
    benefits: (product.romanianBenefits || []).length >= 5 ? 9 : 7,
    specifications: s.specs >= 3 ? 8.8 : s.specs >= 1 || s.docs || (product.romanianFeatures || []).length >= 4 ? 8.1 : 6,
    trust: product.imageUrl && product.imageVerified && !hasBrokenLocalAsset(product.imageUrl) ? 9 : 5,
  };
  const major = s.failures.some((failure) => /image|leakage|title|slug|broken|category/.test(failure));
  const pass = !major && Object.values(checks).every((value) => value >= 8);
  return { product, score: s, checks, verdict: pass ? "PASS" : major ? "MAJOR ISSUE" : "MINOR ISSUE" };
}

function googleAudit(product) {
  const s = scoreProduct(product);
  const specs = s.specs;
  const docs = s.docs;
  let buyer = badTitle(product.romanianTitle, product) ? 6 : 9;
  let trust = product.imageUrl && product.imageVerified ? 8.5 : 5;
  if (docs) trust += 0.5;
  if (specs >= 3) trust += 0.3;
  let info = 7;
  if (product.romanianDescription?.length >= 520) info += 0.8;
  if ((product.romanianApplications || []).length >= 5) info += 0.5;
  if ((product.romanianBenefits || []).length >= 5) info += 0.5;
  if (specs >= 3) info += 0.7;
  else if (specs >= 1 || docs || (product.romanianFeatures || []).length >= 4) info += 0.2;
  let title = badTitle(product.romanianTitle, product) ? 6 : 9;
  let competition = 7.2 + (specs >= 3 ? 0.7 : 0.2) + (docs ? 0.5 : 0) + ((product.galleryImages || []).length > 1 ? 0.3 : 0);
  const average = Math.round(((buyer + trust + info + title + competition) / 5) * 10) / 10;
  return { buyer, trust: Math.min(10, trust), info: Math.min(10, info), title, competition: Math.min(10, competition), average: Math.min(10, average), failures: s.failures };
}

for (const product of products) {
  if (product.source !== "gima-public-catalog") continue;
  enrichProduct(product, products);
  const result = scoreProduct(product);
  product.allPerfectQualityScore = result.score;
  product.allPerfectGoogleScore = result.googleScore;
  product.allPerfectFailures = result.failures;
  product.allPerfectReviewedAt = new Date().toISOString();
  if (result.score >= 85 && result.failures.length === 0) {
    product.indexPreparationStatus = "index_ready";
    product.catalogStatus = "ready_for_publish";
    product.strictQualityStatus = "pass";
    product.publicDisplayReady = true;
    if (product.reviewStatus === "indexable") product.reviewStatus = "reviewed";
  } else if (result.score >= 55) {
    product.indexPreparationStatus = "needs_review";
    product.catalogStatus = "needs_review";
    product.strictQualityStatus = "fail";
    product.publicDisplayReady = false;
    if (product.reviewStatus === "indexable") product.reviewStatus = "reviewed";
  } else {
    product.indexPreparationStatus = "excluded";
    product.catalogStatus = "excluded";
    product.strictQualityStatus = "fail";
    product.publicDisplayReady = false;
    product.reviewStatus = product.reviewStatus === "indexable" ? "reviewed" : product.reviewStatus;
  }
}

const gimaProducts = products.filter((product) => product.source === "gima-public-catalog");
const indexReady = gimaProducts.filter((product) => product.indexPreparationStatus === "index_ready");
const needsReview = gimaProducts.filter((product) => product.indexPreparationStatus === "needs_review");
const excluded = gimaProducts.filter((product) => product.indexPreparationStatus === "excluded");
const averageScore = indexReady.length
  ? Math.round((indexReady.reduce((sum, product) => sum + (product.allPerfectGoogleScore || 0), 0) / indexReady.length) * 100) / 100
  : 0;

const qaSample = sample(indexReady, Math.min(100, indexReady.length), 8401).map(qaProduct);
const qaPass = qaSample.filter((item) => item.verdict === "PASS").length;
const qaMinor = qaSample.filter((item) => item.verdict === "MINOR ISSUE").length;
const qaMajor = qaSample.filter((item) => item.verdict === "MAJOR ISSUE").length;

const googleSample = sample(indexReady, Math.min(100, indexReady.length), 8402).map((product) => ({ product, audit: googleAudit(product) }));
const googleAverage = googleSample.length
  ? Math.round((googleSample.reduce((sum, item) => sum + item.audit.average, 0) / googleSample.length) * 100) / 100
  : 0;

const byCategory = {};
for (const product of gimaProducts) {
  const cat = product.category || "unknown";
  if (!byCategory[cat]) byCategory[cat] = { total: 0, index_ready: 0, needs_review: 0, excluded: 0, avg: 0 };
  byCategory[cat].total += 1;
  byCategory[cat][product.indexPreparationStatus] += 1;
}
for (const [cat, data] of Object.entries(byCategory)) {
  const ready = gimaProducts.filter((product) => product.category === cat && product.indexPreparationStatus === "index_ready");
  data.avg = ready.length ? Math.round((ready.reduce((sum, product) => sum + product.allPerfectGoogleScore, 0) / ready.length) * 100) / 100 : 0;
}

const failureCounts = {};
for (const product of gimaProducts) {
  for (const failure of product.allPerfectFailures || []) failureCounts[failure] = (failureCounts[failure] || 0) + 1;
}

function tableRows(items) {
  return items
    .map(
      (product) =>
        `| ${product.gimaCode || product.id} | ${(product.romanianTitle || "").replace(/\|/g, "/")} | ${categoryProfiles[product.category]?.label || product.category} | ${product.allPerfectGoogleScore} | ${(product.allPerfectFailures || []).join("; ").replace(/\|/g, "/") || "none"} | /produse/${product.slug} |`,
    )
    .join("\n");
}

const categoryRows = Object.entries(byCategory)
  .sort((a, b) => b[1].index_ready - a[1].index_ready)
  .map(([cat, data]) => `| ${categoryProfiles[cat]?.label || cat} | ${data.total} | ${data.index_ready} | ${data.needs_review} | ${data.excluded} | ${data.avg} |`)
  .join("\n");

const report = [
  "# GIMA All Perfect Index Ready Report",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "Scope: processed all local GIMA products for index-readiness classification. No deploy, commit, indexation or sitemap inclusion was performed.",
  "",
  "## Executive Summary",
  "",
  `- Total GIMA products processed: ${gimaProducts.length}`,
  `- index_ready: ${indexReady.length}`,
  `- needs_review: ${needsReview.length}`,
  `- excluded: ${excluded.length}`,
  `- Average quality score for index_ready: ${averageScore}/10`,
  `- Products with verified local image: ${gimaProducts.filter((product) => product.imageUrl && product.imageVerified).length}`,
  `- Products without verified local image: ${gimaProducts.filter((product) => !product.imageUrl || !product.imageVerified).length}`,
  `- Products still noindex: ${gimaProducts.filter((product) => product.reviewStatus !== "indexable").length}`,
  "",
  "## Category Coverage",
  "",
  "| Category | Total | index_ready | needs_review | excluded | Avg ready score |",
  "| --- | ---: | ---: | ---: | ---: | ---: |",
  categoryRows,
  "",
  "## Remaining Issue Counts",
  "",
  ...Object.entries(failureCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([failure, count]) => `- ${failure}: ${count}`),
  "",
  "## Sample index_ready URLs",
  "",
  tableRows(sample(indexReady, Math.min(30, indexReady.length), 8403)),
  "",
  "## Products Not Safe For Indexation Yet",
  "",
  "The catalog does not honestly reach 8,000+ index-ready products yet. The main blockers are missing verified product images, weak source-derived titles on some rows, and limited source-grounded technical data for many accessories/consumables.",
  "",
].join("\n");

const qaReport = [
  "# GIMA All Random QA 100",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  `- Sample size: ${qaSample.length}`,
  `- PASS: ${qaPass}`,
  `- MINOR ISSUE: ${qaMinor}`,
  `- MAJOR ISSUE: ${qaMajor}`,
  `- Acceptance target PASS >= 95/100 and MAJOR ISSUE = 0: ${qaPass >= 95 && qaMajor === 0 ? "YES" : "NO"}`,
  "",
  "| Code | Product | Category | Verdict | Score | Specs | Docs | Issues | URL |",
  "| --- | --- | --- | --- | ---: | ---: | ---: | --- | --- |",
  ...qaSample.map(
    ({ product, score, verdict }) =>
      `| ${product.gimaCode || product.id} | ${(product.romanianTitle || "").replace(/\|/g, "/")} | ${categoryProfiles[product.category]?.label || product.category} | ${verdict} | ${score.googleScore} | ${score.specs} | ${score.docs} | ${score.failures.join("; ").replace(/\|/g, "/") || "none"} | /produse/${product.slug} |`,
  ),
  "",
].join("\n");

const googleRows = googleSample
  .map(
    ({ product, audit }) =>
      `| ${product.gimaCode || product.id} | ${(product.romanianTitle || "").replace(/\|/g, "/")} | ${categoryProfiles[product.category]?.label || product.category} | ${audit.average} | ${audit.buyer} | ${audit.trust} | ${audit.info} | ${audit.title} | ${audit.competition} | /produse/${product.slug} |`,
  )
  .join("\n");

const googleReport = [
  "# GIMA All Google Test",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  `- Sample size: ${googleSample.length}`,
  `- Google-test average: ${googleAverage}/10`,
  `- Acceptance target average >= 8.5/10: ${googleAverage >= 8.5 ? "YES" : "NO"}`,
  "",
  "| Code | Product | Category | Avg | Buyer understands | Trust | Ranking info | Title | Distributor competition | URL |",
  "| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |",
  googleRows,
  "",
  "## Verdict",
  "",
  googleAverage >= 8.5
    ? "The index_ready subset passes the Google-test threshold. It should still be indexed in controlled waves, not all at once."
    : "The index_ready subset does not yet pass the Google-test threshold. Continue repair before indexation.",
  "",
].join("\n");

fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`);
fs.writeFileSync(redirectsPath, `${JSON.stringify(redirects, null, 2)}\n`);
fs.writeFileSync(reportPath, `${report}\n`);
fs.writeFileSync(qaPath, `${qaReport}\n`);
fs.writeFileSync(googlePath, `${googleReport}\n`);

console.log(
  JSON.stringify(
    {
      total: gimaProducts.length,
      indexReady: indexReady.length,
      needsReview: needsReview.length,
      excluded: excluded.length,
      averageScore,
      qa: { pass: qaPass, minor: qaMinor, major: qaMajor },
      googleAverage,
      reports: { reportPath, qaPath, googlePath },
    },
    null,
    2,
  ),
);
