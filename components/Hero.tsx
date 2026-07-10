"use client";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  Download,
  Mail,
  Github,
  Send,
  ArrowDown,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #3b82f6, transparent)",
            top: "-10%",
            left: "-10%",
          }}
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #8b5cf6, transparent)",
            bottom: "10%",
            right: "-5%",
          }}
          animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full opacity-15 blur-3xl"
          style={{
            background: "radial-gradient(circle, #ec4899, transparent)",
            top: "50%",
            left: "50%",
          }}
          animate={{ x: [0, 20, -20, 0], y: [0, -20, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <motion.div
          className="flex flex-col gap-6 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-blue-400 self-center lg:self-start"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for work
          </motion.div>

          {/* Name */}
          <div>
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text">Isayas Fikadu</span>
            </motion.h1>

            <motion.div
              className="mt-3 text-xl sm:text-2xl font-semibold text-gray-300 h-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <TypeAnimation
                sequence={[
                  "Full Stack Developer",
                  2000,
                  "CS Student @ Rift Valley Univ.",
                  2000,
                  "UI/UX Enthusiast",
                  2000,
                  "Problem Solver",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-blue-400"
              />
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            I build modern websites, web applications, and mobile-friendly
            digital solutions with{" "}
            <span className="text-blue-400 font-medium">beautiful UI</span> and{" "}
            <span className="text-purple-400 font-medium">
              powerful backend technologies
            </span>
            .
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.a
              href="/cv.pdf"
              download
              className="btn-primary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} />
              Download CV
            </motion.a>
            <motion.a
              href="#contact"
              className="btn-outline flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={16} />
              Contact Me
            </motion.a>
            <motion.a
              href="mailto:isayasfikadu@gmail.com"
              className="btn-outline flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={16} />
              Hire Me
            </motion.a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            className="flex gap-3 justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {[
              { icon: Github, href: "https://github.com/ecoders1", label: "GitHub" },
              {
                icon: Send,
                href: "https://t.me/milkibn",
                label: "Telegram",
              },
              {
                icon: Mail,
                href: "mailto:iyasu4313@gmail.com",
                label: "Email",
              },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center rounded-xl glass text-gray-400 hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Profile Image */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            {/* Outer glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
                padding: "3px",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full rounded-full bg-[#0a0a0f]" />
            </motion.div>

            {/* Profile image container */}
            <motion.div
              className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden animate-pulse-glow"
              style={{
                border: "3px solid transparent",
                background:
                  "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%) border-box",
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Real profile photo */}
              <img
                src="/isayas.jpg"
                alt="Isayas Fikadu – Full Stack Developer"
                className="w-full h-full object-cover object-top"
              />
            </motion.div>

            {/* Floating tech badges */}
            {[
              { label: "React", color: "#61dafb", pos: "top-0 -right-4" },
              { label: "Next.js", color: "#fff", pos: "top-1/2 -right-8" },
              { label: "Node.js", color: "#68a063", pos: "bottom-4 -right-4" },
              { label: "TypeScript", color: "#3178c6", pos: "top-4 -left-8" },
            ].map(({ label, color, pos }) => (
              <motion.div
                key={label}
                className={`absolute ${pos} glass rounded-full px-3 py-1 text-xs font-medium`}
                style={{ color }}
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3 + Math.random(),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              >
                {label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs">Scroll Down</span>
        <ArrowDown size={16} />
      </motion.a>
    </section>
  );
}
