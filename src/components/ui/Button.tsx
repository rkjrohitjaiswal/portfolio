import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:brightness-110 active:brightness-95 shadow-[0_0_0_1px_rgba(226,163,67,0.25)]",
  secondary:
    "bg-transparent text-[var(--color-ink)] border border-[var(--color-border)] hover:border-[var(--color-ink-faint)] hover:bg-[var(--color-surface-hover)]",
  ghost:
    "bg-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
  disabled?: boolean;
}

export function ButtonLink({
  variant = "primary",
  className,
  children,
  disabled,
  href,
  ...props
}: ButtonLinkProps) {
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={cn(base, variants[variant], "opacity-40 pointer-events-none", className)}
      >
        {children}
      </span>
    );
  }

  return (
    <a href={href} className={cn(base, variants[variant], className)} {...props}>
      {children}
    </a>
  );
}
