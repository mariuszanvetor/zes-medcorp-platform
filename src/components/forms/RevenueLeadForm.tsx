"use client";

import { LeadCaptureForm, type LeadFormExtraField } from "@/components/forms/LeadCaptureForm";
import type { RevenueLandingPage } from "@/data/revenue-landing-pages";

const projectFields: LeadFormExtraField[] = [
  { id: "city", label: "Oraș", required: true, placeholder: "Ex: București" },
  {
    id: "projectStage",
    label: "Stadiu proiect",
    options: ["Explorare", "Planificare", "Bugetare", "Implementare apropiată"],
    type: "select",
  },
  {
    id: "siteType",
    label: "Tip spațiu",
    options: ["Spațiu existent", "Construcție nouă", "Relocare", "Încă nu este stabilit"],
    type: "select",
  },
  {
    id: "urgency",
    label: "Termen orientativ",
    options: ["De clarificat", "Sub 1 lună", "1-3 luni", "3-6 luni", "Peste 6 luni"],
    type: "select",
  },
];

const equipmentFields: LeadFormExtraField[] = [
  { id: "city", label: "Oraș", required: true, placeholder: "Ex: București" },
  { id: "equipmentNeed", label: "Echipament / aplicație", required: true, placeholder: "Ex: ecograf cardiologie" },
  {
    id: "urgency",
    label: "Termen achiziție",
    options: ["De clarificat", "Sub 1 lună", "1-3 luni", "3-6 luni", "Peste 6 luni"],
    type: "select",
  },
  {
    id: "budgetStage",
    label: "Buget",
    options: ["În evaluare", "Buget aprobat", "Cerere de ofertă", "Necesită consultanță"],
    type: "select",
  },
];

const serviceFields: LeadFormExtraField[] = [
  { id: "city", label: "Oraș", required: true, placeholder: "Ex: București" },
  { id: "equipmentNeed", label: "Echipament / inventar", required: true, placeholder: "Ex: monitor funcții vitale" },
  {
    id: "urgency",
    label: "Prioritate",
    options: ["De clarificat", "Planificată", "Importantă", "Urgentă - echipament indisponibil"],
    type: "select",
  },
  { id: "equipmentModel", label: "Marcă / model", placeholder: "Dacă este disponibil" },
];

export function RevenueLeadForm({ page }: { page: RevenueLandingPage }) {
  const extraFields =
    page.pillar === "medical-infrastructure"
      ? projectFields
      : page.pillar === "medical-equipment"
        ? equipmentFields
        : serviceFields;

  return (
    <LeadCaptureForm
      description={page.leadDescription}
      extraFields={extraFields}
      eyebrow="Solicitare comercială"
      generatedSummary={`${page.title}. Interes inițial transmis din pagina comercială dedicată.`}
      inquiryType={page.title}
      sourcePage={`/solutii-medicale/${page.slug}`}
      sourceTool={`revenue-landing-${page.pillar}`}
      submitLabel="Trimite solicitarea către ZESCORP"
      successDescription="Echipa ZESCORP poate continua cu întrebări aplicate, clarificarea documentelor și următorul pas comercial potrivit."
      successTitle="Solicitarea a fost transmisă pentru evaluare preliminară."
      summary={{
        projectType: page.title,
        nextStep: "Verificare umană și contact tehnico-comercial.",
      }}
      title={page.leadTitle}
      tone="dark"
    />
  );
}
