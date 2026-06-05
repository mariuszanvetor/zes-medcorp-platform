"use client";

import { LeadCaptureForm, type LeadFormExtraField } from "@/components/forms/LeadCaptureForm";

type MaintenanceLeadFormProps = {
  inquiryType: string;
  sourcePage: string;
  title?: string;
  description?: string;
  generatedSummary?: string;
};

const maintenanceFields: LeadFormExtraField[] = [
  { id: "city", label: "Oras", required: true, placeholder: "Ex: Bucuresti" },
  {
    id: "equipmentCount",
    label: "Numar echipamente",
    options: ["1-3", "4-10", "11-25", "Peste 25", "Inca nu stim"],
    type: "select",
  },
  {
    id: "equipmentCategory",
    label: "Categorie principala",
    options: [
      "Imagistica",
      "Radiologie digitala",
      "Ecografe",
      "Laborator / IVD",
      "Inventar multimarca",
      "Alta categorie",
    ],
    type: "select",
  },
  {
    id: "locations",
    label: "Locatii",
    options: ["1 locatie", "2-3 locatii", "4+ locatii", "Inca nu stim"],
    type: "select",
  },
  {
    id: "urgency",
    label: "Prioritate",
    options: [
      "Planificare contract",
      "Avem downtime recurent",
      "Contract existent expira",
      "Caz urgent / echipament indisponibil",
    ],
    type: "select",
  },
  {
    id: "inventoryNotes",
    label: "Inventar / context",
    placeholder: "Ex: 2 ecografe, 1 RX digital, 1 analizator",
  },
];

export function MaintenanceLeadForm({
  inquiryType,
  sourcePage,
  title = "Solicita evaluare pentru contract de mentenanta.",
  description = "Trimite inventarul aproximativ si nivelul de prioritate. Echipa ZESCORP poate propune un plan de mentenanta si urmatorii pasi comerciali.",
  generatedSummary = "Solicitare pentru evaluarea unui contract de mentenanta aparatura medicala.",
}: MaintenanceLeadFormProps) {
  return (
    <LeadCaptureForm
      description={description}
      extraFields={maintenanceFields}
      eyebrow="Evaluare mentenanta"
      generatedSummary={generatedSummary}
      inquiryType={inquiryType}
      sourcePage={sourcePage}
      sourceTool="maintenance-contracts"
      submitLabel="Solicita evaluare mentenanta"
      successDescription="Echipa ZESCORP poate continua cu clarificarea inventarului, nivelul de service si oferta preliminara pentru contract."
      successTitle="Solicitarea de mentenanta a fost transmisa."
      summary={{
        projectType: inquiryType,
        nextStep: "Evaluare inventar, criticitate si nivel de service.",
      }}
      title={title}
      tone="dark"
    />
  );
}
