import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type EyebrowTone = "cyan" | "blue" | "graphite";

export type EyebrowProps = HTMLAttributes<HTMLParagraphElement> & {
  as?: "p" | "span" | "div";
  tone?: EyebrowTone;
  withDot?: boolean;
};

const eyebrowTones: Record<EyebrowTone, string> = {
  cyan: "border-cyan-300/25 bg-cyan-300/10 text-cyan-100",
  blue: "border-blue-300/25 bg-blue-500/10 text-blue-100",
  graphite: "border-slate-300 bg-slate-50 text-slate-700",
};

export function Eyebrow({
  as: Component = "p",
  tone = "cyan",
  withDot = true,
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <Component
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold leading-none",
        eyebrowTones[tone],
        className,
      )}
      {...props}
    >
      {withDot && (
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_14px_currentColor]"
        />
      )}
      {children}
    </Component>
  );
}
