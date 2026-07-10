"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Send, Mail } from "lucide-react";

const socials = [
  { icon: Github, href: "https://github.com/isayasfikadu", label: "GitHub", color: "#fff" },
  { icon: Linkedin, href: "https://linkedin.com/in/isayasfikadu", label: "LinkedIn", color: "#0a66c2" },
  { icon: Send, href: "https://t.me/isayasfikadu", label: "Telegram", color: "#229ED9" },
  { icon: Mail, href: "mailto:isayasfikadu@gmail.com", label: "Email", color: "#3b82f6" },
];

export default function FloatingSocials() {
  return (
    <div className="fixed left-4 bottom-1/3 z-40 hidden xl:flex flex-col gap-3">
      {socials.map(({ icon: Icon, href, label, color }, i) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white transition-all group relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 + i * 0.1 }}
          whileHover={{ scale: 1.15, x: 4 }}
        >
          <Icon size={16} />
          {/* Tooltip */}
          <span
            className="absolute left-12 px-2 py-1 rounded text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ background: color || "#3b82f6" }}
          >
            {label}
          </span>
        </motion.a>
      ))}

      {/* Line below */}
      <motion.div
        className="w-px h-16 mx-auto"
        style={{ background: "linear-gradient(180deg, rgba(59,130,246,0.5), transparent)" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      />
    </div>
  );
}
