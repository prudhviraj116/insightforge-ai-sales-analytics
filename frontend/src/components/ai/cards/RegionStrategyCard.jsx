import React from "react";

function RegionStrategyCard({ data }) {
  if (!data) return null;

  const safeText =
    typeof data === "string"
      ? data
      : data?.summary
      ? data.summary
      : JSON.stringify(data);

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="font-bold text-lg mb-2">Region Strategy</h3>
      <p>{safeText}</p>
    </div>
  );
}

export default RegionStrategyCard;