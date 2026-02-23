/*function KPIBox({ title, value }) {
  return (
    <div className="kpi-box">
      <div className="kpi-title">{title}</div>
      <div className="kpi-value">{value}</div>
    </div>
  );
}

export default KPIBox;*/

/*
import React from "react";

function KPIBox({ title, value }) {

  return (
    <div style={{
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      width: "200px"
    }}>
      <h4>{title}</h4>
      <h2>{value || 0}</h2>
    </div>
  );
}

export default KPIBox;*/


function KPIBox({ title, value }) {
  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h4>{title}</h4>
      <h1 className="text-2xl font-bold">{value}</h1>
    </div>
  );
}

export default KPIBox;



