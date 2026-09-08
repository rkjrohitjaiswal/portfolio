import { useEffect, useState } from "react";

function parseHashToSectionId(hash: string): string {
  const clean = hash.replace(/^#\/?/, "").toLowerCase();
  if (!clean || clean === "home") return "home";
  if (clean === "capabilities") return "what-i-build";
  return clean;
}

/**
 * Observes given section ids and returns whichever is currently active
 * based on hash route, scroll position, and section boundaries.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const fromHash = parseHashToSectionId(window.location.hash);
      if (ids.includes(fromHash)) return fromHash;
    }
    return ids[0] ?? "home";
  });

  useEffect(() => {
    // If a hash is present on mount/refresh, initialize active section from hash
    if (window.location.hash) {
      const fromHash = parseHashToSectionId(window.location.hash);
      if (ids.includes(fromHash)) {
        setActive(fromHash);
      }
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

    const handleHashChange = () => {
      const fromHash = parseHashToSectionId(window.location.hash);
      if (ids.includes(fromHash)) {
        setActive(fromHash);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [ids]);

  return active;
}

