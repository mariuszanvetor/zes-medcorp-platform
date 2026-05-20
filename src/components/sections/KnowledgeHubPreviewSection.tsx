import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { articles } from "@/data/articles";

export function KnowledgeHubPreviewSection() {
  return (
    <Section tone="white">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Knowledge Hub"
            title="Gândire tehnică pentru decizii medicale mai bune."
            description="Articolele vor explica pe înțelesul decidenților ce trebuie pregătit înainte de un proiect medical complex."
          />
          <Badge className="w-fit" variant="cyan">
            Preview editorial
          </Badge>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <Card as="article" interactive key={article.title}>
              <h3 className="text-xl font-semibold leading-snug text-slate-950">
                {article.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {article.description}
              </p>
              <TrackedLink
                className="mt-7 inline-flex text-sm font-semibold text-blue-700 transition hover:text-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                href={`/knowledge-hub/${article.slug}`}
                tracking={{
                  articleSlug: article.slug,
                  ctaLabel: "Citeste ghidul",
                  destination: `/knowledge-hub/${article.slug}`,
                  sourcePage: "/",
                }}
              >
                Citește ghidul
              </TrackedLink>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
