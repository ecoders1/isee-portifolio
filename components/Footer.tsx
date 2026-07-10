"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Send, Mail, Heart, ArrowUp, Code2 } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/isayasfikadu", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/isayasfikadu", label: "LinkedIn" },
  { icon: Send, href: "https://t.me/isayasfikadu", label: "Telegram" },
  { icon: Mail, href: "mailto:isayasfikadu@gmail.com", label: "Email" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative pt-16 pb-8 px-4"
      style={{
        background: "rgba(5,5,15,0.98)",
        borderTop: "1px solid rgba(59,130,246,0.1)",
      }}
    >
      {/* Background blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 opacity-10 blur-3xl rounded-full"
          style={{ background: "linear-gradient(180deg, #3b82f6, #8b5cf6)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
              >
                <Code2 size={18} className="text-white" />
              </div>
              <span className="font-bold text-white text-lg">
                Isayas<span className="gradient-text">.dev</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Full Stack Developer from Ethiopia, building beautiful and
              powerful web applications.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-500 hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-500 hover:text-blue-400 transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:isayasfikadu@gmail.com"
                className="text-gray-500 hover:text-blue-400 transition-colors text-sm flex items-center gap-2"
              >
                <Mail size={14} />
                isayasfikadu@gmail.com
              </a>
              <p className="text-gray-500 text-sm flex items-center gap-2">
                <span>📍</span>
                Ethiopia
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm">
                  Available for new projects
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-gray-600 text-sm flex items-center gap-1">
            © 2026 Isayas Fikadu. Designed with{" "}
            <Heart size={12} className="text-red-500 fill-red-500" /> using
            Next.js and Tailwind CSS.
          </p>
          <motion.button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white"
            style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
