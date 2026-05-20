"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import {
  CalculatorResult,
  type CalculatorAnalysis,
} from "@/components/ai/CalculatorResult";
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
  "Laborator",
  "Cabinet medical",
  "Spital / secție",
  "Modernizare",
] as const;

const surfaces = ["sub 100 mp", "100–300 mp", "300–700 mp", "peste 700 mp"] as const;
const radiologyOptions = ["Nu", "CT", "RMN", "RX", "Nu știu"] as const;
const rfShieldingOptions = ["Da", "Nu", "Nu știu"] as const;
const leadShieldingOptions = ["Da", "Nu", "Nu știu"] as const;
const equipmentOptions = [
  "Nu",
  "Integrare",
  "Achiziție",
  "Service / mentenanță",
  "Nu știu",
] as const;
const urgencyOptions = ["Exploratoriu", "1–3 luni", "3–6 luni", "Imediat"] as const;

type CalculatorState = {
  projectType: (typeof projectTypes)[number];
  surface: (typeof surfaces)[number];
  radiology: (typeof radiologyOptions)[number];
  rfShielding: (typeof rfShieldingOptions)[number];
  leadShielding: (typeof leadShieldingOptions)[number];
  equipment: (typeof equipmentOptions)[number];
  urgency: (typeof urgencyOptions)[number];
};

const initialState: CalculatorState = {
  projectType: "Clinică medicală",
  surface: "100–300 mp",
  radiology: "Nu știu",
  rfShielding: "Nu știu",
  leadShielding: "Nu știu",
  equipment: "Nu știu",
  urgency: "Exploratoriu",
};

export function MedicalProjectCalculator() {
  const [form, setForm] = useState<CalculatorState>(initialState);
  const [result, setResult] = useState<CalculatorAnalysis | null>(null);

  const completion = useMemo(() => {
    const answered = Object.values(form).filter(Boolean).length;
    return Math.round((answered / Object.keys(form).length) * 100);
  }, [form]);

  function updateField<K extends keyof CalculatorState>(
    field: K,
    value: CalculatorState[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function calculateProject() {
    trackToolStart("calculator-proiect-medical", {
      sourcePage: "/calculator-proiect-medical",
      projectType: form.projectType,
      urgency: form.urgency,
    });

    const analysis = generateCalculatorAnalysis(form);
    setResult(analysis);
    trackToolComplete("calculator-proiect-medical", {
      sourcePage: "/calculator-proiect-medical",
      projectType: form.projectType,
      urgency: form.urgency,
      estimatedBudgetRange: analysis.budget.totalRange,
      complexity: analysis.complexity,
      riskLevel: analysis.risks[0]?.level,
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    calculateProject();
  }

  return (
    <div className="grid gap-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Card className="sticky top-24" variant="glass">
          <p className="text-sm font-semibold text-cyan-100">
            Calculator orientativ
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Estimare de complexitate, nu ofertă
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Introdu parametrii principali ai proiectului. Rezultatul arată
            complexitatea, serviciile ZES probabile și riscurile care trebuie
            discutate tehnic.
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
            label="Suprafață"
            options={surfaces}
            value={form.surface}
            onChange={(value) => updateField("surface", value)}
          />
          <OptionGroup
            label="Radiologie"
            options={radiologyOptions}
            value={form.radiology}
            onChange={(value) => updateField("radiology", value)}
          />
          <OptionGroup
            label="Ecranare RF"
            options={rfShieldingOptions}
            value={form.rfShielding}
            onChange={(value) => updateField("rfShielding", value)}
          />
          <OptionGroup
            label="Protecție radiologică / plumb"
            options={leadShieldingOptions}
            value={form.leadShielding}
            onChange={(value) => updateField("leadShielding", value)}
          />
          <OptionGroup
            label="Aparatură medicală"
            options={equipmentOptions}
            value={form.equipment}
            onChange={(value) => updateField("equipment", value)}
          />
          <OptionGroup
            label="Urgență"
            options={urgencyOptions}
            value={form.urgency}
            onChange={(value) => updateField("urgency", value)}
          />

          <Button fullWidth onClick={calculateProject} size="lg" type="button">
            Calculează complexitatea proiectului
          </Button>
        </form>
      </div>

      {result && <CalculatorResult result={result} />}
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

function generateCalculatorAnalysis(form: CalculatorState): CalculatorAnalysis {
  let score = 14;
  const hasRmn = form.radiology === "RMN";
  const hasCtRx = form.radiology === "CT" || form.radiology === "RX";
  const hasRadiology = hasRmn || hasCtRx || form.projectType === "Radiologie" || form.radiology === "Nu știu";
  const hasLab = form.projectType === "Laborator";
  const hasRfShielding = form.rfShielding === "Da" || hasRmn;
  const hasLeadShielding = form.leadShielding === "Da" || hasCtRx;
  const hasEquipment = form.equipment !== "Nu";
  const hasService = form.equipment === "Service / mentenanță";
  const isLarge = form.surface === "300–700 mp" || form.surface === "peste 700 mp";
  const isExistingBuilding = form.projectType === "Modernizare";
  const isUrgent = form.urgency === "1–3 luni" || form.urgency === "Imediat";
  const unknownCount = [
    form.radiology === "Nu știu",
    form.rfShielding === "Nu știu",
    form.leadShielding === "Nu știu",
    form.equipment === "Nu știu",
  ].filter(Boolean).length;

  const recommendedServices = new Set<string>([
    "Consultanță tehnică pentru infrastructură medicală",
  ]);
  const risks = [
    createRisk(
      "DSP",
      "Medium",
      "Fluxurile, compartimentarea și destinațiile medicale pot modifica proiectul.",
      "Validați cerințele DSP înainte de estimarea finală.",
    ),
  ];
  const observations = new Set<string>([
    "DSP poate influența compartimentarea, fluxurile, instalațiile și condițiile de recepție.",
  ]);
  const assumptions = new Set<string>([
    "Calculatorul nu folosește planuri, releveu, liste de echipamente sau oferte comerciale.",
    "Estimarea compară benzi de complexitate, nu prețuri finale.",
  ]);
  const missingData = new Set<string>([
    "Planuri, releveu și starea instalațiilor existente",
    "Lista echipamentelor și cerințe furnizor",
  ]);
  const nextSteps = new Set<string>([
    "Solicită analiză tehnică ZES pentru validarea benzii de complexitate.",
    "Pregătește datele despre spațiu, echipamente, autorizări și deadline.",
  ]);

  if (form.projectType === "Radiologie") {
    score += 18;
    recommendedServices.add("Radiologie CT / RMN / RX");
    recommendedServices.add("Imagistică medicală");
    observations.add("CNCAN trebuie luat în calcul pentru proiectele cu radiații ionizante.");
    nextSteps.add("Clarifică tipul de cameră imagistică: RMN, CT sau RX.");
  }

  if (form.projectType === "Spital / secție") {
    score += 16;
    recommendedServices.add("Construcții medicale");
    recommendedServices.add("Proiecte medicale turnkey");
    risks.push(
      createRisk(
        "Operațiuni medicale",
        "High",
        "Secțiile medicale cer etapizare, fluxuri și continuitate operațională.",
        "Definiți zonele critice și scenariile de execuție fără întreruperi majore.",
      ),
    );
  }

  if (form.projectType === "Modernizare") {
    score += 10;
    recommendedServices.add("Amenajări medicale");
    risks.push(
      createRisk(
        "Modernizare spațiu existent",
        "High",
        "Spațiul existent poate limita traseele, accesul, structura și instalațiile.",
        "Includeți audit tehnic de amplasament înainte de blocarea bugetului.",
      ),
    );
  }

  if (hasLab) {
    score += 14;
    recommendedServices.add("IVD / echipamente laborator");
    recommendedServices.add("Integrare laborator");
    missingData.add("Flux de probe, volum estimat, echipamente IVD și cerințe de calibrare");
    observations.add("Laboratorul poate necesita utilități, calibrare, QC și service specializat.");
  }

  if (form.surface === "sub 100 mp") {
    score += 4;
  }

  if (form.surface === "100–300 mp") {
    score += 10;
    recommendedServices.add("Amenajări medicale");
  }

  if (form.surface === "300–700 mp") {
    score += 18;
    recommendedServices.add("Proiecte medicale turnkey");
    risks.push(
      createRisk(
        "Etapizare",
        "Medium",
        "Suprafața crește nevoia de coordonare și control al modificărilor.",
        "Planificați jaloane de decizie și aprobări pe specialități.",
      ),
    );
  }

  if (form.surface === "peste 700 mp") {
    score += 25;
    recommendedServices.add("Management tehnic multi-disciplinar");
    recommendedServices.add("Proiecte medicale turnkey");
    risks.push(
      createRisk(
        "Coordonare proiect complex",
        "High",
        "Proiectele mari necesită coordonare strictă între proiectare, execuție, aparatură și mentenanță.",
        "Introduceți management tehnic centralizat și plan de risc pe faze.",
      ),
    );
  }

  if (hasRmn) {
    score += 24;
    recommendedServices.add("Ecranare RF pentru cameră RMN");
    recommendedServices.add("Imagistică medicală - RMN");
    recommendedServices.add("Integrare aparatură medicală");
    observations.add("RMN nu este tratat ca o cameră radiologică clasică, dar are cerințe tehnice stricte de RF și amplasare.");
    assumptions.add("RMN declanșează logică RF shielding, cușcă Faraday, HVAC, vibrații și integrare echipament.");
    missingData.add("Cerințe RMN: RF attenuation, ușă RF, HVAC, vibrații, acces magnet");
    nextSteps.add("Rulează verificare RF shielding pentru cameră RMN.");
    risks.push(
      createRisk(
        "RF shielding pentru RMN",
        "Critical",
        "RMN cere cușcă Faraday, control penetrări, ușă RF, filtre și testare.",
        "Nu confundați RF shielding cu protecția radiologică; tratați-l ca serviciu separat.",
      ),
      createRisk(
        "HVAC / vibrații",
        "High",
        "Camera RMN poate fi afectată de vibrații, răcire, trasee și acces magnet.",
        "Validați cerințele furnizorului RMN înainte de execuție.",
      ),
    );
  }

  if (hasCtRx) {
    score += 22;
    recommendedServices.add("Protecție radiologică / plumb");
    recommendedServices.add("Imagistică medicală - CT/RX");
    recommendedServices.add("Consultanță radiologie și cerințe CNCAN");
    observations.add("Pentru CT/RX, CNCAN și documentația de protecție radiologică trebuie clarificate devreme.");
    assumptions.add("CT/RX declanșează logică de ecranare cu plumb, protecție radiologică și CNCAN.");
    missingData.add("Calcul radioprotecție, vecinătăți, zone controlate și documentație CNCAN");
    nextSteps.add("Solicită analiză de protecție radiologică și consultanță CNCAN.");
    risks.push(
      createRisk(
        "CNCAN",
        "High",
        "CT/RX implică autorizare, zone controlate și documentație de protecție radiologică.",
        "Includeți CNCAN în calendar înainte de execuția detaliilor de ecranare.",
      ),
      createRisk(
        "Protecție radiologică / plumb",
        "High",
        "Ecranarea cu plumb trebuie corelată cu layout-ul, ușile, geamul plumbat și vecinătățile.",
        "Validați calculul de radioprotecție și detaliile constructive.",
      ),
    );
  }

  if (form.radiology === "Nu știu") {
    score += 8;
    missingData.add("Decizie privind includerea CT, RMN sau RX");
    risks.push(
      createRisk(
        "Radiologie neclară",
        "Medium",
        "Necesarul de radiologie neclar poate schimba semnificativ calendarul și complexitatea.",
        "Decideți tipul de imagistică înainte de bugetarea detaliată.",
      ),
    );
  }

  if (form.rfShielding === "Da") {
    score += 12;
    recommendedServices.add("Ecranare RF");
    risks.push(
      createRisk(
        "Ecranare RF",
        "High",
        "Ecranarea RF trebuie corelată cu treceri, uși, ventilație și cerințele furnizorului.",
        "Planificați detaliile RF înainte de achiziții și execuție.",
      ),
    );
  }

  if (form.rfShielding === "Nu știu") {
    score += 5;
    observations.add("Necesitatea de ecranare RF se stabilește în funcție de aparatură și amplasament.");
  }

  if (form.leadShielding === "Da") {
    score += 12;
    recommendedServices.add("Protecție radiologică / plumb");
    observations.add("Protecția cu plumb sau soluții echivalente trebuie corelată cu calcule radiologice.");
  }

  if (form.leadShielding === "Nu știu") {
    score += 5;
    observations.add("Protecția radiologică se validează în funcție de echipament, flux și vecinătăți.");
  }

  if (form.equipment === "Integrare") {
    score += 10;
    recommendedServices.add("Integrare aparatură medicală");
    recommendedServices.add("Vânzare / selecție aparatură medicală");
    risks.push(
      createRisk(
        "Integrare aparatură",
        "Medium",
        "Integrarea aparaturii cere coordonare între furnizor, spațiu, instalații și service.",
        "Blocați cerințele furnizorilor înainte de execuția instalațiilor.",
      ),
    );
  }

  if (form.equipment === "Achiziție") {
    score += 10;
    recommendedServices.add("Aparatură medicală");
    recommendedServices.add("Vânzare aparatură medicală");
    nextSteps.add("Corelează selecția aparaturii cu spațiul, infrastructura și service-ul.");
  }

  if (form.equipment === "Service / mentenanță") {
    score += 12;
    recommendedServices.add("Service aparatură medicală");
    recommendedServices.add("Mentenanță aparatură medicală");
    risks.push(
      createRisk(
        "Service / uptime",
        "Medium",
        "Accesul de service, uptime-ul și mentenanța trebuie proiectate din faza inițială.",
        "Definiți planul de mentenanță și punctele de acces service.",
      ),
    );
  }

  if (form.equipment === "Nu știu") {
    score += 5;
    recommendedServices.add("Consultanță selecție aparatură medicală");
  }

  if (form.urgency === "1–3 luni") {
    score += 14;
    risks.push(
      createRisk(
        "Timeline",
        "High",
        "Calendarul 1–3 luni crește riscul de decizii rapide și modificări în execuție.",
        "Prioritizați deciziile critice, autorizările și cerințele aparaturii.",
      ),
    );
  }

  if (form.urgency === "3–6 luni") {
    score += 7;
  }

  if (form.urgency === "Imediat") {
    score += 20;
    risks.push(
      createRisk(
        "Urgență",
        "Critical",
        "Urgența imediată crește riscul de costuri, rework și blocaje de autorizare.",
        "Solicitați analiză tehnică rapidă înainte de angajamente comerciale.",
      ),
    );
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
  });
  const confidence = createConfidenceEstimate({
    answered: Object.values(form).filter(Boolean).length,
    total: Object.keys(form).length,
    unknowns: unknownCount,
    score: normalizedScore,
  });

  return {
    score: normalizedScore,
    complexity,
    band: getComplexityBandText(complexity),
    recommendedServices: Array.from(recommendedServices),
    phases: [
      "Analiză tehnică inițială și clarificare cerințe",
      "Validare fluxuri, autorizări și cerințe DSP / CNCAN",
      "Proiectare tehnică, buget orientativ, ecranare, aparatură și etapizare",
      "Execuție, integrare, testare și mentenanță",
    ],
    risks,
    observations: Array.from(observations),
    budget,
    timeline,
    assumptions: Array.from(assumptions),
    missingData: Array.from(missingData),
    confidence,
    nextSteps: Array.from(nextSteps),
  };
}

function getComplexityBandText(complexity: CalculatorAnalysis["complexity"]) {
  const bands: Record<CalculatorAnalysis["complexity"], string> = {
    Basic: "proiect medical compact, cu risc tehnic controlabil",
    Moderate: "proiect medical cu coordonare tehnică moderată",
    Advanced: "proiect medical complex, cu autorizări și integrare tehnică",
    Enterprise: "proiect cu aparatură, ecranare sau etapizare sensibilă",
    "High-complexity medical infrastructure":
      "infrastructură medicală de complexitate ridicată, cu risc tehnic major",
  };

  return bands[complexity];
}
