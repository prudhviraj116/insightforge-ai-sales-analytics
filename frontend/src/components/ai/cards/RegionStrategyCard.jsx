import React from "react";

function RegionStrategyCard({ data }) {
  if (!data) return null;

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="font-bold text-lg mb-2">Regional Strategy</h3>

      {Object.entries(data).map(([regionKey, regionData]) => (
        <div key={regionKey} className="mb-4">
          <p className="font-semibold capitalize">
            {regionKey.replaceAll("_", " ")}
          </p>
          <p><strong>Action:</strong> {regionData.action}</p>
          <p><strong>Goal:</strong> {regionData.goal}</p>
        </div>
      ))}
    </div>
  );
}

export default RegionStrategyCard;