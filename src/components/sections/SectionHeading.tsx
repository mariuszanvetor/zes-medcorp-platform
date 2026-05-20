import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

export type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  mode?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  mode = "light",
  className,
}: SectionHeadingProps) {
  const isCentered = align === "center";
  const isDark = mode === "dark";

  return (
    <div
      className={cn(
        "max-w-3xl",
        isCentered && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow tone={isDark ? "cyan" : "graphite"}>{eyebrow}</Eyebrow>
      )}
      <h2
        className={cn(
          "mt-5 text-3xl font-semibold leading-tight text-balance sm:text-4xl lg:text-5xl",
          isDark ? "text-white" : "text-slate-950",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-8 sm:text-lg",
            isDark ? "text-slate-300" : "text-slate-600",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
