import { JsonLd, type JsonLdObject } from "@/components/seo/JsonLd";
import { brandAssets, companyContact } from "@/lib/brand";
import { getCanonicalUrl, siteConfig } from "@/lib/seo";

export type OrganizationContactPoint = {
  contactType: string;
  telephone?: string;
  email?: string;
  areaServed?: string | string[];
  availableLanguage?: string | string[];
};

export type OrganizationSchemaProps = {
  name?: string;
  url?: string;
  description?: string;
  logo?: string;
  sameAs?: string[];
  contactPoint?: OrganizationContactPoint[];
};

export function OrganizationSchema({
  name = companyContact.legalName,
  url = siteConfig.url,
  description = siteConfig.defaultDescription,
  logo = getCanonicalUrl(brandAssets.logoColor),
  sameAs,
  contactPoint,
}: OrganizationSchemaProps) {
  const data: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    alternateName: siteConfig.name,
    url,
    description,
    email: companyContact.email,
    telephone: companyContact.phoneInternational,
    taxID: companyContact.cui,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyContact.address.streetAddress,
      addressLocality: companyContact.address.addressLocality,
      addressRegion: companyContact.address.addressRegion,
      addressCountry: companyContact.address.addressCountry,
    },
  };

  if (logo) {
    data.logo = logo;
  }

  if (sameAs?.length) {
    data.sameAs = sameAs;
  }

  const effectiveContactPoint =
    contactPoint ??
    [
      {
        contactType: "technical consultation",
        telephone: companyContact.phoneInternational,
        email: companyContact.email,
        areaServed: "RO",
        availableLanguage: ["ro"],
      },
    ];

  if (effectiveContactPoint.length) {
    data.contactPoint = effectiveContactPoint.map((point) => {
      const contactData: JsonLdObject = {
        "@type": "ContactPoint",
        contactType: point.contactType,
      };

      if (point.telephone) {
        contactData.telephone = point.telephone;
      }

      if (point.email) {
        contactData.email = point.email;
      }

      if (point.areaServed) {
        contactData.areaServed = point.areaServed;
      }

      if (point.availableLanguage) {
        contactData.availableLanguage = point.availableLanguage;
      }

      return contactData;
    });
  }

  return <JsonLd data={data} id="organization-schema" />;
}
