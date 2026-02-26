import React from "react";

function GrowthCard({ data }) {
  const safeText =
    typeof data === "string"
      ? data
      : data?.summary
      ? data.summary
      : data
      ? JSON.stringify(data)
      : "No data available";

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="font-bold text-lg mb-2">Growth Analysis</h3>
      <p>{safeText}</p>
    </div>
  );
}

export default GrowthCard;