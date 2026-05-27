import type { Metadata } from "next";
import { Suspense } from "react";

import { DiscoveryWorkspace } from "@/components/ai/DiscoveryWorkspace";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { createWebsiteMetadata } from "@/lib/seo";

export const metadata: Metadata = createWebsiteMetadata({
  title: "ZES AI Copilot Discovery | Planificare proiect medical asistata",
  description:
    "Asistent ghidat pentru proiecte medicale, aparatura, infrastructura, imagistica, laborator, HVAC, electric si modernizare clinica.",
  path: "/ai-discovery",
  keywords: [
    "AI discovery proiect medical",
    "planificare proiect medical asistata",
    "infrastructura medicala AI",
    "aparatura medicala planificare",
    "modernizare clinica",
    "laborator IVD",
    "imagistica medicala",
  ],
});

export default function AiDiscoveryPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasa", href: "/" },
          { name: "AI Discovery", href: "/ai-discovery" },
        ]}
      />

      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f7fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <Eyebrow tone="graphite">ZES AI Copilot / guided planning</Eyebrow>
            <h1 className="mt-7 text-4xl font-semibold leading-[1.04] text-balance text-slate-950 sm:text-6xl">
              ZES AI Copilot pentru proiecte medicale
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-slate-600">
              Planificare ghidata cu ZES pentru infrastructura medicala, aparatura,
              imagistica, laborator, HVAC, electric, modernizare clinica si fluxuri operationale.
            </p>
            <div className="mx-auto mt-9 grid max-w-4xl gap-3 text-left sm:grid-cols-3">
              {[
                "Intrebari adaptive ZES pe domeniu",
                "Recomandari preliminare cu framing de validare",
                "Handoff sigur catre analiza tehnica",
              ].map((item) => (
                <div
                  className="rounded-lg border border-blue-100 bg-white p-4 text-sm font-semibold leading-6 text-slate-700 shadow-[0_10px_32px_rgba(0,87,184,0.045)]"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mx-auto mt-6 max-w-4xl rounded-lg border border-blue-100 bg-white p-4 text-left shadow-[0_10px_28px_rgba(0,87,184,0.06)]">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                ZES Guide entry
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                Daca preferi o discutie scurta, deschide{" "}
                <a className="font-semibold text-[#0057b8] underline decoration-blue-200 underline-offset-4" href="/#zes-guide">
                  Discuta cu ZES
                </a>{" "}
                si primesti direct recomandari consultative, apoi continui cu AI Discovery, Proposal Builder sau Project Intake.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f7fafc]" spacing="xl" tone="transparent">
        <Container>
          <Suspense fallback={null}>
            <DiscoveryWorkspace />
          </Suspense>
        </Container>
      </Section>
    </>
  );
}
