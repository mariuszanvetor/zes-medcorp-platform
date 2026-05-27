"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import {
  createMockDocumentParsingResult,
  type FutureDocumentDescriptor,
  type MockDocumentParsingResult,
} from "@/lib/ai-intelligence/document-intelligence";
import type { IntelligenceInput } from "@/lib/ai-intelligence/types";
import { cn } from "@/lib/utils";

type MockDocumentOption = {
  id: string;
  label: string;
  description: string;
  descriptor: FutureDocumentDescriptor;
};

const mockDocumentOptions: MockDocumentOption[] = [
  {
    id: "pdf-room-plan",
    label: "Plan camera PDF",
    description: "Simuleaza un plan exportat sau o fisa PDF pentru camera/echipament.",
    descriptor: {
      fileName: "plan-camera-rmn-demo.pdf",
      mimeType: "application/pdf",
      sizeBytes: 4.2 * 1024 * 1024,
    },
  },
  {
    id: "docx-brief",
    label: "Brief proiect DOCX",
    description: "Simuleaza un document Word cu cerinte, note si intrebari de proiect.",
    descriptor: {
      fileName: "brief-proiect-medical-demo.docx",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      sizeBytes: 1.6 * 1024 * 1024,
    },
  },
  {
    id: "xlsx-equipment",
    label: "Lista echipamente XLSX",
    description: "Simuleaza un tabel cu echipamente, camere, cantitati sau bugete orientative.",
    descriptor: {
      fileName: "lista-echipamente-demo.xlsx",
      mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      sizeBytes: 2.1 * 1024 * 1024,
    },
  },
  {
    id: "image-space",
    label: "Fotografie / screenshot",
    description: "Simuleaza o fotografie de spatiu sau captura de plan, fara analiza vizuala reala.",
    descriptor: {
      fileName: "foto-spatiu-demo.jpg",
      mimeType: "image/jpeg",
      sizeBytes: 3.4 * 1024 * 1024,
    },
  },
];

export function DiscoveryMockDocumentPanel({
  context,
  onChange,
}: {
  context: IntelligenceInput;
  onChange: (result: MockDocumentParsingResult | null) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedOption = mockDocumentOptions.find((option) => option.id === selectedId) ?? null;
  const result = useMemo(
    () =>
      selectedOption
        ? createMockDocumentParsingResult(selectedOption.descriptor, context)
        : null,
    [context, selectedOption],
  );

  function selectOption(option: MockDocumentOption) {
    setSelectedId(option.id);
    onChange(createMockDocumentParsingResult(option.descriptor, context));
  }

  function clearSelection() {
    setSelectedId(null);
    onChange(null);
  }

  return (
    <section className="rounded-lg border border-blue-100 bg-white p-5 shadow-[0_12px_36px_rgba(0,87,184,0.055)] sm:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
            Document parsing mock
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
            Simuleaza context documentar, fara upload real.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            Alege un descriptor demo pentru a vedea ce tip de context ar putea fi
            extras intr-o etapa viitoare. Nu exista camp de incarcare, nu se
            citesc fisiere, nu se face OCR si nu se salveaza documente.
          </p>
        </div>
        <Badge variant="neutral">mock/demo only</Badge>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {mockDocumentOptions.map((option) => {
          const active = selectedId === option.id;

          return (
            <button
              className={cn(
                "rounded-lg border p-4 text-left transition",
                active
                  ? "border-blue-300 bg-[#f0f7ff] shadow-[0_18px_50px_rgba(0,87,184,0.10)]"
                  : "border-blue-100 bg-[#f7fbff] hover:border-blue-200 hover:bg-white",
              )}
              key={option.id}
              onClick={() => selectOption(option)}
              type="button"
            >
              <span className="block text-sm font-semibold text-slate-950">
                {option.label}
              </span>
              <span className="mt-2 block text-xs leading-6 text-slate-600">
                {option.description}
              </span>
            </button>
          );
        })}
      </div>

      {result && (
        <div className="mt-6 rounded-lg border border-blue-100 bg-[#f7fbff] p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                Context extras mock
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-950">
                {result.fileType.toUpperCase()} · {result.mode}
              </p>
            </div>
            <button
              className="text-sm font-bold text-[#0057b8] transition hover:text-blue-950"
              onClick={clearSelection}
              type="button"
            >
              Sterge descriptorul mock
            </button>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <PreviewList title="Semnale posibile" items={result.mockSignals} />
            <PreviewList title="Informatii lipsa" items={result.missingInformation} />
            <PreviewList title="Fluxuri tinta" items={result.contextTargets} />
            <PreviewList title="Privacy / avertizari" items={[...result.privacyNotes, ...result.warnings]} />
          </div>

          <p className="mt-5 rounded-lg border border-white bg-white p-4 text-sm font-semibold leading-7 text-slate-700">
            Pas sugerat: {result.suggestedNextAction}
          </p>
        </div>
      )}
    </section>
  );
}

function PreviewList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-blue-100 bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
        {title}
      </p>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
        {items.slice(0, 6).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
