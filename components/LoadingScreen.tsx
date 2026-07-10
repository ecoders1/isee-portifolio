"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#0a0a0f" }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full opacity-20"
                style={{
                  width: `${100 + i * 60}px`,
                  height: `${100 + i * 60}px`,
                  background: i % 2 === 0
                    ? "rgba(59,130,246,0.3)"
                    : "rgba(139,92,246,0.3)",
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          {/* Logo / Initials */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold animate-pulse-glow"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
            >
              IF
            </motion.div>
            <motion.h1
              className="text-2xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Isayas Fikadu
            </motion.h1>
            <motion.p
              className="text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Full Stack Developer
            </motion.p>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden mt-2">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
