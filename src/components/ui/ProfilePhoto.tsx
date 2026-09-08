import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProfilePhotoProps {
  imageSrc?: string;
  className?: string;
}

export function ProfilePhoto({ imageSrc = profile.avatarUrl, className }: ProfilePhotoProps) {
  const [imgError, setImgError] = useState(false);
  const reducedMotion = useReducedMotion();

  // Detect coarse-pointer / touch devices
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  const isInteractive = !reducedMotion && !isTouch;

  // 60 FPS MotionValues + useSpring physics without React state updates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft spring with high damping for smooth, natural movement (clamped to max 6deg)
  const springConfig = { damping: 30, stiffness: 150, mass: 0.5 };
  const rawRotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const rawRotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);

  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Calculate normalized offset from center (-0.5 to 0.5)
    const mouseXPos = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / width - 0.5));
    const mouseYPos = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / height - 0.5));
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    // Smoothly return to neutral center position
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      animate={reducedMotion ? {} : { y: [0, -6, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      style={{
        rotateX: isInteractive ? rotateX : 0,
        rotateY: isInteractive ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("perspective-1000 relative group cursor-pointer select-none", className)}
    >
      {/* Brass / Accent Radial Background Glow */}
      <div
        aria-hidden
        className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-tr from-[var(--color-accent)]/25 via-transparent to-[var(--color-accent)]/15 opacity-60 blur-2xl transition-all duration-500 group-hover:opacity-90 group-hover:blur-3xl"
      />

      {/* Main Glassmorphic Frame Container */}
      <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:border-[var(--color-accent)]/70">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--color-bg-soft)]">
          {imageSrc && !imgError ? (
            <img
              src={imageSrc}
              alt={profile.name}
              loading="eager"
              decoding="async"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover object-center transform-gpu transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            /* High-End Developer Graphic Fallback */
            <div className="relative flex h-full w-full flex-col items-center justify-center p-6 bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-bg-soft)] text-center">
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.15]"
                style={{
                  backgroundImage: "radial-gradient(var(--color-accent) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />
              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:border-[var(--color-accent)]">
                <span className="font-display text-2xl font-bold tracking-tight text-[var(--color-accent)]">
                  {profile.initials}
                </span>
              </div>
              <div className="relative z-10 mt-4 space-y-1">
                <p className="font-display text-sm font-semibold text-[var(--color-ink)]">
                  {profile.name}
                </p>
                <p className="font-mono text-[0.7rem] text-[var(--color-accent)]">
                  {profile.role}
                </p>
              </div>
            </div>
          )}

          {/* Inner Vignette / Frame Overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/50 via-transparent to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-20"
          />
        </div>
      </div>
    </motion.div>
  );
}


