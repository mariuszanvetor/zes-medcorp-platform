export const brand = {
  brandName: "ZES MEDCORP",
  shortName: "ZES",
  locale: "ro_RO",
  language: "ro",
  siteUrl: "https://www.zescorp.ro",
  primaryColor: "#0057B8",
  themeColor: "#0057B8",
  deepBlue: "#003B7A",
  cyan: "#21B7D8",
  backgroundColor: "#FFFFFF",
};

export const companyContact = {
  legalName: "SC ZES MEDCORP S.R.L.",
  displayName: "ZES MEDCORP",
  email: "office@zescorp.ro",
  emailHref: "mailto:office@zescorp.ro",
  phonePrimary: "0725 514 782",
  phoneSecondary: "0773 497 800",
  phones: ["0725 514 782", "0773 497 800"],
  phone: "0725 514 782 / 0773 497 800",
  phoneInternationalPrimary: "+40725514782",
  phoneInternational: "+40725514782",
  phoneInternationalSecondary: "+40773497800",
  phoneInternationals: ["+40725514782", "+40773497800"],
  phoneInternationalDisplay: "+40725514782 / +40773497800",
  phoneHref: "tel:+40725514782",
  phoneSecondaryHref: "tel:+40773497800",
  whatsappHref: "https://wa.me/40725514782",
  cui: "52942540",
  tradeRegister: "J2025089432009",
  address: {
    streetAddress: "Str. Nazuintei nr. 11B",
    addressLocality: "Bragadiru",
    addressRegion: "Ilfov",
    addressCountry: "RO",
    full: "Str. Nazuintei nr. 11B, Bragadiru, Ilfov",
  },
  positioning:
    "Infrastructura medicala, echipamente, imagistica, laborator, RF shielding, radioprotectie, service si mentenanta pentru proiecte medicale.",
};

export const futureBrandAssets = {
  logoColor: "/brand/logo/logo-color.svg",
  logoWhite: "/brand/logo/logo-white.svg",
  logoMark: "/brand/logo/logo-mark.svg",
  logoHorizontal: "/brand/logo/logo-horizontal.svg",
  favicon: "/brand/icons/favicon.ico",
  appleIcon: "/brand/icons/apple-icon.png",
  ogHome: "/brand/og/og-home.png",
  ogServices: "/brand/og/og-services.png",
  ogKnowledge: "/brand/og/og-knowledge.png",
  ogTools: "/brand/og/og-tools.png",
};

export const fallbackBrandAssets = {
  logoColor: "/logo-zes.png",
  logoWhite: "/logo-zes.png",
  logoMark: "/logo-zes.png",
  logoHorizontal: "/logo-zes.png",
  favicon: "/favicon.ico",
  appleIcon: "/apple-icon.png",
  icon: "/icon.png",
  ogHome: "/og/home.png",
  ogServices: "/og/services.png",
  ogKnowledge: "/og/knowledge.png",
  ogTools: "/og/tools.png",
};

export const brandAssets = {
  ...fallbackBrandAssets,
  expected: futureBrandAssets,
  fallback: fallbackBrandAssets,
};

export type BrandOgVariant = "website" | "services" | "knowledge" | "tools";

export function getBrandOgImage(variant: BrandOgVariant = "website") {
  const images: Record<BrandOgVariant, string> = {
    website: brandAssets.ogHome,
    services: brandAssets.ogServices,
    knowledge: brandAssets.ogKnowledge,
    tools: brandAssets.ogTools,
  };

  return images[variant];
}
