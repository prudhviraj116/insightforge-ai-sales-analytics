import React from "react";

function GrowthCard({ data }) {
  if (!data) return null;

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="font-bold text-lg mb-2">Growth Analysis</h3>

      <p><strong>Summary:</strong></p>
      <p>{data.summary}</p>

      <p className="mt-3"><strong>Implications:</strong></p>
      <p>{data.implications}</p>
    </div>
  );
}

export default GrowthCard;