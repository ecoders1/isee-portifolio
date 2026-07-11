"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LogOut, User, Briefcase, Mail, Code2,
  GraduationCap, BarChart3, ExternalLink,
  Settings, Home, FolderOpen,
} from "lucide-react";

const stats = [
  { label: "Projects",    value: "20+", icon: FolderOpen,    color: "#3b82f6" },
  { label: "Skills",      value: "15+", icon: Code2,         color: "#8b5cf6" },
  { label: "Experience",  value: "3+ yrs", icon: Briefcase,  color: "#ec4899" },
  { label: "CGPA",        value: "3.89", icon: GraduationCap, color: "#10b981" },
];

const quickLinks = [
  { label: "Portfolio Home",    href: "/",                          icon: Home },
  { label: "About Section",     href: "/#about",                    icon: User },
  { label: "Projects Section",  href: "/#work",                     icon: FolderOpen },
  { label: "Contact Section",   href: "/#contact",                  icon: Mail },
  { label: "Exit Exam App",     href: "https://ethio2.vercel.app",  icon: ExternalLink },
  { label: "Faarsaa App",       href: "https://faarsaa.vercel.app", icon: ExternalLink },
];

const profile = [
  { label: "Full Name",   value: "Isayas Fikadu Bazabi" },
  { label: "Email",       value: "iyasu4313@gmail.com" },
  { label: "Phone",       value: "+251 94 313 3184" },
  { label: "Telegram",    value: "@milkibn" },
  { label: "GitHub",      value: "github.com/ecoders1" },
  { label: "Location",    value: "Ambo, Ethiopia" },
  { label: "Degree",      value: "B.Sc. Computer Science" },
  { label: "University",  value: "Rift Valley University – Ambo Campus" },
  { label: "Graduated",   value: "June 2025 (2017 E.C)" },
  { label: "CGPA",        value: "3.89 / 4.00" },
];

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState("Admin");

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") !== "true") {
      router.replace("/admin");
    }
  }, [router]);

  const logout = () => {
    sessionStorage.removeItem("admin_auth");
    router.push("/admin");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      fontFamily: "system-ui, sans-serif",
      color: "#f0f0f5",
    }}>

      {/* Sidebar */}
      <aside style={{
        position: "fixed", top: 0, left: 0, bottom: 0, width: 220,
        background: "rgba(255,255,255,0.03)",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        display: "flex", flexDirection: "column",
        padding: "24px 0",
        zIndex: 50,
      }}>
        {/* Logo */}
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 700, fontSize: "0.85rem",
            }}>IF</div>
            <div>
              <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}>Isayas.dev</p>
              <p style={{ fontSize: "0.72rem", color: "#666" }}>Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            { icon: BarChart3, label: "Dashboard",  active: true },
            { icon: User,      label: "Profile",    active: false },
            { icon: FolderOpen,label: "Projects",   active: false },
            { icon: Mail,      label: "Messages",   active: false },
            { icon: Settings,  label: "Settings",   active: false },
          ].map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px", borderRadius: 10,
                border: "none", cursor: "pointer", textAlign: "left",
                background: active ? "rgba(59,130,246,0.15)" : "none",
                color: active ? "#60a5fa" : "#888",
                fontSize: "0.875rem", fontWeight: active ? 600 : 400,
                transition: "all 0.15s",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#ccc"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = "none"; e.currentTarget.style.color = active ? "#60a5fa" : "#888"; }}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <button
            onClick={logout}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "9px 12px", borderRadius: 10,
              border: "none", cursor: "pointer",
              background: "rgba(248,113,113,0.1)",
              color: "#f87171", fontSize: "0.875rem", fontWeight: 500,
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: 220, padding: "32px", minHeight: "100vh" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36 }}
        >
          <div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#fff", marginBottom: 4, letterSpacing: "-0.02em" }}>
              Welcome back, {user} 👋
            </h1>
            <p style={{ color: "#666", fontSize: "0.875rem" }}>Here&apos;s your portfolio overview</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 700, fontSize: "0.85rem",
            }}>IF</div>
            <div>
              <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff" }}>Isayas Fikadu</p>
              <p style={{ fontSize: "0.72rem", color: "#666" }}>Administrator</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
          {stats.map(({ label, value, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16, padding: "20px 20px",
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: `${color}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 14, color,
              }}>
                <Icon size={18} />
              </div>
              <p style={{ fontSize: "1.6rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>{value}</p>
              <p style={{ fontSize: "0.82rem", color: "#666", marginTop: 4 }}>{label}</p>
            </motion.div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

          {/* Profile info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, padding: "24px",
            }}
          >
            <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#fff", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
              <User size={16} style={{ color: "#60a5fa" }} /> Profile Information
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {profile.map(({ label, value }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ fontSize: "0.8rem", color: "#666", flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: "0.82rem", color: "#ccc", textAlign: "right" }}>{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, padding: "24px",
            }}
          >
            <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#fff", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
              <ExternalLink size={16} style={{ color: "#8b5cf6" }} /> Quick Links
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {quickLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 14px", borderRadius: 10,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "#bbb", textDecoration: "none",
                    fontSize: "0.875rem", transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(59,130,246,0.1)"; e.currentTarget.style.color = "#60a5fa"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#bbb"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
                >
                  <Icon size={15} /> {label}
                </a>
              ))}
            </div>

            {/* Logout button */}
            <button
              onClick={logout}
              style={{
                marginTop: 20, width: "100%",
                padding: "10px", borderRadius: 10,
                border: "1px solid rgba(248,113,113,0.3)",
                background: "rgba(248,113,113,0.08)",
                color: "#f87171", fontSize: "0.875rem",
                fontWeight: 500, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              <LogOut size={15} /> Sign Out
            </button>
          </motion.div>
        </div>
      </main>

      {/* Responsive for mobile sidebar */}
      <style>{`
        @media (max-width: 768px) {
          aside { display: none !important; }
          main { margin-left: 0 !important; padding: 20px !important; }
        }
      `}</style>
    </div>
  );
}
