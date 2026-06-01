import Image from "next/image";
import Link from "next/link";

import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { OpenZESButton } from "@/components/ai/OpenZESButton";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const shortcutLinks = [
  { label: "Service aparatura medicala", href: "/service-aparatura-medicala" },
  { label: "Radioprotectie & Plumbare", href: "/radioprotectie-plumbare-rx" },
  { label: "CT & RMN", href: "/services/imagistica-medicala" },
  { label: "Proiecte medicale", href: "/servicii" },
  { label: "Ofertare echipamente", href: "/proposal-builder" },
];

const trustSignals = [
  "CT/RMN infrastructure planning",
  "RF shielding si radioprotectie",
  "Service si mentenanta aparatura",
];

export function HeroSection() {
  return (
    <Section
      className="overflow-hidden border-b border-blue-100 bg-[linear-gradient(180deg,#f4f8fd_0%,#ffffff_58%)]"
      spacing="xl"
      tone="transparent"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] xl:gap-16">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0057b8]">
              ZES MEDCORP / medical infrastructure engineering
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.06] text-slate-950 sm:text-6xl">
              Infrastructura medicala inteligenta.
            </h1>
            <p className="mt-5 text-xl leading-9 text-slate-600">
              Proiectare, radioprotectie, service si integrare pentru imagistica
              medicala. ZESCORP combina expertiza tehnica reala cu asistenta AI ZES
              pentru proiecte medicale moderne.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <OpenZESButton
                className="rounded-xl px-7"
                ctaLabel="Discuta cu ZES"
                pageIntent="homepage"
                size="lg"
                sourcePage="/"
              >
                Discuta cu ZES
              </OpenZESButton>
              <TrackedButtonLink
                className="rounded-xl border-blue-200 px-7 text-[#0057b8]"
                href="/contact"
                size="lg"
                variant="secondary"
                tracking={{
                  ctaLabel: "Solicita evaluare tehnica",
                  destination: "/contact",
                  sourcePage: "/",
                }}
              >
                Solicita evaluare tehnica
              </TrackedButtonLink>
            </div>
            <ul className="mt-7 grid gap-2 text-sm font-semibold leading-6 text-slate-600">
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
            <div className="absolute -left-10 top-8 hidden h-52 w-52 rounded-full bg-blue-100/60 blur-3xl lg:block" />
            <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-3 shadow-[0_24px_80px_rgba(15,65,118,0.14)]">
              <div className="relative min-h-[340px] overflow-hidden rounded-xl sm:min-h-[420px] lg:min-h-[520px]">
                <Image
                  alt="Infrastructura premium pentru imagistica medicala CT RMN si radiologie"
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  src="/hero-medical-tech.png"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,20,35,0.55)_0%,rgba(7,20,35,0.18)_45%,rgba(7,20,35,0.05)_75%)]" />
                <div className="absolute left-5 top-5 rounded-xl border border-white/30 bg-white/90 p-4 shadow-[0_14px_34px_rgba(15,23,42,0.16)]">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    ZES premium workflow
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-950">
                    Planificare + implementare + service
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {shortcutLinks.map((shortcut) => (
            <Link
              className="rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-[0_10px_22px_rgba(15,65,118,0.08)] transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0057b8]"
              data-cta="homepage-shortcut"
              href={shortcut.href}
              key={shortcut.href}
            >
              {shortcut.label}
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
