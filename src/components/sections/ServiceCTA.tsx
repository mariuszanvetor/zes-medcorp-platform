import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/ui/CTA";
import { Section } from "@/components/ui/Section";
import { PlanningJourneyBlock } from "@/components/sections/PlanningJourneyBlock";
import { getPlanningJourneyRecommendations } from "@/data/planning-journeys";
import type { Service } from "@/data/services";

export type ServiceCTAProps = {
  service: Service;
};

export function ServiceCTA({ service }: ServiceCTAProps) {
  const journeyRecommendations = getPlanningJourneyRecommendations({
    serviceHref: service.href,
    limit: 2,
  });
  const plannerService =
    service.slug === "radiologie" ||
    service.slug === "rf-shielding" ||
    service.slug === "protectie-radiologica" ||
    service.slug === "imagistica-medicala";
  const diagnosticService =
    service.slug === "aparatura-medicala" ||
    service.slug === "service-aparatura-medicala";
  const primaryAction =
    service.slug === "rf-shielding"
      ? {
          label: "Planificare RMN / RF",
          href: "/radiology-room-planner",
        }
      : service.slug === "protectie-radiologica"
        ? {
            label: "Planificare CT / RX",
            href: "/radiology-room-planner",
          }
        : plannerService
          ? {
              label: "Planificare radiologie",
              href: "/radiology-room-planner",
            }
          : diagnosticService
            ? {
                label: "Evaluare service",
                href: "/service-diagnostic",
              }
            : {
                label: "Analiză proiect",
                href: "/ai-project-advisor",
              };
  const description = plannerService
    ? `Structurați cerințele de ${service.shortTitle.toLowerCase()} și validați camera înainte de execuție, echipament sau documentație.`
    : diagnosticService
      ? `Triați riscurile și pașii de intervenție pentru ${service.shortTitle.toLowerCase()}, apoi solicitați o evaluare aplicată.`
      : `Structurați cerințele de ${service.shortTitle.toLowerCase()} și solicitați o analiză tehnică aplicată proiectului.`;

  return (
    <Section
      className="border-t border-blue-100 bg-[linear-gradient(135deg,#f8fbff,#eef6ff)]"
      tone="transparent"
    >
      <Container>
        <CTA
          align="center"
          className="border-blue-100 bg-white"
          description={description}
          eyebrow="Consultanță tehnică"
          primaryAction={primaryAction}
          secondaryAction={{
            label: "Discutați proiectul",
            href: "/contact",
          }}
      title="Clarificați cerințele tehnice înainte de buget final, achiziții sau execuție."
      tone="light"
    >
      <div className="grid w-full max-w-3xl gap-3 text-left sm:grid-cols-3">
        {[
          "Riscuri tehnice prioritizate",
          "Ipoteze și documente necesare",
          "Pas următor realist",
        ].map((item) => (
              <div
                className="rounded-2xl border border-blue-100 bg-[#f7fbff] p-4 text-sm font-semibold leading-6 text-slate-700"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </CTA>
        <PlanningJourneyBlock
          className="mt-10"
          compact
          description="Daca serviciul face parte dintr-un proiect mai larg, alege scenariul potrivit inainte de decizii finale."
          journeys={journeyRecommendations}
          sourcePage={service.href}
          title="Nu esti sigur de ordinea pasilor?"
        />
      </Container>
    </Section>
  );
}
