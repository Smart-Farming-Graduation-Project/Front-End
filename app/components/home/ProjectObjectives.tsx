"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaDatabase, FaRobot, FaPuzzlePiece, FaLightbulb, FaUserFriends, FaLeaf, FaAward } from "react-icons/fa";

const ProjectObjectives = () => {
  const objectives = [
    {
      icon: <FaChartLine className="text-white text-2xl" />,
      title: "Enhance Agricultural Efficiency",
      description: "Boost farming productivity through smart automation and real-time environmental monitoring.",
    },
    {
      icon: <FaDatabase className="text-white text-2xl" />,
      title: "Data-Driven Decision Making",
      description: "Provide actionable insights for optimizing irrigation, soil health, and crop management.",
    },
    {
      icon: <FaRobot className="text-white text-2xl" />,
      title: "Intelligent Navigation & Control",
      description: "Enable efficient field operations with autonomous path planning and precision movement.",
    },
    {
      icon: <FaPuzzlePiece className="text-white text-2xl" />,
      title: "Modular Design & Compatibility",
      description: "Create adaptable systems that integrate with various farm types and agricultural tasks.",
    },
    {
      icon: <FaLightbulb className="text-white text-2xl" />,
      title: "Knowledge Sharing",
      description: "Empower farmers with real-time data, historical trends, and agricultural best practices.",
    },
    {
      icon: <FaUserFriends className="text-white text-2xl" />,
      title: "Optimize User Experience",
      description: "Provide intuitive interfaces for monitoring rover status and environmental readings.",
    },
    {
      icon: <FaLeaf className="text-white text-2xl" />,
      title: "Promote Sustainability",
      description: "Raise awareness about sustainable, tech-enabled agriculture and resource optimization.",
    },
    {
      icon: <FaAward className="text-white text-2xl" />,
      title: "Technological Leadership",
      description: "Set new benchmarks in precision agriculture by blending embedded systems, AI, and environmental science.",
    },
  ];

  return (
    <section className="py-20 text-white">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Project Objectives</h2>
          <p className="text-xl max-w-3xl mx-auto opacity-90">CropGuard aims to transform agricultural practices through these core objectives, combining technology with sustainable farming principles.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {objectives.map((objective, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}>
              <div className="bg-green-600 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-5">{objective.icon}</div>
              <h3 className="text-xl font-bold mb-3 opacity-90">{objective.title}</h3>
              <p className="">{objective.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectObjectives;
