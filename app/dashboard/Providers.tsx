"use client";

import { FarmDataProvider } from "./../components/dashboard/FarmDashboard/contexts/FarmDataContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <FarmDataProvider>{children}</FarmDataProvider>;
}
