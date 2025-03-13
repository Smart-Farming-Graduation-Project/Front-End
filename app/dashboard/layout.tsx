import { ReactNode } from "react";
import Sidebar from "../components/dashboard/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen bg-[#f0f0f0]">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
