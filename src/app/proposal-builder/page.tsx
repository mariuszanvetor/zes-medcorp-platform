import type { Metadata } from "next";

import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { ProposalBuilder } from "@/components/ai/ProposalBuilder";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { BUDGET_DISCLAIMER } from "@/lib/ai-estimation";
import { createWebsiteMetadata } from "@/lib/seo";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Proposal Builder | Propunere tehnică preliminară | ZES MEDCORP",
  description:
    "Generator pentru propuneri tehnice preliminare: servicii ZES, buget orientativ, timeline, riscuri, ipoteze și pași următori pentru proiecte medicale.",
  path: "/proposal-builder",
  keywords: [
    "proposal builder proiect medical",
    "propunere tehnică infrastructură medicală",
    "buget orientativ proiect medical",
    "timeline proiect medical",
    "consultant AI ZES",
    "aparatură medicală",
    "imagistică medicală",
    "IVD",
  ],
});

export default function ProposalBuilderPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          { name: "Proposal Builder", href: "/proposal-builder" },
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
              <Eyebrow>Pre-ofertare tehnică</Eyebrow>
              <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.04] text-balance text-slate-950 sm:text-6xl">
                Proposal Builder
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
                Generează o propunere tehnică preliminară pentru proiectul tău
                medical: servicii recomandate, faze, buget orientativ, timeline
                și riscuri.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <TrackedButtonLink
                  href="/proposal-builder#proposal"
                  size="lg"
                  tracking={{
                    ctaLabel: "Generați propunerea preliminară",
                    destination: "/proposal-builder#proposal",
                    sourcePage: "/proposal-builder",
                    sourceTool: "proposal-builder",
                  }}
                >
                  Generați propunerea preliminară
                </TrackedButtonLink>
                <TrackedButtonLink
                  href="/contact"
                  size="lg"
                  tracking={{
                    ctaLabel: "Discutați propunerea",
                    destination: "/contact",
                    sourcePage: "/proposal-builder",
                    sourceTool: "proposal-builder",
                  }}
                  variant="secondary"
                >
                  Discutați propunerea
                </TrackedButtonLink>
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-blue-100 bg-white p-8 shadow-[0_24px_80px_rgba(0,87,184,0.10)]">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                Draft tehnic orientativ
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Generatorul structurează un draft pentru discuția cu ZES. Nu
                reprezintă ofertă finală și trebuie validat pe planuri, echipamente
                și condiții reale de amplasament.
              </p>
              <p className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-bold leading-7 text-blue-900">
                {BUDGET_DISCLAIMER}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-950" tone="graphite">
        <Container>
          <div id="proposal">
            <ProposalBuilder />
          </div>
        </Container>
      </Section>
    </>
  );
}
