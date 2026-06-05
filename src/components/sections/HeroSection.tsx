import Image from "next/image";

import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { corporateVisuals } from "@/lib/visual-assets";

const trustSignals = [
  "Infrastructura medicala pentru CT, RMN, RX, laborator si clinici.",
  "Echipamente medicale pentru imagistica, diagnostic si laborator.",
  "Service, mentenanta si suport tehnic multi-vendor.",
];

export function HeroSection() {
  return (
    <Section
      className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#f4f8fd_0%,#ffffff_58%)]"
      spacing="sm"
      tone="transparent"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] xl:gap-16">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0057b8]">
              ZESCORP / infrastructura, echipamente, service
            </p>
            <h1 className="mt-5 text-3xl font-semibold leading-[1.08] text-slate-950 sm:text-6xl">
              Solutii tehnice pentru proiecte medicale.
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
              ZESCORP ajuta clinici, centre de imagistica, laboratoare si
              investitori cu infrastructura, echipamente, service si mentenanta.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <TrackedButtonLink
                className="rounded-xl px-7"
                href="/contact"
                size="lg"
                tracking={{
                  ctaLabel: "Solicita evaluare tehnica hero",
                  destination: "/contact",
                  sourcePage: "/",
                }}
                variant="primary"
              >
                Solicita evaluare
              </TrackedButtonLink>
              <TrackedButtonLink
                className="rounded-xl border-blue-200 px-7 text-[#0057b8]"
                href="/solutii-medicale"
                size="lg"
                tracking={{
                  ctaLabel: "Vezi serviciile ZESCORP",
                  destination: "/solutii-medicale",
                  sourcePage: "/",
                }}
                variant="secondary"
              >
                Vezi serviciile
              </TrackedButtonLink>
            </div>

            <div className="mt-5 grid gap-2 rounded-2xl border border-blue-100 bg-white/78 p-4 text-sm leading-6 text-slate-600 shadow-[0_14px_32px_rgba(15,65,118,0.07)] sm:grid-cols-3">
              <div>
                <span className="font-semibold text-slate-950">Ce vindem:</span>{" "}
                infrastructura, echipamente, service.
              </div>
              <div>
                <span className="font-semibold text-slate-950">Pentru cine:</span>{" "}
                clinici, imagistica, laboratoare, investitori.
              </div>
              <div>
                <span className="font-semibold text-slate-950">Contact:</span>{" "}
                formular, telefon, email sau WhatsApp.
              </div>
            </div>

          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-3 shadow-[0_24px_80px_rgba(15,65,118,0.14)]">
              <div className="relative min-h-[340px] overflow-hidden rounded-xl sm:min-h-[420px] lg:min-h-[520px]">
                <Image
                  alt={corporateVisuals.hero.alt}
                  className={`object-cover ${corporateVisuals.hero.position}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  src={corporateVisuals.hero.src}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,20,35,0.55)_0%,rgba(7,20,35,0.18)_45%,rgba(7,20,35,0.05)_75%)]" />
                <div className="absolute left-5 top-5 rounded-xl border border-white/30 bg-white/90 p-4 shadow-[0_14px_34px_rgba(15,23,42,0.16)]">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    ZESCORP delivery focus
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-950">
                    Planificare, livrare si suport
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul className="mt-8 grid gap-2 text-sm font-semibold leading-6 text-slate-600 lg:grid-cols-3">
          {trustSignals.map((signal) => (
            <li className="flex items-start gap-3 rounded-xl border border-blue-100 bg-white/85 px-4 py-3" key={signal}>
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 rounded-full bg-[#0057b8]"
              />
              <span>{signal}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
