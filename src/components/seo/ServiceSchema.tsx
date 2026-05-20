import { JsonLd, type JsonLdObject } from "@/components/seo/JsonLd";
import { getCanonicalUrl, siteConfig } from "@/lib/seo";

export type ServiceSchemaProps = {
  name: string;
  description: string;
  url?: string;
  serviceType?: string;
  areaServed?: string | string[];
  providerName?: string;
};

export function ServiceSchema({
  name,
  description,
  url,
  serviceType,
  areaServed = "România",
  providerName = siteConfig.name,
}: ServiceSchemaProps) {
  const data: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: providerName,
      url: siteConfig.url,
    },
    areaServed,
  };

  if (url) {
    data.url = getCanonicalUrl(url);
  }

  if (serviceType) {
    data.serviceType = serviceType;
  }

  return <JsonLd data={data} id={`service-schema-${name.toLowerCase().replace(/\s+/g, "-")}`} />;
}
