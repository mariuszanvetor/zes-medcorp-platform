"use client";

import { useMemo, useState } from "react";

import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export type LeadFlowCheckStatus = "safe" | "configured" | "missing" | "disabled" | "attention";

export type LeadFlowCheck = {
  label: string;
  status: LeadFlowCheckStatus;
  detail: string;
};

export type LeadFlowMonitorConfig = {
  integrationMode: string;
  expectedEmailMode: string;
  expectedSheetsMode: string;
  storageMode: string;
  resend: LeadFlowCheck[];
  sheets: LeadFlowCheck[];
  flags: LeadFlowCheck[];
};

type LeadFlowTestResult = {
  httpStatus: number;
  success?: boolean;
  ok?: boolean;
  score?: number;
  priority?: string;
  emailMode?: string;
  sheetsMode?: string;
  storageMode?: string;
  integrationMode?: string;
  message?: string;
  retryAfterSeconds?: number;
};

type LeadFlowMonitorProps = {
  config: LeadFlowMonitorConfig;
};

export function LeadFlowMonitor({ config }: LeadFlowMonitorProps) {
  const [isTesting, setIsTesting] = useState(false);
  const [result, setResult] = useState<LeadFlowTestResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const summary = useMemo(
    () => [
      ["Integration mode", config.integrationMode],
      ["Expected email", labelForMode(config.expectedEmailMode)],
      ["Expected Sheets", labelForMode(config.expectedSheetsMode)],
      ["Storage", labelForMode(config.storageMode)],
    ],
    [config],
  );
  const interpretation = result ? interpretTestResult(result) : null;

  async function runSafeTest() {
    setIsTesting(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/leads", {
        body: JSON.stringify(createSafeTestPayload()),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const body = (await response.json().catch(() => null)) as
        | Record<string, unknown>
        | null;

      setResult({
        httpStatus: response.status,
        success: asBoolean(body?.success),
        ok: asBoolean(body?.ok),
        score: asNumber(body?.score),
        priority: asString(body?.priority),
        emailMode: asString(body?.emailMode),
        sheetsMode: asString(body?.sheetsMode),
        storageMode: asString(body?.storageMode),
        integrationMode: asString(body?.integrationMode),
        message: asString(body?.message),
        retryAfterSeconds: asNumber(body?.retryAfterSeconds),
      });

      if (!response.ok) {
        setError(
          response.status === 429
            ? "Testul a fost blocat de cooldown-ul de duplicate. Asteptati cateva secunde si reluati."
            : "API-ul a returnat un raspuns non-200 pentru testul intern.",
        );
      }
    } catch {
      setError("Testul intern nu a putut contacta /api/leads.");
    } finally {
      setIsTesting(false);
    }
  }

  return (
    <div className="grid gap-8">
      <Card className="border-blue-100 bg-white" padding="lg">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Badge variant="blue">Lead flow diagnostic</Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
              Health summary
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              Panou intern pentru verificarea modurilor active de lead capture.
              Nu afiseaza secrete, chei API sau valori din private key.
            </p>
          </div>
          <ModeLegend />
        </div>

        <dl className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summary.map(([label, value]) => (
            <div
              className="rounded-2xl border border-slate-200 bg-[#f7fbff] p-5"
              key={label}
            >
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                {label}
              </dt>
              <dd className="mt-2 text-lg font-semibold text-slate-950">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </Card>

      <div className="grid gap-6 xl:grid-cols-3">
        <CheckGroup checks={config.resend} title="Resend / email" />
        <CheckGroup checks={config.sheets} title="Google Sheets" />
        <CheckGroup checks={config.flags} title="Runtime flags" />
      </div>

      <DailyOpsChecklist />

      <Card className="border-blue-100 bg-white" padding="lg">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Test lead intern
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              Ruleaza un payload demo prin acelasi endpoint folosit de formulare.
              Testul respecta cooldown-ul API si poate declansa email sau Sheets
              daca acestea sunt active in mediul curent.
            </p>
            <p className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-7 text-amber-950">
              Acest test poate trimite o notificare interna reala si poate scrie
              un rand in Google Sheets daca integrarile sunt active in productie.
              Nu introduce date reale aici.
            </p>
          </div>
          <Button isLoading={isTesting} onClick={runSafeTest} size="lg">
            {isTesting ? "Rulez testul..." : "Ruleaza test lead intern"}
          </Button>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm font-semibold leading-7 text-rose-800">
            {error}
          </div>
        )}

        {result && (
          <>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <ResultItem label="HTTP status" value={String(result.httpStatus)} />
              <ResultItem label="Success" value={String(result.success ?? false)} />
              <ResultItem label="Integration" value={result.integrationMode ?? "-"} />
              <ResultItem label="Email mode" value={labelForMode(result.emailMode)} />
              <ResultItem label="Sheets mode" value={labelForMode(result.sheetsMode)} />
              <ResultItem label="Storage mode" value={labelForMode(result.storageMode)} />
              <ResultItem label="Score" value={String(result.score ?? "-")} />
              <ResultItem label="Priority" value={result.priority ?? "-"} />
            </div>

            {interpretation && (
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                <InterpretationCard
                  items={interpretation.succeeded}
                  tone="success"
                  title="Ce a reusit"
                />
                <InterpretationCard
                  items={interpretation.failed}
                  tone="error"
                  title="Ce necesita atentie"
                />
                <InterpretationCard
                  items={interpretation.nextChecks}
                  tone="neutral"
                  title="Ce verifici mai departe"
                />
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}

function ModeLegend() {
  const items = [
    ["real / live", "activ in productie"],
    ["mock", "simulare sigura"],
    ["config-error", "configuratie incompleta"],
    ["provider-error", "eroare la provider"],
  ];

  return (
    <div className="grid gap-2 rounded-2xl border border-blue-100 bg-[#f7fbff] p-4 text-sm leading-6 text-slate-700 lg:max-w-md">
      <p className="font-bold text-slate-950">Interpretare moduri</p>
      <dl className="grid gap-2">
        {items.map(([mode, meaning]) => (
          <div className="flex items-center justify-between gap-4" key={mode}>
            <dt className="font-semibold text-slate-950">{mode}</dt>
            <dd>{meaning}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function DailyOpsChecklist() {
  const items = [
    "Verifica daca emailurile de lead ajung in inboxul intern.",
    "Verifica daca randurile apar in Google Sheet o singura data.",
    "Verifica daca nu apar 429 false-positive in testele manuale.",
    "Verifica evenimentele Resend pentru livrare sau respingere.",
    "Verifica Vercel logs cand apare config-error sau provider-error.",
    "Verifica saptamanal Search Console pentru acoperire si erori.",
  ];

  return (
    <Card className="border-blue-100 bg-white" padding="lg">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Badge variant="cyan">Daily ops</Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
            Checklist operational
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            Rutina minima dupa activarea email + Google Sheets. Nu necesita
            acces la secrete si nu modifica date.
          </p>
        </div>
      </div>
      <ul className="mt-6 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <li
            className="rounded-2xl border border-slate-200 bg-[#f7fbff] p-4 text-sm font-semibold leading-6 text-slate-700"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function CheckGroup({
  title,
  checks,
}: {
  title: string;
  checks: LeadFlowCheck[];
}) {
  return (
    <Card className="border-blue-100 bg-white" padding="md">
      <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
      <div className="mt-5 grid gap-3">
        {checks.map((check) => (
          <div
            className="rounded-2xl border border-slate-200 bg-[#f7fbff] p-4"
            key={check.label}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold text-slate-950">
                {check.label}
              </p>
              <Badge variant={badgeVariantForStatus(check.status)}>
                {check.status}
              </Badge>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {check.detail}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ResultItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-[#f7fbff] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 break-words text-sm font-semibold text-slate-950">
        {value}
      </p>
    </div>
  );
}

function InterpretationCard({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "success" | "error" | "neutral";
}) {
  const toneClass =
    tone === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-950"
      : tone === "error"
        ? "border-rose-200 bg-rose-50 text-rose-950"
        : "border-blue-100 bg-[#f7fbff] text-slate-700";

  return (
    <div className={`rounded-2xl border p-5 ${toneClass}`}>
      <h3 className="text-sm font-bold uppercase tracking-[0.14em]">
        {title}
      </h3>
      <ul className="mt-4 grid gap-2 text-sm leading-6">
        {(items.length ? items : ["Nicio observatie pentru acest test."]).map(
          (item) => (
            <li key={item}>{item}</li>
          ),
        )}
      </ul>
    </div>
  );
}

function interpretTestResult(result: LeadFlowTestResult) {
  const succeeded: string[] = [];
  const failed: string[] = [];
  const nextChecks: string[] = [];

  if (result.httpStatus >= 200 && result.httpStatus < 300 && result.success) {
    succeeded.push("Endpoint-ul /api/leads a acceptat payload-ul demo.");
  } else if (result.httpStatus === 429) {
    failed.push("Testul a fost blocat de cooldown-ul anti-duplicate.");
    nextChecks.push("Asteapta cooldown-ul si ruleaza din nou testul.");
  } else {
    failed.push("Endpoint-ul nu a confirmat testul intern.");
    nextChecks.push("Verifica Vercel logs si statusul API.");
  }

  addModeInterpretation({
    failed,
    mode: result.emailMode,
    nextChecks,
    service: "email",
    succeeded,
  });
  addModeInterpretation({
    failed,
    mode: result.sheetsMode,
    nextChecks,
    service: "sheets",
    succeeded,
  });
  addModeInterpretation({
    failed,
    mode: result.storageMode,
    nextChecks,
    service: "storage",
    succeeded,
  });

  if (isActiveMode(result.emailMode)) {
    nextChecks.push(
      "Daca emailul nu ajunge, verifica inbox, spam/quarantine, Resend events, domeniu si MX/mailbox.",
    );
  }

  if (result.sheetsMode === "config-error") {
    nextChecks.push(
      "Pentru Sheets config-error, verifica env vars: spreadsheet ID, client email, private key si tab name.",
    );
  }

  if (result.sheetsMode === "provider-error") {
    nextChecks.push(
      "Pentru Sheets provider-error, verifica service account, share pe Sheet, Google Sheets API si numele tabului.",
    );
  }

  return {
    failed: unique(failed),
    nextChecks: unique(nextChecks),
    succeeded: unique(succeeded),
  };
}

function addModeInterpretation({
  service,
  mode,
  succeeded,
  failed,
  nextChecks,
}: {
  service: "email" | "sheets" | "storage";
  mode?: string;
  succeeded: string[];
  failed: string[];
  nextChecks: string[];
}) {
  if (isActiveMode(mode)) {
    succeeded.push(`${labelForService(service)} este activ si confirmat.`);
    return;
  }

  if (mode === "mock") {
    succeeded.push(`${labelForService(service)} ruleaza in simulare sigura.`);
    return;
  }

  if (mode === "config-error") {
    failed.push(`${labelForService(service)} are o problema de configurare.`);
    nextChecks.push("Verifica variabilele server-side din Vercel.");
    return;
  }

  if (mode === "provider-error") {
    failed.push(`${labelForService(service)} a primit eroare de la provider.`);
    nextChecks.push("Verifica dashboard-ul providerului si logurile Vercel.");
    return;
  }

  if (mode === "unsupported") {
    failed.push(`${labelForService(service)} foloseste un provider neimplementat.`);
  }
}

function labelForService(service: "email" | "sheets" | "storage") {
  if (service === "email") return "Email";
  if (service === "sheets") return "Google Sheets";

  return "Storage";
}

function labelForMode(mode: string | undefined) {
  if (!mode) return "-";
  if (isActiveMode(mode)) return `${mode} - active`;
  if (mode === "mock") return "mock - safe simulation";
  if (mode === "config-error") return "config-error - configuration issue";
  if (mode === "provider-error") return "provider-error - provider issue";

  return mode;
}

function isActiveMode(mode: string | undefined) {
  return mode === "real" || mode === "live";
}

function unique(items: string[]) {
  return Array.from(new Set(items));
}

function createSafeTestPayload() {
  return {
    sourceTool: "admin-lead-flow-monitor",
    sourcePage: "/admin/lead-flow",
    inquiryType: "Test intern lead flow",
    projectType: "Diagnostic integrare lead",
    name: "Test intern ZES",
    email: "lead-flow-test@example.test",
    phone: "+40 700 000 000",
    company: "ZES internal test",
    urgency: "Exploratoriu",
    message:
      "Payload demo generat din panoul intern Lead Flow Monitor. Nu contine date reale de client.",
    generatedSummary:
      "Test intern pentru verificarea emailMode, sheetsMode, storageMode si integrationMode.",
    generatedBudgetRange: "Test intern",
    generatedRiskLevel: "Redus",
    generatedComplexity: "Basic",
    timestamp: new Date().toISOString(),
    metadata: {
      recommendedServices: "Lead flow diagnostic",
    },
  };
}

function badgeVariantForStatus(status: LeadFlowCheckStatus): BadgeVariant {
  if (status === "safe" || status === "configured") return "blue";
  if (status === "disabled") return "neutral";
  if (status === "missing" || status === "attention") return "critical";

  return "neutral";
}

function asString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function asNumber(value: unknown) {
  return typeof value === "number" ? value : undefined;
}

function asBoolean(value: unknown) {
  return typeof value === "boolean" ? value : undefined;
}
