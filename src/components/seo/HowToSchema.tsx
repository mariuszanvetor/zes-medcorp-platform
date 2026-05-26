import { JsonLd, type JsonLdObject } from "@/components/seo/JsonLd";
import { getCanonicalUrl, siteConfig } from "@/lib/seo";

export type HowToStep = {
  name: string;
  text: string;
};

export type HowToSchemaProps = {
  name: string;
  description: string;
  url: string;
  steps: HowToStep[];
};

export function HowToSchema({ name, description, url, steps }: HowToSchemaProps) {
  const data: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url: getCanonicalUrl(url),
    totalTime: "PT0H5M",
    supply: [],
    tool: [],
    step: steps.map((step) => ({
      "@type": "HowToStep",
      name: step.name,
      text: step.text,
    })),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return <JsonLd data={data} id={`howto-schema-${name.toLowerCase().replace(/\s+/g, "-")}`} />;
}
