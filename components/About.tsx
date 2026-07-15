"use client";
import { motion } from "framer-motion";
import { Code2, GraduationCap, Briefcase } from "lucide-react";
import type { SectionId } from "@/app/page";

interface Props { go: (s: SectionId) => void; }

const cards = [
  {
    icon: Code2,
    title: "Languages",
    body: "HTML, CSS, JavaScript, TypeScript, React, Next.js, PHP, Node.js",
  },
  {
    icon: GraduationCap,
    title: "Education",
    body: "B.Sc. Computer Science — RVU Ambo Campus, CGPA 3.89, Graduated 2025",
  },
  {
    icon: Briefcase,
    title: "Projects",
    body: "Built 20+ real-world projects including exam platforms, school systems and web apps",
  },
];

const tools = ["Git & GitHub", "Vercel", "Supabase", "Firebase", "PostgreSQL", "MongoDB", "Figma", "Postman", "VS Code"];

export default function About({ go }: Props) {
  return (
    <section style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 24px" }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 56 }}
      >
        <p className="section-tag" style={{ marginBottom: 10 }}>Introduction</p>
        <h2 className="section-title" style={{ marginBottom: 0 }}>About me<span style={{ color: "var(--accent)" }}>.</span></h2>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32, alignItems: "start" }}>

        {/* Photo — full display, no crop */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          style={{
            borderRadius: 20,
            overflow: "hidden",
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            maxWidth: 420,
            width: "100%",
          }}
        >
          <img
            src="/isayas-web.png"
            alt="Isayas Fikadu – Full Stack Developer"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain",
            }}
            onError={e => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
              const p = e.currentTarget.parentElement as HTMLDivElement;
              p.style.display = "flex";
              p.style.alignItems = "center";
              p.style.justifyContent = "center";
              p.style.minHeight = "300px";
              p.innerHTML = '<span style="font-size:5rem">👨‍💻</span>';
            }}
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
          style={{ display: "flex", flexDirection: "column", gap: 24 }}
        >
          <p className="section-sub">
            I am an experienced Full Stack Developer from Ambo, Ethiopia. Throughout my career I
            have built web applications, examination platforms, training systems and more —
            delivering clean, high-performance software for real users.
          </p>
          <p className="section-sub">
            I graduated with a B.Sc. in Computer Science from Rift Valley University (CGPA 3.89)
            and bring strong skills across the entire stack — from responsive UIs to robust APIs
            and database design.
          </p>

          {/* Info cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
            {cards.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                className="card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.07 }}
                style={{ padding: "18px 16px" }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: "var(--bg2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 12,
                  color: "var(--accent)",
                }}>
                  <Icon size={17} />
                </div>
                <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--fg)", marginBottom: 6 }}>{title}</p>
                <p style={{ fontSize: "0.8rem", color: "var(--fg2)", lineHeight: 1.5 }}>{body}</p>
              </motion.div>
            ))}
          </div>

          {/* Tools */}
          <div>
            <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--fg3)", marginBottom: 12 }}>
              Tools I use
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {tools.map(t => (
                <span key={t} style={{ padding: "4px 12px", borderRadius: 99, border: "1.5px solid var(--border)", fontSize: "0.78rem", color: "var(--fg2)", background: "var(--card)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <button onClick={() => go("contact")} className="btn-dark" style={{ alignSelf: "flex-start" }}>
            Get in touch →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
