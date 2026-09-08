import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, Loader2, MessageSquare } from "lucide-react";
import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { easePremium, staggerContainer, fadeUp } from "@/lib/motion";

const CONTACT_CARDS = [
  {
    label: "Email",
    subtext: profile.links.email,
    href: `mailto:${profile.links.email}`,
    icon: Mail,
    isExternal: false,
  },
  {
    label: "LinkedIn",
    subtext: "Connect with me ↗",
    href: profile.links.linkedin,
    icon: LinkedinIcon,
    isExternal: true,
  },
  {
    label: "GitHub",
    subtext: "Check my work ↗",
    href: profile.links.github,
    icon: GithubIcon,
    isExternal: true,
  },
];

const inputClasses =
  "w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] transition-all duration-200 focus:border-[var(--color-accent)] focus:bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [buttonState, setButtonState] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setButtonState("loading");

    setTimeout(() => {
      setButtonState("success");
      const body = encodeURIComponent(
        `${form.message}\n\n— ${form.name} (${form.email})`
      );
      const subject = encodeURIComponent(form.subject || `Portfolio inquiry from ${form.name}`);
      window.location.href = `mailto:${profile.links.email}?subject=${subject}&body=${body}`;

      setTimeout(() => setButtonState("idle"), 4000);
    }, 800);
  };

  return (
    <section id="contact" className="py-14 sm:py-20 scroll-mt-20">
      <div className="container-wide grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14 items-center">
        {/* LEFT COLUMN */}
        <div>
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: easePremium }}
            className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            CONTACT
          </motion.div>

          {/* Large Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.05, ease: easePremium }}
            className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl lg:text-[2.65rem] leading-[1.16]"
          >
            Let’s build something amazing together.
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.1, ease: easePremium }}
            className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-[var(--color-ink-muted)]"
          >
            I'm always open to discussing new opportunities, exciting projects, or just having a chat about technology.
          </motion.p>

          {/* Three Compact Contact Cards */}
          <motion.div
            variants={staggerContainer(0.08, 0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-7 grid gap-3 grid-cols-1 sm:grid-cols-3"
          >
            {CONTACT_CARDS.map((card) => (
              <motion.a
                key={card.label}
                href={card.href}
                target={card.isExternal ? "_blank" : undefined}
                rel={card.isExternal ? "noreferrer" : undefined}
                variants={fadeUp}
                className="group card-surface flex flex-col justify-between gap-2.5 rounded-2xl p-4 sm:p-4.5 border border-[var(--color-border)] transition-all duration-300 hover:border-[var(--color-accent)]/60 hover:bg-[var(--color-surface-hover)] shadow-md"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-transform duration-300 group-hover:scale-105">
                  <card.icon size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                    {card.label}
                  </p>
                  <p className="mt-0.5 font-mono text-[0.7rem] text-[var(--color-accent)] group-hover:underline truncate">
                    {card.subtext}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT COLUMN — Compact Dark Glassmorphic Form Card */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.12, ease: easePremium }}
          onSubmit={handleSubmit}
          className="card-surface relative rounded-3xl p-5 sm:p-7 lg:p-8 border border-[var(--color-border)] shadow-2xl bg-[var(--color-surface)]/80 backdrop-blur-md grid gap-4"
        >
          {/* Header Bar inside Form */}
          <div className="flex items-center gap-3.5 border-b border-[var(--color-border-soft)] pb-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] border border-[var(--color-accent)]/20">
              <MessageSquare size={19} />
            </div>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--color-ink)]">
                Send a Message
              </h3>
              <p className="text-xs text-[var(--color-ink-muted)]">
                Fill out the form and I'll get back to you as soon as possible.
              </p>
            </div>
          </div>

          {/* Form inputs */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block font-mono text-xs font-medium text-[var(--color-ink-muted)]">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClasses}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block font-mono text-xs font-medium text-[var(--color-ink-muted)]">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClasses}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="mb-1.5 block font-mono text-xs font-medium text-[var(--color-ink-muted)]">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className={inputClasses}
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block font-mono text-xs font-medium text-[var(--color-ink-muted)]">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={inputClasses}
              placeholder="Tell me about your project, opportunity, or just say hi!"
            />
          </div>

          {/* Full-width Gold Submit Button */}
          <motion.button
            type="submit"
            disabled={buttonState !== "idle"}
            whileHover={buttonState === "idle" ? { scale: 1.01 } : undefined}
            whileTap={buttonState === "idle" ? { scale: 0.98 } : undefined}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="w-full mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] py-3 sm:py-3.5 text-sm font-semibold text-[var(--color-accent-ink)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_20px_rgba(226,163,67,0.35)] disabled:opacity-80 disabled:cursor-not-allowed"
          >
            {buttonState === "idle" && (
              <>
                Send Message
                <Send size={16} />
              </>
            )}
            {buttonState === "loading" && (
              <>
                Opening Email Client...
                <Loader2 size={16} className="animate-spin" />
              </>
            )}
            {buttonState === "success" && (
              <>
                Message Prepared!
                <CheckCircle2 size={16} className="text-[var(--color-accent-ink)]" />
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
