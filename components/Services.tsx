"use client";
import { motion } from "framer-motion";
import { ArrowRight, Globe, GraduationCap, ShoppingCart, LayoutTemplate, Code2, Database, Paintbrush, ClipboardList, Building2 } from "lucide-react";
import type { SectionId } from "@/app/page";

interface Props { go: (s: SectionId) => void; }

const services = [
  { icon: Globe,        title: "Web design",           body: "Building beautiful, responsive websites optimised for performance and user experience..." },
  { icon: LayoutTemplate, title: "Landing page",        body: "High-converting landing pages designed to capture leads and drive business goals..." },
  { icon: GraduationCap, title: "School management",   body: "Complete school systems with student, teacher, admin dashboards and grade tracking..." },
  { icon: ClipboardList, title: "Online exam system",  body: "Robust online examination platforms with auto-grading, analytics and reporting..." },
  { icon: ShoppingCart,  title: "E-commerce website",  body: "Full-featured online stores with payments, inventory management and dashboards..." },
  { icon: Building2,     title: "Business website",    body: "Professional business websites with SEO optimisation and modern responsive design..." },
  { icon: Paintbrush,    title: "UI/UX design",        body: "User-centred designs in Figma that enhance experience, accessibility and engagement..." },
  { icon: Code2,         title: "API development",     body: "Scalable, secure RESTful APIs with full documentation and authentication systems..." },
  { icon: Database,      title: "Database design",     body: "Efficient database architectures using MySQL, PostgreSQL, MongoDB and Firebase..." },
];

export default function Services({ go }: Props) {
  return (
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: 56 }}>
        <p className="section-tag" style={{ marginBottom: 10 }}>What I offer</p>
        <h2 className="section-title" style={{ marginBottom: 16 }}>My Services<span style={{ color: "var(--accent)" }}>.</span></h2>
        <p className="section-sub" style={{ margin: "0 auto" }}>
          I am a Full Stack Developer from Ambo, Ethiopia with 3+ years of experience
          working on academic and freelance projects.
        </p>
      </motion.div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
        {services.map(({ icon: Icon, title, body }, i) => (
          <motion.div
            key={title}
            className="card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            style={{ padding: "24px 20px" }}
          >
            <div style={{
              width: 42, height: 42, borderRadius: 10,
              background: "rgba(204,51,51,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 14, color: "var(--accent)",
            }}>
              <Icon size={19} />
            </div>
            <h3 style={{ fontWeight: 600, fontSize: "1rem", color: "var(--fg)", marginBottom: 8 }}>{title}</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--fg2)", lineHeight: 1.6, marginBottom: 16 }}>{body}</p>
            <button
              onClick={() => go("contact")}
              style={{
                display: "flex", alignItems: "center", gap: 4,
                background: "none", border: "none", cursor: "pointer",
                fontSize: "0.85rem", fontWeight: 500, color: "var(--fg2)",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--fg2)")}
            >
              Read more <ArrowRight size={13} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* My portfolio preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        style={{ marginTop: 64, textAlign: "center" }}
      >
        <p className="section-tag" style={{ marginBottom: 12 }}>My portfolio</p>
        <button onClick={() => go("work")} className="btn-dark">
          View my work <ArrowRight size={15} />
        </button>
      </motion.div>
    </section>
  );
}
