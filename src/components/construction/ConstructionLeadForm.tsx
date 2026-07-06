"use client";

import { useId, useState, type FormEvent } from "react";

import { validateEmail, validatePhone } from "@/lib/forms";
import type { LeadPayload, LeadSubmissionState } from "@/lib/lead-types";
import { cn } from "@/lib/utils";
import { companyContact } from "@/lib/brand";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

type ConstructionLeadFormProps = {
  sourcePage: string;
  title?: string;
  description?: string;
  compact?: boolean;
  mode?: "full" | "quick";
  surface?: "card" | "embedded";
  anchorId?: string;
  defaultProjectType?: string;
  defaultTimeline?: string;
  defaultBudgetRange?: string;
  defaultPropertyStatus?: string;
  locationPlaceholder?: string;
  showBudgetInQuick?: boolean;
  showPropertyStatusInQuick?: boolean;
  submitLabel?: string;
};

type FormValues = {
  name: string;
  email: string;
  phone: string;
  location: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  propertyStatus: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues | "form", string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  location: "",
  projectType: "Renovare apartament",
  budgetRange: "De estimat",
  timeline: "In urmatoarele 1-3 luni",
  propertyStatus: "Locuinta existenta",
  message: "",
};

const projectTypes = [
  "Renovare apartament",
  "Renovare la cheie",
  "Amenajare interioara",
  "Constructie casa",
  "Baie / bucatarie",
  "Management santier",
  "Alta lucrare rezidentiala",
];

const budgetRanges = [
  "De estimat",
  "Sub 10.000 EUR",
  "10.000 - 25.000 EUR",
  "25.000 - 60.000 EUR",
  "Peste 60.000 EUR",
];

const timelines = [
  "Urgent",
  "In urmatoarele 1-3 luni",
  "In 3-6 luni",
  "Exploratoriu",
];

const propertyStatuses = [
  "Locuinta existenta",
  "Apartament nou",
  "Casa la rosu / gri",
  "Teren / proiect in pregatire",
  "Lucrare inceputa",
];

export function ConstructionLeadForm({
  sourcePage,
  title = "Cere evaluare pentru lucrare",
  description,
  compact = false,
  mode = "full",
  surface = "card",
  anchorId = "oferta",
  defaultProjectType,
  defaultTimeline,
  defaultBudgetRange,
  defaultPropertyStatus,
  locationPlaceholder = "ex. Sector 3, Popesti, Bragadiru",
  showBudgetInQuick = false,
  showPropertyStatusInQuick = false,
  submitLabel,
}: ConstructionLeadFormProps) {
  const formInstanceId = useId().replace(/:/g, "");
  const titleId = `construction-${formInstanceId}-title`;
  const messageId = `construction-${formInstanceId}-message`;
  const defaultValues = buildInitialValues({
    defaultProjectType,
    defaultTimeline,
    defaultBudgetRange,
    defaultPropertyStatus,
  });
  const [values, setValues] = useState<FormValues>(defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<LeadSubmissionState>("idle");

  const isLoading = status === "loading";
  const shouldShowBudget = mode === "full" || showBudgetInQuick;
  const shouldShowPropertyStatus = mode === "full" || showPropertyStatusInQuick;
  const followUpWhatsappHref = buildFollowUpWhatsappHref(sourcePage);

  function updateValue(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      delete next.form;
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateValues(values, mode);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setStatus("error");
      trackLeadSubmitError({
        sourcePage,
        formMode: mode,
        projectType: values.projectType,
        budgetRange: values.budgetRange,
        timeline: values.timeline,
        reason: "validation",
      });
      return;
    }

    setStatus("loading");
    setErrors({});

    const payload = buildLeadPayload(values, sourcePage, mode);

    trackLeadSubmitAttempt({
      sourcePage,
      formMode: mode,
      projectType: values.projectType,
      budgetRange: values.budgetRange,
      timeline: values.timeline,
    });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null) as {
        ok?: boolean;
        success?: boolean;
        message?: string;
        retryAfterSeconds?: number;
      } | null;

      if (!response.ok || result?.ok === false || result?.success === false) {
        if (response.status === 429) {
          throw new Error(
            `Ai trimis recent o solicitare similara. Reincearca in ${result?.retryAfterSeconds ?? 60} secunde.`,
          );
        }

        throw new Error(result?.message ?? "Solicitarea nu a putut fi trimisa.");
      }

      setStatus("success");
      trackLeadSubmit({
        sourcePage,
        formMode: mode,
        projectType: values.projectType,
        budgetRange: values.budgetRange,
        timeline: values.timeline,
      });
      setValues(defaultValues);
    } catch (error) {
      setStatus("error");
      setErrors({
        form:
          error instanceof Error
            ? error.message
            : "Solicitarea nu a putut fi trimisa. Incearca din nou.",
      });
      trackLeadSubmitError({
        sourcePage,
        formMode: mode,
        projectType: values.projectType,
        budgetRange: values.budgetRange,
        timeline: values.timeline,
        reason: "submit",
      });
    }
  }

  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        "bg-white text-[#171614]",
        surface === "card" &&
          "border border-[#d8d0c2] shadow-[0_18px_56px_rgba(23,22,20,0.08)]",
        compact ? "p-5" : "p-5 sm:p-7 lg:p-8",
      )}
      id={anchorId}
    >
      <div className={cn("grid gap-7", compact ? "" : "lg:grid-cols-[0.9fr_1.1fr]")}>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9b7334]">
            Solicitare oferta
          </p>
          <h2
            className="mt-3 text-2xl font-semibold leading-tight text-[#171614]"
            id={titleId}
          >
            {title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#5f5a50]">
            {description ??
              (mode === "quick"
                ? "Lasa telefonul si zona lucrarii. Revenim cu intrebarile utile pentru o prima estimare."
                : "Trimite cateva detalii despre locuinta si lucrare. Revenim cu pasii de evaluare, informatiile necesare pentru deviz si un termen realist pentru urmatoarea discutie.")}
          </p>
          {mode === "full" && (
            <dl className="mt-6 grid gap-3 text-sm text-[#5f5a50]">
              <div className="border border-[#d8d0c2] bg-[#f7f3ea] p-4">
                <dt className="font-semibold text-[#171614]">Raspuns rapid</dt>
                <dd className="mt-1 leading-6">
                  Te contactam pentru clarificari despre zona, suprafata, stadiu,
                  termen si ce trebuie verificat la fata locului.
                </dd>
              </div>
              <div className="border border-[#d8d0c2] bg-[#f7f3ea] p-4">
                <dt className="font-semibold text-[#171614]">Estimare mai buna</dt>
                <dd className="mt-1 leading-6">
                  Ajuta daca incluzi poze, suprafata, zona, termen si lucrarile
                  deja facute.
                </dd>
              </div>
            </dl>
          )}
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput
              error={errors.name}
              idPrefix={formInstanceId}
              label="Nume"
              onChange={(value) => updateValue("name", value)}
              required
              value={values.name}
            />
            <TextInput
              error={errors.phone}
              idPrefix={formInstanceId}
              label="Telefon"
              onChange={(value) => updateValue("phone", value)}
              required
              type="tel"
              value={values.phone}
            />
            <TextInput
              error={errors.location}
              idPrefix={formInstanceId}
              label="Localitate / sector"
              onChange={(value) => updateValue("location", value)}
              placeholder={locationPlaceholder}
              required
              value={values.location}
            />
            <SelectInput
              idPrefix={formInstanceId}
              label="Tip lucrare"
              onChange={(value) => updateValue("projectType", value)}
              options={projectTypes}
              value={values.projectType}
            />
            {mode === "full" && (
              <TextInput
                error={errors.email}
                idPrefix={formInstanceId}
                label="Email"
                onChange={(value) => updateValue("email", value)}
                required
                type="email"
                value={values.email}
              />
            )}
            {mode === "quick" && (
              <TextInput
                error={errors.email}
                idPrefix={formInstanceId}
                label="Email optional"
                onChange={(value) => updateValue("email", value)}
                type="email"
                value={values.email}
              />
            )}
            {shouldShowBudget && (
              <SelectInput
                idPrefix={formInstanceId}
                label="Buget"
                onChange={(value) => updateValue("budgetRange", value)}
                options={budgetRanges}
                value={values.budgetRange}
              />
            )}
            <SelectInput
              idPrefix={formInstanceId}
              label="Termen"
              onChange={(value) => updateValue("timeline", value)}
              options={timelines}
              value={values.timeline}
            />
            {shouldShowPropertyStatus && (
              <SelectInput
                idPrefix={formInstanceId}
                label="Stadiu locuinta"
                onChange={(value) => updateValue("propertyStatus", value)}
                options={propertyStatuses}
                value={values.propertyStatus}
              />
            )}
          </div>
          <label className="grid gap-2" htmlFor={messageId}>
            <span className="text-sm font-semibold text-[#4d4538]">
              Detalii lucrare
            </span>
            <textarea
              className="min-h-32 w-full min-w-0 border border-[#cfc6b8] bg-white px-4 py-3 text-sm leading-7 outline-none transition focus:border-[#9b7334] focus:ring-4 focus:ring-[#d9b56d]/25"
              id={messageId}
              onChange={(event) => updateValue("message", event.target.value)}
              placeholder="Suprafata, camere, baie/bucatarie, instalatii, finisaje, termen, poze sau planuri disponibile."
              value={values.message}
            />
          </label>

          {errors.form && (
            <p className="border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
              {errors.form}
            </p>
          )}

          {status === "success" && (
            <div className="border border-[#d9b56d]/50 bg-[#fff8e8] p-3 text-sm text-[#4a371d]">
              <p className="font-semibold">
                Solicitarea a fost trimisa. Te contactam pentru pasii urmatori.
              </p>
              <p className="mt-2 leading-6">
                Pentru o prima evaluare mai buna, trimite pe WhatsApp poze,
                video sau linkul de referinta salvat.
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <a
                  className="inline-flex min-h-10 items-center justify-center border border-[#d9b56d] bg-white px-4 text-xs font-black uppercase tracking-[0.08em] text-[#5d421c] transition hover:bg-[#d9b56d] hover:text-[#171614]"
                  href={followUpWhatsappHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  Trimite poze / video
                </a>
                <a
                  className="inline-flex min-h-10 items-center justify-center border border-[#171614] px-4 text-xs font-black uppercase tracking-[0.08em] text-[#171614] transition hover:bg-[#171614] hover:text-white"
                  href={companyContact.phoneHref}
                >
                  Suna direct
                </a>
              </div>
            </div>
          )}

          <button
            className="inline-flex min-h-12 items-center justify-center border border-[#171614] bg-[#171614] px-6 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:bg-[#9b7334] focus:outline-none focus:ring-4 focus:ring-[#d9b56d]/30 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isLoading}
            type="submit"
          >
            {isLoading
              ? "Se trimite..."
              : submitLabel ?? (mode === "quick" ? "Vreau sa fiu sunat" : "Trimite solicitarea")}
          </button>
          <p className="text-xs leading-6 text-[#756d61]">
            Prin trimitere accepti sa fii contactat pentru evaluarea lucrarii.
            Nu trimite date sensibile care nu sunt necesare proiectului.
          </p>
        </form>
      </div>
    </section>
  );
}

function buildInitialValues({
  defaultProjectType,
  defaultTimeline,
  defaultBudgetRange,
  defaultPropertyStatus,
}: Pick<
  ConstructionLeadFormProps,
  | "defaultProjectType"
  | "defaultTimeline"
  | "defaultBudgetRange"
  | "defaultPropertyStatus"
>): FormValues {
  return {
    ...initialValues,
    projectType: defaultProjectType ?? initialValues.projectType,
    timeline: defaultTimeline ?? initialValues.timeline,
    budgetRange: defaultBudgetRange ?? initialValues.budgetRange,
    propertyStatus: defaultPropertyStatus ?? initialValues.propertyStatus,
  };
}

function TextInput({
  label,
  idPrefix,
  value,
  error,
  required,
  type = "text",
  placeholder,
  onChange,
}: {
  label: string;
  idPrefix: string;
  value: string;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  const id = `construction-${idPrefix}-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <label className="grid min-w-0 gap-2" htmlFor={id}>
      <span className="text-sm font-semibold text-[#4d4538]">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        aria-invalid={Boolean(error)}
        className={cn(
          "min-h-11 w-full min-w-0 border bg-white px-4 text-sm outline-none transition focus:ring-4",
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-100"
            : "border-[#cfc6b8] focus:border-[#9b7334] focus:ring-[#d9b56d]/25",
        )}
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
      {error && <span className="text-xs font-semibold text-red-600">{error}</span>}
    </label>
  );
}

function SelectInput({
  label,
  idPrefix,
  value,
  options,
  onChange,
}: {
  label: string;
  idPrefix: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const id = `construction-${idPrefix}-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <label className="grid min-w-0 gap-2" htmlFor={id}>
      <span className="text-sm font-semibold text-[#4d4538]">{label}</span>
      <select
        className="min-h-11 w-full min-w-0 border border-[#cfc6b8] bg-white px-4 text-sm outline-none transition focus:border-[#9b7334] focus:ring-4 focus:ring-[#d9b56d]/25"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function validateValues(values: FormValues, mode: ConstructionLeadFormProps["mode"]) {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Completeaza numele.";
  }

  if (!validatePhone(values.phone)) {
    errors.phone = "Introdu un numar de telefon valid.";
  }

  if (mode === "full" && !validateEmail(values.email)) {
    errors.email = "Introdu o adresa de email valida.";
  }

  if (mode === "quick" && values.email.trim() && !validateEmail(values.email)) {
    errors.email = "Emailul este optional, dar trebuie sa fie valid daca il completezi.";
  }

  if (values.location.trim().length < 2) {
    errors.location = "Completeaza zona lucrarii.";
  }

  return errors;
}

function buildLeadPayload(
  values: FormValues,
  sourcePage: string,
  mode: ConstructionLeadFormProps["mode"],
): LeadPayload {
  const attribution = getLeadAttribution();
  const email = values.email.trim();
  const generatedSummary = [
    `Tip lucrare: ${values.projectType}`,
    `Zona: ${values.location}`,
    `Buget: ${values.budgetRange}`,
    `Termen: ${values.timeline}`,
    `Stadiu: ${values.propertyStatus}`,
    email ? `Email: ${email}` : "Email: necompletat, contact principal telefonic",
    attribution.gclid ? `Google Click ID: ${attribution.gclid}` : "",
    attribution.ttclid ? `TikTok Click ID: ${attribution.ttclid}` : "",
    attribution.tiktokTraffic === "true" ? "Sursa TikTok: da" : "",
    attribution.utm_campaign ? `Campanie: ${attribution.utm_campaign}` : "",
    values.message ? `Detalii: ${values.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    sourceTool: "constructii-zescorp-site",
    sourcePage,
    inquiryType: "constructii-rezidentiale",
    projectType: values.projectType,
    name: values.name.trim(),
    email,
    phone: values.phone.trim(),
    urgency: values.timeline,
    message: values.message.trim() || undefined,
    generatedBudgetRange: values.budgetRange,
    generatedComplexity: "residential-construction",
    generatedRiskLevel: values.timeline === "Urgent" ? "ridicat" : "mediu",
    generatedSummary,
    timestamp: new Date().toISOString(),
    metadata: {
      ...attribution,
      location: values.location.trim(),
      budgetRange: values.budgetRange,
      timeline: values.timeline,
      propertyStatus: values.propertyStatus,
      vertical: "constructii-rezidentiale",
      recommendedServices: values.projectType,
      formMode: mode ?? "full",
      emailOptional: mode === "quick" ? "true" : "false",
      emailProvided: email ? "true" : "false",
    },
  };
}

function getLeadAttribution() {
  const attribution: Record<string, string> = {};

  if (typeof window === "undefined") {
    return attribution;
  }

  const params = new URLSearchParams(window.location.search);
  const trackedKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "gbraid",
    "wbraid",
    "fbclid",
    "msclkid",
    "ttclid",
  ];

  for (const key of trackedKeys) {
    const value = params.get(key);

    if (value) {
      attribution[key] = value.slice(0, 240);
    }
  }

  attribution.currentUrl = window.location.href.slice(0, 500);
  attribution.currentPath = window.location.pathname;

  try {
    const landingKey = "zes_construct_landing_page";
    const storedLanding = window.sessionStorage.getItem(landingKey);
    const landingUrl = storedLanding || window.location.href;

    if (storedLanding) {
      attribution.landingPage = storedLanding.slice(0, 500);
    } else {
      window.sessionStorage.setItem(landingKey, window.location.href);
      attribution.landingPage = window.location.href.slice(0, 500);
    }

    const landingParams = new URL(landingUrl).searchParams;

    for (const key of trackedKeys) {
      const value = landingParams.get(key);

      if (!value) continue;

      attribution[`landing_${key}`] = value.slice(0, 240);

      if (!attribution[key]) {
        attribution[key] = value.slice(0, 240);
      }
    }
  } catch {
    attribution.landingPage = window.location.href.slice(0, 500);
  }

  if (document.referrer) {
    attribution.referrer = document.referrer.slice(0, 500);
  }

  const paidSignals = ["gclid", "gbraid", "wbraid", "msclkid", "ttclid"];
  const medium = attribution.utm_medium?.toLowerCase() ?? "";
  const source = attribution.utm_source?.toLowerCase() ?? "";
  attribution.paidTraffic =
    paidSignals.some((key) => Boolean(attribution[key])) ||
    ["cpc", "ppc", "paid", "paid_search", "paid-social", "paid_social"].some((token) =>
      medium.includes(token),
    ) ||
    ["google", "googleads", "ads"].some((token) => source.includes(token))
      ? "true"
      : "false";
  attribution.tiktokTraffic =
    attribution.ttclid || source.includes("tiktok") || medium.includes("tiktok")
      ? "true"
      : "false";
  attribution.leadIntent =
    attribution.paidTraffic === "true" ||
    attribution.tiktokTraffic === "true" ||
    window.location.pathname.includes("deviz") ||
    window.location.pathname.includes("oferta")
      ? "high"
      : "standard";

  return attribution;
}

function buildFollowUpWhatsappHref(sourcePage: string) {
  const isTikTokLead = sourcePage.toLowerCase().includes("tiktok");
  const message = isTikTokLead
    ? "Buna, am trimis formularul de pe pagina TikTok ZES Construct. Vreau sa trimit referinta video si poze pentru lucrare."
    : "Buna, am trimis formularul ZES Construct. Vreau sa trimit poze pentru evaluarea lucrarii.";

  return `${companyContact.whatsappHref}?text=${encodeURIComponent(message)}`;
}

function trackLeadSubmit(detail: Record<string, string>) {
  if (typeof window === "undefined") return;

  const eventPayload = {
    event: "construction_lead_submit",
    lead_vertical: "constructii-rezidentiale",
    ...detail,
    ...getLeadAttribution(),
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventPayload);
  window.dispatchEvent(
    new CustomEvent("zes-construction-lead", {
      detail: eventPayload,
    }),
  );
}

function trackLeadSubmitAttempt(detail: Record<string, string>) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "construction_lead_submit_attempt",
    lead_vertical: "constructii-rezidentiale",
    ...detail,
    ...getLeadAttribution(),
  });
}

function trackLeadSubmitError(detail: Record<string, string>) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "construction_lead_submit_error",
    lead_vertical: "constructii-rezidentiale",
    ...detail,
    ...getLeadAttribution(),
  });
}
