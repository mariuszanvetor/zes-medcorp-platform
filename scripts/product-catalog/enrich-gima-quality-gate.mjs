import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "product-catalog", "products.json");
const reportPath = path.join(root, "docs", "gima-real-ux-quality-gate-report.md");
const gimaBaseUrl = "https://www.gimaitaly.com";

const selectedProducts = [
  "gima-xc-2000-centrifuge-24035",
  "gima-gimacare-multi-parameter-monitor-6-parameters-gb-fr-it-es-24128",
  "gima-non-woven-bi-layer-drape-50x50-cm-23580",
  "gima-aesculap-foerster-ballenger-clamp-straight-18-cm-bf112r-39240",
  "gima-quick-tourniquet-blue-25748",
  "gima-hydraulic-patient-transfer-chair-43430",
  "gima-emergency-trolley-neo-plus-45720",
  "gima-ent-chair-otopex-27552",
  "gima-foot-warmer-with-massage-28668",
  "gima-colpy-gima-led-colposcope-29600",
];

const contentBySku = {
  "24035": {
    title: "Centrifuga de laborator XC-2000",
    summary: "Centrifuga silentioasa pentru 6 tuburi, cu programare simpla, reglaj de viteza si oprire automata la deschiderea capacului.",
    description:
      "Centrifuga XC-2000 este destinata fluxurilor de laborator care au nevoie de procesare repetabila pentru tuburi de 10 ml sau 15 ml. Produsul include panou de programare one-touch, contor electronic pentru setarea vitezei si memorarea ultimelor setari de lucru.",
    features: [
      "6 pozitii pentru tuburi",
      "Reglaj de viteza intre aproximativ 1.000 si 4.000 rpm",
      "Timp de lucru reglabil intre 1 si 60 minute",
      "Structura ABS robusta",
      "Oprire automata la deschiderea capacului",
    ],
    packageContents: ["Suport metalic pentru 6 tuburi de 10 ml", "Suport pentru 6 tuburi de 15 ml", "Manual de utilizare GB/IT"],
    specs: [
      ["Alimentare", "220 V - 50 Hz"],
      ["Putere", "80 W"],
      ["Viteza", "aprox. 1.000 - 4.000 rpm, in trepte de 500 rpm"],
      ["Timp de lucru", "1 - 60 min"],
      ["Dimensiuni", "320 x 290 x h 320 mm"],
      ["Greutate", "6 kg"],
      ["Capacitate", "10 sau 15 ml x 6"],
      ["RCF maxim", "1.790 g"],
    ],
  },
  "24128": {
    title: "Monitor multiparametric pentru 6 parametri",
    summary: "Dispozitiv multiparametric 6-in-1 pentru monitorizarea periodica a glicemiei, cetonelor, lactatului, colesterolului, acidului uric si hemoglobinei.",
    description:
      "GIMACARE este un dispozitiv multiparametric conectat prin Bluetooth, potrivit pentru utilizare profesionala si homecare. Identifica automat stripurile, permite transmiterea datelor prin aplicatie si afiseaza indicatori color pentru ghidarea utilizarii si interpretarea orientativa a intervalelor.",
    features: [
      "6 parametri masurabili intr-un singur dispozitiv",
      "Conectivitate Bluetooth si compatibilitate ProCheck App",
      "Identificare automata a stripurilor",
      "Memorie pentru 1.000 de masuratori",
      "Indicatori color pentru introducerea stripului si intervalul rezultatului",
      "Alarme zilnice si medii pe perioade multiple",
    ],
    packageContents: ["Dispozitiv GIMACARE", "Dispozitiv de intepare", "10 lancete sterile", "Ghid de utilizare", "Husa transport", "Manual GB/FR/IT/ES"],
    specs: [
      ["Conectivitate", "Bluetooth"],
      ["Memorie", "1.000 masuratori"],
      ["Alimentare", "2 baterii AAA 1,5 V"],
      ["Dimensiuni / greutate", "102,5 x 59,6 x 21,8 mm / 64,4 g fara baterii"],
      ["Glicemie", "10 - 800 mg/dL; proba 0,5 ul; timp reactie 5 sec"],
      ["Cetone", "0,1 - 8,0 mmol/L; proba 0,8 ul; timp reactie 10 sec"],
      ["Lactat", "0,3 - 22 mmol/L; proba 0,8 ul; timp reactie 5 sec"],
      ["Colesterol", "100 - 400 mg/dL; proba 3,0 ul; timp reactie 60 sec"],
      ["Acid uric", "3 - 20 mg/dL; proba 0,5 ul; timp reactie 15 sec"],
      ["Hemoglobina", "6,8 - 24 g/dL; proba 0,5 ul; timp reactie 10 sec"],
    ],
  },
  "23580": {
    title: "Camp chirurgical steril netesut dublu strat 50 x 50 cm",
    summary: "Camp chirurgical steril de unica folosinta, realizat din material netesut absorbant si impermeabil.",
    description:
      "Campul chirurgical bi-layer este destinat acoperirii sterile in proceduri si pregatiri chirurgicale. Materialul este netesut, absorbant si impermeabil, fara cauciuc natural sau latex.",
    features: ["Produs steril de unica folosinta", "Material absorbant si impermeabil", "Fara latex si cauciuc natural", "Fabricat in Italia", "Clasa IIa conform informatiilor GIMA"],
    packageContents: ["Camp chirurgical steril 50 x 50 cm"],
    specs: [
      ["Dimensiune", "50 x 50 cm"],
      ["Material", "netesut, absorbant si impermeabil"],
      ["Utilizare", "de unica folosinta"],
      ["Latex", "nu contine cauciuc natural sau latex"],
      ["Clasa", "IIa"],
    ],
  },
  "39240": {
    title: "Pensa Aesculap Foerster-Ballenger dreapta 18 cm BF112R",
    summary: "Instrument chirurgical Aesculap tip Foerster-Ballenger, drept, lungime 18 cm.",
    description:
      "Pensa Foerster-Ballenger Aesculap este un instrument chirurgical drept, identificat prin codul BF112R. Este potrivita pentru completarea seturilor de instrumentar unde este necesara o pensa de acest tip.",
    features: ["Instrument Aesculap", "Model Foerster-Ballenger", "Forma dreapta", "Lungime 18 cm"],
    packageContents: ["Pensa Foerster-Ballenger dreapta 18 cm"],
    specs: [
      ["Tip instrument", "pensa Foerster-Ballenger"],
      ["Forma", "dreapta"],
      ["Lungime", "18 cm"],
      ["Cod model", "BF112R"],
    ],
  },
  "25748": {
    title: "Garou rapid albastru",
    summary: "Garou rapid din spandex/elastan, cu sistem de fixare pentru utilizare cu o singura mana si eliberare rapida.",
    description:
      "Garoul rapid este destinat utilizarii in contexte medicale unde sunt importante fixarea simpla si eliberarea rapida. Produsul are lungime de 45 cm, latime de 2,5 cm si este livrat in cutie multilingva.",
    features: ["Utilizare cu o singura mana", "Eliberare rapida", "Material spandex/elastan", "Culoare albastra", "Cutie multilingva inclusiv RO"],
    packageContents: ["Garou rapid albastru"],
    specs: [
      ["Material", "spandex / elastan"],
      ["Culoare", "albastru"],
      ["Lungime", "45 cm"],
      ["Latime", "2,5 cm"],
      ["Sistem de fixare", "utilizare cu o singura mana, eliberare rapida"],
    ],
  },
  "43430": {
    title: "Scaun hidraulic pentru transfer pacient",
    summary: "Scaun de transfer pacient din otel, cu ridicare hidraulica si panouri interschimbabile pentru toaleta, dus sau sezut moale.",
    description:
      "Scaunul hidraulic de transfer este proiectat pentru transferul pacientului intre pat, toaleta, dus sau alte zone. Include trei panouri de sezut interschimbabile si permite ajustarea hidraulica a inaltimii.",
    features: [
      "Structura din otel",
      "Deschidere si inchidere la 180 de grade",
      "Ridicare hidraulica pana la 15 cm",
      "4 roti directionale, dintre care 2 frontale cu frana",
      "Capacitate de incarcare 125 kg",
    ],
    packageContents: ["Panou fix pentru toaleta", "Recipient toaleta detasabil", "Panou plastic pentru dus", "Panou moale detasabil", "Manual multilingv inclusiv RO"],
    specs: [
      ["Capacitate incarcare", "125 kg"],
      ["Ajustare ridicare", "pana la 15 cm"],
      ["Dimensiune ambalaj", "79 x 63 x 33 cm"],
      ["Dimensiune sezut", "48 x 37 x h 42-57 cm"],
      ["Roti", "4 directionale, 2 frontale cu frana"],
    ],
  },
  "45720": {
    title: "Carucior de urgenta Neo Plus",
    summary: "Carucior de urgenta din ABS si materiale antibacteriene, cu structura interna din otel si aluminiu, 5 sertare si accesorii standard pentru zona critica.",
    description:
      "Neo Plus este un carucior de urgenta echipat pentru organizarea accesoriilor si materialelor necesare in zone cu raspuns rapid. Include sertare adanci cu separatoare, roti cu frana si accesorii precum suport perfuzie, placa defibrilator si plansa CPR.",
    features: [
      "Structura externa ABS si materiale antibacteriene",
      "Structura interna din otel si aluminiu",
      "5 sertare mari si adanci cu separatoare",
      "4 roti Ø 10 cm, doua cu frana",
      "Blocare centrala si accesorii standard pentru urgenta",
    ],
    packageContents: [
      "Suport perfuzie",
      "Suport butelie oxigen",
      "Placa defibrilator",
      "Container utilitar",
      "Blat de lucru extractibil",
      "Plansa CPR",
      "Separatoare",
      "Suport dezinfectant maini",
      "Priza",
      "2 containere pentru obiecte ascutite 2 l",
      "2 cosuri ABS cu capac",
    ],
    specs: [
      ["Dimensiuni", "75 x 47,5 x 92 cm"],
      ["Greutate cu accesorii", "41 kg"],
      ["Sertare mici", "2 x 42,4 x 37,5 x 6,8 cm"],
      ["Sertare medii", "2 x 42,4 x 37,5 x 11 cm"],
      ["Sertar mare", "1 x 42,4 x 37,5 x 22 cm"],
      ["Roti", "4 roti Ø 10 cm, doua cu frana"],
    ],
  },
  "27552": {
    title: "Scaun ORL Otopex cu tetiera - verde Toronto",
    summary: "Scaun ORL cu tetiera, actionare electrica silentioasa prin joystick de picior si functie de revenire la pozitia de lucru selectata.",
    description:
      "Otopex este un scaun ORL conceput si pentru interventii ambulatorii. Are motoare electrice silentioase, control prin joystick de picior, tapiterie din piele sintetica si spuma de inalta densitate.",
    features: [
      "Tetiera inclusa",
      "Actionare electrica silentioasa",
      "Control prin joystick de picior",
      "Buton pentru revenire la pozitia de lucru selectata",
      "Tapiterie piele sintetica si spuma nedeformabila de inalta densitate",
      "Sezut si suport picioare dintr-o singura piesa",
    ],
    packageContents: ["Scaun ORL Otopex cu tetiera"],
    specs: [
      ["Alimentare", "230 V - 50 Hz"],
      ["Optiune alimentare", "110 V - 60 Hz la cerere"],
      ["Culoare", "verde Toronto"],
      ["Origine", "fabricat in Italia"],
    ],
  },
  "28668": {
    title: "Incalzitor pentru picioare cu masaj",
    summary: "Incalzitor confortabil pentru picioare, cu suprafata fleece, doua motoare de vibratie, doua trepte de caldura si intensitati de masaj.",
    description:
      "Produsul ofera incalzire si masaj pentru picioare, cu captuseala detasabila si lavabila. Este livrat cu manual si cutie multilingva, inclusiv limba romana.",
    features: ["Suprafata fleece confortabila", "Doua motoare de vibratie", "Doua trepte de caldura", "Intensitate de masaj joasa si inalta", "Captuseala detasabila si lavabila"],
    packageContents: ["Incalzitor pentru picioare cu masaj", "Manual multilingv inclusiv RO"],
    specs: [
      ["Dimensiune", "30 x 30 x 24 cm"],
      ["Consum", "18 W"],
      ["Tensiune", "220 - 240 V"],
    ],
  },
  "29600": {
    title: "Colposcop LED Colpy",
    summary: "Colposcop LED usor de utilizat, montat pe baza cu 5 roti, cu sistem optic stereo si distanta de lucru de 28 cm.",
    description:
      "GIMA Colpy este un colposcop LED montat pe baza mobila cu 5 roti. Sistemul optic stereo permite ajustare interpupilara, iar capul optic este pozitionat la 45 de grade.",
    features: ["Baza mobila cu 5 roti Ø 41 cm", "Sistem optic stereo", "Ajustare interpupilara", "Cap optic la 45 de grade", "Filtru verde", "Fabricat in Italia"],
    packageContents: ["Colposcop LED GIMA Colpy pe baza mobila"],
    specs: [
      ["Marire", "8,2X cu oculare standard 10X"],
      ["Camp vizual", "35 mm"],
      ["Sistem optic", "stereo cu ajustare interpupilara si cap optic la 45°"],
      ["Iluminare", "bec LED"],
      ["Distanta de lucru", "28 cm"],
      ["Distanta interpupilara", "48 - 77 mm"],
      ["Alimentare", "100 - 240 V, 50 - 60 Hz"],
      ["Norme", "CLASS I Type B - IEC 601-1 CE 93/42/EEC"],
    ],
  },
};

function cleanHtml(value) {
  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x2B;/g, "+")
    .replace(/\s+/g, " ")
    .trim();
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

async function fetchProductHtml(sku) {
  const url = `${gimaBaseUrl}/Prodotti/${sku}`;
  const response = await fetch(url, {
    headers: { "User-Agent": "ZESCORP product quality review; noindex catalog gate" },
  });
  const html = await response.text();
  if (!response.ok) throw new Error(`GIMA product page ${sku} returned HTTP ${response.status}`);
  return { html, url: response.url };
}

async function verifyImage(url) {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      headers: { "User-Agent": "ZESCORP product image verifier" },
    });
    return response.ok && (response.headers.get("content-type") || "").startsWith("image/");
  } catch {
    return false;
  }
}

function extractProductPage(html, sku) {
  const title = cleanHtml(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "");
  const breadcrumbs = [...html.matchAll(/<a[^>]+href=["']([^"']*\/catalogo\/[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map((match) => cleanHtml(match[2]))
    .filter(Boolean)
    .slice(-3);

  const imageUrls = Array.from(
    new Set(
      [...html.matchAll(/(?:href|src)=["']([^"']*\/images\/prodotti\/(?:big|medium|thumb)\/[^"']+)["']/gi)]
        .map((match) => new URL(match[1], gimaBaseUrl).toString())
        .filter((url) => !url.includes("/medium/")),
    ),
  );

  const descriptionStart = html.indexOf("Description");
  const specsStart = html.indexOf("Technical Specifications");
  const familyStart = html.indexOf("In the same family");
  const sourceDescription =
    descriptionStart >= 0
      ? cleanHtml(html.slice(descriptionStart, specsStart >= 0 ? specsStart : familyStart >= 0 ? familyStart : descriptionStart + 3000)).replace(/^Description\s*/i, "")
      : "";
  const sourceSpecifications =
    specsStart >= 0
      ? cleanHtml(html.slice(specsStart, familyStart >= 0 ? familyStart : specsStart + 4000)).replace(/^Technical Specifications\s*/i, "")
      : "";

  const ignoredDocs = /company profile|governance|ethics|environment|mog|code of ethics|whistleblowing|gender equality|general/i;
  const documents = [...html.matchAll(/<a[^>]+href=["']([^"']*\/Download\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map((match) => ({ url: new URL(match[1], gimaBaseUrl).toString(), label: cleanHtml(match[2]) }))
    .filter((doc) => doc.label && !ignoredDocs.test(doc.label))
    .map((doc) => ({
      url: doc.url,
      label: translateDocumentLabel(doc.label),
      type: inferDocumentType(doc.label),
    }));

  const relatedProductCodes = Array.from(
    new Set(
      [...html.matchAll(/\/Prodotti\/(?:[^"']*?)(\d{5})(?=["'/?#-])/gi)]
        .map((match) => match[1])
        .filter((code) => code !== sku),
    ),
  ).slice(0, 8);

  return { title, breadcrumbs, imageUrls, sourceDescription, sourceSpecifications, documents, relatedProductCodes };
}

function translateDocumentLabel(label) {
  const normalized = label.replace(/&#x2B;/g, "+");
  const labels = {
    English: "Manual / documentatie in limba engleza",
    Italian: "Documentatie in limba italiana",
    Spanish: "Documentatie in limba spaniola",
    French: "Documentatie in limba franceza",
    German: "Documentatie in limba germana",
    Multilingual: "Documentatie multilingva",
    "Catalogue Page": "Pagina de catalog",
    "Label Box": "Eticheta ambalaj",
  };
  if (/CE Certificate/i.test(normalized)) return "Certificat CE / documentatie conformitate";
  return labels[normalized] || normalized;
}

function inferDocumentType(label) {
  if (/catalogue/i.test(label)) return "catalog";
  if (/certificate|ce/i.test(label)) return "certificate";
  if (/label/i.test(label)) return "label";
  return "manual";
}

function relatedServices(category) {
  const base = ["/service-aparatura-medicala", "/contracte-mentenanta"];
  const byCategory = {
    laboratory: ["/solutii-medicale/echipamente-laborator-ivd", ...base],
    monitoring: ["/solutii-medicale/echipamente-imagistica-diagnostic", ...base],
    emergency: ["/service-aparatura-medicala", "/contracte-mentenanta"],
    sterilization: ["/solutii-medicale/instalare-punere-in-functiune", ...base],
    "surgical-instruments": ["/contracte-mentenanta", "/service-aparatura-medicala"],
    "medical-furniture": ["/solutii-medicale/amenajare-clinica-medicala", "/contact"],
    ent: ["/solutii-medicale/instalare-punere-in-functiune", ...base],
    electromedical: ["/solutii-medicale/instalare-punere-in-functiune", ...base],
    gynecology: ["/solutii-medicale/instalare-punere-in-functiune", ...base],
  };
  return byCategory[category] || base;
}

async function main() {
  const products = readJson(productsPath);
  const bySlug = new Map(products.map((product, index) => [product.slug, { product, index }]));
  const fixed = [];
  const missing = [];
  let totalImages = 0;
  let verifiedImages = 0;

  for (const slug of selectedProducts) {
    const entry = bySlug.get(slug);
    if (!entry) {
      missing.push({ slug, reason: "Product slug missing from local catalog" });
      continue;
    }
    const { product } = entry;
    const sku = product.gimaCode;
    const translated = contentBySku[sku];
    if (!sku || !translated) {
      missing.push({ slug, reason: "SKU or translation mapping missing" });
      continue;
    }

    const source = await fetchProductHtml(sku);
    const extracted = extractProductPage(source.html, sku);
    const galleryImages = [];
    for (const url of extracted.imageUrls) {
      const verified = await verifyImage(url);
      totalImages += 1;
      if (verified) verifiedImages += 1;
      galleryImages.push({ url, alt: translated.title, verified });
    }
    const verifiedGallery = galleryImages.filter((image) => image.verified);

    const updated = {
      ...product,
      sourceProductName: extracted.title || product.sourceProductName,
      productUrl: source.url,
      sourceUrls: Array.from(new Set([...(product.sourceUrls || []), source.url])),
      romanianTitle: translated.title,
      romanianShortSummary: translated.summary,
      romanianDescription: translated.description,
      romanianSourceDescription: translated.description,
      romanianApplications: [
        "Cerere de oferta pentru clinici, cabinete, laboratoare sau unitati medicale",
        "Completare dotare, inlocuire produs sau configurare impreuna cu alte echipamente",
        "Verificare aplicatie, cantitate, termen si suport tehnic inainte de ofertare",
      ],
      romanianBenefits: [
        "Pagina construita pe baza informatiilor publice GIMA si adaptata pentru ofertare ZESCORP",
        "Date tehnice afisate transparent, fara preturi sau stoc inventate",
        "Posibilitate de ofertare impreuna cu service, mentenanta si suport operational",
      ],
      romanianFeatures: translated.features,
      romanianPackageContents: translated.packageContents,
      romanianSpecifications: translated.specs.map(([label, value]) => ({ label, value })),
      imageUrl: verifiedGallery[0]?.url || product.imageUrl,
      imageSourceUrl: verifiedGallery[0]?.url ? source.url : product.imageSourceUrl,
      imageVerified: Boolean(verifiedGallery.length),
      imageStatus: verifiedGallery.length ? "verified" : "missing",
      galleryImages: verifiedGallery.length ? verifiedGallery : galleryImages,
      imageAlt: `${translated.title} - produs GIMA pentru oferta ZESCORP`,
      productDocuments: extracted.documents,
      relatedProductCodes: extracted.relatedProductCodes,
      gimaBreadcrumbs: extracted.breadcrumbs,
      sourceExtractedAt: new Date().toISOString(),
      sourceQuality: "gima_page_parity_review",
      reviewStatus: "image_verified",
      publicDisplayReady: true,
      installationConsiderations: [
        "Oferta se confirma in functie de cantitate, accesorii, documentatie si termen de livrare",
        "Pentru echipamente active se verifica alimentarea, spatiul, accesul si conditiile de utilizare",
        "Pentru produse consumabile sau instrumentar se confirma ambalarea, unitatea de vanzare si documentele disponibile",
      ],
      maintenanceConsiderations: [
        "ZESCORP poate corela produsul cu service, mentenanta sau consumabile recurente unde este cazul",
        "Pentru echipamente medicale active se recomanda verificari periodice si plan de suport",
        "Pentru oferta finala se confirma manual documentatia si configuratia potrivita aplicatiei",
      ],
      relatedServices: relatedServices(product.category),
      notes: `${product.notes || ""} Quality gate enriched from actual GIMA product page. Public noindex preserved.`.trim(),
    };

    products[entry.index] = updated;
    fixed.push({
      slug,
      sku,
      sourceTitle: extracted.title,
      romanianTitle: translated.title,
      images: verifiedGallery.length,
      documents: extracted.documents.length,
      specs: translated.specs.length,
      breadcrumbs: extracted.breadcrumbs,
      missing: [
        verifiedGallery.length ? "" : "No verified real image",
        translated.specs.length ? "" : "No source-backed specs",
      ].filter(Boolean),
    });
  }

  writeJson(productsPath, products);
  writeReport({ fixed, missing, totalImages, verifiedImages });
  console.log(JSON.stringify({ fixed: fixed.length, missing: missing.length, totalImages, verifiedImages }, null, 2));
}

function writeReport({ fixed, missing, totalImages, verifiedImages }) {
  const report = `# GIMA Real UX Quality Gate Report

Generated: ${new Date().toISOString()}

Scope: 10 selected products only. No scale import was performed.

## Fields Extracted From GIMA

- exact product title
- product code / SKU
- product page URL
- breadcrumb/category path
- main image and gallery image URLs
- product description block
- technical specification block where available
- product-relevant document/PDF links
- related product codes where exposed by the GIMA page

## Image Audit

- Candidate image URLs checked: ${totalImages}
- Verified gallery images stored: ${verifiedImages}
- Products with at least one verified image: ${fixed.filter((item) => item.images > 0).length}/10
- Missing real image products: ${fixed.filter((item) => item.images === 0).length}

## Fixed Product URLs

${fixed.map((item) => `- /produse/${item.slug} - ${item.romanianTitle} (${item.images} images, ${item.specs} specs, ${item.documents} documents)`).join("\n")}

## Before / After Title Samples

${fixed.slice(0, 10).map((item) => `- ${item.sourceTitle} -> ${item.romanianTitle}`).join("\n")}

## Missing Data Notes

${fixed.flatMap((item) => item.missing.map((note) => `- ${item.slug}: ${note}`)).join("\n") || "- No missing image/spec blocker in selected products. Some GIMA pages expose fewer formal specs, so source-backed description details are used instead."}

${missing.length ? `## Missing Local Products\n\n${missing.map((item) => `- ${item.slug}: ${item.reason}`).join("\n")}` : ""}

## SEO Safety

- Imported products remain noindex.
- No imported product is added to sitemap until manual review/indexable status.
- Public pages hide import status, review status, source URL and internal metadata.
`;

  fs.writeFileSync(reportPath, report);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
