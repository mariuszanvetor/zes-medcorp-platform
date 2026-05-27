import type { ConfidenceLevel } from "@/lib/ai-intelligence/types";

export type IntelligenceSafetyPrinciple = {
  id: string;
  title: string;
  rule: string;
  preferredFraming: string;
};

export const intelligenceSafetyPrinciples: IntelligenceSafetyPrinciple[] = [
  {
    id: "preliminary-not-final",
    title: "Orientare preliminara, nu validare finala",
    rule: "Recomandarile trebuie prezentate ca ipoteze tehnice care necesita validare umana.",
    preferredFraming: "Pe baza datelor disponibile, aceasta pare o zona care trebuie verificata tehnic.",
  },
  {
    id: "no-regulatory-certainty",
    title: "Fara certitudine legala sau de conformitate",
    rule: "Sistemul nu trebuie sa promita autorizari, aprobari sau conformitate finala.",
    preferredFraming: "Acest aspect poate necesita verificare cu specialistii si autoritatile relevante.",
  },
  {
    id: "domain-separation",
    title: "Separare clara intre domenii",
    rule: "RF shielding pentru RMN nu trebuie confundat cu radioprotectia pentru CT/RX.",
    preferredFraming: "RMN implica ecranare RF/Faraday; CT/RX implica radioprotectie pentru radiatii ionizante.",
  },
  {
    id: "no-hidden-precision",
    title: "Fara precizie falsa",
    rule: "Estimari de cost, timp sau complexitate trebuie marcate ca orientative.",
    preferredFraming: "Intervalul este orientativ si depinde de echipament, locatie, stadiu si constrangeri.",
  },
  {
    id: "privacy-minimization",
    title: "Minimizarea datelor",
    rule: "Sistemul trebuie sa ceara doar informatii utile pentru proiect si sa evite date personale inutile.",
    preferredFraming: "Puteti elimina datele personale din documentele trimise pentru analiza preliminara.",
  },
];

export const prohibitedIntelligenceBehaviors = [
  "Pretinde ca inlocuieste proiectarea autorizata.",
  "Promite aprobari CNCAN, DSP sau alte aprobari oficiale.",
  "Confunda ecranarea RF cu ecranarea cu plumb.",
  "Recomanda solutii finale fara fise tehnice, planuri sau validare de specialitate.",
  "Inventeaza standarde, preturi, certificari, proiecte sau garantii.",
  "Trimite date personale catre analytics sau sisteme externe fara scop clar.",
];

export function createValidationNotice(confidence: ConfidenceLevel = "medium") {
  const prefix =
    confidence === "high"
      ? "Observatie cu incredere ridicata:"
      : confidence === "medium"
        ? "Observatie preliminara:"
        : "Ipoteza cu date incomplete:";

  return `${prefix} recomandarea necesita verificare tehnica pe baza planurilor, echipamentului, amplasamentului si cerintelor finale ale proiectului.`;
}

export function frameConfidence(confidence: ConfidenceLevel) {
  if (confidence === "high") return "incredere ridicata, cu validare tehnica necesara";
  if (confidence === "medium") return "incredere medie, dependenta de informatii suplimentare";
  return "incredere redusa, necesita clarificari suplimentare";
}

export function containsUnsafeRegulatoryClaim(text: string) {
  const normalized = normalize(text);
  return [
    "garantam autorizarea",
    "aprobare garantata",
    "conformitate garantata",
    "validare finala automata",
    "inlocuieste proiectarea",
    "nu mai este nevoie de specialist",
  ].some((claim) => normalized.includes(normalize(claim)));
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
