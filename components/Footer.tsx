"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Send, Mail, ArrowUp, Heart } from "lucide-react";
import type { SectionId } from "@/app/page";

interface Props { go: (s: SectionId) => void; }

const navLinks: { label: string; id: SectionId }[] = [
  { label: "Home",       id: "home" },
  { label: "About me",   id: "about" },
  { label: "Services",   id: "services" },
  { label: "My Work",    id: "work" },
  { label: "Contact me", id: "contact" },
];

const socials = [
  { icon: Github,   href: "https://github.com/ecoders1",                 label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/isayas-fikadu",    label: "LinkedIn" },
  { icon: Send,     href: "https://t.me/milkibn",                         label: "Telegram" },
  { icon: Mail,     href: "mailto:iyasu4313@gmail.com",                   label: "Email" },
];

export default function Footer({ go }: Props) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: 40, background: "var(--bg)" }}>

      {/* Main footer body */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "52px 24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40 }}>

          {/* Brand column */}
          <div>
            <button
              onClick={() => go("home")}
              style={{ border: "none", background: "none", cursor: "pointer",
                fontSize: "1.5rem", fontWeight: 700, color: "var(--fg)",
                letterSpacing: "-0.03em", padding: 0, marginBottom: 12 }}
            >
              Isayas<span style={{ color: "var(--accent)" }}>.</span>
            </button>
            <p style={{ fontSize: "0.875rem", color: "var(--fg2)", lineHeight: 1.7, maxWidth: 240, marginBottom: 20 }}>
              Full Stack Developer from Ambo, Ethiopia — building fast, modern web
              applications that solve real problems.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 8 }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    border: "1.5px solid var(--border)", background: "var(--card)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--fg2)", textDecoration: "none",
                    transition: "border-color 0.2s, color 0.2s, transform 0.15s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.color = "var(--accent)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--fg2)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em",
              color: "var(--fg3)", fontWeight: 600, marginBottom: 16 }}>Quick links</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {navLinks.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => go(id)}
                  style={{ border: "none", background: "none", cursor: "pointer",
                    fontSize: "0.9rem", color: "var(--fg2)", padding: "5px 0",
                    textAlign: "left", transition: "color 0.2s", width: "fit-content" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--fg2)")}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em",
              color: "var(--fg3)", fontWeight: 600, marginBottom: 16 }}>Get in touch</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Email",    value: "iyasu4313@gmail.com",   href: "mailto:iyasu4313@gmail.com" },
                { label: "Phone",    value: "+251 94 313 3184",       href: "tel:+251943133184" },
                { label: "Location", value: "Ambo, Ethiopia",         href: "#" },
              ].map(({ label, value, href }) => (
                <div key={label}>
                  <p style={{ fontSize: "0.7rem", color: "var(--fg3)", textTransform: "uppercase",
                    letterSpacing: "0.08em", marginBottom: 2 }}>{label}</p>
                  <a href={href} style={{ fontSize: "0.875rem", color: "var(--fg2)",
                    textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--fg2)")}
                  >{value}</a>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 7,
              padding: "6px 14px", borderRadius: 99,
              border: "1.5px solid #22c55e40", background: "#22c55e0d" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e",
                boxShadow: "0 0 6px #22c55e" }} />
              <span style={{ fontSize: "0.75rem", color: "#22c55e", fontWeight: 600 }}>
                Available for work
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>

          <p style={{ fontSize: "0.8rem", color: "var(--fg3)", display: "flex", alignItems: "center", gap: 5 }}>
            © 2026 Isayas Fikadu. Made with{" "}
            <Heart size={12} style={{ color: "var(--accent)", fill: "var(--accent)" }} />{" "}
            in Ambo, Ethiopia.
          </p>

          <p style={{ fontSize: "0.8rem", color: "var(--fg3)" }}>
            Built with Next.js &amp; Tailwind CSS
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.92 }}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              border: "1.5px solid var(--border)", background: "var(--card)",
              color: "var(--fg2)", cursor: "pointer",
              padding: "6px 14px", borderRadius: 99, fontSize: "0.78rem", fontWeight: 500,
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--fg2)";
            }}
          >
            <ArrowUp size={13} /> Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
