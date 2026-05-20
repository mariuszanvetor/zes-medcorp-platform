import type { MetadataRoute } from "next";

import { brand, brandAssets } from "@/lib/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.brandName,
    short_name: brand.shortName,
    description:
      "Platformă pentru infrastructură medicală, aparatură, imagistică, IVD, ecranare și service specializat.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: brand.backgroundColor,
    theme_color: brand.themeColor,
    icons: [
      {
        src: brandAssets.icon,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: brandAssets.appleIcon,
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
