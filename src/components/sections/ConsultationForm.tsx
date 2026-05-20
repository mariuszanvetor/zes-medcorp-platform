"use client";

import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";

const categories = [
  "Construcții medicale",
  "Radiologie",
  "RF shielding",
  "Protecție radiologică",
  "Aparatură medicală",
  "Imagistică",
  "IVD / laborator",
  "Service & mentenanță",
  "Consultanță tehnică",
];

const timelines = ["Exploratoriu", "1-3 luni", "3-6 luni", "Urgent"];

export function ConsultationForm() {
  return (
    <LeadCaptureForm
      description="Completează câteva detalii despre proiect, echipamente sau problema de service. Echipa ZES poate continua apoi cu o discuție tehnică aplicată."
      extraFields={[
        {
          id: "inquiryType",
          label: "Tip solicitare",
          options: categories,
          required: true,
          type: "select",
        },
        {
          id: "urgency",
          label: "Orizont estimativ",
          options: timelines,
          type: "select",
        },
      ]}
      eyebrow="Solicitare tehnică"
      inquiryType="Contact consultation"
      sourcePage="/contact"
      sourceTool="contact"
      submitLabel="Pregătește solicitarea tehnică"
      summary={{
        nextStep: "Un consultant ZES poate continua discuția după clarificarea contextului.",
        urgency: "Selectată în formular",
      }}
      title="Trimite contextul proiectului către echipa ZES."
      tone="light"
    />
  );
}
