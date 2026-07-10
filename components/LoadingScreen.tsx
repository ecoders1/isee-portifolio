"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 0.1 seconds loading
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#0a0a0f" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          <motion.div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
            style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            IF
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
