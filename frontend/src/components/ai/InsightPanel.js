import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
          className="fixed top-0 right-0 w-[400px] h-full bg-gray-900 shadow-2xl z-40 p-6"
        >
          <h2 className="text-xl font-bold mb-4">Data Insights</h2>

          {loading && <p>Loading insights...</p>}

          {!loading && insights && (
            <div className="space-y-4 text-sm">

              {/* Revenue Change */}
              <div>
                <p className="font-semibold">Revenue Change:</p>
                <p>{insights.rca?.["revenue_change_%"]?.toFixed(2)}%</p>
              </div>

              {/* Quantity Change */}
              <div>
                <p className="font-semibold">Quantity Change:</p>
                <p>{insights.rca?.["quantity_change_%"]?.toFixed(2)}%</p>
              </div>

              {/* Recommendations */}
              <div>
                <p className="font-semibold">Action Recommendations:</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  {insights.rec?.recommendations?.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

            </div>
          )}

          {!loading && !insights && (
            <p>{insight || "Insights will appear here."}</p>
          )}

          <button
            className="mt-6 bg-white text-black px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default InsightPanel;