/*import { Bar } from "react-chartjs-2";

function ProductChart({ data }) {
  return (
    <Bar
      data={{
        labels: data.map(d => d.product),
        datasets: [
          {
            label: "Revenue",
            data: data.map(d => d.revenue)
          }
        ]
      }}
    />
  );
}

export default ProductChart;*/
import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function ProductChart({ data }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Products</p>
        <h3 className="mt-1 text-lg font-semibold text-slate-900">Product revenue</h3>
      </div>
      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="product" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="revenue" radius={[8, 8, 0, 0]} fill="#14b8a6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ProductChart;
