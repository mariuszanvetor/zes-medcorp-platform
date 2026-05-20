import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import type { Service } from "@/data/services";

export type ServiceProcessProps = {
  service: Service;
};

export function ServiceProcess({ service }: ServiceProcessProps) {
  return (
    <Section className="bg-[#f7fafc]" tone="transparent">
      <Container>
        <SectionHeading
          align="center"
          className="mx-auto"
          eyebrow="Proces"
          title="Un proces tehnic clar, fără zgomot operațional."
          description="ZES ghidează proiectul de la primele întrebări până la integrare, service și mentenanță."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {service.process.map((step, index) => (
            <Card
              className="min-h-56 rounded-[1.35rem] border-slate-200 shadow-[0_18px_60px_rgba(15,23,42,0.045)] xl:min-h-64"
              key={step.title}
              padding="lg"
            >
              <span className="text-sm font-bold text-[#0057b8]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-8 text-xl font-semibold text-slate-950">
                {step.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
