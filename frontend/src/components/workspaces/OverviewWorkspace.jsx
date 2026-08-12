import React from "react";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaDollarSign,
  FaArrowUp,
  FaCalendarAlt,
} from "react-icons/fa";

import RevenueChart from "../charts/RevenueChart";
import RegionChart from "../charts/RegionChart";

function OverviewWorkspace({ data }) {
  const kpis = data?.kpis || {};

  const formatCurrency = (value) =>
    typeof value === "number"
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(value)
      : "—";

  const overviewCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(kpis.total_revenue),
      icon: <FaDollarSign />,
      color: "from-purple-500 to-violet-600",
    },
    {
      title: "Total Orders",
      value: kpis.total_orders || 0,
      icon: <FaChartLine />,
      color: "from-indigo-500 to-purple-600",
    },
    {
      title: "Top Product",
      value: kpis.top_product || "—",
      icon: <FaArrowUp />,
      color: "from-pink-500 to-purple-600",
    },
    {
      title: "Top Region",
      value: data?.region_analysis?.[0]?.region || "—",
      icon: <FaCalendarAlt />,
      color: "from-violet-500 to-fuchsia-600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="space-y-8"
    >
      {/* Workspace Header */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-600 to-violet-500 p-8 text-white shadow-xl">
        <p className="uppercase tracking-[0.35em] text-purple-100 text-xs font-bold">
          Revenue Intelligence
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          Executive Revenue Overview
        </h2>

        <p className="mt-3 max-w-3xl text-purple-100 leading-7">
          Monitor sales performance, revenue trends, business growth,
          and executive KPIs from one intelligent workspace.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 lg:grid-cols-4">
        {overviewCards.map((card) => (
          <motion.div
            key={card.title}
            whileHover={{ y: -6 }}
            className={`rounded-3xl bg-gradient-to-br ${card.color} p-6 text-white shadow-lg`}
          >
            <div className="text-4xl">{card.icon}</div>

            <h3 className="mt-6 text-sm uppercase tracking-widest">
              {card.title}
            </h3>

            <h2 className="mt-2 text-3xl font-bold">
              {card.value}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <motion.div
        whileHover={{ y: -3 }}
        className="rounded-3xl bg-white p-6 shadow-lg"
      >
        <h3 className="mb-6 text-xl font-bold text-slate-800">
          Revenue Trend
        </h3>

        <RevenueChart
          data={data?.revenue_trend || []}
        />
      </motion.div>

      {/* Region Overview */}
      <motion.div
        whileHover={{ y: -3 }}
        className="rounded-3xl bg-white p-6 shadow-lg"
      >
        <h3 className="mb-6 text-xl font-bold text-slate-800">
          Revenue by Region
        </h3>

        <RegionChart
          data={data?.region_analysis || []}
        />
      </motion.div>
    </motion.div>
  );
}

export default OverviewWorkspace;