import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroVisual() {
  const reducedMotion = useReducedMotion();

  // Detect coarse-pointer / touch devices
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  const isInteractive = !reducedMotion && !isTouch;

  // Cursor-reactive 3D tilt (clamped to max ±4 degrees for subtle premium movement)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 140, mass: 0.5 };
  const rawRotateX = useTransform(mouseY, [-0.5, 0.5], [4, -4]);
  const rawRotateY = useTransform(mouseX, [-0.5, 0.5], [-4, 4]);

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
      animate={reducedMotion ? {} : { y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{
        rotateX: isInteractive ? rotateX : 0,
        rotateY: isInteractive ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 relative mx-auto w-full max-w-[20rem] sm:max-w-md lg:max-w-lg cursor-pointer select-none"
    >
      {/* Ambient warm brass glow behind the hero visual */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[3rem] opacity-35 blur-3xl transition-opacity duration-500 hover:opacity-60"
        style={{ background: "radial-gradient(circle at 60% 40%, var(--color-accent-soft), transparent 70%)" }}
      />

      {/* Hero Visual Frame */}
      <div className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)]/80 bg-[var(--color-surface)]/90 p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] transition-colors duration-500 hover:border-[var(--color-accent)]/60">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--color-bg-soft)]">
          <img
            src="/profile/rohit-3d-avatar.png"
            alt={profile.name}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-center transform-gpu transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />

          {/* Subtle vignette gradient overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/60 via-transparent to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-30"
          />
        </div>
      </div>
    </motion.div>
  );
}




