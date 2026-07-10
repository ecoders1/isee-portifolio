"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Globe } from "lucide-react";

const projects = [
  {
    title: "Ethiopia Exit Exam Web App",
    description:
      "A platform that helps Ethiopian university students practice Exit Exams online with categorized departments and exam questions. Features real-time scoring, progress tracking, and detailed analytics.",
    tags: ["Next.js", "Supabase", "Vercel", "TypeScript"],
    category: "Web App",
    color: "#3b82f6",
    emoji: "🎓",
    links: { demo: "https://ethio2.vercel.app", github: "https://github.com/ecoders1" },
  },
  {
    title: "Apostolic Songs – Afaan Oromo",
    description:
      "Offline and online Afaan Oromo gospel songs application with search, playlist, download, and audio player features. Supports both online streaming and offline mode.",
    tags: ["React", "Firebase", "Audio API", "Tailwind CSS"],
    category: "Web App",
    color: "#8b5cf6",
    emoji: "🎵",
    links: { demo: "https://faarsaa.vercel.app", github: "https://github.com/ecoders1" },
  },
  {
    title: "Online Exam System",
    description:
      "Complete online examination management system for schools with Admin, Teacher, and Student dashboards. Includes automated grading, analytics, and report generation.",
    tags: ["Next.js", "MySQL", "Node.js", "TypeScript"],
    category: "Web App",
    color: "#ec4899",
    emoji: "📝",
    links: { demo: "#", github: "https://github.com/ecoders1" },
  },
  {
    title: "Web-Based Short-Term Training System",
    description:
      "Training management system for Rift Valley University Ambo Campus with course management, certificate generation, trainer and trainee management.",
    tags: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    category: "Web App",
    color: "#10b981",
    emoji: "🏫",
    links: { demo: "#", github: "https://github.com/ecoders1" },
  },
];

const categories = ["All", "Web App", "Mobile App"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="section-padding"
      style={{ background: "rgba(10,10,25,0.8)" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-400 font-medium text-sm uppercase tracking-widest">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div
            className="w-20 h-1 mx-auto mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg, #3b82f6, #8b5cf6)" }}
          />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="flex justify-center gap-3 mb-10 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat ? "text-white" : "glass text-gray-400 hover:text-white"
              }`}
              style={
                filter === cat
                  ? { background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }
                  : {}
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div layout className="grid sm:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden card-hover group"
              >
                {/* Card header */}
                <div
                  className="h-48 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}20, ${project.color}08)`,
                    borderBottom: `1px solid ${project.color}20`,
                  }}
                >
                  <motion.span
                    className="text-7xl"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {project.emoji}
                  </motion.span>

                  <span
                    className="absolute top-4 right-4 text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      background: `${project.color}25`,
                      color: project.color,
                      border: `1px solid ${project.color}40`,
                    }}
                  >
                    {project.category}
                  </span>

                  {/* Hover overlay with live links */}
                  <div
                    className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(0,0,0,0.75)" }}
                  >
                    {project.links.demo !== "#" && (
                      <motion.a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
                        style={{ background: project.color }}
                        whileHover={{ scale: 1.15 }}
                        aria-label="Live Demo"
                      >
                        <Globe size={18} />
                      </motion.a>
                    )}
                    <motion.a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full glass flex items-center justify-center text-white"
                      whileHover={{ scale: 1.15 }}
                      aria-label="GitHub"
                    >
                      <Github size={18} />
                    </motion.a>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-md"
                        style={{
                          background: `${project.color}15`,
                          color: project.color,
                          border: `1px solid ${project.color}30`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.links.demo !== "#" ? (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    ) : (
                      <span className="flex items-center gap-1 text-sm text-gray-600 cursor-not-allowed">
                        <ExternalLink size={14} /> Coming Soon
                      </span>
                    )}
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <Github size={14} /> Source Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
