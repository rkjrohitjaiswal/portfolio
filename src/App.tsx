import { useEffect } from "react";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { GlobalBackground } from "@/components/ui/GlobalBackground";
import { Hero } from "@/sections/Hero/Hero";
import { About } from "@/sections/About/About";
import { WhatIBuild } from "@/sections/WhatIBuild/WhatIBuild";
import { Skills } from "@/sections/Skills/Skills";
import { Projects } from "@/sections/Projects/Projects";
import { CurrentlyBuilding } from "@/sections/CurrentlyBuilding/CurrentlyBuilding";
import { Experience } from "@/sections/Experience/Experience";
import { AISection } from "@/sections/AISection/AISection";
import { HowIBuild } from "@/sections/HowIBuild/HowIBuild";
import { Contact } from "@/sections/Contact/Contact";

function App() {
  useEffect(() => {
    // Disable automatic browser scroll restoration on refresh
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Always reset scroll to top on initial page load unless an explicit section hash is provided
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    } else {
      const targetId = window.location.hash.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView();
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen">
      <CustomCursor />
      <GlobalBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <WhatIBuild />
        <Skills />
        <Projects />
        <CurrentlyBuilding />
        <Experience />
        <AISection />
        <HowIBuild />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}


export default App;
