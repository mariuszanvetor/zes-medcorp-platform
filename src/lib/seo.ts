import type { Metadata } from "next";

import {
  brand,
  brandAssets,
  getBrandOgImage,
  type BrandOgVariant,
} from "@/lib/brand";

export const siteConfig = {
  name: brand.brandName,
  url: brand.siteUrl,
  locale: brand.locale,
  language: brand.language,
  defaultDescription:
    "Platformă pentru infrastructură medicală, tehnologie medicală, aparatură, imagistică, IVD, ecranare specializată și service.",
  homepageTitle:
    "ZES MEDCORP | Infrastructură medicală, aparatură, imagistică și service",
  homepageDescription:
    "Infrastructură medicală, aparatură, imagistică medicală, IVD, radiologie, RF shielding pentru RMN, protecție radiologică și service specializat.",
  defaultImage: brandAssets.ogHome,
};

export type MetadataKind = "website" | "article";

export const brandTheme = {
  blue: brand.primaryColor,
  deepBlue: brand.deepBlue,
  cyan: brand.cyan,
  background: brand.backgroundColor,
};

export type BaseMetadataParams = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export type ArticleMetadataParams = BaseMetadataParams & {
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
};

export type ServiceMetadataParams = Omit<BaseMetadataParams, "path"> & {
  slug: string;
};

export function getCanonicalUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}

type OgVariant = BrandOgVariant;

function getOgContext(path: string): { label: string; variant: OgVariant } {
  if (path === "/") {
    return { label: "Medical infrastructure", variant: "website" };
  }

  if (path.startsWith("/services")) {
    return { label: "Servicii ZES", variant: "services" };
  }

  if (path.startsWith("/knowledge-hub") || path.startsWith("/ghiduri")) {
    return { label: "Knowledge Hub", variant: "knowledge" };
  }

  if (
    path.startsWith("/calculatoare") ||
    path.includes("calculator") ||
    path.includes("advisor") ||
    path.includes("planner") ||
    path.includes("diagnostic") ||
    path.includes("proposal")
  ) {
    return { label: "Instrument ZES", variant: "tools" };
  }

  return { label: siteConfig.name, variant: "website" };
}

export function createOgImagePath({
  variant,
}: {
  title: string;
  label?: string;
  variant?: OgVariant;
}): string {
  return getBrandOgImage(variant ?? "website");
}

function buildTwitterMetadata({
  title,
  description,
  image,
}: Pick<BaseMetadataParams, "title" | "description" | "image">): Metadata["twitter"] {
  return {
    card: image ? "summary_large_image" : "summary",
    title: {
      absolute: title,
    },
    description,
    ...(image ? { images: [getCanonicalUrl(image)] } : {}),
  };
}

export function createWebsiteMetadata({
  title,
  description,
  path = "/",
  image,
  keywords,
  noIndex = false,
}: BaseMetadataParams): Metadata {
  const canonical = getCanonicalUrl(path);
  const ogContext = getOgContext(path);
  const metadataImage =
    image ??
    createOgImagePath({
      title,
      label: ogContext.label,
      variant: ogContext.variant,
    });

  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "medical technology",
    title: {
      absolute: title,
    },
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        ro: canonical,
      },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      images: [
        {
          url: getCanonicalUrl(metadataImage),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: buildTwitterMetadata({ title, description, image: metadataImage }),
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}

export function createArticleMetadata({
  title,
  description,
  path = "/knowledge-hub",
  image,
  keywords,
  noIndex = false,
  publishedTime,
  modifiedTime,
  authors = [siteConfig.name],
  tags,
}: ArticleMetadataParams): Metadata {
  const canonical = getCanonicalUrl(path);
  const metadataImage =
    image ??
    createOgImagePath({
      title,
      label: "Knowledge Hub",
      variant: "knowledge",
    });

  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    creator: siteConfig.name,
    publisher: siteConfig.name,
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        ro: canonical,
      },
    },
    openGraph: {
      type: "article",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      publishedTime,
      modifiedTime,
      authors,
      tags,
      images: [
        {
          url: getCanonicalUrl(metadataImage),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: buildTwitterMetadata({ title, description, image: metadataImage }),
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}

export function createServiceMetadata({
  title,
  description,
  slug,
  image,
  keywords,
  noIndex,
}: ServiceMetadataParams): Metadata {
  return createWebsiteMetadata({
    title: `${title} | Servicii ${siteConfig.name}`,
    description,
    path: `/services/${slug}`,
    image,
    keywords,
    noIndex,
  });
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "medical technology",
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.defaultDescription,
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: brandAssets.favicon, sizes: "32x32" },
      { url: brandAssets.icon, type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: brandAssets.appleIcon, type: "image/png", sizes: "180x180" }],
    shortcut: [brandAssets.favicon],
  },
  alternates: {
    canonical: getCanonicalUrl("/"),
    languages: {
      ro: getCanonicalUrl("/"),
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.defaultDescription,
    url: getCanonicalUrl("/"),
    images: [
      {
        url: getCanonicalUrl(siteConfig.defaultImage),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: buildTwitterMetadata({
    title: siteConfig.name,
    description: siteConfig.defaultDescription,
    image: siteConfig.defaultImage,
  }),
  robots: {
    index: true,
    follow: true,
  },
};

export const homepageMetadata = createWebsiteMetadata({
  title: siteConfig.homepageTitle,
  description: siteConfig.homepageDescription,
  path: "/",
  keywords: [
    "infrastructură medicală",
    "construcții medicale",
    "radiologie",
    "ecranare RF",
    "imagistică medicală",
    "IVD laborator",
    "aparatură medicală",
    "service aparatură medicală",
  ],
});
