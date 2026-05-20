"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import { AdvisorProgress } from "@/components/ai/AdvisorProgress";
import {
  ProjectAdvisorResult,
  type ProjectAdvisorAnalysis,
} from "@/components/ai/ProjectAdvisorResult";
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
  "Spital / secție medicală",
  "Modernizare spațiu existent",
] as const;

const surfaces = ["sub 100 mp", "100–300 mp", "300–700 mp", "peste 700 mp"] as const;
const radiologyOptions = ["Nu", "CT", "RMN", "RX", "Nu știu încă"] as const;
const shieldingOptions = [
  "Nu știu",
  "Ecranare RF",
  "Protecție radiologică / plumb",
  "Ambele",
  "Nu",
] as const;
const equipmentOptions = [
  "Nu",
  "Da, integrare",
  "Da, achiziție",
  "Da, service / mentenanță",
  "Nu știu încă",
] as const;
const urgencyOptions = ["Exploratoriu", "1–3 luni", "3–6 luni", "imediat"] as const;

type ProjectType = (typeof projectTypes)[number];
type Surface = (typeof surfaces)[number];
type Radiology = (typeof radiologyOptions)[number];
type Shielding = (typeof shieldingOptions)[number];
type Equipment = (typeof equipmentOptions)[number];
type Urgency = (typeof urgencyOptions)[number];

type ProjectAdvisorState = {
  projectType: ProjectType;
  surface: Surface;
  radiology: Radiology;
  shielding: Shielding;
  equipment: Equipment;
  urgency: Urgency;
  description: string;
};

const initialState: ProjectAdvisorState = {
  projectType: "Clinică medicală",
  surface: "100–300 mp",
  radiology: "Nu știu încă",
  shielding: "Nu știu",
  equipment: "Nu știu încă",
  urgency: "Exploratoriu",
  description: "",
};

export function ProjectAdvisorForm() {
  const [form, setForm] = useState<ProjectAdvisorState>(initialState);
  const [result, setResult] = useState<ProjectAdvisorAnalysis | null>(null);
  const [leadCaptured, setLeadCaptured] = useState(false);

  const completion = useMemo(() => {
    const filled = Object.entries(form).filter(([, value]) => value.trim()).length;
    return Math.round((filled / Object.keys(form).length) * 100);
  }, [form]);

  function updateField<K extends keyof ProjectAdvisorState>(
    field: K,
    value: ProjectAdvisorState[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    setLeadCaptured(false);
  }

  function analyzeProject() {
    trackToolStart("ai-project-advisor", {
      sourcePage: "/ai-project-advisor",
      projectType: form.projectType,
      urgency: form.urgency,
    });

    const analysis = generateAnalysis(form);
    setResult(analysis);
    setLeadCaptured(false);
    trackToolComplete("ai-project-advisor", {
      sourcePage: "/ai-project-advisor",
      projectType: form.projectType,
      urgency: form.urgency,
      estimatedBudgetRange: analysis.budget.totalRange,
      complexity: analysis.complexity,
      riskLevel: analysis.risks[0]?.level,
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    analyzeProject();
  }

  return (
    <div className="grid gap-8">
      <AdvisorProgress hasResult={Boolean(result)} leadCaptured={leadCaptured} />

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Card className="sticky top-24" variant="glass">
          <p className="text-sm font-semibold text-cyan-100">
            Input tehnic proiect
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Completează datele inițiale
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Sistemul estimează complexitatea, serviciile ZES relevante și
            riscurile tehnice probabile. Nu trimitem date și nu apelăm niciun
            API AI în această versiune.
          </p>
          <div className="mt-6 h-2 rounded-full bg-white/10">
            <div
              className="h-2 rounded-full bg-cyan-300 transition-all"
              style={{ width: `${completion}%` }}
            />
          </div>
          <p className="mt-3 text-xs font-semibold text-slate-400">
            Completare formular: {completion}%
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
            label="Suprafață aproximativă"
            options={surfaces}
            value={form.surface}
            onChange={(value) => updateField("surface", value)}
          />
          <OptionGroup
            label="Include radiologie?"
            options={radiologyOptions}
            value={form.radiology}
            onChange={(value) => updateField("radiology", value)}
          />
          <OptionGroup
            label="Ai nevoie de ecranare?"
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
            label="Urgență"
            options={urgencyOptions}
            value={form.urgency}
            onChange={(value) => updateField("urgency", value)}
          />

          <Card variant="glass">
            <label className="grid gap-3" htmlFor="project-description">
              <span className="text-sm font-semibold text-white">
                Descriere proiect
              </span>
              <textarea
                className="min-h-36 rounded-lg border border-white/10 bg-slate-950/55 px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:bg-slate-950/70"
                id="project-description"
                name="project-description"
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="Ex: clinică de diagnostic cu zonă de imagistică, spațiu existent, nevoie de integrare aparatură și planificare autorizări."
                value={form.description}
              />
            </label>
          </Card>

          <Button fullWidth onClick={analyzeProject} size="lg" type="button">
            Generează analiza tehnică simulată
          </Button>
        </form>
      </div>

      {result && (
        <ProjectAdvisorResult
          onLeadCaptured={() => setLeadCaptured(true)}
          result={result}
        />
      )}
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

function generateAnalysis(form: ProjectAdvisorState): ProjectAdvisorAnalysis {
  let score = 18;
  const hasRmn = form.radiology === "RMN";
  const hasCtRx = form.radiology === "CT" || form.radiology === "RX";
  const hasRadiology =
    hasRmn || hasCtRx || form.projectType === "Radiologie" || form.radiology === "Nu știu încă";
  const hasLab = form.projectType === "Laborator";
  const hasRfShielding = hasRmn || form.shielding === "Ecranare RF" || form.shielding === "Ambele";
  const hasLeadShielding =
    hasCtRx ||
    form.shielding === "Protecție radiologică / plumb" ||
    form.shielding === "Ambele";
  const hasEquipment = form.equipment !== "Nu";
  const hasService = form.equipment === "Da, service / mentenanță";
  const isLarge = form.surface === "300–700 mp" || form.surface === "peste 700 mp";
  const isExistingBuilding = form.projectType === "Modernizare spațiu existent";
  const isUrgent = form.urgency === "1–3 luni" || form.urgency === "imediat";
  const unknownCount = [
    form.radiology === "Nu știu încă",
    form.shielding === "Nu știu",
    form.equipment === "Nu știu încă",
  ].filter(Boolean).length;

  const recommendedServices = new Set<string>([
    "Consultanță tehnică pentru proiecte medicale",
  ]);
  const risks = [
    createRisk(
      "DSP / fluxuri medicale",
      "Medium",
      "Fluxurile, destinațiile spațiilor și finisajele pot modifica layout-ul și calendarul.",
      "Validare DSP și temă funcțională înainte de proiectare detaliată.",
    ),
  ];
  const checklist = new Set<string>([
    "Plan funcțional preliminar al spațiului",
    "Lista funcțiunilor medicale și a zonelor tehnice",
  ]);
  const assumptions = new Set<string>([
    "Estimarea pornește de la răspunsurile selectate, fără releveu, planuri tehnice sau oferte de echipamente.",
    "Bugetele sunt benzi orientative pentru calibrarea discuției, nu prețuri ferme.",
  ]);
  const missingData = new Set<string>([
    "Planuri / releveu și fotografii ale spațiului",
    "Lista echipamentelor avute în vedere și cerințele furnizorilor",
  ]);
  const nextSteps = new Set<string>([
    "Solicită o evaluare tehnică inițială ZES pentru validarea direcției.",
    "Pregătește planuri, suprafețe, destinații medicale și constrângeri de amplasament.",
  ]);

  if (form.projectType === "Radiologie") {
    score += 16;
    recommendedServices.add("Radiologie CT / RMN / RX");
    recommendedServices.add("Imagistică medicală");
    checklist.add("Tipul exact de cameră: CT, RMN, RX sau mix imagistic");
    nextSteps.add("Clarifică tipul de echipament imagistic înainte de blocarea layout-ului.");
  }

  if (form.projectType === "Laborator") {
    score += 14;
    recommendedServices.add("IVD / echipamente laborator");
    recommendedServices.add("Integrare echipamente laborator");
    checklist.add("Lista analizelor, volumelor estimate și echipamentelor IVD necesare");
    missingData.add("Flux probe, tipuri de analize, consumabile, cerințe de calibrare și QC");
    risks.push(
      createRisk(
        "IVD / laborator",
        "Medium",
        "Fluxurile de laborator, utilitățile, calibrarea și service-ul IVD pot schimba amenajarea.",
        "Corelați echipamentele IVD cu fluxurile, utilitățile și mentenanța încă din faza de concept.",
      ),
    );
  }

  if (form.projectType === "Spital / secție medicală") {
    score += 20;
    recommendedServices.add("Construcții medicale");
    recommendedServices.add("Proiecte medicale turnkey");
    risks.push(
      createRisk(
        "Continuitate operațională",
        "High",
        "Secțiile medicale au fluxuri, zone critice și etapizare cu risc operațional ridicat.",
        "Planificați fazarea lucrărilor, izolarea zonelor și scenariile de continuitate.",
      ),
    );
  }

  if (form.projectType === "Modernizare spațiu existent") {
    score += 12;
    recommendedServices.add("Amenajări medicale");
    missingData.add("Starea instalațiilor existente, traseele disponibile, structura și accesul de șantier");
    risks.push(
      createRisk(
        "Clădire existentă",
        "High",
        "Limitările de structură, trasee, acces și instalații pot genera rework.",
        "Realizați audit de amplasament înainte de estimarea finală.",
      ),
    );
  }

  if (form.surface === "300–700 mp") {
    score += 14;
    recommendedServices.add("Proiecte medicale turnkey");
    checklist.add("Etapizare proiect și prioritizarea zonelor cu risc");
  }

  if (form.surface === "peste 700 mp") {
    score += 22;
    recommendedServices.add("Proiecte medicale turnkey");
    recommendedServices.add("Management tehnic multi-disciplinar");
    risks.push(
      createRisk(
        "Coordonare multi-disciplinară",
        "High",
        "Suprafețele mari cresc riscul de nealiniere între arhitectură, instalații, aparatură și service.",
        "Introduceți un plan de coordonare pe specialități și decizii tehnice blocate pe faze.",
      ),
    );
  }

  if (hasRmn) {
    score += 30;
    recommendedServices.add("Ecranare RF pentru cameră RMN");
    recommendedServices.add("Imagistică medicală - RMN");
    recommendedServices.add("Integrare aparatură medicală");
    checklist.add("Cerințe RMN de la furnizorul aparaturii");
    checklist.add("Date pentru RF shielding: ușă RF, penetrări, waveguides, filtre și testare");
    missingData.add("Cerințe RMN: magnet, acces, HVAC, vibrații, quench și cerințe RF");
    assumptions.add("Pentru RMN, logica presupune RF shielding / cușcă Faraday, HVAC, vibrații și acces magnet.");
    nextSteps.add("Programează analiză RF și verificare de integrare RMN.");
    risks.push(
      createRisk(
        "RF shielding",
        "Critical",
        "RMN cere integritate RF, control al penetrărilor, ușă RF, HVAC și testare de atenuare.",
        "Tratați RF shielding-ul ca pachet separat de protecția radiologică și validați cu furnizorul RMN.",
      ),
      createRisk(
        "HVAC / vibrații / acces magnet",
        "High",
        "Performanța RMN poate fi afectată de răcire, vibrații, trasee și accesul de instalare.",
        "Verificați HVAC, trasee, structură și cerințe de livrare înainte de comenzi.",
      ),
    );
  } else if (hasCtRx) {
    score += 26;
    recommendedServices.add("Protecție radiologică / plumb");
    recommendedServices.add("Imagistică medicală - CT/RX");
    recommendedServices.add("Radiologie și cerințe CNCAN");
    checklist.add("Tema de proiect pentru cameră CT/RX și cerințe CNCAN");
    missingData.add("Calcul radioprotecție, vecinătăți, zone controlate și documentație CNCAN");
    assumptions.add("Pentru CT/RX, logica presupune ecranare cu plumb, CNCAN și protecție radiologică.");
    nextSteps.add("Solicită consultanță CNCAN și analiză de protecție radiologică.");
    risks.push(
      createRisk(
        "CNCAN",
        "High",
        "CT/RX implică documentație, zone controlate și condiții de radioprotecție.",
        "Clarificați CNCAN înainte de execuția pereților, ușilor și geamurilor plumbate.",
      ),
      createRisk(
        "Protecție radiologică / plumb",
        "High",
        "Ecranarea cu plumb sau soluții echivalente trebuie corelată cu layout-ul și vecinătățile.",
        "Solicitați calcul de radioprotecție și verificați toate penetrările tehnice.",
      ),
    );
  } else if (form.radiology === "Nu știu încă") {
    score += 8;
    checklist.add("Decizie inițială privind includerea CT, RMN sau RX");
    missingData.add("Decizie asupra tipului de imagistică: CT, RMN, RX sau fără radiologie");
    risks.push(
      createRisk(
        "Cerință imagistică neclară",
        "Medium",
        "Radiologia neclară poate schimba bugetul, autorizarea, ecranarea și calendarul.",
        "Blocați decizia CT/RMN/RX înainte de proiectarea tehnică detaliată.",
      ),
    );
  }

  if (form.shielding === "Ecranare RF") {
    score += 12;
    recommendedServices.add("Ecranare RF");
    checklist.add("Clarificare interferențe, treceri și acces în zona ecranată");
  }

  if (form.shielding === "Protecție radiologică / plumb") {
    score += 12;
    recommendedServices.add("Protecție radiologică / plumb");
    checklist.add("Calcul preliminar pentru protecție radiologică");
  }

  if (form.shielding === "Ambele") {
    score += 18;
    recommendedServices.add("Ecranare RF");
    recommendedServices.add("Protecție radiologică / plumb");
    risks.push(
      createRisk(
        "Shielding combinat",
        "Critical",
        "RF shielding și protecția radiologică sunt servicii diferite și pot interfera în detalii de execuție.",
        "Coordonați separat cerințele RF și plumbul, cu detalii pentru uși, treceri, filtre și vecinătăți.",
      ),
    );
  }

  if (form.equipment !== "Nu") {
    score += form.equipment === "Nu știu încă" ? 8 : 14;
    recommendedServices.add("Integrare aparatură medicală");
    recommendedServices.add("Vânzare / selecție aparatură medicală");
    checklist.add("Lista echipamentelor medicale și cerințele furnizorilor");
    nextSteps.add("Corelează aparatura cu layout-ul, instalațiile și accesul de service.");
    risks.push(
      createRisk(
        "Integrare echipamente",
        hasRadiology ? "High" : "Medium",
        "Aparatura poate modifica alimentarea, datele, HVAC, accesul, încărcările și service-ul.",
        "Alegeți echipamentele suficient de devreme pentru a bloca cerințele tehnice.",
      ),
    );
  }

  if (form.equipment === "Da, service / mentenanță") {
    score += 8;
    recommendedServices.add("Service aparatură medicală");
    recommendedServices.add("Mentenanță și uptime echipamente");
    nextSteps.add("Definește planul de mentenanță și accesul service înainte de predare.");
  }

  if (form.urgency === "1–3 luni") {
    score += 14;
    risks.push(
      createRisk(
        "Timeline comprimat",
        "High",
        "Calendarul 1–3 luni crește riscul de achiziții rapide, omiterea detaliilor și rework.",
        "Introduceți decizii critice pe săptămâni și validați rapid autorizările.",
      ),
    );
  }

  if (form.urgency === "imediat") {
    score += 22;
    risks.push(
      createRisk(
        "Urgență proiect",
        "Critical",
        "Urgența imediată poate crește costul, reduce timpul de validare și amplifica riscul de blocaj.",
        "Porniți cu o analiză tehnică rapidă și prioritizați riscurile care pot opri proiectul.",
      ),
    );
  }

  if (form.description.trim().length > 160) {
    checklist.add("Brief-ul descriptiv este suficient pentru o primă discuție tehnică.");
  } else {
    checklist.add("Descriere mai detaliată a spațiului, obiectivului și constrângerilor.");
    missingData.add("Descriere extinsă: obiectiv, constrângeri, clădire, termen, buget și echipamente");
  }

  if (unknownCount > 0) {
    risks.push(
      createRisk(
        "Date lipsă",
        "Medium",
        "Opțiunile marcate ca necunoscute reduc precizia estimării și pot schimba recomandările.",
        "Clarificați necunoscutele înainte de bugetarea finală.",
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
    answered: Object.values(form).filter((value) => value.trim()).length,
    total: Object.keys(form).length,
    unknowns: unknownCount,
    descriptionLength: form.description.trim().length,
    score: normalizedScore,
  });

  return {
    complexity,
    score: normalizedScore,
    complexityExplanation:
      complexity === "High-complexity medical infrastructure"
        ? "Proiectul combină factori tehnici care trebuie tratați ca infrastructură medicală complexă."
        : "Nivelul combină suprafața, radiologia, ecranarea, aparatura, service-ul și urgența.",
    recommendedServices: Array.from(recommendedServices),
    phases: [
      "Analiză tehnică asistată și clarificarea cerințelor",
      "Proiectare funcțională, tehnică, bugetară și timeline orientativ",
      "Coordonare execuție, aparatură, ecranare și autorizări",
      "Integrare, testare, predare și plan de mentenanță",
    ],
    checklist: Array.from(checklist),
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
        ? "Solicită rapid o analiză tehnică ZES pentru a valida riscurile majore înainte de bugetare sau execuție."
        : "Trimite rezultatul către ZES pentru o analiză tehnică personalizată și o recomandare de pași următori.",
  };
}
