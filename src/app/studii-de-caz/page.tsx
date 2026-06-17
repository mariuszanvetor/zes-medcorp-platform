import Link from "next/link";
import type { Metadata } from "next";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { caseStudies } from "@/data/case-studies";
import { createWebsiteMetadata } from "@/lib/seo";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Studii de caz infrastructura medicala | ZESCORP",
  description:
    "Studii de caz orientative ZESCORP pentru RMN, radiologie digitala, radioprotectie si modernizare centre de imagistica.",
  path: "/studii-de-caz",
  keywords: ["studii de caz infrastructura medicala", "RMN", "radiologie", "radioprotectie"],
});

export default function CaseStudiesHubPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasa", href: "/" },
          { name: "Studii de caz", href: "/studii-de-caz" },
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
              Autoritate proiecte
            </p>
            <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
              Studii de caz orientative pentru proiecte medicale high-ticket.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-100">
              Scenarii anonimizate si framework-uri comerciale pentru RMN, radiologie,
              radioprotectie si modernizare centre de imagistica.
            </p>
          </Container>
        </Section>
        <Section className="bg-white" spacing="lg" tone="transparent">
          <Container>
            <div className="grid gap-5 md:grid-cols-2">
              {caseStudies.map((study) => (
                <Link
                  className="rounded-3xl border border-blue-100 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] transition hover:border-blue-200 hover:bg-blue-50"
                  href={`/studii-de-caz/${study.slug}`}
                  key={study.slug}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                    {study.category}
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-950">
                    {study.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {study.description}
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
