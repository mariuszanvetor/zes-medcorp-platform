import type { Metadata } from "next";

import { LeadReviewCenter } from "@/components/admin/LeadReviewCenter";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: {
    absolute: "Lead Review Center | ZES MEDCORP",
  },
  description:
    "Prototip intern pentru evaluarea leadurilor generate de platforma ZES.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLeadsPage() {
  return (
    <main className="bg-[#f7fbff]">
      <Section
        className="overflow-hidden border-b border-blue-100 bg-[radial-gradient(circle_at_top_right,rgba(0,87,184,0.12),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]"
        spacing="lg"
      >
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <Badge variant="blue">Internal prototype</Badge>
            <h1 className="mt-8 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Lead Review Center
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
              Prototip intern pentru evaluarea leadurilor generate de platforma
              ZES.
            </p>
          </div>

          <Card
            className="mx-auto mt-10 max-w-5xl border-amber-200 bg-amber-50 text-amber-950 shadow-none"
            padding="md"
          >
            <p className="text-sm font-semibold leading-7">
              {
                "Prototip intern. Date demo. Nu exist\u0103 \u00eenc\u0103 autentificare, baz\u0103 de date sau CRM conectat."
              }
            </p>
          </Card>
        </Container>
      </Section>

      <Section spacing="md">
        <Container size="xl">
          <LeadReviewCenter />
        </Container>
      </Section>
    </main>
  );
}
