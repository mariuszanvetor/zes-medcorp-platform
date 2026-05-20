import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type SectionTone = "graphite" | "white" | "transparent";
export type SectionSpacing = "sm" | "md" | "lg" | "xl";

export type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "header" | "footer" | "main";
  tone?: SectionTone;
  spacing?: SectionSpacing;
};

const sectionTones: Record<SectionTone, string> = {
  graphite: "bg-slate-950 text-white",
  white: "bg-white text-slate-950",
  transparent: "bg-transparent text-inherit",
};

const sectionSpacing: Record<SectionSpacing, string> = {
  sm: "py-12 sm:py-14",
  md: "py-16 sm:py-20",
  lg: "py-20 sm:py-28",
  xl: "py-24 sm:py-32",
};

export function Section({
  as: Component = "section",
  tone = "transparent",
  spacing = "lg",
  className,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(
        "relative isolate w-full",
        sectionTones[tone],
        sectionSpacing[spacing],
        className,
      )}
      {...props}
    />
  );
}
