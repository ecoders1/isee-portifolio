"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { User, MapPin, GraduationCap, Heart } from "lucide-react";

const info = [
  { icon: User, label: "Name", value: "Isayas Fikadu" },
  { icon: MapPin, label: "Location", value: "Ethiopia" },
  { icon: GraduationCap, label: "Degree", value: "B.Sc. Computer Science" },
  { icon: Heart, label: "Passion", value: "Building impactful software" },
];

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-400 font-medium text-sm uppercase tracking-widest">
            Get To Know Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 mx-auto mt-4 rounded-full" style={{ background: "linear-gradient(90deg, #3b82f6, #8b5cf6)" }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image/Card */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              <div
                className="w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #1e3a5f, #2d1b5e)",
                  border: "1px solid rgba(59,130,246,0.3)",
                  boxShadow: "0 0 40px rgba(59,130,246,0.2)",
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-6">
                    <div
                      className="w-28 h-28 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl font-bold text-white"
                      style={{
                        background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                        boxShadow: "0 0 30px rgba(139,92,246,0.5)",
                      }}
                    >
                      IF
                    </div>
                    <p className="text-white font-semibold text-lg">Isayas Fikadu</p>
                    <p className="text-blue-400 text-sm mt-1">Full Stack Developer</p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-xl glass flex items-center justify-center text-3xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                💻
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl glass flex items-center justify-center text-2xl"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              >
                🚀
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Hello! I&apos;m{" "}
                <span className="gradient-text">Isayas Fikadu</span>
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                A passionate Full Stack Developer from Ethiopia. I enjoy
                creating beautiful, responsive, and high-performance websites
                and web applications using modern technologies.
              </p>
              <p className="text-gray-400 leading-relaxed">
                I love solving real-world problems through software development
                and continuously learning new technologies. Currently pursuing
                my Bachelor&apos;s in Computer Science at Rift Valley
                University, Ambo Campus.
              </p>
            </div>

            {/* Info grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              {info.map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  className="glass rounded-xl p-4 flex items-center gap-3 card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    }}
                  >
                    <Icon size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="text-sm font-medium text-white">{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contact"
              className="btn-primary self-start flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let&apos;s Work Together →
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
