import { type Variants } from "framer-motion";

// Custom easing tuples typed explicitly for Framer Motion
export const easePremium: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];
export const easeOutFast: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Micro-interaction durations: 150-250ms
// Entrance durations: 300-600ms

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.65, ease: easePremium },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easePremium },
  },
};


export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easePremium },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOutFast },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: easePremium },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: easePremium },
  },
};

export const staggerContainer = (staggerDelay = 0.08, delayChildren = 0.05): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: delayChildren,
    },
  },
});

export const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1.01,
    transition: { duration: 0.2, ease: easeOutFast },
  },
};
