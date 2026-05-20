import { JsonLd, type JsonLdObject } from "@/components/seo/JsonLd";

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQSchemaProps = {
  items: FAQItem[];
  id?: string;
};

export function FAQSchema({ items, id = "faq-schema" }: FAQSchemaProps) {
  const data: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <JsonLd data={data} id={id} />;
}
