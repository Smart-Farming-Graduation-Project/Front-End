"use client";
import React from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSun,
  CloudLightning,
  CloudDrizzle,
  Snowflake,
} from "lucide-react";
export const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case "sunny":
      return <Sun className="w-8 h-8 text-yellow-500" />;
    case "cloudy":
      return <Cloud className="w-8 h-8 text-gray-400" />;
    case "rainy":
      return <CloudRain className="w-8 h-8 text-blue-400" />;
    case "partly cloudy":
      return <CloudSun className="w-8 h-8 text-gray-400" />;
    case "thunderstorm":
      return <CloudLightning className="w-8 h-8 text-purple-500" />;
    case "foggy":
      return <CloudDrizzle className="w-8 h-8 text-gray-300" />;
    case "snow":
      return <Snowflake className="w-8 h-8 text-blue-200" />;
    default:
      return <Sun className="w-8 h-8 text-yellow-500" />;
  }
};

// // Generate initial weather data
// export const generateInitialWeather = () => ({
//   temperature: 24,
//   humidity: 65,
//   windSpeed: 12,
//   condition: "Partly Cloudy",
//   location: "Argi Farm",
//   lastUpdated: new Date().toLocaleTimeString(),
//   uvIndex: Math.floor(Math.random() * 10) + 1,
//   pressure: Math.floor(Math.random() * 60) + 980,
// });
