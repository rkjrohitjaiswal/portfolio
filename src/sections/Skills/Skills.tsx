import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeUp } from "@/lib/motion";

export function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 scroll-mt-24">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I reach for"
          description="A working toolkit across full-stack engineering, databases, automation, and applied AI."
        />

        <motion.div
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={fadeUp}
              className="card-surface rounded-2xl p-6 border border-[var(--color-border)] transition-all duration-300 hover:border-[var(--color-accent)]/40 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
                  {category.title}
                </h3>
                <span className="font-mono text-[0.65rem] text-[var(--color-ink-faint)]">
                  {category.skills.length} tools
                </span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.li
                    key={skill}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-3 py-1.5 text-xs font-medium text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-accent)]/60 hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-hover)]"
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
