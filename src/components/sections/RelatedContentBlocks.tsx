import Link from "next/link";

import { Card } from "@/components/ui/Card";
import type { RelatedContentSection } from "@/lib/internal-linking";

type RelatedContentBlocksProps = {
  sections: RelatedContentSection[];
};

const roleLabels: Record<string, string> = {
  "primary-service": "Serviciu principal",
  "supporting-service": "Serviciu conex",
  calculator: "Calculator",
  tool: "Instrument",
  guide: "Ghid",
  article: "Articol",
  service: "Serviciu",
  glossary: "Glosar",
  contact: "Contact",
};

export function RelatedContentBlocks({ sections }: RelatedContentBlocksProps) {
  if (!sections.length) {
    return null;
  }

  return (
    <div className="grid gap-8">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
          Resurse conectate semantic
        </p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
          Continua pe traseul tehnic potrivit.
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-600">
          Recomandarile sunt grupate dupa etapa de proiect, echipament,
          intentie si risc tehnic, pentru a evita linkurile repetitive.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {sections.map((section) => (
          <Card
            className="border-blue-100 bg-white"
            key={section.title}
            padding="lg"
          >
            <h3 className="text-xl font-semibold leading-tight text-slate-950">
              {section.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {section.description}
            </p>
            <div className="mt-6 grid gap-3">
              {section.links.map((link) => (
                <Link
                  className="group rounded-2xl border border-slate-200 bg-[#f8fbff] p-4 transition hover:border-blue-200 hover:bg-white hover:shadow-[0_18px_45px_rgba(0,87,184,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  href={link.href}
                  key={link.href}
                >
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#0057b8]">
                    {roleLabels[link.role] ?? "Resursa"}
                  </span>
                  <span className="mt-2 block text-base font-semibold leading-6 text-slate-950 transition group-hover:text-[#0057b8]">
                    {link.label}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">
                    {link.reason}
                  </span>
                </Link>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
