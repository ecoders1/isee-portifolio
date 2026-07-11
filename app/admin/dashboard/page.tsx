"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FolderOpen, Mail, Code2, Eye,
  BarChart3, Plus, MessageSquare, User, Settings,
  ArrowRight, Clock,
} from "lucide-react";

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

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

const DEFAULT_PROJECTS: Project[] = [
  { id:1, title:"Ethiopia Exit Exam App", category:"Web App", description:"Platform for Ethiopian university students to practice Exit Exams online.", tags:"Next.js,Supabase,TypeScript", demo:"https://ethio2.vercel.app", github:"https://github.com/ecoders1", emoji:"🎓" },
  { id:2, title:"Apostolic Songs – Faarsaa", category:"Web App", description:"Afaan Oromo gospel songs app with audio player and offline support.", tags:"React,Firebase,Tailwind CSS", demo:"https://faarsaa.vercel.app", github:"https://github.com/ecoders1", emoji:"🎵" },
  { id:3, title:"Online Exam System", category:"Web App", description:"Complete exam management system with Admin, Teacher, Student dashboards.", tags:"Next.js,MySQL,Node.js", demo:"", github:"https://github.com/ecoders1", emoji:"📝" },
  { id:4, title:"Short-Term Training System", category:"Web App", description:"Training management platform for Rift Valley University Ambo Campus.", tags:"PHP,MySQL,Bootstrap", demo:"", github:"https://github.com/ecoders1", emoji:"🏫" },
];

const DEFAULT_MESSAGES: Message[] = [
  { id:1, name:"Abebe Girma", email:"abebe@gmail.com", subject:"Website Development", message:"Hi Isayas, I need a business website for my company. Can you help me? I am based in Addis Ababa.", date:"2025-07-10", read:false },
  { id:2, name:"Sara Tesfaye", email:"sara@gmail.com", subject:"Exit Exam App Feedback", message:"The exit exam app is really helpful for my studies. Thank you so much for building it!", date:"2025-07-09", read:true },
  { id:3, name:"Mulatu Bekele", email:"mulatu@gmail.com", subject:"School Management System", message:"We need a complete school management system for our school. Please send me a quote.", date:"2025-07-08", read:false },
  { id:4, name:"Tigist Alemu", email:"tigist@gmail.com", subject:"Collaboration Opportunity", message:"I am a UI designer and would like to collaborate on projects. Are you interested?", date:"2025-07-07", read:true },
  { id:5, name:"Dawit Haile", email:"dawit@gmail.com", subject:"Portfolio Website", message:"I need a personal portfolio website similar to yours. What is your rate?", date:"2025-07-06", read:false },
];

const card: React.CSSProperties = { background:"#1a1a1a", border:"1px solid #222", borderRadius:14, padding:20 };

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [now, setNow] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin_auth") !== "true") {
      router.replace("/admin"); return;
    }
    // Load data
    try {
      const p = localStorage.getItem("adminProjects");
      setProjects(p ? JSON.parse(p) : DEFAULT_PROJECTS);
    } catch { setProjects(DEFAULT_PROJECTS); }
    try {
      const m = localStorage.getItem("adminMessages");
      setMessages(m ? JSON.parse(m) : DEFAULT_MESSAGES);
    } catch { setMessages(DEFAULT_MESSAGES); }

    // Date
    const d = new Date();
    setNow(d.toLocaleDateString("en-US", { weekday:"long", year:"numeric", month:"long", day:"numeric" }));
  }, [router]);

  const unread = messages.filter(m => !m.read).length;

  const stats = [
    { label:"Projects",  value: projects.length, icon: FolderOpen, color:"#3b82f6", bg:"rgba(59,130,246,0.12)" },
    { label:"Messages",  value: messages.length,  icon: Mail,       color:"#8b5cf6", bg:"rgba(139,92,246,0.12)" },
    { label:"Skills",    value:"15+",             icon: Code2,      color:"#ec4899", bg:"rgba(236,72,153,0.12)" },
    { label:"Views",     value:"1.2k+",           icon: Eye,        color:"#10b981", bg:"rgba(16,185,129,0.12)" },
  ];

  const quickActions = [
    { label:"Add Project",    icon: Plus,           action: () => router.push("/admin/projects") },
    { label:"View Messages",  icon: MessageSquare,  action: () => router.push("/admin/messages") },
    { label:"Edit Profile",   icon: User,           action: () => router.push("/admin/profile") },
    { label:"Settings",       icon: Settings,       action: () => router.push("/admin/settings") },
  ];

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} style={{ marginBottom:28 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div>
            <h1 style={{ fontSize:"1.5rem", fontWeight:700, color:"#fff", margin:0, letterSpacing:"-0.02em" }}>
              Welcome back, Isayas 👋
            </h1>
            <p style={{ color:"#666", fontSize:"0.85rem", margin:"4px 0 0", display:"flex", alignItems:"center", gap:6 }}>
              <Clock size={13} />{now}
            </p>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:38, height:38, borderRadius:"50%", background:"linear-gradient(135deg,#3b82f6,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:"0.85rem" }}>IF</div>
            <div>
              <p style={{ fontSize:"0.85rem", fontWeight:600, color:"#fff", margin:0 }}>Isayas Fikadu</p>
              <p style={{ fontSize:"0.72rem", color:"#555", margin:0 }}>Administrator</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:14, marginBottom:24 }}>
        {stats.map(({ label, value, icon:Icon, color, bg }, i) => (
          <motion.div key={label} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.07 }} style={card}>
            <div style={{ width:40, height:40, borderRadius:10, background:bg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14, color }}>
              <Icon size={18} />
            </div>
            <p style={{ fontSize:"1.6rem", fontWeight:700, color:"#fff", margin:0, lineHeight:1 }}>{value}</p>
            <p style={{ fontSize:"0.8rem", color:"#666", margin:"4px 0 0" }}>{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.25 }} style={{ ...card, marginBottom:24 }}>
        <h2 style={{ fontSize:"0.95rem", fontWeight:600, color:"#fff", margin:"0 0 14px", display:"flex", alignItems:"center", gap:8 }}>
          <BarChart3 size={15} style={{ color:"#3b82f6" }} /> Quick Actions
        </h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))", gap:10 }}>
          {quickActions.map(({ label, icon:Icon, action }) => (
            <button key={label} onClick={action} style={{
              display:"flex", alignItems:"center", gap:8,
              padding:"10px 14px", borderRadius:9,
              border:"1px solid #2a2a2a", background:"#222",
              color:"#ccc", fontSize:"0.85rem", cursor:"pointer",
              transition:"all 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(59,130,246,0.12)"; e.currentTarget.style.borderColor="rgba(59,130,246,0.3)"; e.currentTarget.style.color="#60a5fa"; }}
              onMouseLeave={e => { e.currentTarget.style.background="#222"; e.currentTarget.style.borderColor="#2a2a2a"; e.currentTarget.style.color="#ccc"; }}
            >
              <Icon size={14} />{label}
            </button>
          ))}
        </div>
      </motion.div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
        {/* Recent Projects */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }} style={card}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
            <h2 style={{ fontSize:"0.95rem", fontWeight:600, color:"#fff", margin:0, display:"flex", alignItems:"center", gap:8 }}>
              <FolderOpen size={15} style={{ color:"#3b82f6" }} /> Recent Projects
            </h2>
            <button onClick={() => router.push("/admin/projects")} style={{ background:"none", border:"none", color:"#3b82f6", cursor:"pointer", fontSize:"0.8rem", display:"flex", alignItems:"center", gap:4 }}>
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {projects.slice(0, 3).map(p => (
              <div key={p.id} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"10px 12px", borderRadius:9, background:"#222" }}>
                <span style={{ fontSize:"1.2rem", flexShrink:0 }}>{p.emoji}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:"0.85rem", fontWeight:600, color:"#e0e0e0", margin:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.title}</p>
                  <p style={{ fontSize:"0.75rem", color:"#555", margin:"2px 0 0" }}>{p.category}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Messages */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }} style={card}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
            <h2 style={{ fontSize:"0.95rem", fontWeight:600, color:"#fff", margin:0, display:"flex", alignItems:"center", gap:8 }}>
              <Mail size={15} style={{ color:"#8b5cf6" }} /> Recent Messages
              {unread > 0 && <span style={{ background:"rgba(248,113,113,0.2)", color:"#f87171", borderRadius:20, padding:"1px 7px", fontSize:"0.7rem", fontWeight:600 }}>{unread} unread</span>}
            </h2>
            <button onClick={() => router.push("/admin/messages")} style={{ background:"none", border:"none", color:"#8b5cf6", cursor:"pointer", fontSize:"0.8rem", display:"flex", alignItems:"center", gap:4 }}>
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {messages.slice(0, 3).map(m => (
              <div key={m.id} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"10px 12px", borderRadius:9, background:"#222" }}>
                <div style={{ width:30, height:30, borderRadius:"50%", background:"linear-gradient(135deg,#3b82f6,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:"0.75rem", fontWeight:700, flexShrink:0 }}>
                  {m.name[0]}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <p style={{ fontSize:"0.85rem", fontWeight:600, color:"#e0e0e0", margin:0 }}>{m.name}</p>
                    {!m.read && <span style={{ width:6, height:6, borderRadius:"50%", background:"#3b82f6", display:"inline-block", flexShrink:0 }} />}
                  </div>
                  <p style={{ fontSize:"0.75rem", color:"#555", margin:"2px 0 0", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{m.subject}</p>
                </div>
                <span style={{ fontSize:"0.7rem", color:"#444", flexShrink:0 }}>{m.date.slice(5)}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
