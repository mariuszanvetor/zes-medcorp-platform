import { Button } from "@/components/ui/Button";
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
  const primaryCta = plannerService
    ? { href: "/radiology-room-planner", label: "Radiology Room Planner" }
    : diagnosticService
      ? { href: "/service-diagnostic", label: "Diagnostic service" }
      : { href: "/ai-project-advisor", label: "Consultant AI" };

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
            <Button className="rounded-full px-7" href={primaryCta.href} size="lg">
              {primaryCta.label}
            </Button>
            <Button
              className="rounded-full border-blue-200 px-7 text-[#0057b8]"
              href="/contact"
              size="lg"
              variant="secondary"
            >
              Solicită analiză tehnică
            </Button>
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
