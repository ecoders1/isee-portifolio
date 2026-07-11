"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, Save, CheckCircle, X, Plus } from "lucide-react";

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  telegram: string;
  github: string;
  location: string;
  address: string;
  dob: string;
  gender: string;
  nationality: string;
  objective: string;
  degree: string;
  institution: string;
  cgpa: string;
  gradYear: string;
  languages: string[];
  profSkills: string[];
  softSkills: string[];
  refName1: string;
  refRole1: string;
  refName2: string;
  refRole2: string;
}

const DEFAULTS: ProfileData = {
  fullName:    "Isayas Fikadu Bazabi",
  email:       "iyasu4313@gmail.com",
  phone:       "+251943133184",
  telegram:    "@milkibn",
  github:      "github.com/ecoders1",
  location:    "Ambo, Ethiopia",
  address:     "Ambo, West Shewa, Ethiopia",
  dob:         "02/10/1992 E.C",
  gender:      "Male",
  nationality: "Ethiopian",
  objective:   "A motivated and detail-oriented Computer Science graduate with a CGPA of 3.89, passionate about full-stack web development. Seeking opportunities to apply my skills in creating impactful digital solutions.",
  degree:      "B.Sc. Computer Science",
  institution: "Rift Valley University – Ambo Campus",
  cgpa:        "3.89 / 4.00",
  gradYear:    "June 2025 (2017 E.C)",
  languages:   ["Afaan Oromo (Native)", "Amharic (Fluent)", "English (Proficient)"],
  profSkills:  ["React", "Next.js", "TypeScript", "Node.js", "PHP", "MySQL", "Supabase", "Firebase", "Git", "Tailwind CSS"],
  softSkills:  ["Problem Solving", "Team Collaboration", "Communication", "Time Management", "Adaptability"],
  refName1:    "Negash Bekele",
  refRole1:    "Lecturer, Rift Valley University",
  refName2:    "Tadesse Girma",
  refRole2:    "Software Engineer",
};

const inputStyle: React.CSSProperties = {
  width: "100%", background: "#1a1a1a", border: "1px solid #333",
  borderRadius: 8, padding: "10px 14px", color: "#f0f0f5",
  fontSize: "0.875rem", outline: "none", boxSizing: "border-box",
};
const labelStyle: React.CSSProperties = { display:"block", fontSize:"0.8rem", color:"#888", marginBottom:5, fontWeight:500 };
const card: React.CSSProperties = { background:"#1a1a1a", border:"1px solid #222", borderRadius:14, padding:20, marginBottom:18 };
const sectionTitle: React.CSSProperties = { fontSize:"0.95rem", fontWeight:600, color:"#fff", margin:"0 0 16px", display:"flex", alignItems:"center", gap:8 };

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData]     = useState<ProfileData>(DEFAULTS);
  const [toast, setToast]   = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newSoft, setNewSoft]   = useState("");
  const [newLang, setNewLang]   = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin_auth") !== "true") {
      router.replace("/admin"); return;
    }
    try {
      const saved = localStorage.getItem("profileData");
      if (saved) setData(JSON.parse(saved));
    } catch { /* use defaults */ }
  }, [router]);

  const set = (key: keyof ProfileData, val: string) =>
    setData(d => ({ ...d, [key]: val }));

  const removeTag = (key: "profSkills" | "softSkills" | "languages", idx: number) =>
    setData(d => ({ ...d, [key]: (d[key] as string[]).filter((_, i) => i !== idx) }));

  const addTag = (key: "profSkills" | "softSkills" | "languages", val: string, clear: () => void) => {
    const v = val.trim();
    if (!v) return;
    setData(d => ({ ...d, [key]: [...(d[key] as string[]), v] }));
    clear();
  };

  const save = () => {
    localStorage.setItem("profileData", JSON.stringify(data));
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontSize:"1.4rem", fontWeight:700, color:"#fff", margin:0, letterSpacing:"-0.02em" }}>Profile</h1>
          <p style={{ color:"#555", fontSize:"0.82rem", margin:"3px 0 0" }}>Edit your personal information</p>
        </div>
        <button onClick={save} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 20px", borderRadius:8, border:"none", background:"linear-gradient(135deg,#3b82f6,#8b5cf6)", color:"#fff", fontSize:"0.875rem", fontWeight:600, cursor:"pointer" }}>
          <Save size={15} /> Save Changes
        </button>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }}
            style={{ position:"fixed", top:20, right:20, zIndex:999, background:"rgba(74,222,128,0.15)", border:"1px solid rgba(74,222,128,0.3)", borderRadius:10, padding:"12px 18px", display:"flex", alignItems:"center", gap:8, color:"#4ade80", fontSize:"0.875rem", fontWeight:500 }}>
            <CheckCircle size={15} /> Profile saved successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Personal Info */}
      <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.05 }} style={card}>
        <h2 style={sectionTitle}><User size={15} style={{ color:"#3b82f6" }} /> Personal Information</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:14 }}>
          {([
            ["fullName","Full Name","text"],["email","Email","email"],["phone","Phone","text"],
            ["telegram","Telegram","text"],["github","GitHub","text"],["location","Location","text"],
            ["address","Address","text"],["dob","Date of Birth","text"],["gender","Gender","text"],
            ["nationality","Nationality","text"],
          ] as [keyof ProfileData, string, string][]).map(([k,l,t]) => (
            <div key={k}>
              <label style={labelStyle}>{l}</label>
              <input type={t} value={data[k] as string} onChange={e => set(k, e.target.value)} style={inputStyle}
                onFocus={e => e.target.style.borderColor="#3b82f6"}
                onBlur={e => e.target.style.borderColor="#333"}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Career Objective */}
      <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }} style={card}>
        <h2 style={sectionTitle}>🎯 Career Objective</h2>
        <textarea value={data.objective} onChange={e => set("objective", e.target.value)} rows={4}
          style={{ ...inputStyle, resize:"vertical", lineHeight:1.6 }}
          onFocus={e => e.target.style.borderColor="#3b82f6"}
          onBlur={e => e.target.style.borderColor="#333"}
        />
      </motion.div>

      {/* Education */}
      <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.12 }} style={card}>
        <h2 style={sectionTitle}>🎓 Education</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:14 }}>
          {([
            ["degree","Degree"],["institution","Institution"],["cgpa","CGPA"],["gradYear","Graduation Year"],
          ] as [keyof ProfileData, string][]).map(([k,l]) => (
            <div key={k}>
              <label style={labelStyle}>{l}</label>
              <input value={data[k] as string} onChange={e => set(k, e.target.value)} style={inputStyle}
                onFocus={e => e.target.style.borderColor="#3b82f6"}
                onBlur={e => e.target.style.borderColor="#333"}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Languages */}
      <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.14 }} style={card}>
        <h2 style={sectionTitle}>🌍 Languages</h2>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:10 }}>
          {data.languages.map((l,i) => (
            <span key={i} style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(59,130,246,0.12)", border:"1px solid rgba(59,130,246,0.25)", borderRadius:20, padding:"4px 12px", fontSize:"0.82rem", color:"#60a5fa" }}>
              {l}
              <button onClick={() => removeTag("languages", i)} style={{ background:"none", border:"none", cursor:"pointer", color:"#f87171", padding:0, display:"flex" }}><X size={12} /></button>
            </span>
          ))}
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <input value={newLang} onChange={e => setNewLang(e.target.value)} placeholder="Add language…" style={{ ...inputStyle, flex:1 }}
            onFocus={e => e.target.style.borderColor="#3b82f6"}
            onBlur={e => e.target.style.borderColor="#333"}
            onKeyDown={e => { if(e.key==="Enter"){ addTag("languages", newLang, ()=>setNewLang("")); }}}
          />
          <button onClick={() => addTag("languages", newLang, ()=>setNewLang(""))} style={{ padding:"10px 16px", borderRadius:8, border:"none", background:"rgba(59,130,246,0.15)", color:"#60a5fa", cursor:"pointer", display:"flex", alignItems:"center", gap:4, fontSize:"0.85rem" }}>
            <Plus size={14} /> Add
          </button>
        </div>
      </motion.div>

      {/* Professional Skills */}
      <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.16 }} style={card}>
        <h2 style={sectionTitle}>💻 Professional Skills</h2>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:10 }}>
          {data.profSkills.map((s,i) => (
            <span key={i} style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(139,92,246,0.12)", border:"1px solid rgba(139,92,246,0.25)", borderRadius:20, padding:"4px 12px", fontSize:"0.82rem", color:"#a78bfa" }}>
              {s}
              <button onClick={() => removeTag("profSkills", i)} style={{ background:"none", border:"none", cursor:"pointer", color:"#f87171", padding:0, display:"flex" }}><X size={12} /></button>
            </span>
          ))}
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <input value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="Add skill…" style={{ ...inputStyle, flex:1 }}
            onFocus={e => e.target.style.borderColor="#3b82f6"}
            onBlur={e => e.target.style.borderColor="#333"}
            onKeyDown={e => { if(e.key==="Enter"){ addTag("profSkills", newSkill, ()=>setNewSkill("")); }}}
          />
          <button onClick={() => addTag("profSkills", newSkill, ()=>setNewSkill(""))} style={{ padding:"10px 16px", borderRadius:8, border:"none", background:"rgba(139,92,246,0.15)", color:"#a78bfa", cursor:"pointer", display:"flex", alignItems:"center", gap:4, fontSize:"0.85rem" }}>
            <Plus size={14} /> Add
          </button>
        </div>
      </motion.div>

      {/* Soft Skills */}
      <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.18 }} style={card}>
        <h2 style={sectionTitle}>🤝 Soft Skills</h2>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:10 }}>
          {data.softSkills.map((s,i) => (
            <span key={i} style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.25)", borderRadius:20, padding:"4px 12px", fontSize:"0.82rem", color:"#34d399" }}>
              {s}
              <button onClick={() => removeTag("softSkills", i)} style={{ background:"none", border:"none", cursor:"pointer", color:"#f87171", padding:0, display:"flex" }}><X size={12} /></button>
            </span>
          ))}
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <input value={newSoft} onChange={e => setNewSoft(e.target.value)} placeholder="Add soft skill…" style={{ ...inputStyle, flex:1 }}
            onFocus={e => e.target.style.borderColor="#3b82f6"}
            onBlur={e => e.target.style.borderColor="#333"}
            onKeyDown={e => { if(e.key==="Enter"){ addTag("softSkills", newSoft, ()=>setNewSoft("")); }}}
          />
          <button onClick={() => addTag("softSkills", newSoft, ()=>setNewSoft(""))} style={{ padding:"10px 16px", borderRadius:8, border:"none", background:"rgba(16,185,129,0.1)", color:"#34d399", cursor:"pointer", display:"flex", alignItems:"center", gap:4, fontSize:"0.85rem" }}>
            <Plus size={14} /> Add
          </button>
        </div>
      </motion.div>

      {/* References */}
      <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }} style={card}>
        <h2 style={sectionTitle}>📋 References</h2>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
          <div>
            <p style={{ fontSize:"0.82rem", color:"#555", margin:"0 0 10px", fontWeight:500 }}>Reference 1</p>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <div>
                <label style={labelStyle}>Name</label>
                <input value={data.refName1} onChange={e => set("refName1", e.target.value)} style={inputStyle}
                  onFocus={e => e.target.style.borderColor="#3b82f6"}
                  onBlur={e => e.target.style.borderColor="#333"}
                />
              </div>
              <div>
                <label style={labelStyle}>Role</label>
                <input value={data.refRole1} onChange={e => set("refRole1", e.target.value)} style={inputStyle}
                  onFocus={e => e.target.style.borderColor="#3b82f6"}
                  onBlur={e => e.target.style.borderColor="#333"}
                />
              </div>
            </div>
          </div>
          <div>
            <p style={{ fontSize:"0.82rem", color:"#555", margin:"0 0 10px", fontWeight:500 }}>Reference 2</p>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <div>
                <label style={labelStyle}>Name</label>
                <input value={data.refName2} onChange={e => set("refName2", e.target.value)} style={inputStyle}
                  onFocus={e => e.target.style.borderColor="#3b82f6"}
                  onBlur={e => e.target.style.borderColor="#333"}
                />
              </div>
              <div>
                <label style={labelStyle}>Role</label>
                <input value={data.refRole2} onChange={e => set("refRole2", e.target.value)} style={inputStyle}
                  onFocus={e => e.target.style.borderColor="#3b82f6"}
                  onBlur={e => e.target.style.borderColor="#333"}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Save button bottom */}
      <div style={{ display:"flex", justifyContent:"flex-end", marginTop:8 }}>
        <button onClick={save} style={{ display:"flex", alignItems:"center", gap:8, padding:"11px 24px", borderRadius:8, border:"none", background:"linear-gradient(135deg,#3b82f6,#8b5cf6)", color:"#fff", fontSize:"0.9rem", fontWeight:600, cursor:"pointer" }}>
          <Save size={15} /> Save All Changes
        </button>
      </div>

      <style>{`input::placeholder,textarea::placeholder{color:#444}`}</style>
    </div>
  );
}
