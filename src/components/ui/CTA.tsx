import type { HTMLAttributes, ReactNode } from "react";

import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { Button, type ButtonVariant } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type CTAAction = {
  label: string;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  variant?: ButtonVariant;
};

export type CTAProps = HTMLAttributes<HTMLDivElement> & {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  primaryAction?: CTAAction;
  secondaryAction?: CTAAction;
  align?: "left" | "center";
  tone?: "dark" | "light";
};

function renderAction(action: CTAAction, fallbackVariant: ButtonVariant) {
  const variant = action.variant ?? fallbackVariant;

  if (action.href) {
    return (
      <TrackedButtonLink
        href={action.href}
        aria-label={action.ariaLabel}
        tracking={{ ctaLabel: action.label, destination: action.href }}
        variant={variant}
      >
        {action.label}
      </TrackedButtonLink>
    );
  }

  return (
    <Button
      aria-label={action.ariaLabel}
      onClick={action.onClick}
      type="button"
      variant={variant}
    >
      {action.label}
    </Button>
  );
}

export function CTA({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  align = "left",
  tone = "dark",
  className,
  children,
  ...props
}: CTAProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border p-6 sm:p-8",
        tone === "dark"
          ? "border-white/10 bg-slate-950 text-white shadow-[0_24px_70px_rgba(2,6,23,0.38)]"
          : "border-slate-200 bg-white text-slate-950 shadow-[0_20px_60px_rgba(15,23,42,0.10)]",
        isCentered && "text-center",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "relative z-10 flex flex-col gap-5",
          isCentered && "items-center",
        )}
      >
        {eyebrow && (
          <div className={cn("text-sm font-semibold", tone === "dark" ? "text-cyan-100" : "text-blue-700")}>
            {eyebrow}
          </div>
        )}
        <div className={cn("max-w-3xl", isCentered && "mx-auto")}>
          <h2 className="text-2xl font-semibold leading-tight text-balance sm:text-3xl">
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                "mt-3 max-w-2xl text-base leading-7",
                tone === "dark" ? "text-slate-300" : "text-slate-600",
                isCentered && "mx-auto",
              )}
            >
              {description}
            </p>
          )}
        </div>
        {children}
        {(primaryAction || secondaryAction) && (
          <div
            className={cn(
              "flex flex-col gap-3 sm:flex-row",
              isCentered && "justify-center",
            )}
          >
            {primaryAction && renderAction(primaryAction, "primary")}
            {secondaryAction && renderAction(secondaryAction, tone === "dark" ? "ghost" : "secondary")}
          </div>
        )}
      </div>
    </div>
  );
}
