import { JsonLd, type JsonLdObject } from "@/components/seo/JsonLd";
import { companyContact } from "@/lib/brand";
import { siteConfig } from "@/lib/seo";

export function WebSiteSchema() {
  const data: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: ["ZESCORP", "ZES MEDCORP"],
    url: siteConfig.url,
    inLanguage: "ro-RO",
    description: siteConfig.defaultDescription,
    publisher: {
      "@type": "Organization",
      name: companyContact.legalName,
      url: siteConfig.url,
    },
  };

  return <JsonLd data={data} id="website-schema" />;
}
