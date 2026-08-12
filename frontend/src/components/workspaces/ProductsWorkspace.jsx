import React from "react";
import { motion } from "framer-motion";
import {
  FaCube,
  FaTrophy,
  FaChartLine,
  FaArrowUp
} from "react-icons/fa";

import ProductChart from "../charts/ProductChart";

function ProductsWorkspace({ data }) {

  const products = data?.product_analysis || [];

  return (

    <motion.div

      initial={{ opacity: 0, x: 30 }}

      animate={{ opacity: 1, x: 0 }}

      transition={{ duration: .45 }}

      className="space-y-8"

    >

      {/* Header */}

      <div className="rounded-3xl bg-gradient-to-r from-pink-500 to-purple-600 p-8 text-white shadow-xl">

        <p className="uppercase tracking-[0.35em] text-xs font-bold">

          Product Intelligence

        </p>

        <h2 className="mt-3 text-3xl font-bold">

          Product Performance Dashboard

        </h2>

        <p className="mt-3 text-pink-100 leading-7 max-w-3xl">

          Discover best-selling products,
          identify underperforming items,
          and make smarter inventory decisions.

        </p>

      </div>

      {/* Product Chart */}

      <div className="rounded-3xl bg-white p-6 shadow-lg">

        <h2 className="mb-6 text-xl font-bold text-slate-800">

          Product Revenue

        </h2>

        <ProductChart

          data={products}

        />

      </div>

      {/* Leaderboard */}

      <div className="rounded-3xl bg-white p-6 shadow-lg">

        <div className="flex items-center gap-3">

          <FaTrophy className="text-yellow-500 text-2xl"/>

          <h2 className="text-xl font-bold">

            Top Performing Products

          </h2>

        </div>

        <div className="mt-6 space-y-4">

          {products.slice(0,5).map((item,index)=>(

            <motion.div

              whileHover={{scale:1.01}}

              key={index}

              className="flex justify-between items-center rounded-2xl border border-slate-100 p-5"

            >

              <div>

                <p className="font-bold text-slate-800">

                  {item.product}

                </p>

                <p className="text-sm text-slate-500">

                  Revenue Contributor

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

      {/* AI Suggestions */}

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="rounded-3xl bg-gradient-to-br from-purple-500 to-violet-600 p-6 text-white">

          <FaArrowUp size={34}/>

          <h3 className="mt-5 font-bold text-xl">

            Growth Opportunity

          </h3>

          <p className="mt-3 text-purple-100">

            Increase marketing investment
            for your highest revenue products.

          </p>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white">

          <FaCube size={34}/>

          <h3 className="mt-5 font-bold text-xl">

            Inventory Insight

          </h3>

          <p className="mt-3 text-purple-100">

            Maintain inventory levels
            for your top-performing products.

          </p>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-fuchsia-500 to-purple-600 p-6 text-white">

          <FaChartLine size={34}/>

          <h3 className="mt-5 font-bold text-xl">

            Recommendation

          </h3>

          <p className="mt-3 text-purple-100">

            Bundle high-performing
            products with slower-moving
            inventory.

          </p>

        </div>

      </div>

    </motion.div>

  );

}

export default ProductsWorkspace;