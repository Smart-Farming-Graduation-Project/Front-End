import { ReactNode } from "react";
import Sidebar from "../components/dashboard/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen gap-2">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
