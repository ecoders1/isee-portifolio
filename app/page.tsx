"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export type SectionId = "home" | "about" | "services" | "work" | "contact";

const fade = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -10 },
  transition: { duration: 0.35, ease: "easeInOut" },
};

export default function Page() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [section, setSection] = useState<SectionId>("home");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark"|"light"|null;
    if (saved) setTheme(saved);
    const hash = window.location.hash.replace("#","") as SectionId;
    const valid: SectionId[] = ["home","about","services","work","contact"];
    if (valid.includes(hash)) setSection(hash);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  const go = (s: SectionId) => {
    setSection(s);
    window.history.pushState(null, "", `#${s}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sections: Record<SectionId, React.ReactNode> = {
    home:     <Hero go={go} />,
    about:    <About go={go} />,
    services: <Services go={go} />,
    work:     <Projects go={go} />,
    contact:  <Contact />,
  };

  return (
    <div data-theme={theme} style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)" }}>
      <Navbar theme={theme} toggle={toggle} active={section} go={go} />
      <main style={{ paddingTop: "80px", minHeight: "calc(100vh - 80px)" }}>
        <AnimatePresence mode="wait">
          <motion.div key={section} {...fade}>
            {sections[section]}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer go={go} />
    </div>
  );
}
