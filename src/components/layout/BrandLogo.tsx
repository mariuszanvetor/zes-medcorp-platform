import Image from "next/image";

import { brand, brandAssets } from "@/lib/brand";
import { cn } from "@/lib/utils";

export type BrandLogoProps = {
  inverse?: boolean;
  compact?: boolean;
};

export function BrandLogo({ inverse = false, compact = false }: BrandLogoProps) {
  const logoSrc = inverse ? brandAssets.logoWhite : brandAssets.logoColor;

  return (
    <span
      className={cn(
        "inline-flex items-center",
        inverse && "rounded-md bg-white px-2 py-1",
      )}
    >
      <Image
        alt={brand.brandName}
        className={cn(
          "h-auto w-auto object-contain",
          compact ? "max-h-10 max-w-[164px]" : "max-h-14 max-w-[220px]",
        )}
        height={96}
        priority
        src={logoSrc}
        width={260}
      />
    </span>
  );
}
