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
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function ProductChart({ data }) {

  return (
    <div style={{ marginBottom: "40px" }}>
      <h3>Product Revenue</h3>

      <BarChart width={600} height={300} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="product" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="revenue" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}

export default ProductChart;
