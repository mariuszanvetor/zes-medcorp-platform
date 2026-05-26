import type { Metadata } from "next";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { createWebsiteMetadata } from "@/lib/seo";
import { getServiceFunnelHubData } from "@/lib/service-funnel-engine";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Servicii comerciale ZES MEDCORP",
  description:
    "Pagini comerciale de servicii pentru proiectare, planificare și implementare medicală, gândite pentru trafic cu intenție mare.",
  path: "/servicii",
  keywords: [
    "servicii medicale",
    "proiectare cameră RMN",
    "proiectare cameră CT",
    "radioprotecție",
    "modernizare clinică medicală",
    "planificare infrastructură imagistică",
  ],
});

export default function ServiciiHubPage() {
  const groups = getServiceFunnelHubData();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          { name: "Servicii", href: "/servicii" },
        ]}
      />
      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f8fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <Eyebrow>Commercial funnels</Eyebrow>
            <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-semibold leading-[1.05] text-balance text-slate-950 sm:text-6xl">
              Servicii comerciale pentru proiecte medicale serioase.
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-slate-600">
              Aceste pagini sunt construite pentru trafic cu intenție mare: proiectare,
              radioprotecție, infrastructură, modernizare și implementare.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button className="rounded-full px-7" href="/proposal-builder" size="lg">
                Proposal Builder
              </Button>
              <Button
                className="rounded-full border-blue-200 px-7 text-[#0057b8]"
                href="/project-intake"
                size="lg"
                variant="secondary"
              >
                Project Intake
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white" tone="transparent">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {groups.map((group) => (
              <Card as="section" className="border-blue-100 bg-white" key={group.category} padding="lg">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  {group.label}
                </p>
                <div className="mt-5 grid gap-4">
                  {group.items.map((item) => (
                    <div className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-4" key={item.slug}>
                      <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                        {item.title}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                      <Button className="mt-5" href={`/servicii/${item.slug}`} variant="secondary">
                        Deschide pagina
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-blue-100 bg-[#f7fbff]" tone="transparent">
        <Container>
          <Card className="border-blue-100 bg-white" padding="lg">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                  Continuitate
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                  Dacă ai deja un proiect clar, treci direct spre structurare.
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button href="/contact" variant="secondary">
                  Solicită evaluare tehnică
                </Button>
                <Button href="/ai-project-advisor">Analiză preliminară</Button>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
