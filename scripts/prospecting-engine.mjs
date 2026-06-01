import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const COMPANY_IDENTITY =
  "SC ZES MEDCORP S.R.L. | office@zescorp.ro | 0725 514 782";
export const OPT_OUT_LINE =
  "Daca mesajul nu este relevant, raspundeti cu «nu doresc» si nu vom reveni.";
export const PUBLIC_CONTACT_VERIFIED = "Verified public business contact";
export const RESEARCH_REQUIRED = "Research required";
export const DO_NOT_CONTACT = "Do not contact";

export const categories = [
  {
    id: "clinici-imagistica",
    label: "Clinici imagistica",
    baseScore: 48,
    partnership: false,
    serviceAngle:
      "Planificare infrastructura RX/CT/RMN, modernizare, radioprotectie si evaluare preliminara.",
    searchQueries: [
      '"clinica imagistica" {city} contact',
      '"centru imagistica medicala" {city}',
      'site:.ro imagistica medicala {city} contact',
    ],
    emailSubject: "Discutie tehnica pentru infrastructura de imagistica",
    emailBody:
      "Buna ziua,\n\nVa contactez din partea ZES MEDCORP. Sprijinim clinicile care planifica, modernizeaza sau clarifica infrastructura pentru imagistica medicala. Daca aveti un proiect RX, CT sau RMN in evaluare, putem organiza o discutie tehnica preliminara si o lista clara de informatii necesare.\n\nDate companie: {company_context}\n\n{sender_identity}\n{opt_out}",
    linkedIn:
      "Buna ziua. Reprezint ZES MEDCORP si lucrez cu proiecte de infrastructura pentru imagistica medicala. Daca aveti in evaluare un proiect RX, CT sau RMN, pot trimite un traseu scurt de clarificare tehnica.",
    followUp1:
      "Revin cu un mesaj scurt: daca aveti un proiect de imagistica in evaluare, putem incepe cu planul spatiului si tipul echipamentului. Daca nu este relevant acum, inchid aici conversatia.",
    followUp2:
      "Ultimul mesaj din partea mea: ramanem disponibili pentru o discutie tehnica atunci cand apare un proiect RX, CT sau RMN. Nu voi mai reveni daca nu este util.",
    cadence: "Follow-up 1: 4 zile lucratoare; Follow-up 2: 8 zile lucratoare dupa primul",
  },
  {
    id: "centre-radiologie",
    label: "Centre radiologie",
    baseScore: 52,
    partnership: false,
    serviceAngle:
      "Proiectare camera RX, plumbare radiologica, traseu preliminar CNCAN si service radiologie.",
    searchQueries: [
      '"centru radiologie" {city} contact',
      '"radiologie" {city} "contact"',
      '"camera RX" clinica {city}',
    ],
    emailSubject: "Evaluare preliminara pentru radiologie si camera RX",
    emailBody:
      "Buna ziua,\n\nVa contactez din partea ZES MEDCORP. Pentru proiecte de radiologie, putem ajuta cu structurarea preliminara a camerei RX, radioprotectie, documentatie tehnica si pasii care necesita validare de specialitate. Daca aveti un spatiu nou sau o modernizare, putem incepe cu planul si tipul echipamentului.\n\nDate companie: {company_context}\n\n{sender_identity}\n{opt_out}",
    linkedIn:
      "Buna ziua. Lucrez cu ZES MEDCORP pe proiecte de radiologie si camere RX. Daca aveti o modernizare sau o camera noua in plan, pot trimite un checklist preliminar pentru discutia tehnica.",
    followUp1:
      "Revin punctual: pentru o prima evaluare RX sunt suficiente planul camerei, tipul echipamentului si orasul. Daca nu aveti un proiect activ, inchid aici mesajele.",
    followUp2:
      "Ramanem disponibili cand apare un proiect de radiologie. Nu voi mai reveni dupa acest mesaj daca nu este relevant.",
    cadence: "Follow-up 1: 3-5 zile lucratoare; Follow-up 2: 7-10 zile dupa primul",
  },
  {
    id: "stomatologie-cbct-rx",
    label: "Cabinete stomatologice CBCT/RX",
    baseScore: 43,
    partnership: false,
    serviceAngle:
      "Clarificare preliminara pentru CBCT/RX, radioprotectie, layout si service aparatura.",
    searchQueries: [
      '"cabinet stomatologic" CBCT {city}',
      '"radiologie dentara" {city} contact',
      '"CBCT" {city} cabinet contact',
    ],
    emailSubject: "Clarificare tehnica pentru CBCT sau RX dentar",
    emailBody:
      "Buna ziua,\n\nVa contactez din partea ZES MEDCORP. Pentru cabinete care pregatesc sau modernizeaza zona CBCT/RX, putem ajuta cu o evaluare preliminara a spatiului, informatiilor tehnice si pasilor de radioprotectie care trebuie validati de specialisti autorizati.\n\nDate companie: {company_context}\n\n{sender_identity}\n{opt_out}",
    linkedIn:
      "Buna ziua. Reprezint ZES MEDCORP. Pentru proiecte CBCT/RX dentar putem ajuta cu structurarea preliminara a spatiului si a informatiilor necesare specialistilor.",
    followUp1:
      "Revin doar cu o clarificare: pentru o discutie initiala CBCT/RX sunt utile planul, echipamentul si termenul proiectului. Daca nu este relevant, nu mai revin.",
    followUp2:
      "Inchid aici mesajele. Raminem disponibili cand apare un proiect CBCT/RX care necesita evaluare preliminara.",
    cadence: "Follow-up 1: 5 zile lucratoare; Follow-up 2: 8 zile dupa primul",
  },
  {
    id: "veterinare-radiologie",
    label: "Clinici veterinare cu radiologie",
    baseScore: 39,
    partnership: false,
    serviceAngle:
      "Evaluare camera RX veterinara, radioprotectie si suport pentru aparatura.",
    searchQueries: [
      '"clinica veterinara" radiologie {city}',
      '"cabinet veterinar" RX {city}',
      '"radiologie veterinara" {city} contact',
    ],
    emailSubject: "Suport preliminar pentru radiologie veterinara",
    emailBody:
      "Buna ziua,\n\nVa contactez din partea ZES MEDCORP. Pentru clinici veterinare cu radiologie putem ajuta cu trierea preliminara a spatiului RX, a documentatiei si a nevoilor de service. Orice cerinta finala de radioprotectie trebuie validata de specialisti autorizati.\n\nDate companie: {company_context}\n\n{sender_identity}\n{opt_out}",
    linkedIn:
      "Buna ziua. Lucrez cu ZES MEDCORP pe proiecte de infrastructura si service medical. Daca aveti radiologie veterinara, putem trimite un checklist preliminar pentru spatiu si aparatura.",
    followUp1:
      "Revin cu un mesaj scurt: daca aveti o camera RX veterinara sau o problema de aparatura, putem incepe de la plan si modelul echipamentului.",
    followUp2:
      "Inchid aici mesajele. Raminem disponibili cand apare un context tehnic relevant.",
    cadence: "Follow-up 1: 5 zile lucratoare; Follow-up 2: 8 zile dupa primul",
  },
  {
    id: "distribuitori-aparatura",
    label: "Distribuitori aparatura medicala",
    baseScore: 50,
    partnership: true,
    serviceAngle:
      "Parteneriat pentru infrastructura, preinstalare, service, radioprotectie si proiecte integrate.",
    searchQueries: [
      '"distribuitor aparatura medicala" Romania contact',
      '"echipamente medicale" distribuitor Romania',
      '"aparatura imagistica" distribuitor Romania',
    ],
    emailSubject: "Posibila colaborare pentru proiecte medicale integrate",
    emailBody:
      "Buna ziua,\n\nVa contactez din partea ZES MEDCORP. Cautam discutii punctuale cu distribuitori care au nevoie de suport pentru infrastructura, preinstalare, radioprotectie, RF shielding sau service in proiecte medicale. Daca exista complementaritate, putem programa o discutie scurta.\n\nDate companie: {company_context}\n\n{sender_identity}\n{opt_out}",
    linkedIn:
      "Buna ziua. Reprezint ZES MEDCORP. Lucram pe infrastructura medicala, preinstalare si service si cautam colaborari punctuale cu distribuitori de aparatura.",
    followUp1:
      "Revin scurt privind posibila colaborare pe proiecte de infrastructura si preinstalare. Daca nu exista interes acum, inchid aici mesajele.",
    followUp2:
      "Ultimul mesaj din partea mea. Raminem disponibili pentru colaborari punctuale cand apare un proiect potrivit.",
    cadence: "Follow-up 1: 5 zile lucratoare; Follow-up 2: 10 zile dupa primul",
  },
  {
    id: "service-aparatura",
    label: "Service aparatura medicala",
    baseScore: 46,
    partnership: true,
    serviceAngle:
      "Parteneriat regional, triere service si complementaritate pentru continuitate operationala.",
    searchQueries: [
      '"service aparatura medicala" Romania contact',
      '"service echipamente medicale" {city}',
      '"mentenanta aparatura medicala" {city}',
    ],
    emailSubject: "Discutie de colaborare pentru service aparatura medicala",
    emailBody:
      "Buna ziua,\n\nVa contactez din partea ZES MEDCORP. Ne intereseaza discutii de colaborare cu echipe de service aparatura medicala pentru acoperire punctuala, triere si proiecte in care competentele sunt complementare.\n\nDate companie: {company_context}\n\n{sender_identity}\n{opt_out}",
    linkedIn:
      "Buna ziua. Reprezint ZES MEDCORP si cautam colaborari punctuale cu echipe de service aparatura medicala pentru proiecte complementare.",
    followUp1:
      "Revin privind colaborarea punctuala pentru service. Daca nu este potrivit pentru echipa dvs., inchid aici discutia.",
    followUp2:
      "Ultimul mesaj din partea mea. Raminem disponibili pentru colaborari atunci cand apare un caz potrivit.",
    cadence: "Follow-up 1: 5 zile lucratoare; Follow-up 2: 10 zile dupa primul",
  },
  {
    id: "proiectare-medicala",
    label: "Firme proiectare medicala",
    baseScore: 54,
    partnership: true,
    serviceAngle:
      "Parteneriat pentru radiologie, imagistica, radioprotectie, RF shielding si integrare tehnica.",
    searchQueries: [
      '"proiectare medicala" Romania contact',
      '"proiectare clinica medicala" Romania',
      '"arhitectura medicala" Romania contact',
    ],
    emailSubject: "Colaborare tehnica pentru proiecte de infrastructura medicala",
    emailBody:
      "Buna ziua,\n\nVa contactez din partea ZES MEDCORP. Lucram pe infrastructura pentru imagistica medicala, radioprotectie, RF shielding si integrare tehnica. Ne intereseaza colaborari punctuale cu firme de proiectare pentru proiecte care cer coordonare de specialitate.\n\nDate companie: {company_context}\n\n{sender_identity}\n{opt_out}",
    linkedIn:
      "Buna ziua. Reprezint ZES MEDCORP. Lucram pe infrastructura tehnica pentru imagistica si cautam colaborari punctuale cu proiectanti medicali.",
    followUp1:
      "Revin scurt privind o posibila colaborare tehnica. Daca nu este relevant acum, inchid aici mesajele.",
    followUp2:
      "Ultimul mesaj din partea mea. Raminem disponibili pentru proiecte medicale in care competentele sunt complementare.",
    cadence: "Follow-up 1: 5 zile lucratoare; Follow-up 2: 10 zile dupa primul",
  },
  {
    id: "hvac-electric-medical",
    label: "HVAC/electric medical",
    baseScore: 49,
    partnership: true,
    serviceAngle:
      "Parteneriat pentru HVAC, electric, racire si coordonare tehnica in proiecte imagistice.",
    searchQueries: [
      '"HVAC medical" Romania contact',
      '"instalatii electrice clinici" Romania',
      '"HVAC spatii medicale" Romania contact',
    ],
    emailSubject: "Colaborare HVAC/electric pentru proiecte medicale",
    emailBody:
      "Buna ziua,\n\nVa contactez din partea ZES MEDCORP. In proiectele de imagistica apar frecvent dependente HVAC, electrice si de racire care cer coordonare timpurie. Ne intereseaza discutii de colaborare cu firme specializate pentru proiecte punctuale.\n\nDate companie: {company_context}\n\n{sender_identity}\n{opt_out}",
    linkedIn:
      "Buna ziua. Reprezint ZES MEDCORP. Pentru proiecte de imagistica avem nevoie periodic de colaborare HVAC/electric si coordonare tehnica timpurie.",
    followUp1:
      "Revin scurt privind colaborarea HVAC/electric pe proiecte medicale. Daca nu este relevant acum, inchid aici discutia.",
    followUp2:
      "Ultimul mesaj din partea mea. Raminem disponibili cand apare un proiect potrivit.",
    cadence: "Follow-up 1: 5 zile lucratoare; Follow-up 2: 10 zile dupa primul",
  },
  {
    id: "fonduri-europene-medicale",
    label: "Consultanti fonduri europene medicale",
    baseScore: 51,
    partnership: true,
    serviceAngle:
      "Parteneriat pentru specificatii tehnice, infrastructura, echipamente si pregatirea contextului de ofertare.",
    searchQueries: [
      '"fonduri europene" clinica medicala consultant',
      '"consultanta fonduri europene" medical Romania',
      '"fonduri europene" echipamente medicale consultant',
    ],
    emailSubject: "Colaborare pentru proiecte medicale finantate",
    emailBody:
      "Buna ziua,\n\nVa contactez din partea ZES MEDCORP. Pentru proiecte medicale finantate putem ajuta cu structurarea preliminara a infrastructurii, listelor de echipamente si informatiilor necesare ofertarii. Ne intereseaza colaborari punctuale cu consultanti care lucreaza in zona medicala.\n\nDate companie: {company_context}\n\n{sender_identity}\n{opt_out}",
    linkedIn:
      "Buna ziua. Reprezint ZES MEDCORP. Pentru proiecte medicale finantate putem sprijini partea preliminara de infrastructura si context tehnic pentru ofertare.",
    followUp1:
      "Revin scurt privind colaborarea pentru proiecte medicale finantate. Daca nu este relevant acum, inchid aici mesajele.",
    followUp2:
      "Ultimul mesaj din partea mea. Raminem disponibili pentru proiecte in care este util suportul tehnic preliminar.",
    cadence: "Follow-up 1: 5 zile lucratoare; Follow-up 2: 10 zile dupa primul",
  },
];

export const scoringRules = [
  ["Categorie de baza", "Scorul de baza vine din potrivirea categoriei cu serviciile ZESCORP.", "39-54"],
  ["Website public", "Website business valid, verificat manual.", "+5"],
  ["Email public business", "Email public al companiei, nu email personal obtinut indirect.", "+10"],
  ["Telefon public business", "Telefon public de business.", "+4"],
  ["Pagina contact", "Pagina oficiala de contact exista.", "+4"],
  ["Source URL", "URL public care justifica datele de contact.", "+7"],
  ["Contact verificat", "Marcaj manual dupa verificarea sursei publice si a relevantei.", "+10"],
  ["Semnal proiect activ", "Doar dupa verificare manuala: proiect, extindere, achizitie sau downtime.", "+12"],
  ["Parteneriat relevant", "Distribuitor, proiectant, HVAC/electric, service sau consultant medical.", "+8"],
  ["Do not contact", "Opt-out sau solicitare expresa de oprire.", "-100 si blocare"],
];

export const complianceNotes = [
  ["Regula principala", "Sistemul pregateste task-uri. Nu trimite automat emailuri, mesaje LinkedIn sau WhatsApp."],
  ["Contacte publice", "Foloseste doar date business publicate de companie pe website, pagina oficiala sau profil oficial."],
  ["Sursa obligatorie", "Completeaza Source URL si Last Verified Date inainte de orice outreach manual."],
  ["Fara date inventate", "Nu completa emailuri, telefoane, website-uri sau persoane daca nu exista o sursa publica verificabila."],
  ["Opt-out", `Include linia: ${OPT_OUT_LINE}`],
  ["Do not contact", "Daca un contact cere oprirea mesajelor, seteaza Opt-out / DNC = Do not contact. Nu mai reveni."],
  ["Volum recomandat", "Pastreaza 5-10 mesaje manuale bine personalizate pe zi. Coada de 30 este pentru selectie si cercetare."],
  ["LinkedIn", "Nu automatiza cereri de conectare si nu copia acelasi mesaj catre profiluri nerelevante."],
  ["Date medicale", "Nu colecta date medicale despre pacienti, diagnostice sau documente clinice in prospecting."],
  ["CNCAN", "Nu promite autorizari sau conformitate finala. Foloseste formularea evaluare preliminara si validare de specialist."],
  ["Audit", "Pastreaza status, ultima data de contact, urmatoarea actiune si sursa publica pentru fiecare lead."],
];

const cities = [
  "Bucuresti",
  "Cluj-Napoca",
  "Iasi",
  "Timisoara",
  "Brasov",
  "Constanta",
  "Craiova",
  "Oradea",
  "Sibiu",
  "Ploiesti",
  "Targu Mures",
  "Arad",
];

export function buildProspectingModel({ importedLeads = [], seedCount = 100 } = {}) {
  const seedLeads = importedLeads.length ? [] : createResearchSeed(seedCount);
  const sourceLeads = [...importedLeads.map(normalizeImportedLead), ...seedLeads];
  const leads = deduplicateLeads(sourceLeads);
  const scoredLeads = leads.map(scoreLead);
  const todayOutreach = buildTodayOutreach(scoredLeads);
  const followUps = buildFollowUpQueue(scoredLeads);
  const partners = buildHighPriorityPartners(scoredLeads);

  return {
    generatedAt: new Date().toISOString(),
    leads: scoredLeads,
    todayOutreach,
    followUps,
    partners,
    categories,
    scoringRules,
    complianceNotes,
    duplicatesRemoved: sourceLeads.length - leads.length,
  };
}

export function createResearchSeed(seedCount = 100) {
  return Array.from({ length: seedCount }, (_, index) => {
    const category = categories[index % categories.length];
    const city = cities[index % cities.length];
    const query = category.searchQueries[index % category.searchQueries.length].replace("{city}", city);
    return {
      leadId: `RESEARCH-${String(index + 1).padStart(3, "0")}`,
      companyName: "",
      categoryId: category.id,
      category: category.label,
      city,
      website: "",
      publicEmail: "",
      publicPhone: "",
      contactPage: "",
      sourceUrl: "",
      contactVerification: RESEARCH_REQUIRED,
      priorityScore: category.baseScore,
      reasonForPriority: `Research task pentru ${category.label}; contactele business trebuie verificate manual.`,
      suggestedServiceAngle: category.serviceAngle,
      suggestedEmailSubject: category.emailSubject,
      suggestedEmailBody: applyTemplate(category.emailBody),
      followUp1: category.followUp1,
      followUp2: category.followUp2,
      status: RESEARCH_REQUIRED,
      lastContactedDate: "",
      nextAction: "Research: identifica firma si verifica un contact business public.",
      optOutDnc: "No",
      owner: "",
      notes: "Seed demonstrativ. Nu trimite outreach pana la completarea si verificarea sursei publice.",
      queryTemplate: query,
      linkedInCompanyProfileUrl: "",
      lastVerifiedDate: "",
      readyForManualOutreach: "No",
      projectSignal: "No",
    };
  });
}

export function scoreLead(lead) {
  const category = categories.find((item) => item.id === lead.categoryId) ?? categories[0];
  const sourceVerified = Boolean(lead.sourceUrl && lead.lastVerifiedDate);
  const contactVerified =
    lead.contactVerification === PUBLIC_CONTACT_VERIFIED && sourceVerified;
  const hasPublicContact = Boolean(lead.publicEmail || lead.publicPhone || lead.contactPage);
  const doNotContact = lead.optOutDnc === DO_NOT_CONTACT;
  const score =
    category.baseScore +
    (lead.website ? 5 : 0) +
    (lead.publicEmail ? 10 : 0) +
    (lead.publicPhone ? 4 : 0) +
    (lead.contactPage ? 4 : 0) +
    (lead.sourceUrl ? 7 : 0) +
    (contactVerified ? 10 : 0) +
    (lead.projectSignal === "Yes" ? 12 : 0) +
    (category.partnership ? 8 : 0) -
    (doNotContact ? 100 : 0);
  const readyForManualOutreach =
    !doNotContact && contactVerified && Boolean(lead.companyName) && hasPublicContact
      ? "Yes"
      : "No";
  const reason =
    doNotContact
      ? "Blocare do-not-contact."
      : readyForManualOutreach === "Yes"
        ? "Firma si contact business public verificate manual; pregatit pentru mesaj personalizat."
        : `Research task pentru ${category.label}; contactele business trebuie verificate manual.`;

  return {
    ...lead,
    categoryId: category.id,
    category: category.label,
    priorityScore: Math.max(0, score),
    reasonForPriority: reason,
    suggestedServiceAngle: lead.suggestedServiceAngle || category.serviceAngle,
    suggestedEmailSubject: lead.suggestedEmailSubject || category.emailSubject,
    suggestedEmailBody: lead.suggestedEmailBody || applyTemplate(category.emailBody, lead.companyName),
    followUp1: lead.followUp1 || category.followUp1,
    followUp2: lead.followUp2 || category.followUp2,
    readyForManualOutreach,
    nextAction: doNotContact
      ? "Nu contacta. Pastreaza marcajul DNC."
      : readyForManualOutreach === "Yes"
        ? "Revizuieste personalizarea si trimite manual un singur mesaj relevant."
        : "Research: identifica firma si verifica un contact business public.",
  };
}

export function buildTodayOutreach(leads) {
  const sorted = [...leads].sort((a, b) => b.priorityScore - a.priorityScore);
  const ready = sorted.filter((lead) => lead.readyForManualOutreach === "Yes");
  const research = sorted.filter((lead) => lead.readyForManualOutreach !== "Yes");
  const manualCandidates = [...ready, ...research].slice(0, 30);
  const linkedInCandidates = sorted.slice(30, 50);

  return [
    ...manualCandidates.map((lead, index) => ({
      taskId: `OUTREACH-${String(index + 1).padStart(2, "0")}`,
      leadId: lead.leadId,
      taskType:
        lead.readyForManualOutreach === "Yes"
          ? "Manual personalized outreach"
          : "Research + qualify public business contact",
      companyName: lead.companyName,
      category: lead.category,
      city: lead.city,
      priorityScore: lead.priorityScore,
      channel:
        lead.readyForManualOutreach === "Yes" && lead.publicEmail ? "Email manual" : "Manual research",
      contactTarget: lead.publicEmail || lead.publicPhone || lead.contactPage,
      suggestedEmailSubject: lead.suggestedEmailSubject,
      nextAction: lead.nextAction,
      complianceGuardrail:
        lead.readyForManualOutreach === "Yes"
          ? "Personalizeaza si verifica sursa inainte de trimitere manuala."
          : "Nu trimite nimic. Gaseste si verifica sursa business publica.",
    })),
    ...linkedInCandidates.map((lead, index) => ({
      taskId: `LINKEDIN-${String(index + 1).padStart(2, "0")}`,
      leadId: lead.leadId,
      taskType: "LinkedIn company/profile research",
      companyName: lead.companyName,
      category: lead.category,
      city: lead.city,
      priorityScore: lead.priorityScore,
      channel: "LinkedIn manual",
      contactTarget: lead.linkedInCompanyProfileUrl,
      suggestedEmailSubject: "Vezi template LinkedIn din foaia Templates",
      nextAction:
        lead.linkedInCompanyProfileUrl
          ? "Revizuieste profilul si pregateste un mesaj LinkedIn personalizat."
          : "Gaseste profilul oficial al companiei. Nu automatiza conectarea.",
      complianceGuardrail: "Conectare si mesaj manual, relevant, fara bulk automation.",
    })),
  ];
}

export function buildFollowUpQueue(leads) {
  const actual = leads
    .filter(
      (lead) =>
        lead.readyForManualOutreach === "Yes" &&
        lead.status === "Follow-up due" &&
        lead.optOutDnc !== DO_NOT_CONTACT,
    )
    .slice(0, 10)
    .map((lead, index) => ({
      taskId: `FOLLOWUP-${String(index + 1).padStart(2, "0")}`,
      leadId: lead.leadId,
      companyName: lead.companyName,
      category: lead.category,
      stage: "Follow-up due",
      dueDate: lead.nextFollowUpDate || "",
      messageTemplate: lead.followUp1,
      status: "Manual follow-up due",
      complianceGuardrail: "Verifica opt-out si istoricul inainte de mesaj.",
    }));

  if (actual.length >= 10) {
    return actual;
  }

  const demoSlots = leads.slice(50, 50 + (10 - actual.length)).map((lead, index) => ({
    taskId: `FOLLOWUP-DEMO-${String(index + 1).padStart(2, "0")}`,
    leadId: lead.leadId,
    companyName: "",
    category: lead.category,
    stage: "Demo cadence slot",
    dueDate: "",
    messageTemplate: lead.followUp1,
    status: "Inactive demo slot",
    complianceGuardrail: "Nu trimite. Activeaza doar dupa primul contact manual verificat.",
  }));

  return [...actual, ...demoSlots];
}

export function buildHighPriorityPartners(leads) {
  const preferredCategories = [
    "proiectare-medicala",
    "distribuitori-aparatura",
    "hvac-electric-medical",
    "fonduri-europene-medicale",
    "service-aparatura",
  ];

  return preferredCategories.map((categoryId, index) => {
    const lead = leads.find((item) => item.categoryId === categoryId) ?? leads[index];
    return {
      taskId: `PARTNER-${String(index + 1).padStart(2, "0")}`,
      leadId: lead?.leadId ?? "",
      companyName: lead?.companyName ?? "",
      category: lead?.category ?? categoryId,
      priorityScore: lead?.priorityScore ?? "",
      partnershipAngle: lead?.suggestedServiceAngle ?? "",
      sourceUrl: lead?.sourceUrl ?? "",
      nextAction:
        lead?.readyForManualOutreach === "Yes"
          ? "Revizuieste complementaritatea si pregateste o discutie manuala."
          : "Research: identifica o firma relevanta si verifica sursa business publica.",
      status: lead?.readyForManualOutreach === "Yes" ? "Ready for manual review" : RESEARCH_REQUIRED,
    };
  });
}

export function deduplicateLeads(leads) {
  const seen = new Set();
  return leads.filter((lead) => {
    const publicIdentity = [
      normalizeToken(lead.website),
      normalizeToken(lead.publicEmail),
      normalizeToken(lead.publicPhone),
      normalizeToken(lead.companyName),
    ].filter(Boolean);
    const stableIdentity = [
      ...publicIdentity,
      normalizeToken(lead.categoryId),
      normalizeToken(lead.city),
    ]
      .filter(Boolean)
      .join("|");
    const key = publicIdentity.length ? stableIdentity : normalizeToken(lead.leadId);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function normalizeImportedLead(raw, index = 0) {
  const category =
    categories.find((item) => item.id === raw.categoryId) ??
    categories.find((item) => item.label === raw.category) ??
    categories[0];
  const sourceVerified = Boolean(raw.sourceUrl && raw.lastVerifiedDate);
  const requestedVerification =
    raw.contactVerification === PUBLIC_CONTACT_VERIFIED && sourceVerified
      ? PUBLIC_CONTACT_VERIFIED
      : RESEARCH_REQUIRED;

  return {
    leadId: raw.leadId || `IMPORT-${String(index + 1).padStart(3, "0")}`,
    companyName: raw.companyName || "",
    categoryId: category.id,
    category: category.label,
    city: raw.city || "",
    website: raw.website || "",
    publicEmail: raw.publicEmail || "",
    publicPhone: raw.publicPhone || "",
    contactPage: raw.contactPage || "",
    sourceUrl: raw.sourceUrl || "",
    contactVerification: requestedVerification,
    priorityScore: Number(raw.priorityScore || category.baseScore),
    reasonForPriority: raw.reasonForPriority || "",
    suggestedServiceAngle: raw.suggestedServiceAngle || category.serviceAngle,
    suggestedEmailSubject: raw.suggestedEmailSubject || category.emailSubject,
    suggestedEmailBody: raw.suggestedEmailBody || applyTemplate(category.emailBody, raw.companyName),
    followUp1: raw.followUp1 || category.followUp1,
    followUp2: raw.followUp2 || category.followUp2,
    status: raw.status || RESEARCH_REQUIRED,
    lastContactedDate: raw.lastContactedDate || "",
    nextAction: raw.nextAction || "",
    optOutDnc: raw.optOutDnc || "No",
    owner: raw.owner || "",
    notes: raw.notes || "",
    queryTemplate: raw.queryTemplate || category.searchQueries[0],
    linkedInCompanyProfileUrl: raw.linkedInCompanyProfileUrl || "",
    lastVerifiedDate: raw.lastVerifiedDate || "",
    readyForManualOutreach: "No",
    projectSignal: raw.projectSignal || "No",
    nextFollowUpDate: raw.nextFollowUpDate || "",
  };
}

export async function writeCsvOutputs(model, outputDir) {
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(
    path.join(outputDir, "lead-master-template.csv"),
    toCsv(model.leads),
    "utf8",
  );
  await fs.writeFile(
    path.join(outputDir, "today-outreach.csv"),
    toCsv(model.todayOutreach),
    "utf8",
  );
  await fs.writeFile(
    path.join(outputDir, "follow-up-queue.csv"),
    toCsv(model.followUps),
    "utf8",
  );
  await fs.writeFile(
    path.join(outputDir, "high-priority-partners.csv"),
    toCsv(model.partners),
    "utf8",
  );
}

function applyTemplate(template, companyName = "") {
  return template
    .replace("{company_context}", companyName || "[personalizeaza dupa verificarea companiei]")
    .replace("{sender_identity}", COMPANY_IDENTITY)
    .replace("{opt_out}", OPT_OUT_LINE);
}

function normalizeToken(value) {
  return String(value ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

function toCsv(rows) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  return [
    headers.map(escapeCsv).join(","),
    ...rows.map((row) => headers.map((header) => escapeCsv(row[header])).join(",")),
  ].join("\n");
}

function escapeCsv(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

export function parseCsv(text) {
  const records = [];
  let record = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const next = text[index + 1];

    if (character === '"' && quoted && next === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      record.push(value);
      value = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && next === "\n") index += 1;
      record.push(value);
      value = "";
      if (record.some((cell) => cell.trim())) records.push(record);
      record = [];
    } else {
      value += character;
    }
  }

  if (value || record.length) {
    record.push(value);
    records.push(record);
  }
  if (!records.length) return [];

  const headers = records[0];
  return records.slice(1).map((values) =>
    Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])),
  );
}

async function runCli() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const projectRoot = path.resolve(scriptDir, "..");
  const args = process.argv.slice(2);
  const inputArg = args.find((arg) => arg.startsWith("--input="));
  const outputArg = args.find((arg) => arg.startsWith("--output="));
  const outputDir = path.resolve(
    outputArg?.slice("--output=".length) || path.join(projectRoot, "outputs", "phase-80a", "csv"),
  );
  const importedLeads = inputArg
    ? parseCsv(await fs.readFile(path.resolve(inputArg.slice("--input=".length)), "utf8"))
    : [];
  const model = buildProspectingModel({ importedLeads });
  await writeCsvOutputs(model, outputDir);
  console.log(
    JSON.stringify(
      {
        outputDir,
        leads: model.leads.length,
        todayOutreach: model.todayOutreach.length,
        followUps: model.followUps.length,
        partners: model.partners.length,
        duplicatesRemoved: model.duplicatesRemoved,
        readyForManualOutreach: model.leads.filter(
          (lead) => lead.readyForManualOutreach === "Yes",
        ).length,
      },
      null,
      2,
    ),
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await runCli();
}
