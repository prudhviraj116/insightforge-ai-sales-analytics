import React, { useState } from "react";
import { fetchDashboardData } from "../services/api";
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
  const formData = new FormData();
  formData.append("file", file);

  const API_URL = import.meta.env.REACT_APP_API_URL;

  await fetch(`${API_URL}/sales/upload`, {
    method: "POST",
    body: formData
  });

  const dashboardData = await fetchDashboardData();
  setData(dashboardData);
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
