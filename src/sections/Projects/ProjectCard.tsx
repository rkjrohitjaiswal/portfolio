import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Image as ImageIcon, Maximize2 } from "lucide-react";
import type { Project } from "@/data/projects";
import { easePremium } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { ProjectModal } from "./ProjectModal";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [imgError, setImgError] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const isReversed = index % 2 === 1;

  const initials = project.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3);

  const isLiveWebsite = Boolean(project.liveUrl);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: easePremium }}
        className="group relative"
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 xl:gap-24">
          {/* Visual Case-Study / Browser Frame */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.08, ease: easePremium }}
            className={cn("relative w-full", isReversed ? "lg:order-2" : "lg:order-1")}
          >
            <div
              onDoubleClick={() => isLiveWebsite && setIsModalOpen(true)}
              className="group/frame relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] shadow-xl transition-all duration-500 hover:border-[var(--color-accent)]/60 flex flex-col select-none cursor-pointer"
              title="Double-click preview to expand fullscreen"
            >
              {isLiveWebsite ? (
                <>
                  {/* Minimal Premium Browser Header Bar */}
                  <div className="flex h-9 w-full shrink-0 items-center justify-between border-b border-[var(--color-border-soft)] bg-[var(--color-bg-soft)] px-4">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[0.72rem] text-[var(--color-ink-muted)] min-w-0 truncate ml-1">
                        <Globe size={12} className="text-[var(--color-accent)] shrink-0" />
                        <span className="font-medium text-[var(--color-ink)] truncate">{project.name}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsModalOpen(true);
                      }}
                      className="text-[var(--color-ink-muted)] hover:text-[var(--color-accent)] transition-colors p-1 rounded shrink-0"
                      title="Expand preview"
                      aria-label="Expand preview"
                    >
                      <Maximize2 size={12} />
                    </button>
                  </div>

                  {/* Embedded Interactive Live Website Iframe */}
                  {!iframeError ? (
                    <div className="relative flex-1 w-full overflow-hidden bg-[var(--color-bg)]">
                      <iframe
                        src={project.liveUrl!}
                        title={`${project.name} Live Preview`}
                        loading="lazy"
                        onError={() => setIframeError(true)}
                        className="h-full w-full border-0 transition-opacity duration-300"
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      />
                    </div>
                  ) : (
                    /* Fallback if embedding is blocked */
                    <div className="relative flex h-full w-full flex-col items-center justify-center p-6 bg-[var(--color-bg-soft)] text-center">
                      <Globe size={24} className="text-[var(--color-accent)] mb-3" />
                      <p className="font-display text-base font-semibold text-[var(--color-ink)]">
                        Live Framing Restricted
                      </p>
                      <p className="mt-1 font-mono text-xs text-[var(--color-ink-muted)] max-w-xs">
                        This site prohibits inline framing via X-Frame-Options.
                      </p>
                      <a
                        href={project.liveUrl!}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-2 text-xs font-semibold text-[var(--color-accent-ink)]"
                      >
                        Open Website ↗
                      </a>
                    </div>
                  )}
                </>
              ) : project.image && !imgError ? (
                <motion.img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  onError={() => setImgError(true)}
                  whileHover={reducedMotion ? {} : { scale: 1.025 }}
                  transition={{ duration: 0.7, ease: easePremium }}
                  className="h-full w-full object-cover transition-all duration-500 group-hover:brightness-[1.04]"
                />
              ) : (
                /* Fallback Image Frame */
                <div className="relative flex h-full w-full flex-col items-center justify-center p-8 bg-[var(--color-bg-soft)]">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, var(--color-accent) 1px, transparent 1px), linear-gradient(to bottom, var(--color-accent) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />

                  <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-bg)]/80 text-[var(--color-accent)] shadow-inner">
                      <ImageIcon size={20} />
                    </div>
                    <span className="font-display text-xl font-semibold tracking-tight text-[var(--color-ink-muted)]">
                      {initials}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Editorial Information Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.16, ease: easePremium }}
            className={cn("flex flex-col justify-center", isReversed ? "lg:order-1" : "lg:order-2")}
          >
            {/* Project Number & Category */}
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="font-semibold text-[var(--color-accent)] text-sm">{project.number}</span>
              <span className="text-[var(--color-border)]" aria-hidden>
                /
              </span>
              <span className="text-[0.7rem] tracking-[0.18em] uppercase text-[var(--color-ink-muted)] font-medium">
                {project.category}
              </span>
            </div>

            {/* Large Editorial Project Title */}
            <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-accent)] sm:text-4xl lg:text-[2.75rem] xl:text-[3.1rem] leading-[1.12]">
              {project.name}
            </h3>

            {/* Concise Case Study Description */}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--color-ink-muted)] sm:text-lg">
              {project.description}
            </p>

            {/* Understated Editorial Technologies List */}
            {project.technologies.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-[var(--color-ink-muted)] font-medium">
                {project.technologies.map((tech, techIdx) => (
                  <span key={tech} className="inline-flex items-center gap-3">
                    {techIdx > 0 && <span className="text-[var(--color-border)] font-normal" aria-hidden>·</span>}
                    <span className="text-[var(--color-ink-muted)] transition-colors duration-200 group-hover:text-[var(--color-ink)]">
                      {tech}
                    </span>
                  </span>
                ))}
              </div>
            )}

            {/* Editorial Action Links */}
            <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-8">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group/git relative inline-flex items-center gap-1.5 font-display text-sm font-semibold text-[var(--color-ink)] transition-colors duration-200 hover:text-[var(--color-accent)]"
                >
                  <span>Open Website</span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-200 group-hover/git:-translate-y-0.5 group-hover/git:translate-x-0.5"
                  />
                  <span
                    className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover/git:w-full"
                    aria-hidden
                  />
                </a>
              ) : (
                <span className="font-mono text-xs text-[var(--color-ink-faint)] tracking-wide">
                  In Development
                </span>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group/git relative inline-flex items-center gap-1.5 font-display text-sm font-medium text-[var(--color-ink-muted)] transition-colors duration-200 hover:text-[var(--color-ink)]"
                >
                  <span>GitHub</span>
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-200 group-hover/git:-translate-y-0.5 group-hover/git:translate-x-0.5"
                  />
                  <span
                    className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-ink)] transition-all duration-300 group-hover/git:w-full"
                    aria-hidden
                  />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </motion.article>

      {/* Expanded Modal Viewer */}
      {project.liveUrl && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={project.name}
          url={project.liveUrl}
        />
      )}
    </>
  );
}



