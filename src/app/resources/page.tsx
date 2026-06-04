import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { companyContact } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Resources & Tools | ZESCORP",
  description:
    "Instrumente ZESCORP pentru planificare medicala: AI Discovery, Proposal Builder, Project Intake, calculatoare si Knowledge Hub.",
  alternates: {
    canonical: "/resources",
  },
};

const toolLinks = [
  {
    title: "AI Discovery",
    description: "Planificare ghidata pentru proiecte medicale si infrastructura.",
    href: "/ai-discovery",
  },
  {
    title: "Proposal Builder",
    description: "Structurare preliminara pentru cereri si propuneri tehnico-comerciale.",
    href: "/proposal-builder",
  },
  {
    title: "Project Intake",
    description: "Colectare organizata a datelor pentru proiecte medicale.",
    href: "/project-intake",
  },
  {
    title: "Calculators",
    description: "Estimari orientative pentru costuri, infrastructura si planificare.",
    href: "/calculatoare",
  },
  {
    title: "Knowledge Hub",
    description: "Articole, ghiduri si explicatii tehnice pentru decizii mai clare.",
    href: "/knowledge-hub",
  },
];

const resourceLinks = [
  { title: "Comparatii tehnice", href: "/comparatii" },
  { title: "Glosar", href: "/glosar" },
  { title: "Planificare", href: "/planificare" },
];

export default function ResourcesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasa", href: "/" },
          { name: "Resources", href: "/resources" },
        ]}
      />
      <Section className="bg-[linear-gradient(180deg,#f4f8fd_0%,#ffffff_70%)]" spacing="xl" tone="transparent">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
              Resources / Tools
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-6xl">
              Instrumente pentru proiecte medicale.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Tool-urile avansate sunt aici, dupa ce ai inteles serviciile principale:
              infrastructura medicala, echipamente si service. Foloseste-le pentru
              clarificare preliminara, apoi contacteaza echipa ZESCORP.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_18px_54px_rgba(15,65,118,0.08)]">
              <h2 className="text-2xl font-semibold text-slate-950">Tools</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Pentru utilizatori care vor sa pregateasca mai bine discutia tehnica.
              </p>
              <div className="mt-6 grid gap-3">
                {toolLinks.map((tool) => (
                  <Link
                    className="rounded-xl border border-slate-200 bg-[#f8fbff] p-4 transition hover:border-blue-200 hover:bg-blue-50"
                    href={tool.href}
                    key={tool.href}
                  >
                    <h3 className="text-lg font-semibold text-slate-950">{tool.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            <aside className="grid gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-semibold text-slate-950">Inainte de tool-uri</h2>
                <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
                  <p><span className="font-semibold text-slate-950">Ce vindem:</span> infrastructura, echipamente, service.</p>
                  <p><span className="font-semibold text-slate-950">Pentru cine:</span> clinici, centre imagistica, laboratoare, investitori.</p>
                  <p><span className="font-semibold text-slate-950">Contact:</span> formular, telefon, email sau WhatsApp.</p>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-[#f8fbff] p-6">
                <h2 className="text-xl font-semibold text-slate-950">Resurse rapide</h2>
                <div className="mt-4 grid gap-2">
                  {resourceLinks.map((resource) => (
                    <Link
                      className="rounded-lg border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-[#0057b8] transition hover:bg-blue-50"
                      href={resource.href}
                      key={resource.href}
                    >
                      {resource.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-semibold text-slate-950">Contact direct</h2>
                <div className="mt-4 grid gap-2">
                  <Link className="text-sm font-semibold text-[#0057b8]" href="/contact">
                    Solicita evaluare
                  </Link>
                  <Link className="text-sm font-semibold text-[#0057b8]" href={companyContact.phoneHref}>
                    {companyContact.phone}
                  </Link>
                  <Link className="text-sm font-semibold text-[#0057b8]" href={companyContact.emailHref}>
                    {companyContact.email}
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
