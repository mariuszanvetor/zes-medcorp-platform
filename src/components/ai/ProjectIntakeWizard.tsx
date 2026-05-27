"use client";

import { useEffect, useMemo, useState } from "react";

import { ProjectIntakeLeadCTA } from "@/components/ai/ProjectIntakeLeadCTA";
import { ProjectIntakeSummary } from "@/components/ai/ProjectIntakeSummary";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { trackEvent } from "@/lib/analytics";
import {
  clearDiscoveryContext,
  createDiscoveryContextSummary,
  loadDiscoveryContext,
  type SerializableDiscoveryContext,
} from "@/lib/ai-intelligence/discovery-context";
import { cn } from "@/lib/utils";

type Recommendation = {
  label: string;
  href: string;
  reason: string;
};

export type ProjectIntakeResult = {
  projectType: string;
  urgency: string;
  projectProfile: string;
  readinessScore: number;
  readinessLevel: "Exploratoriu" | "Partial definit" | "Pregatit pentru analiza tehnica" | "Pregatit pentru propunere preliminara";
  technicalComplexity: "Redusa" | "Medie" | "Ridicata" | "Critica";
  riskLevel: "Redus" | "Mediu" | "Ridicat" | "Critic";
  missingInformation: string[];
  recommendedServices: Recommendation[];
  recommendedTools: Recommendation[];
  recommendedResources: Recommendation[];
  nextStep: string;
  generatedSummary: string;
};

type IntakeState = {
  projectType: string;
  projectStage: string;
  cityCounty: string;
  surfaceRange: string;
  buildingType: string;
  spaceStatus: string;
  technicalRequirements: string[];
  plansStatus: string;
  equipmentSpecsStatus: string;
  dspStatus: string;
  cncanStatus: string;
  budgetStatus: string;
  timelineStatus: string;
  urgency: string;
  businessGoal: string;
};

const steps = [
  "Tip proiect",
  "Stadiu",
  "Spatiu",
  "Cerințe tehnice",
  "Documentație",
  "Urgență",
  "Rezumat",
];

const projectTypes = [
  "Clinică nouă",
  "Modernizare clinică",
  "Radiologie",
  "RMN",
  "CT / RX",
  "Laborator IVD",
  "Achiziție aparatură",
  "Service aparatură",
  "Nu știu încă",
];

const projectStages = [
  "Idee",
  "Bugetare",
  "Proiectare",
  "Autorizare",
  "Execuție",
  "Echipament achiziționat",
  "Problemă tehnică activă",
];

const surfaceRanges = [
  "sub 100 mp",
  "100-300 mp",
  "300-700 mp",
  "peste 700 mp",
  "nu se aplică",
  "nu știu încă",
];

const buildingTypes = [
  "Clădire nouă",
  "Clădire existentă",
  "Spațiu comercial convertit",
  "Spațiu medical existent",
  "Nu știu încă",
];

const spaceStatuses = [
  "Spațiu medical existent",
  "Conversie spațiu nemedical",
  "Spațiu nou în proiectare",
  "Spațiu în execuție",
  "Nu știu încă",
];

const technicalRequirements = [
  "Radiologie necesară",
  "RF shielding pentru RMN",
  "Protecție radiologică / plumb",
  "IVD / laborator",
  "Aparatură imagistică",
  "Service / mentenanță",
  "HVAC / electric / date de verificat",
  "Nu știu încă",
];

const statusOptions = ["Disponibil", "Parțial", "Nu", "Nu știu încă"];
const authorityOptions = [
  "Nu este cazul",
  "Nu am început",
  "În analiză",
  "În lucru",
  "Finalizat",
  "Nu știu încă",
];
const urgencyOptions = ["Exploratoriu", "3-6 luni", "1-3 luni", "Imediat"];

const initialState: IntakeState = {
  projectType: "Nu știu încă",
  projectStage: "Idee",
  cityCounty: "",
  surfaceRange: "nu știu încă",
  buildingType: "Nu știu încă",
  spaceStatus: "Nu știu încă",
  technicalRequirements: [],
  plansStatus: "Nu știu încă",
  equipmentSpecsStatus: "Nu știu încă",
  dspStatus: "Nu știu încă",
  cncanStatus: "Nu este cazul",
  budgetStatus: "Nu știu încă",
  timelineStatus: "Nu știu încă",
  urgency: "Exploratoriu",
  businessGoal: "",
};

export function ProjectIntakeWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<IntakeState>(initialState);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [discoveryContext, setDiscoveryContext] = useState<SerializableDiscoveryContext | null>(null);
  const result = useMemo(() => buildIntakeResult(form), [form]);

  useEffect(() => {
    const context = loadDiscoveryContext();
    if (context) {
      setDiscoveryContext(context);
      setForm((current) => prefillIntakeFromDiscovery(current, context));
    }

    trackEvent("intake_start", {
      sourcePage: "/project-intake",
      sourceTool: context ? "project-intake-from-discovery" : "project-intake",
    });
  }, []);

  function updateField<K extends keyof IntakeState>(field: K, value: IntakeState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleRequirement(value: string) {
    setForm((current) => {
      const exists = current.technicalRequirements.includes(value);
      const nextRequirements = exists
        ? current.technicalRequirements.filter((item) => item !== value)
        : [...current.technicalRequirements.filter((item) => item !== "Nu știu încă"), value];

      return {
        ...current,
        technicalRequirements:
          value === "Nu știu încă" && !exists ? ["Nu știu încă"] : nextRequirements,
      };
    });
  }

  function goToStep(nextStep: number) {
    const safeStep = Math.max(0, Math.min(nextStep, steps.length - 1));
    setCurrentStep(safeStep);

    if (safeStep === steps.length - 1 && !hasCompleted) {
      setHasCompleted(true);
      trackEvent("intake_complete", {
        sourcePage: "/project-intake",
        sourceTool: "project-intake",
        projectType: result.projectType,
        complexity: result.technicalComplexity,
        riskLevel: result.riskLevel,
        urgency: result.urgency,
      });
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
      <Card className="border-blue-100 bg-white lg:sticky lg:top-24" padding="lg">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
          Intake tehnic
        </p>
        <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-950">
          Informații pentru o discuție mai eficientă.
        </h2>
        <div className="mt-7 grid gap-3">
          {steps.map((step, index) => {
            const active = index === currentStep;
            const complete = index < currentStep;

            return (
              <button
                className={cn(
                  "flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition",
                  active
                    ? "border-blue-200 bg-[#f7fbff] text-[#0057b8]"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-100 hover:bg-slate-50",
                )}
                key={step}
                onClick={() => goToStep(index)}
                type="button"
              >
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    active || complete ? "bg-[#0057b8] text-white" : "bg-slate-100 text-slate-500",
                  )}
                >
                  {index + 1}
                </span>
                {step}
              </button>
            );
          })}
        </div>
        <div className="mt-7 rounded-2xl border border-blue-100 bg-[#f7fbff] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0057b8]">
            Scor curent
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">
            {result.readinessScore}/100
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-600">
            {result.readinessLevel}
          </p>
        </div>
        {discoveryContext && (
          <div className="mt-5 rounded-2xl border border-blue-100 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0057b8]">
              Context AI Discovery
            </p>
            <p className="mt-2 text-xs leading-6 text-slate-600">
              {createDiscoveryContextSummary(discoveryContext)}
            </p>
            <p className="mt-3 text-xs font-semibold leading-6 text-slate-500">
              Poti modifica sau ignora aceste date. Contextul este folosit doar local pentru a continua proiectul.
            </p>
            <Button
              className="mt-3"
              size="sm"
              type="button"
              variant="secondary"
              onClick={() => {
                clearDiscoveryContext();
                setDiscoveryContext(null);
              }}
            >
              Ignora contextul
            </Button>
          </div>
        )}
      </Card>

      <div className="grid gap-6">
        {currentStep < steps.length - 1 ? (
          <Card className="border-blue-100 bg-white" padding="lg">
            <StepHeader step={currentStep} />
            {currentStep === 0 && (
              <RadioGrid
                label="Ce descrie cel mai bine proiectul?"
                options={projectTypes}
                value={form.projectType}
                onChange={(value) => updateField("projectType", value)}
              />
            )}
            {currentStep === 1 && (
              <RadioGrid
                label="În ce stadiu este proiectul?"
                options={projectStages}
                value={form.projectStage}
                onChange={(value) => updateField("projectStage", value)}
              />
            )}
            {currentStep === 2 && (
              <div className="grid gap-6">
                <TextInput
                  label="Oraș / județ"
                  onChange={(value) => updateField("cityCounty", value)}
                  placeholder="Ex: București, Cluj, Iași"
                  value={form.cityCounty}
                />
                <RadioGrid
                  label="Suprafață estimată"
                  options={surfaceRanges}
                  value={form.surfaceRange}
                  onChange={(value) => updateField("surfaceRange", value)}
                />
                <RadioGrid
                  label="Tip clădire"
                  options={buildingTypes}
                  value={form.buildingType}
                  onChange={(value) => updateField("buildingType", value)}
                />
                <RadioGrid
                  label="Status spațiu"
                  options={spaceStatuses}
                  value={form.spaceStatus}
                  onChange={(value) => updateField("spaceStatus", value)}
                />
              </div>
            )}
            {currentStep === 3 && (
              <CheckboxGrid
                label="Ce cerințe tehnice sunt relevante?"
                options={technicalRequirements}
                values={form.technicalRequirements}
                onToggle={toggleRequirement}
              />
            )}
            {currentStep === 4 && (
              <div className="grid gap-6">
                <RadioGrid
                  label="Planuri / releveu disponibile"
                  options={statusOptions}
                  value={form.plansStatus}
                  onChange={(value) => updateField("plansStatus", value)}
                />
                <RadioGrid
                  label="Specificații echipamente disponibile"
                  options={statusOptions}
                  value={form.equipmentSpecsStatus}
                  onChange={(value) => updateField("equipmentSpecsStatus", value)}
                />
                <RadioGrid
                  label="Status DSP"
                  options={authorityOptions}
                  value={form.dspStatus}
                  onChange={(value) => updateField("dspStatus", value)}
                />
                <RadioGrid
                  label="Status CNCAN"
                  options={authorityOptions}
                  value={form.cncanStatus}
                  onChange={(value) => updateField("cncanStatus", value)}
                />
                <RadioGrid
                  label="Buget definit"
                  options={statusOptions}
                  value={form.budgetStatus}
                  onChange={(value) => updateField("budgetStatus", value)}
                />
                <RadioGrid
                  label="Timeline definit"
                  options={statusOptions}
                  value={form.timelineStatus}
                  onChange={(value) => updateField("timelineStatus", value)}
                />
              </div>
            )}
            {currentStep === 5 && (
              <div className="grid gap-6">
                <RadioGrid
                  label="Urgență"
                  options={urgencyOptions}
                  value={form.urgency}
                  onChange={(value) => updateField("urgency", value)}
                />
                <label className="grid gap-3" htmlFor="business-goal">
                  <span className="text-sm font-bold text-slate-800">
                    Obiectivul proiectului
                  </span>
                  <textarea
                    className="min-h-36 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white"
                    id="business-goal"
                    onChange={(event) => updateField("businessGoal", event.target.value)}
                    placeholder="Ex: deschidere clinică de diagnostic, modernizare radiologie, reducerea downtime-ului, pregătire pentru echipament RMN."
                    value={form.businessGoal}
                  />
                </label>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">
              <Button
                disabled={currentStep === 0}
                onClick={() => goToStep(currentStep - 1)}
                type="button"
                variant="secondary"
              >
                Înapoi
              </Button>
              <Button onClick={() => goToStep(currentStep + 1)} type="button">
                {currentStep === steps.length - 2 ? "Vezi rezumatul" : "Continuă"}
              </Button>
            </div>
          </Card>
        ) : (
          <>
            <ProjectIntakeSummary result={result} />
            <ProjectIntakeLeadCTA discoveryContext={discoveryContext} result={result} />
          </>
        )}

        <Card className="border-blue-100 bg-[#f7fbff]" padding="lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Nu ești sigur că acesta este fluxul potrivit?
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Poți folosi Proposal Builder pentru o propunere preliminară sau
                planificarea ghidată pentru a alege scenariul.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                className="text-sm font-bold text-[#0057b8] transition hover:text-blue-950"
                href="/proposal-builder"
                tracking={{
                  ctaLabel: "Proposal Builder din intake",
                  destination: "/proposal-builder",
                  sourcePage: "/project-intake",
                  sourceTool: "project-intake",
                }}
              >
                Proposal Builder
              </TrackedLink>
              <TrackedLink
                className="text-sm font-bold text-[#0057b8] transition hover:text-blue-950"
                href="/planificare"
                tracking={{
                  ctaLabel: "Planificare din intake",
                  destination: "/planificare",
                  sourcePage: "/project-intake",
                  sourceTool: "project-intake",
                }}
              >
                Planificare
              </TrackedLink>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function prefillIntakeFromDiscovery(
  current: IntakeState,
  context: SerializableDiscoveryContext,
): IntakeState {
  const domains = new Set(context.project.domains);
  const requirements = new Set<string>();

  if (domains.has("radiology") || domains.has("ct") || domains.has("mri")) requirements.add(optionLike(technicalRequirements, "Radiologie"));
  if (domains.has("mri")) requirements.add(optionLike(technicalRequirements, "RF shielding"));
  if (domains.has("ct") || domains.has("radiology") || domains.has("dental")) requirements.add(optionLike(technicalRequirements, "Protectie radiologica", "Protec"));
  if (domains.has("ivd-laboratory")) requirements.add(optionLike(technicalRequirements, "IVD"));
  if (domains.has("mri") || domains.has("ct") || domains.has("ultrasound")) requirements.add(optionLike(technicalRequirements, "Aparatura imagistica", "Aparatur"));
  if (domains.has("medical-electrical") || domains.has("hvac") || domains.has("ups-power")) requirements.add(optionLike(technicalRequirements, "HVAC"));

  return {
    ...current,
    projectType: mapDiscoveryIntakeProjectType(domains, context),
    projectStage: mapDiscoveryIntakeStage(context.project.stage),
    buildingType: context.project.knownAnswers.existingBuilding ? optionLike(buildingTypes, "Cladire existenta", "Cl") : current.buildingType,
    spaceStatus: context.project.knownAnswers.existingBuilding ? optionLike(spaceStatuses, "Spatiu medical existent", "Spa") : current.spaceStatus,
    plansStatus: context.project.knownAnswers.plansAvailable ? "Disponibil" : current.plansStatus,
    equipmentSpecsStatus: context.project.knownAnswers.equipmentSpecsAvailable ? "Disponibil" : current.equipmentSpecsStatus,
    budgetStatus: context.project.knownAnswers.budgetKnown ? "Disponibil" : current.budgetStatus,
    timelineStatus: context.project.knownAnswers.timelineKnown ? "Disponibil" : current.timelineStatus,
    urgency: context.intelligence.riskLevel === "critical" ? "Imediat" : current.urgency,
    technicalRequirements: requirements.size ? [...requirements] : current.technicalRequirements,
    businessGoal: [
      current.businessGoal,
      "Context preluat din AI Discovery:",
      context.generatedSummary,
      context.project.notes ? `Note initiale: ${context.project.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n\n"),
  };
}

function mapDiscoveryIntakeProjectType(
  domains: Set<string>,
  context: SerializableDiscoveryContext,
) {
  if (domains.has("mri")) return "RMN";
  if (domains.has("ct") || domains.has("radiology") || domains.has("dental")) return "CT / RX";
  if (domains.has("ivd-laboratory")) return "Laborator IVD";
  if (domains.has("clinic-modernization") || context.project.knownAnswers.modernization) return optionLike(projectTypes, "Modernizare");
  if (domains.has("surgery-or") || domains.has("ati-critical-care") || domains.has("sterilization")) return optionLike(projectTypes, "Clinica noua", "Clinic");
  if (domains.has("healthcare-infrastructure")) return optionLike(projectTypes, "Clinica noua", "Clinic");
  return optionLike(projectTypes, "Nu stiu", "Nu");
}

function mapDiscoveryIntakeStage(stage: string) {
  if (stage === "budgeting" || stage === "feasibility") return "Bugetare";
  if (stage === "design") return "Proiectare";
  if (stage === "authorization") return "Autorizare";
  if (stage === "execution" || stage === "commissioning") return optionLike(projectStages, "Executie", "Execu");
  if (stage === "procurement") return optionLike(projectStages, "Echipament");
  if (stage === "active-issue") return optionLike(projectStages, "Problema", "Problem");
  return "Idee";
}

function optionLike(options: readonly string[], normalizedNeedle: string, fallbackNeedle = normalizedNeedle) {
  const normalized = normalizeForMatch(normalizedNeedle);
  const fallback = normalizeForMatch(fallbackNeedle);
  return (
    options.find((option) => normalizeForMatch(option).includes(normalized)) ??
    options.find((option) => normalizeForMatch(option).includes(fallback)) ??
    options[0]
  );
}

function normalizeForMatch(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function StepHeader({ step }: { step: number }) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
          Pasul {step + 1} din {steps.length - 1}
        </p>
        <h3 className="mt-2 text-3xl font-semibold leading-tight text-slate-950">
          {steps[step]}
        </h3>
      </div>
      <Badge variant="blue">intake structurat</Badge>
    </div>
  );
}

function RadioGrid({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-bold text-slate-800">{label}</legend>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const selected = option === value;

          return (
            <label
              className={cn(
                "cursor-pointer rounded-2xl border px-4 py-3 text-sm font-semibold leading-6 transition",
                selected
                  ? "border-blue-300 bg-[#f0f7ff] text-[#0057b8] shadow-[0_12px_34px_rgba(0,87,184,0.08)]"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-100 hover:bg-slate-50",
              )}
              key={option}
            >
              <input
                checked={selected}
                className="sr-only"
                onChange={() => onChange(option)}
                type="radio"
              />
              {option}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function CheckboxGrid({
  label,
  options,
  values,
  onToggle,
}: {
  label: string;
  options: string[];
  values: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-bold text-slate-800">{label}</legend>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const selected = values.includes(option);

          return (
            <label
              className={cn(
                "cursor-pointer rounded-2xl border px-4 py-3 text-sm font-semibold leading-6 transition",
                selected
                  ? "border-blue-300 bg-[#f0f7ff] text-[#0057b8] shadow-[0_12px_34px_rgba(0,87,184,0.08)]"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-100 hover:bg-slate-50",
              )}
              key={option}
            >
              <input
                checked={selected}
                className="sr-only"
                onChange={() => onToggle(option)}
                type="checkbox"
              />
              {option}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function TextInput({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-3">
      <span className="text-sm font-bold text-slate-800">{label}</span>
      <input
        className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
}

function buildIntakeResult(form: IntakeState): ProjectIntakeResult {
  const requirements = form.technicalRequirements;
  const hasUnknownProject = form.projectType === "Nu știu încă";
  const hasRmn =
    form.projectType === "RMN" || requirements.includes("RF shielding pentru RMN");
  const hasCtRx =
    form.projectType === "CT / RX" || requirements.includes("Protecție radiologică / plumb");
  const hasRadiology =
    form.projectType === "Radiologie" ||
    hasRmn ||
    hasCtRx ||
    requirements.includes("Radiologie necesară");
  const hasLab =
    form.projectType === "Laborator IVD" || requirements.includes("IVD / laborator");
  const hasEquipment =
    form.projectType === "Achiziție aparatură" ||
    requirements.includes("Aparatură imagistică");
  const hasService =
    form.projectType === "Service aparatură" ||
    requirements.includes("Service / mentenanță") ||
    form.projectStage === "Problemă tehnică activă";
  const hasModernization =
    form.projectType === "Modernizare clinică" ||
    form.buildingType.includes("existentă") ||
    form.spaceStatus.includes("existent");
  const isUrgent = form.urgency === "Imediat" || form.urgency === "1-3 luni";

  let score = 0;
  if (!hasUnknownProject) score += 12;
  if (form.projectStage !== "Idee") score += 10;
  if (form.cityCounty.trim().length > 2) score += 8;
  if (!form.surfaceRange.includes("știu")) score += 8;
  if (!form.buildingType.includes("știu")) score += 6;
  if (!form.spaceStatus.includes("știu")) score += 6;
  if (requirements.length && !requirements.includes("Nu știu încă")) score += 12;
  if (isAvailable(form.plansStatus)) score += 10;
  if (isAvailable(form.equipmentSpecsStatus)) score += 10;
  if (isKnownAuthority(form.dspStatus)) score += 6;
  if (!hasCtRx || isKnownAuthority(form.cncanStatus)) score += 6;
  if (isAvailable(form.budgetStatus)) score += 7;
  if (isAvailable(form.timelineStatus)) score += 7;
  if (form.businessGoal.trim().length > 40) score += 8;

  const readinessScore = Math.min(score, 100);
  const readinessLevel = getReadinessLevel(readinessScore);
  const technicalComplexity = getTechnicalComplexity({
    hasCtRx,
    hasLab,
    hasModernization,
    hasRadiology,
    hasRmn,
    hasService,
    isUrgent,
    readinessScore,
  });
  const riskLevel = getRiskLevel({
    hasCtRx,
    hasRmn,
    hasService,
    isUrgent,
    readinessScore,
  });
  const missingInformation = getMissingInformation(form, {
    hasCtRx,
    hasLab,
    hasRadiology,
    hasRmn,
    hasService,
  });
  const recommendedServices = getRecommendedServices({
    hasCtRx,
    hasEquipment,
    hasLab,
    hasModernization,
    hasRadiology,
    hasRmn,
    hasService,
    hasUnknownProject,
  });
  const recommendedTools = getRecommendedTools({
    hasCtRx,
    hasLab,
    hasRadiology,
    hasRmn,
    hasService,
    readinessScore,
  });
  const recommendedResources = getRecommendedResources({
    hasCtRx,
    hasLab,
    hasModernization,
    hasRadiology,
    hasRmn,
    hasService,
  });
  const nextStep = getNextStep(readinessScore, {
    hasCtRx,
    hasRmn,
    hasService,
    isUrgent,
  });

  return {
    projectType: form.projectType,
    urgency: form.urgency,
    projectProfile: `${form.projectType} · ${form.projectStage} · ${form.surfaceRange}`,
    readinessScore,
    readinessLevel,
    technicalComplexity,
    riskLevel,
    missingInformation,
    recommendedServices,
    recommendedTools,
    recommendedResources,
    nextStep,
    generatedSummary: `Intake-ul descrie un proiect de tip ${form.projectType.toLowerCase()} aflat in stadiul ${form.projectStage.toLowerCase()}, cu nivel de pregatire ${readinessLevel.toLowerCase()} si risc ${riskLevel.toLowerCase()}. ZES ar trebui sa valideze datele lipsa, cerintele tehnice si pasii de documentatie inainte de propunere finala.`,
  };
}

function isAvailable(value: string) {
  return value === "Disponibil" || value === "Parțial";
}

function isKnownAuthority(value: string) {
  return value === "În analiză" || value === "În lucru" || value === "Finalizat" || value === "Nu este cazul";
}

function getReadinessLevel(score: number): ProjectIntakeResult["readinessLevel"] {
  if (score >= 78) return "Pregatit pentru propunere preliminara";
  if (score >= 58) return "Pregatit pentru analiza tehnica";
  if (score >= 34) return "Partial definit";
  return "Exploratoriu";
}

function getTechnicalComplexity({
  hasCtRx,
  hasLab,
  hasModernization,
  hasRadiology,
  hasRmn,
  hasService,
  isUrgent,
  readinessScore,
}: {
  hasCtRx: boolean;
  hasLab: boolean;
  hasModernization: boolean;
  hasRadiology: boolean;
  hasRmn: boolean;
  hasService: boolean;
  isUrgent: boolean;
  readinessScore: number;
}): ProjectIntakeResult["technicalComplexity"] {
  let score = 0;
  if (hasRmn) score += 34;
  if (hasCtRx) score += 30;
  if (hasRadiology) score += 18;
  if (hasLab) score += 16;
  if (hasModernization) score += 14;
  if (hasService) score += 12;
  if (isUrgent) score += 12;
  if (readinessScore < 40) score += 10;

  if (score >= 58) return "Critica";
  if (score >= 36) return "Ridicata";
  if (score >= 18) return "Medie";
  return "Redusa";
}

function getRiskLevel({
  hasCtRx,
  hasRmn,
  hasService,
  isUrgent,
  readinessScore,
}: {
  hasCtRx: boolean;
  hasRmn: boolean;
  hasService: boolean;
  isUrgent: boolean;
  readinessScore: number;
}): ProjectIntakeResult["riskLevel"] {
  if ((hasRmn || hasCtRx || hasService) && isUrgent) return "Critic";
  if ((hasRmn || hasCtRx) && readinessScore < 55) return "Ridicat";
  if (readinessScore < 35) return "Ridicat";
  if (hasRmn || hasCtRx || hasService) return "Mediu";
  return "Redus";
}

function getMissingInformation(
  form: IntakeState,
  flags: {
    hasCtRx: boolean;
    hasLab: boolean;
    hasRadiology: boolean;
    hasRmn: boolean;
    hasService: boolean;
  },
) {
  const missing = [];

  if (form.projectType === "Nu știu încă") missing.push("tipul exact de proiect sau scenariul dominant");
  if (!form.cityCounty.trim()) missing.push("orașul / județul și contextul amplasamentului");
  if (form.surfaceRange.includes("știu")) missing.push("suprafața estimată sau dimensiunea camerei");
  if (form.buildingType.includes("știu")) missing.push("tipul clădirii și limitările spațiului");
  if (!form.technicalRequirements.length || form.technicalRequirements.includes("Nu știu încă")) {
    missing.push("cerințele tehnice relevante: radiologie, RMN, IVD, aparatură sau service");
  }
  if (!isAvailable(form.plansStatus)) missing.push("planuri, releveu sau documentație de spațiu");
  if ((flags.hasRadiology || flags.hasLab) && !isAvailable(form.equipmentSpecsStatus)) {
    missing.push("specificații echipamente, cerințe furnizor și condiții de instalare");
  }
  if (flags.hasRmn) missing.push("date RMN pentru RF shielding, acces magnet, HVAC, vibrații și testare RF");
  if (flags.hasCtRx) missing.push("layout CT/RX, vecinătăți, zone controlate și status CNCAN");
  if (flags.hasLab) missing.push("flux probe, volum estimat, echipamente IVD, calibrare și QC");
  if (flags.hasService) missing.push("model, serie, simptome, istoric service și impact operațional");
  if (!isAvailable(form.budgetStatus)) missing.push("interval bugetar orientativ");
  if (!isAvailable(form.timelineStatus)) missing.push("calendar țintă și dependențe critice");

  return missing.length ? missing : ["datele principale sunt suficiente pentru o primă analiză tehnică"];
}

function getRecommendedServices(flags: {
  hasCtRx: boolean;
  hasEquipment: boolean;
  hasLab: boolean;
  hasModernization: boolean;
  hasRadiology: boolean;
  hasRmn: boolean;
  hasService: boolean;
  hasUnknownProject: boolean;
}) {
  const services: Recommendation[] = [
    {
      label: "Consultanță tehnică",
      href: "/contact",
      reason: "Punct de intrare pentru validarea informațiilor.",
    },
  ];

  if (flags.hasUnknownProject || flags.hasModernization) {
    services.push({
      label: "Amenajări medicale",
      href: "/services/amenajari-medicale",
      reason: "Relevant pentru spații existente, conversii și modernizări.",
    });
  }

  if (flags.hasRadiology) {
    services.push({
      label: "Radiologie",
      href: "/services/radiologie",
      reason: "Coordonează camerele de imagistică și cerințele tehnice.",
    });
  }

  if (flags.hasRmn) {
    services.push({
      label: "RF shielding pentru RMN",
      href: "/services/rf-shielding",
      reason: "Pentru cușcă Faraday, uși RF, filtre și integritate electromagnetică.",
    });
  }

  if (flags.hasCtRx) {
    services.push({
      label: "Protecție radiologică",
      href: "/services/protectie-radiologica",
      reason: "Pentru CT/RX, plumb, zone controlate și coordonare CNCAN.",
    });
  }

  if (flags.hasEquipment || flags.hasRadiology) {
    services.push({
      label: "Imagistică medicală",
      href: "/services/imagistica-medicala",
      reason: "Pentru selecție, integrare și cerințe de aparatură imagistică.",
    });
  }

  if (flags.hasLab) {
    services.push({
      label: "IVD / laborator",
      href: "/services/ivd-laborator",
      reason: "Pentru flux laborator, echipamente IVD, calibrare și service.",
    });
  }

  if (flags.hasService) {
    services.push({
      label: "Service aparatură medicală",
      href: "/services/service-aparatura-medicala",
      reason: "Pentru triere service, mentenanță și continuitate operațională.",
    });
  }

  return uniqueByHref(services);
}

function getRecommendedTools(flags: {
  hasCtRx: boolean;
  hasLab: boolean;
  hasRadiology: boolean;
  hasRmn: boolean;
  hasService: boolean;
  readinessScore: number;
}) {
  const tools: Recommendation[] = [
    {
      label: "Proposal Builder",
      href: "/proposal-builder",
      reason: "Transformă intake-ul într-o propunere tehnică preliminară.",
    },
  ];

  if (flags.readinessScore < 55) {
    tools.push({
      label: "Consultant AI",
      href: "/ai-project-advisor",
      reason: "Ajută la orientare când proiectul este încă parțial definit.",
    });
  }

  if (flags.hasRadiology || flags.hasRmn || flags.hasCtRx) {
    tools.push({
      label: "Radiology Room Planner",
      href: "/radiology-room-planner",
      reason: "Separă cerințele RMN/RF de CT/RX/protecție radiologică.",
    });
  }

  if (flags.hasRmn) {
    tools.push({
      label: "Calculator cost cameră RMN",
      href: "/calculatoare/cost-camera-rmn",
      reason: "Estimează orientativ RF shielding, HVAC și integrarea RMN.",
    });
  }

  if (flags.hasCtRx) {
    tools.push({
      label: "Calculator cost cameră CT",
      href: "/calculatoare/cost-camera-ct",
      reason: "Estimează orientativ protecția radiologică și coordonarea CNCAN.",
    });
  }

  if (flags.hasLab) {
    tools.push({
      label: "Calculator laborator IVD",
      href: "/calculatoare/cost-laborator-ivd",
      reason: "Verifică flux, echipamente IVD, integrare și service.",
    });
  }

  if (flags.hasService) {
    tools.push({
      label: "Service Diagnostic",
      href: "/service-diagnostic",
      reason: "Triează urgența, downtime-ul și pașii de intervenție.",
    });
  }

  return uniqueByHref(tools);
}

function getRecommendedResources(flags: {
  hasCtRx: boolean;
  hasLab: boolean;
  hasModernization: boolean;
  hasRadiology: boolean;
  hasRmn: boolean;
  hasService: boolean;
}) {
  const resources: Recommendation[] = [
    {
      label: "Planificare proiect medical",
      href: "/planificare",
      reason: "Alege scenariul de planificare potrivit.",
    },
  ];

  if (flags.hasRmn) {
    resources.push({
      label: "Checklist cameră RMN înainte de instalare",
      href: "/knowledge-hub/checklist-camera-rmn-inainte-instalare",
      reason: "Pregătește datele critice pentru camera RMN.",
    });
  }

  if (flags.hasCtRx) {
    resources.push({
      label: "Autorizare CNCAN pas cu pas",
      href: "/knowledge-hub/autorizare-cncan-pas-cu-pas",
      reason: "Clarifică procesul CNCAN pentru radiologie cu radiații ionizante.",
    });
  }

  if (flags.hasRadiology || flags.hasModernization) {
    resources.push({
      label: "Amenajare radiologie",
      href: "/ghiduri/amenajare-radiologie",
      reason: "Separă cerințele RMN de CT/RX în proiectare.",
    });
  }

  if (flags.hasLab) {
    resources.push({
      label: "Echipamente IVD / laborator",
      href: "/ghiduri/echipamente-ivd-laborator",
      reason: "Leagă echipamentele IVD de flux și service.",
    });
  }

  if (flags.hasService) {
    resources.push({
      label: "Service aparatură medicală",
      href: "/ghiduri/service-aparatura-medicala",
      reason: "Planifică mentenanța și continuitatea operațională.",
    });
  }

  return uniqueByHref(resources);
}

function getNextStep(
  readinessScore: number,
  flags: {
    hasCtRx: boolean;
    hasRmn: boolean;
    hasService: boolean;
    isUrgent: boolean;
  },
) {
  if (flags.hasService && flags.isUrgent) {
    return "Triage service rapid";
  }

  if (flags.hasRmn) {
    return "Validare tehnică RMN / RF";
  }

  if (flags.hasCtRx) {
    return "Validare protecție radiologică / CNCAN";
  }

  if (readinessScore >= 78) {
    return "Propunere preliminară ZES";
  }

  if (readinessScore >= 58) {
    return "Analiză tehnică ZES";
  }

  return "Clarificare date de proiect";
}

function uniqueByHref(items: Recommendation[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    if (seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });
}
