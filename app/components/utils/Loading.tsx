"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../assets/images/Logo3.png";

const Loading = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newValue = prev + Math.random() * 40 + 20; // Double the speed
        return newValue > 100 ? 100 : newValue;
      });
    }, 75); // Half the interval time

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#033d20] to-green z-50">
      <div className="flex flex-col items-center max-w-md text-center">
        <div className="relative mb-4">
          {/* Simplified animations for better performance */}
          <div className="relative z-10 flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm p-3 overflow-hidden border border-white/20">
            <div className="relative w-14 h-14">
              <Image src={logo} alt="CropGuard Logo" fill sizes="56px" className="object-contain" priority />
            </div>
          </div>
        </div>

        <h2 className="text-white text-lg font-medium mb-2 relative">Loading...</h2>

        {/* Progress bar */}
        <div className="w-56 h-1.5 bg-white/20 mt-1 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-150 ease-out"
            style={{
              width: `${loadingProgress}%`,
            }}></div>
        </div>
        <p className="text-white/50 text-sm mt-4">{Math.round(loadingProgress)}%</p>
      </div>
    </div>
  );
};

export default Loading;
