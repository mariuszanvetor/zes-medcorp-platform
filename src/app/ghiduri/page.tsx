import Link from "next/link";
import type { Metadata } from "next";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { seoClusters } from "@/data/seo-clusters";
import { createWebsiteMetadata } from "@/lib/seo";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Ghiduri pentru investitii medicale | ZESCORP",
  description:
    "Ghiduri ZESCORP pentru costuri RMN, CT, radiologie, radioprotectie, RF shielding, clinici si centre de imagistica.",
  path: "/ghiduri",
  keywords: [
    "ghiduri investitii medicale",
    "cost RMN",
    "cost CT",
    "cost radioprotectie",
    "RF shielding",
  ],
});

export default function GhiduriHubPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasa", href: "/" },
          { name: "Ghiduri", href: "/ghiduri" },
        ]}
      />
      <main>
        <Section
          className="bg-[linear-gradient(135deg,#04152d_0%,#062a55_58%,#0b3f78_100%)]"
          spacing="xl"
          tone="transparent"
        >
          <Container>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
              Biblioteca pentru decizii medicale
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
              Ghiduri comerciale pentru investitii, infrastructura si echipamente medicale.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-100">
              Costuri, riscuri, documentatie si pasi de implementare pentru RMN,
              CT, radiologie, radioprotectie, RF shielding, service si centre de
              imagistica.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold text-[#0057b8] transition hover:bg-blue-50"
                href="/calculatoare/investitie-centru-imagistica"
              >
                Calculeaza costul investitiei
              </Link>
              <Link
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-bold text-white transition hover:bg-white/10"
                href="/contact"
              >
                Solicita analiza proiect
              </Link>
            </div>
          </Container>
        </Section>

        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {seoClusters.map((guide) => (
                <Link
                  className="rounded-3xl border border-blue-100 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] transition hover:border-blue-200 hover:bg-blue-50"
                  href={`/ghiduri/${guide.slug}`}
                  key={guide.slug}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                    {guide.category}
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-950">
                    {guide.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {guide.description}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}
