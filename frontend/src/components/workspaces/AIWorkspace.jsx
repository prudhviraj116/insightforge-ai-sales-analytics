import React from "react";
import { motion } from "framer-motion";
import {
  FaBrain,
  FaRobot,
  FaArrowUp,
  FaExclamationTriangle,
  FaCube,
  FaGlobe,
  FaMagic
} from "react-icons/fa";

import GrowthCard from "../ai/cards/GrowthCard";
import RiskCard from "../ai/cards/RiskCard";
import ProductStrategyCard from "../ai/cards/ProductStrategyCard";
import RegionStrategyCard from "../ai/cards/RegionStrategyCard";
import ActionPlanCard from "../ai/cards/ActionPlanCard";

function AIWorkspace({ insights, openInsight }) {

  return (

    <motion.div
      initial={{opacity:0,y:25}}
      animate={{opacity:1,y:0}}
      transition={{duration:.45}}
      className="space-y-8"
    >

      {/* Hero */}

      <div className="rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-8 text-white shadow-xl">

        <div className="flex items-center gap-3">

          <FaBrain size={42}/>

          <div>

            <p className="uppercase tracking-[0.35em] text-xs font-bold">

              Executive AI

            </p>

            <h2 className="text-3xl font-bold mt-2">

              AI Business Intelligence Center

            </h2>

          </div>

        </div>

        <p className="mt-5 max-w-4xl leading-7 text-purple-100">

          Your AI executive analyst has reviewed the uploaded sales data
          and generated strategic recommendations, growth opportunities,
          business risks and executive action plans.

        </p>

      </div>

      {/* AI Summary */}

      <div className="rounded-3xl bg-white p-7 shadow-lg">

        <div className="flex items-center gap-3">

          <FaRobot className="text-purple-600 text-3xl"/>

          <h2 className="text-2xl font-bold">

            Executive Summary

          </h2>

        </div>

        <p className="mt-6 leading-8 text-slate-600">

          AI has analyzed your uploaded business data and generated
          recommendations based on product performance, regional revenue,
          growth patterns and potential business risks.

        </p>

      </div>

      {/* AI Cards */}

      <div className="grid gap-6 lg:grid-cols-2">

        <GrowthCard
          data={insights?.growth_analysis}
        />

        <RiskCard
          data={insights?.risk_analysis}
        />

        <ProductStrategyCard
          data={insights?.product_strategy}
        />

        <RegionStrategyCard
          data={insights?.regional_strategy}
        />

      </div>

      {/* Executive Plan */}

      <ActionPlanCard
        actions={insights?.executive_actions}
      />

      {/* Bottom Section */}

      <div className="grid lg:grid-cols-4 gap-6">

        <div className="rounded-3xl bg-gradient-to-br from-purple-500 to-violet-600 p-6 text-white">

          <FaArrowUp size={34}/>

          <h3 className="mt-5 font-bold">

            Growth

          </h3>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-pink-500 to-purple-600 p-6 text-white">

          <FaExclamationTriangle size={34}/>

          <h3 className="mt-5 font-bold">

            Risks

          </h3>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white">

          <FaCube size={34}/>

          <h3 className="mt-5 font-bold">

            Products

          </h3>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-600 p-6 text-white">

          <FaGlobe size={34}/>

          <h3 className="mt-5 font-bold">

            Regions

          </h3>

        </div>

      </div>

      {/* CTA */}

      <div className="rounded-3xl bg-white p-8 shadow-lg flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">

            Need a complete AI report?

          </h2>

          <p className="mt-2 text-slate-500">

            Generate an executive business report with one click.

          </p>

        </div>

        <button

          onClick={openInsight}

          className="rounded-2xl bg-purple-600 px-8 py-4 text-white font-bold hover:bg-purple-700 transition"

        >

          <FaMagic className="inline mr-2"/>

          Generate Report

        </button>

      </div>

    </motion.div>

  );

}

export default AIWorkspace;