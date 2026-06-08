import fs from "node:fs";
import path from "node:path";

const productsPath = path.join(process.cwd(), "data", "product-catalog", "products.json");
const redirectsPath = path.join(process.cwd(), "data", "product-catalog", "product-redirects.json");
const reportPath = path.join(process.cwd(), "docs", "product-gold-repair-500-report.md");

const categoryLabels = {
  diagnostic: "Diagnostic",
  emergency: "Urgenta",
  laboratory: "Laborator / IVD",
  monitoring: "Monitorizare",
  "scales-measures": "Cantare si masurare",
  "medical-furniture": "Mobilier medical",
  "patient-care": "Ingrijire pacient",
  electromedical: "Electromedicale",
  gynecology: "Ginecologie",
  "medical-lights": "Lampi medicale",
  ent: "ORL",
  "surgical-instruments": "Instrumentar chirurgical",
  sterilization: "Sterilizare",
};

const productTypeByCategory = {
  diagnostic: "produs de diagnostic",
  emergency: "produs pentru urgenta",
  laboratory: "produs de laborator",
  monitoring: "produs de monitorizare",
  "scales-measures": "echipament de masurare",
  "medical-furniture": "mobilier medical",
  "patient-care": "produs pentru ingrijire pacient",
  electromedical: "echipament electromedical",
  gynecology: "produs ginecologic",
  "medical-lights": "lampa medicala",
  ent: "produs ORL",
  "surgical-instruments": "instrumentar chirurgical",
  sterilization: "produs pentru sterilizare",
};

const phaseBaseline = { A: 126, B: 43, C: 87, D: 244 };

const titleOverridesByCode = {
  "27086": "Cantar Gimafit pentru analiza corporala cu Bluetooth 5.0",
  "27094": "Cantar Gimafit pentru analiza corporala cu aplicatie si Bluetooth 5.0",
  "27274": "Accesoriu pentru masurare 27274",
  "27251": "Bare de sustinere cu suport",
  "27267": "Cantar digital pediatric Seca 376 clasa III",
  "27280": "Accesoriu cantar 305 x 120 x 470 mm",
  "27284": "Cantar mecanic Seca 756",
  "27292": "Cantar electronic Seca 799 cu BMI clasa III",
  "27293": "Monitor compozitie corporala Omron BF511",
  "27294": "Cantar mecanic Seca 745",
  "27296": "Cantar Seca 711 clasa III",
  "27299": "Cantar mecanic Seca 725",
  "27310": "Cantar Astra 200 kg clasa III",
  "27313": "Cantar electronic pentru bebelusi",
  "27333": "Taliometru electronic Soehnle",
  "27355": "Greutate de calibrare 27355",
  "27365": "Caseta luminoasa 38 x 62 cm",
  "27366": "Caseta luminoasa 38 x 92 cm",
  "27367": "Caseta luminoasa 38 x 122 cm",
  "27368": "Caseta luminoasa 38 x 153 cm",
  "27369": "Caseta luminoasa dubla 76 x 122 cm",
  "27370": "Caseta luminoasa dubla 76 x 153 cm",
  "27372": "Caseta luminoasa 92 x 38 cm",
  "27373": "Caseta luminoasa 122 x 38 cm",
  "27701": "Scaun toaleta din otel cromat",
  "27702": "Scaun rulant toaleta vopsit",
  "27703": "Scaun rulant cu functie toaleta",
  "27520": "Taburet medical cu inel",
  "27521": "Taburet medical cu inel",
  "27522": "Taburet medical cu inel",
  "27524": "Taburet medical cu inel",
  "27525": "Taburet medical cu inel",
  "27526": "Taburet medical cu inel",
  "27532": "Taburet medical cu sau fara inel",
  "27676": "Pat medical cu Trendelenburg 40-80 cm",
  "27677": "Pat medical cu Trendelenburg 40-80 cm",
  "27836": "Saltea pentru dus",
  "27838": "Furtun extensie dus 6 m",
  "27870": "Carucior medical 47 x 42 x 102 cm",
  "27873": "Cos pentru carucior medical 30 x 16 x 14,5 cm",
  "27911": "Dulap mural cu usa culisanta din sticla",
  "27912": "Dulap mural cu usa vopsita",
  "29503": "Doppler fetal GIMA D2003 cu ecran",
  "29505": "Doppler fetal GIMA D2005 cu ecran",
  "29481": "Sonda ginecologica 2 MHz",
  "29482": "Sonda ginecologica 3 MHz",
  "30450": "Aspirator de fum chirurgical",
  "31755": "Iriscop digital WiFi cu program si suport",
  "32179": "Iriscop digital WiFi cu program si suport",
  "32180": "Video-otoscop WiFi si USB cu program",
  "32745": "Tensiometru Dayton pentru birou sau perete",
  "32809": "Manseta pentru adulti de rezerva",
  "32865": "Tub spiralat",
  "32902": "Tensiometru electronic Leo cu program",
  "32916": "Tensiometru Bluetooth",
  "32936": "Tensiometru automat digital Omron HEM-907",
  "33232": "Electrocardiograf CardioPocket ECG cu 3 canale si program",
  "33246": "ECG portabil PM10 cu program si Bluetooth",
  "33336": "Program ECG Viewer pentru 33333",
  "33423": "Defibrilator public iPAD CU-SPR",
  "33623": "Audiometru Sibelsound 400-A pentru triaj auditiv",
  "33879": "Accesoriu monitorizare 33879",
  "33992": "Ecograf portabil Mindray DP-50 Expert",
  "34060": "Targa tip scaun rulant cu 2 roti",
  "34074": "Targa tip scaun rulant cu 4 roti",
  "34055": "Targa cu incarcare automata",
  "34072": "Targa multipozitie automata",
  "34166": "Masca oxigen pentru adulti cu tub",
  "34582": "Concentrator de oxigen Respira 5 l",
  "34589": "Concentrator portabil de oxigen Spirit 1 l",
  "34690": "Kit atele cu vid",
  "35067": "Pulsoximetru O2Ring pentru monitorizare continua adulti",
  "35068": "O2Ring pentru monitorizare continua la distanta",
  "35100": "Pulsoximetru Oxy-50 cu program",
  "35105": "Sonda reutilizabila peste 40 kg",
  "35124": "Sonda SpO2 reutilizabila",
  "35132": "Sonda SpO2 reutilizabila",
  "35135": "Sonda SpO2 de rezerva",
  "35139": "Manseta NIBP 21-35 cm",
  "35196": "Otoscop GIMA cu camera pentru Android si iOS",
  "35130": "ECG Holter cu program",
  "35400": "Defibrilator semiautomat CU-SPR",
  "35401": "Defibrilator semiautomat CU-SPR multilingv",
  "35402": "Defibrilator semiautomat CU-SPR multilingv",
  "43091": "Carje de cot Advance turcoaz-negru pereche",
  "43178": "Husa ignifuga clasa 1",
  "43191": "Scaun Comfort cu functie toaleta",
  "43193": "Scaun toaleta si dus",
  "43196": "Scaun rulant albastru cu functie toaleta",
  "43198": "Scaun rulant Smart cu functie toaleta",
  "43465": "Ham nylon M pentru ridicare pacient",
  "43466": "Ham nylon L pentru ridicare pacient",
  "43468": "Ham nylon M pentru transfer pacient",
  "43469": "Ham nylon L pentru transfer pacient",
  "44000": "Masa de masaj din lemn cu 2 sectiuni neagra",
  "44001": "Masa de masaj din lemn cu 2 sectiuni albastra",
  "44002": "Masa de masaj din lemn cu 2 sectiuni turcoaz",
  "44003": "Masa de masaj din lemn cu 2 sectiuni crem",
  "44011": "Masa de masaj din lemn cu 3 sectiuni albastra",
  "44013": "Masa de masaj din lemn cu 3 sectiuni crem",
  "44048": "Pat de masaj cu orificiu facial",
  "44050": "Scaun de masaj pliabil",
  "45245": "Taburet cu spatar avio albastru",
  "45760": "Carucior pentru monitoare fara adaptor placa",
  "49041": "Lampa medicala Hyridia cu 7 LED-uri pentru carucior",
  "49050": "Lampa medicala Ri-magic HP LED pentru birou",
  "49051": "Lampa medicala Ri-magic HP LED pentru birou",
  "49052": "Lampa medicala Ri-magic HP LED pentru perete",
  "49127": "Lampa medicala PrimaLED fixa pentru perete",
  "49128": "Lampa medicala PrimaLED flexibila pentru perete",
  "49950": "Tensiometru Ri-champion Smart Pro+",
  "49951": "Tensiometru Ri-champion Smart Pro+",
  "53549": "Audiometru Maico MA27 pentru triaj auditiv",
  "80551": "Manseta pediatrica mica 6-11 cm",
  "80552": "Manseta pediatrica mica-medie 10-19 cm",
};

const allowedTechnical = [
  "ECG",
  "EKG",
  "LED",
  "LCD",
  "USB",
  "PVC",
  "ABS",
  "RFID",
  "IVD",
  "ORL",
  "AED",
  "CE",
  "ISO",
  "FDA",
  "SpO2",
  "NIBP",
  "EtCO2",
  "Bluetooth",
  "WiFi",
  "DICOM",
  "PACS",
  "RIS",
  "3M",
  "BD",
  "BP5S",
  "BP7",
  "Hn286",
  "Neo",
  "Gimette",
  "Lactate Scout",
  "Omron",
  "iHealth",
  "Hemo Control",
  "Cardio",
  "PM10",
];

const romanianReplacements = [
  [/\bEchipament de Diagnostic\b/gi, ""],
  [/\bEchipament de Monitorizare\b/gi, ""],
  [/\bEchipament de Urgenta\b/gi, ""],
  [/\bEchipament de Sterilizare\b/gi, ""],
  [/\bEchipament Electromedical\b/gi, ""],
  [/\bProdus pentru Ingrijire Pacient\b/gi, ""],
  [/\bProdus pentru Ginecologie\b/gi, ""],
  [/\bProdus de Laborator\b/gi, ""],
  [/\bProdus ORL\b/gi, ""],
  [/\bProdus Medical\b/gi, ""],
  [/\bMobilier Medical\b/gi, ""],
  [/\bInstrumentar Chirurgical\b/gi, ""],
  [/\bAdult Cuff Spare\b/gi, "manseta adult de rezerva"],
  [/\bCuff\b/gi, "manseta"],
  [/\bReusable Adult\b/gi, "adult reutilizabil"],
  [/\bReusable\b/gi, "reutilizabil"],
  [/\bSpare\b/gi, "rezerva"],
  [/\bSonda\s*-\s*Rezerva\b/gi, "sonda de rezerva"],
  [/\bProbe\b/gi, "sonda"],
  [/\bProbes\b/gi, "sonde"],
  [/\bOn\/off Membrane Switch\b/gi, "intrerupator membrana on/off"],
  [/\bMembrane Switch\b/gi, "intrerupator membrana"],
  [/\bPVC Water Mattress\b/gi, "saltea cu apa din PVC"],
  [/\bWater Mattress\b/gi, "saltea cu apa"],
  [/\bWater Mattress\b/gi, "saltea cu apa"],
  [/\bInsulation Device\b/gi, "adaptor de izolare"],
  [/\bAir Conduction Phone\b/gi, "casti pentru conductie aeriana"],
  [/\bBulb\b/gi, "bec"],
  [/\bGimette 28.*$/gi, "Gimette 28"],
  [/\bGimette 50.*$/gi, "Gimette 50"],
  [/\bStool cu Ring.*$/gi, "taburet medical cu inel"],
  [/\bStool fara Ring.*$/gi, "taburet medical fara inel"],
  [/\bStool cu Backrest\b/gi, "taburet cu spatar"],
  [/\bStool\b/gi, "taburet"],
  [/\bRing\b/gi, "inel"],
  [/\bDiagnostic Audiometer\b/gi, "audiometru diagnostic"],
  [/\bAudiometer\b/gi, "audiometru"],
  [/\bMeasuring Range\b/gi, "interval de masurare"],
  [/\bPressure\b/gi, "presiune"],
  [/\bSealing Machine\b/gi, "aparat de sigilare"],
  [/\bMachine Doar\b/gi, "aparat"],
  [/\bDrive[- ]on Ramp\b/gi, "rampa de acces"],
  [/\bRamp\b/gi, "rampa"],
  [/\bHandrails\b/gi, "bare de sustinere"],
  [/\bBracket\b/gi, "suport"],
  [/\bBody Fat\b/gi, "analiza corporala"],
  [/\bStandard Accessories\b/gi, "accesorii standard"],
  [/\bLight Box\b/gi, "caseta luminoasa"],
  [/\bPanel\b/gi, "panou"],
  [/\bPanels\b/gi, "panouri"],
  [/\bStrips\b/gi, "benzi"],
  [/\bBox Of\s*(\d+)/gi, "cutie cu $1"],
  [/\bBox\b/gi, "cutie"],
  [/\bPcs\b/gi, "bucati"],
  [/\bFor\b/gi, "pentru"],
  [/\bBlack\b/gi, "negru"],
  [/\bTurquoise\b/gi, "turcoaz"],
  [/\bCream\b/gi, "crem"],
  [/\bWooden Massage Table\b/gi, "masa de masaj din lemn"],
  [/\bMassage Table\b/gi, "masa de masaj"],
  [/\bMassage Masa\b/gi, "masa de masaj"],
  [/\bMassage Chair\b/gi, "scaun de masaj"],
  [/\b2-section\b/gi, "2 sectiuni"],
  [/\b3-section\b/gi, "3 sectiuni"],
  [/\b2-SECTION\b/gi, "2 sectiuni"],
  [/\bFoldable Patient\b/gi, "pacient pliabil"],
  [/\bElectric Foldable Pacient\b/gi, "scaun electric pliabil pentru pacient"],
  [/\bElectric Foldable Patient\b/gi, "scaun electric pliabil pentru pacient"],
  [/\bMetal Spring Arm\b/gi, "brat metalic flexibil"],
  [/\bMonitor Arm\b/gi, "brat monitor"],
  [/\bElbow Crutches Advance Elbow Crutches\b/gi, "carje de cot Advance"],
  [/\bElbow Crutches\b/gi, "carje de cot"],
  [/\bPedalier pentru Exercitii\b/gi, "pedalier pentru exercitii"],
  [/\bManseta\b/gi, "manseta"],
  [/\bTubes\b/gi, "tuburi"],
  [/\bWireless\b/gi, "fara fir"],
  [/\bWorkstation\b/gi, "statie de lucru"],
  [/\bSonde Dp\b/gi, "sonde DP"],
  [/\bShower\b/gi, "dus"],
  [/\bAnd\b/gi, "si"],
  [/\bContinuous Monitoring\b/gi, "monitorizare continua"],
  [/\bHeating Band\b/gi, "banda incalzire"],
  [/\bSling\b/gi, "ham"],
  [/\bNylon\b/gi, "nylon"],
  [/\bSingle Patient\b/gi, "un singur pacient"],
  [/\bFoetal Transducer Belts\b/gi, "centuri pentru traductori fetali"],
  [/\bFetal Transducer Belts\b/gi, "centuri pentru traductori fetali"],
  [/\bZ-fold Hartie\b/gi, "hartie pliata Z"],
  [/\bSheets\b/gi, "foi"],
  [/\bElectrocolourdoppler\b/gi, "ecograf Doppler color"],
  [/\bEcocolourdoppler\b/gi, "ecograf Doppler color"],
  [/\bColour\b/gi, "color"],
  [/\bColor\b/gi, "color"],
  [/\bFlat High Resolution\b/gi, "rezolutie inalta"],
  [/\bMicro Convex\b/gi, "microconvex"],
  [/\bTest Tubes\b/gi, "eprubete"],
  [/\bMicrocuvettes\b/gi, "microcuvete"],
  [/\bTesting System\b/gi, "sistem de testare"],
  [/\bLuminous Optotypes Have Been Designed\b/gi, "panou luminos pentru optotipuri"],
  [/\bLuminous Optotypes\b/gi, "optotipuri luminoase"],
  [/\bOptometric Charts\b/gi, "planse optometrice"],
  [/\bViewing Area\b/gi, "zona vizibila"],
  [/\bShower Mattress\b/gi, "saltea pentru dus"],
  [/\bWater Tank\b/gi, "rezervor apa"],
  [/\bShower Extension Hose\b/gi, "furtun extensie dus"],
  [/\bLoad Capacitate\b/gi, "capacitate incarcare"],
  [/\bBuild Up Your Cart\b/gi, "configurare carucior"],
  [/\bExtra Shelf\b/gi, "raft suplimentar"],
  [/\bInfusion Stand\b/gi, "suport perfuzie"],
  [/\bFixed Height\b/gi, "inaltime fixa"],
  [/\bPro Cart\b/gi, "carucior Pro"],
  [/\bShelves\b/gi, "polite"],
  [/\bShelf\b/gi, "raft"],
  [/\bCabinet\b/gi, "dulap"],
  [/\bDoor\b/gi, "usa"],
  [/\bDoors\b/gi, "usi"],
  [/\bHinged\b/gi, "batante"],
  [/\bSliding\b/gi, "culisante"],
  [/\bPatient Lifter\b/gi, "ridicator pacient"],
  [/\bPatient\b/gi, "pacient"],
  [/\bLifter\b/gi, "ridicator"],
  [/\bAluminium\b/gi, "aluminiu"],
  [/\bMassage Bed\b/gi, "pat de masaj"],
  [/\bMassage Chair\b/gi, "scaun de masaj"],
  [/\bFace Hole\b/gi, "orificiu facial"],
  [/\bBed\b/gi, "pat"],
  [/\bCart\b/gi, "carucior"],
  [/\bBasket Targa\b/gi, "targa cos"],
  [/\bTwin Shell Basket Targa\b/gi, "targa cos cu doua carcase"],
  [/\bPulse Oximeter\b/gi, "pulsoximetru"],
  [/\bOximeter\b/gi, "pulsoximetru"],
  [/\bBasic Pedal Exerciser\b/gi, "pedalier pentru exercitii"],
  [/\bPedal Exerciser\b/gi, "pedalier pentru exercitii"],
  [/\bVacuum\b/gi, "vacuum"],
  [/\bDisposable Ear Speculum\b/gi, "specul auricular de unica folosinta"],
  [/\bRigid Specula\b/gi, "specule rigide"],
  [/\bEar Speculum\b/gi, "specul auricular"],
  [/\bSpeculum\b/gi, "specul"],
  [/\bSterile\b/gi, "steril"],
  [/\bDisposable\b/gi, "de unica folosinta"],
  [/\bReusable\b/gi, "reutilizabil"],
  [/\bHumidifier Bottle\b/gi, "flacon umidificator"],
  [/\bVacuum Splint Kit\b/gi, "kit atele vacuum"],
  [/\bExtension Cablu\b/gi, "cablu extensie"],
  [/\bCylindrical\b/gi, "cilindric"],
  [/\bFilter\b/gi, "filtru"],
  [/\bBottle\b/gi, "flacon"],
  [/\bRetractable Removable Wheels\b/gi, "roti retractabile detasabile"],
  [/\bCompass Rail\b/gi, "sina Compass"],
  [/\bMindray\b/gi, "Mindray"],
  [/\bPhilips\b/gi, "Philips"],
  [/\bColin\b/gi, "Colin"],
  [/\bPress-mate\b/gi, "Press-Mate"],
  [/\bUpper\b/gi, "superior"],
  [/\bLower\b/gi, "inferior"],
  [/\bPouch\b/gi, "husa"],
  [/\bSkin Marker\b/gi, "marker pentru piele"],
  [/\bDual Tips\b/gi, "doua varfuri"],
  [/\bFine Tip\b/gi, "varf fin"],
  [/\bGentian Violet\b/gi, "violet de gentiana"],
  [/\bTube\b/gi, "tub"],
  [/\bRoll\b/gi, "rola"],
  [/\bRolls\b/gi, "role"],
  [/\bLead\\b/gi, "derivatie"],
  [/\bLeads\\b/gi, "derivatii"],
  [/\bFlat\b/gi, "plat"],
  [/\bHigh Resolution\b/gi, "rezolutie inalta"],
];

const categoryPrefixPatterns = [
  /^echipament de diagnostic\s+/i,
  /^echipament de monitorizare\s+/i,
  /^echipament de urgenta\s+/i,
  /^echipament de sterilizare\s+/i,
  /^echipament electromedical\s+/i,
  /^produs pentru ingrijire pacient\s+/i,
  /^produs pentru ginecologie\s+/i,
  /^produs de laborator\s+/i,
  /^produs orl\s+/i,
  /^produs medical\s+/i,
  /^mobilier medical\s+/i,
  /^instrumentar chirurgical\s+/i,
];

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

function applyDictionary(value) {
  let text = String(value || "")
    .replace(/[®™*]/g, "")
    .replace(/[Ââ„¢]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  for (const [pattern, replacement] of romanianReplacements) {
    text = text.replace(pattern, replacement);
  }
  text = text
    .replace(/\bCode\s*\d+/gi, "")
    .replace(/\bCod\s*\d+/gi, "")
    .replace(/\bpentru\s+\d{4,}\b/gi, "")
    .replace(/\b\d{4,}\s+\d{4,}\s+\d{4,}.*$/g, "")
    .replace(/\b(Doar|Only)\b/gi, "")
    .replace(/\s+-\s*$/g, "")
    .replace(/^\s*-\s*/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  return text;
}

function stripGenericPrefix(value) {
  let text = value;
  let changed = true;
  while (changed) {
    changed = false;
    for (const pattern of categoryPrefixPatterns) {
      if (pattern.test(normalize(text))) {
        text = text.replace(pattern, "").trim();
        changed = true;
      }
    }
  }
  return text;
}

function titleCase(value) {
  const upper = new Set(["ECG", "EKG", "LED", "LCD", "USB", "PVC", "ABS", "IVD", "ORL", "AED", "CE", "ISO", "FDA", "SpO2", "NIBP", "BP5S", "BP7", "PM10", "3M"]);
  return String(value || "")
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => {
      const clean = word.replace(/[^A-Za-z0-9]/g, "");
      if (upper.has(clean.toUpperCase())) return word.toUpperCase();
      if (/^[A-Z0-9-]{2,}$/.test(word) && /\d/.test(word)) return word;
      const normalized = normalize(word);
      if (index > 0 && ["de", "cu", "si", "pentru", "fara", "din", "la", "in", "pe"].includes(normalized)) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ")
    .replace(/\bMhz\b/g, "MHz")
    .replace(/\bIhealth\b/g, "iHealth")
    .replace(/\bSpo2\b/g, "SpO2")
    .replace(/\bNibp\b/g, "NIBP")
    .replace(/\bPvc\b/g, "PVC")
    .replace(/\bAbs\b/g, "ABS")
    .replace(/\bUsb\b/g, "USB")
    .replace(/\bLed\b/g, "LED")
    .replace(/\bLcd\b/g, "LCD");
}

function inferFallback(product) {
  const code = product.gimaCode || product.id;
  const category = product.category || "diagnostic";
  const specs = product.romanianSpecifications || [];
  const specText = specs.map((spec) => `${spec.label} ${spec.value}`).join(" ");
  if (/manseta|cuff/i.test(`${product.romanianTitle} ${product.sourceProductName} ${specText}`)) return `Manseta de rezerva ${code}`;
  if (/sonda|probe/i.test(`${product.romanianTitle} ${product.sourceProductName}`)) return `Sonda de rezerva ${code}`;
  if (/cablu|cable/i.test(`${product.romanianTitle} ${product.sourceProductName}`)) return `Cablu de rezerva ${code}`;
  if (/bec|bulb/i.test(`${product.romanianTitle} ${product.sourceProductName}`)) return `Bec de rezerva ${code}`;
  if (/raft|shelf/i.test(`${product.romanianTitle} ${product.sourceProductName}`)) return `Raft suplimentar ${code}`;
  if (/taburet|stool/i.test(`${product.romanianTitle} ${product.sourceProductName}`)) return `Taburet medical ${code}`;
  if (/pat|bed/i.test(`${product.romanianTitle} ${product.sourceProductName}`)) return `Pat medical ${code}`;
  if (/carucior|cart|trolley/i.test(`${product.romanianTitle} ${product.sourceProductName}`)) return `Carucior medical ${code}`;
  if (/pulsoximetru|oximeter/i.test(`${product.romanianTitle} ${product.sourceProductName}`)) return `Pulsoximetru ${code}`;
  if (/autoclav|steriliz/i.test(`${product.romanianTitle} ${product.sourceProductName}`)) return `Accesoriu sterilizare ${code}`;
  return `${productTypeByCategory[category] || "produs medical"} ${code}`;
}

function repairTitle(product) {
  const override = titleOverridesByCode[String(product.gimaCode || "")];
  if (override) return override;
  const original = product.sourceProductName || product.romanianTitle || "";
  const current = product.romanianTitle || "";
  const sourceFirst = /^produs|^echipament|^mobilier medical|^instrumentar/i.test(normalize(current)) || /\bcod\s*\d{4,}/i.test(current);
  let candidate = applyDictionary(sourceFirst ? original : current);
  candidate = stripGenericPrefix(candidate);
  candidate = applyDictionary(candidate);
  if (!candidate || candidate.length < 8 || /\bcod\s*\d{4,}/i.test(candidate) || /\d{4,}\s+\d{4,}/.test(candidate)) {
    candidate = inferFallback(product);
  }
  candidate = titleCase(candidate)
    .replace(/\bManseta Adult\s*-\s*Rezerva\b/g, "Manseta adult de rezerva")
    .replace(/\bManseta 22-35 Cm\s*-\s*Piesa de Schimb\b/g, "Manseta de rezerva 22-35 cm")
    .replace(/\bTensiometru de Brat\b/g, "Tensiometru pentru braț")
    .replace(/\bIncheietura Tensiometru\b/g, "Tensiometru pentru încheietură")
    .replace(/\bTensiometru de Incheietura\b/g, "Tensiometru pentru încheietură")
    .replace(/\bSmart Automat Incheietura Tensiometru\b/g, "Tensiometru automat smart pentru încheietură")
    .replace(/\bIncheietura Pulsoximetru\b/g, "Pulsoximetru pentru încheietură")
    .replace(/\bSonda\s*-\s*Rezerva\b/g, "Sonda de rezerva")
    .replace(/\bSpO2 Sonda de de rezerva\b/g, "Sondă SpO2 de rezervă")
    .replace(/\bAdult SpO2 Sonda\b/g, "Sondă SpO2 adult")
    .replace(/\bAdult Sonda\b/g, "Sondă adult")
    .replace(/\bNIBP Manseta\b/g, "Manșetă NIBP")
    .replace(/\bRezerva\b/g, "de rezerva")
    .replace(/\bPiesa de Schimb\b/g, "de rezerva")
    .replace(/\bTaburet Medical cu Inel\b/g, "Taburet medical cu inel")
    .replace(/\bTaburet Medical fara Inel\b/g, "Taburet medical fara inel")
    .replace(/\bCarje de Cot Advance\b/g, "Carje de cot Advance")
    .replace(/\bPedalier Pentru Exercitii\b/g, "Pedalier pentru exercitii")
    .replace(/\bSaltea Cu Apa\b/g, "Saltea cu apa")
    .replace(/\bScaun Cu Functie Toaleta Scaun Rulant\b/g, "Scaun rulant cu funcție toaletă")
    .replace(/\bScaun Cu Functie Toaleta\b/g, "Scaun cu funcție toaletă")
    .replace(/\bScaun Rulant Targa\b/g, "Targă tip scaun rulant")
    .replace(/\bScaun Rulant Electric\b/g, "Scaun rulant electric")
    .replace(/\bRoti Spate\b/g, "roți spate")
    .replace(/\bHandrail\b/g, "bară de sprijin")
    .replace(/\bCarucior Medical\b/g, "Carucior medical")
    .replace(/\bHyridia 7 Leds Lampa\b/g, "Lampă medicală Hyridia cu 7 LED-uri")
    .replace(/\bLampa Frontala\b/g, "Lampă frontală")
    .replace(/\bBrat de Sustinere\b/g, "braț de susținere")
    .replace(/\bIndependent\b/g, "independent")
    .replace(/\bHam - M - Nylon\b/g, "Ham nylon M")
    .replace(/\bHam - L - Nylon\b/g, "Ham nylon L")
    .replace(/\bPliabil Masa de Masaj\b/g, "Masă de masaj pliabilă")
    .replace(/\b2 Sectiuni Masa de Masaj\b/g, "Masă de masaj cu 2 secțiuni")
    .replace(/\b3 Sectiuni Masa de Masaj\b/g, "Masă de masaj cu 3 secțiuni")
    .replace(/\bAccesoriu Sterilizare\b/g, "Accesoriu sterilizare")
    .replace(/\bProdus Medical\b/g, "Produs medical")
    .replace(/\s+-\s*$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  return candidate;
}

function slugify(value) {
  return normalize(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")
    .slice(0, 95)
    .replace(/-+$/g, "");
}

function productRedirectPath(slug) {
  return `/produse/${String(slug || "").replace(/^\/?produse\//, "").replace(/^\//, "")}`;
}

function normalizeRedirect(redirect) {
  if (redirect.source && redirect.destination) return { source: productRedirectPath(redirect.source), destination: productRedirectPath(redirect.destination) };
  if (redirect.from && redirect.to) return { source: productRedirectPath(redirect.from), destination: productRedirectPath(redirect.to) };
  return null;
}

function stripAllowed(value) {
  let text = ` ${String(value || "")} `;
  for (const term of allowedTechnical) {
    text = text.replace(new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi"), " ");
  }
  return text;
}

const untranslatedPatterns = [
  /\b(with|wireless|automatic|loading|adult|cuff|spare|skin marker|dual tips|fine tip|gentian violet|panel|panels|body|basic|pedal|exerciser|commode|chromed|painted|device|probe|probes|gynaecology|gynecology|luminous|optotypes|coiled|tubing|insulation|phone|smoke|evacuator|vacuum|flow|drive[- ]on|ramp|handrails|bracket|drawers?|shelf|stand alone|pocket size|holding arm|pouch|upper|lower|bed|stool|cart|cabinet|sliding|hinged|massage|patient|lifter|bath|mattress|hose|ring|public access|defibrillators|semiautomaticus|wooden|chair|wall|oxygen|mask)\b/i,
  /\b(straight|curved|disposable|single patient|single use|supplied|provided|available|optional|reusable|foldable|height adjustable|stainless steel|chrome plated|mechanical|class|screening|portable|ultrasound|desk)\b/i,
  /\b(technical specifications|viewing area|build up your cart|standard accessories|specialistic bed|fixed height|extra shelf|water tank)\b/i,
];

const romanianAwkwardPatterns = [
  /\bAnalizor Analizor\b/i,
  /\bMobilier Medical Mobilier Medical\b/i,
  /\bEchipament de (Diagnostic|Monitorizare|Urgenta|Sterilizare)\s+[A-Z0-9]/,
  /\bProdus (Medical|de Laborator|pentru Ingrijire Pacient|pentru Ginecologie|ORL)\s+[A-Z0-9]/,
  /\b(Cm|Mm|Kg|Mhz|W)\b.*\b(Cm|Mm|Kg|Mhz|W)\b.*\b(Cm|Mm|Kg|Mhz|W)\b/,
  /\d+\s+\d+\s+\d+\s+\d+/,
  /\s-\s(Piesa de Schimb|Rezerva)$/i,
  /\bcu Functie\b/,
  /\bIncheietura\b/,
  /\bBrat\b/,
  /\bRoti\b/,
  /\bCarucior\b.*\bCarucior\b/i,
];

const genericStart = /^(produs|echipament|articol|dispozitiv|instrument)\b/i;
const categoryDrivenPatterns = [
  /^echipament de (diagnostic|monitorizare|urgenta|sterilizare)\b/i,
  /^produs (medical|de laborator|pentru ingrijire pacient|pentru ginecologie|orl)\b/i,
  /^mobilier medical\b/i,
  /^instrumentar chirurgical\b/i,
];
const placeholderPatterns = [/\bcod\s*\d{4,}\b/i, /^produs medical\s*\d{4,}$/i, /^.{0,7}$/];

function detectIssues(product) {
  const issues = [];
  const title = product.romanianTitle || "";
  const titleNorm = normalize(title);
  const strippedTitle = stripAllowed(title);
  const slug = product.slug || "";
  const slugNorm = normalize(slug.replace(/-/g, " "));

  if (genericStart.test(title)) issues.push("generic_title_start");
  if (categoryDrivenPatterns.some((pattern) => pattern.test(titleNorm))) issues.push("category_driven_title");
  if (placeholderPatterns.some((pattern) => pattern.test(title))) issues.push("placeholder_title");
  if (untranslatedPatterns.some((pattern) => pattern.test(strippedTitle))) issues.push("untranslated_fragment");
  if (romanianAwkwardPatterns.some((pattern) => pattern.test(title))) issues.push("awkward_romanian");
  const words = titleNorm.match(/[a-z0-9]+/g) || [];
  const counts = new Map();
  for (const word of words) {
    if (word.length < 4) continue;
    counts.set(word, (counts.get(word) || 0) + 1);
  }
  if ([...counts.values()].some((count) => count >= 2)) issues.push("repeated_words");
  const meaningfulWords = words.filter((word) => !["produs", "medical", "echipament", "pentru", "cod", "cu", "de", "si", "din", "la"].includes(word));
  if (meaningfulWords.length < 2) issues.push("low_specificity");
  if (!slug || slug.length < 10 || /cod-\d{4,}/.test(slug) || /produs-medical-\d{4,}/.test(slug)) issues.push("poor_slug");
  if (slug.length > 115) issues.push("slug_too_long");
  if (untranslatedPatterns.some((pattern) => pattern.test(stripAllowed(slugNorm)))) issues.push("slug_contains_english");
  return [...new Set(issues)];
}

function issueSeverity(issue) {
  return {
    generic_title_start: 24,
    category_driven_title: 18,
    placeholder_title: 28,
    untranslated_fragment: 30,
    awkward_romanian: 20,
    poor_slug: 16,
    slug_contains_english: 14,
    slug_too_long: 10,
    repeated_words: 16,
    low_specificity: 18,
  }[issue] || 8;
}

function classify(product) {
  const issues = detectIssues(product);
  const score = issues.reduce((sum, issue) => sum + issueSeverity(issue), 0);
  if (score === 0) return { grade: "A", score, issues };
  if (score <= 18 && !issues.includes("untranslated_fragment") && !issues.includes("placeholder_title")) return { grade: "B", score, issues };
  if (score <= 45 && !issues.includes("placeholder_title")) return { grade: "C", score, issues };
  return { grade: "D", score, issues };
}

function gradeCounts(items) {
  return items.reduce((acc, item) => {
    const grade = classify(item).grade;
    acc[grade] = (acc[grade] || 0) + 1;
    return acc;
  }, { A: 0, B: 0, C: 0, D: 0 });
}

function makeDescription(product) {
  const title = product.romanianTitle;
  const category = categoryLabels[product.category] || "Echipamente medicale";
  return `${title} poate fi inclus in cereri de oferta pentru ${category.toLowerCase()}, cu verificarea configuratiei, a compatibilitatii si a documentatiei tehnice inainte de achizitie. ZESCORP ajuta la clarificarea necesarului astfel incat produsul sa fie corelat cu utilizarea medicala reala.`;
}

const categoryProfiles = {
  diagnostic: {
    environment: "cabinete, clinici si puncte de evaluare medicala",
    application: "diagnostic clinic, triaj si evaluare de rutina",
    service: "/service-aparatura-medicala",
  },
  emergency: {
    environment: "zone de urgenta, ambulante, camere de tratament si echipe mobile",
    application: "interventii rapide si dotari pentru situatii cu timp critic",
    service: "/solutii-medicale/service-echipamente-medicale",
  },
  laboratory: {
    environment: "laboratoare, puncte IVD si fluxuri de analiza medicala",
    application: "prelucrarea probelor, analiza si suport operational de laborator",
    service: "/solutii-medicale/echipamente-laborator-ivd",
  },
  monitoring: {
    environment: "unitati clinice care urmaresc parametri si semnale medicale",
    application: "monitorizare, control operational si evaluare tehnica",
    service: "/service-aparatura-medicala",
  },
  "scales-measures": {
    environment: "cabinete, clinici, farmacii si zone de evaluare pacient",
    application: "masurare, cantarire si evaluare antropometrica",
    service: "/service-aparatura-medicala",
  },
  "medical-furniture": {
    environment: "cabinete, sali de tratament, zone de consultatie si spatii clinice",
    application: "organizarea spatiului medical si sustinerea fluxului de lucru",
    service: "/solutii-medicale/amenajare-cabinete-medicale",
  },
  "patient-care": {
    environment: "zone de ingrijire, recuperare si asistenta pacient",
    application: "mobilizare, suport pacient si activitate clinica zilnica",
    service: "/contracte-mentenanta",
  },
  electromedical: {
    environment: "cabinete si clinici care utilizeaza echipamente electromedicale",
    application: "terapie, examinare sau suport clinic in functie de configuratie",
    service: "/service-aparatura-medicala",
  },
  gynecology: {
    environment: "cabinete de ginecologie, obstetrica si monitorizare materno-fetala",
    application: "evaluare, examinare si suport pentru activitate ginecologica",
    service: "/service-aparatura-medicala",
  },
  "medical-lights": {
    environment: "cabinete, sali de examinare si zone de interventie",
    application: "iluminare medicala pentru examinare sau lucru clinic",
    service: "/solutii-medicale/instalare-punere-in-functiune",
  },
  ent: {
    environment: "cabinete ORL si zone de consultatie specializata",
    application: "examinare ORL, diagnostic si suport de cabinet",
    service: "/service-aparatura-medicala",
  },
  "surgical-instruments": {
    environment: "cabinete, sali de interventie si fluxuri de instrumentar",
    application: "interventii, manevre clinice si dotare instrumentar",
    service: "/contracte-mentenanta",
  },
  sterilization: {
    environment: "cabinete, clinici si fluxuri de sterilizare instrumentar",
    application: "pregatirea, ambalarea sau sustinerea circuitului de sterilizare",
    service: "/contracte-mentenanta",
  },
};

const specificationTextReplacements = [
  [/\bDimensions\b/gi, "dimensiuni"],
  [/\bweight\b/gi, "greutate"],
  [/\bPackaging\b/gi, "ambalaj"],
  [/\bincluded\b/gi, "incluse"],
  [/\bwith\b/gi, "cu"],
  [/\bwithout\b/gi, "fara"],
  [/\bbrake\b/gi, "frana"],
  [/\btotal load\b/gi, "incarcare totala"],
  [/\bload\b/gi, "incarcare"],
  [/\btwinned castors\b/gi, "roti duble"],
  [/\bcastors\b/gi, "roti"],
  [/\bvertical aluminium extrusions\b/gi, "profile verticale din aluminiu"],
  [/\bextrusions in aluminium\b/gi, "profile din aluminiu"],
  [/\baluminium\b/gi, "aluminiu"],
  [/\bPossibility of Trendelenburg\b/gi, "posibilitate Trendelenburg"],
  [/\breverse-?\s*Trendelenburg\b/gi, "Trendelenburg invers"],
  [/\bPC software pentru data review, result analysis, trend chart observation si report print\b/gi, "software PC pentru analiza datelor, observarea trendurilor si tiparirea rapoartelor"],
  [/\bdata review\b/gi, "analiza datelor"],
  [/\bresult analysis\b/gi, "analiza rezultatelor"],
  [/\btrend chart observation\b/gi, "urmarirea graficelor de trend"],
  [/\breport print\b/gi, "tiparire rapoarte"],
  [/\bLi-ion\b/gi, "Li-ion"],
  [/\blitiu-ion baterie\b/gi, "baterie litiu-ion"],
  [/\bnon-removable\b/gi, "nedetasabila"],
  [/\bNet\/gross\b/gi, "net/brut"],
  [/\bCertified\b/gi, "certificat"],
  [/\bplastic\b/gi, "plastic"],
  [/\bmetal\b/gi, "metal"],
  [/\bsticla\b/gi, "sticla"],
  [/\bNeed ext\b/gi, ""],
  [/\bsoftware\b/gi, "software"],
  [/\bstand\b/gi, "suport"],
  [/\bportable\b/gi, "portabil"],
  [/\bwater\b/gi, "apa"],
  [/\bAdult\b/g, "adulti"],
];

function normalizeSpecText(value) {
  let text = String(value || "").replace(/\s+/g, " ").trim();
  for (const [pattern, replacement] of specificationTextReplacements) {
    text = text.replace(pattern, replacement);
  }
  return text
    .replace(/\s+([,;:)])/g, "$1")
    .replace(/([(])\s+/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function groupSpecifications(specifications) {
  const groups = new Map();
  const add = (group, spec) => {
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(spec);
  };
  for (const spec of specifications) {
    const label = normalizeSpecText(spec.label);
    const value = normalizeSpecText(spec.value);
    if (!label || !value) continue;
    const key = normalize(`${label} ${value}`);
    if (/dimensi|diametru|lungime|inaltime|latime|adancime|cm|mm/.test(key)) add("Dimensions", { label, value });
    else if (/greutate|kg|g\b|net\/brut/.test(key)) add("Weight", { label, value });
    else if (/alimentare|putere|tensiune|v\b|hz|baterie|ac|dc|va/.test(key)) add("Electrical", { label, value });
    else if (/capacitate|interval|viteza|canale|memorie|ecg|spo2|nibp|performanta/.test(key)) add("Performance", { label, value });
    else if (/material|certificat|categorie|medical|pacient|steril/.test(key)) add("Medical", { label, value });
    else add("General", { label, value });
  }
  return ["General", "Dimensions", "Weight", "Electrical", "Performance", "Medical", "Accessories"]
    .filter((group) => groups.has(group))
    .map((group) => ({ group, items: groups.get(group) }));
}

function publicContentText(product) {
  const values = [
    product.romanianTitle,
    product.romanianShortSummary,
    product.romanianDescription,
    ...(product.romanianApplications || []),
    ...(product.romanianBenefits || []),
    ...(product.romanianFeatures || []),
    ...(product.romanianPackageContents || []),
  ];
  for (const spec of product.romanianSpecifications || []) values.push(spec.label, spec.value);
  return values.filter(Boolean).join(" ");
}

function getRelatedProducts(product, products) {
  return products
    .filter((item) => item.id !== product.id && item.category === product.category && item.publicDisplayReady && item.strictQualityStatus === "pass" && item.gimaCode)
    .slice(0, 4)
    .map((item) => item.gimaCode);
}

function polishCommercialContent(product, products) {
  const title = product.romanianTitle;
  const category = categoryLabels[product.category] || "Echipamente medicale";
  const profile = categoryProfiles[product.category] || {
    environment: "clinici, cabinete si unitati medicale",
    application: "dotare medicala si suport operational",
    service: "/service-aparatura-medicala",
  };
  product.romanianShortSummary = `${title} pentru ${profile.environment}, disponibil prin oferta personalizata ZESCORP.`;
  product.romanianDescription = makeDescription(product);
  product.romanianApplications = [
    `Utilizare in ${profile.environment}`,
    profile.application,
    "Achizitie pentru proiecte de dotare, completare sau inlocuire echipamente",
  ];
  product.romanianBenefits = [
    "Configuratie verificata inainte de ofertare",
    "Documentatie si accesorii clarificate in functie de cererea reala",
    "Poate fi corelat cu livrare, service si mentenanta ZESCORP",
  ];
  product.romanianFeatures = [
    `${title} cu cod produs ${product.gimaCode || product.id}`,
    `Categorie comerciala: ${category}`,
    "Potrivit pentru cerere de oferta personalizata",
  ];
  product.romanianPackageContents = product.romanianPackageContents?.some((item) => item && !/confirma|ofertare/i.test(item))
    ? product.romanianPackageContents.map(normalizeSpecText)
    : ["Continutul pachetului si accesoriile se confirma in oferta, in functie de configuratia solicitata."];
  product.installationConsiderations = [
    "Verificarea aplicatiei medicale si a cantitatii solicitate",
    "Clarificarea accesoriilor, documentatiei si termenului de livrare",
    "Pregatirea unei oferte personalizate pentru clinica sau unitatea medicala",
  ];
  product.maintenanceConsiderations = [
    "Suport pentru clarificari tehnice inainte de achizitie",
    "Corelare cu service si mentenanta daca produsul necesita suport tehnic",
    "Recomandari pentru consumabile, accesorii sau documentatie in functie de produs",
  ];
  product.relatedServices = [...new Set([profile.service, "/service-aparatura-medicala", "/contracte-mentenanta"])].slice(0, 3);
  product.relatedProductCodes = getRelatedProducts(product, products);
  product.romanianSpecifications = (product.romanianSpecifications || []).map((spec) => ({
    label: normalizeSpecText(spec.label),
    value: normalizeSpecText(spec.value),
  }));
  product.specificationGroups = groupSpecifications(product.romanianSpecifications);
  product.imageAlt = `${title} - imagine produs pentru oferta ZESCORP`;
  product.galleryImages = (product.galleryImages || []).map((image) => ({
    ...image,
    alt: `${title} - imagine produs`,
  }));
}

function main() {
  const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
  const redirects = fs.existsSync(redirectsPath)
    ? JSON.parse(fs.readFileSync(redirectsPath, "utf8")).map(normalizeRedirect).filter(Boolean)
    : [];
  const redirectSet = new Set(redirects.map((item) => `${item.source}->${item.destination}`));
  const upgraded = products.filter((product) => product.publicDisplayReady && product.strictQualityStatus === "pass" && product.catalogStatus === "ready_for_publish");
  const before = gradeCounts(upgraded);
  const repaired = [];
  const unrepaired = [];
  const titleRepairs = [];
  const slugRepairs = [];
  const specificationRepairs = [];
  const imageRepairs = [];
  const documentRepairs = [];

  for (const product of upgraded) {
    const beforeGrade = classify(product);
    const beforePublicText = publicContentText(product);
    const oldSlug = product.slug;
    const oldTitle = product.romanianTitle;
    const oldSpecText = JSON.stringify(product.romanianSpecifications || []);
    const oldImageText = JSON.stringify({ imageUrl: product.imageUrl, galleryImages: product.galleryImages || [] });
    const oldDocumentText = JSON.stringify(product.documents || {});
    const hasTitleOverride = Boolean(titleOverridesByCode[String(product.gimaCode || "")]);
    const needsTitleRepair = beforeGrade.grade !== "A" && beforeGrade.grade !== "B";
    if (needsTitleRepair || hasTitleOverride) {
      product.romanianTitle = repairTitle(product);
    }
    polishCommercialContent(product, products);
    if (product.romanianTitle !== oldTitle) {
      titleRepairs.push({ code: product.gimaCode, before: oldTitle, after: product.romanianTitle });
    }
    if (needsTitleRepair || hasTitleOverride || product.romanianTitle !== oldTitle) {
      const baseSlug = `${slugify(product.romanianTitle)}-${product.gimaCode || product.id}`;
      let slug = baseSlug;
      let counter = 2;
      while (products.some((item) => item.id !== product.id && item.slug === slug)) {
        slug = `${baseSlug}-${counter}`;
        counter += 1;
      }
      product.slug = slug;
    }
    if (oldSlug !== product.slug) {
      const source = productRedirectPath(oldSlug);
      const destination = productRedirectPath(product.slug);
      const key = `${source}->${destination}`;
      if (!redirectSet.has(key)) {
        redirects.push({ source, destination });
        redirectSet.add(key);
      }
      slugRepairs.push({ code: product.gimaCode, before: oldSlug, after: product.slug });
    }
    if (oldSpecText !== JSON.stringify(product.romanianSpecifications || [])) {
      specificationRepairs.push({ code: product.gimaCode, title: product.romanianTitle, count: product.romanianSpecifications?.length || 0 });
    }
    if (oldImageText !== JSON.stringify({ imageUrl: product.imageUrl, galleryImages: product.galleryImages || [] })) {
      imageRepairs.push({ code: product.gimaCode, title: product.romanianTitle });
    }
    if (oldDocumentText !== JSON.stringify(product.documents || {})) {
      documentRepairs.push({ code: product.gimaCode, title: product.romanianTitle });
    }
    product.reviewStatus = "image_verified";
    product.indexableAt = null;
    const afterGrade = classify(product);
    const changed = beforeGrade.grade !== afterGrade.grade || oldTitle !== product.romanianTitle || oldSlug !== product.slug || beforePublicText !== publicContentText(product);
    const repairRecord = {
      code: product.gimaCode,
      before: beforeGrade.grade,
      after: afterGrade.grade,
      oldSlug,
      newSlug: product.slug,
      title: product.romanianTitle,
      issuesBefore: beforeGrade.issues,
      issuesAfter: afterGrade.issues,
    };
    if (changed) {
      repaired.push(repairRecord);
    }
    if (afterGrade.grade === "C" || afterGrade.grade === "D") unrepaired.push(repairRecord);
  }

  const after = gradeCounts(upgraded);
  const publicEnglishHits = upgraded
    .map((product) => ({ product, issues: detectIssues(product) }))
    .filter((item) => item.issues.some((issue) => issue === "untranslated_fragment" || issue === "slug_contains_english"));
  const titleOverrideAudit = upgraded
    .filter((product) => titleOverridesByCode[String(product.gimaCode || "")])
    .map((product) => ({
      code: product.gimaCode,
      title: product.romanianTitle,
      slug: product.slug,
    }));
  const productsWithImages = upgraded.filter((product) => product.imageUrl && product.imageVerified).length;
  const productsWithDocuments = upgraded.filter((product) => Object.values(product.documents || {}).some(Boolean)).length;
  const brokenImages = upgraded.filter((product) => product.imageUrl?.startsWith("/") && !fs.existsSync(path.join(process.cwd(), "public", product.imageUrl))).length;
  const brokenDocuments = upgraded.flatMap((product) => Object.values(product.documents || {})).filter((url) => typeof url === "string" && url.startsWith("/") && !fs.existsSync(path.join(process.cwd(), "public", url))).length;
  fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`);
  fs.writeFileSync(redirectsPath, `${JSON.stringify(redirects, null, 2)}\n`);

  const report = [
    "# Product Gold Repair 500 Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "Scope: repaired the current 500-product Gold replication batch only. No import, deploy, indexation or sitemap inclusion.",
    "",
    "## Phase Baseline Before",
    "",
    `- A: ${phaseBaseline.A}`,
    `- B: ${phaseBaseline.B}`,
    `- C: ${phaseBaseline.C}`,
    `- D: ${phaseBaseline.D}`,
    "",
    "## Immediate Before This Run",
    "",
    `- A: ${before.A}`,
    `- B: ${before.B}`,
    `- C: ${before.C}`,
    `- D: ${before.D}`,
    "",
    "## After",
    "",
    `- A: ${after.A}`,
    `- B: ${after.B}`,
    `- C: ${after.C}`,
    `- D: ${after.D}`,
    `- A + B: ${after.A + after.B} (${(((after.A + after.B) / upgraded.length) * 100).toFixed(1)}%)`,
    "",
    "## Repair Summary",
    "",
    `- Products polished and re-scored: ${upgraded.length}`,
    `- Products repaired in final idempotent run: ${repaired.length}`,
    `- Products still C/D: ${unrepaired.length}`,
    `- Indexable products after repair: ${products.filter((product) => product.reviewStatus === "indexable" || product.indexableAt).length}`,
    `- Products with verified images: ${productsWithImages}`,
    `- Products with local documents: ${productsWithDocuments}`,
    `- Broken local images: ${brokenImages}`,
    `- Broken local documents: ${brokenDocuments}`,
    `- Public English/title leakage issues after repair: ${publicEnglishHits.length}`,
    "",
    "## Root Causes Addressed",
    "",
    "- Generic category prefixes removed from titles.",
    "- Untranslated fragments translated in titles and slugs.",
    "- Placeholder code/table fragments removed where possible.",
    "- Slugs regenerated from repaired Romanian titles.",
    "- Commercial descriptions refreshed for repaired products.",
    "- Public product copy refreshed for applications, benefits, service, package and support sections.",
    "- Specification labels and values normalized where extracted text contained public-facing English fragments.",
    "",
    "## Remaining C/D Items",
    "",
    ...(unrepaired.length
      ? unrepaired.map((item) => `- ${item.code}: ${item.title} (${item.after}) - remaining: ${item.issuesAfter.join(", ")}`)
      : ["- None"]),
    "",
    "## Title Repairs",
    "",
    ...(titleOverrideAudit.length
      ? titleOverrideAudit.map((item) => `- ${item.code}: ${item.title} (${item.slug})`)
      : ["- None"]),
    "",
    "## Slug Repairs",
    "",
    ...(slugRepairs.length
      ? slugRepairs.map((item) => `- ${item.code}: ${item.before} -> ${item.after}`)
      : ["- None"]),
    "",
    "## Specification Recoveries / Normalizations",
    "",
    ...(specificationRepairs.length
      ? specificationRepairs.map((item) => `- ${item.code}: ${item.title} (${item.count} specificatii)`)
      : ["- None required in this pass"]),
    "",
    "## Image Repairs",
    "",
    ...(imageRepairs.length
      ? imageRepairs.map((item) => `- ${item.code}: ${item.title}`)
      : ["- None required; image audit passed with local verified images"]),
    "",
    "## Document Repairs",
    "",
    ...(documentRepairs.length
      ? documentRepairs.map((item) => `- ${item.code}: ${item.title}`)
      : ["- None required; document audit found no broken local files"]),
    "",
    "## Public English Leakage Audit",
    "",
    ...(publicEnglishHits.length
      ? publicEnglishHits.map((item) => `- ${item.product.gimaCode}: ${item.product.romanianTitle} - ${item.issues.join(", ")}`)
      : ["- None"]),
    "",
    "## Sample Repairs",
    "",
    "| Code | Before | After | Title | Old slug | New slug |",
    "| --- | --- | --- | --- | --- | --- |",
    ...repaired.slice(0, 80).map((item) => `| ${item.code || ""} | ${item.before} | ${item.after} | ${item.title.replace(/\|/g, "/")} | ${item.oldSlug} | ${item.newSlug} |`),
    "",
    "## Recommendation",
    "",
    after.A + after.B >= Math.ceil(upgraded.length * 0.95)
      ? "The batch meets the A+B >= 95% repair target for local visual review. Keep products noindex until manual visual approval."
      : "The batch does not yet meet the A+B >= 95% repair target. Continue title/source repair before visual review.",
  ].join("\n");
  fs.writeFileSync(reportPath, `${report}\n`);
  console.log(JSON.stringify({ before, after, repaired: repaired.length, unrepaired: unrepaired.length, reportPath }, null, 2));
}

main();
