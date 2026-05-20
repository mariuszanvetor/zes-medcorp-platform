import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type BadgeVariant = "neutral" | "blue" | "cyan" | "dark" | "critical";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const badgeVariants: Record<BadgeVariant, string> = {
  neutral: "border-slate-200 bg-white text-slate-700",
  blue: "border-blue-200 bg-blue-50 text-blue-800",
  cyan: "border-cyan-200 bg-cyan-50 text-cyan-800",
  dark: "border-white/10 bg-slate-900 text-slate-100",
  critical: "border-rose-200 bg-rose-50 text-rose-800",
};

export function Badge({
  variant = "neutral",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold leading-none",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  );
}
