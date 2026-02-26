import React from "react";

function ActionPlanCard({ actions }) {
  if (!actions) return null;

  const renderValue = (value) => {
    if (!value) return null;

    if (typeof value === "string") {
      return <p>{value}</p>;
    }

    if (Array.isArray(value)) {
      return (
        <ul className="list-disc pl-5 space-y-1">
          {value.map((item, index) => (
            <li key={index}>
              {typeof item === "object"
                ? renderValue(item)
                : item}
            </li>
          ))}
        </ul>
      );
    }

    if (typeof value === "object") {
      return (
        <div className="space-y-2">
          {Object.entries(value).map(([key, val]) => (
            <div key={key}>
              <p className="font-semibold capitalize">
                {key.replaceAll("_", " ")}
              </p>
              <div className="ml-3">
                {renderValue(val)}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return <p>{String(value)}</p>;
  };

  return (
    <div className="p-4 border rounded shadow bg-white col-span-1 md:col-span-2">
      <h3 className="font-bold text-lg mb-2">Executive Action Plan</h3>
      {renderValue(actions)}
    </div>
  );
}

export default ActionPlanCard;