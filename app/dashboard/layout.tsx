"use client";

import AdminGuard from "@/app/utils/contexts/AdminGuard";
import { ReactNode } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <AdminGuard>
      <div className="flex min-h-screen gap-2 bg-gradient-to-br from-green-50 via-blue-50 to-white">
        <Sidebar />
        <div className="container mx-auto px-4 py-6">
          <DashboardHeader />
          {children}
        </div>
      </div>
    </AdminGuard>
  );
};

export default Layout;
