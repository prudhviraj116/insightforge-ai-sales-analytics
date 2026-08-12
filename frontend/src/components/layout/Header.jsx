import React from "react";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaRobot,
  FaBell,
  FaCog
} from "react-icons/fa";

function Header() {
  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-4 z-50 rounded-3xl border border-purple-100 bg-white/90 backdrop-blur-xl shadow-lg"
    >
      <div className="flex items-center justify-between px-6 py-4">

        {/* Left */}

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-violet-500 text-white shadow-lg">

            <FaChartLine size={24} />

          </div>

          <div>

            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              InsightForge AI
            </h1>

            <p className="text-sm text-slate-500">
              AI Powered Sales Intelligence Platform
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          <div className="hidden lg:flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-purple-700 font-semibold">

            <FaRobot />

            AI Assistant Ready

          </div>

          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 hover:bg-purple-50 transition">

            <FaBell />

          </button>

          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 hover:bg-purple-50 transition">

            <FaCog />

          </button>

        </div>

      </div>
    </motion.header>
  );
}

export default Header;