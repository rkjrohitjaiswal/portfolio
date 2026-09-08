import { useEffect, useState } from "react";

/**
 * Observes given section ids and returns whichever is currently active
 * based on scroll position and section boundaries.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "home");

  useEffect(() => {
    // Enforce active state to home on initial page load / refresh when at top
    if (window.scrollY <= 80) {
      setActive(ids[0] ?? "home");
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY;

      // 1. Top of page safeguard: Always "home" when at top of page (scrollY <= 80px)
      if (scrollPos <= 80) {
        setActive(ids[0] ?? "home");
        return;
      }

      // 2. Bottom of page safeguard (for contact/footer)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        const lastId = ids[ids.length - 1];
        if (lastId) {
          setActive(lastId);
          return;
        }
      }

      // 3. Viewport-relative section detection (immune to dynamic image/layout shifts)
      const threshold = 240; // px offset from viewport top (matches scroll-mt alignment)
      let currentSection = ids[0] ?? "home";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            currentSection = id;
          }
        }
      }

      setActive(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ids]);

  return active;
}

