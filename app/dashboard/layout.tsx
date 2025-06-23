"use client";

import AdminGuard from "@/app/utils/contexts/AdminGuard";
import { ReactNode } from "react";
import Sidebar from "../components/dashboard/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <AdminGuard>
      <div className="flex min-h-screen gap-2">
        <Sidebar />
        {children}
      </div>
    </AdminGuard>
  );
};

export default Layout;
