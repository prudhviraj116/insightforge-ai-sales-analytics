import React from "react";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaCube,
  FaGlobe,
  FaBrain,
  FaShieldAlt,
} from "react-icons/fa";

const menuItems = [
  {
    id: "home",
    icon: <FaChartLine />,
    title: "Dashboard",
  },
  {
    id: "overview",
    icon: <FaChartLine />,
    title: "Revenue Intelligence",
  },
  {
    id: "products",
    icon: <FaCube />,
    title: "Product Intelligence",
  },
  {
    id: "regions",
    icon: <FaGlobe />,
    title: "Regional Intelligence",
  },
  {
    id: "ai",
    icon: <FaBrain />,
    title: "Executive AI",
  },
];

function Sidebar({ activeTab, setActiveTab, workspaceRef }) {
  const handleTabChange = (tab) => {
    setActiveTab(tab);

    setTimeout(() => {
      workspaceRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);
  };

  return (
    <aside className="hidden lg:flex lg:flex-col justify-between rounded-[30px] border border-purple-100 bg-white p-6 shadow-lg">
      <div>
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.35em] text-purple-500">
          Workspace
        </p>

        <div className="space-y-3">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{
                scale: 1.03,
                x: 4,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => handleTabChange(item.id)}
              className={`relative flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all duration-300 ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-lg"
                  : "bg-slate-50 text-slate-700 hover:bg-purple-50"
              }`}
            >
              {activeTab === item.id && (
                <motion.div
                  layoutId="sidebarIndicator"
                  className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-white"
                />
              )}

              <div
                className={`text-xl ${
                  activeTab === item.id ? "text-white" : "text-purple-600"
                }`}
              >
                {item.icon}
              </div>

              <div>
                <p className="font-semibold">{item.title}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div
        whileHover={{
          scale: 1.02,
        }}
        className="mt-8 rounded-3xl bg-gradient-to-br from-purple-600 to-violet-500 p-5 text-white shadow-xl"
      >
        <div className="flex items-center gap-2">
          <FaShieldAlt />
          <span className="font-bold">Enterprise Ready</span>
        </div>

        <p className="mt-3 text-sm leading-6 text-purple-100">
          Secure AI-powered analytics with scalable architecture and real-time
          business intelligence.
        </p>
      </motion.div>
    </aside>
  );
}

export default Sidebar;