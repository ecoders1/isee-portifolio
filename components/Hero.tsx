"use client";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Send, Download } from "lucide-react";
import { useEffect, useState } from "react";
import type { SectionId } from "@/app/page";

interface Props { go: (s: SectionId) => void; }

const ROLES = [
  "Full Stack Developer",
  "React Developer",
  "Next.js Developer",
  "UI/UX Designer",
  "Backend Developer",
];

const socials = [
  { icon: Github,   href: "https://github.com/ecoders1",              label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/isayas-fikadu", label: "LinkedIn" },
  { icon: Send,     href: "https://t.me/milkibn",                      label: "Telegram" },
];

function TypewriterRoles() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx(i => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <span style={{ color: "#00d4ff" }}>
      {displayed}
      <span style={{
        display: "inline-block", width: 2, height: "1em",
        background: "#00d4ff", marginLeft: 2, verticalAlign: "text-bottom",
        animation: "blink 0.8s step-end infinite",
      }} />
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </span>
  );
}

export default function Hero({ go }: Props) {
  return (
    <>
      <section style={{
        minHeight: "calc(100vh - 68px)",
        display: "flex", alignItems: "center",
        padding: "60px 24px",
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Subtle background glow blobs */}
        <div style={{
          position: "absolute", top: "20%", left: "5%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "5%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{
          maxWidth: 1100, margin: "0 auto", width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48, alignItems: "center",
        }}
          className="hero-grid"
        >

          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Greeting */}
            <p style={{
              fontSize: "1.15rem", color: "var(--fg2)",
              marginBottom: 8, fontWeight: 400,
            }}>
              Hello, It&apos;s Me
            </p>

            {/* Name */}
            <h1 style={{
              fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
              fontWeight: 800, color: "var(--fg)",
              lineHeight: 1.1, letterSpacing: "-0.03em",
              marginBottom: 12,
            }}>
              Isayas Fikadu
            </h1>

            {/* Role typewriter */}
            <h2 style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              fontWeight: 600, color: "var(--fg2)",
              marginBottom: 24, letterSpacing: "-0.01em",
            }}>
              And I&apos;m a <TypewriterRoles />
            </h2>

            {/* Bio */}
            <p style={{
              color: "var(--fg2)", fontSize: "0.95rem",
              lineHeight: 1.75, maxWidth: 480, marginBottom: 36,
            }}>
              I am a Full Stack Developer from Ambo, Ethiopia with 3+ years of
              experience building modern web applications for clients and
              real-world projects.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 10, marginBottom: 36 }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label} href={href}
                  target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 42, height: 42, borderRadius: "50%",
                    border: "2px solid var(--border)",
                    background: "var(--card)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--fg2)", textDecoration: "none",
                    transition: "border-color 0.2s, color 0.2s, transform 0.15s, box-shadow 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "#00d4ff";
                    e.currentTarget.style.color = "#00d4ff";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 0 12px rgba(0,212,255,0.3)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--fg2)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={() => go("contact")}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "0.75rem 1.75rem", borderRadius: 99,
                  background: "linear-gradient(135deg, #00d4ff, #8b5cf6)",
                  color: "#fff", border: "none", cursor: "pointer",
                  fontSize: "0.9rem", fontWeight: 700,
                  boxShadow: "0 4px 20px rgba(0,212,255,0.25)",
                  transition: "opacity 0.2s, transform 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Hire Me <ArrowRight size={15} />
              </button>

              <a
                href="/cv" target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "0.72rem 1.5rem", borderRadius: 99,
                  background: "transparent",
                  color: "var(--fg)", border: "2px solid var(--border)",
                  cursor: "pointer", fontSize: "0.9rem", fontWeight: 600,
                  textDecoration: "none",
                  transition: "border-color 0.2s, color 0.2s, transform 0.15s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#00d4ff";
                  e.currentTarget.style.color = "#00d4ff";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--fg)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Download size={14} /> Download CV
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT — glowing circular avatar ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            {/* Outer glow ring */}
            <div style={{
              position: "relative",
              width: "clamp(260px, 35vw, 400px)",
              height: "clamp(260px, 35vw, 400px)",
            }}>
              {/* Spinning gradient ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute", inset: -6,
                  borderRadius: "50%",
                  background: "conic-gradient(from 0deg, #00d4ff, #8b5cf6, #00d4ff)",
                  zIndex: 0,
                  filter: "blur(2px)",
                }}
              />
              {/* White gap ring */}
              <div style={{
                position: "absolute", inset: 0,
                borderRadius: "50%",
                border: "6px solid var(--bg)",
                zIndex: 1,
              }} />
              {/* Photo */}
              <div style={{
                position: "absolute", inset: 6,
                borderRadius: "50%",
                overflow: "hidden",
                zIndex: 2,
                background: "var(--bg2)",
              }}>
                <img
                  src="/isayas.jpg"
                  alt="Isayas Fikadu"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  onError={e => {
                    const t = e.currentTarget;
                    t.style.display = "none";
                    const p = t.parentElement as HTMLDivElement;
                    p.style.background = "linear-gradient(135deg,#00d4ff22,#8b5cf622)";
                    p.style.display = "flex";
                    p.style.alignItems = "center";
                    p.style.justifyContent = "center";
                    p.innerHTML = '<span style="font-size:5rem">👨‍💻</span>';
                  }}
                />
              </div>
              {/* Glow shadow */}
              <div style={{
                position: "absolute", inset: -16,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)",
                zIndex: 0,
                pointerEvents: "none",
              }} />
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 720px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > div:last-child {
            order: -1;
          }
          .hero-grid > div:first-child > div {
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}
