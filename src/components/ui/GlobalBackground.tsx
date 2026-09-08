const NOISE_PATTERN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export function GlobalBackground() {
  return (
    <>
      {/* 1. Fixed Base Layer & Fixed Noise / Vignette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-40 overflow-hidden select-none"
      >
        {/* Base near-black background */}
        <div className="absolute inset-0 bg-[#08090a]" />

        {/* Soft Radial Vignette (Darker Viewport Edges) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(5,6,7,0.7) 100%)" }}
        />

        {/* Ultra-Subtle Monochromatic Film Grain Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.022] mix-blend-overlay"
          style={{ backgroundImage: NOISE_PATTERN }}
        />
      </div>

      {/* 2. Absolute Long-Page Multi-Zone Atmospheric Lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-30 overflow-hidden select-none"
      >
        {/* Zone 1: Hero — Warm Brass Ambient Glow (Top Right) */}
        <div
          className="absolute top-[3%] -right-[10%] h-[700px] w-[700px] sm:h-[1000px] sm:w-[1000px] rounded-full opacity-[0.09] blur-[160px]"
          style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
        />

        {/* Zone 2: About / Capabilities — Cool Dark Slate Atmosphere (Mid-Left) */}
        <div
          className="absolute top-[18%] -left-[12%] h-[600px] w-[600px] sm:h-[900px] sm:w-[900px] rounded-full opacity-[0.05] blur-[170px]"
          style={{ background: "radial-gradient(circle, #1c2738 0%, transparent 70%)" }}
        />

        {/* Zone 3: Skills / Selected Work — Warm Brass Glow (Mid-Right) */}
        <div
          className="absolute top-[36%] -right-[10%] h-[750px] w-[750px] sm:h-[1000px] sm:w-[1000px] rounded-full opacity-[0.09] blur-[160px]"
          style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
        />

        {/* Zone 4: Projects / Experience — Cool Dark Slate Atmosphere (Mid-Left) */}
        <div
          className="absolute top-[54%] -left-[12%] h-[650px] w-[650px] sm:h-[900px] sm:w-[900px] rounded-full opacity-[0.045] blur-[170px]"
          style={{ background: "radial-gradient(circle, #1e293b 0%, transparent 70%)" }}
        />

        {/* Zone 5: Experience / AI Section — Warm Directional Brass Glow (Mid-Right) */}
        <div
          className="absolute top-[70%] -right-[10%] h-[750px] w-[750px] sm:h-[1000px] sm:w-[1000px] rounded-full opacity-[0.09] blur-[160px]"
          style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
        />

        {/* Zone 6: Workflow / Contact — Cool Slate Atmosphere (Lower-Left) */}
        <div
          className="absolute top-[85%] -left-[10%] h-[600px] w-[600px] sm:h-[850px] sm:w-[850px] rounded-full opacity-[0.04] blur-[170px]"
          style={{ background: "radial-gradient(circle, #1c2738 0%, transparent 70%)" }}
        />

        {/* Zone 7: Contact / Footer — Warm Ambient Brass Glow (Bottom-Right) */}
        <div
          className="absolute top-[95%] right-[5%] h-[650px] w-[650px] sm:h-[900px] sm:w-[900px] rounded-full opacity-[0.08] blur-[150px]"
          style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
        />
      </div>
    </>
  );
}
