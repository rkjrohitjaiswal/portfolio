import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { easePremium } from "@/lib/motion";

export function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-24 lg:py-28 scroll-mt-24">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: easePremium }}
          className="max-w-3xl"
        >
          <span className="label-eyebrow block text-xs tracking-[0.2em] uppercase font-mono text-[var(--color-accent)]">
            FEATURED PROJECTS
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-[var(--color-ink)] sm:text-6xl lg:text-7xl">
            Selected Work
          </h2>
        </motion.div>

        {/* Editorial Project Case Studies */}
        <div className="mt-14 space-y-16 sm:mt-20 sm:space-y-24 lg:mt-24 lg:space-y-28">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="pb-16 last:pb-0 sm:pb-24 lg:pb-28"
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


