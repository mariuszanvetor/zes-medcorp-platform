"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { trackCTA, type AnalyticsPayload } from "@/lib/analytics";

export type TrackedLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  href: string;
  children: ReactNode;
  tracking?: AnalyticsPayload;
};

export function TrackedLink({
  href,
  children,
  tracking,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
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
    </Link>
  );
}

function textLabel(children: ReactNode) {
  return typeof children === "string" ? children : undefined;
}
