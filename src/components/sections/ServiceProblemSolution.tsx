import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import type { Service } from "@/data/services";

export type ServiceProblemSolutionProps = {
  service: Service;
};

export function ServiceProblemSolution({ service }: ServiceProblemSolutionProps) {
  return (
    <Section tone="white">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Problemă și soluție"
            title={service.risksTitle}
            description={service.overview}
          />

          <div className="grid gap-6">
            <Card className="rounded-[1.5rem] border-slate-200 shadow-[0_18px_60px_rgba(15,23,42,0.055)]" padding="lg">
              <h2 className="text-2xl font-semibold text-slate-950">
                Riscuri de proiect
              </h2>
              <ul className="mt-7 space-y-4">
                {service.risks.map((risk) => (
                  <li className="flex gap-4 text-base leading-8 text-slate-600" key={risk}>
                    <span
                      aria-hidden="true"
                      className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0057b8]"
                    />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="rounded-[1.5rem] border-blue-100 bg-[#f5f9ff] shadow-none" padding="lg">
              <h2 className="text-2xl font-semibold text-slate-950">
                {service.solutionTitle}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                {service.solutionDescription}
              </p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {service.solutionBullets.map((bullet) => (
                  <li
                    className="rounded-2xl bg-white p-4 text-sm font-semibold leading-6 text-slate-700 shadow-[0_10px_36px_rgba(15,23,42,0.04)]"
                    key={bullet}
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        <div className="mt-24">
          <SectionHeading
            align="center"
            className="mx-auto"
            eyebrow="Capabilități tehnice"
            title="Ce poate include intervenția ZES"
            description="Fiecare proiect este calibrat în funcție de spațiu, aparatură, autorizări, service și obiectivul de business."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((capability) => (
              <Card
                className="rounded-[1.35rem] border-slate-200 shadow-[0_18px_60px_rgba(15,23,42,0.045)]"
                interactive
                key={capability}
                padding="lg"
              >
                <span className="mb-6 block h-1 w-12 rounded-full bg-[#0057b8]" />
                <p className="text-base font-semibold leading-8 text-slate-700">
                  {capability}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
