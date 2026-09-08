import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "hover" | "project">("default");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Raw mouse coordinates
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // 1. Center dot spring: Fast, responsive & precise, minimal latency
  const dotSpringConfig = { damping: 40, stiffness: 700, mass: 0.1 };
  const dotX = useSpring(rawX, dotSpringConfig);
  const dotY = useSpring(rawY, dotSpringConfig);

  // 2. Outer ring spring: Smooth, fluid, slightly delayed follow
  const ringSpringConfig = { damping: 28, stiffness: 220, mass: 0.4 };
  const ringX = useSpring(rawX, ringSpringConfig);
  const ringY = useSpring(rawY, ringSpringConfig);

  useEffect(() => {
    // Detect touch / coarse pointer devices
    const touchQuery = window.matchMedia("(pointer: coarse)");
    if (touchQuery.matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isProjectCard = target.closest("#projects article, #projects .group");
      const isInteractive = target.closest(
        "a, button, input, textarea, select, [role='button'], .cursor-pointer"
      );

      if (isProjectCard && !isInteractive) {
        setCursorState("project");
      } else if (isInteractive) {
        setCursorState("hover");
      } else {
        setCursorState("default");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, rawX, rawY]);

  // Hide on touch devices or if reduced motion is enabled
  if (isTouchDevice || reducedMotion) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.2s ease" }}
    >
      {/* Outer Ring — Smooth fluid follow */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: cursorState === "hover" ? 1.5 : cursorState === "project" ? 2.4 : 1,
          borderColor: "var(--color-accent)",
          backgroundColor:
            cursorState === "project"
              ? "rgba(226, 163, 67, 0.15)"
              : cursorState === "hover"
              ? "rgba(226, 163, 67, 0.08)"
              : "transparent",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed top-0 left-0 -ml-[18px] -mt-[18px] h-9 w-9 rounded-full border border-[var(--color-accent)]/60 backdrop-blur-[1px] pointer-events-none"
      >
        {cursorState === "project" && (
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[0.55rem] font-bold uppercase tracking-widest text-[var(--color-accent)]">
            VIEW
          </span>
        )}
      </motion.div>

      {/* Center Dot — Responsive & precise */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          scale: cursorState === "hover" ? 0.5 : cursorState === "project" ? 0 : 1,
          opacity: cursorState === "project" ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)] pointer-events-none"
      />
    </div>
  );
}
