import { JsonLd, type JsonLdObject } from "@/components/seo/JsonLd";
import { getCanonicalUrl } from "@/lib/seo";

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export type BreadcrumbSchemaProps = {
  items: BreadcrumbItem[];
  id?: string;
};

export function BreadcrumbSchema({
  items,
  id = "breadcrumb-schema",
}: BreadcrumbSchemaProps) {
  const data: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.href),
    })),
  };

  return <JsonLd data={data} id={id} />;
}
