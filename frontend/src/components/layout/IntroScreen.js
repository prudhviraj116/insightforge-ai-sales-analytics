import { motion } from "framer-motion";

function IntroScreen() {
  return (
    <div className="flex items-center justify-center h-screen relative">

      <svg className="absolute w-full h-full">
        <path
          d="M 0 100 Q 600 400 300 800 T 1200 1200"
          stroke="white"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
        />
      </svg>

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold"
      >
        Welcome to Smart Analytics Dashboard
      </motion.h1>
    </div>
  );
}

export default IntroScreen;
