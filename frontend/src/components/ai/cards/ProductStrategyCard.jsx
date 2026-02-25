import React from "react";

function ProductStrategyCard({ data }) {
  if (!data) return null;

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="font-bold text-lg mb-2">Product Strategy</h3>
      <p>{data}</p>
    </div>
  );
}

export default ProductStrategyCard;