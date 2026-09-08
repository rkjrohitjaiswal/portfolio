import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easePremium } from "@/lib/motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: easePremium }}
      className={cn(
        "mb-12 flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <span className="label-eyebrow">{eyebrow}</span>
      <h2 className="text-3xl font-semibold text-[var(--color-ink)] sm:text-4xl">{title}</h2>
      {description && (
        <p className={cn("max-w-xl text-base text-[var(--color-ink-muted)]", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </motion.div>
  );
}

