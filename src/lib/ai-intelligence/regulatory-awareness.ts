import { matchMedicalDomains } from "@/lib/ai-intelligence/domain-graph";
import type {
  IntelligenceInput,
  MedicalDomainId,
  RegulatoryAwarenessFlag,
} from "@/lib/ai-intelligence/types";

export const regulatoryAwarenessFlags: RegulatoryAwarenessFlag[] = [
  {
    id: "cncan-ionizing-radiation",
    title: "CNCAN pentru echipamente cu radiatii ionizante",
    appliesTo: ["ct", "radiology", "dental"],
    trigger: "CT, RX, fluoroscopie sau CBCT",
    safeExplanation:
      "Proiectele cu radiatii ionizante pot necesita analiza de radioprotectie, documentatie si verificari specifice inainte de functionare.",
    validationPath:
      "Validati cerintele cu specialisti autorizati si cu documentatia echipamentului inainte de asumarea layoutului final.",
    confidence: "high",
    prohibitedClaims: [
      "Nu afirma ca proiectul este autorizat.",
      "Nu promite aprobarea CNCAN.",
      "Nu inlocui documentatia sau validarea autorizata.",
    ],
  },
  {
    id: "rf-shielding-not-cncan",
    title: "RF shielding pentru RMN nu este acelasi lucru cu radioprotectia",
    appliesTo: ["mri"],
    trigger: "RMN, camera Faraday, usa RF, filtre RF",
    safeExplanation:
      "RMN-ul foloseste ecranare RF/Faraday pentru performanta imagistica si controlul interferentelor. Aceasta nu trebuie confundata cu ecranarea cu plumb pentru radiatii ionizante.",
    validationPath:
      "Validati solutia RF cu cerintele producatorului, configuratia camerei, penetratiile, usa RF, filtrele si testarea de performanta.",
    confidence: "high",
    prohibitedClaims: [
      "Nu sustine ca RF shielding reprezinta autorizare CNCAN.",
      "Nu recomanda plumb pentru RMN ca solutie de baza.",
      "Nu garanta performanta RF fara testare.",
    ],
  },
  {
    id: "dsp-healthcare-space",
    title: "DSP si cerinte pentru spatii medicale",
    appliesTo: [
      "healthcare-infrastructure",
      "clinic-modernization",
      "ivd-laboratory",
      "surgery-or",
      "ati-critical-care",
      "sterilization",
      "operational-workflow",
    ],
    trigger: "clinica, laborator, flux medical, modernizare sau spatiu nou",
    safeExplanation:
      "Spatiile medicale pot implica cerinte de organizare, circuite, igiena, documentatie si verificari in functie de activitatea medicala.",
    validationPath:
      "Tratati DSP ca flux de verificare separat si corelati cerintele cu functiunile medicale, planurile si destinatia spatiului.",
    confidence: "medium",
    prohibitedClaims: [
      "Nu promite autorizare DSP.",
      "Nu confunda DSP cu CNCAN.",
      "Nu afirma conformitate finala fara verificare umana.",
    ],
  },
  {
    id: "ivd-validation",
    title: "Validare operationala pentru laborator IVD",
    appliesTo: ["ivd-laboratory"],
    trigger: "analizoare, probe, LIS, calibrare sau flux de laborator",
    safeExplanation:
      "Laboratoarele IVD necesita corelarea echipamentelor cu fluxurile de probe, utilitati, calibrare, validare, mentenanta si integrare operationala.",
    validationPath:
      "Verificati cerintele producatorilor, fluxurile reale, responsabilitatile de service si documentatia interna inainte de implementare.",
    confidence: "medium",
    prohibitedClaims: [
      "Nu garanta performanta analizatoarelor.",
      "Nu inlocui validarea laboratorului.",
      "Nu inventa cerinte de calibrare nesustinute de producator.",
    ],
  },
  {
    id: "critical-care-specialist-review",
    title: "ATI, chirurgie si sterilizare necesita revizie interdisciplinara",
    appliesTo: ["ati-critical-care", "surgery-or", "sterilization"],
    trigger: "ATI, bloc operator, sterilizare sau circuite critice",
    safeExplanation:
      "Zonele critice combina infrastructura, siguranta pacientului, circuite, gaze medicale, electrice, HVAC, igiena si proceduri operationale.",
    validationPath:
      "Escaladati catre proiectanti, specialisti clinici si furnizori relevanti inainte de recomandari finale.",
    confidence: "medium",
    prohibitedClaims: [
      "Nu furniza aprobari medicale sau legale.",
      "Nu inlocui proiectarea de specialitate.",
      "Nu garanta siguranta operationala pe baza unui intake incomplet.",
    ],
  },
];

export function evaluateRegulatoryAwareness(input: IntelligenceInput) {
  const domainIds = matchMedicalDomains(input, 6).map((match) => match.domain.id);
  const text = normalize([input.freeText, input.equipmentTypes?.join(" "), input.roomTypes?.join(" ")].join(" "));

  return regulatoryAwarenessFlags.filter((flag) => {
    const appliesByDomain = flag.appliesTo.some((domain) => domainIds.includes(domain));
    const appliesByTrigger = normalize(flag.trigger)
      .split(/[, ]+/)
      .filter(Boolean)
      .some((token) => token.length > 2 && text.includes(token));

    return appliesByDomain || appliesByTrigger;
  });
}

export function requiresHumanRegulatoryReview(input: IntelligenceInput) {
  return evaluateRegulatoryAwareness(input).some((flag) =>
    flag.appliesTo.some((domain: MedicalDomainId) =>
      ["ct", "radiology", "dental", "surgery-or", "ati-critical-care", "sterilization"].includes(domain),
    ),
  );
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
