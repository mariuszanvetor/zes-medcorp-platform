import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";

const steps = [
  {
    title: "Analiză",
    description: "Clarificăm obiectivele, constrângerile, spațiul, aparatura și riscurile tehnice.",
  },
  {
    title: "Proiectare",
    description: "Transformăm cerințele într-un plan coerent pentru execuție, avizare și integrare.",
  },
  {
    title: "Execuție",
    description: "Coordonăm lucrările medical-tehnice cu atenție la fluxuri, siguranță și calitate.",
  },
  {
    title: "Integrare",
    description: "Aducem aparatura, ecranarea, instalațiile și operarea într-un sistem funcțional.",
  },
  {
    title: "Mentenanță",
    description: "Susținem infrastructura și aparatura prin service, verificări și continuitate.",
  },
];

export function ProcessSection() {
  return (
    <Section className="border-y border-white/10" tone="graphite">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Proces"
          mode="dark"
          title="De la întrebare tehnică la infrastructură operațională."
          description="Procesul ZES menține proiectul lizibil pentru decidenți și executabil pentru echipele tehnice."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {steps.map((step, index) => (
            <Card
              className="min-h-60"
              interactive
              key={step.title}
              variant="glass"
            >
              <span className="text-sm font-semibold text-cyan-100">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
