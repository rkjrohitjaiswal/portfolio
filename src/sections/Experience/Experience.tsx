import { motion } from "framer-motion";
import { experience, freelanceWork, type ExperienceItem } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { easePremium, staggerContainer } from "@/lib/motion";

function TimelineGroup({ title, items }: { title: string; items: ExperienceItem[] }) {
  return (
    <div>
      <h3 className="mb-8 font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-semibold">
        {title}
      </h3>
      <div className="relative pl-6">
        {/* Progressively drawn vertical timeline line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: easePremium }}
          className="absolute left-0 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-border)] to-[var(--color-border-soft)]"
        />

        <motion.ol
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-10"
        >
          {items.map((entry) => (
            <motion.li
              key={entry.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easePremium } },
              }}
              className="relative group"
            >
              {/* Timeline node */}
              <div className="absolute -left-[1.85rem] top-1.5 flex items-center justify-center">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-40 group-hover:opacity-80" />
                  <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
                </span>
              </div>

              <div className="card-surface rounded-xl p-5 border border-[var(--color-border)] transition-all duration-300 group-hover:border-[var(--color-accent)]/50 group-hover:bg-[var(--color-surface-hover)]">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-display text-lg font-semibold text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                    {entry.role}
                  </h4>
                  <span className="font-mono text-xs font-medium text-[var(--color-accent)] bg-[var(--color-accent-soft)] px-2 py-0.5 rounded border border-[var(--color-accent)]/20">
                    {entry.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-[var(--color-ink-muted)]">{entry.org}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-ink-muted)]">
                  {entry.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24 scroll-mt-24">
      <div className="container-wide">
        <SectionHeading eyebrow="Experience" title="Where I've put in the work" />

        <div className="grid gap-14 lg:grid-cols-2">
          <TimelineGroup title="Experience" items={experience} />
          <TimelineGroup title="Freelance / Independent Projects" items={freelanceWork} />
        </div>
      </div>
    </section>
  );
}
