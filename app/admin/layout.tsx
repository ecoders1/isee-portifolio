"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, User, FolderOpen, Mail, Settings, LogOut, Menu, X } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
  { label: "Profile",   href: "/admin/profile",   icon: User },
  { label: "Projects",  href: "/admin/projects",  icon: FolderOpen },
  { label: "Messages",  href: "/admin/messages",  icon: Mail },
  { label: "Settings",  href: "/admin/settings",  icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const path     = usePathname();
  const [auth, setAuth]   = useState(false);
  const [open, setOpen]   = useState(false);

  useEffect(() => {
    if (path === "/admin") { setAuth(true); return; }
    if (typeof window !== "undefined" && sessionStorage.getItem("admin_auth") !== "true") {
      router.replace("/admin");
    } else {
      setAuth(true);
    }
  }, [path, router]);

  const logout = () => {
    if (typeof window !== "undefined") sessionStorage.removeItem("admin_auth");
    router.push("/admin");
  };

  const go = (href: string) => { router.push(href); setOpen(false); };

  if (!auth) return null;
  if (path === "/admin") return <>{children}</>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0f0f0f", fontFamily: "system-ui, -apple-system, sans-serif", color: "#f0f0f5" }}>

      {/* ── Desktop Sidebar ── */}
      <aside style={{
        width: 220,
        background: "#141414",
        borderRight: "1px solid #222",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0, left: 0, bottom: 0,
        zIndex: 50,
      }}
        className="admin-sidebar"
      >
        {/* Logo */}
        <div style={{ padding: "20px 18px 16px", borderBottom: "1px solid #222", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: "0.8rem", flexShrink: 0,
          }}>IF</div>
          <div>
            <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "#fff", lineHeight: 1, margin: 0 }}>Isayas.dev</p>
            <p style={{ fontSize: "0.7rem", color: "#555", margin: 0 }}>Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 3, overflowY: "auto" }}>
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = path.startsWith(href);
            return (
              <button
                key={href}
                onClick={() => go(href)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 12px", borderRadius: 9,
                  border: "none", cursor: "pointer",
                  background: active ? "rgba(59,130,246,0.15)" : "transparent",
                  color: active ? "#60a5fa" : "#888",
                  fontSize: "0.875rem", fontWeight: active ? 600 : 400,
                  textAlign: "left", transition: "all 0.15s",
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#ccc"; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#888"; } }}
              >
                <Icon size={16} />{label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: "12px 10px", borderTop: "1px solid #222" }}>
          <button
            onClick={logout}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "9px 12px", borderRadius: 9,
              border: "none", cursor: "pointer",
              background: "rgba(248,113,113,0.1)",
              color: "#f87171", fontSize: "0.875rem", fontWeight: 500,
            }}
          >
            <LogOut size={16} />Sign Out
          </button>
        </div>
      </aside>

      {/* ── Mobile Top Bar ── */}
      <div style={{
        display: "none",
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "#141414", borderBottom: "1px solid #222",
        padding: "12px 16px",
        alignItems: "center", justifyContent: "space-between",
      }} className="admin-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.75rem" }}>IF</div>
          <span style={{ fontWeight: 700, color: "#fff", fontSize: "0.9rem" }}>Isayas.dev</span>
        </div>
        <button onClick={() => setOpen(o => !o)} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", padding: 4 }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
            transition={{ type: "tween", duration: 0.22 }}
            style={{
              position: "fixed", top: 0, left: 0, bottom: 0, width: 240, zIndex: 200,
              background: "#141414", borderRight: "1px solid #222",
              display: "flex", flexDirection: "column",
              paddingTop: 60,
            }}
          >
            <nav style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 3 }}>
              {navItems.map(({ label, href, icon: Icon }) => {
                const active = path.startsWith(href);
                return (
                  <button key={href} onClick={() => go(href)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 9, border: "none", cursor: "pointer", background: active ? "rgba(59,130,246,0.15)" : "transparent", color: active ? "#60a5fa" : "#aaa", fontSize: "0.9rem", fontWeight: active ? 600 : 400, textAlign: "left" }}>
                    <Icon size={16} />{label}
                  </button>
                );
              })}
            </nav>
            <div style={{ padding: "12px 10px", borderTop: "1px solid #222" }}>
              <button onClick={logout} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 9, border: "none", cursor: "pointer", background: "rgba(248,113,113,0.1)", color: "#f87171", fontSize: "0.875rem", fontWeight: 500 }}>
                <LogOut size={16} />Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile drawer */}
      {open && (
        <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 150, background: "rgba(0,0,0,0.5)" }} />
      )}

      {/* ── Main Content ── */}
      <main style={{ marginLeft: 220, flex: 1, padding: "28px", minHeight: "100vh", background: "#0f0f0f" }} className="admin-main">
        {children}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar { display: none !important; }
          .admin-topbar  { display: flex !important; }
          .admin-main    { margin-left: 0 !important; padding: 80px 16px 24px !important; }
        }
      `}</style>
    </div>
  );
}
