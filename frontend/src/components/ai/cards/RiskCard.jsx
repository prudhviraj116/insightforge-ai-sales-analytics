import React from "react";

function RiskCard({ data }) {
  if (!data) return null;

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="font-bold text-lg mb-2">Revenue Risk Areas</h3>

      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="mb-3">
          <p className="font-semibold capitalize">
            {key.replaceAll("_", " ")}
          </p>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
}

export default RiskCard;