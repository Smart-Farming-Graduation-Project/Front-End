"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaSeedling, FaRobot, FaMobileAlt, FaShieldAlt } from "react-icons/fa";
import { MdAutoGraph, MdOutlineCloudSync } from "react-icons/md";
import why_choose from "@/app/assets/images/why-choose.jpeg";

const Why_choose = () => {
  const features = [
    {
      icon: <FaRobot className="text-green text-3xl" />,
      title: "Autonomous Monitoring",
      description: "Our smart rover patrols your fields automatically, collecting vital data without manual intervention.",
    },
    {
      icon: <FaSeedling className="text-green text-3xl" />,
      title: "AI Disease Detection",
      description: "Advanced deep learning models identify plant diseases with over 95% accuracy, enabling early treatment.",
    },
    {
      icon: <MdAutoGraph className="text-green text-3xl" />,
      title: "Precision Agriculture",
      description: "Get field-specific insights that help optimize resources and maximize crop yield.",
    },
    {
      icon: <MdOutlineCloudSync className="text-green text-3xl" />,
      title: "Real-time Data",
      description: "Access critical environmental and plant health information instantly through our cloud platform.",
    },
    {
      icon: <FaMobileAlt className="text-green text-3xl" />,
      title: "Mobile Accessibility",
      description: "Monitor your farm and receive alerts anywhere, anytime through our intuitive mobile application.",
    },
    {
      icon: <FaShieldAlt className="text-green text-3xl" />,
      title: "Crop Protection",
      description: "Prevent yield losses with early detection and targeted intervention recommendations.",
    },
  ];

  return (
    <div className="container mx-auto py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image src={why_choose} alt="Smart Agriculture" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent flex items-end">
              <div className="p-8">
                <h3 className="text-white text-2xl font-bold mb-2">Smart Farming Technology</h3>
                <p className="text-white/90">CropGuard transforms traditional farming with intelligent monitoring and protection systems</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="px-4 lg:px-0">
          <h2 className="text-4xl font-bold mb-6">Why Choose CropGuard?</h2>
          <p className="text-lg text-gray-600 mb-8">CropGuard combines robotics, AI, and IoT to create an integrated smart farming solution that addresses modern agricultural challenges while remaining accessible to farmers of all scales.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div key={index} className="flex gap-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <div className="bg-green-100 rounded-full p-3 h-14 w-14 flex items-center justify-center flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Why_choose;
