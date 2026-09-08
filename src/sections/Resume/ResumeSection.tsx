import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, AlertCircle } from "lucide-react";
import { profile } from "@/data/profile";
import { easePremium } from "@/lib/motion";

export function ResumeSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "missing">("idle");

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      setStatus("loading");
      const res = await fetch(profile.links.resumeUrl, { method: "HEAD" });
      if (res.ok) {
        setStatus("idle");
      } else {
        e.preventDefault();
        setStatus("missing");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      e.preventDefault();
      setStatus("missing");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="resume" className="border-t border-[var(--color-border-soft)] py-20 scroll-mt-24">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easePremium }}
          whileHover={{ y: -3 }}
          className="group card-surface relative flex flex-col items-start justify-between gap-6 rounded-2xl p-8 border border-[var(--color-border)] transition-all duration-300 hover:border-[var(--color-accent)]/50 hover:shadow-[0_16px_40px_-15px_rgba(0,0,0,0.6)] sm:flex-row sm:items-center"
        >

          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-[var(--color-accent-soft)] p-3.5 text-[var(--color-accent)] transition-transform duration-300 group-hover:scale-110">
              <FileText size={26} />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-[var(--color-ink)]">
                Want the full resume?
              </h3>
              <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                Full technical stack, experience timeline, and project overview in one PDF.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2">
            <a
              href={profile.links.resumeUrl}
              download="Rohit_Kumar_Jaiswal_Resume.pdf"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-accent-ink)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_20px_rgba(226,163,67,0.35)] active:scale-95"
            >
              <Download size={16} className="transition-transform duration-200 group-hover:translate-y-0.5" />
              {status === "loading" ? "Checking..." : "Download Resume"}
            </a>

            <AnimatePresence>
              {status === "missing" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 font-mono text-xs text-[var(--color-accent)]"
                >
                  <AlertCircle size={14} />
                  <span>Resume PDF will be updated shortly! Feel free to email me directly.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
