import React from "react";

function ProductStrategyCard({ data }) {
  if (!data) return null;

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="font-bold text-lg mb-2">Product Strategy</h3>

      {Object.entries(data).map(([productKey, productData]) => (
        <div key={productKey} className="mb-4">
          <p className="font-semibold capitalize">
            {productKey.replaceAll("_", " ")}
          </p>
          <p><strong>Action:</strong> {productData.action}</p>
          <p><strong>Goal:</strong> {productData.goal}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductStrategyCard;