import type { Metadata } from "next";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { companyContact } from "@/lib/brand";
import { createWebsiteMetadata } from "@/lib/seo";
import { corporateVisuals } from "@/lib/visual-assets";
import Image from "next/image";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Proiecte si capabilitati tehnice | ZES MEDCORP",
  description:
    "Tipuri de proiecte medicale in care ZESCORP poate sustine infrastructura, aparatura, radiologie, RF shielding, protectie radiologica, IVD si service.",
  path: "/projects",
  keywords: [
    "proiecte medicale",
    "capabilitati tehnice medicale",
    "camera RMN RF shielding",
    "camera CT protectie radiologica",
    "laborator IVD",
    "service aparatura medicala",
  ],
});

const filters = ["Infrastructura", "Radiologie", "Shielding", "Aparatura", "IVD", "Service"];

const projectScenarios = [
  {
    type: "Clinica medicala turnkey",
    category: "Infrastructura",
    challenge:
      "Coordonarea spatiului, fluxurilor, autorizatiilor, aparaturii, instalatiilor si service-ului intr-un proiect coerent.",
    role:
      "ZESCORP poate sustine analiza tehnica, coordonarea de infrastructura, integrarea aparaturii si planificarea etapelor.",
    services: ["Constructii medicale", "Amenajari medicale", "Aparatura medicala"],
    cta: { label: "Solicita evaluare", href: "/contact" },
  },
  {
    type: "Camera RMN cu RF shielding",
    category: "Shielding",
    challenge:
      "Integrarea RF shielding, usilor RF, filtrelor, penetrarilor, HVAC-ului si cerintelor echipamentului.",
    role:
      "ZESCORP separa logica RMN/RF de protectia radiologica si coordoneaza cerintele camerei cu furnizorul echipamentului.",
    services: ["RF shielding", "Imagistica medicala", "Infrastructura RMN"],
    cta: { label: "Planifica camera", href: "/solutii-medicale/camere-rmn" },
  },
  {
    type: "Camera CT / RX cu protectie radiologica",
    category: "Radiologie",
    challenge:
      "Planificarea protectiei radiologice, usilor, sticlei, zonelor controlate si fluxului operator-pacient.",
    role:
      "ZESCORP poate sustine analiza tehnica a camerei, radioprotectia si pregatirea contextului pentru autorizare si ofertare.",
    services: ["Radioprotectie", "Camere CT", "Amenajari medicale"],
    cta: { label: "Vezi solutii CT", href: "/solutii-medicale/camere-ct" },
  },
  {
    type: "Integrare aparatura imagistica",
    category: "Aparatura",
    challenge:
      "Corelarea echipamentului cu spatiul, alimentarea, datele, HVAC-ul, accesul de montaj, service-ul si mentenanta.",
    role:
      "ZESCORP conecteaza achizitia si integrarea aparaturii cu infrastructura pregatita pentru operare.",
    services: ["Aparatura medicala", "Imagistica medicala", "Service specializat"],
    cta: { label: "Vezi echipamente", href: "/solutii-medicale/echipamente-imagistica-diagnostic" },
  },
  {
    type: "Laborator / IVD",
    category: "IVD",
    challenge:
      "Planificarea fluxurilor de probe, echipamentelor IVD, consumabilelor, calibrarii, QC si service-ului.",
    role:
      "ZESCORP sustine alegerea si integrarea echipamentelor de laborator intr-un spatiu pregatit pentru continuitate operationala.",
    services: ["IVD / laborator", "Aparatura medicala", "Service specializat"],
    cta: { label: "Vezi IVD", href: "/solutii-medicale/echipamente-laborator-ivd" },
  },
  {
    type: "Service si mentenanta aparatura",
    category: "Service",
    challenge:
      "Reducerea downtime-ului, documentarea interventiilor, planificarea mentenantei si trierea problemelor tehnice.",
    role:
      "ZESCORP poate sprijini evaluarea service, mentenanta preventiva si recomandari pentru continuitate operationala.",
    services: ["Service aparatura medicala", "Mentenanta", "Suport tehnic"],
    cta: { label: "Solicita service", href: "/solutii-medicale/service-echipamente-medicale" },
  },
];

export default function ProjectsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasa", href: "/" },
          { name: "Proiecte", href: "/projects" },
        ]}
      />

      <Section
        className="relative isolate overflow-hidden border-b border-blue-100 bg-slate-950"
        spacing="xl"
        tone="transparent"
      >
        <Image
          alt={corporateVisuals.projects.alt}
          className={`object-cover opacity-45 ${corporateVisuals.projects.position}`}
          fill
          priority
          sizes="100vw"
          src={corporateVisuals.projects.src}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,10,25,0.96)_0%,rgba(2,18,38,0.86)_48%,rgba(2,18,38,0.48)_100%)]" />
        <Container className="relative">
          <div className="mx-auto max-w-5xl text-center">
            <Eyebrow tone="graphite">Capabilitati tehnice</Eyebrow>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.03] text-balance text-white sm:text-6xl">
              Proiecte si capabilitati tehnice
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-slate-200">
              Exemple de proiecte medicale in care ZESCORP poate sustine
              infrastructura, aparatura, ecranare, integrare si service.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/contact">Solicita evaluare</Button>
              <Button href={companyContact.phoneHref} variant="secondary">
                {companyContact.phone}
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <a
                className="rounded-full border border-white/25 bg-white/12 px-4 py-2 text-sm font-bold text-white shadow-[0_12px_32px_rgba(0,87,184,0.06)] transition hover:border-white/45 hover:bg-white/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                href={`#${filter.toLowerCase().replace(/\s+/g, "-")}`}
                key={filter}
              >
                {filter}
              </a>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0057b8]">
                Scenarii tehnice
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950">
                Tipuri de proiecte, fara nume inventate, logo-uri false sau studii de caz fabricate.
              </h2>
            </div>
            <Button href="/contact" variant="secondary">
              Solicitati consultanta
            </Button>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {projectScenarios.map((project) => (
              <Card
                as="article"
                className="border-blue-100 bg-white"
                id={project.category.toLowerCase().replace(/\s+/g, "-")}
                interactive
                key={project.type}
                padding="lg"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Badge variant="blue">{project.category}</Badge>
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                    Scenariu anonim
                  </span>
                </div>
                <h3 className="mt-7 text-3xl font-semibold leading-tight text-slate-950">
                  {project.type}
                </h3>
                <div className="mt-6 grid gap-5">
                  <InfoBlock label="Challenge" text={project.challenge} />
                  <InfoBlock label="Rol ZESCORP" text={project.role} />
                </div>
                <div className="mt-7 flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span
                      className="rounded-full bg-[#f7fbff] px-3 py-1.5 text-xs font-bold text-[#0057b8]"
                      key={service}
                    >
                      {service}
                    </span>
                  ))}
                </div>
                <div className="mt-8">
                  <Button href={project.cta.href}>{project.cta.label}</Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f7fafc]" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0057b8]">
                Principiu de incredere
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950">
                Incredere fara fictiune comerciala.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Aceasta pagina prezinta capabilitati si scenarii de proiect, nu
                portofoliu cu nume de clienti sau rezultate inventate.
              </p>
            </div>
            <Card className="border-blue-100 bg-white" padding="lg">
              <h3 className="text-2xl font-semibold leading-tight text-slate-950">
                Urmatorul pas
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Alege un scenariu sau trimite direct contextul catre ZESCORP pentru
                o discutie tehnica aplicata.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact">Solicita evaluare</Button>
                <Button href={companyContact.emailHref} variant="secondary">
                  {companyContact.email}
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}

function InfoBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-[#f7fbff] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
        {label}
      </p>
      <p className="mt-3 text-base leading-8 text-slate-600">{text}</p>
    </div>
  );
}
