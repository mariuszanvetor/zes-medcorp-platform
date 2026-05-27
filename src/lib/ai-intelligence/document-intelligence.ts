import { matchMedicalDomains } from "@/lib/ai-intelligence/domain-graph";
import type {
  DocumentUnderstandingArtifact,
  IntelligenceInput,
  MedicalDomainId,
} from "@/lib/ai-intelligence/types";

export type DocumentUnderstandingWorkflow = {
  suggestedArtifacts: DocumentUnderstandingArtifact[];
  extractionTargets: string[];
  preUploadQuestions: string[];
  safetyNotes: string[];
  implementationStatus: "planned-interface-only";
};

export const documentUnderstandingArtifacts: DocumentUnderstandingArtifact[] = [
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
    "photo",
    "Fotografii spatiu existent",
    ["acces", "stare existenta", "trasee vizibile", "obstacole", "zone tehnice"],
    ["Fotografiile pot omite constrangeri ascunse.", "Nu inlocuiesc inspectia tehnica."],
    "Util pentru orientare si pentru intrebari initiale, nu pentru decizii finale.",
  ),
];

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
  type: DocumentUnderstandingArtifact["type"],
  label: string,
  expectedSignals: string[],
  limitations: string[],
  safeUse: string,
): DocumentUnderstandingArtifact {
  return { id, type, label, expectedSignals, limitations, safeUse };
}
