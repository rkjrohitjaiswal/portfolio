import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { easePremium } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easePremium } },
};

const CAPABILITY_PILLS = ["Web Development", "AI Integration", "Automation Workflows"];

export function Hero() {
  const reducedMotion = useReducedMotion();

  // Detect coarse-pointer / touch devices
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  const isInteractive = !reducedMotion && !isTouch;

  // Ultra-subtle cursor parallax depth (barely noticeable ±10px shift)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 35, stiffness: 100, mass: 0.8 };
  const rawX = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const rawY = useTransform(mouseY, [-0.5, 0.5], [-8, 8]);

  const parallaxX = useSpring(rawX, springConfig);
  const parallaxY = useSpring(rawY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isInteractive) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const mouseXPos = e.clientX / width - 0.5;
    const mouseYPos = e.clientY / height - 0.5;
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-[85vh] lg:min-h-[88vh] items-center overflow-hidden pt-24 pb-12 scroll-mt-24"
    >
      {/* 1. Full-Screen Cinematic 3D Background Artwork with Ultra-Subtle Motion */}
      <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        <motion.img
          src="/profile/rohit-3d-avatar.png"
          alt=""
          loading="eager"
          decoding="async"
          animate={reducedMotion ? {} : { scale: [1, 1.018, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          style={{
            x: isInteractive ? parallaxX : 0,
            y: isInteractive ? parallaxY : 0,
          }}
          className="h-full w-full object-cover object-[65%_center] sm:object-[90%_center] lg:object-[95%_center] opacity-100 transform-gpu"
        />
      </div>

      {/* 2. Soft Gradient Scrim ONLY Behind Left Text (100% Transparent Over Character) */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 -z-10 w-full sm:w-[60%] lg:w-[45%] bg-gradient-to-r from-[var(--color-bg)]/95 via-[var(--color-bg)]/55 to-transparent pointer-events-none"
      />

      {/* 3. Seamless Bottom Gradient Transition to About Section */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/70 to-transparent pointer-events-none"
      />

      {/* 4. Left Hero Content Container with Sequential Stagger Entrance */}
      <div className="relative z-10 flex w-full items-center px-6 sm:px-12 lg:px-20 py-8 lg:py-12">
        <div className="w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[540px] text-left">
          <motion.div variants={container} initial="hidden" animate="show">
            {/* 1. Availability Badge */}
            {profile.availability.isAvailable && (
              <motion.div
                variants={item}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/85 px-3.5 py-1.5 backdrop-blur-md shadow-md"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-live)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-live)]" />
                </span>
                <span className="text-xs font-medium text-[var(--color-ink-muted)]">
                  {profile.availability.label}
                </span>
              </motion.div>
            )}

            {/* 2. Eyebrow Category */}
            <motion.span variants={item} className="label-eyebrow block tracking-widest text-xs font-mono uppercase text-[var(--color-accent)]">
              FULL-STACK &amp; AI DEVELOPMENT
            </motion.span>

            {/* 3. Name & Title Heading */}
            <motion.h1
              variants={item}
              className="mt-3 font-semibold leading-[1.1] text-[var(--color-ink)]"
            >
              <span className="block text-xl font-medium text-[var(--color-ink-muted)] sm:text-2xl">
                Hi, I&apos;m{" "}
                <span className="text-[var(--color-accent)]">{profile.shortName}</span>
                {" "}—
              </span>
              <span className="mt-1 block text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-[var(--color-ink)] leading-tight">
                {profile.role}
              </span>
            </motion.h1>

            {/* 4. Capability Tags */}
            <motion.div variants={item} className="mt-4 flex flex-wrap gap-2">
              {CAPABILITY_PILLS.map((pill) => (
                <span
                  key={pill}
                  className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-2.5 py-1 font-mono text-[0.72rem] text-[var(--color-ink-muted)] backdrop-blur-xs"
                >
                  {pill}
                </span>
              ))}
            </motion.div>

            {/* 5. Description */}
            <motion.p variants={item} className="mt-5 max-w-md text-base sm:text-lg font-medium text-[var(--color-ink-muted)] leading-relaxed">
              {profile.tagline}
            </motion.p>

            <motion.p variants={item} className="mt-2.5 max-w-md text-xs sm:text-sm leading-relaxed text-[var(--color-ink-faint)]">
              {profile.heroSupport}
            </motion.p>

            {/* 6. Buttons & 7. Social Links */}
            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[var(--color-accent-ink)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_20px_rgba(226,163,67,0.35)] active:scale-95"
              >
                View My Work
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href={profile.links.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-5 py-2.5 text-xs sm:text-sm font-medium text-[var(--color-ink)] backdrop-blur-sm transition-all duration-200 hover:border-[var(--color-ink-faint)] hover:bg-[var(--color-surface-hover)] active:scale-95"
              >
                Download Resume
              </a>

              {/* Social Icon Links */}
              <div className="flex items-center gap-2.5 ml-1">
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub"
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-2.5 text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  <GithubIcon size={15} />
                </a>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-2.5 text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  <LinkedinIcon size={15} />
                </a>
                <a
                  href={`mailto:${profile.links.email}`}
                  title="Email"
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-2.5 text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  <Mail size={15} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 5. Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-5 right-8 z-20 hidden items-center gap-2 text-[0.7rem] font-mono text-[var(--color-ink-faint)] sm:flex"
      >
        <span>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-[var(--color-accent)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}





