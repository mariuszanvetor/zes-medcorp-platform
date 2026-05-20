import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { getRelatedServices, type Service } from "@/data/services";

export type RelatedServicesProps = {
  service: Service;
};

export function RelatedServices({ service }: RelatedServicesProps) {
  const relatedServices = getRelatedServices(service);

  return (
    <Section className="border-y border-slate-200 bg-[#f7fafc]" tone="transparent">
      <Container>
        <SectionHeading
          align="center"
          className="mx-auto"
          eyebrow="Servicii conexe"
          title="Infrastructura medicală funcționează prin sisteme conectate."
          description="Explorează serviciile care completează analiza tehnică și pot reduce riscurile proiectului."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {relatedServices.map((relatedService) => (
            <Card
              as="article"
              className="rounded-[1.35rem] border-slate-200 shadow-[0_18px_60px_rgba(15,23,42,0.045)]"
              interactive
              key={relatedService.slug}
              padding="lg"
            >
              <h2 className="text-xl font-semibold text-slate-950">
                {relatedService.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {relatedService.seoDescription}
              </p>
              <Link
                className="mt-6 inline-flex text-sm font-semibold text-blue-700 transition hover:text-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                href={relatedService.href}
              >
                Vezi serviciul
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
