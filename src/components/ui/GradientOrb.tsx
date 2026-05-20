import type { CSSProperties, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type GradientOrbColor = "cyan" | "blue" | "graphite";
export type GradientOrbSize = "sm" | "md" | "lg";
export type GradientOrbIntensity = "soft" | "medium" | "strong";

export type GradientOrbProps = HTMLAttributes<HTMLDivElement> & {
  color?: GradientOrbColor;
  size?: GradientOrbSize;
  intensity?: GradientOrbIntensity;
};

const orbGradients: Record<GradientOrbColor, string> = {
  cyan: "radial-gradient(circle, rgba(34,211,238,0.55), rgba(34,211,238,0.10) 42%, transparent 70%)",
  blue: "radial-gradient(circle, rgba(37,99,235,0.52), rgba(30,64,175,0.12) 42%, transparent 70%)",
  graphite:
    "radial-gradient(circle, rgba(148,163,184,0.22), rgba(15,23,42,0.16) 44%, transparent 72%)",
};

const orbSizes: Record<GradientOrbSize, string> = {
  sm: "h-32 w-32",
  md: "h-56 w-56",
  lg: "h-80 w-80",
};

const orbIntensity: Record<GradientOrbIntensity, string> = {
  soft: "opacity-30",
  medium: "opacity-45",
  strong: "opacity-60",
};

export function GradientOrb({
  color = "cyan",
  size = "md",
  intensity = "soft",
  className,
  style,
  ...props
}: GradientOrbProps) {
  return (
    <div
      {...props}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl will-change-transform",
        orbSizes[size],
        orbIntensity[intensity],
        className,
      )}
      style={{ "--orb-gradient": orbGradients[color], background: "var(--orb-gradient)", ...style } as CSSProperties}
    />
  );
}
