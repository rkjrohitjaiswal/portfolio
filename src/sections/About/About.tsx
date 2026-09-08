import { motion } from "framer-motion";
import { Brain, GraduationCap, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { AboutVisual } from "./AboutVisual";
import { easePremium, staggerContainer, fadeUp } from "@/lib/motion";

const INFO_CARDS = [
  { icon: Brain, label: "FOCUS", value: profile.focus },
  { icon: GraduationCap, label: "EDUCATION", value: profile.education },
  { icon: MapPin, label: "BASED IN", value: profile.location },
];

export function About() {
  return (
    <section id="about" className="py-14 sm:py-16 lg:py-20 scroll-mt-20">
      <div className="container-wide">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 items-center">
          {/* LEFT — Primary system.interface Visual Panel */}
          <div className="w-full flex justify-center lg:justify-start">
            <AboutVisual />
          </div>

          {/* RIGHT — Heading, bio & information cards */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: easePremium }}
            >
              <span className="label-eyebrow block">About</span>
              <h2 className="mt-3 text-2xl font-semibold leading-[1.2] text-[var(--color-ink)] sm:text-3xl lg:text-[2.25rem]">
                Building web products with modern engineering &amp; AI.
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: 0.08, ease: easePremium }}
              className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-ink-muted)] sm:text-base sm:leading-relaxed"
            >
              {profile.bio}
            </motion.p>

            {/* Information cards staggered entrance */}
            <motion.div
              variants={staggerContainer(0.08, 0.12)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="mt-8 grid gap-4 sm:grid-cols-3 items-stretch"
            >
              {INFO_CARDS.map((card) => (
                <motion.div
                  key={card.label}
                  variants={fadeUp}
                  className="group card-surface flex h-full flex-col justify-between gap-3 rounded-xl p-4 sm:p-4.5 border border-[var(--color-border)] transition-all duration-300 hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-surface-hover)]"
                >
                  <div className="inline-flex w-fit rounded-lg bg-[var(--color-accent-soft)] p-2 text-[var(--color-accent)] transition-transform duration-300 group-hover:scale-105">
                    <card.icon size={17} />
                  </div>
                  <div>
                    <p className="font-mono text-[0.63rem] uppercase tracking-wider text-[var(--color-ink-faint)]">
                      {card.label}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm font-semibold text-[var(--color-ink)] leading-snug">{card.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
