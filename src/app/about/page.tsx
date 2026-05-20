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
  title: "Despre ZES MEDCORP | Partener tehnic pentru proiecte medicale",
  description:
    "ZES MEDCORP este partener tehnic pentru infrastructură medicală, aparatură, imagistică, IVD, RF shielding, protecție radiologică și service specializat.",
  path: "/about",
  keywords: [
    "despre ZES MEDCORP",
    "infrastructură medicală",
    "aparatură medicală",
    "imagistică medicală",
    "IVD laborator",
    "RF shielding",
    "service aparatură medicală",
  ],
});

const pillars = [
  "Infrastructură medicală",
  "Radiologie",
  "RF shielding",
  "Protecție radiologică",
  "Aparatură medicală",
  "Imagistică",
  "IVD / laborator",
  "Service",
];

const whatZesDoes = [
  {
    title: "Planificare și infrastructură",
    description:
      "Coordonare pentru spații medicale, fluxuri, instalații, autorizări și pregătirea tehnică pentru echipamente.",
  },
  {
    title: "Tehnologie medicală",
    description:
      "Aparatură medicală, imagistică, IVD, integrare echipamente și consultanță pentru alegerea soluțiilor potrivite.",
  },
  {
    title: "Shielding specializat",
    description:
      "Separare clară între RF shielding pentru RMN și protecție radiologică / plumb pentru CT, RX și fluoroscopie.",
  },
  {
    title: "Service și continuitate",
    description:
      "Mentenanță, evaluări tehnice, diagnostic service și orientare către uptime operațional.",
  },
];

const approach = [
  {
    title: "Analiză tehnică",
    description:
      "Clarificăm spațiul, echipamentele, fluxurile, autorizările și riscurile înainte ca proiectul să intre în execuție.",
  },
  {
    title: "Coordonare interdisciplinară",
    description:
      "Punem aceeași masă de lucru infrastructura, aparatura, radiologia, shielding-ul, IVD-ul și service-ul.",
  },
  {
    title: "Integrare operațională",
    description:
      "Privim proiectul din perspectiva exploatării: acces, mentenanță, documentație, service și continuitate.",
  },
];

const reasons = [
  "ZES nu tratează proiectele medicale ca simple amenajări comerciale.",
  "RF shielding și protecția radiologică sunt păstrate separat conceptual și tehnic.",
  "Aparatura, imagistica, IVD-ul și service-ul sunt parte din planificarea proiectului.",
  "Instrumentele digitale ZES ajută la clarificarea primelor decizii înainte de investiție.",
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", href: "/" },
          { name: "Despre", href: "/about" },
        ]}
      />

      <Section
        className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f7fbff)]"
        spacing="xl"
        tone="transparent"
      >
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <Eyebrow tone="graphite">Medical technology partner</Eyebrow>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.03] text-balance text-slate-950 sm:text-6xl">
              Despre ZES MEDCORP
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-slate-600">
              Partener tehnic pentru infrastructură medicală, aparatură,
              imagistică, IVD, ecranare și service specializat.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-4">
            {["Infrastructură", "Echipamente", "Shielding", "Service"].map(
              (item) => (
                <div
                  className="rounded-2xl border border-blue-100 bg-white p-6 text-center text-sm font-bold uppercase tracking-[0.12em] text-[#0057b8] shadow-[0_18px_60px_rgba(0,87,184,0.07)]"
                  key={item}
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.44fr_0.56fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0057b8]">
                Company positioning
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950">
                ZES nu este clinică. ZES construiește și susține infrastructura
                tehnică din spatele actului medical.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-9 text-slate-600">
              <p>
                ZES MEDCORP este poziționat ca partener tehnic pentru organizații
                medicale care pregătesc spații, camere de radiologie, echipamente,
                laboratoare, integrare și service. Rolul ZES este să conecteze
                deciziile de infrastructură cu deciziile de tehnologie medicală.
              </p>
              <p>
                Într-un proiect medical modern, riscurile nu apar doar în șantier.
                Apar când echipamentul este ales târziu, când radiologia este
                separată de autorizări, când RF shielding-ul este confundat cu
                plumbul sau când service-ul nu este gândit din faza de proiect.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f7fafc]" spacing="lg" tone="transparent">
        <Container>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0057b8]">
                What ZES does
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950">
                Capabilități tehnice pentru proiecte medicale complete.
              </h2>
            </div>
            <Button href="/services" variant="secondary">
              Vezi serviciile
            </Button>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {whatZesDoes.map((item) => (
              <Card className="border-blue-100 bg-white" key={item.title} padding="lg">
                <h3 className="text-2xl font-semibold leading-tight text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0057b8]">
              Business pillars
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950">
              Piloni separați clar, coordonați într-o singură platformă tehnică.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <Card
                className="border-blue-100 bg-[linear-gradient(180deg,#ffffff,#f7fbff)]"
                key={pillar}
                padding="md"
              >
                <Badge variant="blue">{pillar}</Badge>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f7fafc]" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0057b8]">
                Technical approach
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950">
                Abordare tehnică înainte de ofertă, execuție sau achiziție.
              </h2>
            </div>
            <div className="grid gap-4">
              {approach.map((step, index) => (
                <Card className="border-blue-100 bg-white" key={step.title} padding="lg">
                  <div className="flex gap-5">
                    <span className="mt-1 text-sm font-bold text-[#0057b8]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-2xl font-semibold leading-tight text-slate-950">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-base leading-8 text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="lg" tone="transparent">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0057b8]">
                Why ZES
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950">
                Încredere construită prin claritate tehnică, nu prin promisiuni
                decorative.
              </h2>
            </div>
            <div className="grid gap-3">
              {reasons.map((reason) => (
                <div
                  className="rounded-2xl border border-blue-100 bg-[#f7fbff] p-5 text-base font-semibold leading-7 text-slate-700"
                  key={reason}
                >
                  {reason}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white" spacing="md" tone="transparent">
        <Container>
          <div className="rounded-[2rem] border border-blue-100 bg-[linear-gradient(135deg,#ffffff,#eef6ff)] p-8 text-center shadow-[0_28px_90px_rgba(0,87,184,0.10)] sm:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0057b8]">
              Următorul pas
            </p>
            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-tight text-slate-950">
              Transformă ideea medicală într-un prim brief tehnic.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Începe cu o analiză preliminară sau discută direct cu ZES despre
              infrastructură, aparatură, shielding, IVD, imagistică și service.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/ai-project-advisor" size="lg">
                Analiză preliminară
              </Button>
              <Button href="/contact" size="lg" variant="secondary">
                Discutați cu ZES
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
