"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("loading");
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section style={{ maxWidth: 780, margin: "0 auto", padding: "60px 24px" }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: 52 }}>
        <p className="section-tag" style={{ marginBottom: 10 }}>Connect with me</p>
        <h2 className="section-title" style={{ marginBottom: 16 }}>
          Get in touch<span style={{ color: "var(--accent)" }}>.</span>
        </h2>
        <p className="section-sub" style={{ margin: "0 auto" }}>
          I&apos;d love to hear from you! If you have any questions, project ideas or just want
          to say hello, use the form below.
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        ref={formRef}
        onSubmit={send}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <input className="field" name="user_name"  required placeholder="Enter your name" />
          <input className="field" name="user_email" required type="email" placeholder="Enter your email" />
        </div>

        <input className="field" name="subject" required placeholder="Subject" />

        <textarea
          className="field"
          name="message"
          required
          rows={7}
          placeholder="Enter your message"
          style={{ resize: "vertical" }}
        />

        {status === "success" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ display: "flex", alignItems: "center", gap: 8, color: "#16a34a", fontSize: "0.9rem" }}>
            <CheckCircle size={16} /> Message sent! I&apos;ll get back to you soon.
          </motion.div>
        )}
        {status === "error" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ display: "flex", alignItems: "center", gap: 8, color: "#dc2626", fontSize: "0.9rem" }}>
            <AlertCircle size={16} /> Failed to send. Email me at iyasu4313@gmail.com
          </motion.div>
        )}

        <div style={{ textAlign: "center", marginTop: 4 }}>
          <button type="submit" disabled={status === "loading"} className="btn-dark" style={{ minWidth: 180, justifyContent: "center" }}>
            {status === "loading"
              ? <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} /> Sending...</>
              : <>Submit now <ArrowRight size={15} /></>
            }
          </button>
        </div>
      </motion.form>

      {/* Contact info strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        style={{
          marginTop: 48,
          padding: "24px",
          borderRadius: 16,
          border: "1.5px solid var(--border)",
          background: "var(--bg2)",
          display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center",
        }}
      >
        {[
          { label: "Email",    value: "iyasu4313@gmail.com",     href: "mailto:iyasu4313@gmail.com" },
          { label: "Phone",    value: "+251 94 313 3184",         href: "tel:+251943133184" },
          { label: "Telegram", value: "@milkibn",                 href: "https://t.me/milkibn" },
          { label: "GitHub",   value: "github.com/ecoders1",      href: "https://github.com/ecoders1" },
          { label: "Location", value: "Ambo, Ethiopia",           href: "#" },
        ].map(({ label, value, href }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fg3)", marginBottom: 4 }}>{label}</p>
            <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
              style={{ fontSize: "0.88rem", color: "var(--fg)", fontWeight: 500, textDecoration: "none" }}>
              {value}
            </a>
          </div>
        ))}
      </motion.div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
