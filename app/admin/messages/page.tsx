"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Trash2, CheckCheck, Search, X, Inbox } from "lucide-react";

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

const DEFAULTS: Message[] = [
  { id:1, name:"Abebe Girma",   email:"abebe@gmail.com",  subject:"Website Development",     message:"Hi Isayas, I need a business website for my company. Can you help me? I am based in Addis Ababa.", date:"2025-07-10", read:false },
  { id:2, name:"Sara Tesfaye",  email:"sara@gmail.com",   subject:"Exit Exam App Feedback",   message:"The exit exam app is really helpful for my studies. Thank you so much for building it!", date:"2025-07-09", read:true },
  { id:3, name:"Mulatu Bekele", email:"mulatu@gmail.com", subject:"School Management System", message:"We need a complete school management system for our school. Please send me a quote.", date:"2025-07-08", read:false },
  { id:4, name:"Tigist Alemu",  email:"tigist@gmail.com", subject:"Collaboration Opportunity", message:"I am a UI designer and would like to collaborate on projects. Are you interested?", date:"2025-07-07", read:true },
  { id:5, name:"Dawit Haile",   email:"dawit@gmail.com",  subject:"Portfolio Website",        message:"I need a personal portfolio website similar to yours. What is your rate?", date:"2025-07-06", read:false },
];

export default function MessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [search, setSearch]     = useState("");
  const [confirmDel, setConfirmDel] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin_auth") !== "true") {
      router.replace("/admin"); return;
    }
    try {
      const saved = localStorage.getItem("adminMessages");
      const data  = saved ? JSON.parse(saved) : DEFAULTS;
      setMessages(data);
    } catch { setMessages(DEFAULTS); }
  }, [router]);

  const persist = (list: Message[]) => {
    setMessages(list);
    localStorage.setItem("adminMessages", JSON.stringify(list));
  };

  const markRead = (id: number) => {
    const updated = messages.map(m => m.id === id ? { ...m, read: true } : m);
    persist(updated);
    if (selected?.id === id) setSelected({ ...selected, read: true });
  };

  const deleteMsg = (id: number) => {
    persist(messages.filter(m => m.id !== id));
    if (selected?.id === id) setSelected(null);
    setConfirmDel(null);
  };

  const filtered = messages.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.subject.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  const unread = messages.filter(m => !m.read).length;

  const openMsg = (m: Message) => {
    setSelected(m);
    if (!m.read) markRead(m.id);
  };

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} style={{ marginBottom:20 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <div>
            <h1 style={{ fontSize:"1.4rem", fontWeight:700, color:"#fff", margin:0, letterSpacing:"-0.02em" }}>Messages</h1>
            <p style={{ color:"#555", fontSize:"0.82rem", margin:"3px 0 0" }}>
              {messages.length} total · <span style={{ color:"#f87171" }}>{unread} unread</span>
            </p>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(74,222,128,0.08)", border:"1px solid rgba(74,222,128,0.2)", borderRadius:20, padding:"5px 14px" }}>
              <Inbox size={13} style={{ color:"#4ade80" }} />
              <span style={{ fontSize:"0.8rem", color:"#4ade80" }}>{messages.length - unread} read</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(248,113,113,0.08)", border:"1px solid rgba(248,113,113,0.2)", borderRadius:20, padding:"5px 14px" }}>
              <Mail size={13} style={{ color:"#f87171" }} />
              <span style={{ fontSize:"0.8rem", color:"#f87171" }}>{unread} unread</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.08 }}
        style={{ position:"relative", marginBottom:18 }}>
        <Search size={15} style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"#555" }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email, or subject…"
          style={{ width:"100%", background:"#1a1a1a", border:"1px solid #282828", borderRadius:10, padding:"10px 14px 10px 40px", color:"#f0f0f5", fontSize:"0.875rem", outline:"none", boxSizing:"border-box" }}
          onFocus={e => e.target.style.borderColor="#3b82f6"}
          onBlur={e => e.target.style.borderColor="#282828"}
        />
        {search && (
          <button onClick={() => setSearch("")} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#555", padding:2, display:"flex" }}>
            <X size={14} />
          </button>
        )}
      </motion.div>

      {/* Layout: list + detail */}
      <div style={{ display:"grid", gridTemplateColumns: selected ? "1fr 1.2fr" : "1fr", gap:16 }}>

        {/* Message list */}
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"50px 20px", color:"#444" }}>
              <Mail size={40} style={{ margin:"0 auto 12px", display:"block" }} />
              <p style={{ margin:0 }}>No messages found.</p>
            </div>
          ) : (
            filtered.map((m, i) => (
              <motion.div key={m.id}
                initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.04 }}
                onClick={() => openMsg(m)}
                style={{
                  display:"flex", alignItems:"flex-start", gap:12, padding:"14px 16px",
                  borderRadius:12, cursor:"pointer", transition:"all 0.15s",
                  background: selected?.id === m.id ? "rgba(59,130,246,0.1)" : "#1a1a1a",
                  border: selected?.id === m.id ? "1px solid rgba(59,130,246,0.3)" : "1px solid #222",
                }}
                onMouseEnter={e => { if (selected?.id !== m.id) e.currentTarget.style.background="#202020"; }}
                onMouseLeave={e => { if (selected?.id !== m.id) e.currentTarget.style.background="#1a1a1a"; }}
              >
                {/* Avatar */}
                <div style={{ width:38, height:38, borderRadius:"50%", background:"linear-gradient(135deg,#3b82f6,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:"0.9rem", flexShrink:0 }}>
                  {m.name[0]}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8 }}>
                    <span style={{ fontSize:"0.875rem", fontWeight: m.read ? 400 : 700, color: m.read ? "#aaa" : "#fff", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                      {m.name}
                    </span>
                    <span style={{ fontSize:"0.72rem", color:"#444", flexShrink:0 }}>{m.date.slice(5)}</span>
                  </div>
                  <p style={{ fontSize:"0.82rem", fontWeight: m.read ? 400 : 600, color: m.read ? "#666" : "#ccc", margin:"2px 0 0", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                    {m.subject}
                  </p>
                  <p style={{ fontSize:"0.78rem", color:"#444", margin:"3px 0 0", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                    {m.message.slice(0, 60)}…
                  </p>
                </div>
                {!m.read && <div style={{ width:8, height:8, borderRadius:"50%", background:"#3b82f6", flexShrink:0, marginTop:5 }} />}
              </motion.div>
            ))
          )}
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selected && (
            <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:20 }}
              style={{ background:"#1a1a1a", border:"1px solid #222", borderRadius:14, padding:24, display:"flex", flexDirection:"column", gap:16, alignSelf:"flex-start", position:"sticky", top:20 }}>

              {/* Detail header */}
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10 }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:44, height:44, borderRadius:"50%", background:"linear-gradient(135deg,#3b82f6,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:"1rem", flexShrink:0 }}>
                    {selected.name[0]}
                  </div>
                  <div>
                    <p style={{ fontWeight:700, color:"#fff", margin:0, fontSize:"0.95rem" }}>{selected.name}</p>
                    <p style={{ fontSize:"0.78rem", color:"#555", margin:"2px 0 0" }}>{selected.email}</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background:"none", border:"none", color:"#555", cursor:"pointer", padding:4, display:"flex" }}>
                  <X size={16} />
                </button>
              </div>

              <div>
                <p style={{ fontSize:"0.72rem", color:"#444", margin:"0 0 4px", fontWeight:500, textTransform:"uppercase", letterSpacing:"0.05em" }}>Subject</p>
                <p style={{ fontSize:"0.95rem", fontWeight:600, color:"#e0e0e0", margin:0 }}>{selected.subject}</p>
              </div>

              <div>
                <p style={{ fontSize:"0.72rem", color:"#444", margin:"0 0 8px", fontWeight:500, textTransform:"uppercase", letterSpacing:"0.05em" }}>Message</p>
                <p style={{ fontSize:"0.875rem", color:"#aaa", margin:0, lineHeight:1.7, background:"#222", borderRadius:10, padding:"12px 14px" }}>
                  {selected.message}
                </p>
              </div>

              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:4 }}>
                <span style={{ fontSize:"0.78rem", color:"#444" }}>Received: {selected.date}</span>
                {!selected.read
                  ? <span style={{ fontSize:"0.72rem", background:"rgba(248,113,113,0.12)", color:"#f87171", borderRadius:20, padding:"3px 10px" }}>Unread</span>
                  : <span style={{ fontSize:"0.72rem", background:"rgba(74,222,128,0.1)", color:"#4ade80", borderRadius:20, padding:"3px 10px" }}>Read</span>
                }
              </div>

              <div style={{ display:"flex", gap:10, borderTop:"1px solid #222", paddingTop:14 }}>
                {!selected.read && (
                  <button onClick={() => markRead(selected.id)} style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 16px", borderRadius:8, border:"1px solid rgba(74,222,128,0.3)", background:"rgba(74,222,128,0.08)", color:"#4ade80", cursor:"pointer", fontSize:"0.82rem", fontWeight:500 }}>
                    <CheckCheck size={13} /> Mark Read
                  </button>
                )}
                <button onClick={() => setConfirmDel(selected.id)} style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 16px", borderRadius:8, border:"1px solid rgba(248,113,113,0.3)", background:"rgba(248,113,113,0.08)", color:"#f87171", cursor:"pointer", fontSize:"0.82rem", fontWeight:500, marginLeft:"auto" }}>
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Confirm Delete */}
      <AnimatePresence>
        {confirmDel !== null && (
          <>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={() => setConfirmDel(null)}
              style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:200 }} />
            <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.95 }}
              style={{ position:"fixed", top:"50%", left:"50%", transform:"translate(-50%,-50%)", zIndex:201, width:300, background:"#1a1a1a", border:"1px solid #2a2a2a", borderRadius:14, padding:24 }}>
              <h3 style={{ color:"#fff", margin:"0 0 10px", fontSize:"1rem" }}>Delete Message?</h3>
              <p style={{ color:"#777", fontSize:"0.875rem", margin:"0 0 20px" }}>This cannot be undone.</p>
              <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
                <button onClick={() => setConfirmDel(null)} style={{ padding:"8px 16px", borderRadius:8, border:"1px solid #333", background:"transparent", color:"#888", cursor:"pointer", fontSize:"0.875rem" }}>Cancel</button>
                <button onClick={() => deleteMsg(confirmDel!)} style={{ padding:"8px 16px", borderRadius:8, border:"1px solid rgba(248,113,113,0.3)", background:"rgba(248,113,113,0.1)", color:"#f87171", cursor:"pointer", fontSize:"0.875rem", fontWeight:600, display:"flex", alignItems:"center", gap:6 }}>
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`input::placeholder{color:#444}`}</style>
    </div>
  );
}
