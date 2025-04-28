export const CHART_COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
];

export const NAV_TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "analytics", label: "Analytics" },
  { id: "fields", label: "Field Management" },
  { id: "equipment", label: "Equipment" },
  { id: "reports", label: "Reports" },
  { id: "liveMonitoring", label: "Live Monitoring" },
];

export const ALERT_SEVERITY_STYLES = {
  high: "border-red-500 bg-red-50",
  medium: "border-yellow-500 bg-yellow-50",
  low: "border-blue-500 bg-blue-50",
};

export const EQUIPMENT_STATUS_STYLES = {
  Active: "text-green-600",
  Maintenance: "text-red-600",
  Idle: "text-gray-600",
  Error: "bg-red-100 text-red-800",
};

export const FIELD_STATUS_STYLES = {
  Growing: "bg-green-500 text-white",
  Harvested: "bg-yellow-500 text-white",
  Planted: "bg-blue-500 text-white",
  Fallow: "bg-gray-500 text-white",
  Preparing: "bg-purple-500 text-white",
  default: "bg-gray-300 text-black",
};
