import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

import KPIBox from "./ui/KPIBox";
import RevenueChart from "./charts/RevenueChart";
import ProductChart from "./charts/ProductChart";
import RegionChart from "./charts/RegionChart";

function ChartsSection({ data, activeTab, openInsight }) {
  const kpis = data?.kpis || {};

  const formatCurrency = (value) =>
    typeof value === "number"
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(value)
      : "—";

  return (
    <div className="space-y-6">
      {/* ================= Executive Summary ================= */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Dashboard
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Executive Summary
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Live overview of revenue, products, regional performance and
              executive AI recommendations generated from your uploaded sales
              dataset.
            </p>
          </div>

          <button
            onClick={openInsight}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
          >
            Open AI Insights
            <FaArrowRight />
          </button>
        </div>
      </motion.section>

      {/* ================= KPI CARDS ================= */}
      <motion.div
        className="grid gap-5 xl:grid-cols-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.08 }}
      >
        {[
          {
            title: "Total Revenue",
            value: formatCurrency(kpis.total_revenue),
            subtitle: "Combined Sales",
            trend: "Live",
          },
          {
            title: "Orders",
            value: kpis.total_orders ?? 0,
            subtitle: "Transactions",
            trend: "Tracked",
          },
          {
            title: "Top Product",
            value: kpis.top_product || "—",
            subtitle: "Highest Revenue",
            trend: "Leader",
          },
          {
            title: "Top Region",
            value: data?.region_analysis?.[0]?.region || "—",
            subtitle: "Best Performing",
            trend: "Focus",
          },
        ].map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <KPIBox
              title={card.title}
              value={card.value}
              subtitle={card.subtitle}
              trend={card.trend}
              icon={<FaCheckCircle />}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* ================= WORKSPACE ANIMATIONS ================= */}
      <AnimatePresence mode="wait">
        {/* ================= HOME ================= */}
        {activeTab === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <div className="rounded-[30px] border border-dashed border-purple-300 bg-gradient-to-br from-white to-purple-50 p-16 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-5xl">
                📊
              </div>
              <h2 className="text-3xl font-bold text-slate-900">
                Welcome to InsightForge AI
              </h2>
              <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
                Select one of the workspaces from the sidebar to explore
                Revenue Intelligence, Product Analytics, Regional Insights and
                Executive AI recommendations.
              </p>
            </div>
          </motion.div>
        )}

        {/* ================= OVERVIEW ================= */}
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Revenue Intelligence
                </h2>
                <p className="mt-2 text-slate-500">
                  Monitor revenue trends, business growth and regional
                  performance from your uploaded dataset.
                </p>
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
                <RevenueChart data={data?.revenue_trend || []} />
                <RegionChart data={data?.region_analysis || []} />
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= PRODUCTS ================= */}
        {activeTab === "products" && (
          <motion.div
            key="products"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Product Intelligence
                </h2>
                <p className="mt-2 text-slate-500">
                  Discover your best-selling products and identify new
                  opportunities for business growth.
                </p>
              </div>

              <ProductChart data={data?.product_analysis || []} />
            </div>
          </motion.div>
        )}

        {/* ================= REGIONS ================= */}
        {activeTab === "regions" && (
          <motion.div
            key="regions"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Regional Intelligence
                </h2>
                <p className="mt-2 text-slate-500">
                  Compare regional performance and identify the strongest
                  performing markets.
                </p>
              </div>

              <RegionChart data={data?.region_analysis || []} />
            </div>
          </motion.div>
        )}

        {/* ================= AI ================= */}
        {activeTab === "ai" && (
          <motion.div
            key="ai"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <div className="rounded-[30px] border border-purple-200 bg-gradient-to-br from-white to-violet-50 p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-500">
                Executive AI
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                AI Business Intelligence
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                InsightForge AI analyzes your uploaded sales data and
                automatically generates executive-level recommendations,
                detects opportunities, highlights risks, and recommends
                strategic actions.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl bg-white p-5 shadow">
                  <h3 className="text-lg font-semibold">Revenue Analysis</h3>
                  <p className="mt-3 text-slate-600">
                    Monitor sales growth trends, revenue fluctuations,
                    seasonal demand and monthly performance.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow">
                  <h3 className="text-lg font-semibold">Product Strategy</h3>
                  <p className="mt-3 text-slate-600">
                    Identify top-selling products and products requiring
                    marketing attention.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow">
                  <h3 className="text-lg font-semibold">Regional Insights</h3>
                  <p className="mt-3 text-slate-600">
                    Discover high-growth regions and locations that require
                    business improvement.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow">
                  <h3 className="text-lg font-semibold">
                    Executive Decisions
                  </h3>
                  <p className="mt-3 text-slate-600">
                    AI generates actionable recommendations that help business
                    leaders make faster decisions.
                  </p>
                </div>
              </div>

              <button
                onClick={openInsight}
                className="mt-8 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-500 px-7 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
              >
                View Complete AI Report
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChartsSection;