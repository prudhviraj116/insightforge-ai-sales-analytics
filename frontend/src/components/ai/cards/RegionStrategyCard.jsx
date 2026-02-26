import React from "react";

function RegionStrategyCard({ data }) {
  if (!data) return null;

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
    <div className="p-4 border rounded shadow bg-purple-50 border-purple-200">
      <h3 className="font-bold text-lg mb-2">Regional Strategy</h3>
      {renderValue(data)}
    </div>
  );
}

export default RegionStrategyCard;