import React from "react";
import { FaCube } from "react-icons/fa";

function ProductStrategyCard({ data }) {
  if (!data) return null;

  const renderValue = (value) => {
    if (!value) return null;

    if (typeof value === "string") {
      return <p className="text-sm leading-6 text-slate-600">{value}</p>;
    }

    if (Array.isArray(value)) {
      return (
        <ul className="space-y-2 pl-5 text-sm leading-6 text-slate-600">
          {value.map((item, index) => (
            <li key={index}>{typeof item === "object" ? renderValue(item) : item}</li>
          ))}
        </ul>
      );
    }

    if (typeof value === "object") {
      return (
        <div className="space-y-3">
          {Object.entries(value).map(([key, val]) => (
            <div key={key}>
              <p className="text-sm font-semibold capitalize text-slate-900">{key.replaceAll("_", " ")}</p>
              <div className="mt-1">{renderValue(val)}</div>
            </div>
          ))}
        </div>
      );
    }

    return <p className="text-sm leading-6 text-slate-600">{String(value)}</p>;
  };

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
          <FaCube />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Products</p>
          <h3 className="text-lg font-semibold text-slate-900">Product strategy</h3>
        </div>
      </div>
      <div className="mt-4">{renderValue(data)}</div>
    </div>
  );
}

export default ProductStrategyCard;