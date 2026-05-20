"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { trackCTA, type AnalyticsPayload } from "@/lib/analytics";

export type TrackedButtonLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "href" | "type"
> & {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  tracking?: AnalyticsPayload;
};

export function TrackedButtonLink({
  href,
  children,
  tracking,
  onClick,
  ...props
}: TrackedButtonLinkProps) {
  return (
    <Button
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          trackCTA({
            ctaLabel: tracking?.ctaLabel ?? textLabel(children),
            destination: href,
            ...tracking,
          });
        }
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

function textLabel(children: ReactNode) {
  return typeof children === "string" ? children : undefined;
}
