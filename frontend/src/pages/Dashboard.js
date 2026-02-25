import React, { useState } from "react";
import {uploadSalesCSV, fetchDashboardData } from "../services/api";
import ChartsSection from "../components/ChartsSection";
import UploadButton from "../components/ui/UploadButton";
import FloatingAIButton from "../components/ai/FloatingAIButton";
import AIChatModal from "../components/ai/AIChatModal";
import InsightPanel from "../components/ai/InsightPanel";

function Dashboard() {

  const [data, setData] = useState(null);
  const [aiOpen, setAiOpen] = useState(false);
  const [insightOpen, setInsightOpen] = useState(false);

  const handleUpload = async (file) => {
    try {
      // Upload CSV to backend
      await uploadSalesCSV(file);

      // Fetch dashboard data after upload
      const dashboardData = await fetchDashboardData();
      setData(dashboardData);
    } catch (error) {
      console.error("Upload or fetch failed:", error);
    }
  };

  return (
    <div className="p-10">

      <UploadButton onUpload={handleUpload} />

      {data && (
        <ChartsSection
          data={data}
          openInsight={() => setInsightOpen(true)}
        />
      )}

      <FloatingAIButton onClick={() => setAiOpen(true)} />

      <AIChatModal isOpen={aiOpen} onClose={() => setAiOpen(false)} />

      <InsightPanel
        isOpen={insightOpen}
        onClose={() => setInsightOpen(false)}
        insight="Revenue trend shows strong growth in Q2."
      />
    </div>
  );
}

export default Dashboard;
