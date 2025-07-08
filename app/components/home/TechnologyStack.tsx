"use client";
import React from "react";
import { motion } from "framer-motion";
import { DiPython, DiReact } from "react-icons/di";
import { SiTensorflow, SiRaspberrypi, SiEspressif, SiDotnet, SiMicrosoftsqlserver } from "react-icons/si";
import { MdSensors, MdSecurity } from "react-icons/md";
import { FaCloud, FaRobot, FaMobileAlt } from "react-icons/fa";

const TechnologyStack = () => {
  const technologies = [
    { name: "TensorFlow", icon: <SiTensorflow size={40} className="text-green-600" />, category: "AI" },
    { name: "Python", icon: <DiPython size={40} className="text-green-600" />, category: "AI" },
    { name: "Raspberry Pi", icon: <SiRaspberrypi size={40} className="text-green-600" />, category: "Hardware" },
    { name: "ESP32", icon: <SiEspressif size={40} className="text-green-600" />, category: "Hardware" },
    { name: "Sensors", icon: <MdSensors size={40} className="text-green-600" />, category: "Hardware" },
    { name: "React", icon: <DiReact size={40} className="text-green-600" />, category: "Frontend" },
    { name: ".NET", icon: <SiDotnet size={40} className="text-green-600" />, category: "Backend" },
    { name: "SQL Server", icon: <SiMicrosoftsqlserver size={40} className="text-green-600" />, category: "Database" },
    { name: "Cloud", icon: <FaCloud size={40} className="text-green-600" />, category: "Infrastructure" },
    { name: "IoT", icon: <FaRobot size={40} className="text-green-600" />, category: "Infrastructure" },
    { name: "Security", icon: <MdSecurity size={40} className="text-green-600" />, category: "Infrastructure" },
    { name: "Mobile App", icon: <FaMobileAlt size={40} className="text-green-600" />, category: "Frontend" },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7 }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Our Technology Stack</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">CropGuard leverages cutting-edge technologies across hardware, software, and cloud infrastructure to deliver a comprehensive agricultural solution.</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-green-50 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}>
                {tech.icon}
                <h3 className="mt-4 font-semibold text-gray-800">{tech.name}</h3>
                <span className="mt-1 text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">{tech.category}</span>
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-12 p-6 bg-green-50 rounded-xl border border-green-100" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.4 }}>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Integration Approach</h3>
            <p className="text-gray-700">
              Our system implements a microservices architecture that enables seamless communication between hardware components and cloud services. The dual-microcontroller design with STM32 and Raspberry Pi ensures efficient data collection and
              processing, while our web and mobile interfaces provide intuitive access to agricultural insights.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;
