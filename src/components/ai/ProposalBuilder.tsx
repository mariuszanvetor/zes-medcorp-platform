"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import {
  ProposalBuilderResult,
  type ProposalAnalysis,
} from "@/components/ai/ProposalBuilderResult";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  createBudgetEstimate,
  createConfidenceEstimate,
  createTimelineEstimate,
  getAdvancedComplexity,
  risk as createRisk,
} from "@/lib/ai-estimation";
import { trackToolComplete, trackToolStart } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const projectTypes = [
  "Clinică medicală",
  "Radiologie",
  "Laborator / IVD",
  "Cabinet medical",
  "Spital / secție",
  "Modernizare spațiu existent",
  "Service / mentenanță aparatură",
  "Achiziție aparatură",
] as const;

const projectScales = [
  "sub 100 mp",
  "100–300 mp",
  "300–700 mp",
  "peste 700 mp",
  "nu se aplică",
] as const;

const imagingOptions = [
  "Nu",
  "CT",
  "RMN",
  "RX",
  "Ecografie",
  "Mai multe echipamente",
  "Nu știu încă",
] as const;

const labOptions = ["Nu", "Da", "Nu știu încă"] as const;

const shieldingOptions = [
  "Nu știu",
  "RF shielding pentru RMN",
  "Protecție radiologică / plumb pentru CT/RX",
  "Ambele",
  "Nu",
] as const;

const equipmentOptions = [
  "Nu",
  "Achiziție",
  "Integrare",
  "Service / mentenanță",
  "Achiziție + integrare",
  "Nu știu încă",
] as const;

const projectStages = [
  "Idee / explorare",
  "Bugetare",
  "Proiectare",
  "În execuție",
  "Aparatură deja achiziționată",
  "Problemă service activă",
] as const;

const urgencyOptions = ["Exploratoriu", "1–3 luni", "3–6 luni", "Imediat"] as const;

type ProposalBuilderState = {
  projectType: (typeof projectTypes)[number];
  projectScale: (typeof projectScales)[number];
  imaging: (typeof imagingOptions)[number];
  lab: (typeof labOptions)[number];
  shielding: (typeof shieldingOptions)[number];
  equipment: (typeof equipmentOptions)[number];
  projectStage: (typeof projectStages)[number];
  urgency: (typeof urgencyOptions)[number];
  description: string;
};

const initialState: ProposalBuilderState = {
  projectType: "Clinică medicală",
  projectScale: "100–300 mp",
  imaging: "Nu știu încă",
  lab: "Nu știu încă",
  shielding: "Nu știu",
  equipment: "Nu știu încă",
  projectStage: "Idee / explorare",
  urgency: "Exploratoriu",
  description: "",
};

export function ProposalBuilder() {
  const [form, setForm] = useState<ProposalBuilderState>(initialState);
  const [result, setResult] = useState<ProposalAnalysis | null>(null);

  const completion = useMemo(() => {
    const filled = Object.entries(form).filter(([, value]) => value.trim()).length;
    return Math.round((filled / Object.keys(form).length) * 100);
  }, [form]);

  function updateField<K extends keyof ProposalBuilderState>(
    field: K,
    value: ProposalBuilderState[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function buildProposal() {
    trackToolStart("proposal-builder", {
      sourcePage: "/proposal-builder",
      projectType: form.projectType,
      urgency: form.urgency,
    });

    const analysis = generateProposal(form);
    setResult(analysis);
    trackToolComplete("proposal-builder", {
      sourcePage: "/proposal-builder",
      projectType: form.projectType,
      urgency: form.urgency,
      estimatedBudgetRange: analysis.budget.totalRange,
      complexity: analysis.complexity,
      riskLevel: analysis.risks[0]?.level,
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    buildProposal();
  }

  return (
    <div className="grid gap-10">
      <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <Card className="sticky top-24" variant="glass">
          <p className="text-sm font-semibold text-cyan-100">
            Proposal intelligence
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Propunere tehnică preliminară, nu ofertă finală
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Generatorul combină infrastructură, imagistică, IVD, ecranare,
            aparatură, service, timeline și risc pentru a produce o structură
            de pre-ofertă tehnică.
          </p>
          <div className="mt-6 h-2 rounded-full bg-white/10">
            <div
              className="h-2 rounded-full bg-cyan-300 transition-all"
              style={{ width: `${completion}%` }}
            />
          </div>
          <p className="mt-3 text-xs font-semibold text-slate-400">
            Date completate: {completion}%
          </p>
        </Card>

        <form className="grid gap-5" onSubmit={handleSubmit}>
          <OptionGroup
            label="Tip proiect"
            options={projectTypes}
            value={form.projectType}
            onChange={(value) => updateField("projectType", value)}
          />
          <OptionGroup
            label="Suprafață / scară proiect"
            options={projectScales}
            value={form.projectScale}
            onChange={(value) => updateField("projectScale", value)}
          />
          <OptionGroup
            label="Include imagistică?"
            options={imagingOptions}
            value={form.imaging}
            onChange={(value) => updateField("imaging", value)}
          />
          <OptionGroup
            label="Include IVD / laborator?"
            options={labOptions}
            value={form.lab}
            onChange={(value) => updateField("lab", value)}
          />
          <OptionGroup
            label="Ecranare necesară"
            options={shieldingOptions}
            value={form.shielding}
            onChange={(value) => updateField("shielding", value)}
          />
          <OptionGroup
            label="Aparatură medicală"
            options={equipmentOptions}
            value={form.equipment}
            onChange={(value) => updateField("equipment", value)}
          />
          <OptionGroup
            label="Stadiu proiect"
            options={projectStages}
            value={form.projectStage}
            onChange={(value) => updateField("projectStage", value)}
          />
          <OptionGroup
            label="Urgență"
            options={urgencyOptions}
            value={form.urgency}
            onChange={(value) => updateField("urgency", value)}
          />

          <Card variant="glass">
            <label className="grid gap-3" htmlFor="proposal-description">
              <span className="text-sm font-semibold text-white">
                Descriere proiect
              </span>
              <textarea
                className="min-h-36 rounded-lg border border-white/10 bg-slate-950/55 px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:bg-slate-950/70"
                id="proposal-description"
                name="proposal-description"
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="Ex: clinică de diagnostic cu RMN și laborator, spațiu existent, aparatură în analiză, nevoie de bugetare și propunere tehnică."
                value={form.description}
              />
            </label>
          </Card>

          <Button fullWidth onClick={buildProposal} size="lg" type="button">
            Generează propunerea preliminară
          </Button>
        </form>
      </div>

      {result && <ProposalBuilderResult result={result} />}
    </div>
  );
}

type OptionGroupProps<T extends string> = {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
};

function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: OptionGroupProps<T>) {
  return (
    <Card variant="glass">
      <fieldset>
        <legend className="text-sm font-semibold text-white">{label}</legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {options.map((option) => {
            const selected = option === value;

            return (
              <label
                className={cn(
                  "cursor-pointer rounded-lg border px-4 py-3 text-sm font-semibold leading-6 transition",
                  selected
                    ? "border-cyan-300/50 bg-cyan-300/12 text-cyan-50 shadow-[0_14px_40px_rgba(34,211,238,0.12)]"
                    : "border-white/10 bg-slate-950/45 text-slate-300 hover:border-white/20 hover:bg-white/[0.06]",
                )}
                key={option}
              >
                <input
                  checked={selected}
                  className="sr-only"
                  name={label}
                  onChange={() => onChange(option)}
                  type="radio"
                  value={option}
                />
                {option}
              </label>
            );
          })}
        </div>
      </fieldset>
    </Card>
  );
}

function generateProposal(form: ProposalBuilderState): ProposalAnalysis {
  let score = 18;
  const hasRmn = form.imaging === "RMN" || form.imaging === "Mai multe echipamente";
  const hasCtRx =
    form.imaging === "CT" ||
    form.imaging === "RX" ||
    form.imaging === "Mai multe echipamente";
  const hasUltrasound = form.imaging === "Ecografie";
  const hasRadiology =
    form.projectType === "Radiologie" ||
    hasRmn ||
    hasCtRx ||
    form.imaging === "Nu știu încă";
  const hasLab = form.projectType === "Laborator / IVD" || form.lab === "Da";
  const hasRfShielding =
    hasRmn ||
    form.shielding === "RF shielding pentru RMN" ||
    form.shielding === "Ambele";
  const hasLeadShielding =
    hasCtRx ||
    form.shielding === "Protecție radiologică / plumb pentru CT/RX" ||
    form.shielding === "Ambele";
  const hasEquipment = form.equipment !== "Nu" || form.projectType === "Achiziție aparatură";
  const hasService =
    form.equipment === "Service / mentenanță" ||
    form.projectType === "Service / mentenanță aparatură" ||
    form.projectStage === "Problemă service activă";
  const isLarge =
    form.projectScale === "300–700 mp" || form.projectScale === "peste 700 mp";
  const isExistingBuilding =
    form.projectType === "Modernizare spațiu existent" ||
    form.projectStage === "În execuție" ||
    form.projectStage === "Aparatură deja achiziționată";
  const isUrgent = form.urgency === "1–3 luni" || form.urgency === "Imediat";
  const equipmentAlreadySelected = form.projectStage === "Aparatură deja achiziționată";
  const unknownCount = [
    form.imaging === "Nu știu încă",
    form.lab === "Nu știu încă",
    form.shielding === "Nu știu",
    form.equipment === "Nu știu încă",
  ].filter(Boolean).length;

  const services = new Set<string>([
    "Consultanță tehnică și analiză preliminară ZES",
  ]);
  const phases = new Set<string>([
    "Analiză tehnică inițială și definirea brief-ului",
    "Proiectare / consultanță și bugetare orientativă",
  ]);
  const assumptions = new Set<string>([
    "Propunerea este generată din răspunsuri, fără planuri, releveu, documentație autorizată sau oferte de echipamente.",
    "Bugetele sunt benzi orientative pentru calibrare, nu valori contractuale.",
  ]);
  const missingData = new Set<string>([
    "Planuri, releveu, fotografii și suprafețe confirmate",
    "Stadiu autorizări DSP / CNCAN și documentație existentă",
    "Specificații aparatură, cerințe electrice, HVAC, date și acces service",
  ]);
  const nextSteps = new Set<string>([
    "Trimite rezultatul către ZES pentru validarea ipotezelor tehnice.",
    "Pregătește planurile, lista de echipamente și constrângerile de calendar.",
  ]);
  const risks = [
    createRisk(
      "Buget / date incomplete",
      "Medium",
      "Fără planuri, specificații și documentație, propunerea poate doar estima direcția tehnică.",
      "Validați propunerea prin analiză ZES înainte de decizii comerciale.",
    ),
  ];

  if (form.projectType === "Clinică medicală" || form.projectType === "Cabinet medical") {
    score += form.projectType === "Clinică medicală" ? 14 : 8;
    services.add("Construcții și amenajări medicale");
    phases.add("Construcții / amenajări și pregătire infrastructură medicală");
    missingData.add("Fluxuri medicale, specialități, circuite, zone suport și cerințe DSP");
  }

  if (form.projectType === "Spital / secție") {
    score += 24;
    services.add("Proiecte medicale turnkey");
    services.add("Management tehnic multi-disciplinar");
    phases.add("Etapizare, continuitate operațională și management tehnic");
    risks.push(
      createRisk(
        "Continuitate operațională",
        "High",
        "Proiectele de tip spital / secție pot afecta fluxuri active și zone critice.",
        "Planificați fazarea, izolarea zonelor și scenariile de continuitate.",
      ),
    );
  }

  if (form.projectType === "Modernizare spațiu existent") {
    score += 14;
    services.add("Amenajări medicale");
    phases.add("Audit spațiu existent și compatibilitate tehnică");
    risks.push(
      createRisk(
        "Spațiu existent",
        "High",
        "Traseele, structura, instalațiile și accesul pot limita soluțiile tehnice.",
        "Includeți audit de amplasament înainte de buget final.",
      ),
    );
  }

  if (form.projectType === "Radiologie") {
    score += 18;
    services.add("Radiologie și camere imagistică");
    services.add("Imagistică medicală");
    phases.add("Planificare cameră radiologie și integrare aparatură");
  }

  if (form.projectType === "Laborator / IVD" || form.lab === "Da") {
    score += 16;
    services.add("IVD / echipamente laborator");
    services.add("Integrare echipamente laborator");
    phases.add("Flux laborator, utilități, calibrare și validare IVD");
    missingData.add("Flux probe, volum estimat, echipamente IVD, consumabile și cerințe QC");
    risks.push(
      createRisk(
        "IVD / laborator",
        "Medium",
        "Laboratorul poate necesita utilități, calibrare, QC, consumabile și service specializat.",
        "Corelați echipamentele IVD cu fluxurile și mentenanța încă din concept.",
      ),
    );
  }

  if (form.projectScale === "300–700 mp") {
    score += 14;
    services.add("Proiecte medicale turnkey");
  }

  if (form.projectScale === "peste 700 mp") {
    score += 24;
    services.add("Coordonare infrastructură și tehnologie medicală");
    risks.push(
      createRisk(
        "Coordonare multi-disciplinară",
        "High",
        "Suprafețele mari cresc riscul de nealiniere între proiectare, execuție, aparatură și service.",
        "Introduceți jaloane de decizie și coordonare pe specialități.",
      ),
    );
  }

  if (hasRmn) {
    score += 28;
    services.add("RF shielding pentru RMN");
    services.add("Imagistică medicală - RMN");
    phases.add("RF shielding, Faraday cage, testare și integrare RMN");
    missingData.add("Cerințe RMN: RF attenuation, ușă RF, filtre, waveguides, HVAC, vibrații și acces magnet");
    assumptions.add("RMN declanșează logică RF shielding, cușcă Faraday, HVAC, vibrații și integrare aparatură.");
    nextSteps.add("Solicită verificare RF pentru camera RMN înainte de buget final.");
    risks.push(
      createRisk(
        "RF shielding pentru RMN",
        "Critical",
        "RMN cere cușcă Faraday, ușă RF, filtre, waveguides, penetrări și testare.",
        "Tratați RF shielding-ul separat de protecția radiologică / plumb.",
      ),
    );
  }

  if (hasCtRx) {
    score += 24;
    services.add("Protecție radiologică / ecranare cu plumb");
    services.add("Consultanță radiologie și CNCAN");
    phases.add("Protecție radiologică, zone controlate și coordonare CNCAN");
    missingData.add("Calcul radioprotecție, vecinătăți, zone controlate și cerințe CNCAN");
    assumptions.add("CT/RX declanșează logică de protecție radiologică, ecranare cu plumb și CNCAN.");
    nextSteps.add("Solicită analiză de protecție radiologică și documentație CNCAN.");
    risks.push(
      createRisk(
        "CNCAN / protecție radiologică",
        "High",
        "CT/RX necesită protecție radiologică și documentație specifică pentru zone controlate.",
        "Validați ecranarea și autorizarea înainte de execuție.",
      ),
    );
  }

  if (hasUltrasound) {
    score += 6;
    services.add("Ecografie și integrare aparatură");
  }

  if (form.shielding === "Ambele") {
    score += 14;
    risks.push(
      createRisk(
        "Shielding combinat",
        "Critical",
        "RF shielding și protecția radiologică sunt discipline diferite și trebuie bugetate separat.",
        "Coordonați detaliile RF și plumb încă din faza de propunere.",
      ),
    );
  }

  if (form.equipment === "Achiziție" || form.equipment === "Achiziție + integrare") {
    score += 12;
    services.add("Vânzare / selecție aparatură medicală");
    phases.add("Selecție aparatură și validare cerințe furnizor");
  }

  if (form.equipment === "Integrare" || form.equipment === "Achiziție + integrare") {
    score += 12;
    services.add("Integrare aparatură medicală");
    phases.add("Integrare echipamente, testare și commissioning");
    risks.push(
      createRisk(
        "Integrare echipamente",
        "Medium",
        "Aparatura poate schimba alimentarea, HVAC, datele, accesul și service-ul.",
        "Blocați cerințele furnizorilor înainte de execuția instalațiilor.",
      ),
    );
  }

  if (hasService) {
    score += 12;
    services.add("Service și mentenanță aparatură medicală");
    phases.add("Plan service, mentenanță preventivă și continuitate operațională");
    risks.push(
      createRisk(
        "Downtime operațional",
        form.projectStage === "Problemă service activă" ? "High" : "Medium",
        "Fără plan service, echipamentele pot genera întreruperi sau costuri reactive.",
        "Introduceți mentenanță, acces service și responsabilități operaționale.",
      ),
    );
  }

  if (equipmentAlreadySelected) {
    score += 10;
    risks.push(
      createRisk(
        "Aparatură deja achiziționată",
        "High",
        "Aparatura cumpărată înainte de validarea spațiului poate impune modificări costisitoare.",
        "Comparați fișa tehnică a echipamentului cu spațiul, instalațiile și ecranarea.",
      ),
    );
  }

  if (form.projectStage === "În execuție") {
    score += 12;
    risks.push(
      createRisk(
        "Execuție în desfășurare",
        "High",
        "Schimbările în execuție pot genera rework, costuri și blocaje de autorizare.",
        "Faceți audit rapid al proiectului înainte de modificări majore.",
      ),
    );
  }

  if (isUrgent) {
    score += form.urgency === "Imediat" ? 22 : 14;
    risks.push(
      createRisk(
        "Timeline comprimat",
        form.urgency === "Imediat" ? "Critical" : "High",
        "Calendarul scurt reduce timpul de validare tehnică și crește riscul de decizii incomplete.",
        "Prioritizați riscurile care pot bloca autorizarea, ecranarea sau integrarea aparaturii.",
      ),
    );
  }

  if (unknownCount > 0) {
    score += 6;
    missingData.add("Clarificarea opțiunilor marcate ca necunoscute înainte de ofertare");
    risks.push(
      createRisk(
        "Ipoteze nevalidate",
        "Medium",
        "Opțiunile necunoscute pot schimba bugetul, timeline-ul și serviciile incluse.",
        "Înlocuiți ipotezele cu date tehnice înainte de propunerea comercială.",
      ),
    );
  }

  if (form.description.trim().length > 160) {
    assumptions.add("Descrierea oferă context suficient pentru o primă interpretare tehnică.");
  } else {
    missingData.add("Descriere extinsă: locație, obiectiv, constrângeri, buget, termen și echipamente vizate");
  }

  const normalizedScore = Math.min(score, 100);
  const complexity = getAdvancedComplexity(normalizedScore);
  const budget = createBudgetEstimate({
    score: normalizedScore,
    hasRadiology,
    hasRmn,
    hasCtRx,
    hasLab,
    hasEquipment,
    hasService,
    hasRfShielding,
    hasLeadShielding,
    isLarge,
    isExistingBuilding,
    isUrgent,
    equipmentAlreadySelected,
  });
  const timeline = createTimelineEstimate({
    score: normalizedScore,
    hasRadiology,
    hasRmn,
    hasCtRx,
    hasLab,
    hasEquipment,
    hasService,
    hasRfShielding,
    hasLeadShielding,
    isLarge,
    isExistingBuilding,
    isUrgent,
    equipmentAlreadySelected,
  });
  const confidence = createConfidenceEstimate({
    answered: Object.values(form).filter((value) => value.trim()).length,
    total: Object.keys(form).length,
    unknowns: unknownCount,
    descriptionLength: form.description.trim().length,
    score: normalizedScore,
  });

  const proposalType =
    hasService && form.projectStage === "Problemă service activă"
      ? "propunere preliminară service / continuitate"
      : hasRadiology
        ? "propunere preliminară infrastructură + imagistică"
        : hasLab
          ? "propunere preliminară laborator / IVD"
          : "propunere preliminară infrastructură medicală";

  return {
    title: `Propunere preliminară pentru ${form.projectType.toLowerCase()}`,
    executiveSummary: `ZES interpretează proiectul ca ${proposalType}, cu nivel ${complexity} și scor ${normalizedScore}/100. Scopul preliminar include ${Array.from(services)
      .slice(0, 4)
      .join(", ")}. Rezultatul structurează direcția tehnică înainte de propunerea personalizată.`,
    score: normalizedScore,
    complexity,
    proposalType,
    recommendedServices: Array.from(services),
    phases: Array.from(phases),
    budget,
    timeline,
    risks,
    assumptions: Array.from(assumptions),
    missingData: Array.from(missingData),
    confidence,
    nextSteps: Array.from(nextSteps),
    nextStep:
      complexity === "Enterprise" ||
      complexity === "High-complexity medical infrastructure"
        ? "Solicită propunere tehnică personalizată ZES cu validare rapidă a riscurilor critice."
        : "Solicită propunere tehnică personalizată ZES pentru transformarea estimării într-un plan aplicat.",
  };
}
