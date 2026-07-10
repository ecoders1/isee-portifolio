"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Code2 } from "lucide-react";

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Update active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const sec of sections.reverse()) {
        const el = document.getElementById(sec);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sec);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-dark shadow-lg shadow-blue-500/10 py-3" : "py-5"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <motion.div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Code2 size={18} />
            </motion.div>
            <span className="font-bold text-white text-lg">
              Isayas<span className="gradient-text">.dev</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  active === link.href.replace("#", "")
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {active === link.href.replace("#", "") && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: "rgba(59,130,246,0.1)",
                      border: "1px solid rgba(59,130,246,0.3)",
                    }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg glass text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>

            <motion.a
              href="#contact"
              className="hidden sm:block btn-primary text-sm py-2 px-5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg glass text-gray-300 hover:text-white transition-colors"
              aria-label="Open menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-72 glass-dark p-6 pt-20 flex flex-col gap-2"
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: "spring", damping: 25 }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    active === link.href.replace("#", "")
                      ? "text-blue-400 bg-blue-500/10 border border-blue-500/30"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="btn-primary text-center text-sm mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => setMenuOpen(false)}
              >
                Hire Me
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
