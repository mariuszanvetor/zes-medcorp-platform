"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import {
  RadiologyPlannerResult,
  type RadiologyPlannerAnalysis,
} from "@/components/ai/RadiologyPlannerResult";
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

const equipmentTypes = ["CT", "RMN", "RX", "Nu știu încă"] as const;
const roomSizes = ["sub 20 mp", "20–35 mp", "35–60 mp", "peste 60 mp"] as const;
const projectStages = [
  "Idee / analiză",
  "Spațiu existent",
  "În proiectare",
  "În execuție",
  "Echipament deja achiziționat",
] as const;
const buildingTypes = [
  "Clinică privată",
  "Spital",
  "Clădire existentă nemedicală",
  "Spațiu comercial convertit",
  "Nu știu încă",
] as const;
const shieldingOptions = [
  "Nu știu",
  "RF shielding",
  "Protecție radiologică / plumb",
  "Ambele",
  "Nu este cazul",
] as const;
const authorizationOptions = [
  "Nu știu",
  "DSP în lucru",
  "CNCAN în lucru",
  "Ambele în lucru",
  "Nu am început",
] as const;

type PlannerState = {
  equipmentType: (typeof equipmentTypes)[number];
  roomSize: (typeof roomSizes)[number];
  projectStage: (typeof projectStages)[number];
  buildingType: (typeof buildingTypes)[number];
  shielding: (typeof shieldingOptions)[number];
  authorization: (typeof authorizationOptions)[number];
  description: string;
};

const initialState: PlannerState = {
  equipmentType: "Nu știu încă",
  roomSize: "20–35 mp",
  projectStage: "Idee / analiză",
  buildingType: "Clinică privată",
  shielding: "Nu știu",
  authorization: "Nu știu",
  description: "",
};

export function RadiologyRoomPlanner() {
  const [form, setForm] = useState<PlannerState>(initialState);
  const [result, setResult] = useState<RadiologyPlannerAnalysis | null>(null);

  const completion = useMemo(() => {
    const filled = Object.entries(form).filter(([, value]) => value.trim()).length;
    return Math.round((filled / Object.keys(form).length) * 100);
  }, [form]);

  function updateField<K extends keyof PlannerState>(
    field: K,
    value: PlannerState[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function planRoom() {
    trackToolStart("radiology-room-planner", {
      sourcePage: "/radiology-room-planner",
      projectType: form.equipmentType,
      urgency: form.projectStage,
    });

    const analysis = generatePlannerAnalysis(form);
    setResult(analysis);
    trackToolComplete("radiology-room-planner", {
      sourcePage: "/radiology-room-planner",
      projectType: form.equipmentType,
      urgency: form.projectStage,
      estimatedBudgetRange: analysis.budget.totalRange,
      complexity: analysis.complexity,
      riskLevel: analysis.riskLevel,
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    planRoom();
  }

  return (
    <div className="grid gap-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Card className="sticky top-24" variant="glass">
          <p className="text-sm font-semibold text-cyan-100">
            Planner radiologie
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            CT, RMN sau RX înainte de blocarea execuției
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Plannerul structurează cerințele de ecranare, autorizare,
            integrare aparatură și risc tehnic. Nu trimite date și nu folosește
            un API AI în această fază.
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
            label="Tip echipament"
            options={equipmentTypes}
            value={form.equipmentType}
            onChange={(value) => updateField("equipmentType", value)}
          />
          <OptionGroup
            label="Dimensiune cameră"
            options={roomSizes}
            value={form.roomSize}
            onChange={(value) => updateField("roomSize", value)}
          />
          <OptionGroup
            label="Stadiu proiect"
            options={projectStages}
            value={form.projectStage}
            onChange={(value) => updateField("projectStage", value)}
          />
          <OptionGroup
            label="Tip clădire"
            options={buildingTypes}
            value={form.buildingType}
            onChange={(value) => updateField("buildingType", value)}
          />
          <OptionGroup
            label="Ecranare"
            options={shieldingOptions}
            value={form.shielding}
            onChange={(value) => updateField("shielding", value)}
          />
          <OptionGroup
            label="Autorizare"
            options={authorizationOptions}
            value={form.authorization}
            onChange={(value) => updateField("authorization", value)}
          />

          <Card variant="glass">
            <label className="grid gap-3" htmlFor="radiology-description">
              <span className="text-sm font-semibold text-white">Descriere</span>
              <textarea
                className="min-h-36 rounded-lg border border-white/10 bg-slate-950/55 px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:bg-slate-950/70"
                id="radiology-description"
                name="radiology-description"
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="Ex: cameră RMN într-un spațiu existent, echipament selectat, nevoie de verificare RF, HVAC și trasee tehnice."
                value={form.description}
              />
            </label>
          </Card>

          <Button fullWidth onClick={planRoom} size="lg" type="button">
            Generează planul camerei
          </Button>
        </form>
      </div>

      {result && <RadiologyPlannerResult result={result} />}
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

function generatePlannerAnalysis(form: PlannerState): RadiologyPlannerAnalysis {
  let score = 24;
  const hasRmn = form.equipmentType === "RMN";
  const hasCtRx = form.equipmentType === "CT" || form.equipmentType === "RX";
  const equipmentUnknown = form.equipmentType === "Nu știu încă";
  const hasRfShielding = hasRmn || form.shielding === "RF shielding" || form.shielding === "Ambele";
  const hasLeadShielding =
    hasCtRx ||
    form.shielding === "Protecție radiologică / plumb" ||
    form.shielding === "Ambele";
  const isExistingBuilding =
    form.projectStage === "Spațiu existent" ||
    form.buildingType === "Clădire existentă nemedicală" ||
    form.buildingType === "Spațiu comercial convertit";
  const equipmentAlreadySelected = form.projectStage === "Echipament deja achiziționat";
  const isLarge = form.roomSize === "35–60 mp" || form.roomSize === "peste 60 mp";
  const unknownCount = [
    equipmentUnknown,
    form.buildingType === "Nu știu încă",
    form.shielding === "Nu știu",
    form.authorization === "Nu știu",
  ].filter(Boolean).length;

  const checklist = new Set<string>([
    "Plan cameră cu cote, acces, uși, vecinătăți și trasee tehnice",
    "Cerințe tehnice de la furnizorul aparaturii",
    "Verificare alimentare, răcire, ventilație și acces service",
  ]);
  const risks = [
    createRisk(
      "Layout radiologie",
      "Medium",
      "Deciziile de layout luate înainte de confirmarea cerințelor aparaturii pot genera rework.",
      "Validați cerințele furnizorului înainte de execuție și achiziții finale.",
    ),
  ];
  const authorizationNotes = new Set<string>([
    "DSP trebuie corelat cu fluxurile medicale, finisajele, instalațiile și funcțiunile camerei.",
  ]);
  const relevantServices = new Set<string>([
    "Consultanță tehnică radiologie",
    "Integrare aparatură medicală",
  ]);
  const assumptions = new Set<string>([
    "Plannerul nu folosește planuri de arhitectură, calcule autorizate sau ofertă de echipament.",
    "RF shielding și protecția radiologică sunt tratate ca sisteme tehnice separate.",
  ]);
  const missingData = new Set<string>([
    "Plan cu cote, vecinătăți, trasee și acces",
    "Fișă tehnică aparatură și cerințe de instalare",
  ]);
  const nextSteps = new Set<string>([
    "Solicită verificare tehnică ZES înainte de execuție.",
    "Corelează aparatura, ecranarea, autorizările și instalațiile într-un singur plan.",
  ]);

  let infrastructureType = "Infrastructură radiologie de clarificat";
  let shieldingRecommendation =
    "Ecranarea trebuie decisă după tipul final al aparaturii și al clădirii.";

  if (hasRmn) {
    score += 34;
    infrastructureType = "Cameră RMN cu infrastructură RF, HVAC și integrare aparatură";
    shieldingRecommendation =
      "Recomandare principală: RF shielding / cușcă Faraday, coordonată cu ușa RF, trecerile, ventilația și cerințele furnizorului.";
    checklist.add("Analiză RF shielding, cage / Faraday, ușă RF și treceri tehnice");
    checklist.add("Verificare vibrații, HVAC, quench pipe, acces magnet și zone de siguranță");
    relevantServices.add("Ecranare RF pentru cameră RMN");
    relevantServices.add("Imagistică medicală - RMN");
    relevantServices.add("Coordonare HVAC, acces magnet și service RMN");
    authorizationNotes.add("RMN nu folosește protecție radiologică de tip CT/RX, dar trebuie corelat cu DSP și cerințele de siguranță ale aparaturii.");
    assumptions.add("RMN declanșează RF shielding, cușcă Faraday, HVAC, vibrații și integrare magnet.");
    missingData.add("Cerințe RMN: RF attenuation, ușă RF, filtre, waveguides, HVAC, vibrații și acces magnet");
    nextSteps.add("Programează analiză RF și validare Faraday cage.");
    risks.push(
      createRisk(
        "RF shielding",
        "Critical",
        "Interferențele RF, penetrările necontrolate și ușa RF pot compromite performanța RMN.",
        "Proiectați cușca Faraday, filtrele, waveguides și testarea înainte de execuție.",
      ),
      createRisk(
        "HVAC / vibrații / acces",
        "High",
        "RMN are cerințe stricte de răcire, vibrații, quench, acces magnet și service.",
        "Validați traseele și cerințele furnizorului RMN cu proiectarea camerei.",
      ),
    );
  }

  if (hasCtRx) {
    score += 30;
    infrastructureType = `Cameră ${form.equipmentType} cu protecție radiologică și coordonare CNCAN`;
    shieldingRecommendation =
      "Recomandare principală: protecție radiologică / plumb sau soluții echivalente, validate prin calcul și layout.";
    checklist.add("Calcul preliminar pentru protecție radiologică și vecinătăți");
    checklist.add("Poziționare echipament, pupitru, ușă, pereți și trasee conform layout-ului radiologic");
    relevantServices.add("Protecție radiologică / plumb");
    relevantServices.add("Imagistică medicală - CT/RX");
    relevantServices.add("Consultanță CNCAN pentru cameră CT/RX");
    authorizationNotes.add("Pentru CT/RX, CNCAN și documentația de protecție radiologică trebuie planificate devreme.");
    assumptions.add("CT/RX declanșează protecție radiologică, ecranare cu plumb, layout radiologic și CNCAN.");
    missingData.add("Calcul radioprotecție, zone controlate, vecinătăți și documentație CNCAN");
    nextSteps.add("Solicită analiză de radioprotecție și verificare CNCAN.");
    risks.push(
      createRisk(
        "Protecție radiologică",
        "High",
        "Protecția radiologică subdimensionată poate bloca autorizarea sau impune refaceri.",
        "Validați calculul și detaliile cu plumb înainte de execuție.",
      ),
      createRisk(
        "CNCAN",
        "High",
        "CT/RX implică cerințe CNCAN și zone controlate, diferite de RF shielding.",
        "Integrați documentația CNCAN în calendarul de proiect.",
      ),
    );
  }

  if (equipmentUnknown) {
    score += 12;
    checklist.add("Decizie inițială privind CT, RMN sau RX înainte de dimensionarea definitivă");
    missingData.add("Tip echipament imagistic: CT, RMN sau RX");
    risks.push(
      createRisk(
        "Echipament neclar",
        "Medium",
        "Tipul de echipament neclar poate schimba ecranarea, autorizarea, bugetul și layout-ul.",
        "Alegeți sau restrângeți tipul de aparatură înainte de proiectare.",
      ),
    );
  }

  if (form.roomSize === "sub 20 mp") {
    score += 10;
    risks.push(
      createRisk(
        "Dimensiune cameră",
        "High",
        "Camera sub 20 mp poate limita accesul, service-ul, layout-ul și zonele tehnice.",
        "Verificați cerința minimă a furnizorului aparaturii înainte de execuție.",
      ),
    );
  }

  if (form.roomSize === "peste 60 mp") {
    score += 4;
    checklist.add("Definire zonare internă, acces, control și trasee pentru cameră mare");
  }

  if (
    form.projectStage === "În execuție" ||
    form.projectStage === "Echipament deja achiziționat"
  ) {
    score += 18;
    checklist.add("Audit rapid al proiectului existent față de cerințele furnizorului");
    risks.push(
      createRisk(
        "Stadiu avansat",
        "High",
        "Stadiul avansat crește riscul de incompatibilități între cameră, ecranare și aparatură.",
        "Faceți audit tehnic înainte de continuarea execuției.",
      ),
    );
  }

  if (equipmentAlreadySelected) {
    score += 12;
    risks.push(
      createRisk(
        "Aparatură deja achiziționată",
        "High",
        "Echipamentul achiziționat înainte de validarea camerei crește riscul de rework.",
        "Comparați imediat fișa tehnică a echipamentului cu spațiul și instalațiile.",
      ),
    );
  }

  if (
    form.buildingType === "Clădire existentă nemedicală" ||
    form.buildingType === "Spațiu comercial convertit"
  ) {
    score += 16;
    authorizationNotes.add("Pentru conversii, DSP poate cere clarificări suplimentare privind fluxurile și destinația spațiului.");
    missingData.add("Audit clădire existentă: structură, instalații, trasee, acces și destinație");
    risks.push(
      createRisk(
        "Conversie clădire",
        "High",
        "Conversia unei clădiri nemedicale poate afecta structura, fluxurile, instalațiile și autorizarea.",
        "Verificați fezabilitatea înainte de detalierea camerei.",
      ),
    );
  }

  if (form.shielding === "RF shielding") {
    score += 8;
    relevantServices.add("Ecranare RF");
    checklist.add("Coordonare detalii RF: ușă, treceri, cabluri, ventilație și testare");
  }

  if (form.shielding === "Protecție radiologică / plumb") {
    score += 8;
    relevantServices.add("Protecție radiologică / plumb");
    checklist.add("Coordonare protecție radiologică cu layout și vecinătăți");
  }

  if (form.shielding === "Ambele") {
    score += 16;
    relevantServices.add("Ecranare RF");
    relevantServices.add("Protecție radiologică / plumb");
    risks.push(
      createRisk(
        "Shielding mixt",
        "Critical",
        "Combinarea RF shielding cu protecție radiologică cere coordonare foarte devreme.",
        "Separați bugetul, proiectarea și testarea RF de protecția radiologică / plumb.",
      ),
    );
  }

  if (form.shielding === "Nu știu") {
    score += 10;
    missingData.add("Decizie de ecranare: RF pentru RMN sau protecție radiologică pentru CT/RX");
    risks.push(
      createRisk(
        "Ecranare neclară",
        "Medium",
        "Ecranarea neclară poate bloca bugetarea, execuția și autorizarea.",
        "Clarificați tipul de aparatură și tipul de ecranare înainte de buget.",
      ),
    );
  }

  if (form.authorization === "Nu am început" || form.authorization === "Nu știu") {
    score += 14;
    authorizationNotes.add("Autorizarea neîncepută crește riscul de reluare a layout-ului și documentației.");
    missingData.add("Stadiu autorizări DSP / CNCAN și documentație disponibilă");
  }

  if (form.authorization === "CNCAN în lucru") {
    authorizationNotes.add("CNCAN în lucru: verificați ca ecranarea, layout-ul și documentația tehnică să fie sincronizate.");
  }

  if (form.authorization === "Ambele în lucru") {
    authorizationNotes.add("DSP și CNCAN trebuie coordonate împreună, nu tratate ca fluxuri independente.");
  }

  if (form.description.trim().length > 120) {
    checklist.add("Brief descriptiv util pentru o verificare tehnică ZES.");
  } else {
    checklist.add("Adăugați detalii despre vecinătăți, furnizor aparatură, acces și constrângeri existente.");
    missingData.add("Descriere extinsă: furnizor, vecinătăți, acces, constrângeri, coduri / cerințe echipament");
  }

  const normalizedScore = Math.min(score, 100);
  const complexity = getAdvancedComplexity(normalizedScore);
  const budget = createBudgetEstimate({
    score: normalizedScore,
    hasRadiology: true,
    hasRmn,
    hasCtRx,
    hasEquipment: !equipmentUnknown,
    hasRfShielding,
    hasLeadShielding,
    isLarge,
    isExistingBuilding,
    equipmentAlreadySelected,
  });
  const timeline = createTimelineEstimate({
    score: normalizedScore,
    hasRadiology: true,
    hasRmn,
    hasCtRx,
    hasEquipment: !equipmentUnknown,
    hasRfShielding,
    hasLeadShielding,
    isLarge,
    isExistingBuilding,
    equipmentAlreadySelected,
  });
  const confidence = createConfidenceEstimate({
    answered: Object.values(form).filter((value) => value.trim()).length,
    total: Object.keys(form).length,
    unknowns: unknownCount,
    descriptionLength: form.description.trim().length,
    score: normalizedScore,
  });

  return {
    complexity,
    score: normalizedScore,
    infrastructureType,
    shieldingRecommendation,
    checklist: Array.from(checklist),
    risks,
    authorizationNotes: Array.from(authorizationNotes),
    relevantServices: Array.from(relevantServices),
    budget,
    timeline,
    assumptions: Array.from(assumptions),
    missingData: Array.from(missingData),
    confidence,
    nextSteps: Array.from(nextSteps),
    nextStep:
      normalizedScore >= 82
        ? "Solicită urgent o verificare tehnică ZES înainte de a continua execuția, achiziția sau documentația de autorizare."
        : "Solicită verificare tehnică ZES pentru camera de radiologie și validează ecranarea, aparatura și pașii de autorizare.",
    riskLevel: getRiskLevel(normalizedScore),
  };
}

function getRiskLevel(score: number): RadiologyPlannerAnalysis["riskLevel"] {
  if (score >= 86) {
    return "Critic";
  }

  if (score >= 64) {
    return "Ridicat";
  }

  if (score >= 38) {
    return "Atenție";
  }

  return "Controlat";
}
