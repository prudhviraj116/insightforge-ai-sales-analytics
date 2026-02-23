/*import React, { useState } from "react";
import axios from "axios";

import KPIBox from "./components/KPIBox";
import RevenueChart from "./components/RevenueChart";
import ProductChart from "./components/ProductChart";
import RegionChart from "./components/RegionChart";
import "./styles.css";

function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Upload CSV and get dashboard response
  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:8000/sales/upload",
        formData
      );

      // IMPORTANT: backend must return full dashboard JSON
      setData(res.data);

    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial state (before upload)
  if (!data) {
    return (
      <div className="dashboard-container">
        <h1 className="dashboard-title">
          InsightForge Executive Dashboard
        </h1>

        <input
          className="upload-input"
          type="file"
          onChange={uploadFile}
        />

        {loading && <h3>Processing data... Please wait.</h3>}
      </div>
    );
  }

  // After successful upload
  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">
        InsightForge Executive Dashboard
      </h1>

      <input
        className="upload-input"
        type="file"
        onChange={uploadFile}
      />

      <div className="kpi-container">
        <KPIBox title="Total Revenue" value={data.kpis.total_revenue} />
        <KPIBox title="Total Orders" value={data.kpis.total_orders} />
        <KPIBox title="Top Product" value={data.kpis.top_product} />
      </div>

      <div className="chart-section">
        <RevenueChart data={data.revenue_trend} />
      </div>

      <div className="chart-section">
        <ProductChart data={data.product_analysis} />
      </div>

      <div className="chart-section">
        <RegionChart data={data.region_analysis} />
      </div>

    </div>
  );
}

export default App;*/
/*
import React, { useEffect, useState } from "react";
import { fetchDashboardData } from "./services/api";

import KPIBox from "./components/ui/KPIBox";
import RevenueChart from "./components/charts/RevenueChart";
import ProductChart from "./components/charts/ProductChart";
import RegionChart from "./components/charts/RegionChart";

function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboardData().then(res => setData(res));
  }, []);

  if (!data) return <h2>Loading dashboard...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sales Dashboard</h1>

      {/* KPIs 
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <KPIBox title="Total Revenue" value={data.kpis.total_revenue} />
        <KPIBox title="Total Orders" value={data.kpis.total_orders} />
        <KPIBox title="Top Product" value={data.kpis.top_product} />
      </div>

      {/* Charts 
      <RevenueChart data={data.revenue_trend} />
      <ProductChart data={data.product_analysis} />
      <RegionChart data={data.region_analysis} />

    </div>
  );
}

export default App;*/







import React, { useState, useEffect } from "react";
import IntroScreen from "./components/layout/IntroScreen";
import Dashboard from "./pages/Dashboard";

function App() {

  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white relative overflow-hidden">
      {showIntro ? <IntroScreen /> : <Dashboard />}
    </div>
  );
}

export default App;








