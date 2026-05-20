"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  createLeadPayload,
  hasFormErrors,
  validateLeadPayload,
  type FormErrorMap,
} from "@/lib/forms";
import type {
  LeadPayload,
  LeadSubmissionState,
  LeadSummaryPreview,
} from "@/lib/lead-types";
import { trackLeadEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export type LeadFormExtraField = {
  id: string;
  label: string;
  type?: "text" | "select";
  required?: boolean;
  placeholder?: string;
  options?: string[];
};

export type LeadCaptureFormProps = {
  sourceTool: string;
  sourcePage: string;
  inquiryType: string;
  eyebrow: string;
  title: string;
  description: string;
  submitLabel: string;
  successTitle?: string;
  successDescription?: string;
  tone?: "dark" | "light";
  extraFields?: LeadFormExtraField[];
  summary?: LeadSummaryPreview;
  generatedSummary?: string;
  generatedBudgetRange?: string;
  generatedRiskLevel?: string;
  generatedComplexity?: string;
  onSubmitted?: (payload: LeadPayload) => void;
};

const baseFields: LeadFormExtraField[] = [
  { id: "name", label: "Nume", required: true },
  { id: "email", label: "Email", required: true },
  { id: "phone", label: "Telefon", required: true },
  { id: "company", label: "Companie" },
];

export function LeadCaptureForm({
  sourceTool,
  sourcePage,
  inquiryType,
  eyebrow,
  title,
  description,
  submitLabel,
  successTitle = "Solicitarea a fost pregătită.",
  successDescription = "Datele au fost verificate și pot fi folosite pentru continuarea discuției tehnice cu ZES.",
  tone = "dark",
  extraFields = [],
  summary,
  generatedSummary,
  generatedBudgetRange,
  generatedRiskLevel,
  generatedComplexity,
  onSubmitted,
}: LeadCaptureFormProps) {
  const fields = useMemo(() => [...baseFields, ...extraFields], [extraFields]);
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((field) => [field.id, field.options?.[0] ?? ""])),
  );
  const [errors, setErrors] = useState<FormErrorMap>({});
  const [status, setStatus] = useState<LeadSubmissionState>("idle");

  const isDark = tone === "dark";
  const isLoading = status === "loading";

  useEffect(() => {
    trackLeadEvent("lead_form_view", {
      sourceTool,
      sourcePage,
      inquiryType,
      estimatedBudgetRange: generatedBudgetRange,
      complexity: generatedComplexity,
      riskLevel: generatedRiskLevel,
    });
  }, [
    generatedBudgetRange,
    generatedComplexity,
    generatedRiskLevel,
    inquiryType,
    sourcePage,
    sourceTool,
  ]);

  function updateField(fieldId: string, value: string) {
    setValues((current) => ({ ...current, [fieldId]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[fieldId];
      return next;
    });
  }

  async function submitLead() {
    const payload = createLeadPayload({
      sourceTool,
      sourcePage,
      inquiryType,
      values,
      generatedSummary,
      generatedBudgetRange,
      generatedRiskLevel,
      generatedComplexity,
    });

    const validationErrors = validateLeadPayload(payload);
    trackLeadEvent("lead_form_submit_attempt", leadTrackingPayload(payload));

    for (const field of extraFields) {
      if (field.required && !values[field.id]?.trim()) {
        validationErrors[field.id] = `Completează ${field.label.toLowerCase()}.`;
      }
    }

    if (hasFormErrors(validationErrors)) {
      setErrors(validationErrors);
      setStatus("error");
      trackLeadEvent("lead_form_submit_error", {
        ...leadTrackingPayload(payload),
        status: "validation_error",
      });
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/leads", {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Lead request was not accepted.");
      }

      setStatus("success");
      trackLeadEvent("lead_form_submit_success", leadTrackingPayload(payload));
      onSubmitted?.(payload);
    } catch {
      setStatus("error");
      trackLeadEvent("lead_form_submit_error", {
        ...leadTrackingPayload(payload),
        status: "request_error",
      });
      setErrors({
        form: "Solicitarea nu a putut fi pregătită. Verifică datele și încearcă din nou.",
      });
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitLead();
  }

  return (
    <Card
      className={cn(
        isDark ? "border-cyan-300/20 bg-slate-950 text-white" : "border-blue-100 bg-white",
      )}
      padding="lg"
      variant={isDark ? "dark" : "surface"}
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p
            className={cn(
              "text-sm font-bold uppercase tracking-[0.16em]",
              isDark ? "text-cyan-100" : "text-[#0057b8]",
            )}
          >
            {eyebrow}
          </p>
          <h2
            className={cn(
              "mt-4 text-2xl font-semibold leading-tight",
              isDark ? "text-white" : "text-slate-950",
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              "mt-4 text-sm leading-7",
              isDark ? "text-slate-300" : "text-slate-600",
            )}
          >
            {description}
          </p>
          <LeadSummaryPanel summary={summary} tone={tone} />
          {status === "success" && (
            <div
              className={cn(
                "mt-5 rounded-2xl border p-5 text-sm font-semibold leading-7",
                isDark
                  ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-50"
                  : "border-blue-100 bg-blue-50 text-blue-900",
              )}
            >
              <p>{successTitle}</p>
              <p className="mt-2 font-medium">{successDescription}</p>
            </div>
          )}
          {errors.form && (
            <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm font-semibold leading-7 text-rose-800">
              {errors.form}
            </div>
          )}
        </div>

        <form className="grid gap-4" noValidate onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <LeadInput
                error={errors[field.id]}
                field={field}
                key={field.id}
                onChange={(value) => updateField(field.id, value)}
                tone={tone}
                value={values[field.id] ?? ""}
              />
            ))}
          </div>
          <LeadTextarea
            error={errors.message}
            onChange={(value) => updateField("message", value)}
            tone={tone}
            value={values.message ?? ""}
          />
          <Button
            fullWidth
            isLoading={isLoading}
            onClick={() => void submitLead()}
            size="lg"
            type="button"
          >
            {isLoading ? "Pregătim solicitarea..." : submitLabel}
          </Button>
          <p
            className={cn(
              "text-xs leading-6",
              isDark ? "text-slate-400" : "text-slate-500",
            )}
          >
            Această trimitere pregătește contextul pentru discuția tehnică. Nu
            reprezintă ofertă comercială sau validare finală de proiect.
          </p>
        </form>
      </div>
    </Card>
  );
}

function leadTrackingPayload(payload: LeadPayload) {
  return {
    sourceTool: payload.sourceTool,
    sourcePage: payload.sourcePage,
    inquiryType: payload.inquiryType,
    projectType: payload.projectType,
    estimatedBudgetRange: payload.generatedBudgetRange,
    complexity: payload.generatedComplexity,
    riskLevel: payload.generatedRiskLevel,
    urgency: payload.urgency,
  };
}

function LeadInput({
  field,
  value,
  error,
  tone,
  onChange,
}: {
  field: LeadFormExtraField;
  value: string;
  error?: string;
  tone: "dark" | "light";
  onChange: (value: string) => void;
}) {
  const isDark = tone === "dark";
  const type =
    field.id === "email" ? "email" : field.id === "phone" ? "tel" : "text";
  const inputId = `lead-${field.id}`;

  return (
    <label className="grid gap-2" htmlFor={inputId}>
      <span
        className={cn(
          "text-sm font-semibold",
          isDark ? "text-slate-200" : "text-slate-700",
        )}
      >
        {field.label}
        {field.required ? " *" : ""}
      </span>
      {field.type === "select" ? (
        <select
          aria-invalid={Boolean(error)}
          aria-required={field.required}
          className={inputClassName(tone, Boolean(error))}
          id={inputId}
          onChange={(event) => onChange(event.target.value)}
          required={field.required}
          value={value}
        >
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          aria-invalid={Boolean(error)}
          aria-required={field.required}
          className={inputClassName(tone, Boolean(error))}
          id={inputId}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          required={field.required}
          type={field.type ?? type}
          value={value}
        />
      )}
      {error && <FieldError>{error}</FieldError>}
    </label>
  );
}

function LeadTextarea({
  value,
  error,
  tone,
  onChange,
}: {
  value: string;
  error?: string;
  tone: "dark" | "light";
  onChange: (value: string) => void;
}) {
  const isDark = tone === "dark";

  return (
    <label className="grid gap-2" htmlFor="lead-message">
      <span
        className={cn(
          "text-sm font-semibold",
          isDark ? "text-slate-200" : "text-slate-700",
        )}
      >
        Mesaj opțional
      </span>
      <textarea
        aria-invalid={Boolean(error)}
        className={cn(inputClassName(tone, Boolean(error)), "min-h-32 py-3 leading-7")}
        id="lead-message"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Adaugă locație, termen, echipamente, stadiu autorizări sau constrângeri tehnice."
        value={value}
      />
      {error && <FieldError>{error}</FieldError>}
    </label>
  );
}

function LeadSummaryPanel({
  summary,
  tone,
}: {
  summary?: LeadSummaryPreview;
  tone: "dark" | "light";
}) {
  if (!summary) {
    return null;
  }

  const items = [
    ["Tip proiect", summary.projectType],
    ["Complexitate", summary.complexity],
    ["Buget", summary.budgetRange],
    ["Risc", summary.riskLevel],
    ["Urgență", summary.urgency],
    ["Next step", summary.nextStep],
  ].filter(([, value]) => value);

  if (!items.length) {
    return null;
  }

  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "mt-6 rounded-2xl border p-5",
        isDark ? "border-white/10 bg-white/[0.06]" : "border-blue-100 bg-[#f7fbff]",
      )}
    >
      <p
        className={cn(
          "text-xs font-bold uppercase tracking-[0.14em]",
          isDark ? "text-cyan-100" : "text-[#0057b8]",
        )}
      >
        Rezumat înainte de trimitere
      </p>
      <dl className="mt-4 grid gap-3">
        {items.map(([label, value]) => (
          <div className="grid gap-1" key={label}>
            <dt
              className={cn(
                "text-xs font-semibold uppercase tracking-[0.12em]",
                isDark ? "text-slate-400" : "text-slate-500",
              )}
            >
              {label}
            </dt>
            <dd
              className={cn(
                "text-sm font-semibold leading-6",
                isDark ? "text-white" : "text-slate-950",
              )}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function FieldError({ children }: { children: string }) {
  return <span className="text-xs font-semibold text-rose-600">{children}</span>;
}

function inputClassName(tone: "dark" | "light", hasError: boolean) {
  return cn(
    "min-h-12 rounded-xl border px-4 text-sm outline-none transition",
    tone === "dark"
      ? "border-white/10 bg-white/[0.06] text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:bg-white/[0.09]"
      : "border-slate-200 bg-slate-50 text-slate-950 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white",
    hasError && "border-rose-300 focus:border-rose-400",
  );
}
