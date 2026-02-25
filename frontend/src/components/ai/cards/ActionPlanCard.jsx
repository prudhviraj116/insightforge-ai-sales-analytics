import React from "react";

function ActionPlanCard({ actions }) {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="font-bold text-lg mb-2">Executive Action Plan</h3>
      <ul className="list-disc pl-5">
        {actions.map((action, idx) => (
          <li key={idx}>{action}</li>
        ))}
      </ul>
    </div>
  );
}

export default ActionPlanCard;