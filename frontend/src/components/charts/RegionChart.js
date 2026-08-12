/*import { Pie } from "react-chartjs-2";

function RegionChart({ data }) {
  return (
    <Pie
      data={{
        labels: data.map(d => d.region),
        datasets: [
          {
            data: data.map(d => d.revenue)
          }
        ]
      }}
    />
  );
}

export default RegionChart;*/
import React from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

function RegionChart({ data }) {
  const palette = ["#2563eb", "#14b8a6", "#f59e0b", "#16a34a", "#dc2626"];

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Regions</p>
        <h3 className="mt-1 text-lg font-semibold text-slate-900">Regional revenue mix</h3>
      </div>
      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="revenue" nameKey="region" outerRadius={110} innerRadius={70} paddingAngle={2} label>
              {data.map((entry, index) => (
                <Cell key={`${entry.region}-${index}`} fill={palette[index % palette.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RegionChart;
