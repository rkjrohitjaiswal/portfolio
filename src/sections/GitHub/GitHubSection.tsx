import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { easePremium } from "@/lib/motion";

export function GitHubSection() {
  return (
    <section id="github" className="border-t border-[var(--color-border-soft)] py-24 sm:py-32 scroll-mt-24">
      <div className="container-wide">
        <SectionHeading eyebrow="GitHub" title="Code in the Open" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easePremium }}
          whileHover={{ y: -4 }}
          className="group card-surface relative flex flex-col items-start justify-between gap-6 rounded-2xl p-8 border border-[var(--color-border)] transition-all duration-300 hover:border-[var(--color-accent)]/60 hover:shadow-[0_16px_40px_-15px_rgba(0,0,0,0.6)] sm:flex-row sm:items-center"
        >

          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-[var(--color-bg-soft)] p-3.5 text-[var(--color-ink)] transition-transform duration-300 group-hover:scale-110 group-hover:text-[var(--color-accent)]">
              <GithubIcon size={28} />
            </div>
            <div>
              <p className="font-display text-xl font-semibold text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                @{profile.links.githubUsername}
              </p>
              <p className="mt-1 text-sm text-[var(--color-ink-muted)] max-w-md">
                Explore repositories, active projects, and full-stack codebases.
              </p>
            </div>
          </div>

          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition-all duration-200 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-ink)] active:scale-95"
          >
            View GitHub Profile
            <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
