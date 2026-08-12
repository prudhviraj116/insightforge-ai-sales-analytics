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


/*import React from "react";

function KPIBox({ title, value, subtitle, icon, trend }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">{icon}</div>
        {trend ? <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">{trend}</span> : null}
      </div>
      <p className="mt-4 text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
      {subtitle ? <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p> : null}
    </div>
  );
}

export default KPIBox;*/



// src/components/ui/KPIBox.jsx
import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function KPIBox({ title, value, subtitle, trend, icon }) {
  // Utility to parse numeric values for CountUp
  const parseNumericValue = (val) => {
    if (typeof val === "number") return { num: val, prefix: "", suffix: "" };
    if (typeof val === "string") {
      const match = val.match(/^([^\d-]*)([\d,.]+)(.*)$/);
      if (match) {
        const cleanNum = parseFloat(match[2].replace(/,/g, ""));
        return {
          num: isNaN(cleanNum) ? null : cleanNum,
          prefix: match[1] || "",
          suffix: match[3] || "",
        };
      }
    }
    return { num: null, prefix: "", suffix: "" };
  };

  const { num, prefix, suffix } = parseNumericValue(value);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-card hover-lift relative overflow-hidden rounded-[28px] p-6 shadow-sm transition-all"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-600">
          {title}
        </p>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 shadow-inner">
          {icon}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {num !== null ? (
            <CountUp
              start={0}
              end={num}
              duration={2.2}
              separator=","
              decimals={num % 1 !== 0 ? 2 : 0}
              prefix={prefix}
              suffix={suffix}
            />
          ) : (
            value || "—"
          )}
        </h3>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs font-medium">
        <span className="text-slate-500">{subtitle}</span>
        {trend && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-600 font-semibold border border-emerald-100">
            ↑ {trend}
          </span>
        )}
      </div>
    </motion.div>
  );
}




