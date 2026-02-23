import axios from "axios";
/*
export const fetchDashboardData = async () => {
  const res = await axios.get(
    "http://127.0.0.1:8000/sales/dashboard"
  );
  return res.data;
};*/
/*

export const fetchDashboardData = async () => {
  try {
    const response = await fetch("http://localhost:8000/sales/dashboard");

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard data");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return {
      kpis: {},
      revenue_trend: [],
      product_analysis: [],
      region_analysis: []
    };
  }
};*/

/*export const fetchDashboardData = async () => {
  const res = await fetch("http://localhost:8000/sales/dashboard");
  return await res.json();
};*/


// ---------------------
// AI Chat Call
// ---------------------
/*
export const askAI = async (question) => {
  const response = await fetch("http://localhost:8000/sales/ai-response", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question })
  });

  if (!response.ok) {
    throw new Error("AI request failed");
  }

  return response.json();
};*/






// src/api/api.js

const BASE_URL = "http://localhost:8000";

// ---------------- Dashboard ----------------
export const fetchDashboardData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/sales/dashboard`);

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard data");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
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
  if (!response.ok) throw new Error("Failed to fetch growth analysis");
  return await response.json();
};

// ---------------- Root Cause ----------------
export const fetchRootCause = async () => {
  const response = await fetch(`${BASE_URL}/sales/root-cause-analysis`);
  if (!response.ok) throw new Error("Failed to fetch root cause");
  return await response.json();
};

// ---------------- Action Recommendations ----------------
export const fetchRecommendations = async () => {
  const response = await fetch(`${BASE_URL}/sales/action-recommendations`);
  if (!response.ok) throw new Error("Failed to fetch recommendations");
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

  if (!response.ok) throw new Error("Upload failed");

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

  if (!response.ok) throw new Error("AI response failed");

  return await response.json();
};




