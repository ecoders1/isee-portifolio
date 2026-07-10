"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, Code, Layout, Database, Globe } from "lucide-react";

const experiences = [
  {
    icon: Code,
    title: "Full Stack Web Development",
    period: "2022 – Present",
    description:
      "Building complete web applications from front to back using React, Next.js, Node.js, and various databases. Delivering full-stack solutions for clients and personal projects.",
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
    color: "#3b82f6",
  },
  {
    icon: Layout,
    title: "Responsive Website Design",
    period: "2021 – Present",
    description:
      "Designing and developing mobile-first, fully responsive websites that look great on all devices. Specializing in modern UI with Tailwind CSS and CSS animations.",
    tags: ["HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
    color: "#8b5cf6",
  },
  {
    icon: Briefcase,
    title: "UI/UX Design",
    period: "2022 – Present",
    description:
      "Creating intuitive user interfaces and user experience designs using Figma. Focusing on accessibility, usability, and modern design principles.",
    tags: ["Figma", "Prototyping", "Wireframing", "Design Systems"],
    color: "#ec4899",
  },
  {
    icon: Database,
    title: "Database Design",
    period: "2022 – Present",
    description:
      "Designing and implementing scalable database architectures. Working with relational (MySQL, PostgreSQL) and NoSQL (MongoDB, Firebase) databases.",
    tags: ["MySQL", "PostgreSQL", "MongoDB", "Firebase"],
    color: "#10b981",
  },
  {
    icon: Globe,
    title: "REST API Development",
    period: "2022 – Present",
    description:
      "Designing and building RESTful APIs with proper authentication, authorization, and documentation. Using Express.js and Next.js API routes.",
    tags: ["REST API", "Express.js", "Next.js", "Postman"],
    color: "#f59e0b",
  },
];

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-400 font-medium text-sm uppercase tracking-widest">
            What I Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            My <span className="gradient-text">Experience</span>
          </h2>
          <div
            className="w-20 h-1 mx-auto mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg, #3b82f6, #8b5cf6)" }}
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent" />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={exp.title}
                className={`relative flex items-start mb-12 ${
                  isLeft
                    ? "sm:flex-row"
                    : "sm:flex-row-reverse"
                } flex-row pl-12 sm:pl-0 gap-6`}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                {/* Dot on timeline */}
                <div
                  className="absolute left-0 sm:left-1/2 top-3 w-9 h-9 -ml-0 sm:-ml-[18px] rounded-full flex items-center justify-center z-10 flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${exp.color}, ${exp.color}80)`,
                    boxShadow: `0 0 20px ${exp.color}50`,
                  }}
                >
                  <exp.icon size={16} className="text-white" />
                </div>

                {/* Content card */}
                <div
                  className={`glass rounded-2xl p-6 card-hover w-full ${
                    isLeft ? "sm:mr-8 sm:text-right" : "sm:ml-8 sm:text-left"
                  }`}
                  style={{ maxWidth: "calc(50% - 2rem)" }}
                >
                  <div
                    className={`hidden sm:block`}
                  />
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full mb-3 inline-block"
                    style={{
                      background: `${exp.color}20`,
                      color: exp.color,
                      border: `1px solid ${exp.color}40`,
                    }}
                  >
                    {exp.period}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <div
                    className={`flex flex-wrap gap-2 ${
                      isLeft ? "sm:justify-end" : "sm:justify-start"
                    }`}
                  >
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-md"
                        style={{
                          background: "rgba(59,130,246,0.1)",
                          color: "#93c5fd",
                          border: "1px solid rgba(59,130,246,0.2)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Spacer for other side */}
                <div className="hidden sm:block w-full" style={{ maxWidth: "calc(50% - 2rem)" }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
