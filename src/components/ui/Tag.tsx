import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-3 py-1 font-mono text-[0.7rem] tracking-wide text-[var(--color-ink-muted)]",
        className
      )}
    >
      {children}
    </span>
  );
}
