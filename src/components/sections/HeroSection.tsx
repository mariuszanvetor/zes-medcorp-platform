import Image from "next/image";

import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const visualSignals = ["CT", "RMN", "RX", "IVD", "Service"];

export function HeroSection() {
  return (
    <Section
      className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]"
      spacing="xl"
      tone="transparent"
    >
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[0.92fr_1.08fr] xl:gap-20">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0057b8]">
              ZES MEDCORP
            </p>
            <h1 className="mt-7 text-4xl font-semibold leading-[1.04] text-balance text-slate-950 sm:text-6xl lg:text-7xl">
              Infrastructură și tehnologie medicală, integrate elegant.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-slate-600">
              Construim, echipăm și susținem proiecte medicale moderne:
              infrastructură, imagistică, IVD, ecranare, integrare și service.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <TrackedButtonLink
                className="rounded-full px-7"
                href="/services"
                size="lg"
                tracking={{
                  ctaLabel: "Exploreaza serviciile",
                  destination: "/services",
                  sourcePage: "/",
                }}
              >
                Explorează serviciile
              </TrackedButtonLink>
              <TrackedButtonLink
                className="rounded-full border-blue-200 px-7 text-[#0057b8]"
                href="/ai-project-advisor"
                size="lg"
                tracking={{
                  ctaLabel: "Consultant AI",
                  destination: "/ai-project-advisor",
                  sourcePage: "/",
                }}
                variant="secondary"
              >
                Consultant AI
              </TrackedButtonLink>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-12 hidden h-56 w-56 rounded-full bg-blue-100/60 blur-3xl lg:block" />
            <div className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-3 shadow-[0_36px_110px_rgba(15,65,118,0.16)]">
              <div className="relative min-h-[340px] overflow-hidden rounded-[1.45rem] bg-slate-100 sm:min-h-[420px] lg:min-h-[540px]">
                <Image
                  alt="Cameră modernă de imagistică medicală"
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  src="/hero-medical-tech.png"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.72),rgba(255,255,255,0.10)_42%,rgba(255,255,255,0)_68%)]" />
                <div className="absolute left-5 top-5 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur-md">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Integrare tehnică
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">
                    Aparatură + spațiu + service
                  </p>
                </div>
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                  {visualSignals.map((signal) => (
                    <span
                      className="rounded-full border border-white/70 bg-white/88 px-4 py-2 text-xs font-bold text-[#0057b8] shadow-[0_10px_30px_rgba(15,23,42,0.10)] backdrop-blur"
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
