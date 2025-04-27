"use client";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CHART_COLORS } from "../../utils/constants";
import type { Equipment } from "../../utils/types";
import React from "react";

interface EquipmentUtilizationChartProps {
  equipment: Equipment[];
  isLoading?: boolean;
}

const EquipmentUtilizationChart: React.FC<EquipmentUtilizationChartProps> = ({
  equipment,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="animate-pulse h-64 w-full rounded-lg bg-gray-100" />
      </div>
    );
  }
  if (equipment.length === 0) {
    return (
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center flex flex-col items-center justify-center h-64">
        <svg
          className="w-12 h-12 text-gray-400 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-gray-500">No equipment data available</p>
      </div>
    );
  }
  const safeAverage = (total: number, count: number) =>
    count > 0 ? total / count : 0;

  const data = [
    {
      subject: "Usage Hours",
      value: safeAverage(
        equipment.reduce((sum, eq) => sum + (eq.hoursUsed || 0), 0),
        equipment.length
      ),
      fullMark: 500,
    },
    {
      subject: "Battery Health",
      value: safeAverage(
        equipment.reduce((sum, eq) => sum + (eq.battery || 0), 0),
        equipment.length
      ),
      fullMark: 100,
    },
    {
      subject: "Uptime",
      value:
        (equipment.filter((eq) => eq.status === "Active").length /
          equipment.length) *
          100 || 0,
      fullMark: 100,
    },
    {
      subject: "Connectivity",
      value:
        (equipment.filter((eq) => eq.connectivity === "Online").length /
          equipment.length) *
          100 || 0,
      fullMark: 100,
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-4">Equipment Utilization</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Equipment"
            dataKey="value"
            stroke={CHART_COLORS[0]}
            fill={CHART_COLORS[0]}
            fillOpacity={0.6}
          />
          <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
        </RadarChart>
      </ResponsiveContainer>
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <span>Last updated: {new Date().toLocaleTimeString()}</span>
        <span>{equipment.length} devices</span>
      </div>
    </div>
  );
};

export default EquipmentUtilizationChart;
