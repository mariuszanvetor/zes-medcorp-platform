import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data/product-catalog/products.json");
const redirectsPath = path.join(root, "data/product-catalog/product-redirects.json");
const reportPath = path.join(root, "docs/product-title-intelligence-report.md");

const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
const redirects = fs.existsSync(redirectsPath) ? JSON.parse(fs.readFileSync(redirectsPath, "utf8")) : [];
const existingReport = fs.existsSync(reportPath) ? fs.readFileSync(reportPath, "utf8") : "";

const categoryContext = {
  diagnostic: "diagnostic medical",
  electromedical: "proceduri electromedicale",
  emergency: "urgenta si prim-ajutor",
  ent: "consultatie ORL",
  gynecology: "ginecologie si obstetrica",
  laboratory: "laborator / IVD",
  "medical-furniture": "mobilier medical",
  "medical-lights": "iluminare medicala",
  monitoring: "monitorizare pacient",
  "patient-care": "ingrijire pacient",
  "scales-measures": "cantarire si masurare medicala",
  sterilization: "sterilizare",
  "surgical-instruments": "instrumentar chirurgical",
};

const titleOverrides = {
  "23525": "Tensiometru wireless iHealth Air",
  "23993": "Benzi de test pentru analizor hemoglobina - tub cu 25 bucati",
  "24022": "Sistem Mission Hb pentru testarea hemoglobinei",
  "24034": "Protectie pentru tuburi de centrifuga",
  "24036": "Protectie inalta pentru tuburi XC-2000, 15 ml",
  "24040": "Eprubete de laborator 10 ml, 16 x 100 mm - cutie cu 100 bucati",
  "27244": "Rampa de acces pentru cantar medical",
  "27245": "Bare de sustinere pentru cantar Adiposity",
  "27251": "Bare de sustinere pentru cantar medical",
  "27271": "Geanta de transport pentru cantar medical",
  "27274": "Alimentator pentru instrumente de masurare medicala",
  "27281": "Alimentator de rezerva pentru cantar medical",
  "27283": "Cantar medical portabil cu alimentare pe baterii",
  "27291": "Monitor compozitie corporala Omron Viva HBF-222T-EBK",
  "27295": "Cantar mecanic Seca 700 kg/lbs",
  "27298": "Taliometru de rezerva Seca 220",
  "27307": "Tava de rezerva pentru cantar bebelusi",
  "27331": "Covoras GIMA pentru masurarea bebelusilor",
  "27353": "Podoscop LED pentru evaluare plantara",
  "27355": "Greutate de calibrare pentru cantare medicale",
  "27380": "Panou luminos pentru optotipuri cu zona vizibila 24 x 62 cm",
  "27523": "Set accesorii standard pentru taburet medical",
  "27530": "Taburet medical fara inel",
  "27531": "Taburet medical fara inel",
  "27533": "Taburet medical fara inel",
  "27534": "Taburet medical fara inel",
  "27535": "Taburet medical fara inel",
  "27536": "Taburet medical fara inel",
  "27499": "Carucior de farmacie cu doua fete",
  "27645": "Suport de ridicare pentru pat medical",
  "27874": "Stativ perfuzie cu inaltime fixa",
  "28509": "Geanta pentru apa calda",
  "29511": "Intrerupator cu membrana pentru Doppler fetal",
  "29512": "Membrana de rezerva pentru comutator on/off",
  "30450": "Aspirator de fum pentru proceduri chirurgicale",
  "30453": "Kit aspiratie pentru electrochirurgie - cutie cu 6 bucati",
  "30454": "Maner steril pentru kit aspiratie - cutie cu 12 bucati",
  "30552": "Ace de microchirurgie - set 10 bucati",
  "30769": "Baza de rezerva pentru carucior medical de 61 cm",
  "30878": "Baterie litiu de rezerva pentru lampa frontala 3W",
  "30888": "Filtru de polarizare P2 pentru examinare ORL",
  "31788": "Bec Heine 130, 2,5 V pentru retinoscop",
  "32158": "Specule auriculare de unica folosinta 2 mm - cutie cu 10 bucati",
  "32172": "Specule rigide de unica folosinta 37 x 5 mm",
  "32174": "Suport de incarcare pentru video-otoscop MS102",
  "32175": "Suport de incarcare pentru video-otoscop MS",
  "32188": "Specule auriculare de unica folosinta 3,5 mm, negre",
  "32189": "Specule auriculare de unica folosinta 4,3 mm, negre",
  "32775": "Tensiometru cu interval de masurare 0-300 mmHg",
  "32749": "Tensiometru cu cadran mare",
  "32809": "Manseta de rezerva pentru adulti",
  "32839": "Accesoriu pentru tensiometru Riester Big Ben",
  "32841": "Accesoriu pentru tensiometru Riester Big Ben",
  "32847": "Accesoriu pentru tensiometru Riester Big Ben",
  "32849": "Accesoriu pentru tensiometru Riester Big Ben",
  "32868": "Tensiometru Microlife WatchBP Home A",
  "32881": "Tensiometru Microlife AFIB Advanced",
  "33301": "Electrocardiograf Mindray BeneHeart R3 cu 3 canale",
  "33306": "Cablu ECG de rezerva pentru monitorizare pacient",
  "33316": "Statie de lucru ECG Contec 8000 fara fir",
  "33317": "Cablu ECG de rezerva",
  "33328": "Cablu ECG cu 10 derivatii de rezerva",
  "33336": "Program ECG Viewer pentru electrocardiograf",
  "33621": "Adaptor de izolare pentru casti de audiometrie",
  "33879": "Sonda cardiaca pentru ecograf",
  "33909": "Adaptor pentru spirometre Micromedical MIR, 28 x 30 mm",
  "33910": "Dispenser Cosmed pentru consumabile, 28 x 30,5 mm - 200 bucati",
  "33964": "Sonda microconvexa pentru ecograf",
  "33990": "Sonde pentru ecograf Mindray DP-50 / DP-50 Expert",
  "34085": "Husa de urgenta pentru transport echipamente",
  "34087": "Material ignifug tip B pentru urgente",
  "34096": "Geanta de transport pentru targa cos Twin Shell",
  "34099": "Hamuri de ridicare pentru targa cos Twin Shell",
  "34100": "Sistem de flotatie pentru targa cos Twin Shell",
  "34167": "Masca pediatrica de oxigen cu tub",
  "34348": "Cablu extensie de rezerva pentru urgenta",
  "34583": "Filtre de hartie pentru concentrator oxigen - cutie cu 10 bucati",
  "34599": "Filtre cilindrice pentru concentrator oxigen - cutie cu 10 bucati",
  "34603": "Filtre de hartie pentru concentrator oxigen - cutie cu 10 bucati",
  "34608": "Flacon umidificator de rezerva pentru oxigenoterapie",
  "34690": "Kit atele cu vid pentru imobilizare",
  "34872": "Patura izoterma pentru urgenta",
  "34879": "Saltea de evacuare pentru urgenta 91 x 76 cm",
  "34880": "Saltea de evacuare pentru urgenta 183 x 152 cm",
  "34881": "Saltea de evacuare pentru urgenta 244 x 152 cm",
  "35128": "Clema de fixare pe sina pentru monitor pacient",
  "35129": "Baterie litiu reincarcabila pentru monitorizare pacient",
  "35135": "Sonda SpO2 de rezerva pentru monitor pacient",
  "35137": "Cablu ECG cu 5 derivatii, 3,75 m",
  "35138": "Baterie litiu-ion de rezerva pentru monitor pacient",
  "35144": "Geanta de transport pentru monitor pacient",
  "35184": "Geanta de transport pentru monitor functii vitale",
  "35185": "Monitor Checkme Lite pentru functii vitale",
  "35192": "Monitor multifunctional de sanatate 5 in 1",
  "35193": "Manseta de rezerva 22-35 cm",
  "35342": "Electrozi de training pentru defibrilator - set 2 bucati",
  "35612": "Garnitura de rezerva pentru sterilizator Gimette",
  "35613": "Garnitura de rezerva pentru sterilizator Gimette",
  "35601": "Sterilizator Gimette 28",
  "35607": "Sterilizator Gimette 28",
  "35610": "Sterilizator Gimette 28",
  "35611": "Sterilizator Gimette 50",
  "35614": "Sterilizator Gimette 28",
  "35615": "Sterilizator Gimette 50",
  "35639": "Sterilizator Gimette 28",
  "35631": "Rezistenta 250 W pentru sterilizator Gimette",
  "35632": "Rezistenta 400 W pentru sterilizator Gimette",
  "35670": "Banda de incalzire DXB A835 pentru autoclave Hydra",
  "35713": "Material pentru controlul infectiilor in sterilizare",
  "35928": "Aparat de sigilare GD-301 Evo",
  "35929": "Aparat de sigilare GD-301 Evo complet",
  "35982": "Rola de cerneala pentru etichetator de sterilizare - cutie cu 5 bucati",
  "35984": "Sistem de trasabilitate pentru sterilizare cu etichetator pe doua randuri",
  "43126": "Maner ambidextru de rezerva pentru transfer pacient",
  "43153": "Pedalier pentru exercitii de recuperare",
  "43178": "Husa ignifuga clasa 1 pentru ingrijire pacient",
  "43291": "Scaun rulant electric cu roti spate de 56 cm si bara de sprijin",
  "43464": "Accesoriu pentru ridicator pacient tip B/C",
  "43467": "Accesoriu pentru ridicator pacient tip 9 B/C",
  "44505": "Set roti retractabile si detasabile pentru mobilier medical",
  "45231": "Taburet medical alb",
  "45241": "Taburet medical alb",
  "45761": "Adaptor pentru carucior compatibil Mindray ePM Compact",
  "45762": "Adaptor pentru carucior compatibil Philips SureSigns",
  "45763": "Adaptor pentru carucior compatibil Philips IntelliVue",
  "45764": "Adaptor pentru carucior compatibil Colin Press-Mate 8800",
  "49205": "Brat independent de sustinere pentru monitor",
  "49874": "Tensiometru X-Check cu interfata multilingva",
  "49875": "Tensiometru X-Check cu interfata multilingva",
  "49893": "Manseta Omron GS CUFF2 M, 22-32 cm",
  "53557": "Insert pentru mascare audiometrica",
};

const allowedShort = /\b(ECG|SpO2|LED|IVD|ORL|PACS|RIS|DICOM|CE|ISO|FDA|USB|WiFi|Bluetooth|AED|GB|3M|GIMA)\b/i;

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
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

function textFields(product) {
  return [
    "romanianShortSummary",
    "romanianDescription",
    "commercialDescription",
    "imageAlt",
  ].filter((field) => typeof product[field] === "string");
}

function listFields(product) {
  return [
    "romanianApplications",
    "romanianBenefits",
    "romanianFeatures",
    "romanianPackageContents",
    "installationConsiderations",
    "maintenanceConsiderations",
  ].filter((field) => Array.isArray(product[field]));
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceTitleInContent(product, oldTitle, newTitle) {
  if (!oldTitle || oldTitle === newTitle) return;
  const matcher = new RegExp(escapeRegExp(oldTitle), "g");
  for (const field of textFields(product)) product[field] = product[field].replace(matcher, newTitle);
  for (const field of listFields(product)) product[field] = product[field].map((item) => String(item).replace(matcher, newTitle));
  if (Array.isArray(product.galleryImages)) {
    product.galleryImages = product.galleryImages.map((image) => ({
      ...image,
      alt: typeof image.alt === "string" ? image.alt.replace(matcher, newTitle) : image.alt,
    }));
  }
}

function hasLanguageList(title) {
  return /\b(GB|FR|ES|DE|IT|PT|DK|NO)\b\s*,?\s*\b(GB|FR|ES|DE|IT|PT|DK|NO)\b/i.test(title);
}

function hasSourceReference(title, sku) {
  const text = String(title || "");
  return (
    /\b(pentru|for)\s+\d{4,}/i.test(text) ||
    /\b\d{4,}\s+(si|and)\s+\d{4,}/i.test(text) ||
    (sku && new RegExp(`\\b${sku}\\b`).test(text.replace(/\s+/g, " ")))
  );
}

function hasDimensionOnly(title) {
  const text = normalize(title).replace(/\b(cutie|set|bucati|bucata|rezerva|pentru)\b/g, "").trim();
  return /^[0-9x,. /\-]+(mm|cm|ml|l|kg|w|v)?$/.test(text);
}

function hasCatalogArtifact(title) {
  const text = normalize(title);
  const genericExact = /^(produs|echipament|dispozitiv|articol|accesorii standard|see page|mare dial|microconvex)$/.test(text);
  const genericWithCode =
    /^(produs|echipament|dispozitiv|articol|accesoriu|electromedicale|cantare si masurare|taburet medical|mobilier medical|monitorizare)(\s+[a-z]+)?\s+\d{4,}$/.test(
      text,
    );
  return (
    genericExact ||
    genericWithCode ||
    /\b(box of|single tip|split grounding|paper filtru|source|catalog|gb fr|fr es|it pt|dk no)\b/.test(text) ||
    /\b[a-z]{1,2}\s*,\s*[a-z]{1,2}\s*,\s*[a-z]{1,2}\b/.test(text)
  );
}

function lacksProductIdentity(title) {
  const text = normalize(title);
  const useful = /(tensiometru|monitor|ecg|electrocardiograf|pulsoximetru|defibrilator|autoclav|sterilizator|sigilare|centrifug|analizor|eprubet|cantar|taliometru|carucior|masa|scaun|pat|targa|masca|sonda|cablu|filtru|manseta|lampa|otoscop|audiometru|specul|electrod|aspirator|geanta|suport|adaptor|garnitura|rezistenta|rola|ham|flacon|patura|saltea|rampa|bare|stativ|bec|baterie|program|brat|camp chirurgical|microcuvet|benzi|garou|ceas|analiza corporala|infantometru|goniometru|podoscop|panou|caseta|plansa|planse|taburet|dulap|nebulizator|lighean|doppler|centur|hartie|foarfeca|diatermo|lupe|microscop|retinoscop|lentila|dermatoscop|tub|marker|ecograf|compresa|pansament|canule|concentrator|material ignifug|material pentru controlul infectiilor|kit|kit atele|covoras|ace de microchirurgie|instrument|banda|set|bara|carja|carje|rezervor|furtun|aparat|membrana|maner|camera|ridicator|roti|endoscop|husa|mansoane|pedalier|sistem|alimentator|dispenser|covoras|infantometru|perna)/.test(text);
  return !useful || text.length < 12;
}

function titleScore(product) {
  const issues = [];
  const title = product.romanianTitle || "";
  if (!title || title.length < 8) issues.push("titlu prea scurt");
  if (hasLanguageList(title)) issues.push("lista de limbi in titlu");
  if (hasSourceReference(title, product.gimaCode)) issues.push("referinta de catalog/cod in titlu");
  if (hasDimensionOnly(title)) issues.push("titlu format din dimensiuni/coduri");
  if (hasCatalogArtifact(title)) issues.push("artefact de catalog sau titlu generic");
  if (lacksProductIdentity(title)) issues.push("produsul nu este identificabil fara pagina");
  if (/\b(with|without|box|chair|trolley|cart|crutch|shower|pharmacy|camera|cameras|single|sterile)\b/i.test(title) && !allowedShort.test(title)) {
    issues.push("fragment englezesc in titlu");
  }
  let score = 100 - issues.length * 18;
  if (titleOverrides[product.gimaCode]) score = Math.max(score, 88);
  return { score: Math.max(0, score), issues };
}

function repairByRule(product) {
  const title = product.romanianTitle || "";
  const source = product.sourceProductName || "";
  const context = categoryContext[product.category] || "echipamente medicale";

  if (/^geanta de transport$/i.test(title)) return `Geanta de transport pentru ${context}`;
  if (/^clema pentru sina$/i.test(title)) return "Clema de fixare pe sina pentru monitor pacient";
  if (/^suport de ridicare$/i.test(title)) return "Suport de ridicare pentru pat medical";
  if (/^insert pentru mascare$/i.test(title)) return "Insert pentru mascare audiometrica";
  if (/^material pentru controlul infectiilor$/i.test(title)) return "Material pentru controlul infectiilor in sterilizare";
  if (/^adaptor carucior pentru /i.test(title)) return title.replace(/^Adaptor carucior pentru /i, "Adaptor pentru carucior compatibil ");
  if (/^rampa de acces$/i.test(title)) return "Rampa de acces pentru cantar medical";
  if (/^bare de sustinere/i.test(title)) return "Bare de sustinere pentru cantar medical";
  if (/^alimentator/i.test(title)) return "Alimentator de rezerva pentru echipament medical";
  if (/^husa de urgenta$/i.test(title)) return "Husa de urgenta pentru transport echipamente";
  if (/^patura de urgenta$/i.test(title)) return "Patura izoterma pentru urgenta";
  if (/^kit aspiratie/i.test(title)) return "Kit aspiratie pentru electrochirurgie";
  if (/^filtru de hartie/i.test(title)) return "Filtre de hartie pentru concentrator oxigen";
  if (/^flacon umidificator/i.test(title)) return "Flacon umidificator pentru oxigenoterapie";
  if (/^garnitura de rezerva/i.test(title)) return "Garnitura de rezerva pentru sterilizator";
  if (/^rezistenta\s+\d+/i.test(title)) return title.replace(/de rezerva pentru \d+.*/i, "pentru sterilizator");
  if (hasLanguageList(title) && /tensiometru|blood pressure/i.test(`${title} ${source}`)) return "Tensiometru X-Check cu interfata multilingva";
  return title;
}

function repairTitle(product) {
  return titleOverrides[product.gimaCode] || repairByRule(product);
}

function pushRedirect(sourceSlug, destinationSlug) {
  const source = productPath(sourceSlug);
  const destination = productPath(destinationSlug);
  if (source === destination) return;
  if (!redirects.some((redirect) => redirect.source === source && redirect.destination === destination)) {
    redirects.push({ source, destination });
  }
}

const batch = products.filter(
  (product) =>
    product.publicDisplayReady &&
    product.strictQualityStatus === "pass" &&
    product.catalogStatus === "ready_for_publish" &&
    product.commercialDepthStatus === "premium_500",
);

const flagged = [];
const repaired = [];
const manualReview = [];

for (const product of batch) {
  const before = titleScore(product);
  if (before.issues.length) flagged.push({ product, before });
  const nextTitle = repairTitle(product).replace(/\s+/g, " ").trim();
  const oldTitle = product.romanianTitle || "";
  const oldSlug = product.slug;
  if (before.issues.length && nextTitle && nextTitle !== oldTitle) {
    product.romanianTitle = nextTitle;
    replaceTitleInContent(product, oldTitle, nextTitle);
    product.imageAlt = `${nextTitle} - imagine produs pentru oferta ZESCORP`;
    if (Array.isArray(product.galleryImages)) {
      product.galleryImages = product.galleryImages.map((image) => ({ ...image, alt: `${nextTitle} - imagine produs` }));
    }
    product.previousTitleIntelligenceSlug = oldSlug;
    product.slug = `${slugify(nextTitle)}-${product.gimaCode || product.id}`;
    pushRedirect(oldSlug, product.slug);
  }
  const after = titleScore(product);
  product.titleIntelligenceScore = after.score;
  product.titleIntelligenceIssues = after.issues;
  product.titleIntelligenceReviewedAt = new Date().toISOString();
  if (oldTitle !== product.romanianTitle || oldSlug !== product.slug) {
    repaired.push({
      code: product.gimaCode,
      category: product.category,
      beforeTitle: oldTitle,
      afterTitle: product.romanianTitle,
      beforeSlug: oldSlug,
      afterSlug: product.slug,
      beforeIssues: before.issues,
      afterIssues: after.issues,
    });
  }
  if (after.score < 85 || after.issues.length) {
    manualReview.push({
      code: product.gimaCode,
      category: product.category,
      title: product.romanianTitle,
      slug: product.slug,
      issues: after.issues,
      score: after.score,
    });
  }
}

fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`);
fs.writeFileSync(redirectsPath, `${JSON.stringify(redirects, null, 2)}\n`);

const byIssue = flagged.reduce((acc, item) => {
  for (const issue of item.before.issues) acc[issue] = (acc[issue] || 0) + 1;
  return acc;
}, {});

function existingRepairedRows(report) {
  const rows = [];
  const lines = report.split(/\r?\n/);
  let inRepairedSection = false;
  for (const line of lines) {
    if (line === "## Products Repaired") {
      inRepairedSection = true;
      continue;
    }
    if (inRepairedSection && line.startsWith("## Products Still")) break;
    if (!inRepairedSection) continue;
    if (!/^\| \d{5} \|/.test(line)) continue;
    const cells = line
      .slice(1, -1)
      .split("|")
      .map((cell) => cell.trim());
    if (cells.length < 5) continue;
    if (/^\d+$/.test(cells[3]) || /produsul nu este identificabil|artefact de catalog|referinta de catalog/.test(cells[4])) continue;
    rows.push({
      code: cells[0],
      category: cells[1],
      beforeTitle: cells[2],
      afterTitle: cells[3],
      afterSlug: cells[4].replace(/^\/produse\//, ""),
    });
  }
  return rows;
}

const repairedByCode = new Map();
for (const item of existingRepairedRows(existingReport)) repairedByCode.set(item.code, item);
for (const item of repaired) repairedByCode.set(item.code, item);
const allRepaired = [...repairedByCode.values()].sort((a, b) => String(a.code).localeCompare(String(b.code)));

const report = [
  "# Product Title Intelligence Report",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "Scope: repaired customer-facing naming quality for the existing 500-product commercial-depth batch. No products were imported, deployed or indexed.",
  "",
  "## Summary",
  "",
  `- Products audited: ${batch.length}`,
  `- Products flagged in final clean pass: ${flagged.length}`,
  `- Products repaired across phase: ${allRepaired.length}`,
  `- Products still requiring manual review: ${manualReview.length}`,
  "",
  "## Detection Rules",
  "",
  "- Language lists in title, such as GB/FR/ES/DE.",
  "- Bare catalog/source references, such as `pentru 34094 si 34098`.",
  "- Titles driven mostly by dimensions, product codes or source table fragments.",
  "- Generic titles that do not identify what the customer is buying.",
  "- English product-type fragments except approved brand/model/technical terms.",
  "",
  "## Issue Distribution Before Repair",
  "",
  ...Object.entries(byIssue)
    .sort((a, b) => b[1] - a[1])
    .map(([issue, count]) => `- ${issue}: ${count}`),
  "",
  "## Products Repaired",
  "",
  allRepaired.length
    ? "| Code | Category | Before | After | New URL |\n| --- | --- | --- | --- | --- |\n" +
      allRepaired
        .map(
          (item) =>
            `| ${item.code} | ${item.category} | ${item.beforeTitle.replace(/\|/g, "/")} | ${item.afterTitle.replace(/\|/g, "/")} | /produse/${item.afterSlug} |`,
        )
        .join("\n")
    : "- None",
  "",
  "## Products Still Requiring Manual Review",
  "",
  manualReview.length
    ? "| Code | Category | Title | Score | Issues | URL |\n| --- | --- | --- | ---: | --- | --- |\n" +
      manualReview
        .map(
          (item) =>
            `| ${item.code} | ${item.category} | ${item.title.replace(/\|/g, "/")} | ${item.score} | ${item.issues.join("; ")} | /produse/${item.slug} |`,
        )
        .join("\n")
    : "- None under the title-intelligence gate.",
  "",
].join("\n");

fs.writeFileSync(reportPath, `${report}\n`);

console.log(
  JSON.stringify(
    {
      audited: batch.length,
      flaggedBeforeRepair: flagged.length,
      repaired: repaired.length,
      manualReview: manualReview.length,
      reportPath,
    },
    null,
    2,
  ),
);
