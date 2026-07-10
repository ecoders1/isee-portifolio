"use client";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const stats = [
  { value: 20, suffix: "+", label: "Projects Completed", emoji: "🚀", color: "#3b82f6" },
  { value: 15, suffix: "+", label: "Happy Clients", emoji: "😊", color: "#8b5cf6" },
  { value: 15, suffix: "+", label: "Technologies", emoji: "💻", color: "#ec4899" },
  { value: 4, suffix: "+", label: "Years of Learning", emoji: "📚", color: "#10b981" },
];

export default function Stats() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="py-16 px-4"
      style={{
        background:
          "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.08) 100%)",
        borderTop: "1px solid rgba(59,130,246,0.1)",
        borderBottom: "1px solid rgba(59,130,246,0.1)",
      }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center group"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3"
              style={{
                background: `${stat.color}15`,
                border: `1px solid ${stat.color}30`,
              }}
            >
              {stat.emoji}
            </div>
            <div
              className="text-4xl font-extrabold mb-1"
              style={{ color: stat.color }}
            >
              {inView ? (
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  suffix={stat.suffix}
                />
              ) : (
                "0"
              )}
            </div>
            <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
