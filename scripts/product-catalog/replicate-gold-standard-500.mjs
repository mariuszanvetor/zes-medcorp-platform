import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const redirectsPath = path.join(root, "data", "product-catalog", "product-redirects.json");
const reportPath = path.join(root, "docs", "product-gold-replication-report.md");
const targetCount = 500;
const goldReferenceCodes = new Set([
  "23580",
  "23994",
  "24035",
  "24046",
  "24128",
  "25748",
  "27487",
  "27552",
  "32773",
  "33245",
  "33246",
  "34068",
  "34069",
  "35640",
  "35660",
  "35712",
  "35900",
  "43202",
  "43430",
  "45720",
]);

const categoryRules = {
  laboratory: {
    label: "Laborator / IVD",
    noun: "produs de laborator",
    applications: ["laboratoare clinice", "cabinete cu flux de recoltare si analiza", "unitati medicale cu necesar IVD"],
    benefits: ["poate fi inclus in pachete de dotare laborator", "suport pentru selectie in functie de fluxul de lucru", "compatibil cu cereri de oferta pentru cantitate sau configuratie"],
    services: ["/solutii-medicale/echipamente-laborator-ivd", "/service-laborator-ivd", "/contracte-mentenanta/mentenanta-laborator-ivd"],
  },
  emergency: {
    label: "Urgenta",
    noun: "echipament de urgenta",
    applications: ["zone de urgenta", "puncte de interventie si prim ajutor", "clinici cu fluxuri de raspuns rapid"],
    benefits: ["ajuta la organizarea interventiilor", "poate fi ofertat cu accesorii si consumabile", "potrivit pentru dotari operationale in clinici"],
    services: ["/service-aparatura-medicala", "/contracte-mentenanta/interventii-suport-tehnic", "/solutii-medicale/instalare-punere-in-functiune"],
  },
  "medical-furniture": {
    label: "Mobilier medical",
    noun: "mobilier medical",
    applications: ["amenajari de clinici si cabinete", "saloane, camere de tratament si zone de suport", "spatii medicale cu nevoie de mobilier functional"],
    benefits: ["ajuta la organizarea spatiului medical", "poate fi inclus in proiecte de amenajare", "ofertare adaptata in functie de cantitate si configuratie"],
    services: ["/solutii-medicale/dezvoltare-unitati-medicale", "/services/amenajari-medicale", "/contracte-mentenanta"],
  },
  monitoring: {
    label: "Monitorizare",
    noun: "echipament de monitorizare",
    applications: ["monitorizare clinica", "cabinete si puncte de triaj", "unitati medicale cu nevoie de urmarire a parametrilor"],
    benefits: ["sprijina fluxurile de evaluare pacient", "se poate oferta impreuna cu accesorii si consumabile compatibile", "suport pentru service si mentenanta unde este relevant"],
    services: ["/service-aparatura-medicala", "/contracte-mentenanta/contracte-service-multimarca", "/solutii-medicale/echipamente-imagistica-diagnostic"],
  },
  sterilization: {
    label: "Sterilizare",
    noun: "echipament de sterilizare",
    applications: ["cabinete cu flux de instrumentar reutilizabil", "zone de sterilizare si pregatire instrumentar", "clinici cu cerinte operationale de igiena"],
    benefits: ["sprijina controlul fluxului de sterilizare", "poate fi inclus in planuri de mentenanta preventiva", "ofertare corelata cu documentatia si consumabilele necesare"],
    services: ["/service-aparatura-medicala", "/contracte-mentenanta/interventii-suport-tehnic", "/solutii-medicale/dezvoltare-unitati-medicale"],
  },
  diagnostic: {
    label: "Diagnostic medical",
    noun: "echipament de diagnostic",
    applications: ["cabinete medicale", "clinici multidisciplinare", "puncte de evaluare si diagnostic"],
    benefits: ["ajuta la completarea dotarii clinice", "poate fi ofertat cu accesorii si suport tehnic", "selectie adaptata aplicatiei medicale"],
    services: ["/service-aparatura-medicala", "/contracte-mentenanta", "/solutii-medicale/echipamente-imagistica-diagnostic"],
  },
  "patient-care": {
    label: "Ingrijire pacient",
    noun: "produs pentru ingrijire pacient",
    applications: ["saloane si zone de ingrijire", "centre de recuperare", "unitati medicale cu pacienti mobilizati sau asistati"],
    benefits: ["contribuie la confortul si siguranta pacientului", "poate fi inclus in pachete de mobilier si suport pacient", "ofertare adaptata scenariului de utilizare"],
    services: ["/service-aparatura-medicala", "/contracte-mentenanta", "/solutii-medicale/dezvoltare-unitati-medicale"],
  },
  electromedical: {
    label: "Electromedicale",
    noun: "echipament electromedical",
    applications: ["cabinete medicale", "clinici cu fluxuri de terapie sau diagnostic", "unitati medicale cu echipamente active"],
    benefits: ["poate necesita clarificari de instalare si service", "ofertare corelata cu aplicatia clinica", "suport pentru mentenanta si verificari tehnice"],
    services: ["/service-aparatura-medicala", "/contracte-mentenanta/contracte-service-multimarca", "/solutii-medicale/instalare-punere-in-functiune"],
  },
  "surgical-instruments": {
    label: "Instrumentar chirurgical",
    noun: "instrumentar chirurgical",
    applications: ["cabinete si clinici", "proceduri medicale", "fluxuri care necesita instrumentar compatibil cu sterilizarea"],
    benefits: ["selectie pe dimensiune, forma si aplicatie", "poate fi ofertat pe cantitate", "corelare cu consumabile si fluxuri de sterilizare"],
    services: ["/service-aparatura-medicala", "/contracte-mentenanta", "/solutii-medicale/dezvoltare-unitati-medicale"],
  },
  "operator-protection": {
    label: "Protectie operator",
    noun: "produs pentru protectia operatorului",
    applications: ["protectia personalului medical", "cabinete si clinici", "fluxuri cu necesar recurent de protectie"],
    benefits: ["potrivit pentru achizitii recurente", "ofertare pe cantitate si tip de utilizare", "integrare in necesarul operational al clinicii"],
    services: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  consumables: {
    label: "Consumabile medicale",
    noun: "consumabil medical",
    applications: ["cabinete medicale", "clinici si laboratoare", "necesar operational recurent"],
    benefits: ["potrivit pentru achizitii pe cantitate", "poate fi inclus in pachete de dotare", "ofertare adaptata consumului estimat"],
    services: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  ent: {
    label: "ORL",
    noun: "produs ORL",
    applications: ["cabinete ORL", "clinici cu consultatii specializate", "dotari pentru examinare si tratament ORL"],
    benefits: ["selectie adaptata cabinetului specializat", "poate fi ofertat cu accesorii compatibile", "suport pentru instalare si service unde este relevant"],
    services: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  gynecology: {
    label: "Ginecologie",
    noun: "produs pentru ginecologie",
    applications: ["cabinete ginecologice", "clinici de obstetrica si ginecologie", "fluxuri de consultatie specializata"],
    benefits: ["ofertare adaptata aplicatiei clinice", "poate fi inclus in pachete de dotare cabinet", "suport pentru documentatie si service unde este relevant"],
    services: ["/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "medical-lights": {
    label: "Lampi medicale",
    noun: "lampa medicala",
    applications: ["cabinete medicale", "zone de examinare", "spatii de interventie cu iluminare dedicata"],
    benefits: ["sprijina vizibilitatea in fluxurile clinice", "poate necesita clarificarea montajului", "ofertare adaptata spatiului si aplicatiei"],
    services: ["/solutii-medicale/instalare-punere-in-functiune", "/service-aparatura-medicala", "/contracte-mentenanta"],
  },
  "scales-measures": {
    label: "Cantare si masurare",
    noun: "echipament de cantarire si masurare",
    applications: ["cabinete medicale", "triaj si evaluare pacient", "centre de recuperare si pediatrie"],
    benefits: ["sprijina masurarea rapida in cabinet", "poate fi inclus in pachete de dotare", "selectie adaptata tipului de pacient si utilizare"],
    services: ["/service-aparatura-medicala", "/contracte-mentenanta"],
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
  "FFP2",
  "FFP3",
  "IIR",
  "HD",
  "TFT",
  "AED",
  "SpO2",
  "NIBP",
  "EtCO2",
  "Lux",
  "LUX",
  "Storz",
  "Wolf",
  "Olympus",
  "Pentax",
  "Heine",
  "Riester",
  "Littmann",
  "Aesculap",
  "BD",
  "3M",
];

const replacements = [
  [/\bMULTI[- ]PARAMETER MONITOR\b/gi, "monitor multiparametric"],
  [/\bPATIENT MONITOR\b/gi, "monitor pacient"],
  [/\bFOETAL MONITOR\b/gi, "monitor fetal"],
  [/\bFETAL MONITOR\b/gi, "monitor fetal"],
  [/\bWRIST BLOOD PRESSURE MONITOR\b/gi, "tensiometru de incheietura"],
  [/\bCONNECTED ARM B\.?P\.?M\.?\b/gi, "tensiometru de brat conectat"],
  [/\bARM B\.?P\.?M\.?\b/gi, "tensiometru de brat"],
  [/\bB\s*\.?\s*P\s*\.?\s*MONITOR\b/gi, "tensiometru"],
  [/\bWRIST\b/gi, "incheietura"],
  [/\bBLOOD PRESSURE MONITOR\b/gi, "tensiometru"],
  [/\bB\.?P\.?M\.?\b/gi, "tensiometru"],
  [/\bPULSE OXIMETER\b/gi, "pulsoximetru"],
  [/\bCOILED TUBING\b/gi, "tub spiralat"],
  [/\bTUBING\b/gi, "tub"],
  [/\bINSULATION DEVICE\b/gi, "adaptor de izolare"],
  [/\bAIR CONDUCTION PHONE\b/gi, "casti pentru conductie aeriana"],
  [/\bCAN BE UNLOCKED BY A PAID UPGRADE TO\b/gi, "actualizare optionala pentru"],
  [/\bPAID UPGRADE\b/gi, "actualizare optionala"],
  [/\bUPGRADE\b/gi, "actualizare"],
  [/\bDEVICE\b/gi, "dispozitiv"],
  [/\bPHONE\b/gi, "casti"],
  [/\bADULT CUFF SPARE\b/gi, "manseta adult de rezerva"],
  [/\bCUFF\b/gi, "manseta"],
  [/\bSPARE\b/gi, "rezerva"],
  [/\bCOLOUR SCREEN\b/gi, "ecran color"],
  [/\bCOLOR SCREEN\b/gi, "ecran color"],
  [/\bCOLOUR\b/gi, "color"],
  [/\bCOLOR\b/gi, "color"],
  [/\bPROBES\b/gi, "sonde"],
  [/\bPROBE\b/gi, "sonda"],
  [/\bSMOKE EVACUATOR\b/gi, "aspirator de fum chirurgical"],
  [/\bMAX VACUUM FLOW\b/gi, "debit maxim de aspiratie"],
  [/\bVACUUM FLOW\b/gi, "debit de aspiratie"],
  [/\bVACUUM\b/gi, "aspiratie"],
  [/\bECG CABLE\b/gi, "cablu ECG"],
  [/\bPATIENT CABLE\b/gi, "cablu pacient"],
  [/\bRETINOSCOPE\b/gi, "retinoscop"],
  [/\bSLIT\b/gi, "cu fanta"],
  [/\bAUTOCLAVE\b/gi, "autoclava"],
  [/\bSTERILIZER\b/gi, "sterilizator"],
  [/\bMEDICAL HEAT SEALER\b/gi, "aparat medical pentru termosigilare"],
  [/\bHEAT SEALER\b/gi, "aparat pentru termosigilare"],
  [/\bCENTRIFUGE\b/gi, "centrifuga"],
  [/\bANALYZER\b/gi, "analizor"],
  [/\bANALYSER\b/gi, "analizor"],
  [/\bURINE\b/gi, "urina"],
  [/\bHEMOGLOBIN\b/gi, "hemoglobina"],
  [/\bEMERGENCY TROLLEY\b/gi, "carucior de urgenta"],
  [/\bDRESSING TROLLEY\b/gi, "carucior pentru pansamente"],
  [/\bANESTHESIA TROLLEY\b/gi, "carucior pentru anestezie"],
  [/\bTROLLEY\b/gi, "carucior"],
  [/\bPATIENT TRANSFER CHAIR\b/gi, "scaun pentru transfer pacient"],
  [/\bTRANSFER CHAIR\b/gi, "scaun de transfer"],
  [/\bENT CHAIR\b/gi, "scaun ORL"],
  [/\bCHAIR\b/gi, "scaun"],
  [/\bOVERBED TABLE\b/gi, "masa peste pat"],
  [/\bTABLE\b/gi, "masa"],
  [/\bSTRETCHER\b/gi, "targa"],
  [/\bWHEELCHAIR\b/gi, "scaun cu rotile"],
  [/\bROLLATOR\b/gi, "cadru de mers cu roti"],
  [/\bCRUTCH\b/gi, "carja"],
  [/\bWALKER\b/gi, "cadru de mers"],
  [/\bWHEEL\b/gi, "roata"],
  [/\bWHEELS\b/gi, "roti"],
  [/\bREAR\b/gi, "spate"],
  [/\bHANDRAILS\b/gi, "bare de sustinere"],
  [/\bBRACKET\b/gi, "suport"],
  [/\bT[- ]BAR\b/gi, "maner T"],
  [/\bEXTRA ADJUSTABILITY\b/gi, "reglaj extins"],
  [/\bADJUSTABILITY\b/gi, "reglaj"],
  [/\bDRIVE[- ]ON RAMP\b/gi, "rampa de acces"],
  [/\bRAMP\b/gi, "rampa"],
  [/\bBASIC PEDAL EXERCISER\b/gi, "pedalier pentru exercitii"],
  [/\bPEDAL EXERCISER\b/gi, "pedalier pentru exercitii"],
  [/\bEXERCISER\b/gi, "dispozitiv pentru exercitii"],
  [/\bBAG\b/gi, "geanta"],
  [/\bCASE\b/gi, "cutie"],
  [/\bVACCINE CARRIER\b/gi, "transportor pentru vaccinuri"],
  [/\bTHERMAL\b/gi, "termic"],
  [/\bICE PACK\b/gi, "pachet rece"],
  [/\bMASK\b/gi, "masca"],
  [/\bGLOVES\b/gi, "manusi"],
  [/\bGLOVE\b/gi, "manusa"],
  [/\bDRAPE\b/gi, "camp"],
  [/\bSTERILE\b/gi, "steril"],
  [/\bDISPOSABLE\b/gi, "de unica folosinta"],
  [/\bFORCEPS\b/gi, "pensa"],
  [/\bCLAMP\b/gi, "clama"],
  [/\bSCISSORS\b/gi, "foarfeca"],
  [/\bSCALPEL\b/gi, "bisturiu"],
  [/\bBLADE\b/gi, "lama"],
  [/\bNEEDLE\b/gi, "ac"],
  [/\bSYRINGE\b/gi, "seringa"],
  [/\bCATHETER\b/gi, "cateter"],
  [/\bTUBE\b/gi, "tub"],
  [/\bTHERMOMETER\b/gi, "termometru"],
  [/\bSTETHOSCOPE\b/gi, "stetoscop"],
  [/\bSCALE\b/gi, "cantar"],
  [/\bBODY FAT\b/gi, "compozitie corporala"],
  [/\bMECHANICAL\b/gi, "mecanic"],
  [/\bGLASS\b/gi, "sticla"],
  [/\bLIGHT\b/gi, "lampa"],
  [/\bLAMP\b/gi, "lampa"],
  [/\bFOOT WARMER\b/gi, "incalzitor pentru picioare"],
  [/\bCOLPOSCOPE\b/gi, "colposcop"],
  [/\bMAMMOGRAPHY\b/gi, "mamografie"],
  [/\bGYNAECOLOGY\b/gi, "ginecologie"],
  [/\bGYNECOLOGY\b/gi, "ginecologie"],
  [/\bLUMINOUS OPTOTYPES HAVE BEEN DESIGNED\b/gi, "panou luminos pentru optotipuri"],
  [/\bLUMINOUS OPTOTYPES\b/gi, "optotipuri luminoase"],
  [/\bOPTOTYPES\b/gi, "optotipuri"],
  [/\bVIEWING AREA\b/gi, "zona vizibila"],
  [/\bCOMMODE\b/gi, "scaun cu functie toaleta"],
  [/\bCHROMED STEEL\b/gi, "otel cromat"],
  [/\bPAINTED\b/gi, "vopsit"],
  [/\bAUTOMATIC LOADING\b/gi, "incarcare automata"],
  [/\bAUTOMATIC\b/gi, "automat"],
  [/\bLOADING\b/gi, "incarcare"],
  [/\bWIRELESS\b/gi, "fara fir"],
  [/\bBODY\b/gi, "corp"],
  [/\bPANEL\b/gi, "panou"],
  [/\bPANELS\b/gi, "panouri"],
  [/\bSKIN MARKER\b/gi, "marker pentru piele"],
  [/\bDUAL TIPS\b/gi, "doua varfuri"],
  [/\bFINE TIP\b/gi, "varf fin"],
  [/\bGENTIAN VIOLET\b/gi, "violet de gentiana"],
  [/\bPET\b/gi, "veterinar"],
  [/\bDIAGNOSTIC\b/gi, "diagnostic"],
  [/\bSURGICAL\b/gi, "chirurgical"],
  [/\bMEDICAL\b/gi, "medical"],
  [/\bPROFESSIONAL\b/gi, "profesional"],
  [/\bFOLDABLE\b/gi, "pliabil"],
  [/\bHYDRAULIC\b/gi, "hidraulic"],
  [/\bELECTRIC\b/gi, "electric"],
  [/\bPORTABLE\b/gi, "portabil"],
  [/\bDIGITAL\b/gi, "digital"],
  [/\bSPOT[- ]ADJUSTED\b/gi, "cu spot reglabil"],
  [/\bSPOT\b/gi, "spot"],
  [/\bMULTIFUNCTION\b/gi, "multifunctional"],
  [/\bMULTI[- ]FUNCTION\b/gi, "multifunctional"],
  [/\bDRAWERS\b/gi, "sertare"],
  [/\bDRAWER\b/gi, "sertar"],
  [/\bSHELF\b/gi, "raft"],
  [/\bLITHIUM\b/gi, "litiu"],
  [/\bRECHARGEABLE BATTERIES\b/gi, "baterii reincarcabile"],
  [/\bRECHARGEABLE\b/gi, "reincarcabil"],
  [/\bBATTERIES\b/gi, "baterii"],
  [/\bBATTERY\b/gi, "baterie"],
  [/\bDISPLAY\b/gi, "ecran"],
  [/\bGROUNDING PAD\b/gi, "pad de impamantare"],
  [/\bGROUNDING\b/gi, "impamantare"],
  [/\bSPLIT\b/gi, "split"],
  [/\bPRECORDED\b/gi, "cu cablu"],
  [/\bBASE\b/gi, "baza"],
  [/\bSTAND ALONE\b/gi, "independent"],
  [/\bSTAND\b/gi, "suport"],
  [/\bPOCKET SIZE\b/gi, "format de buzunar"],
  [/\bHOLDING ARM\b/gi, "brat de sustinere"],
  [/\bPOUCH\b/gi, "husa"],
  [/\bUPPER\b/gi, "superior"],
  [/\bLOWER\b/gi, "inferior"],
  [/\bBLACK\b/gi, "negru"],
  [/\bWHITE\b/gi, "alb"],
  [/\bBLUE\b/gi, "albastru"],
  [/\bGREEN\b/gi, "verde"],
  [/\bRED\b/gi, "rosu"],
  [/\bYELLOW\b/gi, "galben"],
  [/\bPINK\b/gi, "roz"],
  [/\bBROWN\b/gi, "maro"],
  [/\bCHESTNUT\b/gi, "castaniu"],
  [/\bBURGUNDY\b/gi, "burgund"],
  [/\bOCHRE\b/gi, "ocru"],
  [/\bLIGHT BLUE\b/gi, "albastru deschis"],
  [/\bDARK BLUE\b/gi, "albastru inchis"],
  [/\bPACK OF\s*(\d+)/gi, "pachet cu $1"],
  [/\bBOX OF\s*(\d+)/gi, "cutie cu $1"],
  [/\bBOX\b/gi, "cutie"],
  [/\bWITH\b/gi, "cu"],
  [/\bWITHOUT\b/gi, "fara"],
  [/\bCONNECTED\b/gi, "conectat"],
  [/\bARM\b/gi, "brat"],
  [/\bTAMPON\b/gi, "pad"],
  [/\bSTRAIGHT\b/gi, "drept"],
  [/\bCURVED\b/gi, "curbat"],
  [/\bSMALL\b/gi, "mic"],
  [/\bMEDIUM\b/gi, "mediu"],
  [/\bLARGE\b/gi, "mare"],
];

const labelTranslations = [
  [/^cod produs$/i, "Cod produs"],
  [/^categorie$/i, "Categorie"],
  [/^model$/i, "Model"],
  [/^tip produs$/i, "Tip produs"],
  [/^dimensiuni?$/i, "Dimensiuni"],
  [/^size$/i, "Dimensiuni"],
  [/^dimensions?$/i, "Dimensiuni"],
  [/^weight$/i, "Greutate"],
  [/^greutate$/i, "Greutate"],
  [/^material$/i, "Material"],
  [/^voltage$/i, "Tensiune alimentare"],
  [/^power consumption$/i, "Consum electric"],
  [/^power$/i, "Putere"],
  [/^frequency$/i, "Frecventa"],
  [/^battery$/i, "Baterie"],
  [/^capacity$/i, "Capacitate"],
  [/^speed$/i, "Viteza"],
  [/^time$/i, "Timp"],
  [/^pressure$/i, "Presiune"],
  [/^display$/i, "Afisaj"],
  [/^memory$/i, "Memorie"],
  [/^range$/i, "Interval"],
  [/^accuracy$/i, "Precizie"],
  [/^packaging$/i, "Ambalare"],
  [/^package$/i, "Ambalare"],
  [/^standard$/i, "Standard"],
];

const englishLeakPatterns = [
  /\b(description|features|package contents|applications|benefits|specifications|delivery and support|product documents|related products|related services|quote request|product code)\b/i,
  /\b(disposable|straight|curved|sterile|supplied|provided|optional|available|minimum order|single use|single patient|without needle|with needle|stainless steel|chrome plated|height adjustable|foldable)\b/i,
  /\b(power consumption|voltage|communication interface|record mode|host computer|large lcd display|user[- ]friendly interface|fast results|limited sample volume)\b/i,
  /\b(trolley|chair|table|analyzer|analyser|autoclave|centrifuge|stretcher|wheelchair|mask|gloves|drape|forceps|clamp|scissors|bag|case|scale|lamp|light|thermometer|stethoscope)\b/i,
  /\b(connected|arm|wrist|b\s*\.?\s*p|slit|coiled|tubing|insulation|device|air conduction|phone|adult cuff|cuff|spare|colour screen|color screen|colour|color|probe|probes|can be|paid|upgrade|smoke|evacuator|vacuum|flow|multifunction|drive[- ]on|ramp|basic|pedal|exerciser|body fat|mechanical|glass|rear|wheels?|handrails|bracket|t[- ]bar|adjustability|drawers?|shelf|lithium|battery|batteries|rechargeable|display|spot[- ]adjusted|grounding|precorded|base|stand alone|pocket size|holding arm|pouch|upper|lower|gynaecology|gynecology|luminous|optotypes|viewing area|commode|chromed steel|painted|automatic loading|loading|wireless|body|panel|panels|skin marker|dual tips|fine tip|gentian violet|pet)\b/i,
];

function normalize(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

function romanianize(text) {
  let value = String(text || "")
    .replace(/[•·]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  for (const [pattern, replacement] of replacements) {
    value = value.replace(pattern, replacement);
  }
  value = value
    .replace(/\bcu cu\b/gi, "cu")
    .replace(/\bfara fara\b/gi, "fara")
    .replace(/\s+-\s+/g, " - ")
    .replace(/\s+/g, " ")
    .trim();
  return value;
}

function titleCaseRomanian(text) {
  const keepUpper = new Set(["ECG", "EKG", "LED", "LCD", "USB", "PVC", "ABS", "RFID", "IVD", "ORL", "AED", "CE", "ISO", "FDA", "HD", "TFT"]);
  return String(text || "")
    .split(/\s+/)
    .map((word, index) => {
      const clean = word.replace(/[^A-Za-z0-9]/g, "");
      if (keepUpper.has(clean.toUpperCase())) return word.toUpperCase();
      if (/^[A-Z0-9-]{2,}$/.test(word) && /\d/.test(word)) return word;
      if (index > 0 && ["de", "cu", "si", "pentru", "fara", "din", "la", "in"].includes(normalize(word))) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ")
    .replace(/\bSi\b/g, "si")
    .replace(/\bIn\b/g, "in");
}

function repairTitle(product) {
  const category = categoryRules[product.category] || categoryRules.diagnostic;
  const currentTitle = product.romanianTitle || "";
  const currentLooksGenerated = /\bcod\s+\d{4,}\b/i.test(normalize(currentTitle)) ||
    /(mobilier medical|diagnostic medical|monitorizare|urgenta|ingrijire pacient|electromedicale).*(mobilier medical|diagnostic medical|monitorizare|urgenta|ingrijire pacient|electromedicale)/i.test(normalize(currentTitle)) ||
    /^echipament de\s+\w+\s+\w+\s+cod\s+\d+/i.test(normalize(currentTitle)) ||
    /^produs pentru\s+\w+.*cod\s+\d+/i.test(normalize(currentTitle));
  let title = romanianize(currentLooksGenerated ? product.sourceProductName || currentTitle : currentTitle || product.sourceProductName || "");
  title = title.replace(/\bGIMA\b\s*/g, "").replace(/\s+/g, " ").trim();
  if (!title || title.length < 6) {
    title = `${category.noun} ${product.gimaCode || ""}`.trim();
  }
  const normalized = normalize(title);
  const hasKnownType = [
    "analizor",
    "centrifuga",
    "monitor",
    "tensiometru",
    "pulsoximetru",
    "autoclava",
    "sterilizator",
    "carucior",
    "scaun",
    "masa",
    "targa",
    "masca",
    "manusi",
    "camp",
    "pensa",
    "clama",
    "foarfeca",
    "bisturiu",
    "cateter",
    "geanta",
    "cantar",
    "lampa",
    "termometru",
    "stetoscop",
    "colposcop",
    "produs",
    "echipament",
    "instrument",
  ].some((term) => normalized.includes(term));
  if (!hasKnownType) {
    title = `${category.noun} ${title}`;
  }
  return titleCaseRomanian(title)
    .replace(/\bDigital Cantar\b/g, "Cantar digital")
    .replace(/\bMultifunctional Cantar\b/g, "Cantar multifunctional")
    .replace(/\bMecanic Cantar\b/g, "Cantar mecanic")
    .replace(/\bCompozitie Corporala Cantar\b/g, "Cantar pentru compozitie corporala")
    .replace(/\bSticla Cantar\b/g, "Cantar din sticla")
    .replace(/\bDigital Veterinar Cantar\b/g, "Cantar digital veterinar")
    .replace(/\bGimafit Corp Cantar\b/g, "Cantar Gimafit pentru analiza corporala")
    .replace(/\bIhealth Air\s*-\s*Fara Fir\b/g, "Dispozitiv iHealth Air fara fir")
    .replace(/\bProdus de Laborator Analizor Lactate Scout 4\b/g, "Analizor Lactate Scout 4")
    .replace(/\bAnalizor Analizor\b/g, "Analizor")
    .replace(/\bLactate Scout 4\b/g, "Analizor Lactate Scout 4")
    .replace(/\bAnalizor Analizor\b/g, "Analizor")
    .replace(/\bIhealth Sense Bp7 Incheietura Tensiometru\b/g, "Tensiometru de incheietura iHealth Sense BP7")
    .replace(/\bIhealth Neo Bp5s Tensiometru de Brat\b/g, "Tensiometru de brat iHealth Neo BP5S")
    .replace(/\bProdus pentru Ginecologie (\d+)\s*Mhz Sonda\s*-\s*Ginecologie\b/gi, "Sonda ginecologica $1 MHz")
    .replace(/\bProdus pentru Ginecologie Sonda Ginecologica\b/gi, "Sonda ginecologica")
    .replace(/\bBrat Tensiometru\b/g, "Tensiometru de brat")
    .replace(/\bElectric Scaun Rulant\b/g, "Scaun rulant electric")
    .replace(/\bSpate Roti\b/g, "roti spate")
    .replace(/\bCarucior\s*-\s*Baza\b/g, "Baza pentru carucior")
    .replace(/\bIncarcare Automata Targa\b/g, "Targa cu incarcare automata")
    .replace(/\bScaun cu Functie Toaleta Scaun\s*-\s*Otel Cromat\b/g, "Scaun cu functie toaleta din otel cromat")
    .replace(/\bScaun cu Functie Toaleta Scaun Rulant\s*-\s*Vopsit\b/g, "Scaun rulant cu functie toaleta - vopsit")
    .replace(/\bProdus ORL Litiu Baterie 3w\s*-\s*Piesa de Schimb\b/g, "Baterie litiu 3W pentru produs ORL - piesa de schimb")
    .replace(/\bEchipament de Sterilizare 35621 Gimette 28\b/g, "Accesoriu sterilizare Gimette 28")
    .replace(/\bEchipament de Sterilizare Accesoriu Sterilizare\b/g, "Accesoriu sterilizare")
    .replace(/\bMobilier Medical Mobilier Medical\b/g, "Mobilier Medical")
    .replace(/\bLampa Cutie 38x62 Cm 67 43 12 8 1,5 Panou\b/g, "Caseta luminoasa 38 x 62 cm")
    .replace(/\bLumina LED Lampa\s*-\s*Carucior\b/g, "Lampa medicala LED pentru carucior")
    .replace(/\bLED Cu Spot Reglabil Lampa\s*-\s*Carucior\b/g, "Lampa LED cu spot reglabil pentru carucior")
    .replace(/\bLED Medical Lampa Frontala\b/g, "Lampa frontala medicala LED")
    .replace(/\bLED Lampa Frontala\b/g, "Lampa frontala LED")
    .replace(/\bCu Baterii Reincarcabile\b/g, "cu baterii reincarcabile")
    .replace(/\bIvd\b/g, "IVD")
    .replace(/\bOrl\b/g, "ORL")
    .replace(/\bEcg\b/g, "ECG")
    .replace(/\bUsb\b/g, "USB")
    .replace(/\bLed\b/g, "LED")
    .replace(/\bLcd\b/g, "LCD")
    .replace(/\bAbs\b/g, "ABS")
    .replace(/\bPvc\b/g, "PVC")
    .replace(/\bCe\b/g, "CE")
    .replace(/\bMhz\b/g, "MHz")
    .replace(/\s+-\s*$/g, "")
    .trim();
}

function slugify(text) {
  return normalize(text)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90)
    .replace(/-+$/g, "");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripAllowedEnglish(text) {
  let value = ` ${String(text || "")} `;
  for (const term of allowedEnglishTerms) {
    value = value.replace(new RegExp(`\\b${escapeRegExp(term)}\\b`, "gi"), " ");
  }
  return value;
}

function hasEnglishLeak(text) {
  const stripped = stripAllowedEnglish(text);
  return englishLeakPatterns.some((pattern) => pattern.test(stripped));
}

function hasBadTitle(title) {
  const text = normalize(title);
  const words = text.match(/[a-z0-9]+/g) || [];
  const counts = new Map();
  for (const word of words) {
    if (word.length < 3) continue;
    counts.set(word, (counts.get(word) || 0) + 1);
  }
  return Boolean(
    title.length < 8 ||
      /([a-z])\1{3,}/i.test(text) ||
      /([a-z]{2,8})\1{2,}/i.test(text.replace(/\s+/g, "")) ||
      /\bcod\s+\d{4,}\b/i.test(text) ||
      /^produs medical\s+\d{4,}$/i.test(text) ||
      /\b(diagnostic medical|ingrijire pacient|mobilier medical|electromedicale|urgenta|monitorizare|protectie operator|cantare si masurare)\s+cod\s+\d{4,}\b/i.test(text) ||
      /\b(echipament|produs|mobilier)\s+(de\s+)?(diagnostic|monitorizare|urgenta|medical|electromedical|protectia operatorului)\s+\w*\s*cod\s+\d{4,}\b/i.test(text) ||
      /[()]{2,}|\/\d|\d+\)\s+\w+/.test(title) ||
      [...counts.values()].some((count) => count >= 3) ||
      hasEnglishLeak(title)
  );
}

function localFileExists(publicPath, minSize = 1000) {
  if (!publicPath || !String(publicPath).startsWith("/")) return false;
  const filePath = path.join(root, "public", publicPath.replace(/^\//, ""));
  return fs.existsSync(filePath) && fs.statSync(filePath).size >= minSize;
}

function validGallery(product, title) {
  const images = [];
  const seen = new Set();
  const candidates = [
    ...(product.galleryImages || []),
    product.imageUrl ? { url: product.imageUrl, verified: product.imageVerified } : null,
  ].filter(Boolean);
  for (const image of candidates) {
    if (!image.url || seen.has(image.url) || !localFileExists(image.url, 1000)) continue;
    seen.add(image.url);
    images.push({
      url: image.url,
      alt: `${title} - imagine produs`,
      verified: true,
    });
  }
  return images;
}

function validDocuments(product) {
  const documents = {};
  for (const [key, value] of Object.entries(product.documents || {})) {
    if (localFileExists(value, 1000)) documents[key] = value;
  }
  return documents;
}

function translateLabel(label) {
  let value = romanianize(label);
  for (const [pattern, replacement] of labelTranslations) {
    if (pattern.test(value)) return replacement;
  }
  return titleCaseRomanian(value)
    .replace(/\bId\b/g, "ID")
    .replace(/\bUsb\b/g, "USB")
    .replace(/\bLed\b/g, "LED")
    .replace(/\bLcd\b/g, "LCD");
}

function translateValue(value) {
  return romanianize(value)
    .replace(/\boutside\b/gi, "exterior")
    .replace(/\binside\b/gi, "interior")
    .replace(/\bexternal pocket\b/gi, "buzunar exterior")
    .replace(/\bclosure\b/gi, "inchidere")
    .replace(/\bnylon\b/gi, "nylon")
    .replace(/\bstainless steel\b/gi, "otel inoxidabil")
    .replace(/\bchrome plated\b/gi, "cromat")
    .replace(/\buser friendly\b/gi, "usor de utilizat")
    .replace(/\bheight adjustable\b/gi, "reglabil pe inaltime")
    .replace(/\bmanual\b/gi, "manual")
    .replace(/\bsupplied\b/gi, "livrat")
    .replace(/\bprovided\b/gi, "furnizat")
    .replace(/\bavailable\b/gi, "disponibil")
    .replace(/\boptional\b/gi, "optional")
    .replace(/\s+/g, " ")
    .trim();
}

function groupForSpec(spec) {
  const text = normalize(`${spec.label} ${spec.value}`);
  if (/dimensi|latime|inaltime|adancime|diametru|lungime|marime|size|cm|mm/.test(text)) return "Dimensions";
  if (/greutate|sarcina|load|kg|g\b/.test(text)) return "Weight";
  if (/alimentare|tensiune|putere|baterie|frecventa|consum|v\b|w\b|hz|mah/.test(text)) return "Electrical";
  if (/capacitate|viteza|timp|presiune|memorie|interval|precizie|afisaj|display|canal|rpm|rcf|masurare|ciclu/.test(text)) return "Performance";
  if (/steril|ce\b|certificat|standard|medical|clinic|pacient|siguranta|utilizare/.test(text)) return "Medical";
  if (/accesori|ambalare|pachet|cutie|include|livrat|material|continut|roti|maner|sertar/.test(text)) return "Accessories";
  return "General";
}

function normalizeSpecs(product, categoryLabel) {
  const specs = [
    { label: "Cod produs", value: product.gimaCode || product.id },
    { label: "Categorie", value: categoryLabel },
    ...(product.romanianSpecifications || []),
  ];
  const seen = new Set();
  const grouped = new Map();
  for (const spec of specs) {
    const label = translateLabel(spec.label);
    const value = translateValue(spec.value);
    if (!label || !value || value.length < 2) continue;
    if (hasEnglishLeak(label) || hasEnglishLeak(value)) continue;
    const key = `${normalize(label)}:${normalize(value)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const item = { label, value };
    const group = groupForSpec(item);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push(item);
  }
  const order = ["General", "Dimensions", "Weight", "Electrical", "Performance", "Medical", "Accessories"];
  return order
    .filter((group) => grouped.has(group))
    .map((group) => ({ group, items: grouped.get(group).slice(0, 12) }));
}

function flatten(groups) {
  return groups.flatMap((group) => group.items);
}

function scoreProduct({ product, title, description, groups, gallery, documents }) {
  const specCount = flatten(groups).length;
  const groupCount = groups.length;
  let score = 0;
  if (!hasBadTitle(title)) score += 18;
  if (gallery.length > 0) score += 20;
  if (description.length > 220 && !hasEnglishLeak(description)) score += 16;
  if (specCount >= 8) score += 20;
  else if (specCount >= 6) score += 17;
  else if (specCount >= 4) score += 14;
  if (groupCount >= 4) score += 10;
  else if (groupCount >= 3) score += 8;
  else if (groupCount >= 2) score += 5;
  if (Object.keys(documents).length > 0) score += 5;
  if ((product.romanianFeatures?.length || 0) > 0 || (product.romanianBenefits?.length || 0) > 0) score += 5;
  score += 6; // CTA, quote form and bottom actions are provided by the shared product page.
  const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "D";
  return { score, grade };
}

function makeContent(product, title, groups, documents) {
  const rules = categoryRules[product.category] || categoryRules.diagnostic;
  const specHighlights = flatten(groups)
    .filter((spec) => !["Cod produs", "Categorie"].includes(spec.label))
    .slice(0, 3)
    .map((spec) => `${spec.label}: ${spec.value}`);
  const docText = Object.keys(documents).length
    ? "Pagina include documentatie locala disponibila pentru consultare inainte de ofertare."
    : "Documentatia se poate clarifica la cererea de oferta, in functie de configuratia solicitata.";
  return {
    summary: `${title} este un ${rules.noun} potrivit pentru ${rules.applications[0]}, cu ofertare adaptata aplicatiei si cantitatii solicitate.`,
    description: `${title} este selectat pentru catalogul ZESCORP ca ${rules.noun} cu utilitate comerciala pentru ${rules.applications.join(", ")}. Cererea de oferta se pregateste in functie de configuratie, cantitate, termen de livrare si cerintele de service. ${specHighlights.length ? `Date tehnice utile: ${specHighlights.join("; ")}.` : ""} ${docText}`,
    applications: [
      `Utilizare in ${rules.applications[0]}`,
      `Integrare in ${rules.applications[1]}`,
      `Achizitie pentru ${rules.applications[2]}`,
    ],
    benefits: [
      title.includes("consumabil") || product.category === "consumables"
        ? "Potrivit pentru achizitii recurente si necesar operational."
        : "Poate fi integrat intr-o cerere de oferta tehnico-comerciala.",
      rules.benefits[1],
      Object.keys(documents).length ? "Documentatie locala disponibila pentru verificare." : "Configuratia se clarifica inainte de ofertarea finala.",
    ],
    features: [
      `${rules.label}: ${title}`,
      specHighlights[0] || "Configuratie verificata inainte de ofertare",
      specHighlights[1] || "Suport ZESCORP pentru selectie si achizitie",
    ],
    packageContents: Object.keys(documents).length
      ? ["Documentatie tehnica locala disponibila", "Configuratia produsului se confirma la ofertare"]
      : ["Configuratia si continutul pachetului se confirma la ofertare"],
    installation: [
      "Verificarea aplicatiei medicale si a cantitatii solicitate",
      "Clarificarea accesoriilor, documentatiei si termenului de livrare",
      "Pregatirea unei oferte personalizate pentru clinica sau unitatea medicala",
    ],
    maintenance: [
      "Suport pentru clarificari tehnice inainte de achizitie",
      "Posibilitate de corelare cu service si mentenanta unde produsul o necesita",
      "Recomandari pentru exploatare, consumabile si documentatie in functie de produs",
    ],
    relatedServices: rules.services,
  };
}

function sourceText(product) {
  return [
    product.sourceProductName,
    product.romanianTitle,
    product.romanianDescription,
    ...(product.romanianSpecifications || []).flatMap((spec) => [spec.label, spec.value]),
  ]
    .filter(Boolean)
    .join(" ");
}

function candidateScore(product) {
  const specs = product.romanianSpecifications?.length || 0;
  const docs = Object.values(product.documents || {}).filter((value) => localFileExists(value, 1000)).length;
  const hasImage = localFileExists(product.imageUrl, 1000) || product.galleryImages?.some((image) => localFileExists(image.url, 1000));
  if (!hasImage || specs < 4 || !product.gimaCode || !categoryRules[product.category]) return -1;
  let score = specs * 5 + docs * 8;
  const text = normalize(sourceText(product));
  if (/dimensi|greutate|tensiune|putere|capacitate|material|presiune|viteza|baterie/.test(text)) score += 20;
  if (["laboratory", "emergency", "medical-furniture", "monitoring", "sterilization"].includes(product.category)) score += 10;
  if (product.publicDisplayReady) score += 50;
  return score;
}

function productRedirectPath(slug) {
  return `/produse/${String(slug || "").replace(/^\/?produse\//, "").replace(/^\//, "")}`;
}

function normalizeRedirect(redirect) {
  if (redirect.source && redirect.destination) {
    return {
      source: productRedirectPath(redirect.source),
      destination: productRedirectPath(redirect.destination),
    };
  }
  if (redirect.from && redirect.to) {
    return {
      source: productRedirectPath(redirect.from),
      destination: productRedirectPath(redirect.to),
    };
  }
  return null;
}

function main() {
  const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
  const redirects = fs.existsSync(redirectsPath)
    ? JSON.parse(fs.readFileSync(redirectsPath, "utf8")).map(normalizeRedirect).filter(Boolean)
    : [];
  const slugMap = new Map(products.map((product) => [product.id, product.slug]));
  const redirectSet = new Set(redirects.map((item) => `${item.source}->${item.destination}`));

  const candidates = products
    .map((product) => ({ product, score: candidateScore(product) }))
    .filter((entry) => entry.score >= 0)
    .sort((a, b) => b.score - a.score || String(a.product.gimaCode).localeCompare(String(b.product.gimaCode)));

  const selected = [];
  const rejected = [];
  const usedSlugs = new Set();
  const gradeDistribution = { A: 0, B: 0, C: 0, D: 0 };
  const byCategory = {};
  const specRecovery = [];

  for (const entry of candidates) {
    if (selected.length >= targetCount) break;
    const product = entry.product;
    let category = categoryRules[product.category] || categoryRules.diagnostic;
    const isReferenceGold = goldReferenceCodes.has(String(product.gimaCode));
    const title = isReferenceGold && product.specificationGroups?.length ? product.romanianTitle : repairTitle(product);
    if (!isReferenceGold && /\bcantar\b/i.test(normalize(title))) {
      product.category = "scales-measures";
      category = categoryRules[product.category];
    }
    const gallery = validGallery(product, title);
    const documents = validDocuments(product);
    const groups = isReferenceGold && product.specificationGroups?.length ? product.specificationGroups : normalizeSpecs(product, category.label);
    const flatSpecs = flatten(groups);
    const content = isReferenceGold && product.romanianDescription && product.specificationGroups?.length
      ? {
          summary: product.romanianShortSummary,
          description: product.romanianDescription,
          applications: product.romanianApplications || [],
          benefits: product.romanianBenefits || [],
          features: product.romanianFeatures || [],
          packageContents: product.romanianPackageContents || [],
          installation: product.installationConsiderations || [],
          maintenance: product.maintenanceConsiderations || [],
          relatedServices: product.relatedServices?.length ? product.relatedServices : category.services,
        }
      : makeContent(product, title, groups, documents);

    const quality = scoreProduct({ product, title, description: content.description, groups, gallery, documents });
    const failureReasons = [];
    if (hasBadTitle(title)) failureReasons.push("title_quality");
    if (!gallery.length) failureReasons.push("missing_image");
    if (flatSpecs.length < 4) failureReasons.push("weak_specifications");
    if (hasEnglishLeak([title, content.summary, content.description, ...content.applications, ...content.benefits, ...flatSpecs.flatMap((spec) => [spec.label, spec.value])].join(" "))) {
      failureReasons.push("english_leak");
    }
    if (quality.grade === "C" || quality.grade === "D") failureReasons.push("score_below_b");

    if (failureReasons.length) {
      rejected.push({ code: product.gimaCode, title, category: product.category, reasons: failureReasons });
      continue;
    }

    let slug = product.publicDisplayReady ? product.slug : `${slugify(title)}-${product.gimaCode}`;
    let suffix = 2;
    while (usedSlugs.has(slug) || products.some((item) => item.id !== product.id && item.slug === slug)) {
      slug = `${slugify(title)}-${product.gimaCode}-${suffix}`;
      suffix += 1;
    }
    usedSlugs.add(slug);
    if (product.slug !== slug) {
      const source = productRedirectPath(product.slug);
      const destination = productRedirectPath(slug);
      const key = `${source}->${destination}`;
      if (!redirectSet.has(key)) {
        redirects.push({ source, destination });
        redirectSet.add(key);
      }
    }

    product.slug = slug;
    product.romanianTitle = title;
    product.romanianShortSummary = content.summary;
    product.romanianDescription = content.description;
    product.romanianApplications = content.applications;
    product.romanianBenefits = content.benefits;
    product.romanianFeatures = content.features;
    product.romanianPackageContents = content.packageContents;
    product.installationConsiderations = content.installation;
    product.maintenanceConsiderations = content.maintenance;
    product.relatedServices = content.relatedServices;
    product.relatedProductCodes = [];
    product.romanianSpecifications = flatSpecs;
    product.specificationGroups = groups;
    product.specificationCompletenessGrade = quality.grade;
    product.specificationCompletenessScore = quality.score;
    product.qualityScore = quality.score;
    product.strictQualityScore = quality.score;
    product.strictQualityStatus = "pass";
    product.strictQualityFailures = [];
    product.catalogStatus = "ready_for_publish";
    product.publicDisplayReady = true;
    product.reviewStatus = "image_verified";
    product.indexableAt = null;
    product.commercialCategory = category.label;
    product.imageUrl = gallery[0].url;
    product.imageAlt = `${title} - produs medical pentru oferta ZESCORP`;
    product.imageVerified = true;
    product.galleryImages = gallery;
    product.documents = documents;
    product.documentStatus = Object.keys(documents).length ? "available" : "missing";

    gradeDistribution[quality.grade] += 1;
    byCategory[product.category] = (byCategory[product.category] || 0) + 1;
    specRecovery.push({
      code: product.gimaCode,
      title,
      category: product.category,
      specs: flatSpecs.length,
      groups: groups.length,
      grade: quality.grade,
      score: quality.score,
      docs: Object.keys(documents).length,
      images: gallery.length,
      url: `http://localhost:3000/produse/${slug}`,
    });
    selected.push(product);
  }

  const selectedIds = new Set(selected.map((product) => product.id));
  for (const product of products) {
    product.reviewStatus = product.reviewStatus === "indexable" ? "image_verified" : product.reviewStatus;
    product.indexableAt = null;
    if (!selectedIds.has(product.id)) {
      product.publicDisplayReady = false;
      product.strictQualityStatus = "fail";
      product.catalogStatus = product.catalogStatus === "ready_for_publish" ? "needs_review" : product.catalogStatus;
    }
  }

  const byCategorySelected = new Map();
  for (const product of selected) {
    const peers = byCategorySelected.get(product.category) || [];
    peers.push(product);
    byCategorySelected.set(product.category, peers);
  }
  for (const product of selected) {
    const peers = (byCategorySelected.get(product.category) || []).filter((peer) => peer.id !== product.id);
    product.relatedProductCodes = peers.slice(0, 4).map((peer) => peer.gimaCode).filter(Boolean);
  }

  fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`);
  fs.writeFileSync(redirectsPath, `${JSON.stringify(redirects, null, 2)}\n`);

  const samples = [];
  const sampleCategories = Object.keys(byCategory).sort((a, b) => byCategory[b] - byCategory[a]);
  for (const category of sampleCategories) {
    for (const item of specRecovery.filter((entry) => entry.category === category).slice(0, 2)) {
      if (samples.length < 20) samples.push(item);
    }
  }
  while (samples.length < 20 && specRecovery[samples.length]) samples.push(specRecovery[samples.length]);

  const report = [
    "# Product Gold Replication Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "Scope: Existing local product catalog only. No imports, no deployment, no indexation.",
    "",
    "## Summary",
    "",
    `- Products attempted: ${candidates.length}`,
    `- Products upgraded/public-display-ready locally: ${selected.length}`,
    `- Products rejected during gate: ${rejected.length}`,
    `- A grade products: ${gradeDistribution.A}`,
    `- B grade products: ${gradeDistribution.B}`,
    `- C grade products shown publicly: ${gradeDistribution.C}`,
    `- D grade products shown publicly: ${gradeDistribution.D}`,
    `- Indexable products: ${products.filter((product) => product.reviewStatus === "indexable" || product.indexableAt).length}`,
    "",
    "## Quality Rules Extracted From The 20 Gold Products",
    "",
    "- Natural Romanian product title with product type translated and model/code preserved.",
    "- Romanian SEO slug ending with product code.",
    "- Commercial description that mentions the product, category, use case and offer context.",
    "- Applications, benefits, service/maintenance notes and related services.",
    "- Grouped Romanian specifications: General, Dimensiuni, Greutate, Electric, Performanta, Medical, Accesorii.",
    "- At least one verified local image and no broken local documents.",
    "- No source/import/review metadata, no external source links, no fake price or stock.",
    "- All products remain noindex until a separate approval/indexation phase.",
    "",
    "## Category Coverage",
    "",
    "| Category | Products |",
    "| --- | ---: |",
    ...Object.entries(byCategory)
      .sort((a, b) => b[1] - a[1])
      .map(([category, count]) => `| ${category} | ${count} |`),
    "",
    "## Specification Recovery",
    "",
    `- Average specification count: ${(specRecovery.reduce((sum, item) => sum + item.specs, 0) / Math.max(1, specRecovery.length)).toFixed(1)}`,
    `- Products with local documents: ${specRecovery.filter((item) => item.docs > 0).length}`,
    `- Products with multiple images: ${specRecovery.filter((item) => item.images > 1).length}`,
    "",
    "## Sample URLs",
    "",
    ...samples.map((item, index) => `${index + 1}. ${item.title} (${item.grade}, ${item.specs} specs)  \n   ${item.url}`),
    "",
    "## Rejected Examples",
    "",
    ...rejected.slice(0, 30).map((item) => `- ${item.code}: ${item.title} [${item.category}] - ${item.reasons.join(", ")}`),
    "",
    "## Validation Notes",
    "",
    "Run required validation after this script:",
    "",
    "```bash",
    "npm run build -- --webpack",
    "npm run content:check",
    "npm run audit:seo",
    "```",
    "",
    "Ready for visual review only after validation passes. Do not commit, deploy or index in this phase.",
  ].join("\n");
  fs.writeFileSync(reportPath, `${report}\n`);

  console.log(
    JSON.stringify(
      {
        attempted: candidates.length,
        upgraded: selected.length,
        grades: gradeDistribution,
        rejected: rejected.length,
        categories: byCategory,
        reportPath,
      },
      null,
      2,
    ),
  );
}

main();
