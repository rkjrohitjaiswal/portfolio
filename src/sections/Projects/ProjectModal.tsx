import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Globe } from "lucide-react";
import { easePremium } from "@/lib/motion";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export function ProjectModal({ isOpen, onClose, title, url }: ProjectModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    // Prevent background scrolling while modal is open
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            aria-hidden
          />

          {/* Browser-style Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: easePremium }}
            className="relative z-10 flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl"
          >
            {/* Modal Browser Header Bar */}
            <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-soft)] px-4 py-3 sm:px-6">
              {/* Traffic lights & Title */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="h-3 w-3 rounded-full bg-red-500/70" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                  <span className="h-3 w-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-ink-muted)] min-w-0 truncate">
                  <Globe size={14} className="text-[var(--color-accent)] shrink-0" />
                  <span className="font-semibold text-[var(--color-ink)] truncate">{title}</span>
                  <span className="hidden sm:inline text-[var(--color-ink-faint)] truncate">— {url}</span>
                </div>
              </div>

              {/* Action Buttons: Open Link & Close */}
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 font-mono text-xs font-semibold text-[var(--color-ink-muted)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  <span>Open Website</span>
                  <ExternalLink size={13} />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink-muted)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-ink)] active:scale-95"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Body with Full Iframe */}
            <div className="relative flex-1 w-full bg-[var(--color-bg)]">
              <iframe
                src={url}
                title={`${title} Expanded Live Preview`}
                className="h-full w-full border-0"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
