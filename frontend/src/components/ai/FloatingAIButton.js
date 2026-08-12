/*import { FaRobot } from "react-icons/fa";

function FloatingAIButton({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-white text-black p-4 rounded-full shadow-xl cursor-pointer hover:scale-110 transition"
    >
      <FaRobot size={24} />
    </div>
  );
}

export default FloatingAIButton;*/


// src/components/ai/FloatingAIButton.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaBrain } from "react-icons/fa";

export default function FloatingAIButton({ onClick }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="hidden sm:flex items-center gap-2 rounded-xl border border-purple-100 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-purple-900 shadow-lg backdrop-blur-md"
      >
        <span>Need help?</span>
        <span className="text-purple-600 font-bold">Ask AI</span>
      </motion.div>

      {/* Floating Trigger */}
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 via-violet-600 to-indigo-500 text-2xl text-white shadow-xl shadow-purple-500/40 focus:outline-none"
      >
        <FaBrain />
        {/* Radar Pulse Effect */}
        <span className="absolute -inset-1 -z-10 animate-ping rounded-full bg-purple-500/30" />
      </motion.button>
    </div>
  );
}
