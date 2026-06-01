"use client";

import type { ReactNode } from "react";

import { trackCTA } from "@/lib/analytics";
import { openZESPopup } from "@/lib/zes-popup";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";

type OpenZESButtonProps = {
  prompt?: string;
  sourcePage?: string;
  ctaLabel?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  dataCta?: string;
  pageIntent?: string;
  children: ReactNode;
};

export function OpenZESButton({
  prompt,
  sourcePage = "/",
  ctaLabel = "Discuta cu ZES",
  dataCta = "zes-open",
  pageIntent,
  children,
  ...buttonProps
}: OpenZESButtonProps) {
  return (
    <Button
      {...buttonProps}
      data-cta={dataCta}
      data-page-intent={pageIntent}
      onClick={() => {
        openZESPopup({ prompt, source: sourcePage });
        trackCTA({
          sourcePage,
          sourceTool: "zes-popup",
          ctaLabel,
          destination: "floating-zes",
        });
      }}
    >
      {children}
    </Button>
  );
}
