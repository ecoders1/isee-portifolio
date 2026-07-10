"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Globe,
  Building2,
  GraduationCap,
  ClipboardList,
  ShoppingCart,
  LayoutTemplate,
  Paintbrush,
  Code2,
  Database,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Portfolio Website",
    description:
      "Beautiful, professional portfolio websites that showcase your work and attract clients or employers.",
    color: "#3b82f6",
  },
  {
    icon: Building2,
    title: "Business Website",
    description:
      "Modern, conversion-focused business websites with SEO optimization and responsive design.",
    color: "#8b5cf6",
  },
  {
    icon: GraduationCap,
    title: "School Management System",
    description:
      "Complete school management solutions with student, teacher, and admin dashboards.",
    color: "#ec4899",
  },
  {
    icon: ClipboardList,
    title: "Online Exam System",
    description:
      "Robust online examination platforms with automated grading and comprehensive reporting.",
    color: "#10b981",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Website",
    description:
      "Full-featured online stores with payment integration, inventory management, and analytics.",
    color: "#f59e0b",
  },
  {
    icon: LayoutTemplate,
    title: "Landing Page",
    description:
      "High-converting landing pages designed to capture leads and drive conversions.",
    color: "#06b6d4",
  },
  {
    icon: Paintbrush,
    title: "UI/UX Design",
    description:
      "Intuitive, user-centered designs that enhance user experience and engagement.",
    color: "#f97316",
  },
  {
    icon: Code2,
    title: "API Development",
    description:
      "Scalable, secure RESTful APIs with proper documentation and authentication.",
    color: "#84cc16",
  },
  {
    icon: Database,
    title: "Database Design",
    description:
      "Efficient, normalized database architectures for optimal performance and scalability.",
    color: "#a855f7",
  },
];

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="services" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-400 font-medium text-sm uppercase tracking-widest">
            What I Offer
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            My <span className="gradient-text">Services</span>
          </h2>
          <div
            className="w-20 h-1 mx-auto mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg, #3b82f6, #8b5cf6)" }}
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="glass rounded-2xl p-6 card-hover group cursor-default"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{
                  background: `${service.color}20`,
                  border: `1px solid ${service.color}40`,
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <service.icon size={24} style={{ color: service.color }} />
              </motion.div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>

              <motion.div
                className="mt-4 h-1 rounded-full"
                style={{ background: `${service.color}40` }}
                whileHover={{ background: service.color }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-gray-400 mb-6 text-lg">
            Have a project in mind? Let&apos;s build something amazing together.
          </p>
          <motion.a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start a Project →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
