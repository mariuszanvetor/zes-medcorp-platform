import { JsonLd, type JsonLdObject } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/seo";

export type ProductSchemaProperty = {
  label: string;
  value: string;
};

export type ProductSchemaProps = {
  name: string;
  description: string;
  url: string;
  image?: string;
  sku?: string;
  brand?: string;
  category?: string;
  properties?: ProductSchemaProperty[];
};

export function ProductSchema({
  brand,
  category,
  description,
  image,
  name,
  properties = [],
  sku,
  url,
}: ProductSchemaProps) {
  const data: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: new URL(url, siteConfig.url).toString(),
    category: category || "Produse medicale",
    brand: {
      "@type": "Brand",
      name: brand || siteConfig.name,
    },
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  if (image) {
    data.image = new URL(image, siteConfig.url).toString();
  }

  if (sku) {
    data.sku = sku;
  }

  if (properties.length) {
    data.additionalProperty = properties.slice(0, 12).map((property) => ({
      "@type": "PropertyValue",
      name: property.label,
      value: property.value,
    }));
  }

  return <JsonLd data={data} id={`product-schema-${sku || name.toLowerCase().replace(/\s+/g, "-")}`} />;
}
