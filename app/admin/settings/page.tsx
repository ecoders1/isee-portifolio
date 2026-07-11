"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Globe, Share2, AlertTriangle, Save, CheckCircle, Eye, EyeOff, AlertCircle, RotateCcw, Trash2 } from "lucide-react";

interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  heroTagline: string;
}
interface SocialSettings {
  github: string;
  telegram: string;
  email: string;
  phone: string;
}

const DEFAULT_SITE: SiteSettings = {
  siteTitle:       "Isayas Fikadu – Full Stack Developer",
  siteDescription: "Portfolio of Isayas Fikadu Bazabi, a Computer Science graduate and full-stack web developer based in Ambo, Ethiopia.",
  siteUrl:         "https://isayas.dev",
  heroTagline:     "Building the future, one line of code at a time.",
};

const DEFAULT_SOCIAL: SocialSettings = {
  github:   "https://github.com/ecoders1",
  telegram: "https://t.me/milkibn",
  email:    "iyasu4313@gmail.com",
  phone:    "+251943133184",
};

const inputStyle: React.CSSProperties = {
  width:"100%", background:"#1a1a1a", border:"1px solid #333",
  borderRadius:8, padding:"10px 14px", color:"#f0f0f5",
  fontSize:"0.875rem", outline:"none", boxSizing:"border-box",
};
const labelStyle: React.CSSProperties = { display:"block", fontSize:"0.8rem", color:"#888", marginBottom:5, fontWeight:500 };

const TABS = [
  { id:"account",  label:"Account",       icon: Lock },
  { id:"site",     label:"Site Settings", icon: Globe },
  { id:"social",   label:"Social Links",  icon: Share2 },
  { id:"danger",   label:"Danger Zone",   icon: AlertTriangle },
];

export default function SettingsPage() {
  const router = useRouter();
  const [tab, setTab]       = useState("account");
  const [toast, setToast]   = useState<{ msg:string; type:"ok"|"err" } | null>(null);

  // Account
  const [currentPw, setCurrentPw] = useState("");
  const [newPw,     setNewPw]     = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPws,   setShowPws]   = useState([false,false,false]);

  // Site
  const [site, setSite]     = useState<SiteSettings>(DEFAULT_SITE);
  // Social
  const [social, setSocial] = useState<SocialSettings>(DEFAULT_SOCIAL);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin_auth") !== "true") {
      router.replace("/admin"); return;
    }
    try { const s = localStorage.getItem("siteSettings");   if (s) setSite(JSON.parse(s));   } catch {}
    try { const s = localStorage.getItem("socialSettings"); if (s) setSocial(JSON.parse(s)); } catch {}
  }, [router]);

  const showT = (msg: string, type: "ok"|"err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const savePw = () => {
    const stored = localStorage.getItem("adminPassword") || "Ayyuu@4313@";
    if (!currentPw || !newPw || !confirmPw) { showT("All fields are required.", "err"); return; }
    if (currentPw !== stored) { showT("Current password is incorrect.", "err"); return; }
    if (newPw.length < 8)    { showT("New password must be at least 8 characters.", "err"); return; }
    if (newPw !== confirmPw) { showT("Passwords do not match.", "err"); return; }
    localStorage.setItem("adminPassword", newPw);
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
    showT("Password changed successfully!");
  };

  const saveSite = () => {
    localStorage.setItem("siteSettings", JSON.stringify(site));
    showT("Site settings saved!");
  };

  const saveSocial = () => {
    localStorage.setItem("socialSettings", JSON.stringify(social));
    showT("Social links saved!");
  };

  const clearAll = () => {
    ["adminProjects","adminMessages","profileData","siteSettings","socialSettings","adminPassword"].forEach(k => localStorage.removeItem(k));
    showT("All data cleared.");
  };

  const resetDefaults = () => {
    localStorage.setItem("siteSettings",   JSON.stringify(DEFAULT_SITE));
    localStorage.setItem("socialSettings", JSON.stringify(DEFAULT_SOCIAL));
    setSite(DEFAULT_SITE);
    setSocial(DEFAULT_SOCIAL);
    showT("Reset to defaults!");
  };

  const togglePwVis = (i: number) => setShowPws(s => s.map((v,idx) => idx===i ? !v : v));

  const cardStyle: React.CSSProperties = { background:"#1a1a1a", border:"1px solid #222", borderRadius:14, padding:24, marginBottom:0 };

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} style={{ marginBottom:24 }}>
        <h1 style={{ fontSize:"1.4rem", fontWeight:700, color:"#fff", margin:0, letterSpacing:"-0.02em" }}>Settings</h1>
        <p style={{ color:"#555", fontSize:"0.82rem", margin:"3px 0 0" }}>Manage your account and portfolio settings</p>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }}
            style={{
              position:"fixed", top:20, right:20, zIndex:999,
              background: toast.type==="ok" ? "rgba(74,222,128,0.15)" : "rgba(248,113,113,0.15)",
              border: toast.type==="ok" ? "1px solid rgba(74,222,128,0.3)" : "1px solid rgba(248,113,113,0.3)",
              borderRadius:10, padding:"12px 18px", display:"flex", alignItems:"center", gap:8,
              color: toast.type==="ok" ? "#4ade80" : "#f87171", fontSize:"0.875rem", fontWeight:500,
            }}>
            {toast.type==="ok" ? <CheckCircle size={15} /> : <AlertCircle size={15} />} {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div style={{ display:"flex", gap:4, marginBottom:24, background:"#141414", borderRadius:12, padding:4, border:"1px solid #222", flexWrap:"wrap" }}>
        {TABS.map(({ id, label, icon:Icon }) => (
          <button key={id} onClick={() => setTab(id)} style={{
            display:"flex", alignItems:"center", gap:7,
            padding:"8px 16px", borderRadius:9, border:"none", cursor:"pointer",
            background: tab===id ? "rgba(59,130,246,0.15)" : "transparent",
            color: tab===id ? "#60a5fa" : "#666",
            fontSize:"0.85rem", fontWeight: tab===id ? 600 : 400, transition:"all 0.15s",
          }}>
            <Icon size={14} />{label}
          </button>
        ))}
      </div>

      {/* ── Account Tab ── */}
      {tab === "account" && (
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} style={cardStyle}>
          <h2 style={{ fontSize:"1rem", fontWeight:600, color:"#fff", margin:"0 0 20px", display:"flex", alignItems:"center", gap:8 }}>
            <Lock size={15} style={{ color:"#3b82f6" }} /> Change Password
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:16, maxWidth:400 }}>
            {[
              ["Current Password", currentPw, setCurrentPw, 0],
              ["New Password",     newPw,     setNewPw,     1],
              ["Confirm New Password", confirmPw, setConfirmPw, 2],
            ].map(([label, val, setter, idx]) => (
              <div key={label as string}>
                <label style={labelStyle}>{label as string}</label>
                <div style={{ position:"relative" }}>
                  <input
                    type={showPws[idx as number] ? "text" : "password"}
                    value={val as string}
                    onChange={e => (setter as React.Dispatch<React.SetStateAction<string>>)(e.target.value)}
                    style={{ ...inputStyle, paddingRight:42 }}
                    onFocus={e=>e.target.style.borderColor="#3b82f6"}
                    onBlur={e=>e.target.style.borderColor="#333"}
                  />
                  <button type="button" onClick={() => togglePwVis(idx as number)}
                    style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#555", padding:2, display:"flex" }}>
                    {showPws[idx as number] ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            ))}
            <button onClick={savePw} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 20px", borderRadius:8, border:"none", background:"linear-gradient(135deg,#3b82f6,#8b5cf6)", color:"#fff", fontSize:"0.875rem", fontWeight:600, cursor:"pointer", alignSelf:"flex-start", marginTop:4 }}>
              <Save size={14} /> Update Password
            </button>
          </div>
        </motion.div>
      )}

      {/* ── Site Settings Tab ── */}
      {tab === "site" && (
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} style={cardStyle}>
          <h2 style={{ fontSize:"1rem", fontWeight:600, color:"#fff", margin:"0 0 20px", display:"flex", alignItems:"center", gap:8 }}>
            <Globe size={15} style={{ color:"#3b82f6" }} /> Site Settings
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:16, maxWidth:520 }}>
            {([
              ["siteTitle",       "Site Title",       "text"],
              ["siteUrl",         "Site URL",         "url"],
              ["heroTagline",     "Hero Tagline",     "text"],
            ] as [keyof SiteSettings, string, string][]).map(([k,l,t]) => (
              <div key={k}>
                <label style={labelStyle}>{l}</label>
                <input type={t} value={site[k]} onChange={e => setSite(s => ({ ...s, [k]: e.target.value }))} style={inputStyle}
                  onFocus={e=>e.target.style.borderColor="#3b82f6"} onBlur={e=>e.target.style.borderColor="#333"}
                />
              </div>
            ))}
            <div>
              <label style={labelStyle}>Site Description</label>
              <textarea value={site.siteDescription} onChange={e => setSite(s => ({ ...s, siteDescription: e.target.value }))} rows={3}
                style={{ ...inputStyle, resize:"vertical" }}
                onFocus={e=>e.target.style.borderColor="#3b82f6"} onBlur={e=>e.target.style.borderColor="#333"}
              />
            </div>
            <button onClick={saveSite} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 20px", borderRadius:8, border:"none", background:"linear-gradient(135deg,#3b82f6,#8b5cf6)", color:"#fff", fontSize:"0.875rem", fontWeight:600, cursor:"pointer", alignSelf:"flex-start" }}>
              <Save size={14} /> Save Site Settings
            </button>
          </div>
        </motion.div>
      )}

      {/* ── Social Links Tab ── */}
      {tab === "social" && (
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} style={cardStyle}>
          <h2 style={{ fontSize:"1rem", fontWeight:600, color:"#fff", margin:"0 0 20px", display:"flex", alignItems:"center", gap:8 }}>
            <Share2 size={15} style={{ color:"#3b82f6" }} /> Social Links
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:16, maxWidth:440 }}>
            {([
              ["github",   "GitHub URL"],
              ["telegram", "Telegram URL"],
              ["email",    "Email Address"],
              ["phone",    "Phone Number"],
            ] as [keyof SocialSettings, string][]).map(([k,l]) => (
              <div key={k}>
                <label style={labelStyle}>{l}</label>
                <input value={social[k]} onChange={e => setSocial(s => ({ ...s, [k]: e.target.value }))} style={inputStyle}
                  onFocus={e=>e.target.style.borderColor="#3b82f6"} onBlur={e=>e.target.style.borderColor="#333"}
                />
              </div>
            ))}
            <button onClick={saveSocial} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 20px", borderRadius:8, border:"none", background:"linear-gradient(135deg,#3b82f6,#8b5cf6)", color:"#fff", fontSize:"0.875rem", fontWeight:600, cursor:"pointer", alignSelf:"flex-start" }}>
              <Save size={14} /> Save Social Links
            </button>
          </div>
        </motion.div>
      )}

      {/* ── Danger Zone Tab ── */}
      {tab === "danger" && (
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} style={{ ...cardStyle, border:"1px solid rgba(248,113,113,0.25)" }}>
          <h2 style={{ fontSize:"1rem", fontWeight:600, color:"#f87171", margin:"0 0 6px", display:"flex", alignItems:"center", gap:8 }}>
            <AlertTriangle size={15} /> Danger Zone
          </h2>
          <p style={{ fontSize:"0.82rem", color:"#666", margin:"0 0 24px" }}>These actions are irreversible. Proceed with caution.</p>

          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {/* Reset defaults */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", background:"#222", borderRadius:12, border:"1px solid #2a2a2a", flexWrap:"wrap", gap:12 }}>
              <div>
                <p style={{ fontWeight:600, color:"#e0e0e0", margin:0, fontSize:"0.9rem" }}>Reset to Defaults</p>
                <p style={{ color:"#555", fontSize:"0.8rem", margin:"3px 0 0" }}>Restore site settings and social links to defaults.</p>
              </div>
              <button onClick={resetDefaults} style={{ display:"flex", alignItems:"center", gap:7, padding:"9px 18px", borderRadius:8, border:"1px solid rgba(59,130,246,0.3)", background:"rgba(59,130,246,0.08)", color:"#60a5fa", cursor:"pointer", fontSize:"0.85rem", fontWeight:500, flexShrink:0 }}>
                <RotateCcw size={13} /> Reset Defaults
              </button>
            </div>

            {/* Clear all data */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", background:"rgba(248,113,113,0.05)", borderRadius:12, border:"1px solid rgba(248,113,113,0.2)", flexWrap:"wrap", gap:12 }}>
              <div>
                <p style={{ fontWeight:600, color:"#f87171", margin:0, fontSize:"0.9rem" }}>Clear All Data</p>
                <p style={{ color:"#666", fontSize:"0.8rem", margin:"3px 0 0" }}>Permanently removes all projects, messages, profile, and settings from localStorage.</p>
              </div>
              <button onClick={clearAll} style={{ display:"flex", alignItems:"center", gap:7, padding:"9px 18px", borderRadius:8, border:"1px solid rgba(248,113,113,0.3)", background:"rgba(248,113,113,0.1)", color:"#f87171", cursor:"pointer", fontSize:"0.85rem", fontWeight:600, flexShrink:0 }}>
                <Trash2 size={13} /> Clear All Data
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <style>{`input::placeholder,textarea::placeholder{color:#444}`}</style>
    </div>
  );
}
