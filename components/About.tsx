"use client";
import { motion } from "framer-motion";
import { Code2, GraduationCap, Briefcase, MapPin, Calendar } from "lucide-react";
import type { SectionId } from "@/app/page";

interface Props { go: (s: SectionId) => void; }

const skills = [
  { name: "React / Next.js",  pct: 95 },
  { name: "TypeScript",       pct: 88 },
  { name: "Node.js / APIs",   pct: 85 },
  { name: "Tailwind CSS",     pct: 92 },
  { name: "PostgreSQL / SQL", pct: 80 },
  { name: "Firebase / Supabase", pct: 82 },
];

const timeline = [
  {
    year: "2025",
    title: "B.Sc. Computer Science",
    place: "Rift Valley University – Ambo Campus",
    desc: "Graduated with CGPA 3.89. Senior project: Online Exam System.",
    icon: GraduationCap,
  },
  {
    year: "2023–2025",
    title: "Freelance Full Stack Developer",
    place: "Remote / Ambo, Ethiopia",
    desc: "Built 20+ web apps for clients — exam platforms, school systems, e-commerce sites.",
    icon: Briefcase,
  },
  {
    year: "2022",
    title: "Started Web Development",
    place: "Self-taught & University projects",
    desc: "Learned HTML, CSS, JS, React and built first real-world projects.",
    icon: Code2,
  },
];

const tools = ["Git & GitHub", "Vercel", "Supabase", "Firebase", "PostgreSQL", "MongoDB", "Figma", "Postman", "VS Code"];

function SkillBar({ name, pct, delay }: { name: string; pct: number; delay: number }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: "0.82rem", color: "var(--fg2)", fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: "0.78rem", color: "var(--fg3)" }}>{pct}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 99, background: "var(--bg2)", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, delay, ease: "easeOut" }}
          style={{ height: "100%", borderRadius: 99, background: "var(--accent)" }}
        />
      </div>
    </div>
  );
}

export default function About({ go }: Props) {
  return (
    <section style={{ maxWidth: 1080, margin: "0 auto", padding: "60px 24px" }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 56 }}>
        <p className="section-tag" style={{ marginBottom: 10 }}>Introduction</p>
        <h2 className="section-title">About me<span style={{ color: "var(--accent)" }}>.</span></h2>
      </motion.div>

      {/* Top grid — photo + bio */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40, alignItems: "start", marginBottom: 64 }}>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          style={{ borderRadius: 20, overflow: "hidden", background: "var(--bg2)",
            border: "1px solid var(--border)", maxWidth: 420, width: "100%" }}
        >
          <img
            src="/isayas-web.png"
            alt="Isayas Fikadu – Full Stack Developer"
            style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
            onError={e => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
              const p = e.currentTarget.parentElement as HTMLDivElement;
              p.style.display = "flex"; p.style.alignItems = "center";
              p.style.justifyContent = "center"; p.style.minHeight = "300px";
              p.innerHTML = '<span style="font-size:5rem">👨‍💻</span>';
            }}
          />
          {/* Info strip below photo */}
          <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { icon: MapPin,    text: "Ambo, Ethiopia" },
              { icon: Calendar,  text: "3+ Years Experience" },
              { icon: GraduationCap, text: "B.Sc. Computer Science, CGPA 3.89" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon size={14} style={{ color: "var(--accent)", flexShrink: 0 }} />
                <span style={{ fontSize: "0.82rem", color: "var(--fg2)" }}>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bio + skills */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
          style={{ display: "flex", flexDirection: "column", gap: 24 }}
        >
          <p className="section-sub">
            I&apos;m an experienced Full Stack Developer from Ambo, Ethiopia. I build web
            applications, examination platforms, training systems and more — delivering
            clean, high-performance software for real users.
          </p>
          <p className="section-sub">
            I graduated with a B.Sc. in Computer Science from Rift Valley University (CGPA 3.89)
            and bring strong skills across the entire stack — from responsive UIs to robust APIs
            and database design.
          </p>

          {/* Skill bars */}
          <div>
            <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em",
              color: "var(--fg3)", marginBottom: 16 }}>Core skills</p>
            {skills.map(({ name, pct }, i) => (
              <SkillBar key={name} name={name} pct={pct} delay={0.2 + i * 0.06} />
            ))}
          </div>

          {/* Tools */}
          <div>
            <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em",
              color: "var(--fg3)", marginBottom: 12 }}>Tools I use</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {tools.map(t => (
                <span key={t} style={{ padding: "4px 12px", borderRadius: 99,
                  border: "1.5px solid var(--border)", fontSize: "0.78rem",
                  color: "var(--fg2)", background: "var(--card)" }}>
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

      {/* Timeline */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <p className="section-tag" style={{ marginBottom: 28 }}>Experience &amp; Education</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {timeline.map(({ year, title, place, desc, icon: Icon }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.1 }}
              style={{ display: "flex", gap: 20, paddingBottom: i < timeline.length - 1 ? 32 : 0 }}
            >
              {/* Timeline line + dot */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%",
                  background: "var(--bg2)", border: "2px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--accent)", flexShrink: 0 }}>
                  <Icon size={16} />
                </div>
                {i < timeline.length - 1 && (
                  <div style={{ width: 2, flex: 1, background: "var(--border)", marginTop: 8, borderRadius: 99 }} />
                )}
              </div>
              {/* Content */}
              <div style={{ paddingTop: 6 }}>
                <span style={{ fontSize: "0.75rem", color: "var(--accent)", fontWeight: 600,
                  background: "rgba(204,51,51,0.08)", padding: "2px 10px",
                  borderRadius: 99, display: "inline-block", marginBottom: 8 }}>{year}</span>
                <h3 style={{ fontWeight: 600, fontSize: "1rem", color: "var(--fg)", marginBottom: 4 }}>{title}</h3>
                <p style={{ fontSize: "0.82rem", color: "var(--accent)", marginBottom: 6 }}>{place}</p>
                <p style={{ fontSize: "0.85rem", color: "var(--fg2)", lineHeight: 1.6 }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
