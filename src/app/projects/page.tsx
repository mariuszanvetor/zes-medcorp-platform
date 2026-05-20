import type { Metadata } from "next";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { createWebsiteMetadata } from "@/lib/seo";

export const metadata: Metadata = createWebsiteMetadata({
  title: "Proiecte și capabilități tehnice | ZES MEDCORP",
  description:
    "Exemple de tipuri de proiecte medicale în care ZES poate asigura infrastructură, aparatură, radiologie, RF shielding, protecție radiologică, IVD și service.",
  path: "/projects",
  keywords: [
    "proiecte medicale",
    "capabilități tehnice medicale",
    "cameră RMN RF shielding",
    "cameră CT protecție radiologică",
    "laborator IVD",
    "service aparatură medicală",
  ],
});

const filters = [
  "Infrastructură",
  "Radiologie",
  "Shielding",
  "Aparatură",
  "IVD",
  "Service",
];

const projectScenarios = [
  {
    type: "Clinică medicală turnkey",
    category: "Infrastructură",
    challenge:
      "Coordonarea spațiului, fluxurilor, DSP, aparaturii, instalațiilor și service-ului într-un proiect coerent.",
    role:
      "ZES poate asigura analiză tehnică, coordonare de infrastructură, integrare aparatură și pași de planificare turnkey.",
    services: ["Construcții medicale", "Amenajări medicale", "Aparatură medicală"],
    cta: { label: "Analizează proiectul", href: "/ai-project-advisor" },
  },
  {
    type: "Cameră RMN cu RF shielding",
    category: "Shielding",
    challenge:
      "Integrarea cuștii Faraday, ușilor RF, filtrelor, waveguides, penetrărilor, HVAC-ului și cerințelor echipamentului.",
    role:
      "ZES separă logica RMN/RF de protecția radiologică și coordonează cerințele camerei cu furnizorul echipamentului.",
    services: ["RF shielding", "Radiologie", "Imagistică medicală"],
    cta: { label: "Planifică camera", href: "/radiology-room-planner" },
  },
  {
    type: "Cameră CT / RX cu protecție radiologică",
    category: "Radiologie",
    challenge:
      "Planificarea protecției radiologice, ușilor, sticlei, zonelor controlate, CNCAN și fluxului operator-pacient.",
    role:
      "ZES poate susține analiza tehnică a camerei, separarea cerințelor CT/RX de RF shielding și coordonarea cu autorizările.",
    services: ["Radiologie", "Protecție radiologică", "Amenajări medicale"],
    cta: { label: "Vezi plannerul", href: "/radiology-room-planner" },
  },
  {
    type: "Integrare aparatură imagistică",
    category: "Aparatură",
    challenge:
      "Corelarea echipamentului cu spațiul, alimentarea, datele, HVAC-ul, accesul de montaj, service-ul și mentenanța.",
    role:
      "ZES poate conecta achiziția, integrarea și service-ul aparaturii cu infrastructura pregătită pentru operare.",
    services: ["Aparatură medicală", "Imagistică medicală", "Service specializat"],
    cta: { label: "Verifică complexitatea", href: "/calculator-proiect-medical" },
  },
  {
    type: "Laborator / IVD",
    category: "IVD",
    challenge:
      "Planificarea fluxurilor de probe, echipamentelor IVD, consumabilelor, calibrării, QC și service-ului.",
    role:
      "ZES poate susține alegerea și integrarea echipamentelor de laborator într-un spațiu pregătit pentru continuitate operațională.",
    services: ["IVD / laborator", "Aparatură medicală", "Service specializat"],
    cta: { label: "Discută cu ZES", href: "/contact" },
  },
  {
    type: "Service și mentenanță aparatură",
    category: "Service",
    challenge:
      "Reducerea downtime-ului, documentarea intervențiilor, planificarea mentenanței și trierea problemelor tehnice.",
    role:
      "ZES poate sprijini evaluarea service, diagnosticarea inițială, mentenanța preventivă și recomandări pentru continuitate operațională.",
    services: ["Service aparatură medicală", "Aparatură medicală", "IVD / laborator"],
    cta: { label: "Diagnostic service", href: "/service-diagnostic" },
  },
];

export default function ProjectsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          { name: "Proiecte", href: "/projects" },
        ]}
      />

      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f7fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <Eyebrow tone="graphite">Technical capabilities</Eyebrow>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.03] text-balance text-slate-950 sm:text-6xl">
              Proiecte și capabilități tehnice
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-slate-600">
              Exemple de tipuri de proiecte medicale în care ZES poate asigura
              infrastructură, aparatură, ecranare, integrare și service.
            </p>
          </div>

          <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <a
                className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-[#0057b8] shadow-[0_12px_32px_rgba(0,87,184,0.06)] transition hover:border-blue-200 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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
                Tipuri de proiecte, fără nume inventate, logo-uri false sau
                studii de caz fabricate.
              </h2>
            </div>
            <Button href="/contact" variant="secondary">
              Solicită consultanță
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
                  <InfoBlock label="Rol ZES" text={project.role} />
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
                Principiu de încredere
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950">
                Încredere fără ficțiune comercială.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Această pagină prezintă capabilități și scenarii de proiect, nu
                portofoliu cu nume de clienți sau rezultate inventate. Scopul este
                să vezi unde se potrivește ZES într-un proiect medical real.
              </p>
            </div>
            <Card className="border-blue-100 bg-white" padding="lg">
              <h3 className="text-2xl font-semibold leading-tight text-slate-950">
                Următorul pas
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Alege un scenariu, deschide instrumentul relevant sau discută direct cu
                ZES pentru a transforma capabilitatea într-un brief tehnic aplicat.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="/ai-project-advisor">Consultant AI</Button>
                <Button href="/contact" variant="secondary">
                  Contact ZES
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
