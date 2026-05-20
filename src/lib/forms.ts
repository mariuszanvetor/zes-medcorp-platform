import type { LeadPayload } from "@/lib/lead-types";

export type FormErrorMap = Record<string, string>;

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phonePattern = /^[+()0-9\s.-]{7,20}$/;

export function normalizeString(value: FormDataEntryValue | string | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateEmail(email: string) {
  return emailPattern.test(email.trim());
}

export function validatePhone(phone: string) {
  return phonePattern.test(phone.trim());
}

export function validateLeadPayload(payload: LeadPayload): FormErrorMap {
  const errors: FormErrorMap = {};

  if (!payload.name || payload.name.trim().length < 2) {
    errors.name = "Completează numele.";
  }

  if (!validateEmail(payload.email)) {
    errors.email = "Introdu o adresă de email validă.";
  }

  if (!validatePhone(payload.phone)) {
    errors.phone = "Introdu un număr de telefon valid.";
  }

  if (!payload.sourceTool) {
    errors.sourceTool = "Lipsește sursa formularului.";
  }

  if (!payload.sourcePage) {
    errors.sourcePage = "Lipsește pagina sursă.";
  }

  return errors;
}

export function hasFormErrors(errors: FormErrorMap) {
  return Object.keys(errors).length > 0;
}

export function createLeadPayload({
  sourceTool,
  sourcePage,
  inquiryType,
  values,
  generatedSummary,
  generatedBudgetRange,
  generatedRiskLevel,
  generatedComplexity,
}: {
  sourceTool: string;
  sourcePage: string;
  inquiryType: string;
  values: Record<string, string>;
  generatedSummary?: string;
  generatedBudgetRange?: string;
  generatedRiskLevel?: string;
  generatedComplexity?: string;
}): LeadPayload {
  const metadata = Object.fromEntries(
    Object.entries(values).filter(
      ([key]) =>
        ![
          "name",
          "email",
          "phone",
          "company",
          "message",
          "projectType",
          "urgency",
          "inquiryType",
        ].includes(key),
    ),
  );

  return {
    sourceTool,
    sourcePage,
    inquiryType: values.inquiryType || inquiryType,
    projectType: values.projectType || undefined,
    name: values.name,
    email: values.email,
    phone: values.phone,
    company: values.company || undefined,
    urgency: values.urgency || undefined,
    message: values.message || undefined,
    generatedSummary,
    generatedBudgetRange,
    generatedRiskLevel,
    generatedComplexity,
    timestamp: new Date().toISOString(),
    metadata: Object.keys(metadata).length ? metadata : undefined,
  };
}
