"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, AlertCircle, Loader2, Mail, Phone, MapPin, Send } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [fields, setFields] = useState({ name: "", email: "", subject: "", message: "" });

  const update = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields(f => ({ ...f, [k]: e.target.value }));

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const serviceId  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const emailJSReady =
      serviceId  && serviceId  !== "your_service_id" &&
      templateId && templateId !== "your_template_id" &&
      publicKey  && publicKey  !== "your_public_key";

    if (emailJSReady && formRef.current) {
      try {
        const emailjs = await import("@emailjs/browser");
        await emailjs.sendForm(serviceId!, templateId!, formRef.current, publicKey!);
        setStatus("success");
        setFields({ name: "", email: "", subject: "", message: "" });
        formRef.current.reset();
        return;
      } catch {
        // fall through to mailto fallback
      }
    }

    // ── Mailto fallback — always works ──
    const body = `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`;
    const mailto = `mailto:iyasu4313@gmail.com?subject=${encodeURIComponent(fields.subject || "Portfolio Contact")}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatus("success");
    setTimeout(() => setFields({ name: "", email: "", subject: "", message: "" }), 500);
  };

  return (
    <section style={{ maxWidth: 860, margin: "0 auto", padding: "60px 24px" }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: 52 }}>
        <p className="section-tag" style={{ marginBottom: 10 }}>Connect with me</p>
        <h2 className="section-title" style={{ marginBottom: 16 }}>
          Get in touch<span style={{ color: "var(--accent)" }}>.</span>
        </h2>
        <p className="section-sub" style={{ margin: "0 auto" }}>
          I&apos;d love to hear from you! Fill in the form and hit Submit — your email
          client will open with the message ready to send.
        </p>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 28, alignItems: "start" }}>

        {/* Left — contact info */}
        <motion.div
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          {[
            { icon: Mail,    label: "Email",    value: "iyasu4313@gmail.com",   href: "mailto:iyasu4313@gmail.com" },
            { icon: Phone,   label: "Phone",    value: "+251 94 313 3184",       href: "tel:+251943133184" },
            { icon: MapPin,  label: "Location", value: "Ambo, Ethiopia",         href: "#" },
            {
              icon: Send,
              label: "Telegram",
              value: "@milkibn",
              href: "https://t.me/milkibn",
            },
          ].map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 16px", borderRadius: 12,
                border: "1.5px solid var(--border)",
                background: "var(--card)",
                textDecoration: "none",
                transition: "border-color 0.2s, transform 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateX(4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateX(0)"; }}
            >
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: "var(--bg2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--accent)",
              }}>
                <Icon size={17} />
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", color: "var(--fg3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>{label}</p>
                <p style={{ fontSize: "0.875rem", color: "var(--fg)", fontWeight: 500 }}>{value}</p>
              </div>
            </a>
          ))}

          {/* GitHub card */}
          <a
            href="https://github.com/ecoders1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "14px 16px", borderRadius: 12,
              border: "1.5px solid var(--border)",
              background: "var(--card)",
              textDecoration: "none",
              transition: "border-color 0.2s, transform 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateX(4px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateX(0)"; }}
          >
            <div style={{
              width: 38, height: 38, borderRadius: 10, flexShrink: 0,
              background: "var(--bg2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--fg)",
            }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: "0.72rem", color: "var(--fg3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>GitHub</p>
              <p style={{ fontSize: "0.875rem", color: "var(--fg)", fontWeight: 500 }}>github.com/ecoders1</p>
            </div>
          </a>

          {/* Availability badge */}
          <div style={{
            padding: "12px 16px", borderRadius: 12,
            border: "1.5px solid #22c55e40",
            background: "#22c55e0d",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", flexShrink: 0, boxShadow: "0 0 8px #22c55e" }} />
            <div>
              <p style={{ fontSize: "0.82rem", color: "#22c55e", fontWeight: 600 }}>Available for work</p>
              <p style={{ fontSize: "0.75rem", color: "var(--fg3)" }}>Open to freelance & full-time</p>
            </div>
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.form
          ref={formRef}
          onSubmit={send}
          initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
          style={{
            display: "flex", flexDirection: "column", gap: 14,
            padding: "28px", borderRadius: 16,
            border: "1.5px solid var(--border)",
            background: "var(--card)",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", color: "var(--fg2)", marginBottom: 6, fontWeight: 500 }}>Full Name *</label>
              <input
                className="field"
                name="user_name"
                required
                placeholder="Your name"
                value={fields.name}
                onChange={update("name")}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.78rem", color: "var(--fg2)", marginBottom: 6, fontWeight: 500 }}>Email *</label>
              <input
                className="field"
                name="user_email"
                type="email"
                required
                placeholder="your@email.com"
                value={fields.email}
                onChange={update("email")}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.78rem", color: "var(--fg2)", marginBottom: 6, fontWeight: 500 }}>Subject *</label>
            <input
              className="field"
              name="subject"
              required
              placeholder="What is this about?"
              value={fields.subject}
              onChange={update("subject")}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.78rem", color: "var(--fg2)", marginBottom: 6, fontWeight: 500 }}>Message *</label>
            <textarea
              className="field"
              name="message"
              required
              rows={6}
              placeholder="Tell me about your project or idea..."
              value={fields.message}
              onChange={update("message")}
              style={{ resize: "vertical" }}
            />
          </div>

          {/* Status */}
          {status === "success" && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: "flex", alignItems: "center", gap: 8, color: "#16a34a", fontSize: "0.875rem", background: "#16a34a12", padding: "10px 14px", borderRadius: 8 }}>
              <CheckCircle size={15} />
              Email client opened! Your message is ready to send to iyasu4313@gmail.com
            </motion.div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "12px",
              borderRadius: 10,
              border: "none",
              background: status === "loading" ? "var(--fg3)" : "var(--fg)",
              color: "var(--bg)",
              fontSize: "0.95rem", fontWeight: 600,
              cursor: status === "loading" ? "not-allowed" : "pointer",
              transition: "opacity 0.2s, transform 0.15s",
            }}
            onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
          >
            {status === "loading"
              ? <><Loader2 size={15} style={{ animation: "spin 0.8s linear infinite" }} /> Opening email...</>
              : <>Submit now <ArrowRight size={15} /></>
            }
          </button>

          <p style={{ fontSize: "0.75rem", color: "var(--fg3)", textAlign: "center" }}>
            This will open your email client with the message pre-filled.
          </p>
        </motion.form>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          form > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
