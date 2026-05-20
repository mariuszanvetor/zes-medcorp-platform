import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import type { Service } from "@/data/services";

export type ServiceFAQProps = {
  service: Service;
};

export function ServiceFAQ({ service }: ServiceFAQProps) {
  return (
    <Section className="bg-white" tone="transparent">
      <Container>
        <SectionHeading
          align="center"
          className="mx-auto"
          eyebrow="FAQ"
          title={`Întrebări frecvente despre ${service.shortTitle.toLowerCase()}`}
          description="Răspunsuri concise pentru decidenți care pregătesc o investiție medicală sau o solicitare de analiză tehnică."
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-4">
          {service.faqs.map((item) => (
            <Card
              as="article"
              className="rounded-[1.25rem] border-slate-200 shadow-[0_14px_50px_rgba(15,23,42,0.04)]"
              key={item.question}
              padding="lg"
            >
              <h2 className="text-xl font-semibold text-slate-950">
                {item.question}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                {item.answer}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
