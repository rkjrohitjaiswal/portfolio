import { motion } from "framer-motion";
import { Code2, Cpu, Zap, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeUp } from "@/lib/motion";

const CAPABILITIES = [
  {
    icon: Code2,
    number: "01",
    title: "Full-Stack Development",
    description:
      "Engineering responsive web applications using modern frontend frameworks, robust Node/Express backends, and structured database models.",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs"],
  },
  {
    icon: Cpu,
    number: "02",
    title: "AI Integration",
    description:
      "Embedding LLM models, prompt pipelines, and intelligent API features directly into functional web products.",
    tags: ["Gemini API", "LLM Integration", "Prompt Engineering", "AI Workflows"],
  },
  {
    icon: Zap,
    number: "03",
    title: "Workflow Automation",
    description:
      "Designing automated n8n workflows, webhook triggers, and third-party API connectors to eliminate manual tasks.",
    tags: ["n8n", "Webhooks", "API Integration", "Task Automation"],
  },
  {
    icon: Rocket,
    number: "04",
    title: "Product Engineering",
    description:
      "Taking digital concepts from architectural planning and UI development through to cloud deployment.",
    tags: ["System Architecture", "UI Engineering", "Vite", "Cloud Deployment"],
  },
];

export function WhatIBuild() {
  return (
    <section id="what-i-build" className="py-16 sm:py-20 lg:py-24 scroll-mt-24">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Capabilities"
          title="What I Build"
          description="A focused breakdown of full-stack engineering, applied AI, and automated workflows."
        />

        <motion.div
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CAPABILITIES.map((cap) => (
            <motion.div
              key={cap.title}
              variants={fadeUp}
              className="group card-surface relative flex flex-col justify-between rounded-2xl p-6 border border-[var(--color-border)] transition-all duration-300 hover:border-[var(--color-accent)]/50 hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="inline-flex rounded-xl bg-[var(--color-accent-soft)] p-3 text-[var(--color-accent)] transition-transform duration-300 group-hover:scale-110">
                    <cap.icon size={22} />
                  </div>
                  <span className="font-mono text-xs font-medium text-[var(--color-ink-faint)]">
                    {cap.number}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-lg font-semibold text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                  {cap.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                  {cap.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--color-border-soft)] flex flex-wrap gap-1.5">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[0.68rem] text-[var(--color-ink-faint)] bg-[var(--color-bg-soft)] px-2 py-0.5 rounded border border-[var(--color-border-soft)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
