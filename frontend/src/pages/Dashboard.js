/*import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaLightbulb, FaUpload } from "react-icons/fa";
import { uploadSalesCSV, fetchDashboardData, sendAIMessage } from "../services/api";
import UploadButton from "../components/ui/UploadButton";
import FloatingAIButton from "../components/ai/FloatingAIButton";
import AIChatModal from "../components/ai/AIChatModal";
import InsightPanel from "../components/ai/InsightPanel";
import GrowthCard from "../components/ai/cards/GrowthCard";
import RiskCard from "../components/ai/cards/RiskCard";
import ProductStrategyCard from "../components/ai/cards/ProductStrategyCard";
import RegionStrategyCard from "../components/ai/cards/RegionStrategyCard";
import ActionPlanCard from "../components/ai/cards/ActionPlanCard";

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import HomeWorkspace from "../components/workspaces/HomeWorkspace";
import OverviewWorkspace from "../components/workspaces/OverviewWorkspace";
import ProductsWorkspace from "../components/workspaces/ProductsWorkspace";
import RegionsWorkspace from "../components/workspaces/RegionsWorkspace";
import AIWorkspace from "../components/workspaces/AIWorkspace";

function Dashboard() {
  const [data, setData] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [insightOpen, setInsightOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const workspaceRef = useRef(null);
  

  useEffect(() => {
    const hydrateDashboard = async () => {
      try {
        const dashboardData = await fetchDashboardData();
        if (dashboardData && Object.keys(dashboardData).length > 0) {
          setData(dashboardData);
        }
      } catch (err) {
        console.error(err);
      }
    };

    hydrateDashboard();
  }, []);

  const handleUpload = async (file) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      setInsights(null);

      await uploadSalesCSV(file);
      const dashboardData = await fetchDashboardData();
      setData(dashboardData);

      const aiResponse = await sendAIMessage("Analyze this sales data");
      if (aiResponse && typeof aiResponse.insights === "object") {
        setInsights(aiResponse.insights);
      } else {
        setInsights(null);
      }

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Upload failed. Please check the CSV format and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setTimeout(() => {
        setError((prev) => prev || "The server is still warming up. Please wait a moment.");
      }, 6000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loading]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    setTimeout(() => {
      workspaceRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);
  };

  const quickStats = [
    { title: "Immediate upload", detail: "Drop a CSV and start analysis in seconds." },
    { title: "Executive-ready", detail: "Board-style KPIs and trend views out of the box." },
    { title: "AI support", detail: "Ask the assistant for custom recommendations." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Header />

        <main className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <Sidebar
  activeTab={activeTab}
  setActiveTab={handleTabChange}
/>

          <div className="space-y-6">
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.16)]"
            >
              <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
                    <FaLightbulb />
                    AI-powered revenue intelligence
                  </div>
                  <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                    Executive sales workspace
                  </h1>
                  <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                    Upload a sales CSV and transform raw transactions into a polished view of growth, product momentum, regional opportunities, and recommended next steps.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      onClick={() => setAiOpen(true)}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Open AI assistant
                    </button>
                    <button
                      onClick={() => setInsightOpen(true)}
                      className="rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Review insights
                    </button>
                  </div>
                </div>

                <div className="w-full max-w-md rounded-[24px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <UploadButton onUpload={handleUpload} disabled={loading} />
                  <p className="mt-3 text-xs leading-6 text-slate-500">
                    Supported format: CSV with order_date, product, region, revenue, and quantity columns.
                  </p>
                </div>
              </div>
            </motion.section>

            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[24px] border border-blue-200 bg-blue-50 px-4 py-4 text-sm font-medium text-blue-700"
              >
                <div className="flex items-center gap-2">
                  <FaUpload className="animate-pulse" />
                  Processing your file and refreshing the dashboard.
                </div>
              </motion.div>
            )}

            {error && (
              <div className="rounded-[24px] border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
                {error}
                <button className="ml-3 font-semibold underline" onClick={() => setError(null)}>
                  Dismiss
                </button>
              </div>
            )}

            {success && !loading && (
              <div className="flex items-center gap-2 rounded-[24px] border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-medium text-emerald-700">
                <FaCheckCircle />
                Upload completed and insights refreshed.
              </div>
            )}

            {!data && !loading && !error && (
              <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                    <FaUpload />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">No sales data loaded yet</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Upload your CSV to bring the dashboard to life with KPI cards, charts, and AI guidance.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {quickStats.map((entry) => (
                    <div key={entry.title} className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-slate-900">{entry.title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{entry.detail}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            <div ref={workspaceRef}>

            </div>

            {data && (
              <>
                {activeTab === "home" && (
                   <HomeWorkspace
  setActiveTab={handleTabChange}
/>
                )}

                {activeTab === "overview" && (
                  <OverviewWorkspace data={data} />
                )}

                {activeTab === "products" && (
                  <ProductsWorkspace data={data} />
                )}

                {activeTab === "regions" && (
                  <RegionsWorkspace data={data} />
                )}

                {activeTab === "ai" && (
                  <AIWorkspace
                    insights={insights}
                    openInsight={() => setInsightOpen(true)}
                  />
                )}

                {insights && (
                  <div className="grid gap-4 lg:grid-cols-2">
                    <GrowthCard data={insights.growth_analysis} />
                    <RiskCard data={insights.risk_analysis} />
                    <ProductStrategyCard data={insights.product_strategy} />
                    <RegionStrategyCard data={insights.regional_strategy} />
                    <ActionPlanCard actions={insights.executive_actions} />
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      <FloatingAIButton onClick={() => setAiOpen(true)} />
      <AIChatModal isOpen={aiOpen} onClose={() => setAiOpen(false)} />
      <InsightPanel
        isOpen={insightOpen}
        onClose={() => setInsightOpen(false)}
        insight="Revenue momentum and regional opportunities are ready to review."
      />
    </div>
  );
}

export default Dashboard;*/



// src/pages/Dashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaLightbulb,
  FaUpload,
  FaUserCircle,
  FaClock,
  FaCalendarAlt,
  FaChartLine,
} from "react-icons/fa";
import { uploadSalesCSV, fetchDashboardData, sendAIMessage } from "../services/api";
import ChartsSection from "../components/ChartsSection";
import UploadButton from "../components/ui/UploadButton";
import FloatingAIButton from "../components/ai/FloatingAIButton";
import AIChatModal from "../components/ai/AIChatModal";
import InsightPanel from "../components/ai/InsightPanel";
import GrowthCard from "../components/ai/cards/GrowthCard";
import RiskCard from "../components/ai/cards/RiskCard";
import ProductStrategyCard from "../components/ai/cards/ProductStrategyCard";
import RegionStrategyCard from "../components/ai/cards/RegionStrategyCard";
import ActionPlanCard from "../components/ai/cards/ActionPlanCard";

import Sidebar from "../components/layout/Sidebar";
import HomeWorkspace from "../components/workspaces/HomeWorkspace";
import OverviewWorkspace from "../components/workspaces/OverviewWorkspace";
import ProductsWorkspace from "../components/workspaces/ProductsWorkspace";
import RegionsWorkspace from "../components/workspaces/RegionsWorkspace";
import AIWorkspace from "../components/workspaces/AIWorkspace";

function Dashboard() {
  const [data, setData] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [insightOpen, setInsightOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const workspaceRef = useRef(null);

  // Live Date & Time
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hydrateDashboard = async () => {
      try {
        const dashboardData = await fetchDashboardData();
        if (dashboardData && Object.keys(dashboardData).length > 0) {
          setData(dashboardData);
        }
      } catch (err) {
        console.error(err);
      }
    };

    hydrateDashboard();
  }, []);

  // Multi-step Loading Animation
  const handleUpload = async (file) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      setInsights(null);
      setLoadingStep(1);

      const stepInterval = setInterval(() => {
        setLoadingStep((prev) => (prev < 4 ? prev + 1 : prev));
      }, 700);

      await uploadSalesCSV(file);
      const dashboardData = await fetchDashboardData();
      setData(dashboardData);

      const aiResponse = await sendAIMessage("Analyze this sales data");
      clearInterval(stepInterval);

      if (aiResponse && typeof aiResponse.insights === "object") {
        setInsights(aiResponse.insights);
      } else {
        setInsights(null);
      }

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Upload failed. Please check the CSV format and try again.");
    } finally {
      setLoading(false);
      setLoadingStep(0);
    }
  };

  const statRibbons = [
    { label: "Revenue", val: "$3.4M", change: "↑ 18%" },
    { label: "Orders", val: "12,846", change: "↑ 12%" },
    { label: "Customers", val: "5,201", change: "↑ 8%" },
    { label: "Growth", val: "24%", change: "↑ 7%" },
  ];

  const loadingStages = [
    "Analyzing Dataset...",
    "Generating KPIs...",
    "Creating Charts...",
    "Building AI Report...",
  ];

  return (
    <div className="relative min-h-screen bg-slate-50/70 text-slate-900 overflow-x-hidden">
      {/* ================= Part 4: Ambient Animated Background ================= */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="animate-orb-slow absolute -top-32 -left-32 h-96 w-96 rounded-full bg-purple-400/10 blur-[100px]" />
        <div className="animate-orb-reverse absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full bg-pink-400/10 blur-[120px]" />
        <div className="animate-orb-slow absolute -bottom-32 left-1/4 h-[28rem] w-[28rem] rounded-full bg-indigo-400/10 blur-[110px]" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8">
        {/* ================= Part 1 & Part 2: Floating Glass Header ================= */}
        <header className="sticky top-4 z-40 flex items-center justify-between rounded-[24px] border border-white/60 bg-white/70 px-6 py-3.5 shadow-lg shadow-purple-500/5 backdrop-blur-xl transition-all">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-xl text-white shadow-md shadow-purple-500/20">
              <FaChartLine />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              InsightForge <span className="text-purple-600">AI</span>
            </span>
          </div>

          {/* Part 2: Live Date & Time */}
          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 border-x border-slate-200/60 px-6">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-purple-500" />
              <span>
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-purple-500" />
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800">Prudhviraj</p>
              <p className="text-[10px] font-medium text-slate-400">Executive Account</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 text-2xl border border-purple-200 shadow-sm">
              <FaUserCircle />
            </div>
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            workspaceRef={workspaceRef}
          />

          <div className="space-y-6">
            {/* ================= Part 3: Premium Welcome Banner ================= */}
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-[32px] border border-purple-200/60 bg-gradient-to-br from-purple-700 via-indigo-600 to-violet-700 p-8 text-white shadow-xl shadow-purple-500/10"
            >
              {/* Background Geometric Circles */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute right-40 -bottom-10 h-40 w-40 rounded-full bg-pink-500/20 blur-xl" />

              <div className="relative z-10 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-purple-100 backdrop-blur-md">
                    <FaLightbulb />
                    Executive Revenue Workspace
                  </div>
                  <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                    👋 Good Morning, <span className="underline decoration-purple-300">Prudhviraj</span>
                  </h1>
                  <p className="mt-2 text-sm leading-6 text-purple-100/90 sm:text-base">
                    Let's discover today's opportunities. Upload your sales transactions to unlock real-time intelligence.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      onClick={() => setAiOpen(true)}
                      className="rounded-2xl bg-white px-5 py-2.5 text-sm font-bold text-purple-700 shadow-md transition hover:bg-purple-50"
                    >
                      Open AI assistant
                    </button>
                    <button
                      onClick={() => setInsightOpen(true)}
                      className="rounded-2xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
                    >
                      Review insights
                    </button>
                  </div>
                </div>

                {/* Part 5: Drag & Drop CSV Upload Area */}
                <div className="w-full max-w-md">
                  <UploadButton onUpload={handleUpload} disabled={loading} />
                </div>
              </div>
            </motion.section>

            {/* ================= Part 6: Statistics Ribbon ================= */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {statRibbons.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card hover-lift flex items-center justify-between rounded-[22px] p-4 shadow-sm"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-xl font-extrabold text-slate-800">
                      {stat.val}
                    </p>
                  </div>
                  <span className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-bold text-purple-600 border border-purple-100">
                    {stat.change}
                  </span>
                </div>
              ))}
            </div>

            {/* ================= Part 8: Animated Loading State ================= */}
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[28px] border border-purple-200 bg-white p-8 text-center shadow-lg"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <FaUpload className="animate-bounce text-xl" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {loadingStages[loadingStep - 1] || "Processing Dataset..."}
                </h3>
                <div className="mx-auto mt-4 h-2.5 w-full max-w-md overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${loadingStep * 25}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            )}

            {error && (
              <div className="rounded-[24px] border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700 flex items-center justify-between">
                <span>{error}</span>
                <button
                  className="font-semibold underline"
                  onClick={() => setError(null)}
                >
                  Dismiss
                </button>
              </div>
            )}

            {success && !loading && (
              <div className="flex items-center gap-2 rounded-[24px] border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-medium text-emerald-700">
                <FaCheckCircle />
                Upload completed and insights refreshed.
              </div>
            )}

            {/* ================= Part 7: Beautiful Empty State ================= */}
            {!data && !loading && !error && (
              <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[32px] border border-dashed border-purple-200 bg-white p-12 text-center shadow-sm"
              >
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-purple-50 text-5xl text-purple-600">
                  📈
                </div>
                <h2 className="mt-4 text-2xl font-bold text-slate-900">
                  Upload a dataset to unlock intelligence
                </h2>
                <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500 leading-6">
                  AI will automatically generate interactive KPI cards, charts, revenue forecasts, and action plans from your CSV file.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-semibold text-slate-600">
                  <span className="rounded-xl bg-slate-100 px-3 py-1.5">✓ Charts</span>
                  <span className="rounded-xl bg-slate-100 px-3 py-1.5">✓ KPIs</span>
                  <span className="rounded-xl bg-slate-100 px-3 py-1.5">✓ Forecasts</span>
                  <span className="rounded-xl bg-slate-100 px-3 py-1.5">✓ Recommendations</span>
                </div>
              </motion.section>
            )}

            {/* Workspaces & Charts */}
            <div ref={workspaceRef}>
              <ChartsSection
                data={data}
                activeTab={activeTab}
                openInsight={() => setInsightOpen(true)}
              />
            </div>

            {data && (
              <>
                {activeTab === "home" && <HomeWorkspace setActiveTab={setActiveTab} />}
                {activeTab === "overview" && <OverviewWorkspace data={data} />}
                {activeTab === "products" && <ProductsWorkspace data={data} />}
                {activeTab === "regions" && <RegionsWorkspace data={data} />}
                {activeTab === "ai" && (
                  <AIWorkspace
                    insights={insights}
                    openInsight={() => setInsightOpen(true)}
                  />
                )}

                {insights && (
                  <div className="grid gap-4 lg:grid-cols-2">
                    <GrowthCard data={insights.growth_analysis} />
                    <RiskCard data={insights.risk_analysis} />
                    <ProductStrategyCard data={insights.product_strategy} />
                    <RegionStrategyCard data={insights.regional_strategy} />
                    <ActionPlanCard actions={insights.executive_actions} />
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Part 13: Floating AI Assistant Button */}
      <FloatingAIButton onClick={() => setAiOpen(true)} />
      <AIChatModal isOpen={aiOpen} onClose={() => setAiOpen(false)} />

      {/* Part 14: AI Insight Panel */}
      <InsightPanel
        isOpen={insightOpen}
        onClose={() => setInsightOpen(false)}
        insight="Revenue momentum and regional opportunities are ready to review."
      />
    </div>
  );
}

export default Dashboard;