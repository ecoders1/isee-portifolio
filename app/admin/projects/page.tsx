"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, ExternalLink, Github, X, Save, CheckCircle, FolderOpen } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string;
  demo: string;
  github: string;
  emoji: string;
}

const DEFAULTS: Project[] = [
  { id:1, title:"Ethiopia Exit Exam App", category:"Web App", description:"Platform for Ethiopian university students to practice Exit Exams online.", tags:"Next.js,Supabase,TypeScript", demo:"https://ethio2.vercel.app", github:"https://github.com/ecoders1", emoji:"🎓" },
  { id:2, title:"Apostolic Songs – Faarsaa", category:"Web App", description:"Afaan Oromo gospel songs app with audio player and offline support.", tags:"React,Firebase,Tailwind CSS", demo:"https://faarsaa.vercel.app", github:"https://github.com/ecoders1", emoji:"🎵" },
  { id:3, title:"Online Exam System", category:"Web App", description:"Complete exam management system with Admin, Teacher, Student dashboards.", tags:"Next.js,MySQL,Node.js", demo:"", github:"https://github.com/ecoders1", emoji:"📝" },
  { id:4, title:"Short-Term Training System", category:"Web App", description:"Training management platform for Rift Valley University Ambo Campus.", tags:"PHP,MySQL,Bootstrap", demo:"", github:"https://github.com/ecoders1", emoji:"🏫" },
];

const EMPTY: Omit<Project,"id"> = { title:"", category:"Web App", description:"", tags:"", demo:"", github:"", emoji:"🚀" };

const inputStyle: React.CSSProperties = {
  width:"100%", background:"#1a1a1a", border:"1px solid #333",
  borderRadius:8, padding:"10px 14px", color:"#f0f0f5",
  fontSize:"0.875rem", outline:"none", boxSizing:"border-box",
};
const labelStyle: React.CSSProperties = { display:"block", fontSize:"0.8rem", color:"#888", marginBottom:5, fontWeight:500 };

const CATEGORIES = ["Web App","Mobile App","API","Tool","Design","Other"];
const EMOJIS = ["🚀","🎓","🎵","📝","🏫","💻","🔧","🎨","📊","🌐","🛠️","⚡"];

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState<Project | null>(null);
  const [form, setForm]           = useState<Omit<Project,"id">>(EMPTY);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [toast, setToast]         = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin_auth") !== "true") {
      router.replace("/admin"); return;
    }
    try {
      const saved = localStorage.getItem("adminProjects");
      setProjects(saved ? JSON.parse(saved) : DEFAULTS);
    } catch { setProjects(DEFAULTS); }
  }, [router]);

  const persist = (list: Project[]) => {
    setProjects(list);
    localStorage.setItem("adminProjects", JSON.stringify(list));
  };

  const openAdd = () => { setForm(EMPTY); setEditing(null); setShowModal(true); };
  const openEdit = (p: Project) => { const { id, ...rest } = p; setForm(rest); setEditing(p); setShowModal(true); };

  const saveProject = () => {
    if (!form.title.trim()) return;
    if (editing) {
      persist(projects.map(p => p.id === editing.id ? { ...form, id: editing.id } : p));
      showToast("Project updated!");
    } else {
      const id = Date.now();
      persist([...projects, { ...form, id }]);
      showToast("Project added!");
    }
    setShowModal(false);
  };

  const deleteProject = (id: number) => {
    persist(projects.filter(p => p.id !== id));
    setConfirmDelete(null);
    showToast("Project deleted.");
  };

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const setF = (k: keyof Omit<Project,"id">, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontSize:"1.4rem", fontWeight:700, color:"#fff", margin:0, letterSpacing:"-0.02em" }}>Projects</h1>
          <p style={{ color:"#555", fontSize:"0.82rem", margin:"3px 0 0" }}>{projects.length} project{projects.length !== 1 ? "s" : ""} total</p>
        </div>
        <button onClick={openAdd} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 18px", borderRadius:8, border:"none", background:"linear-gradient(135deg,#3b82f6,#8b5cf6)", color:"#fff", fontSize:"0.875rem", fontWeight:600, cursor:"pointer" }}>
          <Plus size={15} /> Add Project
        </button>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            style={{ position:"fixed", top:20, right:20, zIndex:999, background:"rgba(74,222,128,0.15)", border:"1px solid rgba(74,222,128,0.3)", borderRadius:10, padding:"12px 18px", display:"flex", alignItems:"center", gap:8, color:"#4ade80", fontSize:"0.875rem", fontWeight:500 }}>
            <CheckCircle size={15} /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px 20px", color:"#444" }}>
          <FolderOpen size={48} style={{ margin:"0 auto 12px", display:"block" }} />
          <p style={{ margin:0 }}>No projects yet. Add your first one!</p>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:16 }}>
          {projects.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.05 }}
              style={{ background:"#1a1a1a", border:"1px solid #222", borderRadius:14, padding:20, display:"flex", flexDirection:"column", gap:12 }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:"1.6rem" }}>{p.emoji}</span>
                  <div>
                    <h3 style={{ fontSize:"0.95rem", fontWeight:600, color:"#fff", margin:0, lineHeight:1.3 }}>{p.title}</h3>
                    <span style={{ fontSize:"0.72rem", background:"rgba(59,130,246,0.12)", color:"#60a5fa", borderRadius:20, padding:"2px 8px", display:"inline-block", marginTop:4 }}>{p.category}</span>
                  </div>
                </div>
                <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                  <button onClick={() => openEdit(p)} title="Edit" style={{ background:"rgba(59,130,246,0.1)", border:"none", borderRadius:7, padding:"6px 8px", cursor:"pointer", color:"#60a5fa", display:"flex" }}>
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => setConfirmDelete(p.id)} title="Delete" style={{ background:"rgba(248,113,113,0.1)", border:"none", borderRadius:7, padding:"6px 8px", cursor:"pointer", color:"#f87171", display:"flex" }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <p style={{ fontSize:"0.82rem", color:"#777", margin:0, lineHeight:1.5 }}>{p.description}</p>

              {p.tags && (
                <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                  {p.tags.split(",").map(t => (
                    <span key={t} style={{ fontSize:"0.72rem", background:"#222", border:"1px solid #2a2a2a", borderRadius:6, padding:"2px 7px", color:"#888" }}>{t.trim()}</span>
                  ))}
                </div>
              )}

              <div style={{ display:"flex", gap:8, marginTop:4 }}>
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer"
                    style={{ display:"flex", alignItems:"center", gap:5, fontSize:"0.78rem", color:"#60a5fa", textDecoration:"none", background:"rgba(59,130,246,0.08)", border:"1px solid rgba(59,130,246,0.2)", borderRadius:6, padding:"4px 10px" }}>
                    <ExternalLink size={11} /> Demo
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    style={{ display:"flex", alignItems:"center", gap:5, fontSize:"0.78rem", color:"#aaa", textDecoration:"none", background:"rgba(255,255,255,0.05)", border:"1px solid #2a2a2a", borderRadius:6, padding:"4px 10px" }}>
                    <Github size={11} /> GitHub
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={() => setShowModal(false)}
              style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:200 }} />
            <motion.div initial={{ opacity:0, scale:0.95, y:20 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.95 }}
              style={{
                position:"fixed", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
                zIndex:201, width:"min(560px,90vw)", maxHeight:"90vh", overflowY:"auto",
                background:"#1a1a1a", border:"1px solid #2a2a2a", borderRadius:16, padding:28,
              }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22 }}>
                <h2 style={{ fontSize:"1.1rem", fontWeight:700, color:"#fff", margin:0 }}>
                  {editing ? "Edit Project" : "Add New Project"}
                </h2>
                <button onClick={() => setShowModal(false)} style={{ background:"none", border:"none", color:"#666", cursor:"pointer", padding:4, display:"flex" }}><X size={18} /></button>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {/* Emoji picker */}
                <div>
                  <label style={labelStyle}>Emoji</label>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {EMOJIS.map(e => (
                      <button key={e} onClick={() => setF("emoji", e)} style={{
                        fontSize:"1.3rem", background: form.emoji===e ? "rgba(59,130,246,0.2)" : "#222",
                        border: form.emoji===e ? "1.5px solid rgba(59,130,246,0.5)" : "1px solid #333",
                        borderRadius:8, padding:"4px 8px", cursor:"pointer",
                      }}>{e}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Title *</label>
                  <input value={form.title} onChange={e => setF("title", e.target.value)} style={inputStyle} placeholder="Project title"
                    onFocus={e=>e.target.style.borderColor="#3b82f6"} onBlur={e=>e.target.style.borderColor="#333"}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Category</label>
                  <select value={form.category} onChange={e => setF("category", e.target.value)}
                    style={{ ...inputStyle, cursor:"pointer" }}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea value={form.description} onChange={e => setF("description", e.target.value)} rows={3}
                    style={{ ...inputStyle, resize:"vertical" }} placeholder="Short project description"
                    onFocus={e=>e.target.style.borderColor="#3b82f6"} onBlur={e=>e.target.style.borderColor="#333"}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Tags (comma separated)</label>
                  <input value={form.tags} onChange={e => setF("tags", e.target.value)} style={inputStyle} placeholder="React,TypeScript,Node.js"
                    onFocus={e=>e.target.style.borderColor="#3b82f6"} onBlur={e=>e.target.style.borderColor="#333"}
                  />
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <div>
                    <label style={labelStyle}>Demo URL</label>
                    <input value={form.demo} onChange={e => setF("demo", e.target.value)} style={inputStyle} placeholder="https://..."
                      onFocus={e=>e.target.style.borderColor="#3b82f6"} onBlur={e=>e.target.style.borderColor="#333"}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>GitHub URL</label>
                    <input value={form.github} onChange={e => setF("github", e.target.value)} style={inputStyle} placeholder="https://github.com/..."
                      onFocus={e=>e.target.style.borderColor="#3b82f6"} onBlur={e=>e.target.style.borderColor="#333"}
                    />
                  </div>
                </div>

                <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:4 }}>
                  <button onClick={() => setShowModal(false)} style={{ padding:"9px 18px", borderRadius:8, border:"1px solid #333", background:"transparent", color:"#888", cursor:"pointer", fontSize:"0.875rem" }}>
                    Cancel
                  </button>
                  <button onClick={saveProject} style={{ display:"flex", alignItems:"center", gap:7, padding:"9px 18px", borderRadius:8, border:"none", background:"linear-gradient(135deg,#3b82f6,#8b5cf6)", color:"#fff", cursor:"pointer", fontSize:"0.875rem", fontWeight:600 }}>
                    <Save size={14} /> {editing ? "Update" : "Add Project"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Confirm Delete */}
      <AnimatePresence>
        {confirmDelete !== null && (
          <>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={() => setConfirmDelete(null)}
              style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:200 }} />
            <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.95 }}
              style={{ position:"fixed", top:"50%", left:"50%", transform:"translate(-50%,-50%)", zIndex:201, width:320, background:"#1a1a1a", border:"1px solid #2a2a2a", borderRadius:14, padding:24 }}>
              <h3 style={{ color:"#fff", margin:"0 0 10px", fontSize:"1rem" }}>Delete Project?</h3>
              <p style={{ color:"#777", fontSize:"0.875rem", margin:"0 0 20px" }}>This action cannot be undone.</p>
              <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
                <button onClick={() => setConfirmDelete(null)} style={{ padding:"8px 16px", borderRadius:8, border:"1px solid #333", background:"transparent", color:"#888", cursor:"pointer", fontSize:"0.875rem" }}>Cancel</button>
                <button onClick={() => deleteProject(confirmDelete!)} style={{ padding:"8px 16px", borderRadius:8, border:"1px solid rgba(248,113,113,0.3)", background:"rgba(248,113,113,0.1)", color:"#f87171", cursor:"pointer", fontSize:"0.875rem", fontWeight:600, display:"flex", alignItems:"center", gap:6 }}>
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`input::placeholder,textarea::placeholder{color:#444} select option{background:#1a1a1a;color:#f0f0f5}`}</style>
    </div>
  );
}
