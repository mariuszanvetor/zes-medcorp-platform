import Image from "next/image";

import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const visualSignals = ["CT", "RMN", "RX", "IVD", "Service"];

const trustSignals = [
  "Planificare preliminara asistata de ZES Copilot",
  "Validare tehnica inainte de decizii finale",
  "Integrare infrastructura + aparatura + service",
];

export function HeroSection() {
  return (
    <Section
      className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]"
      spacing="xl"
      tone="transparent"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.94fr_1.06fr] xl:gap-20">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0057b8]">
              ZES MEDCORP / medical infrastructure planning
            </p>
            <h1 className="mt-7 text-4xl font-semibold leading-[1.04] text-balance text-slate-950 sm:text-6xl lg:text-7xl">
              Planificare, infrastructura si echipamente medicale, pregatite cu rigoare.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-slate-600">
              ZES MEDCORP ajuta clinicile sa clarifice proiecte de imagistica,
              laborator, modernizare si service prin fluxuri asistate, estimari
              orientative si validare tehnica inainte de investitii finale.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <TrackedButtonLink
                className="rounded-xl border-blue-200 px-7 text-[#0057b8]"
                href="/#zes-guide"
                size="lg"
                tracking={{
                  ctaLabel: "Discuta cu ZES",
                  destination: "/#zes-guide",
                  sourcePage: "/",
                }}
                variant="secondary"
              >
                Discuta cu ZES
              </TrackedButtonLink>
              <TrackedButtonLink
                className="rounded-xl border-blue-200 px-7 text-[#0057b8]"
                href="/project-intake"
                size="lg"
                tracking={{
                  ctaLabel: "Trimite context proiect",
                  destination: "/project-intake",
                  sourcePage: "/",
                }}
                variant="secondary"
              >
                Trimite context proiect
              </TrackedButtonLink>
            </div>
            <ul className="mt-7 grid gap-3 text-sm font-semibold leading-6 text-slate-600">
              {trustSignals.map((signal) => (
                <li className="flex items-start gap-3" key={signal}>
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 rounded-full bg-[#0057b8]"
                  />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-12 hidden h-56 w-56 rounded-full bg-blue-100/60 blur-3xl lg:block" />
            <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-3 shadow-[0_24px_80px_rgba(15,65,118,0.12)]">
              <div className="relative min-h-[340px] overflow-hidden rounded-xl bg-slate-100 sm:min-h-[420px] lg:min-h-[540px]">
                <Image
                  alt="Camera moderna de imagistica medicala"
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  src="/hero-medical-tech.png"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.76),rgba(255,255,255,0.12)_44%,rgba(255,255,255,0)_70%)]" />
                <div className="absolute left-5 top-5 rounded-xl border border-white/75 bg-white/88 p-4 shadow-[0_14px_36px_rgba(15,23,42,0.10)] backdrop-blur-md">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Integrare tehnica
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">
                    Aparatura + spatiu + service
                  </p>
                </div>
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                  {visualSignals.map((signal) => (
                    <span
                      className="rounded-xl border border-white/70 bg-white/88 px-4 py-2 text-xs font-bold text-[#0057b8] shadow-[0_8px_24px_rgba(15,23,42,0.09)] backdrop-blur"
                      key={signal}
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
