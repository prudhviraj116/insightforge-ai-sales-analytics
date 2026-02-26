import React, { useState, useEffect } from "react";
import {uploadSalesCSV, fetchDashboardData, sendAIMessage } from "../services/api";
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


function Dashboard() {

  const [data, setData] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [insightOpen, setInsightOpen] = useState(false);

  const handleUpload = async (file) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await uploadSalesCSV(file);

      const dashboardData = await fetchDashboardData();
      setData(dashboardData);
            
      // Call AI endpoint for insights
      
      // 3️⃣ Call AI for insights// 
      const aiResponse = await sendAIMessage("Analyze this sales data");

      if (aiResponse?.insights) {
        setInsights(aiResponse.insights);
      }

      if (aiResponse?.ai_status !== "success") {
        console.warn("AI fallback used:", aiResponse?.ai_status);
      }

      setSuccess(true);

    } catch (err) {
      console.error(err);
      setError(err?.message || "Upload failed. Please check file format.");
    } finally {
      setLoading(false);
    }
  };

  // Cold start message if server is slow
  useEffect(() => {
    let timer;

    if (loading) {
      timer = setTimeout(() => {
        setError(prev => prev || "Server is waking up. Please wait...");
      }, 5000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loading]);

   return (
    <div className="p-10">

      <UploadButton
        onUpload={handleUpload}
        disabled={loading}
      />

      {loading && (
        <p style={{ marginTop: "10px" }}>
          Initializing server and processing file...
This may take a few seconds on first load.
        </p>
      )}

      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>
          {error}
          <br />
          <button onClick={() => setError(null)}>
            Dismiss
          </button>
        </div>
      )}

      {success && !loading && (
        <p style={{ color: "green", marginTop: "10px" }}>
          Upload successful.
        </p>
      )}

      {!data && !loading && !error && (
        <p style={{ marginTop: "20px" }}>
          Upload a CSV file to generate revenue insights.
        </p>
      )}

      {/* Charts */}
      {data && <ChartsSection data={data} openInsight={() => setInsightOpen(true)} />}

      {/* AI Insight Cards */}
      {insights && typeof insights === "object" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {insights.growth_analysis && (
            <GrowthCard data={insights.growth_analysis} />
          )}

          {insights.risk_analysis && (
            <RiskCard data={insights.risk_analysis} />
          )}

          {insights.product_strategy && (
            <ProductStrategyCard data={insights.product_strategy} />
          )}

          {insights.regional_strategy && (
            <RegionStrategyCard data={insights.regional_strategy} />
          )}

          {Array.isArray(insights.executive_actions) && (
            <ActionPlanCard actions={insights.executive_actions} />
          )}
        </div>
      )}


      <FloatingAIButton onClick={() => setAiOpen(true)} />

      <AIChatModal
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
      />

      <InsightPanel
        isOpen={insightOpen}
        onClose={() => setInsightOpen(false)}
        insight="Revenue trend shows strong growth in Q2."
      />

    </div>
  );
}

export default Dashboard;
