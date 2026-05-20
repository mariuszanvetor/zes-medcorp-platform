import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export type LeadMagnetBlockProps = {
  title: string;
  description: string;
  items?: string[];
  primaryHref?: string;
  secondaryHref?: string;
};

export function LeadMagnetBlock({
  title,
  description,
  items = [],
  primaryHref = "/contact",
  secondaryHref = "/ai-project-advisor",
}: LeadMagnetBlockProps) {
  return (
    <Card
      className="border-blue-100 bg-[linear-gradient(135deg,#ffffff,#eef6ff)]"
      padding="lg"
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#0057b8]">
            Resursă tehnică · În pregătire
          </span>
          <h2 className="mt-5 text-3xl font-semibold leading-tight text-slate-950">
            {title}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            {description}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href={primaryHref}>Solicitați consultanță</Button>
            <Button href={secondaryHref} variant="secondary">
              Analiză preliminară
            </Button>
          </div>
        </div>
        {items.length > 0 && (
          <div className="grid gap-3">
            {items.map((item) => (
              <div
                className="rounded-2xl border border-blue-100 bg-white p-4 text-sm font-semibold leading-6 text-slate-700"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
