"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaHandHoldingWater, FaPeopleCarry, FaGlobeAfrica } from "react-icons/fa";
import { TbPlant2 } from "react-icons/tb";
import { MdOutlineEco, MdTrendingUp, MdOutlineAgriculture } from "react-icons/md";

const BenefitsImpact = () => {
  const benefits = [
    {
      icon: <TbPlant2 className="text-3xl text-green-600" />,
      title: "Early Disease Detection",
      description: "Identify plant diseases before they spread, reducing crop losses by up to 30%.",
    },
    {
      icon: <FaChartLine className="text-3xl text-green-600" />,
      title: "Increased Yield",
      description: "Optimize growing conditions to improve overall crop productivity and quality.",
    },
    {
      icon: <FaHandHoldingWater className="text-3xl text-green-600" />,
      title: "Resource Optimization",
      description: "Reduce water usage by 20% through precise irrigation recommendations.",
    },
    {
      icon: <MdOutlineEco className="text-3xl text-green-600" />,
      title: "Sustainable Practices",
      description: "Lower chemical usage with targeted interventions instead of broad applications.",
    },
  ];

  const impacts = [
    {
      icon: <MdOutlineAgriculture className="text-3xl text-green-600" />,
      title: "Agricultural Innovation",
      percentage: "85%",
      description: "of users report adopting more modern farming techniques",
    },
    {
      icon: <MdTrendingUp className="text-3xl text-green-600" />,
      title: "Productivity Improvement",
      percentage: "35%",
      description: "average increase in farm productivity",
    },
    {
      icon: <FaPeopleCarry className="text-3xl text-green-600" />,
      title: "Labor Efficiency",
      percentage: "50%",
      description: "reduction in monitoring and inspection labor hours",
    },
    {
      icon: <FaGlobeAfrica className="text-3xl text-green-600" />,
      title: "Environmental Impact",
      percentage: "40%",
      description: "decrease in unnecessary pesticide application",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Benefits & Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">CropGuard delivers tangible agricultural benefits while making a positive impact on sustainability and food security.</p>
        </motion.div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-10 text-center text-gray-800">Key Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div key={index} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <div className="bg-green-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">{benefit.icon}</div>
                <h4 className="text-xl font-bold mb-2 text-gray-800">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }}>
          <h3 className="text-2xl font-bold mb-10 text-center text-gray-800">Measured Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impacts.map((impact, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-b from-green-50 to-white rounded-xl shadow-md p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}>
                <div className="flex justify-center mb-4">{impact.icon}</div>
                <h4 className="text-lg font-semibold mb-3 text-gray-800">{impact.title}</h4>
                <p className="text-4xl font-bold text-green-600 mb-2">{impact.percentage}</p>
                <p className="text-sm text-gray-600">{impact.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsImpact;
