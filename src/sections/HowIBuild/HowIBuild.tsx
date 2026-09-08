import { motion } from "framer-motion";
import { Search, Layout, Code, Network, CheckCircle2, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeUp } from "@/lib/motion";

const STEPS = [
  {
    step: "01",
    name: "Understand",
    description: "Break down the product goal, users, requirements, and technical constraints before writing code.",
    icon: Search,
  },
  {
    step: "02",
    name: "Design / Architect",
    description: "Plan the UI, application structure, APIs, data flow, and integrations around a maintainable architecture.",
    icon: Layout,
  },
  {
    step: "03",
    name: "Build",
    description: "Develop responsive interfaces and full-stack features using modern frontend, backend, database, and API technologies.",
    icon: Code,
  },
  {
    step: "04",
    name: "Integrate",
    description: "Connect AI models, third-party APIs, authentication, databases, cloud services, and automation workflows where they add real value.",
    icon: Network,
  },
  {
    step: "05",
    name: "Test",
    description: "Validate functionality, responsiveness, edge cases, API behavior, and the overall user experience before shipping.",
    icon: CheckCircle2,
  },
  {
    step: "06",
    name: "Ship",
    description: "Deploy the product, verify the production environment, fix issues, and iterate based on real usage and feedback.",
    icon: Send,
  },
];

export function HowIBuild() {
  return (
    <section id="how-i-build" className="py-16 sm:py-20 lg:py-24 scroll-mt-24">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Workflow"
          title="How I Build"
          description="A structured 6-step engineering process for bringing ideas from concept to production."
        />

        <motion.div
          variants={staggerContainer(0.07, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {STEPS.map((item) => (
            <motion.div
              key={item.step}
              variants={fadeUp}
              className="group card-surface relative flex flex-col justify-between rounded-2xl p-6 border border-[var(--color-border)] transition-all duration-300 hover:border-[var(--color-accent)]/60 hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[var(--color-accent)] bg-[var(--color-accent-soft)] px-2.5 py-1 rounded border border-[var(--color-accent)]/20">
                    {item.step} — {item.name}
                  </span>
                  <div className="rounded-lg bg-[var(--color-bg-soft)] p-2 text-[var(--color-ink-muted)] transition-colors group-hover:text-[var(--color-accent)]">
                    <item.icon size={18} />
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
