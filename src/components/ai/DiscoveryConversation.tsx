"use client";

import type {
  DiscoveryQuestion,
  IntelligenceInput,
  MedicalDomainId,
  ProjectStage,
} from "@/lib/ai-intelligence/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type DiscoveryConversationProps = {
  context: IntelligenceInput;
  nextQuestions: DiscoveryQuestion[];
  onPatch: (patch: Partial<IntelligenceInput>) => void;
  onAnswerQuestion: (question: DiscoveryQuestion, answer: string) => void;
  onContinueWithAssumptions: () => void;
};

const domainOptions: Array<{ id: MedicalDomainId; label: string; group: string }> = [
  { id: "healthcare-infrastructure", label: "Clinica generala", group: "Clinica" },
  { id: "clinic-modernization", label: "Modernizare clinica", group: "Clinica" },
  { id: "mri", label: "RMN", group: "Imagistica" },
  { id: "ct", label: "CT", group: "Imagistica" },
  { id: "radiology", label: "Radiologie / RX", group: "Imagistica" },
  { id: "dental", label: "Stomatologie / CBCT", group: "Cabinete" },
  { id: "ivd-laboratory", label: "IVD / laborator", group: "Laborator" },
  { id: "surgery-or", label: "Sala operatie", group: "Zone critice" },
  { id: "ati-critical-care", label: "ATI", group: "Zone critice" },
  { id: "sterilization", label: "Sterilizare", group: "Zone critice" },
  { id: "cardiology", label: "Cardiologie", group: "Cabinete" },
  { id: "ultrasound", label: "Ecografie", group: "Cabinete" },
  { id: "medical-electrical", label: "Electric medical", group: "Infrastructura" },
  { id: "hvac", label: "HVAC", group: "Infrastructura" },
  { id: "ups-power", label: "UPS / backup", group: "Infrastructura" },
  { id: "operational-workflow", label: "Flux operational", group: "Operare" },
];

const stageOptions: Array<{ value: ProjectStage; label: string }> = [
  { value: "idea", label: "Idee" },
  { value: "budgeting", label: "Bugetare" },
  { value: "feasibility", label: "Fezabilitate" },
  { value: "design", label: "Proiectare" },
  { value: "authorization", label: "Autorizare" },
  { value: "procurement", label: "Achizitie" },
  { value: "execution", label: "Executie" },
  { value: "operation", label: "Operare" },
  { value: "active-issue", label: "Problema activa" },
];

export function DiscoveryConversation({
  context,
  nextQuestions,
  onPatch,
  onAnswerQuestion,
  onContinueWithAssumptions,
}: DiscoveryConversationProps) {
  const selectedDomains = new Set(context.domains ?? []);

  function toggleDomain(domainId: MedicalDomainId) {
    const current = new Set(context.domains ?? []);
    if (current.has(domainId)) current.delete(domainId);
    else current.add(domainId);
    onPatch({ domains: [...current] });
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-[0_12px_36px_rgba(0,87,184,0.055)] sm:p-6">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
          Context proiect
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
          Spune-ne ce incerci sa planifici.
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Poti raspunde partial. Workspace-ul continua cu ipoteze preliminare si marcheaza ce trebuie validat ulterior.
        </p>

        <label className="mt-5 grid gap-2" htmlFor="discovery-description">
          <span className="text-sm font-semibold text-slate-700">
            Descriere libera
          </span>
          <textarea
            className="min-h-36 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white"
            id="discovery-description"
            onChange={(event) => onPatch({ freeText: event.target.value })}
            placeholder="Exemplu: modernizare clinica existenta, camera RMN, laborator IVD, cabinet cardiologie, sala operatie, HVAC/electric neclar..."
            value={context.freeText ?? ""}
          />
        </label>
      </section>

      <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-[0_12px_36px_rgba(0,87,184,0.055)] sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
              Domenii posibile
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              Selecteaza ce pare relevant.
            </h2>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onPatch({ domains: [] })}
          >
            Nu stiu inca
          </Button>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {domainOptions.map((option) => (
            <button
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-semibold transition",
                selectedDomains.has(option.id)
                  ? "border-[#0057b8] bg-[#0057b8] text-white shadow-[0_10px_24px_rgba(0,87,184,0.14)]"
                  : "border-blue-100 bg-[#f7fbff] text-slate-700 hover:border-blue-200 hover:bg-white",
              )}
              key={option.id}
              type="button"
              onClick={() => toggleDomain(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-[0_12px_36px_rgba(0,87,184,0.055)] sm:p-6">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
          Stadiu si documentatie
        </p>
        <div className="mt-5 grid gap-5">
          <div>
            <p className="text-sm font-semibold text-slate-700">Stadiu proiect</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {stageOptions.map((option) => (
                <button
                  className={cn(
                    "rounded-lg border px-4 py-2 text-sm font-semibold transition",
                    context.projectStage === option.value
                      ? "border-[#0057b8] bg-blue-50 text-[#0057b8]"
                      : "border-slate-200 bg-white text-slate-600 hover:border-blue-200",
                  )}
                  key={option.value}
                  type="button"
                  onClick={() => onPatch({ projectStage: option.value })}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <ToggleRow
              checked={Boolean(context.existingBuilding)}
              label="Spatiu existent"
              onChange={(value) => onPatch({ existingBuilding: value })}
            />
            <ToggleRow
              checked={Boolean(context.modernization)}
              label="Modernizare"
              onChange={(value) => onPatch({ modernization: value })}
            />
            <ToggleRow
              checked={Boolean(context.plansAvailable)}
              label="Planuri / schite disponibile"
              onChange={(value) => onPatch({ plansAvailable: value })}
            />
            <ToggleRow
              checked={Boolean(context.equipmentSpecsAvailable)}
              label="Fise echipament disponibile"
              onChange={(value) => onPatch({ equipmentSpecsAvailable: value })}
            />
            <ToggleRow
              checked={Boolean(context.locationKnown)}
              label="Locatie cunoscuta"
              onChange={(value) => onPatch({ locationKnown: value })}
            />
            <ToggleRow
              checked={Boolean(context.surfaceKnown)}
              label="Suprafata / dimensiuni cunoscute"
              onChange={(value) => onPatch({ surfaceKnown: value })}
            />
            <ToggleRow
              checked={Boolean(context.budgetKnown)}
              label="Buget orientativ definit"
              onChange={(value) => onPatch({ budgetKnown: value })}
            />
            <ToggleRow
              checked={Boolean(context.timelineKnown)}
              label="Termen definit"
              onChange={(value) => onPatch({ timelineKnown: value })}
            />
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-[0_12px_36px_rgba(0,87,184,0.055)] sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
              Intrebari adaptive
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              Urmatoarele clarificari utile
            </h2>
          </div>
          <Button size="sm" variant="secondary" onClick={onContinueWithAssumptions}>
            Continua cu ipoteze preliminare
          </Button>
        </div>

        <div className="mt-5 grid gap-3">
          {nextQuestions.slice(0, 5).map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onAnswer={(answer) => onAnswerQuestion(question, answer)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function ToggleRow({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      className={cn(
        "flex min-h-12 items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm font-semibold transition",
        checked
          ? "border-blue-200 bg-blue-50 text-[#0057b8]"
          : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-white",
      )}
      type="button"
      onClick={() => onChange(!checked)}
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className={cn(
          "h-5 w-9 rounded-full p-0.5 transition",
          checked ? "bg-[#0057b8]" : "bg-slate-300",
        )}
      >
        <span
          className={cn(
            "block h-4 w-4 rounded-full bg-white transition",
            checked && "translate-x-4",
          )}
        />
      </span>
    </button>
  );
}

function QuestionCard({
  question,
  onAnswer,
}: {
  question: DiscoveryQuestion;
  onAnswer: (answer: string) => void;
}) {
  return (
    <div className="rounded-lg border border-blue-100 bg-[#f7fbff] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
        {question.stage}
      </p>
      <p className="mt-2 text-sm font-semibold leading-7 text-slate-900">
        {question.prompt}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {["Da / exista", "Nu", "Nu stiu inca"].map((answer) => (
          <button
            className="rounded-lg border border-blue-100 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:text-[#0057b8]"
            key={answer}
            type="button"
            onClick={() => onAnswer(answer)}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}
