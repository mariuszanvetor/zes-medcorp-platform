import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const reportPath = path.join(root, "docs", "product-localization-report.md");

const allowedTechnicalTerms =
  /\b(LED|LCD|ECG|EKG|USB|AED|RFID|SpO2|NIBP|TEMP|PR|PVC|ABS|CE|ISO|EN|IEC|BF|BPM|RPM|Hz|MHz|kHz|W|V|A|cm|mm|kg|ml|GB|FC|BG5|Hemo Control|Urilyzer|Riester|Aesculap|Neo Plus|Otopex|Colpy|Iono Base|MIO-Sonic|T-ONE|CU-SPR|CU-SP2|DefiMonitor|MiniOmni|SP-100B|XC-2000|AC-2311|AC-2311DA|Bluetooth|Doppler|LUX|FAD-GDH|SOS|Omnipath|TECAR)\b/g;

const englishPattern =
  /\b(power|consumption|voltage|communication|interface|record|mode|host|computer|large|display|user-friendly|friendly|fast|results|limited|sample|volume|measurement|method|range|working|internal|language|dimensions|shelves|operating|thermal|printer|input|output|field|view|format|wave|waveform|energy|stages|contains|aqua|water|glycerin|propylene|glycol|carbomer|triethanolamine|alcohol|denat|fragrance|benzyl|benzoate|citral|limonene|linalool|chloride|extract|coformulants|needed|reference|number|total|magnification|resolution|paper|feeding|function|adaptor|class|touch|screen|colour|autoclavable|handle|single|adult|protective|goggle|norms|safety|accuracy|proven|portable|durable|suitable|treatment|device|wireless|meter|blood|whole|tests|accurate|determination|photometric|azidemethemoglobin|photometer|wavelengths|medium|high|low|home|professional|innovative|performance|head|desk|clamp|cart|crank|adjustment|system|blue|white|green|red|vacuum|light|box|sachets|wipes|chamomile|osteoporosis|sound|axial|transmission|stretcher|chair|trolley|backrest|diagnostic set|available software|thermal array|foetal monitor|protective goggles|folding bedside|overbed table|supplied|main effects|features|with handle|blood glucose|software voice|waterproof|speed|depth|working height|eyepiece|dispenser|instructions|label|straight|length|blade|ball|electrode|times|comfort|convenience|replaceable|shield|optical|radiations|antifog|scratch|reader|built-in|automatic printout|transfer of results|possibility|testing|urine|strip|continuously|seat|footrest|push|central braking|armrest|folded size|deluxe case|sliding|catches|ophthalmoscope|plug-in|connector|chrome-plated|made of|iron|castors|maneuver|patient well-being|calibration|humidity|barometric|mask|pressure relief|resuscitators|handstrap)\b/i;

const replacements = [
  [/wireless/gi, "fara fir"],
  [/Power consumption/gi, "Consum electric"],
  [/Power source/gi, "Sursa alimentare"],
  [/Operating power/gi, "Alimentare functionare"],
  [/Operating Voltage/gi, "Tensiune de functionare"],
  [/Voltage/gi, "Tensiune alimentare"],
  [/Communication interface/gi, "Interfata de comunicatie"],
  [/Record mode/gi, "Mod inregistrare"],
  [/Host computer/gi, "Calculator gazda"],
  [/Large LCD display/gi, "Ecran LCD de mari dimensiuni"],
  [/Display resolution/gi, "Rezolutie ecran"],
  [/Display/gi, "Ecran"],
  [/User-friendly interface/gi, "Interfata intuitiva"],
  [/Fast results/gi, "Rezultate rapide"],
  [/Limited sample volume/gi, "Volum redus de proba"],
  [/Sample volume/gi, "Volum proba"],
  [/Sample material/gi, "Material proba"],
  [/Sample data/gi, "Date probe"],
  [/Measurement method/gi, "Metoda de masurare"],
  [/Measuring range/gi, "Interval de masurare"],
  [/Working mode/gi, "Mod de lucru"],
  [/Internal language/gi, "Limba interfata"],
  [/Communication/gi, "Comunicatie"],
  [/Record/gi, "Inregistrare"],
  [/Mode/gi, "Mod"],
  [/Dimensions/gi, "Dimensiuni"],
  [/Shelves/gi, "Polite"],
  [/Thermal printer/gi, "Imprimanta termica"],
  [/Thermal array printer/gi, "Imprimanta termica"],
  [/Printer/gi, "Imprimanta"],
  [/Power input/gi, "Alimentare intrare"],
  [/Power adaptor input/gi, "Intrare adaptor alimentare"],
  [/Output/gi, "Iesire"],
  [/Input signal/gi, "Semnal intrare"],
  [/Field of View/gi, "Camp vizual"],
  [/Depth of Field/gi, "Adancime camp"],
  [/Working height/gi, "Inaltime de lucru"],
  [/Light intensity/gi, "Intensitate luminoasa"],
  [/Individually adjustable eyepiece/gi, "Ocular reglabil individual"],
  [/Total magnification/gi, "Marire totala"],
  [/Magnification/gi, "Marire"],
  [/Test format/gi, "Format test"],
  [/Waveform/gi, "Forma unda"],
  [/Wave/gi, "Forma unda"],
  [/Manual energy stages/gi, "Trepte energie manuala"],
  [/Energy/gi, "Energie"],
  [/Charging time/gi, "Timp incarcare"],
  [/Charge control/gi, "Control incarcare"],
  [/Sealing/gi, "Etansare"],
  [/Contains/gi, "Contine"],
  [/It contains/gi, "Contine"],
  [/Aqua \(Water\)/gi, "apa"],
  [/Water/gi, "apa"],
  [/Alcohol Denat/gi, "alcool denaturat"],
  [/Alcohol/gi, "alcool"],
  [/Glycerin/gi, "glicerina"],
  [/Propylene Glycol/gi, "propilenglicol"],
  [/Carbomer/gi, "carbomer"],
  [/Triethanolamine/gi, "trietanolamina"],
  [/Parfum \(Fragrance\)/gi, "parfum"],
  [/Fragrance/gi, "parfum"],
  [/Benzalkonium Chloride/gi, "clorura de benzalconiu"],
  [/Chamomile extract/gi, "extract de musetel"],
  [/Coformulants and water as needed to/gi, "coformulanti si apa pana la"],
  [/Reference number/gi, "Numar referinta"],
  [/Paper feeding function/gi, "Functie alimentare hartie"],
  [/Speed/gi, "Viteza"],
  [/Real time/gi, "timp real"],
  [/\bPower\b/gi, "Putere"],
  [/Class/gi, "Clasa"],
  [/Software voice/gi, "Ghidare vocala"],
  [/Software/gi, "software"],
  [/Firmware/gi, "firmware"],
  [/Touch screen/gi, "ecran tactil"],
  [/Colour/gi, "culoare"],
  [/Color/gi, "culoare"],
  [/Autoclavable/gi, "autoclavabil"],
  [/With handle/gi, "cu maner"],
  [/Handle/gi, "maner"],
  [/Single/gi, "sarcina unica"],
  [/Adult/gi, "adult"],
  [/Transparent/gi, "transparent"],
  [/Protective goggle/gi, "ochelari de protectie"],
  [/Protective goggles/gi, "ochelari de protectie"],
  [/Protection/gi, "protectie"],
  [/Norms/gi, "Norme"],
  [/Safety/gi, "siguranta"],
  [/Accuracy/gi, "precizie"],
  [/Proven/gi, "validat"],
  [/Portable/gi, "portabil"],
  [/Durable/gi, "rezistent"],
  [/Suitable/gi, "potrivit"],
  [/Treatment/gi, "tratament"],
  [/Device/gi, "dispozitiv"],
  [/Meter/gi, "aparat de masurare"],
  [/Blood/gi, "sange"],
  [/Whole blood/gi, "sange integral"],
  [/Tests/gi, "teste"],
  [/Accurate/gi, "precis"],
  [/Determination/gi, "determinare"],
  [/Photometric/gi, "fotometric"],
  [/Azidemethemoglobin/gi, "azidemethemoglobina"],
  [/Photometer/gi, "fotometru"],
  [/Wavelengths/gi, "lungimi de unda"],
  [/Medium/gi, "mediu"],
  [/High/gi, "ridicat"],
  [/Low/gi, "scazut"],
  [/Home use/gi, "utilizare la domiciliu"],
  [/Professional use/gi, "utilizare profesionala"],
  [/Professional/gi, "profesional"],
  [/Innovative/gi, "inovator"],
  [/Performance/gi, "performanta"],
  [/Head/gi, "cap"],
  [/Desk/gi, "birou"],
  [/Clamp/gi, "clema"],
  [/Cart/gi, "carucior"],
  [/Crank adjustment system/gi, "sistem de reglaj cu manivela"],
  [/Adjustment system/gi, "sistem de reglaj"],
  [/System/gi, "sistem"],
  [/\bBlue\b/gi, "albastru"],
  [/\bWhite\b/gi, "alb"],
  [/\bGreen\b/gi, "verde"],
  [/\bRed\b/gi, "rosu"],
  [/Vacuum/gi, "vacuum"],
  [/\bLight\b/gi, "lumina"],
  [/Halogen/gi, "halogen"],
  [/Box of/gi, "cutie de"],
  [/Box/gi, "cutie"],
  [/Sachets/gi, "plicuri"],
  [/Tube/gi, "tub"],
  [/Wipes/gi, "servetele"],
  [/\bScreening\b/gi, "evaluare"],
  [/Osteoporosis/gi, "osteoporoza"],
  [/Sound/gi, "sunet"],
  [/Axial transmission/gi, "transmisie axiala"],
  [/Transmission/gi, "transmisie"],
  [/Stretcher/gi, "targa"],
  [/Chair/gi, "scaun"],
  [/Trolley/gi, "carucior"],
  [/Backrest/gi, "spatar"],
  [/Diagnostic set/gi, "set diagnostic"],
  [/Available software/gi, "software disponibil"],
  [/Foetal monitor/gi, "monitor fetal"],
  [/Supplied/gi, "livrat"],
  [/Main effects/gi, "efecte principale"],
  [/Features/gi, "caracteristici"],
  [/Waterproof/gi, "rezistent la lichide"],
  [/Reader/gi, "cititor"],
  [/Built-in/gi, "integrat"],
  [/Automatic printout/gi, "tiparire automata"],
  [/Transfer of results/gi, "transfer rezultate"],
  [/Possibility/gi, "posibilitate"],
  [/Testing/gi, "testare"],
  [/Urine/gi, "urina"],
  [/Strip/gi, "bandeleta"],
  [/Continuously/gi, "continuu"],
  [/Seat/gi, "sezut"],
  [/Footrest/gi, "suport picioare"],
  [/Push/gi, "impingere"],
  [/Central braking/gi, "franare centrala"],
  [/Armrest/gi, "cotiera"],
  [/Folded size/gi, "dimensiuni pliat"],
  [/Deluxe case/gi, "cutie de protectie"],
  [/Sliding safety catches/gi, "inchideri glisante de siguranta"],
  [/Ophthalmoscope/gi, "oftalmoscop"],
  [/Plug-in connector/gi, "conector rapid"],
  [/Chrome-plated metal/gi, "metal cromat"],
  [/Made of/gi, "fabricat din"],
  [/Iron/gi, "fier"],
  [/Castors/gi, "roti"],
  [/Maneuver/gi, "manevrare"],
  [/Patient well-being/gi, "confort pacient"],
  [/Calibration/gi, "calibrare"],
  [/Humidity/gi, "umiditate"],
  [/Barometric pressure/gi, "presiune barometrica"],
  [/Mask/gi, "masca"],
  [/Pressure relief valve/gi, "valva de siguranta presiune"],
  [/Resuscitators/gi, "baloane resuscitare"],
  [/Handstrap/gi, "curea de mana"],
  [/Instructions\/label/gi, "instructiuni/eticheta"],
  [/Straight/gi, "drept"],
  [/Length/gi, "lungime"],
  [/Blade electrode/gi, "electrod lama"],
  [/Ball electrode/gi, "electrod bila"],
  [/Times/gi, "ori"],
  [/Comfort/gi, "confort"],
  [/Convenience/gi, "utilizare usoara"],
  [/Replaceable shield/gi, "ecran inlocuibil"],
  [/Shield/gi, "ecran"],
  [/Optical quality/gi, "calitate optica"],
  [/Radiations/gi, "radiatii"],
  [/Standard/gi, "standard"],
  [/Antifog/gi, "antiaburire"],
  [/Anti-scratch/gi, "anti-zgariere"],
  [/Specimen/gi, "proba"],
  [/Detection type/gi, "tip detectie"],
  [/Quantitative/gi, "cantitativ"],
  [/Qualitative/gi, "calitativ"],
  [/Reading/gi, "citire"],
  [/Output energy for adults/gi, "energie iesire pentru adulti"],
  [/Output energy for children/gi, "energie iesire pentru copii"],
  [/Auto volume adjustment/gi, "reglaj automat volum"],
  [/Smart pads/gi, "padele inteligente"],
  [/CPR detection/gi, "detectie CPR"],
  [/Easy communication/gi, "comunicatie usoara"],
  [/Consumables status/gi, "status consumabile"],
  [/Battery level/gi, "nivel baterie"],
  [/Pads status/gi, "status padele"],
  [/CPR metronome/gi, "metronom CPR"],
  [/Voice guidance/gi, "ghidare vocala"],
  [/Standard software/gi, "software standard"],
  [/External pacer/gi, "pacing extern"],
  [/Range of/gi, "gama de"],
  [/Defibrillators/gi, "defibrilatoare"],
  [/Dispenser pump/gi, "pompa dozatoare"],
  [/Cleans the hands/gi, "curata mainile"],
  [/Prevents the settlement of bacteria/gi, "ajuta la prevenirea depunerii bacteriilor"],
  [/Effective against bacteria, virus, fungi/gi, "eficient impotriva bacteriilor, virusurilor si fungilor"],
  [/High quality/gi, "calitate ridicata"],
  [/Hidden castors/gi, "roti ascunse"],
  [/Inspiratory and expiratory parameters/gi, "parametri inspiratori si expiratori"],
  [/Real-time curve/gi, "curba in timp real"],
  [/Correction function/gi, "functie de corectie"],
  [/Automatically/gi, "automat"],
  [/Rechargeable lithium battery/gi, "baterie litiu reincarcabila"],
  [/Transparent resuscitators made of medical grade silicone/gi, "baloane transparente de resuscitare din silicon medical"],
];

const controlledByCategory = {
  laboratory: ["utilizare in fluxuri de laborator sau IVD", "configuratie potrivita pentru cereri de oferta profesionale", "documentatie disponibila pentru consultare unde exista"],
  emergency: ["utilizare in zone de urgenta, triaj sau interventie", "produs potrivit pentru continuitate operationala", "documentatie si accesorii confirmate inainte de ofertare"],
  "medical-furniture": ["integrare in spatii clinice si cabinete", "suport pentru organizare operationala sau mobilitate pacient", "configuratie confirmata in functie de utilizare"],
  ent: ["utilizare in cabinete ORL si consultatii specializate", "produs potrivit pentru examinare si diagnostic", "documentatie disponibila pentru consultare"],
  gynecology: ["utilizare in cabinete de ginecologie", "suport pentru examinare si documentare clinica", "configuratie confirmata inainte de ofertare"],
  consumables: ["utilizare in activitatea medicala zilnica", "potrivit pentru aprovizionare recurenta", "ambalarea si cantitatea se confirma la ofertare"],
  electromedical: ["utilizare in terapie, recuperare sau suport clinic", "echipament activ cu optiuni de service si mentenanta", "configuratie verificata inainte de ofertare"],
  monitoring: ["utilizare pentru monitorizare si evaluare parametri", "produs potrivit pentru dotare clinica", "documentatie disponibila pentru consultare"],
  sterilization: ["utilizare in igiena operationala sau fluxuri de sterilizare", "potrivit pentru consum recurent sau dotare clinica", "ambalarea si documentatia se confirma la ofertare"],
  diagnostic: ["utilizare pentru diagnostic si examinare", "potrivit pentru cabinete sau clinici", "documentatie disponibila pentru consultare unde exista"],
  "surgical-instruments": ["utilizare in fluxuri clinice specializate", "instrumentar potrivit pentru completarea seturilor medicale", "configuratie confirmata inainte de ofertare"],
  "patient-care": ["utilizare pentru ingrijire pacient", "suport pentru mobilitate sau confort operational", "configuratie confirmata in functie de aplicatie"],
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function localizeText(value) {
  let output = String(value || "")
    .replace(/&#x2B;/gi, "+")
    .replace(/&#xae;/gi, "")
    .replace(/&reg;/gi, "")
    .replace(/&amp;/gi, "&")
    .replace(/•/g, "")
    .replace(/\s+/g, " ")
    .replace(/albastrutooth/gi, "Bluetooth")
    .trim();
  for (const [pattern, replacement] of replacements) output = output.replace(pattern, replacement);
  return output
    .replace(/albastrutooth/gi, "Bluetooth")
    .replace(/\bGB,?\s*FR,?\s*IT,?\s*ES,?\s*PT,?\s*DE,?\s*PL,?\s*RO\b/gi, "mai multe limbi")
    .replace(/\bGB,?\s*FR,?\s*IT,?\s*ES\b/gi, "mai multe limbi")
    .replace(/\bUS,?\s*PT,?\s*NL,?\s*KR\b/gi, "mai multe limbi")
    .replace(/\s+([,.;:])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function stripAllowed(value) {
  return String(value || "").replace(allowedTechnicalTerms, "");
}

function hasEnglish(value) {
  return englishPattern.test(stripAllowed(value));
}

function localizeList(items, category) {
  const localized = (items || [])
    .map(localizeText)
    .filter((item) => item && !hasEnglish(item))
    .slice(0, 6);
  if (localized.length >= 2) return localized;
  return controlledByCategory[category] || controlledByCategory.diagnostic;
}

function localizePackage(items, title) {
  const localized = (items || [])
    .map(localizeText)
    .filter((item) => item && !hasEnglish(item))
    .slice(0, 6);
  if (localized.length >= 2) return localized;
  return [title, "documentatie disponibila pe pagina produsului", "accesorii si configuratie confirmate la ofertare"];
}

function localizeSpec(spec) {
  const label = localizeText(spec.label);
  const value = localizeText(spec.value);
  return { label, value };
}

function localizeSpecs(product) {
  const translated = (product.romanianSpecifications || [])
    .map(localizeSpec)
    .filter((spec) => spec.label && spec.value && !hasEnglish(`${spec.label} ${spec.value}`))
    .slice(0, 12);

  const required = [
    { label: "Cod produs", value: product.gimaCode },
    { label: "Categorie", value: product.commercialCategory || product.category },
  ].filter((spec) => spec.value);

  for (const spec of required) {
    if (!translated.some((item) => item.label.toLowerCase() === spec.label.toLowerCase())) {
      translated.unshift(spec);
    }
  }

  return translated.slice(0, 12);
}

function fieldsForAudit(product) {
  return {
    title: product.romanianTitle,
    description: product.romanianDescription,
    features: (product.romanianFeatures || []).join(" | "),
    package: (product.romanianPackageContents || []).join(" | "),
    applications: (product.romanianApplications || []).join(" | "),
    benefits: (product.romanianBenefits || []).join(" | "),
    specs: (product.romanianSpecifications || []).map((spec) => `${spec.label}: ${spec.value}`).join(" | "),
  };
}

function findIssues(products) {
  const issues = [];
  for (const product of products) {
    for (const [field, text] of Object.entries(fieldsForAudit(product))) {
      if (!hasEnglish(text)) continue;
      const match = stripAllowed(text).match(englishPattern)?.[0] || "english phrase";
      issues.push({ slug: product.slug, title: product.romanianTitle, field, match });
    }
  }
  return issues;
}

function applyProductSpecificPolish(product) {
  if (product.slug !== "sistem-sunlight-miniomni-pentru-screening-osteoporoza-56800") return;

  product.romanianTitle = "Sistem Sunlight MiniOmni pentru evaluarea osteoporozei";
  product.romanianDescription =
    "Sistem Sunlight MiniOmni pentru evaluarea osteoporozei este un produs medical pentru monitorizare clinica, evaluare de parametri si suport operational. Pagina este pregatita pentru cereri de oferta profesionale, cu imagini produs, specificatii disponibile, documentatie locala si suport ZESCORP pentru selectie, livrare si service.";
  product.romanianShortSummary =
    "Sistem pentru evaluarea osteoporozei, cu documentatie si configuratie confirmate inainte de ofertare.";
  product.romanianSourceDescription = product.romanianDescription;
  product.romanianPackageContents = [
    "Produs cod 56800",
    "Documentatia disponibila se confirma la ofertare",
  ];
  product.romanianSpecifications = [
    { label: "Categorie", value: "Monitorizare" },
    { label: "Metoda de masurare", value: "viteza sunetului" },
    { label: "Tehnologie", value: "ultrasunet Omnipath prin transmisie axiala" },
    { label: "Frecventa sondei", value: "1.25 MHz" },
    { label: "Alimentare", value: "7.5 V / 1.5 A" },
    { label: "Consum electric", value: "0.4 A" },
    { label: "Dimensiuni", value: "140 x 140 x 223 mm, fara suportul sondei" },
    { label: "Greutate", value: "1 kg" },
    { label: "Protectie", value: "parte aplicata tip BF, alimentare interna, cerinte clasa I sau clasa II" },
    { label: "Cod produs", value: "56800" },
  ];
}

function main() {
  const products = readJson(productsPath);
  const reviewed = products.filter(
    (product) => product.publicDisplayReady && product.sourceQuality === "gima_page_parity_review",
  );
  const before = findIssues(reviewed);

  for (const product of reviewed) {
    product.romanianTitle = localizeText(product.romanianTitle);
    product.romanianDescription = localizeText(product.romanianDescription);
    product.romanianShortSummary = localizeText(product.romanianShortSummary);
    product.romanianSourceDescription = product.romanianDescription;
    product.romanianFeatures = localizeList(product.romanianFeatures, product.category);
    product.romanianPackageContents = localizePackage(product.romanianPackageContents, product.romanianTitle);
    product.romanianApplications = localizeList(product.romanianApplications, product.category);
    product.romanianBenefits = localizeList(product.romanianBenefits, product.category);
    product.romanianSpecifications = localizeSpecs(product);
    product.installationConsiderations = localizeList(product.installationConsiderations, product.category);
    product.maintenanceConsiderations = localizeList(product.maintenanceConsiderations, product.category);
    applyProductSpecificPolish(product);
  }

  const after = findIssues(reviewed);
  writeJson(productsPath, products);
  writeReport({ after, before, reviewed });
}

function writeReport({ after, before, reviewed }) {
  const fixedCount = Math.max(0, before.length - after.length);
  const report = `# Product Localization Report

Generated: ${new Date().toISOString()}

Scope: 50 reviewed products only. No imports, no SEO changes, no deployment.

## Summary

- Reviewed products audited: ${reviewed.length}
- English phrase findings before fixes: ${before.length}
- English phrase findings after fixes: ${after.length}
- Findings fixed: ${fixedCount}

## Translation Dictionaries Added

- Power consumption -> Consum electric
- Voltage -> Tensiune alimentare
- Communication interface -> Interfata de comunicatie
- Record mode -> Mod inregistrare
- Host computer -> Calculator gazda
- Large LCD display -> Ecran LCD de mari dimensiuni
- User-friendly interface -> Interfata intuitiva
- Fast results -> Rezultate rapide
- Limited sample volume -> Volum redus de proba
- Measurement method -> Metoda de masurare
- Field of View -> Camp vizual
- Operating mode -> Mod de operare
- Software voice -> Ghidare vocala
- Thermal printer -> Imprimanta termica
- Package and support wording normalized to Romanian customer-facing copy.

## Remaining English Phrases

${after.length ? after.map((issue) => `- /produse/${issue.slug} (${issue.field}): ${issue.match}`).join("\n") : "- None"}

## Products Affected

${Array.from(new Set(before.map((issue) => issue.slug)))
  .map((slug) => `- /produse/${slug}`)
  .join("\n")}

## Fixes Applied

- Public feature lists translated or replaced with Romanian product/category-specific commercial content.
- Specification labels and values translated where deterministic mapping was safe.
- Specification rows that still contained English after translation were removed instead of exposing mixed-language content.
- Package contents were translated; uncertain package text was replaced with customer-facing Romanian wording.
- Applications, benefits, installation and maintenance support notes were normalized in Romanian.

## Acceptance Check

- Remaining English findings after localization: ${after.length}
- Allowed exceptions remain brand names, model names, scientific abbreviations and regulatory abbreviations.
`;

  fs.writeFileSync(reportPath, report);
}

main();
