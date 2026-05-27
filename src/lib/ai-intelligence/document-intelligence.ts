import { matchMedicalDomains } from "@/lib/ai-intelligence/domain-graph";
import type {
  DocumentArtifactType,
  DocumentUnderstandingArtifact,
  IntelligenceInput,
  MedicalDomainId,
} from "@/lib/ai-intelligence/types";

export type DocumentParsingMode = "mock" | "real-disabled";

export type SupportedDocumentFileType =
  | "pdf"
  | "doc"
  | "docx"
  | "xls"
  | "xlsx"
  | "image"
  | "unknown";

export type DocumentFilePolicy = {
  type: SupportedDocumentFileType;
  label: string;
  extensions: string[];
  mimeTypes: string[];
  maxSizeMb: number;
  expectedUse: string;
  privacyRisk: "low" | "medium" | "high";
};

export type FutureDocumentDescriptor = {
  fileName: string;
  sizeBytes: number;
  mimeType?: string;
  declaredType?: SupportedDocumentFileType;
};

export type MockDocumentParsingResult = {
  mode: DocumentParsingMode;
  acceptedForFutureParsing: boolean;
  fileType: SupportedDocumentFileType;
  maxSizeMb: number;
  reason: string;
  mockSignals: string[];
  missingInformation: string[];
  suggestedNextAction: string;
  contextTargets: Array<"ai-discovery" | "proposal-builder" | "project-intake" | "lead-intelligence">;
  warnings: string[];
  privacyNotes: string[];
};

export type DocumentUnderstandingWorkflow = {
  suggestedArtifacts: DocumentUnderstandingArtifact[];
  extractionTargets: string[];
  preUploadQuestions: string[];
  safetyNotes: string[];
  implementationStatus: "planned-interface-only";
};

export const supportedDocumentFilePolicies: DocumentFilePolicy[] = [
  {
    type: "pdf",
    label: "PDF",
    extensions: [".pdf"],
    mimeTypes: ["application/pdf"],
    maxSizeMb: 15,
    expectedUse: "Planuri exportate, fise tehnice, checklisturi sau documente de proiect.",
    privacyRisk: "medium",
  },
  {
    type: "doc",
    label: "DOC",
    extensions: [".doc"],
    mimeTypes: ["application/msword"],
    maxSizeMb: 10,
    expectedUse: "Briefuri, specificatii sau note de proiect mai vechi.",
    privacyRisk: "medium",
  },
  {
    type: "docx",
    label: "DOCX",
    extensions: [".docx"],
    mimeTypes: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    maxSizeMb: 10,
    expectedUse: "Briefuri, specificatii, liste de cerinte sau minute tehnice.",
    privacyRisk: "medium",
  },
  {
    type: "xls",
    label: "XLS",
    extensions: [".xls"],
    mimeTypes: ["application/vnd.ms-excel"],
    maxSizeMb: 10,
    expectedUse: "Liste de echipamente, bugete orientative sau tabele operationale.",
    privacyRisk: "medium",
  },
  {
    type: "xlsx",
    label: "XLSX",
    extensions: [".xlsx"],
    mimeTypes: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
    maxSizeMb: 10,
    expectedUse: "Liste de echipamente, tabele de camere, bugete si inventar tehnic.",
    privacyRisk: "medium",
  },
  {
    type: "image",
    label: "Image / screenshot",
    extensions: [".png", ".jpg", ".jpeg", ".webp"],
    mimeTypes: ["image/png", "image/jpeg", "image/webp"],
    maxSizeMb: 8,
    expectedUse: "Fotografii de spatiu, capturi de plan, schite rapide sau capturi de ecran.",
    privacyRisk: "high",
  },
];

export const documentUnderstandingArtifacts: DocumentUnderstandingArtifact[] = [
  artifact(
    "project-pdf",
    "pdf",
    "PDF proiect / fisa tehnica",
    ["pagini relevante", "titlu document", "date echipament", "dimensiuni", "cerinte utilitati"],
    ["Nu se parseaza in productie acum.", "Versiunile PDF pot fi incomplete sau neactualizate."],
    "Util viitor pentru extragerea semnalelor de planificare, nu pentru aprobare finala.",
  ),
  artifact(
    "project-docx",
    "docx",
    "Document Word / brief proiect",
    ["cerinte functionale", "lista spatii", "etape", "responsabilitati", "intrebari deschise"],
    ["Nu se parseaza in productie acum.", "Poate contine PII sau note interne."],
    "Util viitor pentru structurarea contextului, cu minimizare de date.",
  ),
  artifact(
    "equipment-spreadsheet",
    "xlsx",
    "Tabel echipamente / buget",
    ["lista echipamente", "cantitati", "camere", "puteri", "bugete orientative"],
    ["Nu se parseaza in productie acum.", "Valorile pot fi depasite sau nevalidate."],
    "Util viitor pentru corelarea echipamentelor cu infrastructura si propunerea.",
  ),
  artifact(
    "room-plan",
    "room-plan",
    "Plan camera / releveu",
    ["dimensiuni", "acces", "vecinatati", "pozitie usi", "trasee posibile"],
    ["Nu confirma singur conformitatea.", "Dimensiunile trebuie validate cu masuratori reale."],
    "Util pentru orientare, estimare preliminara si identificarea intrebarilor tehnice.",
  ),
  artifact(
    "equipment-spec",
    "equipment-spec",
    "Fisa tehnica echipament",
    ["putere electrica", "racire", "greutate", "cerinte pre-instalare", "dimensiuni"],
    ["Cerintele producatorului pot avea revizii.", "Integrarea finala depinde de locatie."],
    "Util pentru conectarea cerintelor echipamentului cu infrastructura existenta sau planificata.",
  ),
  artifact(
    "rf-layout-sketch",
    "sketch",
    "Schita camera RMN / RF",
    ["usa RF", "penetratii", "ferestre", "trasee HVAC", "trasee cabluri"],
    ["Nu inlocuieste proiectarea RF.", "Performanta necesita testare si validare."],
    "Ajuta la identificarea punctelor care trebuie clarificate inainte de proiectarea RF.",
  ),
  artifact(
    "radioprotection-plan",
    "layout",
    "Layout camera CT/RX",
    ["pozitie echipament", "pereti vecini", "zone controlate", "flux pacienti", "camera comanda"],
    ["Nu calculeaza radioprotectia finala.", "Cerintele depind de echipament si utilizare."],
    "Ajuta la pregatirea discutiilor de radioprotectie si conformitate.",
  ),
  artifact(
    "lab-workflow-map",
    "layout",
    "Flux laborator IVD",
    ["receptie probe", "pre-analitic", "analizoare", "depozitare", "deseuri", "LIS"],
    ["Nu valideaza proceduri de laborator.", "Fluxurile trebuie confirmate de echipa operationala."],
    "Util pentru corelarea analizatoarelor cu spatiul, utilitatile si operarea zilnica.",
  ),
  artifact(
    "site-photo",
    "image",
    "Fotografii spatiu existent",
    ["acces", "stare existenta", "trasee vizibile", "obstacole", "zone tehnice"],
    ["Fotografiile pot omite constrangeri ascunse.", "Nu inlocuiesc inspectia tehnica."],
    "Util pentru orientare si pentru intrebari initiale, nu pentru decizii finale.",
  ),
];

export function classifyFutureDocumentFile({
  fileName,
  mimeType,
  declaredType,
}: Pick<FutureDocumentDescriptor, "fileName" | "mimeType" | "declaredType">): SupportedDocumentFileType {
  if (declaredType && declaredType !== "unknown") return declaredType;

  const normalizedName = fileName.toLowerCase();
  const normalizedMime = (mimeType ?? "").toLowerCase();

  for (const policy of supportedDocumentFilePolicies) {
    if (
      policy.extensions.some((extension) => normalizedName.endsWith(extension)) ||
      policy.mimeTypes.includes(normalizedMime)
    ) {
      return policy.type;
    }
  }

  return "unknown";
}

export function getDocumentFilePolicy(type: SupportedDocumentFileType) {
  return supportedDocumentFilePolicies.find((policy) => policy.type === type) ?? null;
}

export function createMockDocumentParsingResult(
  descriptor: FutureDocumentDescriptor,
  input: IntelligenceInput = {},
): MockDocumentParsingResult {
  const fileType = classifyFutureDocumentFile(descriptor);
  const policy = getDocumentFilePolicy(fileType);
  const sizeMb = descriptor.sizeBytes / 1024 / 1024;
  const domains = matchMedicalDomains(input, 5).map((match) => match.domain.id);
  const acceptedForFutureParsing = Boolean(policy) && sizeMb <= (policy?.maxSizeMb ?? 0);

  return {
    mode: "mock",
    acceptedForFutureParsing,
    fileType,
    maxSizeMb: policy?.maxSizeMb ?? 0,
    reason: buildMockParsingReason({ acceptedForFutureParsing, fileType, policy, sizeMb }),
    mockSignals: buildMockSignals(fileType, domains),
    missingInformation: buildMockMissingInformation(fileType, domains),
    suggestedNextAction: buildMockNextAction(fileType, acceptedForFutureParsing),
    contextTargets: ["ai-discovery", "proposal-builder", "project-intake", "lead-intelligence"],
    warnings: buildMockParsingWarnings({ acceptedForFutureParsing, fileType, policy, sizeMb }),
    privacyNotes: [
      "Nu incarcati date medicale despre pacienti.",
      "Eliminati date personale inutile inainte de uploadul real viitor.",
      "Mock mode nu citeste si nu pastreaza continutul fisierului.",
    ],
  };
}

export function summarizeMockDocumentParsing(result: MockDocumentParsingResult) {
  return [
    `Document type: ${result.fileType}.`,
    `Mode: ${result.mode}. Accepted for future parsing: ${result.acceptedForFutureParsing ? "yes" : "no"}.`,
    `Signals: ${result.mockSignals.join("; ") || "none"}.`,
    `Missing information: ${result.missingInformation.join("; ") || "none"}.`,
    `Suggested next action: ${result.suggestedNextAction}.`,
    `Warnings: ${result.warnings.join("; ") || "none"}.`,
    "No real parsing, OCR, AI extraction or storage is active.",
  ].join("\n");
}

export function planDocumentUnderstandingWorkflow(input: IntelligenceInput): DocumentUnderstandingWorkflow {
  const domains = matchMedicalDomains(input, 6).map((match) => match.domain.id);
  const suggestedArtifacts = selectArtifactsForDomains(domains);

  return {
    suggestedArtifacts,
    extractionTargets: buildExtractionTargets(domains),
    preUploadQuestions: [
      "Documentele contin date sensibile sau personale care trebuie eliminate inainte de trimitere?",
      "Exista o versiune actualizata a planului sau a fisei tehnice?",
      "Care este scopul analizei: orientare, bugetare, validare tehnica preliminara sau pregatire oferta?",
    ],
    safetyNotes: [
      "Analiza documentelor este o etapa de pregatire, nu aprobare tehnica finala.",
      "Rezultatele trebuie prezentate cu nivel de incredere si ipoteze explicite.",
      "Datele personale sau inutile trebuie evitate in uploadurile viitoare.",
    ],
    implementationStatus: "planned-interface-only",
  };
}

function selectArtifactsForDomains(domains: MedicalDomainId[]) {
  const ids = new Set(["room-plan", "equipment-spec", "site-photo"]);

  if (domains.includes("mri")) ids.add("rf-layout-sketch");
  if (domains.some((domain) => ["ct", "radiology", "dental"].includes(domain))) ids.add("radioprotection-plan");
  if (domains.includes("ivd-laboratory")) ids.add("lab-workflow-map");

  return documentUnderstandingArtifacts.filter((artifactItem) => ids.has(artifactItem.id));
}

function buildExtractionTargets(domains: MedicalDomainId[]) {
  const targets = [
    "dimensiuni si suprafete utile",
    "stadiu proiect si date lipsa",
    "cerinte de utilitati si acces tehnic",
    "riscuri de coordonare intre echipament si infrastructura",
  ];

  if (domains.includes("mri")) {
    targets.push("puncte posibile de penetrare RF", "usa RF, filtre, waveguides si integrare HVAC");
  }

  if (domains.some((domain) => ["ct", "radiology", "dental"].includes(domain))) {
    targets.push("zone adiacente relevante pentru radioprotectie", "pozitie camera comanda si flux pacienti");
  }

  if (domains.includes("ivd-laboratory")) {
    targets.push("flux probe si amplasare analizatoare", "utilitati, deseuri, LIS si service access");
  }

  return targets;
}

function artifact(
  id: string,
  type: DocumentArtifactType,
  label: string,
  expectedSignals: string[],
  limitations: string[],
  safeUse: string,
): DocumentUnderstandingArtifact {
  return { id, type, label, expectedSignals, limitations, safeUse };
}

function buildMockParsingReason({
  acceptedForFutureParsing,
  fileType,
  policy,
  sizeMb,
}: {
  acceptedForFutureParsing: boolean;
  fileType: SupportedDocumentFileType;
  policy: DocumentFilePolicy | null;
  sizeMb: number;
}) {
  if (!policy) {
    return `Tipul ${fileType} nu este acceptat in politica viitoare de parsing.`;
  }

  if (!acceptedForFutureParsing) {
    return `Fisierul este prea mare pentru limita viitoare ${policy.maxSizeMb} MB (${sizeMb.toFixed(1)} MB).`;
  }

  return `${policy.label} este acceptat in politica viitoare, dar faza curenta ramane mock-only.`;
}

function buildMockSignals(fileType: SupportedDocumentFileType, domains: MedicalDomainId[]) {
  const signals = new Set<string>(["tip document", "scop analiza", "informatii lipsa posibile"]);

  if (fileType === "pdf" || fileType === "doc" || fileType === "docx") {
    signals.add("brief proiect");
    signals.add("cerinte tehnice mentionate");
  }

  if (fileType === "xls" || fileType === "xlsx") {
    signals.add("lista echipamente");
    signals.add("buget / cantitati orientative");
  }

  if (fileType === "image") {
    signals.add("context vizual spatiu");
    signals.add("posibile constrangeri de acces");
  }

  if (domains.includes("mri")) signals.add("cerinte RF / RMN de verificat");
  if (domains.some((domain) => ["ct", "radiology", "dental"].includes(domain))) {
    signals.add("radioprotectie / CNCAN de verificat");
  }
  if (domains.includes("ivd-laboratory")) signals.add("flux laborator / IVD de verificat");

  return [...signals].slice(0, 8);
}

function buildMockParsingWarnings({
  acceptedForFutureParsing,
  fileType,
  policy,
  sizeMb,
}: {
  acceptedForFutureParsing: boolean;
  fileType: SupportedDocumentFileType;
  policy: DocumentFilePolicy | null;
  sizeMb: number;
}) {
  const warnings = new Set<string>([
    "Parsingul real nu este activ.",
    "Rezultatele viitoare trebuie validate de specialisti.",
  ]);

  if (!policy) warnings.add(`Tip neacceptat: ${fileType}.`);
  if (policy && sizeMb > policy.maxSizeMb) warnings.add(`Depaseste limita viitoare de ${policy.maxSizeMb} MB.`);
  if (policy?.privacyRisk === "high") warnings.add("Risc privacy ridicat: verificati imagini pentru date personale.");
  if (!acceptedForFutureParsing) warnings.add("Fisierul ar trebui respins sau redus inainte de upload real.");

  return [...warnings];
}

function buildMockMissingInformation(fileType: SupportedDocumentFileType, domains: MedicalDomainId[]) {
  const missing = new Set<string>([
    "continutul real al documentului nu este citit in mock mode",
    "versiunea si data documentului trebuie confirmate manual",
  ]);

  if (fileType === "pdf" || fileType === "image") {
    missing.add("dimensiuni, scara si pagina/planul relevant");
  }

  if (fileType === "doc" || fileType === "docx") {
    missing.add("cerinte tehnice extrase si responsabilitati confirmate");
  }

  if (fileType === "xls" || fileType === "xlsx") {
    missing.add("coloane, unitati, bugete si echipamente validate");
  }

  if (domains.includes("mri")) missing.add("cerinte RF si fisa tehnica RMN confirmate");
  if (domains.some((domain) => ["ct", "radiology", "dental"].includes(domain))) {
    missing.add("layout si vecinatati pentru radioprotectie confirmate");
  }
  if (domains.includes("ivd-laboratory")) missing.add("flux probe si lista analizatoare confirmate");

  return [...missing].slice(0, 7);
}

function buildMockNextAction(
  fileType: SupportedDocumentFileType,
  acceptedForFutureParsing: boolean,
) {
  if (!acceptedForFutureParsing) {
    return "Pregatiti un document acceptat si reduceti dimensiunea inainte de o faza viitoare de upload real.";
  }

  if (fileType === "image") {
    return "Folositi imaginea doar ca orientare vizuala si continuati cu planuri sau masuratori cand exista.";
  }

  if (fileType === "xls" || fileType === "xlsx") {
    return "Pregatiti tabelul pentru verificarea echipamentelor, cantitatilor si cerintelor de infrastructura.";
  }

  return "Folositi contextul mock pentru a vedea ce semnale ar putea fi extrase intr-o etapa viitoare.";
}
