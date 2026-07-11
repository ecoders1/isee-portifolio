"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ArrowUpRight, Menu, X } from "lucide-react";
import type { SectionId } from "@/app/page";

const links: { label: string; id: SectionId }[] = [
  { label: "Home",       id: "home" },
  { label: "About me",   id: "about" },
  { label: "Services",   id: "services" },
  { label: "My Work",    id: "work" },
  { label: "Contact me", id: "contact" },
];

interface Props {
  theme: "dark" | "light";
  toggle: () => void;
  active: SectionId;
  go: (s: SectionId) => void;
}

export default function Navbar({ theme, toggle, active, go }: Props) {
  const [open, setOpen] = useState(false);

  const nav = (id: SectionId) => { go(id); setOpen(false); };

  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
          height: 68,
          display: "flex", alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <button onClick={() => nav("home")} style={{ display: "flex", alignItems: "center", gap: 2, border: "none", background: "none", cursor: "pointer" }}>
            <span style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--fg)", letterSpacing: "-0.02em" }}>
              Isayas<span style={{ color: "var(--accent)" }}>.</span>
            </span>
          </button>

          {/* Desktop links */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden-mobile">
            {links.map(({ label, id }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => nav(id)}
                  style={{
                    position: "relative",
                    padding: "6px 16px",
                    borderRadius: 99,
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "var(--fg)" : "var(--fg2)",
                    transition: "color 0.2s",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-bg"
                      style={{
                        position: "absolute", inset: 0,
                        borderRadius: 99,
                        background: "var(--bg2)",
                        border: "1px solid var(--border)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={toggle}
              style={{
                width: 36, height: 36, borderRadius: "50%",
                border: "1.5px solid var(--border)",
                background: "var(--bg2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--fg2)",
              }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button
              onClick={() => nav("contact")}
              className="btn-contact hidden-mobile"
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 20px",
                borderRadius: 99,
                border: "1.5px solid var(--fg)",
                background: "none",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--fg)",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--fg)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--bg)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "none";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--fg)";
              }}
            >
              Contact <ArrowUpRight size={14} />
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="show-mobile"
              style={{
                width: 36, height: 36, borderRadius: 8,
                border: "1.5px solid var(--border)",
                background: "var(--bg2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--fg)",
              }}
              aria-label="Menu"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed", top: 68, left: 0, right: 0, zIndex: 99,
              background: "var(--bg)",
              borderBottom: "1px solid var(--border)",
              padding: "12px 24px 20px",
              display: "flex", flexDirection: "column", gap: 4,
            }}
          >
            {links.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => nav(id)}
                style={{
                  padding: "12px 16px",
                  borderRadius: 10,
                  border: "none",
                  textAlign: "left",
                  background: active === id ? "var(--bg2)" : "none",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: active === id ? 600 : 400,
                  color: active === id ? "var(--fg)" : "var(--fg2)",
                }}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
