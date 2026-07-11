"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { SectionId } from "@/app/page";

interface Props { go: (s: SectionId) => void; }

const tools = ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "Supabase", "Firebase", "PostgreSQL", "Figma", "Git"];

export default function Hero({ go }: Props) {
  return (
    <section style={{ maxWidth: 780, margin: "0 auto", padding: "80px 24px 60px", textAlign: "center" }}>

      {/* Avatar */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: 90, height: 90,
          borderRadius: "50%",
          overflow: "hidden",
          margin: "0 auto 24px",
          border: "3px solid var(--border)",
        }}
      >
        <img
          src="/isayas.jpg"
          alt="Isayas Fikadu"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
          onError={e => {
            const t = e.currentTarget;
            t.style.display = "none";
            (t.parentElement as HTMLDivElement).style.background = "linear-gradient(135deg,#3b82f6,#8b5cf6)";
            (t.parentElement as HTMLDivElement).style.display = "flex";
            (t.parentElement as HTMLDivElement).style.alignItems = "center";
            (t.parentElement as HTMLDivElement).style.justifyContent = "center";
            (t.parentElement as HTMLDivElement).innerHTML = '<span style="color:white;font-weight:700;font-size:1.4rem">IF</span>';
          }}
        />
      </motion.div>

      {/* Tag */}
      <motion.p
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        style={{ fontSize: "0.95rem", color: "var(--fg2)", marginBottom: 14 }}
      >
        Hi! I&apos;m Isayas Fikadu 👋
      </motion.p>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        style={{
          fontSize: "clamp(2.4rem, 6vw, 4rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          color: "var(--fg)",
          marginBottom: 22,
        }}
      >
        full stack developer<br />based in Ethiopia<span style={{ color: "var(--accent)" }}>.</span>
      </motion.h1>

      {/* Sub */}
      <motion.p
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        style={{ color: "var(--fg2)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: 36, maxWidth: 540, margin: "0 auto 36px" }}
      >
        I am a Full Stack Developer from Ambo, Ethiopia with 3+ years of experience
        building modern web applications for clients and real-world projects.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}
      >
        <button onClick={() => go("contact")} className="btn-dark">
          contact me <ArrowRight size={15} />
        </button>
        <a href="/cv" target="_blank" rel="noopener noreferrer" className="btn-outline">
          Download CV
        </a>
      </motion.div>

      {/* Tools label */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
      >
        <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--fg3)", marginBottom: 16 }}>
          Tools I use
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
          {tools.map(t => (
            <span
              key={t}
              style={{
                padding: "5px 14px",
                borderRadius: 99,
                border: "1.5px solid var(--border)",
                fontSize: "0.8rem",
                color: "var(--fg2)",
                background: "var(--card)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
