import type { Metadata } from "next";
import Link from "next/link";

import { OpenZESButton } from "@/components/ai/OpenZESButton";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getRevenueLandingGroups } from "@/data/revenue-landing-pages";
import { createWebsiteMetadata } from "@/lib/seo";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Soluții medicale: infrastructură, echipamente și service | ZESCORP",
  description:
    "Soluții comerciale ZESCORP pentru infrastructură medicală, echipamente, imagistică, laborator, service și mentenanță.",
  path: "/solutii-medicale",
  keywords: [
    "infrastructură medicală",
    "echipamente medicale",
    "service aparatură medicală",
    "mentenanță medicală",
    "amenajare clinică",
  ],
});

export default function SolutiiMedicaleHubPage() {
  const groups = getRevenueLandingGroups();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          { name: "Soluții medicale", href: "/solutii-medicale" },
        ]}
      />

      <Section className="border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f7fbff)]" spacing="xl" tone="transparent">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0057b8]">
              ZESCORP / soluții comerciale
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-6xl">
              Infrastructură medicală, echipamente și service într-un singur sistem tehnic.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Alege zona relevantă pentru proiect, achiziție sau mentenanță. Fiecare pagină te ajută să pregătești o cerere aplicată pentru echipa ZESCORP.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <OpenZESButton
                ctaLabel="Discuta cu ZES din hub solutii"
                pageIntent="medical-solutions-hub"
                prompt="Vreau să aleg soluția potrivită pentru proiectul meu medical"
                size="lg"
                sourcePage="/solutii-medicale"
              >
                Discută situația cu ZES
              </OpenZESButton>
              <Link className="inline-flex h-12 items-center justify-center rounded-xl border border-blue-200 bg-white px-6 text-base font-semibold text-[#0057b8] transition hover:bg-blue-50" href="/contact">
                Contact direct
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <SectionHeading
            align="center"
            className="mx-auto"
            eyebrow="Trei piloni comerciali"
            title="Alege punctul de pornire după obiectivul real."
            description="ZESCORP poate lucra separat pe o nevoie punctuală sau poate coordona mai mulți piloni într-un proiect medical complet."
          />
          <div className="mt-10 grid gap-7">
            {groups.map((group) => (
              <section className="border-t border-blue-100 pt-7" key={group.pillar}>
                <div className="grid gap-6 lg:grid-cols-[0.28fr_0.72fr]">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">{group.label}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{group.description}</p>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {group.items.map((item) => (
                      <Link
                        className="group rounded-xl border border-slate-200 bg-[#f8fbff] p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
                        href={`/solutii-medicale/${item.slug}`}
                        key={item.slug}
                      >
                        <h2 className="text-base font-semibold leading-7 text-slate-950 transition group-hover:text-[#0057b8]">{item.title}</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
