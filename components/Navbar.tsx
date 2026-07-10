"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Download, ChevronRight } from "lucide-react";
import type { SectionId } from "@/app/page";

const navLinks: { label: string; id: SectionId }[] = [
  { label: "Home",       id: "home" },
  { label: "About",      id: "about" },
  { label: "Skills",     id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects",   id: "projects" },
  { label: "Services",   id: "services" },
  { label: "Education",  id: "education" },
  { label: "Contact",    id: "contact" },
];

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
  activeSection: SectionId;
  navigateTo: (section: SectionId) => void;
}

export default function Navbar({ theme, toggleTheme, activeSection, navigateTo }: NavbarProps) {
  const [scrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (id: SectionId) => {
    navigateTo(id);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Progress bar — always full width when page loaded */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div
          className="transition-all duration-300 mx-2 mt-2 rounded-2xl shadow-2xl shadow-black/40"
          style={{
            background: "rgba(10,10,20,0.88)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-5 h-14 flex items-center justify-between gap-4">

            {/* Logo */}
            <button
              onClick={() => handleNav("home")}
              className="flex items-center gap-2 flex-shrink-0 group"
            >
              <motion.div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
                whileHover={{ scale: 1.1, rotate: 8 }}
              >
                IF
              </motion.div>
              <span className="hidden sm:block font-bold text-white text-sm">
                Isayas<span className="gradient-text">.dev</span>
              </span>
            </button>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(({ label, id }) => {
                const isActive = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => handleNav(id)}
                    className="relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 group whitespace-nowrap"
                    style={{ color: isActive ? "#60a5fa" : "#9ca3af" }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: "rgba(59,130,246,0.13)",
                          border: "1px solid rgba(59,130,246,0.28)",
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 group-hover:text-white transition-colors">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {/* Theme */}
              <motion.button
                onClick={toggleTheme}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.06)" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              </motion.button>

              {/* CV */}
              <motion.a
                href="/cv.pdf"
                download="Isayas_Fikadu_CV.pdf"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Download size={12} />
                CV
              </motion.a>

              {/* Hire Me */}
              <motion.button
                onClick={() => handleNav("contact")}
                className="hidden sm:flex items-center gap-1 px-4 py-1.5 rounded-lg text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
                whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(59,130,246,0.4)" }}
                whileTap={{ scale: 0.96 }}
              >
                Hire Me
                <ChevronRight size={13} />
              </motion.button>

              {/* Hamburger */}
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white"
                style={{ background: "rgba(255,255,255,0.06)" }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={menuOpen ? "x" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {menuOpen ? <X size={16} /> : <Menu size={16} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-64 flex flex-col"
              style={{
                background: "rgba(10,10,22,0.98)",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              >
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
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-white"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <X size={14} />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-1">
                {navLinks.map(({ label, id }, i) => {
                  const isActive = activeSection === id;
                  return (
                    <motion.button
                      key={id}
                      onClick={() => handleNav(id)}
                      className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                      style={{
                        color: isActive ? "#60a5fa" : "#9ca3af",
                        background: isActive ? "rgba(59,130,246,0.1)" : "transparent",
                        border: isActive
                          ? "1px solid rgba(59,130,246,0.25)"
                          : "1px solid transparent",
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      {label}
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer */}
              <div
                className="px-3 pb-5 pt-3 flex flex-col gap-2"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                <a
                  href="/cv.pdf"
                  download="Isayas_Fikadu_CV.pdf"
                  className="flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium text-gray-300"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  <Download size={13} /> Download CV
                </a>
                <button
                  onClick={() => handleNav("contact")}
                  className="flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
                >
                  Hire Me
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
