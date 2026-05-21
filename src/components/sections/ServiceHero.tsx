import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import type { Service } from "@/data/services";

export type ServiceHeroProps = {
  service: Service;
};

export function ServiceHero({ service }: ServiceHeroProps) {
  const plannerService =
    service.slug === "radiologie" ||
    service.slug === "rf-shielding" ||
    service.slug === "protectie-radiologica" ||
    service.slug === "imagistica-medicala";
  const diagnosticService =
    service.slug === "aparatura-medicala" ||
    service.slug === "service-aparatura-medicala";
  const primaryCta =
    service.slug === "rf-shielding"
      ? { href: "/radiology-room-planner", label: "Planificare RMN / RF" }
      : service.slug === "protectie-radiologica"
        ? { href: "/radiology-room-planner", label: "Planificare CT / RX" }
        : plannerService
          ? { href: "/radiology-room-planner", label: "Planificare radiologie" }
          : diagnosticService
            ? { href: "/service-diagnostic", label: "Evaluare service" }
            : { href: "/ai-project-advisor", label: "Analiză proiect" };
  const validationNote = plannerService
    ? "Clarificăm tipul camerei, echipamentul, ecranarea corectă, autorizările și riscurile înainte de execuție."
    : diagnosticService
      ? "Pornim de la impact operațional, stare echipament, contract service și pașii reali de intervenție."
      : "Pornim de la scop, spațiu, aparatură, autorizări și constrângeri tehnice, nu de la o ofertă generică.";

  return (
    <Section
      className="overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fbff)]"
      spacing="xl"
      tone="transparent"
    >
      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <Eyebrow>{service.heroEyebrow}</Eyebrow>
          <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-semibold leading-[1.05] text-balance text-slate-950 sm:text-6xl">
            {service.heroTitle}
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-slate-600">
            {service.heroDescription}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <TrackedButtonLink
              className="rounded-full px-7"
              href={primaryCta.href}
              size="lg"
              tracking={{
                ctaLabel: primaryCta.label,
                destination: primaryCta.href,
                inquiryType: service.shortTitle,
                sourcePage: service.href,
              }}
            >
              {primaryCta.label}
            </TrackedButtonLink>
            <TrackedButtonLink
              className="rounded-full border-blue-200 px-7 text-[#0057b8]"
              href="/contact"
              size="lg"
              tracking={{
                ctaLabel: "Solicitați evaluare tehnică",
                destination: "/contact",
                inquiryType: service.shortTitle,
                sourcePage: service.href,
              }}
              variant="secondary"
            >
              Solicitați evaluare tehnică
            </TrackedButtonLink>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500">
            {validationNote}
          </p>
          <div className="mx-auto mt-8 grid max-w-4xl gap-3 text-left sm:grid-cols-3">
            {[
              "Analiză înainte de buget final",
              "Fără garanții tehnice fără verificare",
              "Pași clari pentru documente și implementare",
            ].map((item) => (
              <div
                className="rounded-2xl border border-blue-100 bg-white/80 p-4 text-sm font-semibold leading-6 text-slate-700 shadow-[0_16px_45px_rgba(0,87,184,0.06)]"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {service.capabilities.slice(0, 4).map((capability) => (
            <div
              className="rounded-2xl bg-white p-6 text-center text-sm font-semibold leading-6 text-slate-700 shadow-[0_18px_60px_rgba(15,23,42,0.06)]"
              key={capability}
            >
              {capability}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
