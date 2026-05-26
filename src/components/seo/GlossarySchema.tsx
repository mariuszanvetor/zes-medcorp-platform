import { JsonLd, type JsonLdObject } from "@/components/seo/JsonLd";
import { getCanonicalUrl, siteConfig } from "@/lib/seo";

export type GlossarySchemaProps = {
  name: string;
  description: string;
  url: string;
  inDefinedTermSet?: string;
};

export function GlossarySchema({
  name,
  description,
  url,
  inDefinedTermSet = "/glosar",
}: GlossarySchemaProps) {
  const data: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name,
    description,
    url: getCanonicalUrl(url),
    inDefinedTermSet: getCanonicalUrl(inDefinedTermSet),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return <JsonLd data={data} id={`glossary-schema-${name.toLowerCase().replace(/\s+/g, "-")}`} />;
}
