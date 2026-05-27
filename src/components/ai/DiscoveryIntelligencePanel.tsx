"use client";

import type { ReactNode } from "react";

import type { OrchestratedDiscoveryResult } from "@/lib/ai-intelligence/discovery-orchestrator";
import type { AiMagicAnalysis } from "@/lib/ai-magic-layer";
import { cn } from "@/lib/utils";

export function DiscoveryIntelligencePanel({
  aiMagicAnalysis,
  result,
}: {
  aiMagicAnalysis: AiMagicAnalysis | null;
  result: OrchestratedDiscoveryResult;
}) {
  const readinessValue = result.leadIntelligence.readinessScore;
  const commercialValue = aiMagicAnalysis?.commercialReadiness ?? Math.min(95, readinessValue + 8);
  const blockers = [
    ...result.missingInformation.slice(0, 3).map((item) => item.label),
    ...(aiMagicAnalysis?.likelyMissingItems.slice(0, 2) ?? []),
  ];
  const checkpoints = buildProjectCheckpoints(result, aiMagicAnalysis);
  const serviceRecommendations = buildServiceRecommendations(result, aiMagicAnalysis);
  const complianceHints = buildComplianceHints(result, aiMagicAnalysis);
  const nextBestAction = buildNextBestAction(result, aiMagicAnalysis);
  const dependencyGroups = buildDependencyGroups(result, aiMagicAnalysis);
  const opportunityMarkers = buildOpportunityMarkers(result, aiMagicAnalysis);

  return (
    <aside className="grid gap-4 lg:sticky lg:top-24">
      <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-[0_12px_36px_rgba(0,87,184,0.07)]">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
          ZES Copilot
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
          Inteligenta preliminara live
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Metric label="Incredere" value={`${result.confidenceScore}/100`} tone={result.confidenceLevel} />
          <Metric label="Project readiness" value={`${readinessValue}/100`} tone="high" />
          <Metric label="Risc" value={result.riskAssessment.riskLevel} tone={riskTone(result.riskAssessment.riskLevel)} />
          <Metric label="Complexitate" value={result.riskAssessment.complexityLevel} tone={riskTone(result.riskAssessment.riskLevel)} />
        </div>
        <div className="mt-4 grid gap-2">
          <ProgressRow label="Project readiness" tone="blue" value={readinessValue} />
          <ProgressRow label="Commercial readiness" tone="cyan" value={commercialValue} />
        </div>
        <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs font-semibold leading-6 text-amber-900">
          {result.safeDisclaimer}
        </p>
      </section>

      <Panel title="Domenii detectate">
        <TagList items={[...result.detectedDomains, ...result.relatedDomains.slice(0, 3)]} />
      </Panel>

      {aiMagicAnalysis && (
        <Panel title="ZES commercial guidance">
          <div className="grid gap-3 sm:grid-cols-2">
            <Metric label="Planning readiness" value={`${aiMagicAnalysis.planningReadiness}/100`} tone="high" />
            <Metric label="Commercial readiness" value={`${aiMagicAnalysis.commercialReadiness}/100`} tone="high" />
            <Metric label="Urgenta probabila" value={aiMagicAnalysis.likelyUrgency} tone="medium" />
            <Metric label="Maturitate proiect" value={aiMagicAnalysis.projectMaturity} tone="medium" />
          </div>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-900">
            Oportunitate: {aiMagicAnalysis.commercialOpportunityType}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {aiMagicAnalysis.salesSignals.map((signal) => (
              <span
                className="rounded-lg border border-blue-100 bg-[#f7fbff] px-3 py-1 text-xs font-bold text-slate-700"
                key={signal}
              >
                {signal}
              </span>
            ))}
          </div>
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs font-semibold leading-6 text-amber-900">
            {aiMagicAnalysis.safetyNote}
          </p>
        </Panel>
      )}

      <Panel title="Opportunity markers">
        <div className="grid gap-2">
          {opportunityMarkers.map((marker) => (
            <div className="rounded-lg border border-blue-100 bg-[#f7fbff] p-3" key={marker}>
              <p className="text-sm font-semibold leading-6 text-slate-800">{marker}</p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Checkpoint-uri proiect">
        <div className="grid gap-3">
          {checkpoints.map((checkpoint) => (
            <div className="rounded-lg border border-slate-200 bg-[#f7fbff] p-3" key={checkpoint.label}>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                {checkpoint.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{checkpoint.status}</p>
              <p className="mt-1 text-xs leading-6 text-slate-600">{checkpoint.note}</p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Informatii lipsa">
        {result.missingInformation.length ? (
          <ul className="grid gap-2">
            {result.missingInformation.slice(0, 5).map((item) => (
              <li className="rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700" key={item.id}>
                <span className="font-semibold text-slate-950">{item.label}</span>
                <span className="block text-xs text-slate-500">{item.reason}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm leading-7 text-slate-600">
            Contextul este suficient pentru o analiza preliminara structurata.
          </p>
        )}
      </Panel>

      <Panel title="Riscuri si validari">
        <ul className="grid gap-2">
          {result.riskAssessment.riskReasons.slice(0, 4).map((reason) => (
            <li className="rounded-lg bg-[#f7fbff] p-3 text-sm leading-6 text-slate-700" key={reason}>
              {reason}
            </li>
          ))}
        </ul>
        {result.riskAssessment.validationNeeds.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {result.riskAssessment.validationNeeds.slice(0, 5).map((need) => (
              <span
              className="rounded-lg border border-blue-100 bg-white px-3 py-1 text-xs font-bold text-[#0057b8]"
                key={need}
              >
                {need}
              </span>
            ))}
          </div>
        )}
      </Panel>

      <Panel title="Likely blockers">
        <ul className="grid gap-2">
          {blockers.slice(0, 5).map((blocker) => (
            <li className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700" key={blocker}>
              {blocker}
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Dependency groups">
        <div className="grid gap-3">
          {dependencyGroups.map((group) => (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3" key={group.title}>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                {group.title}
              </p>
              <ul className="mt-2 grid gap-1">
                {group.items.map((item) => (
                  <li className="text-sm leading-6 text-slate-700" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Servicii recomandate">
        <div className="grid gap-2">
          {serviceRecommendations.slice(0, 5).map((service) => (
            <a
              className="rounded-lg border border-blue-100 bg-white p-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0057b8]"
              href={service.href}
              key={`${service.href}-${service.label}`}
            >
              {service.label}
            </a>
          ))}
        </div>
      </Panel>

      <Panel title="Compliance / finantare hints">
        <ul className="grid gap-2">
          {complianceHints.map((hint) => (
            <li className="rounded-lg border border-blue-100 bg-[#f7fbff] p-3 text-sm leading-6 text-slate-700" key={hint}>
              {hint}
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Resurse recomandate">
        <div className="grid gap-2">
          {result.relevantResources.slice(0, 6).map((resource) => (
            <a
              className="rounded-lg border border-blue-100 bg-white p-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0057b8]"
              href={resource.href}
              key={`${resource.type}-${resource.href}`}
            >
              <span className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                {resource.type}
              </span>
              {resource.label}
            </a>
          ))}
        </div>
      </Panel>

      <Panel title="Urmator pas">
        <p className="text-sm leading-7 text-slate-600">{nextBestAction}</p>
        <p className="mt-3 text-sm font-semibold leading-7 text-slate-900">
          Follow-up recomandat: {followUpLabel(result.leadIntelligence.recommendedFollowUpType)}
        </p>
      </Panel>
    </aside>
  );
}

function ProgressRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "blue" | "cyan";
}) {
  const barClass = tone === "blue" ? "bg-[#0057b8]" : "bg-cyan-600";
  return (
    <div>
      <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-600">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-blue-100">
        <div
          className={cn("h-2 rounded-full", barClass)}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}

function buildProjectCheckpoints(
  result: OrchestratedDiscoveryResult,
  aiMagicAnalysis: AiMagicAnalysis | null,
) {
  const checkpoints = [
    {
      label: "Stadiu proiect",
      status: result.projectStage,
      note: "Se ajusteaza pe masura ce clarifici informatiile tehnice.",
    },
    {
      label: "Documentatie",
      status:
        result.missingInformation.some((item) => item.stage === "documentation")
          ? "Partiala"
          : "Acceptabila",
      note: "Planuri, fise echipament si status autorizari cresc viteza analizei.",
    },
    {
      label: "Blocaje operationale",
      status: result.riskAssessment.riskLevel,
      note:
        aiMagicAnalysis?.infrastructureComplexity === "critical"
          ? "Scenariul cere secventiere atenta si validari timpurii."
          : "Poate continua cu ipoteze preliminare, apoi validare tehnica.",
    },
  ];

  return checkpoints;
}

function buildServiceRecommendations(
  result: OrchestratedDiscoveryResult,
  aiMagicAnalysis: AiMagicAnalysis | null,
) {
  const fromResources = result.relevantResources
    .filter((item) => item.type === "service")
    .map(({ label, href }) => ({ label, href }));
  const fromScenario =
    aiMagicAnalysis?.suggestedServices.map(({ label, href }) => ({ label, href })) ?? [];
  const fallback = result.likelyServices.map((label) => ({
    label,
    href: "/services",
  }));

  const merged = [...fromScenario, ...fromResources, ...fallback];
  const seen = new Set<string>();
  return merged.filter((item) => {
    const key = `${item.label}-${item.href}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildComplianceHints(
  result: OrchestratedDiscoveryResult,
  aiMagicAnalysis: AiMagicAnalysis | null,
) {
  const domains = new Set(result.detectedDomains);
  const hints: string[] = [];

  if (domains.has("ct") || domains.has("radiology") || domains.has("dental")) {
    hints.push(
      "Proiectele CT/RX au nevoie de planificare radioprotectie si coordonare CNCAN inainte de executie.",
    );
  }
  if (domains.has("mri")) {
    hints.push(
      "Proiectele RMN cer RF shielding, analiza traseu de instalare si verificarea conditiilor de siguranta/quench.",
    );
  }
  if (
    domains.has("clinic-modernization") ||
    aiMagicAnalysis?.scenario.id === "imaging-expansion"
  ) {
    hints.push(
      "Modernizarea sau extinderea imagistica beneficiaza de implementare etapizata pentru a reduce downtime-ul.",
    );
  }
  if (
    aiMagicAnalysis &&
    aiMagicAnalysis.commercialReadiness >= 65 &&
    aiMagicAnalysis.planningReadiness >= 60
  ) {
    hints.push(
      "Pentru proiecte pregatite de finantare, pregatiti specificatii tehnice, bugete orientative si documentatie de furnizor.",
    );
  }

  if (!hints.length) {
    hints.push(
      "Clarificati devreme documentatia tehnica, constrangerile de amplasament si intervalul de buget pentru o analiza comerciala utila.",
    );
  }

  return hints.slice(0, 4);
}

function buildNextBestAction(
  result: OrchestratedDiscoveryResult,
  aiMagicAnalysis: AiMagicAnalysis | null,
) {
  if (aiMagicAnalysis?.recommendedNextSteps.length) {
    return `ZES recomanda urmatorul pas: ${aiMagicAnalysis.recommendedNextSteps[0]}. ${result.continueWithAssumptionsNote}`;
  }

  return `ZES recomanda continuarea cu validari tehnice etapizate. ${result.continueWithAssumptionsNote}`;
}

function buildDependencyGroups(
  result: OrchestratedDiscoveryResult,
  aiMagicAnalysis: AiMagicAnalysis | null,
) {
  const domains = new Set(result.detectedDomains);
  const groups: Array<{ title: string; items: string[] }> = [];

  if (domains.has("mri")) {
    groups.push({
      title: "RMN infrastructura",
      items: [
        "RF shielding si validare camera Faraday",
        "Analiza traseu instalare magnet si acces",
        "Coordonare HVAC, electric si siguranta quench",
      ],
    });
  }

  if (domains.has("ct") || domains.has("radiology") || domains.has("dental")) {
    groups.push({
      title: "CT / RX / radiologie",
      items: [
        "Revizuire radioprotectie si configuratie camera",
        "Planificare CNCAN in functie de etapa proiectului",
        "Corelare flux pacienti cu configuratia echipamentului",
      ],
    });
  }

  if (
    domains.has("clinic-modernization") ||
    aiMagicAnalysis?.scenario.id === "imaging-expansion" ||
    aiMagicAnalysis?.scenario.id === "radiology-modernization"
  ) {
    groups.push({
      title: "Modernizare si continuitate",
      items: [
        "Etapizare implementare pentru reducerea downtime-ului",
        "Coordonare multi-vendor si secventiere operationala",
        "Validari intermediare inainte de punerea in functiune",
      ],
    });
  }

  if (aiMagicAnalysis?.scenario.id === "service-maintenance") {
    groups.push({
      title: "Service / mentenanta",
      items: [
        "Prioritizare dupa impact operational si urgenta",
        "Clarificare piese critice si interval de interventie",
        "Plan preventiv pentru reducerea incidentelor repetate",
      ],
    });
  }

  if (!groups.length) {
    groups.push({
      title: "Dependente generale",
      items: [
        "Confirmare date tehnice minime ale proiectului",
        "Validare infrastructura HVAC/electrica pe configuratia finala",
        "Aliniere intre obiective comerciale si fezabilitatea tehnica",
      ],
    });
  }

  return groups.slice(0, 3);
}

function buildOpportunityMarkers(
  result: OrchestratedDiscoveryResult,
  aiMagicAnalysis: AiMagicAnalysis | null,
) {
  const markers: string[] = [];

  if (aiMagicAnalysis) {
    markers.push(
      `Nivelul actual de pregatire comerciala este ${readinessBand(aiMagicAnalysis.commercialReadiness)}.`,
    );
    markers.push(
      `Maturitatea implementarii este ${aiMagicAnalysis.projectMaturity}, iar complexitatea este ${aiMagicAnalysis.infrastructureComplexity}.`,
    );
  }

  if (result.riskAssessment.riskLevel === "high" || result.riskAssessment.riskLevel === "critical") {
    markers.push(
      "ZES identifica posibile blocaje de infrastructura; este recomandata validarea tehnica inainte de executie.",
    );
  }

  if (result.leadIntelligence.urgencyScore >= 70) {
    markers.push(
      "Scenariul indica urgenta operationala ridicata; prioritar este un plan de actiune si secventiere.",
    );
  }

  if (!markers.length) {
    markers.push(
      "Profilul actual permite avansarea cu ipoteze preliminare, urmata de validare tehnica punctuala.",
    );
  }

  return markers.slice(0, 4);
}

function readinessBand(value: number) {
  if (value >= 80) return "ridicat";
  if (value >= 60) return "moderat";
  return "incipient";
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "low" | "medium" | "high";
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-3",
        tone === "high"
          ? "border-blue-100 bg-blue-50 text-blue-900"
          : tone === "medium"
            ? "border-amber-100 bg-amber-50 text-amber-900"
            : "border-slate-200 bg-slate-50 text-slate-800",
      )}
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] opacity-70">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold capitalize">{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-[0_10px_32px_rgba(0,87,184,0.055)]">
      <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function TagList({ items }: { items: string[] }) {
  const unique = [...new Set(items)].slice(0, 8);
  return (
    <div className="flex flex-wrap gap-2">
      {unique.map((item) => (
        <span
          className="rounded-lg border border-blue-100 bg-[#f7fbff] px-3 py-1 text-xs font-bold text-slate-700"
          key={item}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function riskTone(risk: string): "low" | "medium" | "high" {
  if (risk === "critical" || risk === "high") return "medium";
  if (risk === "medium") return "medium";
  return "low";
}

function followUpLabel(value: string) {
  const labels: Record<string, string> = {
    "educational-nurture": "clarificare educationala",
    "technical-clarification": "clarificare tehnica",
    "proposal-preparation": "pregatire propunere preliminara",
    "urgent-technical-review": "review tehnic urgent",
  };

  return labels[value] ?? value;
}
