"use client";
import { useEffect } from "react";
import { Download, Printer } from "lucide-react";

export default function CVPage() {
  useEffect(() => {
    document.title = "Isayas Fikadu – CV";
  }, []);

  return (
    <>
      {/* Action bar – hidden when printing */}
      <div className="no-print" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "#1a1a2e", borderBottom: "1px solid #333",
        padding: "12px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        fontFamily: "system-ui, sans-serif",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: "0.8rem",
          }}>IF</div>
          <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem" }}>
            Isayas Fikadu – Curriculum Vitae
          </span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => window.print()}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 16px", borderRadius: 8,
              border: "1.5px solid #555", background: "transparent",
              color: "#ccc", fontSize: "0.85rem", cursor: "pointer",
            }}
          >
            <Printer size={14} /> Print
          </button>
          <button
            onClick={() => window.print()}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 18px", borderRadius: 8,
              border: "none",
              background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
              color: "#fff", fontSize: "0.85rem",
              fontWeight: 600, cursor: "pointer",
            }}
          >
            <Download size={14} /> Download PDF
          </button>
          <a href="/" style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 14px", borderRadius: 8,
            border: "1.5px solid #555", background: "transparent",
            color: "#ccc", fontSize: "0.85rem", textDecoration: "none",
          }}>
            ← Back
          </a>
        </div>
      </div>

      {/* CV Document */}
      <div id="cv-doc" style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: "90px 40px 60px",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        background: "#fff",
        color: "#1a1a1a",
        minHeight: "100vh",
        lineHeight: 1.6,
      }}>

        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "flex-start", marginBottom: 32, paddingBottom: 24, borderBottom: "2px solid #1a3a6e" }}>
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#1a3a6e", marginBottom: 4, letterSpacing: "-0.01em" }}>
              ISAYAS FIKADU BAZABI
            </h1>
            <p style={{ fontSize: "1rem", color: "#cc3333", fontWeight: 600, marginBottom: 12 }}>
              Full Stack Web Developer
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 24px", fontSize: "0.82rem", color: "#444" }}>
              {[
                ["📧", "iyasu4313@gmail.com"],
                ["📞", "+251 94 313 3184"],
                ["📍", "Ambo, Ethiopia"],
                ["💬", "Telegram: @milkibn"],
                ["🐙", "github.com/ecoders1"],
                ["🌐", "isayasfikadu.vercel.app"],
              ].map(([icon, val]) => (
                <span key={val}>{icon} {val}</span>
              ))}
            </div>
          </div>
          {/* Avatar placeholder */}
          <div style={{
            width: 100, height: 100, borderRadius: "50%",
            background: "linear-gradient(135deg,#1a3a6e,#3b82f6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: "1.6rem", fontWeight: 700,
            border: "3px solid #1a3a6e", flexShrink: 0,
          }}>IF</div>
        </div>

        {/* Career Objective */}
        <Section title="CAREER OBJECTIVE">
          <p style={{ fontSize: "0.875rem", color: "#333", lineHeight: 1.75 }}>
            I graduated with a Bachelor&apos;s degree in Computer Science in 2017 E.C. (2025 G.C).
            I possess strong interpersonal skills, a positive attitude, and the ability to work
            effectively and collaboratively with others. I seek a challenging position where I can
            apply my computer science knowledge, technical skills and problem-solving abilities to
            contribute effectively to organisational success while continuing to grow professionally.
          </p>
        </Section>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div>
            {/* Personal Info */}
            <Section title="PERSONAL INFORMATION">
              <InfoRow label="Full Name"    value="Isayas Fikadu Bazabi" />
              <InfoRow label="Date of Birth" value="02/10/1992 E.C" />
              <InfoRow label="Nationality"  value="Ethiopian" />
              <InfoRow label="Gender"       value="Male" />
              <InfoRow label="Address"      value="Ambo, Ethiopia" />
            </Section>

            {/* Languages */}
            <Section title="LANGUAGES">
              {["Afaan Oromo – Read, Write, Listen", "Amharic – Read, Write, Listen", "English – Read, Write, Listen"].map(l => (
                <p key={l} style={{ fontSize: "0.82rem", color: "#333", marginBottom: 4 }}>✦ {l}</p>
              ))}
            </Section>

            {/* Professional Skills */}
            <Section title="PROFESSIONAL SKILLS">
              {["Time management", "Teamwork & collaboration", "Project management and Leadership", "Work ethics & responsibility", "Documentation skills", "Presentation skills and Decision-making"].map(s => (
                <p key={s} style={{ fontSize: "0.82rem", color: "#333", marginBottom: 4 }}>• {s}</p>
              ))}
            </Section>

            {/* Soft Skills */}
            <Section title="SOFT SKILLS">
              {["Communication (oral & written)", "Problem-solving and Critical thinking", "Creativity and Adaptability", "Emotional intelligence", "Conflict resolution and Active listening"].map(s => (
                <p key={s} style={{ fontSize: "0.82rem", color: "#333", marginBottom: 4 }}>• {s}</p>
              ))}
            </Section>
          </div>

          <div>
            {/* Education */}
            <Section title="EDUCATIONAL BACKGROUND">
              <EduItem
                title="Bachelor's Degree in Computer Science"
                place="Rift Valley University – Ambo Campus, Ethiopia"
                period="Graduated June 2017 E.C (2025 G.C)"
                detail="CGPA: 3.89 | Exit Exam: 50/100"
              />
              <EduItem
                title="Grade 9–12"
                place="Gincii Secondary School, Ethiopia"
                period="2010–2013 E.C"
                detail="Grade 10: CGPA 3.2 | Grade 12: 411 marks"
              />
              <EduItem
                title="Grade 5–8"
                place="Gura Awash Primary School"
                period=""
                detail="Grade 8 Result: 73 marks"
              />
            </Section>

            {/* Technical Skills */}
            <Section title="TECHNICAL SKILLS">
              <SkillGroup label="Frontend"  skills="HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Bootstrap" />
              <SkillGroup label="Backend"   skills="Node.js, Express.js, PHP" />
              <SkillGroup label="Database"  skills="MySQL, PostgreSQL (Neon), Supabase, Firebase, MongoDB" />
              <SkillGroup label="Tools"     skills="Git, GitHub, Vercel, Figma, Postman, VS Code" />
              <SkillGroup label="Other"     skills="Web development, Software tools, Microsoft Office, Basic Networking" />
            </Section>

            {/* Projects */}
            <Section title="PROJECTS & RESEARCH">
              {[
                "Ethiopia Exit Exam Web App (ethio2.vercel.app)",
                "Apostolic Songs – Afaan Oromo (faarsaa.vercel.app)",
                "Online Exam Management System",
                "Web-Based Short-Term Training System – RVU Ambo",
                "Student Registration System",
                "Online Learning Website",
                "Online Course Website",
                "Personal Portfolio Website",
              ].map(p => (
                <p key={p} style={{ fontSize: "0.82rem", color: "#333", marginBottom: 4 }}>❖ {p}</p>
              ))}
            </Section>

            {/* Experience */}
            <Section title="EXPERIENCE">
              <p style={{ fontSize: "0.82rem", color: "#333", marginBottom: 4 }}>▪ Self-employed / Freelance Web Development</p>
              <p style={{ fontSize: "0.82rem", color: "#333", marginBottom: 4 }}>▪ Software development projects (Academic experience)</p>
            </Section>

            {/* References */}
            <Section title="REFERENCES">
              <RefItem name="Natsenat Arega (MSc)" role="Head, Department of Computer Science – RVU Ambo Campus" />
              <RefItem name="Firaol Kapita (MSc)"  role="Web Development Expert & Lecturer – Ambo University" />
            </Section>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          #cv-doc { padding: 20px 32px !important; margin: 0 !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { margin: 12mm; size: A4; }
        }
        body { background: #e8e8e8; }
        @media screen { #cv-doc { box-shadow: 0 4px 40px rgba(0,0,0,0.15); } }
      `}</style>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <h2 style={{
        fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em",
        textTransform: "uppercase", color: "#1a3a6e",
        borderBottom: "1.5px solid #1a3a6e",
        paddingBottom: 4, marginBottom: 10,
      }}>{title}</h2>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 4, fontSize: "0.82rem" }}>
      <span style={{ color: "#888", minWidth: 90, flexShrink: 0 }}>{label}:</span>
      <span style={{ color: "#333" }}>{value}</span>
    </div>
  );
}

function EduItem({ title, place, period, detail }: { title: string; place: string; period: string; detail: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 2 }}>❖ {title}</p>
      <p style={{ fontSize: "0.8rem", color: "#555", marginBottom: 1 }}>{place}</p>
      {period && <p style={{ fontSize: "0.78rem", color: "#888", marginBottom: 1 }}>{period}</p>}
      <p style={{ fontSize: "0.78rem", color: "#cc3333", fontWeight: 600 }}>{detail}</p>
    </div>
  );
}

function SkillGroup({ label, skills }: { label: string; skills: string }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1a3a6e" }}>{label}: </span>
      <span style={{ fontSize: "0.8rem", color: "#444" }}>{skills}</span>
    </div>
  );
}

function RefItem({ name, role }: { name: string; role: string }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 1 }}>◦ {name}</p>
      <p style={{ fontSize: "0.78rem", color: "#555" }}>{role}</p>
    </div>
  );
}
