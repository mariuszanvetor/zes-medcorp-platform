import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const capabilities = [
  "Infrastructura medicala",
  "Imagistica si IVD",
  "RF si radioprotectie",
  "Service specializat",
];

export function AIIntroSection() {
  return (
    <Section className="border-y border-slate-200 bg-white" spacing="sm" tone="transparent">
      <Container>
        <div className="grid gap-3 md:grid-cols-4">
          {capabilities.map((capability) => (
            <div
              className="flex min-h-20 items-center justify-center rounded-lg border border-blue-100 bg-[#f7fbff] px-5 text-center text-sm font-semibold text-slate-700"
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
