"use client";

import React from "react";
import AdminGuard from "@/app/utils/contexts/AdminGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white">
        <main className="container mx-auto px-4 py-6">{children}</main>
      </div>
    </AdminGuard>
  );
}
