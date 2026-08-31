"use client";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Send, Download } from "lucide-react";
import { useEffect, useState } from "react";
import type { SectionId } from "@/app/page";

interface Props { go: (s: SectionId) => void; }

const HEADLINE = "full stack developer\nbased in Ethiopia";

const socials = [
  { icon: Github,   href: "https://github.com/ecoders1",                    label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/isayas-fikadu",       label: "LinkedIn" },
  { icon: Send,     href: "https://t.me/milkibn",                            label: "Telegram" },
];

function TypewriterHeadline() {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setDone(false);
    const interval = setInterval(() => {
      i++;
      setDisplayed(HEADLINE.slice(0, i));
      if (i >= HEADLINE.length) { clearInterval(interval); setDone(true); }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {displayed.split("\n").map((line, idx, arr) => (
        <span key={idx}>
          {line}
          {idx < arr.length - 1 && <br />}
        </span>
      ))}
      <span style={{
        display: "inline-block", width: 3, height: "0.85em",
        background: "var(--accent)", marginLeft: 4, verticalAlign: "middle",
        borderRadius: 2, animation: done ? "blink 1s step-end infinite" : "none",
      }} />
      <span style={{ color: "var(--accent)" }}>.</span>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </>
  );
}

export default function Hero({ go }: Props) {
  return (
    <section style={{ maxWidth: 780, margin: "0 auto", padding: "80px 24px 60px", textAlign: "center" }}>

      {/* Availability badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28,
          padding: "6px 16px", borderRadius: 99,
          border: "1.5px solid #22c55e50", background: "#22c55e0e" }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e",
          boxShadow: "0 0 6px #22c55e", animation: "pulse 2s infinite" }} />
        <span style={{ fontSize: "0.78rem", color: "#22c55e", fontWeight: 600 }}>Available for work</span>
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }`}</style>
      </motion.div>

      {/* Avatar */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}
        style={{ width: 96, height: 96, borderRadius: "50%", overflow: "hidden",
          margin: "0 auto 20px", border: "3px solid var(--border)",
          boxShadow: "0 0 0 6px var(--bg2)" }}
      >
        <img
          src="/isayas.jpg" alt="Isayas Fikadu"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
          onError={e => {
            const t = e.currentTarget;
            t.style.display = "none";
            const p = t.parentElement as HTMLDivElement;
            p.style.background = "linear-gradient(135deg,#cc3333,#3b82f6)";
            p.style.display = "flex"; p.style.alignItems = "center"; p.style.justifyContent = "center";
            p.innerHTML = '<span style="color:white;font-weight:700;font-size:1.4rem">IF</span>';
          }}
        />
      </motion.div>

      {/* Greeting */}
      <motion.p
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        style={{ fontSize: "0.95rem", color: "var(--fg2)", marginBottom: 14 }}
      >
        Hi! I&apos;m Isayas Fikadu 👋
      </motion.p>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 700, lineHeight: 1.1,
          letterSpacing: "-0.03em", color: "var(--fg)", marginBottom: 22 }}
      >
        <TypewriterHeadline />
      </motion.h1>

      {/* Bio */}
      <motion.p
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        style={{ color: "var(--fg2)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: 36,
          maxWidth: 540, margin: "0 auto 36px" }}
      >
        I am a Full Stack Developer from Ambo, Ethiopia with 3+ years of experience
        building modern web applications for clients and real-world projects.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}
      >
        <button onClick={() => go("contact")} className="btn-dark">
          contact me <ArrowRight size={15} />
        </button>
        <a href="/cv" target="_blank" rel="noopener noreferrer" className="btn-outline"
          style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <Download size={14} /> Download CV
        </a>
      </motion.div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 52 }}
      >
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label} href={href} target="_blank" rel="noopener noreferrer"
            aria-label={label}
            style={{
              width: 40, height: 40, borderRadius: "50%",
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
            <Icon size={16} />
          </a>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        style={{ marginTop: 52, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
      >
        <span style={{ fontSize: "0.7rem", color: "var(--fg3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>scroll</span>
        <div style={{ width: 1.5, height: 36, background: "var(--border)", borderRadius: 99, position: "relative", overflow: "hidden" }}>
          <motion.div
            animate={{ y: [0, 28, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", top: 0, left: 0, right: 0, height: 12,
              background: "var(--accent)", borderRadius: 99 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
