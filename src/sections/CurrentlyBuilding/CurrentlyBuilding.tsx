import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { easePremium } from "@/lib/motion";

export function CurrentlyBuilding() {
  return (
    <section id="currently-building" className="py-16 sm:py-20 scroll-mt-24">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easePremium }}
          className="card-surface relative overflow-hidden rounded-2xl border border-[var(--color-border)] p-8 sm:p-10"
        >

          {/* Subtle accent glow */}
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-[0.12] blur-3xl"
            style={{ background: "var(--color-accent)" }}
          />

          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] px-3 py-1">
                <Sparkles size={13} className="text-[var(--color-accent)] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-semibold">
                  CURRENTLY BUILDING
                </span>
              </div>

              <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-muted)] leading-relaxed">
                Two new products are currently in development. They&apos;ll be added here once they&apos;re ready.
              </p>
            </div>

            {/* Preview cards for projects currently in development */}
            <div className="grid w-full gap-4 sm:grid-cols-2 lg:w-auto">
              {[
                {
                  name: "CareerPilot Agent",
                  status: "In Dev",
                  tagline: "Coming soon...",
                  description: "AI-powered career assistance and job-search workflow project."
                },
                {
                  name: "ProjectMentor AI",
                  status: "In Dev",
                  tagline: "Coming soon...",
                  description: "AI-powered project guidance and development mentorship platform."
                }
              ].map((project) => (
                <div
                  key={project.name}
                  title={project.description}
                  className="flex min-w-[220px] items-center gap-3.5 rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-bg-soft)]/80 px-4 py-3.5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-accent)]">
                    <Loader2 size={16} className="animate-spin opacity-80" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[var(--color-accent)] font-medium whitespace-nowrap">
                        {project.name}
                      </span>
                      <span className="font-mono text-[0.6rem] text-[var(--color-ink-faint)] bg-[var(--color-surface)] px-1.5 py-0.5 rounded border border-[var(--color-border-soft)] shrink-0">
                        {project.status}
                      </span>
                    </div>
                    <p className="mt-0.5 font-mono text-xs text-[var(--color-ink-faint)]">
                      {project.tagline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
