import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  getEcosystemNavigationItems,
  type EcosystemNavigationItem,
} from "@/lib/ecosystem-navigation";

type EcosystemNavigationProps = {
  title?: string;
  description?: string;
  items?: EcosystemNavigationItem[];
  compact?: boolean;
};

export function EcosystemNavigation({
  title = "Cum incepi?",
  description = "Alege traseul potrivit si intra in hub-ul care corespunde intentiei tale: invata, compara, estimeaza, planifica sau trimite detalii pentru analiza.",
  items = getEcosystemNavigationItems(),
  compact = false,
}: EcosystemNavigationProps) {
  return (
    <Section className="bg-white" spacing="lg" tone="transparent">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#0057b8]">
            Ecosistem ZES
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950">
            {title}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            {description}
          </p>
        </div>

        <div
          className={`mt-8 grid gap-5 ${
            compact ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-2 xl:grid-cols-3"
          }`}
        >
          {items.map((item) => (
            <Card
              as="article"
              className="border-blue-100 bg-[linear-gradient(135deg,#ffffff,#f8fbff)]"
              interactive
              key={item.href}
              padding="lg"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-blue-100 bg-[#f7fbff] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0057b8]">
                  {item.intentLabel}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  {item.intent}
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-semibold leading-tight text-slate-950">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {item.description}
              </p>

              <Link
                className="mt-7 inline-flex text-sm font-bold text-[#0057b8] transition hover:text-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                href={item.href}
              >
                {item.ctaLabel}
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
