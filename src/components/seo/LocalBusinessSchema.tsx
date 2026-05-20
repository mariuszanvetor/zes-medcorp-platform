import { JsonLd, type JsonLdObject } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/seo";

export type PostalAddress = {
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
};

export type LocalBusinessSchemaProps = {
  name?: string;
  url?: string;
  description?: string;
  telephone?: string;
  email?: string;
  address?: PostalAddress;
  areaServed?: string | string[];
};

export function LocalBusinessSchema({
  name = siteConfig.name,
  url = siteConfig.url,
  description = siteConfig.defaultDescription,
  telephone,
  email,
  address,
  areaServed = "România",
}: LocalBusinessSchemaProps) {
  const data: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    url,
    description,
    areaServed,
  };

  if (telephone) {
    data.telephone = telephone;
  }

  if (email) {
    data.email = email;
  }

  if (address) {
    const addressData: JsonLdObject = {
      "@type": "PostalAddress",
    };

    if (address.streetAddress) {
      addressData.streetAddress = address.streetAddress;
    }

    if (address.addressLocality) {
      addressData.addressLocality = address.addressLocality;
    }

    if (address.addressRegion) {
      addressData.addressRegion = address.addressRegion;
    }

    if (address.postalCode) {
      addressData.postalCode = address.postalCode;
    }

    addressData.addressCountry = address.addressCountry ?? "RO";
    data.address = addressData;
  }

  return <JsonLd data={data} id="local-business-schema" />;
}
