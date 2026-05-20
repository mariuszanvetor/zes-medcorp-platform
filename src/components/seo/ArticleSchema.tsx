import { JsonLd, type JsonLdObject } from "@/components/seo/JsonLd";
import { getCanonicalUrl, siteConfig } from "@/lib/seo";

export type ArticleSchemaProps = {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  image?: string;
};

export function ArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  authorName = siteConfig.name,
  image,
}: ArticleSchemaProps) {
  const canonical = getCanonicalUrl(url);
  const data: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: canonical,
    mainEntityOfPage: canonical,
    datePublished,
    author: {
      "@type": "Organization",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  if (dateModified) {
    data.dateModified = dateModified;
  }

  if (image) {
    data.image = getCanonicalUrl(image);
  }

  return <JsonLd data={data} id={`article-schema-${headline.toLowerCase().replace(/\s+/g, "-")}`} />;
}
