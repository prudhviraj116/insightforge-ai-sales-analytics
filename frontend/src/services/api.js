// src/services/api.js

// Base URL from Vercel environment variable
const BASE_URL = import.meta.env.VITE_API_URL;

// Safety check – fail fast if not configured
if (!BASE_URL) {
  throw new Error("VITE_API_URL is not defined in environment variables");
}

// ---------------- Dashboard ----------------
export const fetchDashboardData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/sales/dashboard`);

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard data");
    }

    return await response.json();
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    return {
      kpis: {},
      revenue_trend: [],
      product_analysis: [],
      region_analysis: []
    };
  }
};

// ---------------- Growth Analysis ----------------
export const fetchGrowthAnalysis = async () => {
  const response = await fetch(`${BASE_URL}/sales/growth-analysis`);

  if (!response.ok) {
    throw new Error("Failed to fetch growth analysis");
  }

  return await response.json();
};

// ---------------- Root Cause ----------------
export const fetchRootCause = async () => {
  const response = await fetch(`${BASE_URL}/sales/root-cause-analysis`);

  if (!response.ok) {
    throw new Error("Failed to fetch root cause analysis");
  }

  return await response.json();
};

// ---------------- Action Recommendations ----------------
export const fetchRecommendations = async () => {
  const response = await fetch(`${BASE_URL}/sales/action-recommendations`);

  if (!response.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return await response.json();
};

// ---------------- Upload CSV ----------------
export const uploadSalesCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/sales/upload-sales`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("CSV upload failed");
  }

  return await response.json();
};

// ---------------- AI Chat ----------------
export const sendAIMessage = async (message) => {
  const response = await fetch(`${BASE_URL}/sales/ai-response`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  if (!response.ok) {
    throw new Error("AI response failed");
  }

  return await response.json();
};