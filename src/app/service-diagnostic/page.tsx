import type { Metadata } from "next";

import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { ServiceDiagnosticAssistant } from "@/components/ai/ServiceDiagnosticAssistant";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { createWebsiteMetadata } from "@/lib/seo";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Diagnostic service aparatură medicală | ZES MEDCORP",
  description:
    "Asistent pentru trierea problemelor de service aparatură medicală: urgență, riscuri operaționale, pași recomandați și solicitare evaluare ZES.",
  path: "/service-diagnostic",
  keywords: [
    "diagnostic service aparatură medicală",
    "service aparatură medicală",
    "mentenanță aparatură medicală",
    "service CT",
    "service RMN",
    "service RX",
    "service IVD laborator",
  ],
});

export default function ServiceDiagnosticPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          { name: "Diagnostic service", href: "/service-diagnostic" },
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
              <Eyebrow>Service Assistant</Eyebrow>
              <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.04] text-balance text-slate-950 sm:text-6xl">
                Diagnostic service aparatură medicală
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
                Descrie problema echipamentului medical, iar ZES îți oferă o primă
                orientare privind urgența, riscurile și pașii recomandați.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <TrackedButtonLink
                  href="/service-diagnostic#diagnostic"
                  size="lg"
                  tracking={{
                    ctaLabel: "Evaluați problema service",
                    destination: "/service-diagnostic#diagnostic",
                    sourcePage: "/service-diagnostic",
                    sourceTool: "service-diagnostic",
                  }}
                >
                  Evaluați problema service
                </TrackedButtonLink>
                <TrackedButtonLink
                  href="/contact"
                  size="lg"
                  tracking={{
                    ctaLabel: "Solicitați intervenție",
                    destination: "/contact",
                    sourcePage: "/service-diagnostic",
                    sourceTool: "service-diagnostic",
                  }}
                  variant="secondary"
                >
                  Solicitați intervenție
                </TrackedButtonLink>
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-blue-100 bg-white p-8 shadow-[0_24px_80px_rgba(0,87,184,0.10)]">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                Triere tehnică, nu ofertă finală
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Instrumentul oferă o primă orientare privind urgența, impactul și
                pașii de service pentru CT, RMN, RX, ecografie, monitorizare pacient
                și echipamente IVD.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f7fafc]" id="diagnostic" tone="transparent">
        <Container>
          <ServiceDiagnosticAssistant />
        </Container>
      </Section>
    </>
  );
}
