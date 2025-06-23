"use client";

import React from "react";
import AdminGuard from "@/app/utils/contexts/AdminGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminGuard>{children}</AdminGuard>;
}