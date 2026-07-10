"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skillCategories = [
  {
    title: "Frontend",
    color: "#3b82f6",
    skills: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 92 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "React", level: 88 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Bootstrap", level: 88 },
    ],
  },
  {
    title: "Backend",
    color: "#8b5cf6",
    skills: [
      { name: "Node.js", level: 82 },
      { name: "Express.js", level: 80 },
      { name: "PHP", level: 78 },
    ],
  },
  {
    title: "Database",
    color: "#ec4899",
    skills: [
      { name: "MySQL", level: 85 },
      { name: "Supabase", level: 83 },
      { name: "Firebase", level: 80 },
      { name: "Neon PostgreSQL", level: 78 },
      { name: "MongoDB", level: 75 },
    ],
  },
  {
    title: "Tools",
    color: "#10b981",
    skills: [
      { name: "Git", level: 88 },
      { name: "GitHub", level: 90 },
      { name: "Vercel", level: 87 },
      { name: "VS Code", level: 95 },
      { name: "Postman", level: 82 },
      { name: "Figma", level: 75 },
    ],
  },
];

interface SkillBarProps {
  name: string;
  level: number;
  color: string;
  inView: boolean;
  delay: number;
}

function SkillBar({ name, level, color, inView, delay }: SkillBarProps) {
  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay }}
    >
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-300">{name}</span>
        <span className="text-sm font-medium" style={{ color }}>
          {level}%
        </span>
      </div>
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}aa)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="skills"
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
            My Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <div
            className="w-20 h-1 mx-auto mt-4 rounded-full"
            style={{
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
            }}
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              className="glass rounded-2xl p-6 card-hover"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIdx * 0.15 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-2 h-8 rounded-full"
                  style={{ background: cat.color }}
                />
                <h3 className="text-lg font-bold text-white">{cat.title}</h3>
              </div>
              {cat.skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={cat.color}
                  inView={inView}
                  delay={catIdx * 0.15 + i * 0.08}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Tech stack icons row */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          {[
            "React",
            "Next.js",
            "TypeScript",
            "Node.js",
            "Tailwind",
            "Supabase",
            "Firebase",
            "PostgreSQL",
            "MongoDB",
            "Git",
          ].map((tech) => (
            <motion.span
              key={tech}
              className="glass px-4 py-2 rounded-full text-sm text-gray-300 hover:text-white hover:border-blue-500/50 transition-all cursor-default"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
