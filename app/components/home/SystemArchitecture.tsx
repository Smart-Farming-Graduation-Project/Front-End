"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import systemArchImg from "@/app/assets/images/system-architecture.png";

const SystemArchitecture = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-10" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <h2 className="text-4xl font-bold mb-6 text-gray-800">System Architecture</h2>
            <p className="text-lg text-gray-600 mb-6">The CropGuard system features a sophisticated architecture that seamlessly integrates hardware and software components to deliver comprehensive agricultural monitoring and protection.</p>

            <div className="space-y-5">
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <span className="text-green-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-gray-800">Data Collection Layer</h3>
                  <p className="text-gray-600">Mobile rover and fixed IoT sensors gather plant images and environmental metrics across your fields.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-gray-800">Processing Layer</h3>
                  <p className="text-gray-600">Our AI algorithms analyze collected data using a dual-microcontroller system with STM32 and Raspberry Pi.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-gray-800">Cloud Integration Layer</h3>
                  <p className="text-gray-600">Processed data is securely transmitted to our cloud platform for storage, advanced analytics, and historical tracking.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <span className="text-green-600 font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-gray-800">User Interface Layer</h3>
                  <p className="text-gray-600">Access insights through our intuitive dashboard and mobile app, with customized alerts and recommendations.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="lg:w-1/2" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="relative rounded-2xl shadow-xl overflow-hidden border-2 border-green-200 hover:shadow-2xl transition-all duration-300">
              <div className="relative w-full pt-[70%]">
                <Image src={systemArchImg} alt="CropGuard System Architecture" fill priority className="object-contain" style={{ padding: "12px" }} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SystemArchitecture;
