"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Abebe Girma",
    role: "Business Owner",
    location: "Addis Ababa, Ethiopia",
    text: "Isayas built an incredible e-commerce website for my business. The design is modern, loads fast, and my customers love it. Professional, on-time, and very communicative throughout the project.",
    stars: 5,
    avatar: "AG",
    color: "#3b82f6",
  },
  {
    name: "Sara Tesfaye",
    role: "University Student",
    location: "Ambo, Ethiopia",
    text: "The Exit Exam practice platform Isayas developed helped me tremendously in preparing for my university exit exams. It's well-organized, easy to use, and covers all departments.",
    stars: 5,
    avatar: "ST",
    color: "#8b5cf6",
  },
  {
    name: "Mulatu Bekele",
    role: "School Principal",
    location: "Ethiopia",
    text: "We hired Isayas to build our school management system. He delivered a comprehensive solution with student tracking, grade management, and reporting. Excellent work and great support.",
    stars: 5,
    avatar: "MB",
    color: "#ec4899",
  },
  {
    name: "Tigist Alemu",
    role: "Freelance Designer",
    location: "Ethiopia",
    text: "Isayas is an outstanding developer. He turned my Figma designs into pixel-perfect, responsive web pages. His attention to detail and technical skills are top-notch.",
    stars: 5,
    avatar: "TA",
    color: "#10b981",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const prev = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      className="section-padding"
      style={{ background: "rgba(10,10,25,0.8)" }}
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-400 font-medium text-sm uppercase tracking-widest">
            Client Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <div
            className="w-20 h-1 mx-auto mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg, #3b82f6, #8b5cf6)" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-3xl p-8 sm:p-12 relative"
            >
              {/* Quote icon */}
              <Quote
                className="absolute top-8 right-8 opacity-10"
                size={60}
                style={{ color: t.color }}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(t.stars)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill="#f59e0b"
                    className="text-yellow-400"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 text-lg leading-relaxed mb-8 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}80)`,
                    boxShadow: `0 0 20px ${t.color}40`,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-gray-400 text-sm">{t.role}</p>
                  <p className="text-gray-500 text-xs">{t.location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAutoPlay(false); setCurrent(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-8" : "w-2"
                  }`}
                  style={{
                    background:
                      i === current
                        ? "linear-gradient(90deg, #3b82f6, #8b5cf6)"
                        : "rgba(255,255,255,0.2)",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <motion.button
                onClick={prev}
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                onClick={next}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
