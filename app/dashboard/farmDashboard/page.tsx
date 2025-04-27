"use client";
import React, { useState } from "react";
// import Header from "../../components/dashboard/FarmDashboard/components/common/Header/Header";
import NavTabs from "../../components/dashboard/FarmDashboard/components/common/Header/NavTabs";
import DashboardPage from "../../components/dashboard/FarmDashboard/pages/DashboardPage";
import AnalyticsPage from "../../components/dashboard/FarmDashboard/pages/AnalyticsPage";
import FieldManagementPage from "../../components/dashboard/FarmDashboard/pages/FieldManagementPage";
import ReportsPage from "../../components/dashboard/FarmDashboard/pages/ReportsPage";
import EquipmentPage from "../../components/dashboard/FarmDashboard/pages/EquipmentPage";
import LivePage from "../../components/dashboard/FarmDashboard/pages/LiveMonitoringPage";
import { Providers } from "./Providers";
export default function Home() {
  const [selectedTab, setSelectedTab] = useState("dashboard");

  const renderPage = () => {
    switch (selectedTab) {
      case "dashboard":
        return <DashboardPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "fields":
        return <FieldManagementPage />;
      case "equipment":
        return <EquipmentPage />;
      case "reports":
        return <ReportsPage />;
      case "liveMonitoring":
        return <LivePage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <Providers>
      <div className="flex-1">
        <div className="p-2 mt-12 md:mt-0">
          <h1 className="text-2xl font-bold ">Farm Dashbored</h1>
          <span className="block h-1 w-14 bg-green rounded-lg"></span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <NavTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          {renderPage()}
        </div>
      </div>
    </Providers>
  );
}
