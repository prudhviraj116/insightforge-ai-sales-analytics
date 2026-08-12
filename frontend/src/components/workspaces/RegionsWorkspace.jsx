import React from "react";
import { motion } from "framer-motion";
import {
  FaGlobe,
  FaMapLocationDot,
  FaLocationArrow,
  FaChartPie,
  FaArrowTrendUp,
} from "react-icons/fa6";

import RegionChart from "../charts/RegionChart";

function RegionsWorkspace({ data }) {
  const regions = data?.region_analysis || [];

  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45 }}
      className="space-y-8"
    >
      {/* Header */}

      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-500 p-8 text-white shadow-xl">

        <p className="uppercase tracking-[0.35em] text-xs font-bold text-indigo-100">

          Regional Intelligence

        </p>

        <h2 className="mt-3 text-3xl font-bold">

          Geographic Revenue Performance

        </h2>

        <p className="mt-4 max-w-3xl text-indigo-100 leading-7">

          Analyze regional sales performance, identify high-growth markets,
          compare revenue distribution, and uncover expansion opportunities.

        </p>

      </div>

      {/* Region Chart */}

      <div className="rounded-3xl bg-white p-6 shadow-lg">

        <div className="flex items-center gap-3 mb-6">

          <FaChartPie className="text-purple-600 text-2xl"/>

          <h2 className="text-xl font-bold text-slate-800">

            Revenue Distribution

          </h2>

        </div>

        <RegionChart
          data={regions}
        />

      </div>

      {/* Region Leaderboard */}

      <div className="rounded-3xl bg-white p-6 shadow-lg">

        <div className="flex items-center gap-3 mb-6">

          <FaMapLocationDot className="text-purple-600 text-2xl"/>

          <h2 className="text-xl font-bold">

            Top Revenue Regions

          </h2>

        </div>

        <div className="space-y-4">

          {regions.map((item,index)=>(

            <motion.div

              key={index}

              whileHover={{scale:1.01}}

              className="flex justify-between items-center rounded-2xl border border-slate-100 p-5"

            >

              <div>

                <p className="font-bold text-slate-800">

                  {item.region}

                </p>

                <p className="text-sm text-slate-500">

                  Regional Market

                </p>

              </div>

              <div className="text-right">

                <p className="font-bold text-purple-600">

                  ${item.revenue?.toLocaleString()}

                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

      {/* Insight Cards */}

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="rounded-3xl bg-gradient-to-br from-purple-500 to-violet-600 p-6 text-white">

          <FaArrowTrendUp size={34}/>

          <h3 className="mt-5 text-xl font-bold">

            Growth Region

          </h3>

          <p className="mt-3 text-purple-100">

            Focus additional marketing spend in your highest-performing region.

          </p>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white">

          <FaLocationArrow size={34}/>

          <h3 className="mt-5 text-xl font-bold">

            Expansion Opportunity

          </h3>

          <p className="mt-3 text-purple-100">

            Regions with lower revenue may represent untapped markets.

          </p>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-fuchsia-500 to-purple-600 p-6 text-white">

          <FaGlobe size={34}/>

          <h3 className="mt-5 text-xl font-bold">

            Executive Recommendation

          </h3>

          <p className="mt-3 text-purple-100">

            Optimize regional campaigns based on customer demand and sales trends.

          </p>

        </div>

      </div>

    </motion.div>
  );
}

export default RegionsWorkspace;