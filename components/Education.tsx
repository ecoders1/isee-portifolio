"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationCap, Award, Download, ExternalLink } from "lucide-react";

const education = [
  {
    degree: "Bachelor of Computer Science",
    institution: "Rift Valley University",
    campus: "Ambo Campus",
    period: "2020 – Present",
    description:
      "Studying Computer Science with focus on software engineering, algorithms, data structures, web development, and database management. Actively participating in coding clubs and hackathons.",
    gpa: "3.8/4.0",
    color: "#3b82f6",
  },
];

const certificates = [
  {
    title: "Full Stack Web Development",
    issuer: "Online Learning Platform",
    date: "2023",
    color: "#3b82f6",
    emoji: "🌐",
  },
  {
    title: "React & Next.js Mastery",
    issuer: "Online Certification",
    date: "2023",
    color: "#8b5cf6",
    emoji: "⚛️",
  },
  {
    title: "TypeScript Professional",
    issuer: "Microsoft Learn",
    date: "2024",
    color: "#3178c6",
    emoji: "📘",
  },
  {
    title: "Database Design & SQL",
    issuer: "Online Certification",
    date: "2023",
    color: "#10b981",
    emoji: "🗄️",
  },
  {
    title: "UI/UX Design Fundamentals",
    issuer: "Google Design Course",
    date: "2024",
    color: "#ec4899",
    emoji: "🎨",
  },
  {
    title: "Node.js Backend Development",
    issuer: "Online Certification",
    date: "2023",
    color: "#68a063",
    emoji: "🟢",
  },
];

export default function Education() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="education"
      className="section-padding"
      style={{ background: "rgba(10,10,25,0.8)" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-400 font-medium text-sm uppercase tracking-widest">
            Learning Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Education & <span className="gradient-text">Certificates</span>
          </h2>
          <div
            className="w-20 h-1 mx-auto mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg, #3b82f6, #8b5cf6)" }}
          />
        </motion.div>

        {/* Education card */}
        <div className="mb-16">
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
          >
            <GraduationCap className="text-blue-400" size={24} />
            <h3 className="text-xl font-bold text-white">Academic Education</h3>
          </motion.div>

          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              className="glass rounded-2xl p-8 card-hover"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    boxShadow: "0 0 30px rgba(59,130,246,0.3)",
                  }}
                >
                  <GraduationCap size={28} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {edu.degree}
                      </h4>
                      <p className="text-blue-400 font-medium">
                        {edu.institution}
                      </p>
                      <p className="text-gray-500 text-sm">{edu.campus}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className="text-sm px-4 py-1.5 rounded-full font-medium"
                        style={{
                          background: "rgba(59,130,246,0.15)",
                          color: "#93c5fd",
                          border: "1px solid rgba(59,130,246,0.3)",
                        }}
                      >
                        {edu.period}
                      </span>
                      <p className="text-green-400 text-sm font-medium mt-2">
                        GPA: {edu.gpa}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificates */}
        <div>
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Award className="text-purple-400" size={24} />
            <h3 className="text-xl font-bold text-white">Certifications</h3>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.title}
                className="glass rounded-xl p-5 card-hover group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{cert.emoji}</span>
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      background: `${cert.color}20`,
                      color: cert.color,
                      border: `1px solid ${cert.color}40`,
                    }}
                  >
                    {cert.date}
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm mb-1 group-hover:text-blue-400 transition-colors">
                  {cert.title}
                </h4>
                <p className="text-gray-500 text-xs mb-4">{cert.issuer}</p>
                <div className="flex gap-2">
                  <motion.button
                    className="flex-1 flex items-center justify-center gap-1 text-xs py-1.5 rounded-lg transition-all"
                    style={{
                      background: `${cert.color}15`,
                      color: cert.color,
                      border: `1px solid ${cert.color}30`,
                    }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <ExternalLink size={12} /> View
                  </motion.button>
                  <motion.button
                    className="flex-1 flex items-center justify-center gap-1 text-xs py-1.5 rounded-lg glass text-gray-400 hover:text-white transition-all"
                    whileHover={{ scale: 1.03 }}
                  >
                    <Download size={12} /> Download
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
