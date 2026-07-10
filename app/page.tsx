"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Education from "@/components/Education";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingSocials from "@/components/FloatingSocials";

export type SectionId =
  | "home"
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "services"
  | "education"
  | "contact";

const sectionComponents = (navigateTo: (section: SectionId) => void): Record<SectionId, React.ReactNode> => ({
  home: <Hero navigateTo={navigateTo} />,
  about: <About />,
  skills: <Skills />,
  experience: <Experience />,
  projects: <Projects />,
  services: <Services />,
  education: <Education />,
  contact: <Contact />,
});

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [prevSection, setPrevSection] = useState<SectionId | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) setTheme(saved);
  }, []);

  // Handle hash in URL on load
  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as SectionId;
    if (hash && hash in sectionComponents) {
      setActiveSection(hash);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  const navigateTo = (section: SectionId) => {
    setPrevSection(activeSection);
    setActiveSection(section);
    window.history.pushState(null, "", `#${section}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show Stats only on home
  const showStats = activeSection === "home";
  // Show Testimonials on about or home
  const showTestimonials = activeSection === "about" || activeSection === "home";

  const sectionOrder: SectionId[] = [
    "home", "about", "skills", "experience",
    "projects", "services", "education", "contact"
  ];
  const currentIndex = sectionOrder.indexOf(activeSection);
  const prevIndex = prevSection ? sectionOrder.indexOf(prevSection) : -1;
  const direction = prevIndex === -1 ? 1 : currentIndex > prevIndex ? 1 : -1;

  return (
    <div
      data-theme={theme}
      style={{
        background: theme === "dark" ? "#0a0a0f" : "#f8fafc",
        color: theme === "dark" ? "#f0f0f5" : "#0f172a",
        minHeight: "100vh",
      }}
    >
      <LoadingScreen />
      <ScrollProgress />
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        navigateTo={navigateTo}
      />
      <FloatingSocials navigateTo={navigateTo} />

      <main className="pt-16 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {/* Main section */}
            {sectionComponents(navigateTo)[activeSection]}

            {/* Stats only on home */}
            {showStats && <Stats />}

            {/* Testimonials on home & about */}
            {showTestimonials && <Testimonials />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom nav bar — quick section jump */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden flex items-center justify-around py-2 px-2"
        style={{
          background: "rgba(10,10,20,0.95)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {sectionOrder.map((sec) => (
          <button
            key={sec}
            onClick={() => navigateTo(sec)}
            className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all"
            style={{ color: activeSection === sec ? "#60a5fa" : "#6b7280" }}
          >
            <span className="text-xs capitalize font-medium">{sec}</span>
            {activeSection === sec && (
              <motion.div
                layoutId="bottom-pill"
                className="w-1 h-1 rounded-full bg-blue-400"
              />
            )}
          </button>
        ))}
      </div>

      <Footer navigateTo={navigateTo} />
    </div>
  );
}
