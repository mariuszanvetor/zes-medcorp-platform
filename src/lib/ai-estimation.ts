export const BUDGET_DISCLAIMER =
  "Estimare orientativă, nu ofertă tehnică sau comercială finală.";

export type AdvancedComplexityLevel =
  | "Basic"
  | "Moderate"
  | "Advanced"
  | "Enterprise"
  | "High-complexity medical infrastructure";

export type BudgetBand = "Low" | "Medium" | "Premium" | "Enterprise";

export type RiskSeverity = "Low" | "Medium" | "High" | "Critical";

export type ConfidenceLevel = "Low" | "Medium" | "High";

export type BudgetLine = {
  label: string;
  range: string;
  note: string;
};

export type BudgetEstimate = {
  band: BudgetBand;
  totalRange: string;
  phaseBreakdown: BudgetLine[];
  serviceBreakdown: BudgetLine[];
  disclaimer: string;
};

export type TimelinePhase = {
  phase: string;
  duration: string;
  dependency: string;
};

export type TimelineEstimate = {
  estimatedDuration: string;
  phases: TimelinePhase[];
  criticalDependencies: string[];
  riskFactors: string[];
};

export type RiskItem = {
  category: string;
  level: RiskSeverity;
  explanation: string;
  mitigation: string;
};

export type ConfidenceEstimate = {
  level: ConfidenceLevel;
  score: number;
  explanation: string;
};

export type EstimateInputs = {
  score: number;
  hasRadiology?: boolean;
  hasRmn?: boolean;
  hasCtRx?: boolean;
  hasLab?: boolean;
  hasEquipment?: boolean;
  hasService?: boolean;
  hasRfShielding?: boolean;
  hasLeadShielding?: boolean;
  isLarge?: boolean;
  isExistingBuilding?: boolean;
  isUrgent?: boolean;
  equipmentAlreadySelected?: boolean;
};

export function getAdvancedComplexity(score: number): AdvancedComplexityLevel {
  if (score >= 96) {
    return "High-complexity medical infrastructure";
  }

  if (score >= 76) {
    return "Enterprise";
  }

  if (score >= 52) {
    return "Advanced";
  }

  if (score >= 28) {
    return "Moderate";
  }

  return "Basic";
}

export function getBudgetBand(score: number): BudgetBand {
  if (score >= 82) {
    return "Enterprise";
  }

  if (score >= 58) {
    return "Premium";
  }

  if (score >= 32) {
    return "Medium";
  }

  return "Low";
}

export function createBudgetEstimate(inputs: EstimateInputs): BudgetEstimate {
  const band = getBudgetBand(inputs.score);
  const totalRanges: Record<BudgetBand, string> = {
    Low: "€15k–€60k",
    Medium: "€60k–€180k",
    Premium: "€180k–€550k",
    Enterprise: "€550k+",
  };

  const phaseBreakdown: BudgetLine[] = [
    {
      label: "Concept, proiectare și consultanță",
      range: band === "Low" ? "€3k–€12k" : band === "Medium" ? "€8k–€28k" : "€25k–€75k+",
      note: "Depinde de claritatea brief-ului, releveu, specialități și numărul de iterații.",
    },
    {
      label: "Construcții / amenajări",
      range: inputs.isLarge ? "€120k–€450k+" : band === "Low" ? "€10k–€40k" : "€40k–€180k",
      note: "Include lucrări și instalații orientative, fără deviz validat în teren.",
    },
    {
      label: "Integrare, commissioning și predare",
      range: inputs.hasEquipment || inputs.hasRadiology ? "€8k–€45k+" : "€2k–€12k",
      note: "Crește când aparatura, autorizările și service-ul trebuie sincronizate.",
    },
  ];

  const serviceBreakdown: BudgetLine[] = [
    {
      label: "Infrastructură medicală",
      range: inputs.isLarge ? "Mediu–Complex" : "Redus–Ridicat",
      note: "Fluxuri, instalații, finisaje, acces, circuite și pregătire tehnică.",
    },
  ];

  if (inputs.hasRadiology) {
    serviceBreakdown.push({
      label: "Infrastructură radiologie",
      range: inputs.hasRmn ? "Ridicat–Complex" : "Mediu–Ridicat",
      note: "Layout cameră, cerințe furnizor, control acces, trasee și autorizări.",
    });
  }

  if (inputs.hasRfShielding || inputs.hasRmn) {
    serviceBreakdown.push({
      label: "RF shielding pentru RMN",
      range: "Ridicat–Complex",
      note: "Cușcă Faraday, ușă RF, filtre, waveguides, penetrări și testare.",
    });
  }

  if (inputs.hasLeadShielding || inputs.hasCtRx) {
    serviceBreakdown.push({
      label: "Protecție radiologică / plumb",
      range: "Mediu–Ridicat",
      note: "Pereți, uși, sticlă plumbată și soluții validate prin calcul.",
    });
  }

  if (inputs.hasEquipment) {
    serviceBreakdown.push({
      label: "Aparatură, imagistică și integrare",
      range: inputs.hasRmn || inputs.hasCtRx ? "Ridicat–Complex" : "Mediu–Ridicat",
      note: "Echipamentele pot depăși lucrările de amenajare ca pondere bugetară.",
    });
  }

  if (inputs.hasLab) {
    serviceBreakdown.push({
      label: "IVD / laborator",
      range: "Mediu–Ridicat",
      note: "Echipamente, fluxuri probe, calibrare, utilități și service.",
    });
  }

  if (inputs.hasService) {
    serviceBreakdown.push({
      label: "Service / mentenanță",
      range: "Redus–Mediu recurent",
      note: "Planificare mentenanță, intervenții, continuitate și uptime.",
    });
  }

  return {
    band,
    totalRange: totalRanges[band],
    phaseBreakdown,
    serviceBreakdown,
    disclaimer: BUDGET_DISCLAIMER,
  };
}

export function createTimelineEstimate(inputs: EstimateInputs): TimelineEstimate {
  let months = inputs.score >= 82 ? 10 : inputs.score >= 58 ? 6 : inputs.score >= 32 ? 4 : 2;

  if (inputs.isUrgent) {
    months = Math.max(2, months - 1);
  }

  if (inputs.hasRmn) {
    months += 2;
  }

  if (inputs.equipmentAlreadySelected && inputs.isExistingBuilding) {
    months += 1;
  }

  const phases: TimelinePhase[] = [
    {
      phase: "Concept / analiză tehnică",
      duration: "1–3 săptămâni",
      dependency: "Brief, planuri, destinație spațiu și cerințe medicale.",
    },
    {
      phase: "Autorizări și documentație",
      duration: inputs.hasCtRx ? "4–10 săptămâni" : "2–6 săptămâni",
      dependency: inputs.hasCtRx
        ? "DSP, CNCAN, calcul radioprotecție și documente tehnice."
        : "DSP, temă de proiect și validări tehnice.",
    },
    {
      phase: "Execuție / amenajări",
      duration: inputs.isLarge ? "10–24 săptămâni" : "4–12 săptămâni",
      dependency: "Disponibilitate spațiu, materiale, instalații și acces în șantier.",
    },
    {
      phase: "Shielding / infrastructură specializată",
      duration: inputs.hasRmn || inputs.hasCtRx ? "3–8 săptămâni" : "0–2 săptămâni",
      dependency: inputs.hasRmn
        ? "RF shielding, ușă RF, penetrări, HVAC și testare."
        : inputs.hasCtRx
          ? "Protecție radiologică, uși/sticlă plumbată și layout validat."
          : "Doar dacă apare o cerință specializată.",
    },
    {
      phase: "Integrare aparatură și commissioning",
      duration: inputs.hasEquipment || inputs.hasRadiology ? "2–8 săptămâni" : "1–3 săptămâni",
      dependency: "Cerințe furnizor, alimentare, date, HVAC, acces service și teste.",
    },
  ];

  const riskFactors = [
    inputs.isUrgent ? "Calendar comprimat: risc de decizii incomplete și rework." : "",
    inputs.isExistingBuilding ? "Spațiu existent: trasee, structură și instalații pot limita soluțiile." : "",
    inputs.hasRmn ? "RMN: RF shielding, vibrații, HVAC, acces magnet și furnizor aparatură." : "",
    inputs.hasCtRx ? "CT/RX: protecție radiologică, CNCAN și zone controlate." : "",
    inputs.hasEquipment ? "Aparatura poate schimba layout-ul, instalațiile și calendarul." : "",
  ].filter(Boolean);

  const criticalDependencies = [
    "Planuri tehnice și releveu validat.",
    "Lista aparaturii și cerințele furnizorilor.",
    inputs.hasCtRx ? "Clarificare CNCAN și protecție radiologică." : "",
    inputs.hasRmn ? "Clarificare RF shielding / cușcă Faraday și testare." : "",
    inputs.hasLab ? "Fluxuri laborator, utilități și cerințe IVD." : "",
  ].filter(Boolean);

  return {
    estimatedDuration: `${months}–${months + 3} luni`,
    phases,
    criticalDependencies,
    riskFactors,
  };
}

export function createConfidenceEstimate({
  answered,
  total,
  unknowns,
  descriptionLength = 0,
  score,
}: {
  answered: number;
  total: number;
  unknowns: number;
  descriptionLength?: number;
  score: number;
}): ConfidenceEstimate {
  let confidenceScore = Math.round((answered / total) * 100) - unknowns * 12;

  if (descriptionLength > 160) {
    confidenceScore += 10;
  }

  if (score >= 80) {
    confidenceScore -= 8;
  }

  const bounded = Math.max(18, Math.min(92, confidenceScore));

  return {
    level: bounded >= 72 ? "High" : bounded >= 46 ? "Medium" : "Low",
    score: bounded,
    explanation:
      bounded >= 72
        ? "Datele sunt suficient de clare pentru o estimare orientativă robustă, dar validarea tehnică rămâne necesară."
        : bounded >= 46
          ? "Estimarea are încredere medie; deciziile despre aparatură, autorizări sau spațiu pot schimba rezultatul."
          : "Estimarea are încredere redusă deoarece lipsesc date tehnice importante sau proiectul este încă neclar.",
  };
}

export function risk(
  category: string,
  level: RiskSeverity,
  explanation: string,
  mitigation: string,
): RiskItem {
  return { category, level, explanation, mitigation };
}
