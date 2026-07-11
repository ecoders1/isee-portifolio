"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { SectionId } from "@/app/page";

interface Props { go: (s: SectionId) => void; }

const projects = [
  {
    title: "Ethiopia Exit Exam App",
    category: "Web App",
    description: "A platform helping Ethiopian university students practice Exit Exams online with department categories, real-time scoring and analytics.",
    tags: ["Next.js", "Supabase", "TypeScript"],
    demo: "https://ethio2.vercel.app",
    bg: "#e8f0fe",
    bgDark: "#1a2340",
    emoji: "🎓",
  },
  {
    title: "Apostolic Songs – Faarsaa",
    category: "Web App",
    description: "Afaan Oromo gospel songs app with search, playlist, audio player and offline support for mobile and desktop users.",
    tags: ["React", "Firebase", "Tailwind CSS"],
    demo: "https://faarsaa.vercel.app",
    bg: "#f0e8fe",
    bgDark: "#201a40",
    emoji: "🎵",
  },
  {
    title: "Online Exam System",
    category: "Web App",
    description: "Complete exam management system with Admin, Teacher and Student dashboards, automated grading and report generation.",
    tags: ["Next.js", "MySQL", "Node.js"],
    demo: "#",
    bg: "#fde8ee",
    bgDark: "#401a22",
    emoji: "📝",
  },
  {
    title: "Short-Term Training System",
    category: "Web App",
    description: "Training management platform for Rift Valley University with course management, certificate generation and trainee tracking.",
    tags: ["PHP", "MySQL", "Bootstrap"],
    demo: "#",
    bg: "#e8fef0",
    bgDark: "#1a4025",
    emoji: "🏫",
  },
];

const cats = ["All", "Web App", "Mobile App"];

export default function Projects({ go }: Props) {
  const [filter, setFilter] = useState("All");
  const [shown, setShown] = useState(4);

  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);
  const visible = filtered.slice(0, shown);

  return (
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: 48 }}>
        <p className="section-tag" style={{ marginBottom: 10 }}>My portfolio</p>
        <h2 className="section-title" style={{ marginBottom: 16 }}>My latest work<span style={{ color: "var(--accent)" }}>.</span></h2>
        <p className="section-sub" style={{ margin: "0 auto 28px" }}>
          Welcome to my portfolio! A collection of projects showcasing my expertise in full-stack development.
        </p>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          {cats.map(c => (
            <button
              key={c}
              onClick={() => { setFilter(c); setShown(4); }}
              style={{
                padding: "6px 18px", borderRadius: 99,
                border: "1.5px solid",
                borderColor: filter === c ? "var(--fg)" : "var(--border)",
                background: filter === c ? "var(--fg)" : "none",
                color: filter === c ? "var(--bg)" : "var(--fg2)",
                fontSize: "0.85rem", fontWeight: 500, cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.06 }}
              className="card"
              style={{ overflow: "hidden" }}
            >
              {/* Image area */}
              <div style={{
                height: 180,
                background: `var(--bg2)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "4.5rem",
                position: "relative",
              }}>
                {p.emoji}
                {p.demo !== "#" && (
                  <a
                    href={p.demo} target="_blank" rel="noopener noreferrer"
                    style={{
                      position: "absolute", bottom: 10, right: 10,
                      width: 36, height: 36, borderRadius: "50%",
                      background: "var(--fg)", color: "var(--bg)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      textDecoration: "none",
                    }}
                    aria-label="Open project"
                  >
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
              {/* Body */}
              <div style={{ padding: "16px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                  <h3 style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--fg)" }}>{p.title}</h3>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--fg3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{p.category}</p>
                <p style={{ fontSize: "0.82rem", color: "var(--fg2)", lineHeight: 1.55, marginBottom: 12 }}>{p.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ padding: "3px 10px", borderRadius: 99, border: "1px solid var(--border)", fontSize: "0.72rem", color: "var(--fg3)" }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show more */}
      {visible.length < filtered.length && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", marginTop: 36 }}>
          <button
            onClick={() => setShown(s => s + 4)}
            className="btn-outline"
            style={{ padding: "10px 32px" }}
          >
            Show more →
          </button>
        </motion.div>
      )}
    </section>
  );
}
