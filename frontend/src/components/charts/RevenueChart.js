/*import { Line } from "react-chartjs-2";

function RevenueChart({ data }) {
  return (
    <Line
      data={{
        labels: data.map(d => d.month),
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

export default RevenueChart;*/


import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function RevenueChart({ data }) {

  return (
    <div style={{ marginBottom: "40px" }}>
      <h3>Revenue Trend</h3>

      <LineChart width={600} height={300} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default RevenueChart;

