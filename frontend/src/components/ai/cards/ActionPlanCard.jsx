import React from "react";

function ActionPlanCard({ actions }) {
  if (!Array.isArray(actions)) return null;

  return (
    <div className="p-4 border rounded shadow bg-white col-span-1 md:col-span-2">
      <h3 className="font-bold text-lg mb-2">Executive Action Plan</h3>

      {actions.map((item) => (
        <div key={item.id} className="mb-4">
          <p className="font-semibold">
            {item.id}. {item.action}
          </p>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ActionPlanCard;