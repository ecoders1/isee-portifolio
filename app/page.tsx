"use client";
import { useState, useEffect } from "react";
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

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

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
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <FloatingSocials />

      <main>
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <Education />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
