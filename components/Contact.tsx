"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "isayasfikadu@gmail.com",
    href: "mailto:isayasfikadu@gmail.com",
    color: "#3b82f6",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+251 91 234 5678",
    href: "tel:+251912345678",
    color: "#8b5cf6",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Ethiopia",
    href: "#",
    color: "#ec4899",
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/isayasfikadu",
    color: "#fff",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/isayasfikadu",
    color: "#0a66c2",
  },
  {
    icon: Send,
    label: "Telegram",
    href: "https://t.me/isayasfikadu",
    color: "#229ED9",
  },
];

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
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
    <section id="contact" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-400 font-medium text-sm uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Contact <span className="gradient-text">Me</span>
          </h2>
          <div
            className="w-20 h-1 mx-auto mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg, #3b82f6, #8b5cf6)" }}
          />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Have a project in mind? Ready to collaborate? Feel free to reach
            out. I&apos;ll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Info */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
              <motion.a
                key={label}
                href={href}
                className="glass rounded-2xl p-5 flex items-center gap-4 card-hover group"
                whileHover={{ x: 5 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${color}20`,
                    border: `1px solid ${color}40`,
                  }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">{label}</p>
                  <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                    {value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Social links */}
            <div className="glass rounded-2xl p-5">
              <p className="text-sm text-gray-400 mb-4 font-medium">
                Connect with me
              </p>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, label, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    style={{ "--hover-color": color } as React.CSSProperties}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 flex flex-col gap-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-400 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    placeholder="Your full name"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-400 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    placeholder="your@email.com"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400 font-medium">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="What is this about?"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400 font-medium">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all resize-none"
                />
              </div>

              {/* Status messages */}
              {status === "success" && (
                <motion.div
                  className="flex items-center gap-2 text-green-400 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle size={16} />
                  Message sent successfully! I&apos;ll get back to you soon.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  className="flex items-center gap-2 text-red-400 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={16} />
                  Failed to send. Please try emailing me directly.
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
                whileHover={status !== "loading" ? { scale: 1.02 } : {}}
                whileTap={status !== "loading" ? { scale: 0.98 } : {}}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
