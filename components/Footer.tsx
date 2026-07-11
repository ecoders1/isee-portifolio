"use client";
import type { SectionId } from "@/app/page";

interface Props { go: (s: SectionId) => void; }

const links: { label: string; id: SectionId }[] = [
  { label: "Home",       id: "home" },
  { label: "About me",   id: "about" },
  { label: "Services",   id: "services" },
  { label: "My Work",    id: "work" },
  { label: "Contact me", id: "contact" },
];

export default function Footer({ go }: Props) {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "32px 24px",
      marginTop: 40,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>

        {/* Logo */}
        <button onClick={() => go("home")} style={{ border: "none", background: "none", cursor: "pointer", fontSize: "1.2rem", fontWeight: 700, color: "var(--fg)", letterSpacing: "-0.02em" }}>
          Isayas<span style={{ color: "var(--accent)" }}>.</span>
        </button>

        {/* Nav */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {links.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => go(id)}
              style={{
                border: "none", background: "none", cursor: "pointer",
                fontSize: "0.85rem", color: "var(--fg2)", padding: "4px 10px",
                borderRadius: 6,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--fg2)")}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Copyright */}
        <p style={{ fontSize: "0.8rem", color: "var(--fg3)" }}>
          © 2026 Isayas Fikadu. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
