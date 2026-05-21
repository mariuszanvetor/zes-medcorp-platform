import type { Metadata } from "next";

import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { ProjectIntakeWizard } from "@/components/ai/ProjectIntakeWizard";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { EnterpriseTrustBand } from "@/components/sections/EnterpriseTrustBand";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { createWebsiteMetadata } from "@/lib/seo";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Project Intake ZES | Pregătire analiză tehnică proiect medical",
  description:
    "Completează informațiile esențiale despre proiectul medical pentru o discuție tehnică ZES mai clară: spațiu, aparatură, radiologie, IVD, documentație și urgență.",
  path: "/project-intake",
  keywords: [
    "project intake ZES",
    "intake proiect medical",
    "analiză tehnică proiect medical",
    "pregătire consultanță medicală",
    "infrastructură medicală",
  ],
});

export default function ProjectIntakePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          { name: "Project Intake ZES", href: "/project-intake" },
        ]}
      />

      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f7fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:items-end">
            <div className="max-w-4xl">
              <Eyebrow tone="graphite">Intake tehnic</Eyebrow>
              <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.04] text-balance text-slate-950 sm:text-6xl">
                Project Intake ZES
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
                Completează informațiile esențiale despre proiect, iar ZES poate
                pregăti o discuție tehnică mai clară și mai eficientă.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <TrackedButtonLink
                  href="/project-intake#intake"
                  size="lg"
                  tracking={{
                    ctaLabel: "Completează intake-ul",
                    destination: "/project-intake#intake",
                    sourcePage: "/project-intake",
                    sourceTool: "project-intake",
                  }}
                >
                  Completează intake-ul
                </TrackedButtonLink>
                <TrackedButtonLink
                  href="/proposal-builder"
                  size="lg"
                  tracking={{
                    ctaLabel: "Generează propunere preliminară",
                    destination: "/proposal-builder",
                    sourcePage: "/project-intake",
                    sourceTool: "project-intake",
                  }}
                  variant="secondary"
                >
                  Propunere preliminară
                </TrackedButtonLink>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-blue-100 bg-white p-8 shadow-[0_24px_80px_rgba(0,87,184,0.10)]">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Pentru leaduri serioase
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Intake-ul nu produce o ofertă finală. Rolul lui este să
                ordoneze datele înainte de consultanță: tip proiect, spațiu,
                cerințe tehnice, documentație, urgență și informații lipsă.
              </p>
              <div className="mt-6 grid gap-3 text-sm font-semibold leading-6 text-slate-700">
                {[
                  "Separă RMN/RF de CT/RX/protecție radiologică.",
                  "Pregătește documentele pentru o analiză tehnică reală.",
                  "Reduce întrebările de bază din prima discuție.",
                ].map((item) => (
                  <div className="rounded-2xl bg-[#f7fbff] p-4" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <EnterpriseTrustBand
        description="Intake-ul ajută la pregătirea unei discuții mai eficiente: ce există, ce lipsește, ce trebuie verificat și ce poate afecta bugetul sau termenul."
        sourcePage="/project-intake"
        title="Leadurile serioase încep cu date structurate."
      />

      <Section className="bg-[#f7fafc]" id="intake" spacing="xl" tone="transparent">
        <Container>
          <ProjectIntakeWizard />
        </Container>
      </Section>
    </>
  );
}
