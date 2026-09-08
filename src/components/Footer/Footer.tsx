import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { easePremium } from "@/lib/motion";

const FOOTER_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#what-i-build" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-bg-soft)]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.65, ease: easePremium }}
        className="container-wide flex flex-col gap-10 py-14"
      >
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-semibold text-[var(--color-ink)]">
              {profile.name}
            </p>
            <p className="mt-1 text-sm font-mono text-[var(--color-accent)]">{profile.role}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  const targetId = link.href.replace("#", "");
                  if (targetId === "home") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    const el = document.getElementById(targetId);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="group relative inline-block text-xs font-medium text-[var(--color-ink-muted)] transition-colors duration-200 hover:text-[var(--color-accent)] focus-visible:text-[var(--color-accent)]"
              >
                {link.label}
                <span className="absolute inset-x-0 top-0 -bottom-9 cursor-pointer" aria-hidden />
                <span
                  className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-[var(--color-accent)] opacity-0 scale-x-0 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-x-100 pointer-events-none"
                  aria-hidden
                />
              </a>
            ))}
          </nav>
        </div>

        <div className="border-t border-[var(--color-border-soft)] pt-6 text-xs text-[var(--color-ink-faint)]">
          <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
  );
}
