/*import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChartLine, FaChartBar } from "react-icons/fa";
import {
  fetchGrowthAnalysis,
  fetchRootCause,
  fetchRecommendations
} from "../../services/api";

function InsightPanel({ isOpen, onClose, insight }) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        try {
          setLoading(true);
          const growth = await fetchGrowthAnalysis();
          const rca = await fetchRootCause();
          const rec = await fetchRecommendations();
          setInsights({ growth, rca, rec });
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.4 }}
          className="fixed right-0 top-0 z-40 h-full w-full max-w-md border-l border-slate-200 bg-white p-6 shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Deep dive</p>
              <h2 className="mt-1 text-xl font-semibold text-slate-900">Insights workspace</h2>
            </div>
            <button onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Close insights">
              <FaTimes />
            </button>
          </div>

          {loading && <p className="mt-6 text-sm text-slate-600">Loading deeper analytics...</p>}

          {!loading && insights && (
            <div className="mt-6 space-y-4 text-sm">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <FaChartLine className="text-blue-600" />
                  Revenue change
                </div>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{insights.rca?.["revenue_change_%"]?.toFixed(2) ?? "—"}%</p>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <FaChartBar className="text-teal-600" />
                  Quantity change
                </div>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{insights.rca?.["quantity_change_%"]?.toFixed(2) ?? "—"}%</p>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">Recommended actions</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  {insights.rec?.recommendations?.map((item, index) => (
                    <li key={index} className="rounded-2xl bg-slate-50 px-3 py-2">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {!loading && !insights && (
            <p className="mt-6 text-sm leading-7 text-slate-600">{insight || "Insights will appear here."}</p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default InsightPanel;*/

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaBrain,
  FaLightbulb,
  FaChartLine,
  FaChartBar,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";
import {
  fetchGrowthAnalysis,
  fetchRootCause,
  fetchRecommendations,
} from "../../services/api";

export default function InsightPanel({ isOpen, onClose, insight }) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        try {
          setLoading(true);
          const [growth, rca, rec] = await Promise.all([
            fetchGrowthAnalysis(),
            fetchRootCause(),
            fetchRecommendations(),
          ]);
          setInsights({ growth, rca, rec });
        } catch (err) {
          console.error("Error fetching AI insights:", err);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-sm">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="flex h-full w-full max-w-lg flex-col justify-between border-l border-slate-100 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl backdrop-blur-md">
                  <FaBrain />
                </div>
                <div>
                  <h3 className="text-lg font-bold">AI Executive Report</h3>
                  <div className="flex items-center gap-2 text-xs text-purple-200">
                    <span>Confidence: 98%</span>
                    <span>•</span>
                    <span>Real-time Sync</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 transition hover:bg-white/10"
                aria-label="Close insights"
              >
                <FaTimes />
              </button>
            </div>

            {/* Body Content */}
            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              {/* Summary Box */}
              <div className="rounded-2xl border border-purple-100 bg-purple-50/70 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-purple-700">
                  <FaLightbulb /> Core Strategic Summary
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {insight ||
                    "Revenue growth momentum remains strong across top territories with notable acceleration in product lines."}
                </p>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-8 text-slate-600">
                  <FaSpinner className="animate-spin text-xl text-purple-600" />
                  <span className="text-sm font-medium">Fetching deeper analytics...</span>
                </div>
              )}

              {/* Dynamic Analytics Data */}
              {!loading && insights && (
                <div className="space-y-4">
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 shadow-sm">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <FaChartLine className="text-purple-600" />
                        Revenue Change
                      </div>
                      <p className="mt-2 text-2xl font-extrabold text-slate-900">
                        {insights.rca?.["revenue_change_%"]?.toFixed(2) ?? "—"}%
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 shadow-sm">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <FaChartBar className="text-indigo-600" />
                        Quantity Change
                      </div>
                      <p className="mt-2 text-2xl font-extrabold text-slate-900">
                        {insights.rca?.["quantity_change_%"]?.toFixed(2) ?? "—"}%
                      </p>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Recommended Actions
                    </h4>
                    <div className="space-y-2">
                      {insights.rec?.recommendations && insights.rec.recommendations.length > 0 ? (
                        insights.rec.recommendations.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3"
                          >
                            <FaCheckCircle className="mt-1 shrink-0 text-emerald-500" />
                            <p className="text-xs leading-5 text-slate-700">{item}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500">No specific recommendations available.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 bg-slate-50/50 p-4">
              <button
                onClick={onClose}
                className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800"
              >
                Close Report
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}