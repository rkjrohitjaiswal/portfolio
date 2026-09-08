import { useEffect, useState } from "react";

/**
 * Observes given section ids and returns whichever is currently active
 * based on scroll position and section boundaries.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "home");

  useEffect(() => {
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

      // 3. Determine active section based on section top offset
      const navOffset = 160;
      let currentSection = ids[0] ?? "home";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - navOffset;
          if (scrollPos >= top) {
            currentSection = id;
          }
        }
      }

      setActive(currentSection);
    };

    // Run immediately on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ids]);

  return active;
}

