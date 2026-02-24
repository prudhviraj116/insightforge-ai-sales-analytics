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
import { PieChart, Pie, Tooltip } from "recharts";

function RegionChart({ data }) {

  return (
    <div>
      <h3>Region Revenue Distribution</h3>

      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="revenue"
          nameKey="region"
          outerRadius={100}
          label
        />
        <Tooltip />
      </PieChart>
    </div>
  );
}

export default RegionChart;
