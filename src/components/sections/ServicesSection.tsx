import Link from "next/link";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getRevenueLandingGroups } from "@/data/revenue-landing-pages";

const primaryPillarHref = {
  "medical-infrastructure": "/solutii-medicale/dezvoltare-unitati-medicale",
  "medical-equipment": "/solutii-medicale/echipamente-imagistica-diagnostic",
  "service-maintenance": "/solutii-medicale/service-echipamente-medicale",
} as const;

const audienceByPillar = {
  "medical-infrastructure": "clinici noi, modernizari, camere CT/RMN/RX si laboratoare.",
  "medical-equipment": "achizitii, dotari, extinderi si integrare echipamente.",
  "service-maintenance": "interventii, contracte de mentenanta, relocari si suport tehnic.",
} as const;

const commercialLinksByPillar = {
  "medical-infrastructure": [
    { href: "/servicii/infrastructura-imagistica", label: "Infrastructura imagistica" },
    { href: "/servicii/proiectare-radiologie", label: "Proiectare radiologie" },
    { href: "/servicii/radioprotectie", label: "Radioprotectie" },
    { href: "/servicii/rf-shielding-rmn", label: "RF shielding RMN" },
    { href: "/servicii/consultanta-cncan-radiologie", label: "Consultanta CNCAN" },
  ],
  "medical-equipment": [
    { href: "/produse/rmn", label: "RMN" },
    { href: "/produse/computer-tomograf", label: "Computer tomograf" },
    { href: "/produse/ecograf", label: "Ecograf" },
    { href: "/servicii/pacs-medical", label: "PACS medical" },
    { href: "/aparatura-medicala-bucuresti", label: "Aparatura medicala București" },
  ],
  "service-maintenance": [
    { href: "/service-aparatura-medicala", label: "Service aparatura medicala" },
    { href: "/servicii/service-radiologie", label: "Service radiologie" },
    { href: "/servicii/service-computer-tomograf", label: "Service CT" },
    { href: "/servicii/service-rmn", label: "Service RMN" },
    { href: "/servicii/mentenanta-echipamente-medicale", label: "Mentenanta echipamente" },
  ],
} as const;

export function ServicesSection() {
  const groups = getRevenueLandingGroups();

  return (
    <Section className="bg-[#f7fafc]" spacing="xl" tone="transparent">
      <Container>
        <SectionHeading
          align="center"
          className="mx-auto"
          eyebrow="Ce vindem"
          title="Trei directii clare pentru proiectul tau medical."
          description="Alege zona potrivita: infrastructura, echipamente sau service. Fiecare pagina explica cui se adreseaza, ce include si cum poti cere evaluare."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {groups.map((group) => (
            <article
              className="flex min-h-[360px] flex-col rounded-2xl border border-slate-200/80 bg-white p-7 shadow-[0_20px_70px_rgba(15,23,42,0.055)] sm:p-8"
              key={group.pillar}
            >
              <div className="h-1 w-12 rounded-full bg-[#0057b8]" />
              <h2 className="mt-7 text-2xl font-semibold leading-tight text-slate-950">
                {group.label}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{group.description}</p>
              <div className="mt-6 rounded-xl bg-[#f8fbff] p-4 text-sm leading-7 text-slate-700">
                <p>
                  <span className="font-semibold text-slate-950">Pentru:</span>{" "}
                  {audienceByPillar[group.pillar]}
                </p>
                <p className="mt-2">
                  <span className="font-semibold text-slate-950">Include:</span>{" "}
                  {group.items.slice(0, 3).map((item) => item.eyebrow).join(", ")}.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {commercialLinksByPillar[group.pillar].map((link) => (
                  <Link
                    className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-semibold text-[#0057b8] transition hover:border-blue-200 hover:bg-blue-50"
                    href={link.href}
                    key={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link
                className="mt-auto inline-flex h-11 items-center justify-center rounded-xl bg-[#0057b8] px-5 text-sm font-bold text-white transition hover:bg-blue-800"
                href={primaryPillarHref[group.pillar]}
              >
                Vezi detalii
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}


