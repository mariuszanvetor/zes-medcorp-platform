import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "dark";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  className?: string;
};

type ButtonLinkProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
    href: string;
    disabled?: boolean;
    type?: never;
  };

type ButtonNativeProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

export type ButtonProps = ButtonLinkProps | ButtonNativeProps;

const buttonBase =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border font-semibold leading-none transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 motion-safe:hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "border-[#0057b8] bg-[#0057b8] text-white shadow-[0_14px_30px_rgba(0,87,184,0.18)] hover:bg-[#00498f] hover:shadow-[0_18px_38px_rgba(0,87,184,0.16)]",
  secondary:
    "border-blue-100 bg-white text-slate-950 shadow-[0_10px_24px_rgba(15,23,42,0.06)] hover:border-blue-200 hover:bg-blue-50/60",
  outline:
    "border-cyan-300/35 bg-cyan-300/10 text-cyan-50 hover:border-cyan-200/60 hover:bg-cyan-300/15",
  ghost:
    "border-transparent bg-transparent text-slate-100 hover:border-white/10 hover:bg-white/10",
  dark:
    "border-white/10 bg-slate-950 text-white shadow-[0_16px_34px_rgba(2,6,23,0.28)] hover:border-cyan-300/30 hover:bg-slate-900",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

function ButtonContent({
  children,
  isLoading,
  leftIcon,
  rightIcon,
}: Pick<ButtonBaseProps, "children" | "isLoading" | "leftIcon" | "rightIcon">) {
  return (
    <>
      {isLoading ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      ) : (
        leftIcon && (
          <span aria-hidden="true" className="inline-flex shrink-0">
            {leftIcon}
          </span>
        )
      )}
      {children && <span className="inline-flex">{children}</span>}
      {!isLoading && rightIcon && (
        <span aria-hidden="true" className="inline-flex shrink-0">
          {rightIcon}
        </span>
      )}
    </>
  );
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    isLoading = false,
    leftIcon,
    rightIcon,
    className,
    children,
    ...interactiveProps
  } = props;

  const classes = cn(
    buttonBase,
    buttonVariants[variant],
    buttonSizes[size],
    fullWidth && "w-full",
    isLoading && "pointer-events-none opacity-70",
    className,
  );

  if ("href" in interactiveProps && interactiveProps.href) {
    const { href, disabled, target, rel, ...anchorProps } = interactiveProps;
    const safeRel = target === "_blank" ? (rel ?? "noreferrer") : rel;
    const isDisabled = disabled || isLoading;

    return (
      <a
        aria-busy={isLoading || undefined}
        aria-disabled={isDisabled || undefined}
        className={cn(classes, isDisabled && "pointer-events-none opacity-60")}
        href={isDisabled ? undefined : href}
        rel={safeRel}
        target={target}
        {...anchorProps}
      >
        <ButtonContent
          isLoading={isLoading}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
        >
          {children}
        </ButtonContent>
      </a>
    );
  }

  const { disabled, type = "button", ...buttonProps } = interactiveProps as Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className"
  > & {
    href?: undefined;
  };

  return (
    <button
      aria-busy={isLoading || undefined}
      className={classes}
      disabled={disabled || isLoading}
      type={type}
      {...buttonProps}
    >
      <ButtonContent
        isLoading={isLoading}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
      >
        {children}
      </ButtonContent>
    </button>
  );
}
