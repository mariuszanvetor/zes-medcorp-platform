"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import {
  ServiceDiagnosticResult,
  type ServiceDiagnosticAnalysis,
  type ServiceUrgencyLevel,
} from "@/components/ai/ServiceDiagnosticResult";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  BUDGET_DISCLAIMER,
  createConfidenceEstimate,
  risk as createRisk,
  type BudgetEstimate,
  type TimelineEstimate,
} from "@/lib/ai-estimation";
import { trackToolComplete, trackToolStart } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const equipmentTypes = [
  "CT",
  "RMN",
  "RX",
  "Ecograf",
  "Monitorizare pacient",
  "Echipament laborator / IVD",
  "Alt echipament",
] as const;
const observedProblems = [
  "Nu pornește",
  "Eroare sistem",
  "Imagine slabă / artefacte",
  "Zgomot neobișnuit",
  "Supraîncălzire",
  "Funcționare intermitentă",
  "Necesită mentenanță preventivă",
  "Altă problemă",
] as const;
const operationalImpacts = [
  "Echipament oprit complet",
  "Funcționează parțial",
  "Funcționează cu probleme",
  "Preventiv / verificare",
] as const;
const urgencyOptions = ["Imediat", "24–48 ore", "Săptămâna aceasta", "Fără urgență"] as const;
const serviceContractOptions = ["Da", "Nu", "Nu știu"] as const;

type DiagnosticState = {
  equipmentType: (typeof equipmentTypes)[number];
  observedProblem: (typeof observedProblems)[number];
  operationalImpact: (typeof operationalImpacts)[number];
  urgency: (typeof urgencyOptions)[number];
  serviceContract: (typeof serviceContractOptions)[number];
  description: string;
};

const initialState: DiagnosticState = {
  equipmentType: "CT",
  observedProblem: "Eroare sistem",
  operationalImpact: "Funcționează cu probleme",
  urgency: "Săptămâna aceasta",
  serviceContract: "Nu știu",
  description: "",
};

export function ServiceDiagnosticAssistant() {
  const [form, setForm] = useState<DiagnosticState>(initialState);
  const [result, setResult] = useState<ServiceDiagnosticAnalysis | null>(null);

  const completion = useMemo(() => {
    const filled = Object.entries(form).filter(([, value]) => value.trim()).length;
    return Math.round((filled / Object.keys(form).length) * 100);
  }, [form]);

  function updateField<K extends keyof DiagnosticState>(
    field: K,
    value: DiagnosticState[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function runDiagnostic() {
    trackToolStart("service-diagnostic", {
      sourcePage: "/service-diagnostic",
      projectType: form.equipmentType,
      urgency: form.urgency,
    });

    const analysis = generateServiceDiagnostic(form);
    setResult(analysis);
    trackToolComplete("service-diagnostic", {
      sourcePage: "/service-diagnostic",
      projectType: form.equipmentType,
      urgency: form.urgency,
      estimatedBudgetRange: analysis.budget.totalRange,
      complexity: `Scor urgenta ${analysis.urgencyScore}/100`,
      riskLevel: analysis.urgencyLevel,
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runDiagnostic();
  }

  return (
    <div className="grid gap-10">
      <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <Card className="sticky top-24 border-blue-100 bg-white" padding="lg">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
            Technical service intake
          </p>
          <h2 className="mt-5 text-3xl font-semibold leading-tight text-slate-950">
            Triage service pentru echipamente medicale
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            Completează datele principale. Rezultatul oferă
            orientare inițială privind urgența, impactul și pașii recomandați.
          </p>
          <div className="mt-8 h-2 rounded-full bg-slate-100">
            <div
              className="h-2 rounded-full bg-[#0057b8] transition-all"
              style={{ width: `${completion}%` }}
            />
          </div>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
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
            label="Problemă observată"
            options={observedProblems}
            value={form.observedProblem}
            onChange={(value) => updateField("observedProblem", value)}
          />
          <OptionGroup
            label="Impact operațional"
            options={operationalImpacts}
            value={form.operationalImpact}
            onChange={(value) => updateField("operationalImpact", value)}
          />
          <OptionGroup
            label="Urgență"
            options={urgencyOptions}
            value={form.urgency}
            onChange={(value) => updateField("urgency", value)}
          />
          <OptionGroup
            label="Contract de service existent?"
            options={serviceContractOptions}
            value={form.serviceContract}
            onChange={(value) => updateField("serviceContract", value)}
          />

          <Card className="border-blue-100 bg-white" padding="lg">
            <label className="grid gap-3" htmlFor="service-description">
              <span className="text-sm font-bold uppercase tracking-[0.14em] text-slate-700">
                Descriere problemă
              </span>
              <textarea
                className="min-h-36 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white"
                id="service-description"
                name="service-description"
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="Ex: eroare la pornire, artefacte în imagine, încălzire anormală, cod de eroare sau frecvența problemei."
                value={form.description}
              />
            </label>
          </Card>

          <Button fullWidth onClick={runDiagnostic} size="lg" type="button">
            Generează orientarea service
          </Button>
        </form>
      </div>

      {result && <ServiceDiagnosticResult result={result} />}
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
    <Card className="border-blue-100 bg-white" padding="lg">
      <fieldset>
        <legend className="text-sm font-bold uppercase tracking-[0.14em] text-slate-700">
          {label}
        </legend>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {options.map((option) => {
            const selected = option === value;

            return (
              <label
                className={cn(
                  "cursor-pointer rounded-2xl border px-4 py-3 text-sm font-semibold leading-6 transition",
                  selected
                    ? "border-blue-300 bg-blue-50 text-blue-900 shadow-[0_12px_32px_rgba(0,87,184,0.08)]"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200 hover:bg-white",
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

function generateServiceDiagnostic(form: DiagnosticState): ServiceDiagnosticAnalysis {
  let score = 12;
  const recommendedSteps = new Set<string>([
    "Documentați modelul echipamentului, seria și orice cod de eroare afișat.",
    "Nu continuați operarea dacă apar miros, supraîncălzire sau comportament instabil.",
  ]);
  const relevantServices = new Set<string>([
    "Service aparatură medicală",
    "Evaluare tehnică ZES",
  ]);
  const possibleRootCauses = new Set<string>([
    "Alimentare, conexiuni, mediu de operare sau eroare software.",
  ]);
  const assumptions = new Set<string>([
    "Triererea pornește doar de la simptomele selectate și trebuie validată tehnic.",
    "Nu reprezintă diagnostic service final fără verificare fizică, coduri de eroare și istoric tehnic.",
  ]);
  const missingData = new Set<string>([
    "Model echipament, serie, an instalare și istoric service",
    "Coduri de eroare, poze / exemple imagine și condiții de apariție",
  ]);
  const nextSteps = new Set<string>([
    "Pregătește codurile de eroare, poze relevante și istoricul mentenanței.",
    "Solicită evaluare ZES dacă problema afectează fluxul clinic sau calitatea rezultatului.",
  ]);
  const risks = [
    createRisk(
      "Documentație service",
      "Medium",
      "Lipsa codurilor de eroare și a istoricului tehnic reduce precizia trierii.",
      "Colectați loguri, imagini, serie echipament și ultimele intervenții.",
    ),
  ];

  if (form.operationalImpact === "Echipament oprit complet") {
    score += 28;
    recommendedSteps.add("Marcați echipamentul ca indisponibil până la evaluarea tehnică.");
    risks.push(
      createRisk(
        "Downtime",
        "Critical",
        "Echipamentul oprit complet poate bloca programări, diagnostic sau fluxul de laborator.",
        "Prioritizați evaluarea service și comunicați impactul operațional către echipa clinică.",
      ),
    );
  } else if (form.operationalImpact === "Funcționează parțial") {
    score += 20;
    risks.push(
      createRisk(
        "Funcționare parțială",
        "High",
        "Capacitatea redusă poate evolua spre oprire completă sau rezultate instabile.",
        "Programați intervenție înainte de creșterea volumului operațional.",
      ),
    );
  } else if (form.operationalImpact === "Funcționează cu probleme") {
    score += 14;
  }

  if (form.urgency === "Imediat") {
    score += 24;
    nextSteps.add("Solicită triere prioritară și pregătește accesul la echipament.");
  } else if (form.urgency === "24–48 ore") {
    score += 18;
  } else if (form.urgency === "Săptămâna aceasta") {
    score += 8;
  }

  if (form.observedProblem === "Nu pornește" || form.observedProblem === "Eroare sistem") {
    score += 18;
    possibleRootCauses.add("Defecțiune de alimentare, placă electronică, software sau modul intern.");
    risks.push(
      createRisk(
        "Eroare sistem / pornire",
        "High",
        "Problemele de pornire sau erorile sistem pot indica defecțiune electronică, software sau modul critic.",
        "Evitați resetări repetate fără instrucțiuni service și pregătiți codurile de eroare.",
      ),
    );
  }

  if (form.observedProblem === "Imagine slabă / artefacte") {
    score += 14;
    possibleRootCauses.add("Calibrare, senzor, detector, bobină, transductor sau parametri de achiziție.");
    risks.push(
      createRisk(
        "Calitate imagine / rezultat",
        "High",
        "Artefactele sau imaginea slabă pot afecta calitatea diagnosticului sau validitatea rezultatului.",
        "Pregătiți exemple, protocoale afectate și condițiile în care apare problema.",
      ),
    );
  }

  if (
    form.observedProblem === "Zgomot neobișnuit" ||
    form.observedProblem === "Supraîncălzire"
  ) {
    score += 20;
    possibleRootCauses.add("Ventilație, răcire, componentă mecanică, motor sau consumabil uzat.");
    recommendedSteps.add("Opriți utilizarea dacă zgomotul sau temperatura cresc în timpul operării.");
    risks.push(
      createRisk(
        "Supraîncălzire / zgomot",
        "Critical",
        "Supraîncălzirea sau zgomotele neobișnuite pot indica risc mecanic, electric sau de răcire.",
        "Limitați operarea și solicitați evaluare înainte de utilizare extinsă.",
      ),
    );
  }

  if (form.observedProblem === "Funcționare intermitentă") {
    score += 14;
    possibleRootCauses.add("Conexiuni instabile, alimentare, software, senzori sau condiții de mediu.");
    risks.push(
      createRisk(
        "Intermitență",
        "Medium",
        "Problemele intermitente pot fi dificil de replicat și pot afecta predictibilitatea operațională.",
        "Notați momentul, durata, condițiile și frecvența apariției.",
      ),
    );
  }

  if (form.observedProblem === "Necesită mentenanță preventivă") {
    score = Math.max(10, score - 12);
    relevantServices.add("Mentenanță preventivă aparatură medicală");
    risks.push(
      createRisk(
        "Mentenanță preventivă",
        "Low",
        "Cazul pare orientat spre prevenție, nu spre intervenție critică.",
        "Planificați fereastra de mentenanță înainte de vârfuri operaționale.",
      ),
    );
  }

  if (
    (form.equipmentType === "CT" ||
      form.equipmentType === "RMN" ||
      form.equipmentType === "RX") &&
    (form.observedProblem === "Imagine slabă / artefacte" ||
      form.observedProblem === "Eroare sistem")
  ) {
    score += 14;
    relevantServices.add("Service imagistică medicală");
    recommendedSteps.add("Pregătiți exemple de imagine, protocoale afectate și coduri de eroare.");
    missingData.add("Protocoale afectate, exemple imagine și parametri de achiziție");
  }

  if (
    (form.equipmentType === "CT" || form.equipmentType === "RMN") &&
    form.operationalImpact === "Echipament oprit complet"
  ) {
    score += 16;
    recommendedSteps.add("Tratați indisponibilitatea CT/RMN ca risc operațional major pentru programări.");
    risks.push(
      createRisk(
        "Imagistică critică",
        "Critical",
        "Indisponibilitatea CT/RMN poate produce downtime operațional major și reprogramări.",
        "Escaladați cazul și pregătiți acces rapid pentru evaluare.",
      ),
    );
  }

  if (form.equipmentType === "Echipament laborator / IVD") {
    relevantServices.add("Service IVD / laborator");
    recommendedSteps.add("Verificați statusul calibrării, controalele interne și consumabilele utilizate.");
    possibleRootCauses.add("Calibrare, consumabile, reactivi, senzori, temperatură sau validare QC.");
    missingData.add("Status calibrare, controale QC, loturi consumabile și condiții de temperatură");
    risks.push(
      createRisk(
        "IVD / laborator",
        "High",
        "Echipamentele IVD pot necesita calibrare, QC și validare înainte de reluarea fluxului.",
        "Verificați controlul intern și consumabilele înainte de operare extinsă.",
      ),
    );
  }

  if (form.equipmentType === "Ecograf") {
    relevantServices.add("Service ecografie");
    possibleRootCauses.add("Transductor, cablu, setări imagine, software sau modul de afișare.");
  }

  if (form.serviceContract === "Nu" || form.serviceContract === "Nu știu") {
    score += 8;
    relevantServices.add("Evaluare contract service / mentenanță");
    recommendedSteps.add("Solicitați verificarea istoricului de service și a condițiilor de mentenanță.");
    missingData.add("Contract service, SLA, istoricul intervențiilor și disponibilitatea pieselor");
  }

  if (form.description.trim().length > 120) {
    recommendedSteps.add("Descrierea este suficientă pentru o primă triere tehnică structurată.");
  } else {
    recommendedSteps.add("Completați coduri de eroare, momentul apariției și frecvența problemei.");
    missingData.add("Descriere detaliată: moment apariție, frecvență, coduri, simptome și modificări recente");
  }

  const urgencyScore = Math.min(score, 100);
  const urgencyLevel = getUrgencyLevel(urgencyScore);
  const budget = createServiceBudget(urgencyLevel, form);
  const timeline = createServiceTimeline(urgencyLevel, form);
  const confidence = createConfidenceEstimate({
    answered: Object.values(form).filter((value) => value.trim()).length,
    total: Object.keys(form).length,
    unknowns: form.serviceContract === "Nu știu" ? 1 : 0,
    descriptionLength: form.description.trim().length,
    score: urgencyScore,
  });

  return {
    urgencyLevel,
    urgencyScore,
    operationalRisk: getOperationalRisk(urgencyLevel, form),
    initialRecommendation: getInitialRecommendation(urgencyLevel, form),
    recommendedSteps: Array.from(recommendedSteps),
    relevantServices: Array.from(relevantServices),
    risks,
    budget,
    timeline,
    interventionTiming: getInterventionTiming(urgencyLevel, form),
    operationalImpact: getOperationalImpact(form),
    downtimeRisk: getDowntimeRisk(urgencyLevel, form),
    preventiveRecommendation: getPreventiveRecommendation(form),
    continuityNote: getContinuityNote(form),
    possibleRootCauses: Array.from(possibleRootCauses),
    assumptions: Array.from(assumptions),
    missingData: Array.from(missingData),
    confidence,
    nextSteps: Array.from(nextSteps),
  };
}

function createServiceBudget(
  urgencyLevel: ServiceUrgencyLevel,
  form: DiagnosticState,
): BudgetEstimate {
  const highValueImaging =
    form.equipmentType === "CT" || form.equipmentType === "RMN" || form.equipmentType === "RX";
  const band =
    urgencyLevel === "Critic"
      ? "Premium"
      : urgencyLevel === "Ridicat"
        ? "Medium"
        : "Low";
  const totalRange =
    urgencyLevel === "Critic"
      ? "€800–€12k+"
      : urgencyLevel === "Ridicat"
        ? "€400–€4k+"
        : "€150–€1.5k+";

  return {
    band,
    totalRange,
    disclaimer: BUDGET_DISCLAIMER,
    phaseBreakdown: [
      {
        label: "Triage tehnic / evaluare inițială",
        range: urgencyLevel === "Critic" ? "prioritar" : "programat",
        note: "Depinde de disponibilitatea echipamentului, informații, acces și contract service.",
      },
      {
        label: "Diagnostic și intervenție",
        range: highValueImaging ? "€500–€6k+" : "€150–€2k+",
        note: "Nu include piese speciale, transport complex sau intervenții de producător.",
      },
      {
        label: "Piese / calibrare / validare",
        range: form.equipmentType === "Echipament laborator / IVD" ? "variabil QC / consumabile" : "variabil piese",
        note: "Se poate estima corect doar după identificarea modelului și cauzei probabile.",
      },
    ],
    serviceBreakdown: [
      {
        label: "Service aparatură medicală",
        range: urgencyLevel === "Critic" ? "Ridicat" : "Redus–Mediu",
        note: "Triage, verificare, intervenție și recomandare de continuitate operațională.",
      },
      {
        label: "Mentenanță preventivă",
        range: form.serviceContract === "Nu" ? "recomandat recurent" : "în contract / de verificat",
        note: "Reduce intervențiile reactive și riscul de downtime.",
      },
      {
        label: "Service specializat pe categorie",
        range: highValueImaging ? "Ridicat pentru imagistică" : "Mediu pentru echipamente generale / IVD",
        note: "CT/RMN/RX, ecografie sau IVD pot necesita competențe, piese și validări diferite.",
      },
    ],
  };
}

function createServiceTimeline(
  urgencyLevel: ServiceUrgencyLevel,
  form: DiagnosticState,
): TimelineEstimate {
  const isStopped = form.operationalImpact === "Echipament oprit complet";
  const hasCriticalSymptom =
    form.observedProblem === "Supraîncălzire" ||
    form.observedProblem === "Nu pornește" ||
    form.observedProblem === "Eroare sistem";

  return {
    estimatedDuration:
      urgencyLevel === "Critic"
        ? "same day–48 ore pentru triere, variabil pentru piese"
        : urgencyLevel === "Ridicat"
          ? "24–72 ore pentru evaluare inițială"
          : "3–10 zile pentru verificare programată",
    phases: [
      {
        phase: "Intake service",
        duration: urgencyLevel === "Critic" ? "0–4 ore" : "1–2 zile",
        dependency: "Model, serie, coduri eroare, impact operațional și acces la echipament.",
      },
      {
        phase: "Triage tehnic",
        duration: urgencyLevel === "Critic" ? "same day" : "1–3 zile",
        dependency: "Simptome, istoricul intervențiilor, contract service și disponibilitate tehnician.",
      },
      {
        phase: "Intervenție / verificare",
        duration: hasCriticalSymptom ? "1–5 zile+" : "programabil",
        dependency: "Disponibilitate piese, producător, calibrare și condiții de operare.",
      },
      {
        phase: "Validare și prevenție",
        duration: "1–2 zile",
        dependency: "Test funcțional, QC / calibrare unde este cazul și recomandare mentenanță.",
      },
    ],
    criticalDependencies: [
      "Coduri de eroare și loguri disponibile.",
      "Acces la echipament și persoană tehnică de contact.",
      form.serviceContract === "Nu" ? "Clarificare contract service / SLA." : "",
      form.equipmentType === "Echipament laborator / IVD" ? "Consumabile, calibrare și QC." : "",
    ].filter(Boolean),
    riskFactors: [
      isStopped ? "Echipament oprit complet: downtime operațional ridicat." : "",
      hasCriticalSymptom ? "Simptom critic: posibilă nevoie de piese sau oprire temporară." : "",
      form.serviceContract !== "Da" ? "Fără contract clar: risc de timp suplimentar pentru evaluare și piese." : "",
    ].filter(Boolean),
  };
}

function getUrgencyLevel(score: number): ServiceUrgencyLevel {
  if (score >= 82) {
    return "Critic";
  }

  if (score >= 58) {
    return "Ridicat";
  }

  if (score >= 34) {
    return "Mediu";
  }

  return "Redus";
}

function getOperationalRisk(
  urgencyLevel: ServiceUrgencyLevel,
  form: DiagnosticState,
) {
  if (urgencyLevel === "Critic") {
    return "Risc operațional critic: echipamentul poate bloca fluxul clinic, programările sau capacitatea de diagnostic.";
  }

  if (form.operationalImpact === "Funcționează parțial") {
    return "Risc operațional ridicat: capacitatea este redusă și problema poate evolua spre oprire completă.";
  }

  if (form.observedProblem === "Necesită mentenanță preventivă") {
    return "Risc operațional redus: cazul pare potrivit pentru planificare preventivă.";
  }

  return "Risc operațional moderat: echipamentul funcționează, dar necesită verificare pentru continuitate.";
}

function getInitialRecommendation(
  urgencyLevel: ServiceUrgencyLevel,
  form: DiagnosticState,
) {
  if (urgencyLevel === "Critic") {
    return `Recomandare inițială: solicitați intervenție service rapidă pentru ${form.equipmentType}, cu prioritizare operațională.`;
  }

  if (urgencyLevel === "Ridicat") {
    return `Recomandare inițială: programați evaluare tehnică pentru ${form.equipmentType} în cel mai scurt timp.`;
  }

  if (form.observedProblem === "Necesită mentenanță preventivă") {
    return "Recomandare inițială: planificați mentenanța preventivă și actualizați istoricul tehnic al echipamentului.";
  }

  return "Recomandare inițială: pregătiți informațiile tehnice și solicitați o evaluare service ZES.";
}

function getInterventionTiming(
  urgencyLevel: ServiceUrgencyLevel,
  form: DiagnosticState,
) {
  if (form.operationalImpact === "Echipament oprit complet" && form.urgency === "Imediat") {
    return "Intervenție recomandată imediat, cu tratament prioritar.";
  }

  if (urgencyLevel === "Critic") {
    return "Intervenție recomandată în regim urgent, ideal în aceeași zi.";
  }

  if (urgencyLevel === "Ridicat") {
    return "Evaluare recomandată în 24–48 ore.";
  }

  if (urgencyLevel === "Mediu") {
    return "Evaluare recomandată în cursul săptămânii.";
  }

  return "Planificare preventivă sau verificare programată.";
}

function getOperationalImpact(form: DiagnosticState) {
  if (form.operationalImpact === "Echipament oprit complet") {
    return "Impact estimativ: indisponibilitate completă a echipamentului.";
  }

  if (form.operationalImpact === "Funcționează parțial") {
    return "Impact estimativ: capacitate redusă, risc de întreruperi și reprogramări.";
  }

  if (form.operationalImpact === "Funcționează cu probleme") {
    return "Impact estimativ: funcționare degradată, cu risc pentru calitatea rezultatului sau uptime.";
  }

  return "Impact estimativ: redus, orientat spre prevenție și continuitate.";
}

function getDowntimeRisk(
  urgencyLevel: ServiceUrgencyLevel,
  form: DiagnosticState,
) {
  if (
    urgencyLevel === "Critic" ||
    form.operationalImpact === "Echipament oprit complet"
  ) {
    return "Estimated downtime risk: ridicat, mai ales pentru CT/RMN sau echipamente cu programări active.";
  }

  if (urgencyLevel === "Ridicat") {
    return "Estimated downtime risk: mediu-ridicat dacă problema nu este verificată rapid.";
  }

  return "Estimated downtime risk: controlabil prin verificare și mentenanță planificată.";
}

function getPreventiveRecommendation(form: DiagnosticState) {
  if (form.serviceContract === "Nu") {
    return "Recomandare preventivă: evaluați un plan de mentenanță pentru reducerea intervențiilor reactive.";
  }

  if (form.equipmentType === "Echipament laborator / IVD") {
    return "Recomandare preventivă: verificați calibrarea, controalele QC și consumabilele înainte de reluarea fluxului.";
  }

  return "Recomandare preventivă: actualizați istoricul service și următoarea fereastră de mentenanță.";
}

function getContinuityNote(form: DiagnosticState) {
  if (form.equipmentType === "CT" || form.equipmentType === "RMN") {
    return "Continuitate operațională: verificați impactul asupra programărilor și alternativele temporare de diagnostic.";
  }

  if (form.equipmentType === "Echipament laborator / IVD") {
    return "Continuitate operațională: validați fluxul de probe, calibrările și rezultatele înainte de operare extinsă.";
  }

  return "Continuitate operațională: limitați utilizarea dacă problema se repetă sau afectează calitatea rezultatului.";
}
