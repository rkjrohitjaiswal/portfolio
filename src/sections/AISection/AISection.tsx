import { motion } from "framer-motion";
import { Bot, Workflow, Sparkles, ArrowDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeUp } from "@/lib/motion";

const CARDS = [
  {
    icon: Bot,
    step: "01",
    title: "AI Applications",
    description: "Building applications that integrate AI and intelligent LLM functionality.",
    details: "Prompt engineering, Gemini API integrations, role-based AI assistants.",
  },
  {
    icon: Workflow,
    step: "02",
    title: "Automation",
    description: "Creating workflows that reduce repetitive manual work through automation.",
    details: "n8n pipeline automation, webhooks, third-party API data sync.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Intelligent Products",
    description: "Combining modern full-stack web development with AI to create practical digital products.",
    details: "Production-ready MERN apps, responsive interfaces, cloud deployments.",
  },
];

export function AISection() {
  return (
    <section id="ai-section" className="relative overflow-hidden py-16 sm:py-20 lg:py-24 scroll-mt-24">
      {/* Background depth glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full opacity-[0.12] blur-[130px]"
        style={{ background: "var(--color-accent)" }}
      />

      <div className="container-wide relative">
        <SectionHeading
          eyebrow="AI & Automation"
          title="Beyond the Interface"
          description="I don't just build interfaces. I connect AI, automation, APIs, and intelligent workflows to build end-to-end capable systems."
        />

        <div className="relative">
          {/* Animated Connecting SVG Line across cards (Desktop) */}
          <div aria-hidden className="pointer-events-none absolute left-0 right-0 top-1/2 -z-0 hidden -translate-y-1/2 lg:block">
            <svg className="w-full h-12" viewBox="0 0 1000 48" fill="none">
              <line
                x1="200"
                y1="24"
                x2="800"
                y2="24"
                stroke="var(--color-border)"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />
              <motion.circle
                cx="200"
                cy="24"
                r="4"
                fill="var(--color-accent)"
                animate={{ cx: [200, 800] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-6 sm:grid-cols-3 relative z-10"
          >
            {CARDS.map((card, i) => (
              <div key={card.title} className="relative flex flex-col">
                <motion.div
                  variants={fadeUp}
                  className="group card-surface flex-1 rounded-2xl p-6 border border-[var(--color-border)] transition-all duration-300 hover:border-[var(--color-accent)]/60 hover:-translate-y-1 hover:shadow-[0_14px_35px_-12px_rgba(0,0,0,0.6)]"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="inline-flex rounded-xl bg-[var(--color-accent-soft)] p-3 text-[var(--color-accent)] transition-transform duration-300 group-hover:scale-110">
                      <card.icon size={22} />
                    </div>
                    <span className="font-mono text-xs font-semibold text-[var(--color-accent)]">
                      {card.step}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                    {card.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[var(--color-border-soft)] font-mono text-[0.72rem] text-[var(--color-ink-faint)]">
                    {card.details}
                  </div>
                </motion.div>

                {/* Mobile / Vertical Connection indicator */}
                {i < CARDS.length - 1 && (
                  <div className="my-2 flex justify-center text-[var(--color-accent)]/50 sm:hidden">
                    <ArrowDown size={16} />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
