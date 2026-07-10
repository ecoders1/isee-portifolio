"use client";
import { motion } from "framer-motion";
import { Github, Mail, Heart, ArrowUp, Code2, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/ecoders1",
    icon: Github,
    color: "#fff",
  },
  {
    label: "Telegram",
    href: "https://t.me/milkibn",
    svgPath:
      "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.68 7.94c-.12.57-.45.71-.91.44l-2.52-1.86-1.22 1.17c-.13.14-.25.25-.52.25l.18-2.59 4.7-4.25c.2-.18-.04-.28-.32-.1L7.46 14.6l-2.46-.77c-.54-.17-.55-.54.11-.8l9.62-3.71c.44-.16.83.11.91.48z",
    color: "#229ED9",
  },
  {
    label: "Email",
    href: "mailto:iyasu4313@gmail.com",
    icon: Mail,
    color: "#3b82f6",
  },
];

export default function Footer() {
  return (
    <footer
      className="relative pt-16 pb-8 px-4"
      style={{
        background: "rgba(5,5,15,0.98)",
        borderTop: "1px solid rgba(59,130,246,0.1)",
      }}
    >
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
              {socialLinks.map(({ label, href, icon: Icon, svgPath, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.15, y: -2 }}
                >
                  {svgPath ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={color}>
                      <path d={svgPath} />
                    </svg>
                  ) : Icon ? (
                    <Icon size={16} color={color} />
                  ) : null}
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
                href="mailto:iyasu4313@gmail.com"
                className="text-gray-500 hover:text-blue-400 transition-colors text-sm flex items-center gap-2"
              >
                <Mail size={14} />
                iyasu4313@gmail.com
              </a>
              <a
                href="tel:+251943133184"
                className="text-gray-500 hover:text-blue-400 transition-colors text-sm flex items-center gap-2"
              >
                <Phone size={14} />
                +251 94 313 3184
              </a>
              <a
                href="https://t.me/milkibn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-400 transition-colors text-sm flex items-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.68 7.94c-.12.57-.45.71-.91.44l-2.52-1.86-1.22 1.17c-.13.14-.25.25-.52.25l.18-2.59 4.7-4.25c.2-.18-.04-.28-.32-.1L7.46 14.6l-2.46-.77c-.54-.17-.55-.54.11-.8l9.62-3.71c.44-.16.83.11.91.48z" />
                </svg>
                @milkibn
              </a>
              <a
                href="https://github.com/ecoders1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-400 transition-colors text-sm flex items-center gap-2"
              >
                <Github size={14} />
                github.com/ecoders1
              </a>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm">Available for new projects</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-gray-600 text-sm flex items-center gap-1 flex-wrap justify-center">
            © 2026 Isayas Fikadu. Designed with{" "}
            <Heart size={12} className="text-red-500 fill-red-500 mx-1" />
            using Next.js and Tailwind CSS.
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white"
            style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
