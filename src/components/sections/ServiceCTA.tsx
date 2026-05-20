import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/ui/CTA";
import { Section } from "@/components/ui/Section";
import type { Service } from "@/data/services";

export type ServiceCTAProps = {
  service: Service;
};

export function ServiceCTA({ service }: ServiceCTAProps) {
  const plannerService =
    service.slug === "radiologie" ||
    service.slug === "rf-shielding" ||
    service.slug === "protectie-radiologica" ||
    service.slug === "imagistica-medicala";
  const diagnosticService =
    service.slug === "aparatura-medicala" ||
    service.slug === "service-aparatura-medicala";
  const primaryAction = plannerService
    ? {
        label: "Radiology Room Planner",
        href: "/radiology-room-planner",
      }
    : diagnosticService
      ? {
          label: "Diagnostic service",
          href: "/service-diagnostic",
        }
      : {
          label: "Consultant AI",
          href: "/ai-project-advisor",
        };
  const description = plannerService
    ? `Începe cu Radiology Room Planner pentru a structura cerințele de ${service.shortTitle.toLowerCase()}, apoi solicită o verificare tehnică aplicată camerei.`
    : diagnosticService
      ? `Începe cu Diagnostic service pentru a tria riscurile și pașii de intervenție pentru ${service.shortTitle.toLowerCase()}, apoi solicită evaluarea ZES.`
      : `Începe cu Consultant AI pentru a structura cerințele de ${service.shortTitle.toLowerCase()}, apoi solicită o analiză tehnică aplicată proiectului tău.`;

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
          eyebrow="Lead tehnic"
          primaryAction={primaryAction}
          secondaryAction={{
            label: "Contact ZES",
            href: "/contact",
          }}
          title="Solicită o analiză tehnică înainte să blochezi bugetul sau execuția."
          tone="light"
        >
          <div className="grid w-full max-w-3xl gap-3 text-left sm:grid-cols-3">
            {[
              "Evaluare riscuri tehnice",
              "Coordonare infrastructură + aparatură",
              "Pași următori clari",
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
      </Container>
    </Section>
  );
}
