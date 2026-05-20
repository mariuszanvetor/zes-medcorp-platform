import type { Metadata } from "next";

import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { ProjectAdvisorForm } from "@/components/ai/ProjectAdvisorForm";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { createWebsiteMetadata } from "@/lib/seo";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Consultant AI pentru proiecte medicale | ZES MEDCORP",
  description:
    "Instrument de orientare pentru proiecte medicale: infrastructură, aparatură, imagistică, IVD, ecranare, service, bugete orientative și pași următori.",
  path: "/ai-project-advisor",
  keywords: [
    "consultant AI proiecte medicale",
    "analiză tehnică infrastructură medicală",
    "radiologie",
    "ecranare RF",
    "aparatură medicală",
    "imagistică medicală",
    "IVD",
    "proiecte medicale turnkey",
  ],
});

export default function AIProjectAdvisorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          { name: "Consultant AI", href: "/ai-project-advisor" },
        ]}
      />
      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-16">
            <div className="max-w-3xl">
              <Eyebrow>AI Project Advisor</Eyebrow>
              <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.04] text-balance text-slate-950 sm:text-6xl">
                Consultant AI pentru proiecte medicale
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
                Descrie proiectul, iar ZES îți oferă o primă analiză tehnică
                asistată pentru infrastructură, radiologie, imagistică, IVD,
                aparatură, ecranare, service și pașii următori.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <TrackedButtonLink
                  href="/ai-project-advisor#advisor"
                  size="lg"
                  tracking={{
                    ctaLabel: "Începe analiza preliminară",
                    destination: "/ai-project-advisor#advisor",
                    sourcePage: "/ai-project-advisor",
                    sourceTool: "ai-project-advisor",
                  }}
                >
                  Începe analiza preliminară
                </TrackedButtonLink>
                <TrackedButtonLink
                  href="/contact"
                  size="lg"
                  tracking={{
                    ctaLabel: "Discutați proiectul",
                    destination: "/contact",
                    sourcePage: "/ai-project-advisor",
                    sourceTool: "ai-project-advisor",
                  }}
                  variant="secondary"
                >
                  Discutați proiectul
                </TrackedButtonLink>
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-blue-100 bg-white p-8 shadow-[0_24px_80px_rgba(0,87,184,0.10)]">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                Orientare preliminară
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Instrumentul ordonează informațiile inițiale și arată ce trebuie
                validat înainte de buget, achiziții sau execuție.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        className="bg-slate-950"
        id="advisor"
        tone="graphite"
      >
        <Container>
          <ProjectAdvisorForm />
        </Container>
      </Section>
    </>
  );
}
