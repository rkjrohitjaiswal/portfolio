import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/profile";
import { useScrolled } from "@/hooks/useScrolled";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#what-i-build" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));

export function Navbar() {
  const scrolled = useScrolled();
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);

  const handleNavigate = (href: string) => {
    setOpen(false);
    const targetId = href.replace("#", "");
    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--color-border)]/30 bg-[var(--color-bg)]/35 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="container-wide flex h-16 items-center justify-between" aria-label="Primary">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate("#home");
          }}
          className="group flex items-center gap-1 font-display text-lg font-semibold tracking-tight text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]"
        >
          <span>{profile.initials}</span>
          <span className="text-[var(--color-accent)] transition-transform duration-300 group-hover:scale-125">
            .
          </span>
        </a>

        {/* Desktop nav with Framer Motion sliding active indicator */}
        <ul className="hidden items-center gap-1 rounded-full border border-[var(--color-border)]/40 bg-[var(--color-surface)]/35 px-3 py-1.5 backdrop-blur-sm md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.replace("#", "");
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(link.href);
                  }}
                  className={cn(
                    "relative z-10 block px-3.5 py-1.5 text-xs font-medium transition-colors duration-200",
                    isActive
                      ? "text-[var(--color-ink)]"
                      : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 -z-0 rounded-full bg-[var(--color-accent-soft)] border border-[var(--color-accent)]/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Action button */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate("#contact");
          }}
          className="hidden rounded-full bg-[var(--color-accent)] px-4 py-2 text-xs font-semibold text-[var(--color-accent-ink)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_15px_rgba(226,163,67,0.3)] active:scale-95 md:inline-flex"
        >
          Let&apos;s Talk
        </a>

        {/* Mobile Animated Hamburger Button */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] transition focus:outline-none md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex h-4 w-4 flex-col justify-between">
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="h-0.5 w-full rounded-full bg-[var(--color-ink)]"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="h-0.5 w-full rounded-full bg-[var(--color-ink)]"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="h-0.5 w-full rounded-full bg-[var(--color-ink)]"
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-xl md:hidden"
          >
            <ul className="container-wide flex flex-col gap-1.5 py-6">
              {NAV_LINKS.map((link, idx) => {
                const isActive = active === link.href.replace("#", "");
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + idx * 0.04, duration: 0.25 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigate(link.href);
                      }}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition",
                        isActive
                          ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)] border border-[var(--color-accent)]/20"
                          : "text-[var(--color-ink-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"
                      )}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />}
                    </a>
                  </motion.li>
                );
              })}
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.25 }}
                className="pt-3"
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate("#contact");
                  }}
                  className="block rounded-xl bg-[var(--color-accent)] px-4 py-3.5 text-center text-sm font-semibold text-[var(--color-accent-ink)] shadow-[0_4px_15px_rgba(226,163,67,0.3)]"
                >
                  Let&apos;s Talk
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
