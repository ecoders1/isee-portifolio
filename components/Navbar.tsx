"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Download, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      // active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const sec of [...sections].reverse()) {
        const el = document.getElementById(sec);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActive(sec);
          break;
        }
      }
      // scroll %
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll progress */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[9999] transition-all duration-100"
        style={{
          width: `${scrollPct}%`,
          background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)",
        }}
      />

      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Main bar */}
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? "mx-3 mt-2 rounded-2xl shadow-2xl shadow-black/40"
              : "mx-0 mt-0 rounded-none"
          }`}
          style={{
            background: scrolled
              ? "rgba(10,10,20,0.85)"
              : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
            border: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

            {/* Logo */}
            <a href="#home" className="flex items-center gap-2.5 group flex-shrink-0">
              <motion.div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
                whileHover={{ scale: 1.1, rotate: 8 }}
              >
                IF
              </motion.div>
              <div className="hidden sm:block">
                <span className="font-bold text-white text-base leading-none">Isayas</span>
                <span className="gradient-text font-bold text-base leading-none">.dev</span>
              </div>
            </a>

            {/* Desktop nav links - proper spacing */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = active === link.href.replace("#", "");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 group whitespace-nowrap"
                    style={{ color: isActive ? "#60a5fa" : "#9ca3af" }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: "rgba(59,130,246,0.12)",
                          border: "1px solid rgba(59,130,246,0.25)",
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 group-hover:text-white transition-colors">
                      {link.label}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <motion.button
                onClick={toggleTheme}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.06)" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </motion.button>

              {/* Download CV */}
              <motion.a
                href="/cv.pdf"
                download="Isayas_Fikadu_CV.pdf"
                className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.96 }}
              >
                <Download size={13} />
                CV
              </motion.a>

              {/* Hire Me CTA */}
              <motion.a
                href="#contact"
                className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
                whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(59,130,246,0.4)" }}
                whileTap={{ scale: 0.96 }}
              >
                Hire Me
                <ChevronDown size={13} className="rotate-[-90deg]" />
              </motion.a>

              {/* Mobile hamburger */}
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.06)" }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={menuOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {menuOpen ? <X size={17} /> : <Menu size={17} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-72 flex flex-col"
              style={{
                background: "rgba(10,10,20,0.97)",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/08">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
                  >
                    IF
                  </div>
                  <span className="text-white font-semibold text-sm">Isayas.dev</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <X size={15} />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = active === link.href.replace("#", "");
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                      style={{
                        color: isActive ? "#60a5fa" : "#9ca3af",
                        background: isActive ? "rgba(59,130,246,0.1)" : "transparent",
                        border: isActive
                          ? "1px solid rgba(59,130,246,0.25)"
                          : "1px solid transparent",
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}
              </div>

              {/* Drawer footer */}
              <div className="px-4 pb-6 pt-4 flex flex-col gap-3 border-t border-white/08">
                <a
                  href="/cv.pdf"
                  download="Isayas_Fikadu_CV.pdf"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-gray-300"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  <Download size={14} />
                  Download CV
                </a>
                <a
                  href="#contact"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
