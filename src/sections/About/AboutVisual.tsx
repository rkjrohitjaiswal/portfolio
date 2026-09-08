import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easePremium } from "@/lib/motion";

const ROWS: { label: string; value: string; dot: string }[] = [
  { label: "role", value: profile.role, dot: "var(--color-accent)" },
  { label: "focus", value: profile.focus, dot: "var(--color-accent)" },
  { label: "stack", value: "React / Node.js / TypeScript", dot: "#79c0ff" },
  { label: "ai_systems", value: "LLM & Automation Workflows", dot: "#8fd19e" },
  { label: "education", value: "B.Tech CSE — AI", dot: "var(--color-accent)" },
  { label: "status", value: "Building Products", dot: "var(--color-live)" },
];

export function AboutVisual() {
  const reducedMotion = useReducedMotion();

  // Detect coarse-pointer / touch devices
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  const isInteractive = !reducedMotion && !isTouch;

  // Very subtle cursor tilt (clamped to max ±3.5 degrees)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 140, mass: 0.5 };
  const rawRotateX = useTransform(mouseY, [-0.5, 0.5], [3.5, -3.5]);
  const rawRotateY = useTransform(mouseX, [-0.5, 0.5], [-3.5, 3.5]);

  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseXPos = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5));
    const mouseYPos = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5));
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: easePremium }}
      style={{
        rotateX: isInteractive ? rotateX : 0,
        rotateY: isInteractive ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 relative mx-auto w-full max-w-sm sm:max-w-[390px] lg:max-w-[380px] cursor-pointer select-none"
    >
      {/* Ambient brass glow behind the terminal panel */}
      <div
        aria-hidden
        className="absolute -inset-5 -z-10 rounded-[2rem] opacity-30 blur-2xl transition-opacity duration-500 hover:opacity-50"
        style={{ background: "radial-gradient(circle, var(--color-accent-soft), transparent 70%)" }}
      />

      {/* Decorative circuit accent lines */}
      <svg
        aria-hidden
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -right-6 -top-6 z-10 h-28 w-28 opacity-15 sm:h-36 sm:w-36"
      >
        <path
          d="M20 380 L20 120 L120 120 L120 20"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
        />
        <circle cx="20" cy="380" r="4" fill="var(--color-accent)" />
        <circle cx="120" cy="20" r="4" fill="var(--color-accent)" />
        <circle cx="20" cy="120" r="3" fill="var(--color-accent)" />
      </svg>

      {/* Main system.interface Terminal Panel */}
      <motion.div
        animate={reducedMotion ? {} : { y: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="card-surface relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_16px_45px_-18px_rgba(0,0,0,0.65)] transition-colors duration-300 hover:border-[var(--color-accent)]/60"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-soft)] px-4.5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
            <span className="ml-1.5 font-mono text-[0.72rem] text-[var(--color-ink-faint)]">system.interface</span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/60 px-2.5 py-0.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-live)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-live)]" />
            </span>
            <span className="font-mono text-[0.63rem] text-[var(--color-ink-muted)]">online</span>
          </span>
        </div>

        {/* Sweeping scan line effect */}
        {!reducedMotion && (
          <motion.div
            aria-hidden
            initial={{ top: "0%" }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-x-0 h-px opacity-40"
            style={{ background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)" }}
          />
        )}

        {/* Metadata Rows */}
        <div className="space-y-3.5 px-5 py-5 font-mono text-xs">
          {ROWS.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: easePremium }}
              className="flex items-start justify-between gap-3 border-b border-[var(--color-border-soft)] pb-3 last:border-0 last:pb-0"
            >
              <span className="flex shrink-0 items-center gap-2 text-[var(--color-ink-faint)] pt-0.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: row.dot }} />
                {row.label}
              </span>
              <span className="min-w-0 break-words text-right font-medium leading-tight text-[var(--color-ink)]">
                {row.value}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

