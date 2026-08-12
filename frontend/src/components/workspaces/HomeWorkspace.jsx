import React from "react";
import { motion } from "framer-motion";
import {
    FaArrowRight,
    FaChartLine,
    FaCube,
    FaGlobe,
    FaBrain
} from "react-icons/fa";

function HomeWorkspace({ setActiveTab }) {

    const cards=[
        {
            title:"Revenue Intelligence",
            icon:<FaChartLine/>,
            tab:"overview",
            color:"from-purple-500 to-violet-600"
        },
        {
            title:"Product Intelligence",
            icon:<FaCube/>,
            tab:"products",
            color:"from-pink-500 to-purple-600"
        },
        {
            title:"Regional Intelligence",
            icon:<FaGlobe/>,
            tab:"regions",
            color:"from-indigo-500 to-purple-600"
        },
        {
            title:"Executive AI",
            icon:<FaBrain/>,
            tab:"ai",
            color:"from-violet-500 to-fuchsia-600"
        }
    ];

    return(

        <div className="grid lg:grid-cols-2 gap-6">

            {cards.map(card=>(

                <motion.div

                whileHover={{y:-6}}

                key={card.title}

                onClick={()=>setActiveTab(card.tab)}

                className={`cursor-pointer rounded-3xl bg-gradient-to-br ${card.color} p-8 text-white shadow-xl`}

                >

                    <div className="text-5xl">

                        {card.icon}

                    </div>

                    <h2 className="mt-8 text-2xl font-bold">

                        {card.title}

                    </h2>

                    <p className="mt-3 text-purple-100">

                        Click to explore detailed analytics.

                    </p>

                    <div className="mt-10 flex items-center gap-2 font-bold">

                        Open Workspace

                        <FaArrowRight/>

                    </div>

                </motion.div>

            ))}

        </div>

    )

}

export default HomeWorkspace;