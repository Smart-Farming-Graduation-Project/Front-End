"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { GiArtificialIntelligence, GiPlantRoots, GiRadarSweep } from "react-icons/gi";
import { MdOutlineMonitorHeart, MdCloudUpload, MdNotificationsActive } from "react-icons/md";
import { RiRobot2Line } from "react-icons/ri";
import { TbDeviceAnalytics } from "react-icons/tb";
import { FaSeedling } from "react-icons/fa";

const KeyFeatures = () => {
  const features = [
    {
      icon: <GiArtificialIntelligence className="text-green-600 text-5xl" />,
      title: "AI-Powered Disease Detection",
      description: "Our advanced deep learning models identify plant diseases with high accuracy, enabling early intervention and treatment.",
    },
    {
      icon: <RiRobot2Line className="text-green-600 text-5xl" />,
      title: "Autonomous Field Monitoring",
      description: "CropGuard rover navigates fields independently, scanning crops and collecting data without manual intervention.",
    },
    {
      icon: <MdOutlineMonitorHeart className="text-green-600 text-5xl" />,
      title: "Real-Time Environmental Sensing",
      description: "Continuous monitoring of critical parameters like soil moisture, temperature, and humidity for optimal growing conditions.",
    },
    {
      icon: <MdCloudUpload className="text-green-600 text-5xl" />,
      title: "Cloud-Based Analytics",
      description: "All field data is securely uploaded to our cloud platform for comprehensive analysis and historical tracking.",
    },
    {
      icon: <TbDeviceAnalytics className="text-green-600 text-5xl" />,
      title: "Precision Agriculture Insights",
      description: "Receive customized recommendations for resource optimization and yield improvement based on collected data.",
    },
    {
      icon: <MdNotificationsActive className="text-green-600 text-5xl" />,
      title: "Early Warning Alerts",
      description: "Get timely notifications about potential issues before they become serious problems for your crops.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Key Features & Services
          </motion.h2>
          <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
            CropGuard combines cutting-edge technology with agricultural expertise to provide comprehensive crop monitoring and protection services.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border-b-4 border-green-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}>
              <div className="mb-5 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
