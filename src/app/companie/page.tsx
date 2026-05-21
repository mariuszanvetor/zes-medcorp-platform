import type { Metadata } from "next";

import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { companyContact } from "@/lib/brand";
import { createWebsiteMetadata } from "@/lib/seo";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Companie ZES MEDCORP | Partener tehnic pentru proiecte medicale",
  description:
    "ZES MEDCORP este partener tehnic pentru infrastructură medicală, imagistică, IVD, RF shielding, protecție radiologică, modernizare și service.",
  path: "/companie",
});

const pillars = [
  "Infrastructură medicală",
  "Radiologie și imagistică",
  "RF shielding pentru RMN",
  "Protecție radiologică pentru CT/RX",
  "Aparatură medicală",
  "IVD și laborator",
  "Integrare echipamente",
  "Service și mentenanță",
];

const approach = [
  {
    title: "Planificare înainte de execuție",
    body: "Proiectele sunt evaluate prin prisma spațiului, aparaturii, fluxurilor, autorizărilor și continuității operaționale.",
  },
  {
    title: "Separare tehnică corectă",
    body: "RF shielding pentru RMN și protecția radiologică pentru CT/RX sunt tratate ca discipline diferite, cu riscuri și verificări diferite.",
  },
  {
    title: "Implementare orientată spre operare",
    body: "Alegerea și integrarea echipamentelor sunt corelate cu accesul de service, mentenanța, instalațiile și documentația disponibilă.",
  },
];

export default function CompanyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          { name: "Companie", href: "/companie" },
        ]}
      />

      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f7fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <Eyebrow tone="graphite">Companie</Eyebrow>
              <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.04] text-balance text-slate-950 sm:text-6xl">
                Partener tehnic pentru proiecte medicale complexe.
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-600">
                {companyContact.legalName} susține proiecte de infrastructură
                medicală, imagistică, IVD, ecranare, modernizare și service prin
                planificare tehnică, coordonare și suport de implementare.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <TrackedButtonLink
                  href="/project-intake"
                  size="lg"
                  tracking={{
                    ctaLabel: "Pregătiți proiectul",
                    destination: "/project-intake",
                    sourcePage: "/companie",
                  }}
                >
                  Pregătiți proiectul
                </TrackedButtonLink>
                <TrackedButtonLink
                  href="/contact"
                  size="lg"
                  tracking={{
                    ctaLabel: "Discutați cu echipa",
                    destination: "/contact",
                    sourcePage: "/companie",
                  }}
                  variant="secondary"
                >
                  Discutați cu echipa
                </TrackedButtonLink>
              </div>
            </div>

            <Card className="border-blue-100 bg-white" padding="lg">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
                Date companie
              </p>
              <dl className="mt-6 grid gap-4 text-sm leading-6">
                <CompanyMeta label="Denumire" value={companyContact.legalName} />
                <CompanyMeta label="CUI" value={companyContact.cui} />
                <CompanyMeta
                  label="Nr. Reg. Com."
                  value={companyContact.tradeRegister}
                />
                <CompanyMeta label="Sediu" value={companyContact.address.full} />
                <CompanyMeta label="Email" value={companyContact.email} />
                <CompanyMeta label="Telefon" value={companyContact.phone} />
              </dl>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
            <div>
              <Eyebrow>Poziționare</Eyebrow>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950">
                ZES nu este o clinică. ZES este un partener de infrastructură și
                tehnologie medicală.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Rolul platformei este să clarifice proiecte înainte de decizii
                costisitoare: spațiu, echipamente, ecranare, autorizări, service
                și pași de implementare.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <div
                  className="rounded-2xl border border-blue-100 bg-[#f7fbff] p-5 text-base font-semibold leading-7 text-slate-700"
                  key={pillar}
                >
                  {pillar}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f7fafc]" spacing="lg" tone="transparent">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Abordare tehnică</Eyebrow>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950">
              Consultanță aplicată, nu promisiuni generice.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Pentru proiecte reale, concluziile se formulează după verificarea
              planurilor, echipamentelor, amplasamentului, documentației și
              constrângerilor operaționale.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {approach.map((item) => (
              <Card className="border-blue-100 bg-white" key={item.title} padding="lg">
                <Badge variant="blue">Validare</Badge>
                <h3 className="mt-5 text-2xl font-semibold leading-tight text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

function CompanyMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 font-semibold text-slate-950">{value}</dd>
    </div>
  );
}
