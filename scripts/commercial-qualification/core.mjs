import fs from "node:fs";
import path from "node:path";
import {
  CLASSIFICATIONS,
  COMPLIANCE_NOTE,
  EXCLUDED_CLASSIFICATIONS,
  MAJOR_CITIES,
  OUTREACH_STYLES,
  VALUE_MODELS,
} from "./config.mjs";

const CLIENT_CATEGORIES = new Set([
  "centre-radiologie-rx",
  "centre-ct-rmn",
  "clinici-imagistica",
  "clinici-stomatologice-cbct-rx",
  "clinici-veterinare-radiologie",
  "spitale-private",
  "centre-ortopedie-chirurgie-recuperare",
  "laboratoare-ivd",
]);

const CATEGORY_LABELS = {
  "centre-radiologie-rx": "centru radiologie / RX",
  "centre-ct-rmn": "centru CT / RMN",
  "clinici-imagistica": "clinica imagistica",
  "clinici-stomatologice-cbct-rx": "clinica stomatologica CBCT / RX",
  "clinici-veterinare-radiologie": "clinica veterinara cu radiologie",
  "spitale-private": "spital privat",
  "centre-ortopedie-chirurgie-recuperare": "centru medical specializat",
  "laboratoare-ivd": "laborator / IVD",
  "distribuitori-aparatura": "distribuitor aparatura medicala",
  "service-aparatura": "service aparatura medicala",
};

const normalize = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}@.+-]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const first = (value) => (Array.isArray(value) ? value[0] || "" : value || "");

export const domainFromUrl = (value = "") => {
  if (!value) return "";
  try {
    return new URL(value.startsWith("http") ? value : `https://${value}`)
      .hostname.replace(/^www\./, "")
      .toLowerCase();
  } catch {
    return "";
  }
};

const hasAny = (haystack, values) => values.some((value) => haystack.includes(value));
const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));

const identityText = (lead) =>
  normalize(
    [
      lead.companyName,
      lead.category,
      lead.subcategory,
      lead.notes,
      lead.website,
      lead.sourceType,
    ].join(" "),
  );

const hasDncMatch = (lead, dncEntries) => {
  const domain = domainFromUrl(lead.website);
  const email = normalize(lead.publicEmail);
  const phone = normalize(lead.publicPhone);
  const company = normalize(lead.companyName);

  return dncEntries.some((entry) => {
    const candidate = typeof entry === "string" ? { value: entry } : entry || {};
    const values = [
      candidate.leadId,
      candidate.companyName,
      candidate.normalizedCompanyName,
      candidate.domain,
      candidate.website,
      candidate.publicEmail,
      candidate.publicPhone,
      candidate.email,
      candidate.phone,
      candidate.value,
    ].map(normalize);
    return values.some(
      (value) =>
        value &&
        [normalize(lead.leadId), company, domain, email, phone].some(
          (leadValue) => leadValue && leadValue === value,
        ),
    );
  });
};

const classifyIdentity = (lead, dncEntries) => {
  const category = normalize(lead.category);
  const text = identityText(lead);

  if (hasDncMatch(lead, dncEntries) || normalize(lead.outreachStatus).includes("do not contact")) {
    return { classification: CLASSIFICATIONS.doNotContact, reason: "Lead marcat explicit DNC." };
  }

  if (
    category === "distribuitori-aparatura" ||
    hasAny(text, ["distribuitor", "distributie aparatura", "importator", "import si distributie"])
  ) {
    return {
      classification: CLASSIFICATIONS.distributor,
      reason: "Profil public de distributie / import aparatura; separat de lista de clienti directi.",
    };
  }

  if (hasAny(text, ["producator", "manufacturer", "fabricant", "manufacturing"])) {
    return {
      classification: CLASSIFICATIONS.manufacturer,
      reason: "Profil public de producator; separat de lista de clienti directi.",
    };
  }

  if (
    hasAny(text, [
      "firma radioprotectie",
      "servicii radioprotectie",
      "plumbare camere",
      "ecranare rf",
      "rf shielding",
      "amenajari medicale",
      "proiectare medicala",
    ])
  ) {
    return {
      classification: CLASSIFICATIONS.competitor,
      reason: "Profil public care indica servicii suprapuse cu oferta ZESCORP.",
    };
  }

  if (
    category === "service-aparatura" ||
    hasAny(text, ["service aparatura", "reparatii aparatura medicala", "mentenanta aparatura"])
  ) {
    return {
      classification: CLASSIFICATIONS.serviceProvider,
      reason: "Profil public de service; util pentru parteneriate, nu pentru contact comercial direct.",
    };
  }

  return null;
};

const inferSignals = (lead) => {
  const text = identityText(lead);
  const category = normalize(lead.category);
  const city = normalize(lead.city);
  const clinicalCategory = CLIENT_CATEGORIES.has(lead.category);
  const ct = hasAny(text, [" ct ", "computer tomograf", "tomografie", "scanner ct"]) || category === "centre-ct-rmn";
  const mri = hasAny(text, ["rmn", "mri", "rezonanta magnetica"]) || category === "centre-ct-rmn";
  const rx =
    hasAny(text, ["radiologie", "radiografie", " rx ", "x ray", "x-ray"]) ||
    category === "centre-radiologie-rx";
  const dental = hasAny(text, ["dentar", "stomatolog", "cbct", "ortodont"]) || category === "clinici-stomatologice-cbct-rx";
  const laboratory = hasAny(text, ["laborator", "ivd", "analize"]) || category === "laboratoare-ivd";
  const scale = hasAny(text, ["retea", "group", "grup", "spital", "hospital", "hyperclinica", "policlinica", "medical city"]);
  const majorCity = MAJOR_CITIES.has(city);
  const hasEmail = Boolean(first(lead.publicEmail));
  const hasPhone = Boolean(first(lead.publicPhone));
  const hasSource = Array.isArray(lead.sourceUrls) && lead.sourceUrls.length > 0;

  return {
    text,
    category,
    city,
    clinicalCategory,
    ct,
    mri,
    rx,
    dental,
    laboratory,
    scale,
    majorCity,
    hasEmail,
    hasPhone,
    hasSource,
  };
};

const computeScore = (lead, signals) => {
  const factors = {
    likelihoodOfBuyingServices: 0,
    probabilityOfExpansionProject: 0,
    imagingRadiologyActivity: 0,
    clinicSize: 0,
    infrastructureNeeds: 0,
    maintenancePotential: 0,
    estimatedProjectValue: 0,
  };

  if (signals.clinicalCategory) factors.likelihoodOfBuyingServices += 14;
  if (signals.ct || signals.mri) factors.likelihoodOfBuyingServices += 7;
  else if (signals.rx || signals.dental) factors.likelihoodOfBuyingServices += 5;
  if (signals.hasEmail && signals.hasPhone) factors.likelihoodOfBuyingServices += 4;

  if (signals.ct || signals.mri) factors.probabilityOfExpansionProject += 10;
  if (signals.scale) factors.probabilityOfExpansionProject += 3;
  if (signals.rx || signals.dental) factors.probabilityOfExpansionProject += 2;

  if (signals.ct && signals.mri) factors.imagingRadiologyActivity += 20;
  else if (signals.ct || signals.mri) factors.imagingRadiologyActivity += 17;
  else if (signals.rx) factors.imagingRadiologyActivity += 13;
  else if (signals.dental) factors.imagingRadiologyActivity += 9;
  else if (signals.laboratory) factors.imagingRadiologyActivity += 4;

  if (signals.scale) factors.clinicSize += 11;
  else if (signals.ct || signals.mri) factors.clinicSize += 8;
  else if (signals.clinicalCategory) factors.clinicSize += 5;
  if (signals.majorCity) factors.clinicSize += 3;

  if (signals.ct || signals.mri) factors.infrastructureNeeds += 14;
  else if (signals.rx) factors.infrastructureNeeds += 10;
  else if (signals.dental) factors.infrastructureNeeds += 7;
  else if (signals.clinicalCategory) factors.infrastructureNeeds += 4;

  if (signals.ct || signals.mri) factors.maintenancePotential += 5;
  else if (signals.rx || signals.dental) factors.maintenancePotential += 3;
  else if (signals.clinicalCategory) factors.maintenancePotential += 2;

  if (signals.ct || signals.mri) factors.estimatedProjectValue += 5;
  else if (signals.rx || signals.dental) factors.estimatedProjectValue += 3;
  else if (signals.clinicalCategory) factors.estimatedProjectValue += 1;

  Object.keys(factors).forEach((key) => {
    const maxima = {
      likelihoodOfBuyingServices: 25,
      probabilityOfExpansionProject: 15,
      imagingRadiologyActivity: 20,
      clinicSize: 15,
      infrastructureNeeds: 15,
      maintenancePotential: 5,
      estimatedProjectValue: 5,
    };
    factors[key] = clamp(factors[key], 0, maxima[key]);
  });

  return {
    factors,
    total: Object.values(factors).reduce((sum, value) => sum + value, 0),
  };
};

const inferOpportunity = (lead, signals) => {
  if (signals.mri && !signals.ct) {
    return {
      serviceFit: "RMN infrastructure",
      likelyNeed: "RF shielding, preinstalare RMN, HVAC/electric si traseu de instalare",
      recommendedService: "Evaluare infrastructura RMN si RF shielding",
    };
  }
  if (signals.ct && signals.mri) {
    return {
      serviceFit: "CT/RMN infrastructure",
      likelyNeed: "extindere imagistica, preinstalare, radioprotectie si coordonare HVAC/electric",
      recommendedService: "Planificare infrastructura CT/RMN si implementare etapizata",
    };
  }
  if (signals.ct) {
    return {
      serviceFit: "CT infrastructure",
      likelyNeed: "radioprotectie CT, preinstalare, HVAC/electric si relocare daca este cazul",
      recommendedService: "Evaluare infrastructura CT si radioprotectie",
    };
  }
  if (signals.dental) {
    return {
      serviceFit: "CBCT dental clinic",
      likelyNeed: "layout CBCT/RX, radioprotectie si clarificare preliminara CNCAN",
      recommendedService: "Evaluare radioprotectie CBCT/RX si configurare spatiu",
    };
  }
  if (signals.rx) {
    return {
      serviceFit: "Lead shielding / plumbare",
      likelyNeed: "plumbare/radioprotectie camera RX, plan si context preliminar CNCAN",
      recommendedService: "Evaluare radioprotectie si plumbare camera RX",
    };
  }
  if (signals.laboratory) {
    return {
      serviceFit: "Medical fit-out / amenajare medicala",
      likelyNeed: "amenajare tehnica, HVAC/electric si integrare echipamente",
      recommendedService: "Evaluare infrastructura laborator / IVD",
    };
  }
  return {
    serviceFit: "Medical fit-out / amenajare medicala",
    likelyNeed: "evaluare infrastructura, modernizare si suport tehnic",
    recommendedService: "Discutie preliminara pentru amenajare medicala",
  };
};

const estimateOpportunity = (serviceFit) => {
  const model = VALUE_MODELS[serviceFit] || VALUE_MODELS["Medical fit-out / amenajare medicala"];
  return {
    ...model,
    label: `${model.minimum.toLocaleString("ro-RO")} - ${model.maximum.toLocaleString("ro-RO")} EUR`,
  };
};

const buildEvidence = (lead, signals) => {
  const evidence = [`categorie publica: ${CATEGORY_LABELS[lead.category] || lead.category || "nespecificata"}`];
  if (signals.ct && signals.mri) evidence.push("semnal CT/RMN in profilul public");
  else if (signals.ct) evidence.push("semnal CT in profilul public");
  else if (signals.mri) evidence.push("semnal RMN in profilul public");
  else if (signals.rx) evidence.push("semnal radiologie/RX in profilul public");
  if (signals.dental) evidence.push("profil stomatologic/CBCT");
  if (signals.scale) evidence.push("semnal de retea/spital/clinica extinsa");
  if (signals.hasEmail) evidence.push("email public de business");
  if (signals.hasPhone) evidence.push("telefon public de business");
  if (signals.majorCity) evidence.push(`oras prioritar: ${lead.city}`);
  return evidence;
};

const styleForLead = (lead, signals) => {
  if (signals.scale || signals.ct || signals.mri) return OUTREACH_STYLES.executive;
  if (signals.rx || signals.dental) return OUTREACH_STYLES.technical;
  return OUTREACH_STYLES.operations;
};

const buildDrafts = (lead, qualification) => {
  const company = lead.companyName || "echipa";
  const cityText = lead.city ? ` din ${lead.city}` : "";
  const service = qualification.recommendedService;
  const value = qualification.likelyNeed;
  const commonCta =
    "Daca aveti in evaluare o modernizare, o extindere sau o interventie punctuala, va propun o discutie scurta pentru a stabili daca exista un pas util de facut.";
  const signature =
    "Cu respect,\nEchipa ZESCORP\noffice@zescorp.ro\nhttps://zescorp.ro\n\nDaca nu doriti sa mai primiti mesaje de la noi, raspundeti cu «nu doresc» si actualizam lista de contact.";

  return {
    executive: {
      subject: `${company}: discutie pentru planificare infrastructura medicala`,
      intro: `Buna ziua,\n\nVa scriu din partea ZESCORP. Pentru un ${CATEGORY_LABELS[lead.category] || "operator medical"} precum ${company}${cityText}, coordonarea infrastructurii cu echipamentele si calendarul de implementare poate reduce clarificarile tarzii.`,
      body: `Buna ziua,\n\nVa scriu din partea ZESCORP. Pentru un ${CATEGORY_LABELS[lead.category] || "operator medical"} precum ${company}${cityText}, coordonarea infrastructurii cu echipamentele si calendarul de implementare poate reduce clarificarile tarzii.\n\nPutem sustine o evaluare preliminara pentru ${service.toLowerCase()}, cu atentie la ${value}.\n\n${commonCta}\n\n${signature}`,
    },
    technical: {
      subject: `${company}: clarificare tehnica pentru ${service.toLowerCase()}`,
      intro: `Buna ziua,\n\nZESCORP poate sprijini ${company}${cityText} cu o discutie tehnica preliminara pentru ${service.toLowerCase()}.`,
      body: `Buna ziua,\n\nZESCORP poate sprijini ${company}${cityText} cu o discutie tehnica preliminara pentru ${service.toLowerCase()}.\n\nIn astfel de proiecte verificam din timp contextul de spatiu, documentele disponibile si dependentele relevante: ${value}.\n\n${commonCta}\n\n${signature}`,
    },
    operations: {
      subject: `${company}: suport pentru continuitate si modernizare`,
      intro: `Buna ziua,\n\nVa scriu din partea ZESCORP in legatura cu suportul tehnic si planificarea infrastructurii pentru ${company}${cityText}.`,
      body: `Buna ziua,\n\nVa scriu din partea ZESCORP in legatura cu suportul tehnic si planificarea infrastructurii pentru ${company}${cityText}.\n\nPutem ajuta cu ${service.toLowerCase()}, astfel incat urmatorii pasi sa fie clarificati inainte de ofertare sau interventie.\n\n${commonCta}\n\n${signature}`,
    },
  };
};

const rowKey = (lead) =>
  domainFromUrl(lead.website) ||
  normalize(first(lead.publicEmail)) ||
  normalize(first(lead.publicPhone)) ||
  `${normalize(lead.companyName)}|${normalize(lead.city)}`;

export const qualifyLead = (lead, dncEntries = []) => {
  const signals = inferSignals(lead);
  const identityClassification = classifyIdentity(lead, dncEntries);
  const score = computeScore(lead, signals);
  const opportunity = inferOpportunity(lead, signals);
  const estimatedOpportunity = estimateOpportunity(opportunity.serviceFit);
  const evidence = buildEvidence(lead, signals);

  let classification = identityClassification?.classification;
  let classificationReason = identityClassification?.reason;

  if (!classification) {
    if (score.total >= 76 && signals.clinicalCategory) {
      classification = CLASSIFICATIONS.idealClient;
      classificationReason = "Profil clinic relevant, cu semnale comerciale si infrastructura medicala cu valoare ridicata.";
    } else if (score.total >= 52 && signals.clinicalCategory) {
      classification = CLASSIFICATIONS.goodProspect;
      classificationReason = "Profil clinic relevant pentru outreach comercial directionat.";
    } else {
      classification = CLASSIFICATIONS.lowFit;
      classificationReason = "Semnale insuficiente pentru contact comercial prioritar.";
    }
  }

  const excluded = EXCLUDED_CLASSIFICATIONS.has(classification);
  const recommendedStyle = styleForLead(lead, signals);
  const nextBestAction =
    classification === CLASSIFICATIONS.idealClient
      ? "Contact manual prioritar: email scurt, apoi apel daca exista interes."
      : classification === CLASSIFICATIONS.goodProspect
        ? "Email personalizat si verificare manuala inainte de follow-up."
        : "Nu include in coada de contact direct; revizuieste doar daca apare context nou.";

  const qualification = {
    leadId: lead.leadId,
    companyName: lead.companyName,
    category: lead.category,
    city: lead.city,
    county: lead.county,
    website: lead.website,
    domain: domainFromUrl(lead.website),
    publicEmail: first(lead.publicEmail),
    publicPhone: first(lead.publicPhone),
    contactPage: lead.contactPage,
    sourceUrls: lead.sourceUrls || [],
    sourceType: lead.sourceType,
    classification,
    classificationReason,
    excluded,
    exclusionReason: excluded ? classificationReason : "",
    opportunityScore: score.total,
    scoreFactors: score.factors,
    serviceFit: opportunity.serviceFit,
    likelyNeed: opportunity.likelyNeed,
    recommendedService: opportunity.recommendedService,
    estimatedOpportunity,
    recommendedStyle,
    nextBestAction,
    outreachPriority: score.total >= 76 ? "high_priority" : score.total >= 52 ? "medium_priority" : "low_priority",
    evidence,
    confidenceScore: lead.confidenceScore ?? "",
    existingOutreachStatus: lead.outreachStatus || "",
    dateVerified: lead.dateVerified || "",
    complianceNote: COMPLIANCE_NOTE,
    dedupeKey: rowKey(lead),
  };

  qualification.drafts = buildDrafts(lead, qualification);
  const selected =
    recommendedStyle === OUTREACH_STYLES.executive
      ? qualification.drafts.executive
      : recommendedStyle === OUTREACH_STYLES.technical
        ? qualification.drafts.technical
        : qualification.drafts.operations;
  qualification.personalizedSubject = selected.subject;
  qualification.personalizedIntro = selected.intro;
  qualification.personalizedEmailBody = selected.body;
  return qualification;
};

const rankQualified = (qualifications) => {
  const seen = new Set();
  return qualifications
    .filter((lead) => !lead.excluded)
    .sort(
      (a, b) =>
        b.opportunityScore - a.opportunityScore ||
        b.estimatedOpportunity.midpoint - a.estimatedOpportunity.midpoint ||
        a.companyName.localeCompare(b.companyName),
    )
    .map((lead) => {
      const duplicateDomain = seen.has(lead.dedupeKey);
      if (!duplicateDomain) seen.add(lead.dedupeKey);
      return { ...lead, duplicateDomain };
    })
    .filter((lead) => !lead.duplicateDomain)
    .map((lead, index) => ({ ...lead, outreachRank: index + 1, sendFirst: index < 25 }));
};

export const buildQualificationModel = ({ leads, dncEntries = [], outreachState = {} }) => {
  const allQualifications = leads.map((lead) => qualifyLead(lead, dncEntries));
  const qualifiedProspects = rankQualified(allQualifications);
  const personalizedOutreach = qualifiedProspects.map((lead) => {
    const outreach = outreachState.leads?.[lead.leadId] || {};
    return {
      ...lead,
      previousManualStatus: outreach.status || lead.existingOutreachStatus || "",
      followUpDueAt: outreach.nextFollowUpAt || "",
    };
  });

  const followUpCandidates = personalizedOutreach.filter((lead) =>
    ["follow_up_due", "sent_manual"].includes(normalize(lead.previousManualStatus).replaceAll(" ", "_")),
  );
  const counts = Object.values(CLASSIFICATIONS).reduce((result, classification) => {
    result[classification] = allQualifications.filter((lead) => lead.classification === classification).length;
    return result;
  }, {});
  const estimatedPipelineValue = qualifiedProspects.reduce(
    (sum, lead) => sum + lead.estimatedOpportunity.midpoint,
    0,
  );

  return {
    generatedAt: new Date().toISOString(),
    allQualifications,
    qualifiedProspects,
    personalizedOutreach,
    followUpCandidates,
    top25: personalizedOutreach.slice(0, 25),
    top50: personalizedOutreach.slice(0, 50),
    groups: {
      competitors: allQualifications.filter((lead) => lead.classification === CLASSIFICATIONS.competitor),
      distributors: allQualifications.filter((lead) => lead.classification === CLASSIFICATIONS.distributor),
      manufacturers: allQualifications.filter((lead) => lead.classification === CLASSIFICATIONS.manufacturer),
      doNotContact: allQualifications.filter((lead) => lead.classification === CLASSIFICATIONS.doNotContact),
      serviceProviders: allQualifications.filter((lead) => lead.classification === CLASSIFICATIONS.serviceProvider),
      lowFit: allQualifications.filter((lead) => lead.classification === CLASSIFICATIONS.lowFit),
    },
    summary: {
      totalLeadsAnalyzed: leads.length,
      qualifiedProspects: qualifiedProspects.length,
      excludedCompetitors: counts[CLASSIFICATIONS.competitor] || 0,
      excludedDistributors: counts[CLASSIFICATIONS.distributor] || 0,
      excludedManufacturers: counts[CLASSIFICATIONS.manufacturer] || 0,
      excludedDoNotContact: counts[CLASSIFICATIONS.doNotContact] || 0,
      serviceProvidersSeparated: counts[CLASSIFICATIONS.serviceProvider] || 0,
      lowFitSeparated: counts[CLASSIFICATIONS.lowFit] || 0,
      idealClients: counts[CLASSIFICATIONS.idealClient] || 0,
      goodProspects: counts[CLASSIFICATIONS.goodProspect] || 0,
      sendFirstCount: Math.min(25, qualifiedProspects.length),
      estimatedPipelineValue,
    },
  };
};

const readJson = (filePath, fallback) => {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

export const loadQualificationInputs = (workspaceRoot = process.cwd()) => {
  const dataDir = path.join(workspaceRoot, "data", "lead-research");
  return {
    leads: readJson(path.join(dataDir, "verified-leads.json"), []),
    dncEntries: readJson(path.join(dataDir, "do-not-contact.json"), []),
    outreachState: readJson(path.join(dataDir, "outreach-state.json"), {}),
  };
};

export const buildQualificationReport = (workspaceRoot = process.cwd()) =>
  buildQualificationModel(loadQualificationInputs(workspaceRoot));
