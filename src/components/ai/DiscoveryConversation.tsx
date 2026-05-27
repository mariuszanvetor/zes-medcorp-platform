"use client";

import type {
  DiscoveryQuestion,
  IntelligenceInput,
  MedicalDomainId,
  ProjectStage,
} from "@/lib/ai-intelligence/types";
import type { AiMagicAnalysis } from "@/lib/ai-magic-layer";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type DiscoveryConversationProps = {
  aiMagicAnalysis: AiMagicAnalysis | null;
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
  aiMagicAnalysis,
  context,
  nextQuestions,
  onPatch,
  onAnswerQuestion,
  onContinueWithAssumptions,
}: DiscoveryConversationProps) {
  const selectedDomains = new Set(context.domains ?? []);
  const blockers = aiMagicAnalysis?.likelyMissingItems ?? [];
  const scenarioConcerns = aiMagicAnalysis?.projectConcerns ?? [];
  const concernQuestions = aiMagicAnalysis?.guidedQuestions ?? [];
  const scenarioTransitions = buildScenarioTransitions(aiMagicAnalysis);

  function toggleDomain(domainId: MedicalDomainId) {
    const current = new Set(context.domains ?? []);
    if (current.has(domainId)) current.delete(domainId);
    else current.add(domainId);
    onPatch({ domains: [...current] });
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-[0_12px_36px_rgba(0,87,184,0.055)] sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[0.52fr_0.48fr]">
          <div className="rounded-lg border border-blue-100 bg-[#f7fbff] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
              ZES Copilot
            </p>
            <p className="mt-2 text-sm font-semibold leading-7 text-slate-950">
              {aiMagicAnalysis
                ? aiMagicAnalysis.assistantResponse
                : "ZES analizeaza contextul proiectului si te ghideaza pas cu pas pentru clarificarea riscurilor, dependentelor si datelor necesare unei discutii tehnice productive."}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-lg border border-blue-100 bg-white px-3 py-1 text-xs font-bold text-slate-700">
                ZES AI-assisted demo
              </span>
              <span className="rounded-lg border border-blue-100 bg-white px-3 py-1 text-xs font-bold text-slate-700">
                ZES guided planning mode
              </span>
              <span className="rounded-lg border border-blue-100 bg-white px-3 py-1 text-xs font-bold text-slate-700">
                deterministic mock intelligence
              </span>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Context proiect
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <ContextPill label="Stadiu" value={context.projectStage ?? "idea"} />
              <ContextPill label="Domenii" value={String(selectedDomains.size)} />
              <ContextPill
                label="Planuri"
                value={context.plansAvailable ? "Da" : "Nu"}
              />
              <ContextPill
                label="Specificatii"
                value={context.equipmentSpecsAvailable ? "Da" : "Nu"}
              />
            </div>
          </div>
        </div>
      </section>

      {aiMagicAnalysis && (
        <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-[0_12px_36px_rgba(0,87,184,0.055)] sm:p-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
            Scenariu activ: {aiMagicAnalysis.scenario.label}
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <ScenarioList
              items={scenarioConcerns}
              title="Concern-uri specifice"
            />
            <ScenarioList
              items={blockers}
              title="Blocaje probabile"
            />
            <ScenarioList
              items={concernQuestions}
              title="Intrebari recomandate"
            />
            <ScenarioList
              items={scenarioTransitions}
              title="Tranzitii recomandate"
            />
            <div className="rounded-lg border border-slate-200 bg-[#f7fbff] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                Oportunitate comerciala
              </p>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-950">
                {aiMagicAnalysis.commercialOpportunityType}
              </p>
              <p className="mt-2 text-xs leading-6 text-slate-600">
                Urgenta probabila: {aiMagicAnalysis.likelyUrgency}. Maturitate:
                {" "}
                {aiMagicAnalysis.projectMaturity}. Complexitate:
                {" "}
                {aiMagicAnalysis.infrastructureComplexity}.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {aiMagicAnalysis.suggestedServices.slice(0, 4).map((service) => (
                  <span
                    className="rounded-lg border border-blue-100 bg-white px-3 py-1 text-xs font-bold text-[#0057b8]"
                    key={service.href}
                  >
                    {service.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm leading-7 text-slate-800">
            Pe baza profilului infrastructurii, ZES recomanda validarea timpurie a utilitatilor critice (HVAC, electric, shielding/radioprotectie) inaintea deciziilor finale de implementare.
          </p>
        </section>
      )}

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
              Flux conversatie
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              Urmatoarele intrebari utile, in ordinea prioritatii.
            </h2>
          </div>
          <Button size="sm" variant="secondary" onClick={onContinueWithAssumptions}>
            Continua cu ipoteze preliminare
          </Button>
        </div>

        <div className="mt-5 grid gap-3">
          {nextQuestions.slice(0, 6).map((question, index) => (
            <QuestionCard
              key={question.id}
              order={index + 1}
              question={question}
              onAnswer={(answer) => onAnswerQuestion(question, answer)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function ContextPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function ScenarioList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-[#f7fbff] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
        {title}
      </p>
      <ul className="mt-3 grid gap-2">
        {items.slice(0, 4).map((item) => (
          <li className="flex gap-2 text-sm leading-6 text-slate-700" key={item}>
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function buildScenarioTransitions(aiMagicAnalysis: AiMagicAnalysis | null) {
  if (!aiMagicAnalysis) {
    return [
      "Clarificare intentie si obiective tehnico-comerciale",
      "Validare ipoteze de infrastructura cu date partiale",
      "Definire urmator pas: Proposal Builder, Intake sau review tehnic",
    ];
  }

  if (aiMagicAnalysis.scenario.id === "ct-clinic") {
    return [
      "Revizuirea radioprotectiei este recomandata inainte de implementare.",
      "ZES recomanda validarea HVAC si electrica inainte de configuratia finala.",
      "Pregatiti datele CNCAN pentru etapizarea tehnica si comerciala.",
    ];
  }

  if (aiMagicAnalysis.scenario.id === "mri-room") {
    return [
      "ZES recomanda validarea RF shielding si traseului de instalare RMN.",
      "Planificati evaluarea HVAC/electric pe baza cerintelor furnizorului.",
      "Documentati ipotezele de siguranta si acces inainte de ofertare.",
    ];
  }

  if (aiMagicAnalysis.scenario.id === "imaging-expansion") {
    return [
      "Proiectul pare potrivit pentru implementare etapizata.",
      "Separati pachetele tehnice de impactul operational asupra clinicii.",
      "Corelati bugetul orientativ cu fazele de integrare.",
    ];
  }

  if (aiMagicAnalysis.scenario.id === "radiology-modernization") {
    return [
      "Stabiliti prioritatile de modernizare in functie de downtime acceptat.",
      "Validati compatibilitatea noilor echipamente cu infrastructura existenta.",
      "Definiti secventierea pentru continuitate operationala.",
    ];
  }

  return [
    "Prioritizati urgenta si impactul operational asupra activitatii curente.",
    "Clarificati acoperirea contractuala pentru service si mentenanta.",
    "Definiti urmatorul pas comercial: triere rapida sau evaluare extinsa.",
  ];
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
  order,
  question,
  onAnswer,
}: {
  order: number;
  question: DiscoveryQuestion;
  onAnswer: (answer: string) => void;
}) {
  return (
    <div className="rounded-lg border border-blue-100 bg-[#f7fbff] p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
          {question.stage}
        </p>
        <span className="rounded-lg border border-blue-100 bg-white px-2 py-1 text-[11px] font-bold text-[#0057b8]">
          Pas {order}
        </span>
      </div>
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
