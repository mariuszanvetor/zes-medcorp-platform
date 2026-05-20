import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type CardVariant = "surface" | "dark" | "glass" | "outline";
export type CardPadding = "none" | "sm" | "md" | "lg";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "article" | "section";
  variant?: CardVariant;
  padding?: CardPadding;
  interactive?: boolean;
};

const cardBase =
  "relative overflow-hidden rounded-[1.25rem] border transition-[border-color,box-shadow,transform] duration-200 ease-out";

const cardVariants: Record<CardVariant, string> = {
  surface:
    "border-slate-200 bg-white text-slate-950 shadow-[0_18px_60px_rgba(15,23,42,0.055)]",
  dark:
    "border-white/10 bg-slate-950/95 text-white shadow-[0_24px_70px_rgba(2,6,23,0.38)]",
  glass:
    "border-white/10 bg-white/[0.06] text-white shadow-[0_24px_70px_rgba(2,6,23,0.28)] backdrop-blur-xl",
  outline: "border-slate-200 bg-transparent text-slate-950",
};

const cardPadding: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export function Card({
  as: Component = "div",
  variant = "surface",
  padding = "md",
  interactive = false,
  className,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        cardBase,
        cardVariants[variant],
        cardPadding[padding],
        interactive &&
          "motion-safe:hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_26px_80px_rgba(0,87,184,0.11)]",
        className,
      )}
      {...props}
    />
  );
}
