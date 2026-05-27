import { ZESGuide } from "@/components/ai/ZESGuide";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function ZESGuideSection() {
  return (
    <Section
      className="border-y border-blue-200 bg-[linear-gradient(180deg,#f4f9ff_0%,#ffffff_100%)]"
      spacing="lg"
      tone="transparent"
    >
      <Container>
        <ZESGuide />
      </Container>
    </Section>
  );
}
