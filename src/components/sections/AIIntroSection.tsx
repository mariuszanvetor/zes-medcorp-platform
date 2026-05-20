import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const capabilities = [
  "Infrastructură medicală",
  "Imagistică & IVD",
  "RF & protecție radiologică",
  "Service specializat",
];

export function AIIntroSection() {
  return (
    <Section className="border-y border-slate-200 bg-white" spacing="sm" tone="transparent">
      <Container>
        <div className="grid gap-4 md:grid-cols-4">
          {capabilities.map((capability) => (
            <div
              className="flex min-h-24 items-center justify-center rounded-2xl bg-slate-50 px-6 text-center text-sm font-semibold text-slate-700"
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
