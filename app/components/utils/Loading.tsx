"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../assets/images/Logo3.png";

const Loading = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newValue = prev + Math.random() * 5;
        return newValue > 100 ? 100 : newValue;
      });
    }, 150);

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#033d20] to-green z-50">
      <div className="flex flex-col items-center max-w-md text-center">
        <div className="relative mb-8">
          <div className="absolute inset-[-12px] rounded-full bg-white/10 animate-ping"></div>
          <div className="absolute inset-[-6px] rounded-full bg-white/15 animate-pulse"></div>
          <div className="relative z-10 flex items-center justify-center w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm p-4 overflow-hidden border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-rotate-shine"></div>
            <div className="relative w-16 h-16 animate-float">
              <Image src={logo} alt="CropGuard Logo" fill className="object-contain" priority />
            </div>
          </div>
        </div>

        <h2 className="text-white text-xl font-medium mb-3 relative">
          Loading...
        </h2>

        {/* Progress bar */}
        <div className="w-64 h-1.5 bg-white/20 mt-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${loadingProgress}%`,
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.7)",
            }}></div>
        </div>
        <p className="text-white/50 text-sm mt-4">{Math.round(loadingProgress)}%</p>
      </div>
    </div>
  );
};

export default Loading;
