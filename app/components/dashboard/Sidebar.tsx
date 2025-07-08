"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { GiCrystalBall, GiMagicHat } from "react-icons/gi";
import { RiAdminFill } from "react-icons/ri";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbPlant2, TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand, TbVirusSearch } from "react-icons/tb";
import { FaPeopleGroup, FaTractor } from "react-icons/fa6";
import logo from "../../assets/images/Logo.png";
import Image from "next/image";
import { useMobileContext } from "@/app/utils/contexts/MobileHandler";
import { AlertTriangle } from "lucide-react";

const Sidebar = () => {
  const { isMobile } = useMobileContext();
  const pathname = usePathname(); // Get current pathname

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  // Update active link when pathname changes
  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  // Set initial sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
    if (isMobile) setIsSidebarOpen(false);
  };

  // Helper function to check if a link is active
  const isActiveLink = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/dashboard/farmDashboard";
    }
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <div className="relative">
      {isMobile && (
        <button onClick={toggleSidebar} className="fixed top-4 left-4 z-50 p-2 bg-gradient-to-r from-[#033d20] to-green text-[#9CA3AF] hover:text-white rounded-lg focus:outline-none">
          <TbLayoutSidebarLeftExpand size={24} />
        </button>
      )}
      <div
        className={`p-2 bg-gradient-to-r from-[#033d20] to-green shadow-lg transition-all duration-300 ${isSidebarOpen ? "w-56" : "w-[72px]"} ${
          isMobile ? (isSidebarOpen ? "fixed top-0 left-0 z-50 h-full" : "hidden") : "sticky top-0 h-screen min-h-full"
        }`}>
        <div className="p-4 text-[#9CA3AF] hover:text-white transition-all duration-300">
          <button onClick={toggleSidebar} className="focus:outline-none flex items-center w-full">
            {isSidebarOpen ? (
              <div className="flex items-center justify-between w-full">
                <Image src={logo} alt="logo" width={80} height={80} className="w-28 object-contain" sizes="112px" />
                <TbLayoutSidebarLeftCollapse size={24} />
              </div>
            ) : (
              !isMobile && <TbLayoutSidebarLeftExpand size={24} />
            )}
          </button>
        </div>
        <ul className="mt-4">
          <li className="mb-4">
            <Link
              href="/dashboard"
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 transition-colors duration-200 ${isActiveLink("/dashboard") ? "bg-white text-green rounded-lg" : "text-[#9CA3AF] hover:text-white"}`}
              title="Farm Dashboard"
              onClick={() => handleLinkClick("/dashboard")}>
              <TbPlant2 size={20} />
              {isSidebarOpen && <span className="text-sm">Farm Dashboard</span>}
            </Link>
          </li>

          <li className="mb-4">
            <Link
              href="/dashboard/farmAlerts"
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 transition-colors duration-200 ${isActiveLink("/dashboard/farmAlerts") ? "bg-white text-green rounded-lg" : "text-[#9CA3AF] hover:text-white"}`}
              title="Farm Alerts"
              onClick={() => handleLinkClick("/dashboard/farmAlerts")}>
              <AlertTriangle className="w-5 h-5" />
              {isSidebarOpen && <span className="text-sm">Farm Alerts</span>}
            </Link>
          </li>

          <li className="mb-4">
            <Link
              href="/dashboard/live"
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 transition-colors duration-200 ${isActiveLink("/dashboard/live") ? "bg-white text-green rounded-lg" : "text-[#9CA3AF] hover:text-white"}`}
              title="Live"
              onClick={() => handleLinkClick("/dashboard/live")}>
              <MdOutlineTrackChanges size={20} />
              {isSidebarOpen && <span className="text-sm">Live Tracking</span>}
            </Link>
          </li>

          <li className="mb-4">
            <Link
              href="/dashboard/ai"
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 transition-colors duration-200 ${isActiveLink("/dashboard/ai") ? "bg-white text-green rounded-lg" : "text-[#9CA3AF] hover:text-white"}`}
              title="Ai Model"
              onClick={() => handleLinkClick("/dashboard/ai")}>
              <TbVirusSearch size={20} />
              {isSidebarOpen && <span className="text-sm">Ai Model</span>}
            </Link>
          </li>

          <li className="mb-4">
            <Link
              href="/dashboard/predictions"
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 transition-colors duration-200 ${isActiveLink("/dashboard/predictions") ? "bg-white text-green rounded-lg" : "text-[#9CA3AF] hover:text-white"}`}
              title="Chat"
              onClick={() => handleLinkClick("/dashboard/predictions")}>
              <GiCrystalBall size={20} />
              {isSidebarOpen && <span className="text-sm">Predictions</span>}
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/dashboard/rovers"
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 transition-colors duration-200 ${isActiveLink("/dashboard/rovers") ? "bg-white text-green rounded-lg" : "text-[#9CA3AF] hover:text-white"}`}
              title="Chat"
              onClick={() => handleLinkClick("/dashboard/rovers")}>
              <FaTractor size={20} />
              {isSidebarOpen && <span className="text-sm">Rovers</span>}
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/dashboard/chat"
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 transition-colors duration-200 ${isActiveLink("/dashboard/chat") ? "bg-white text-green rounded-lg" : "text-[#9CA3AF] hover:text-white"}`}
              title="Chat"
              onClick={() => handleLinkClick("/dashboard/chat")}>
              <GiMagicHat size={20} />
              {isSidebarOpen && <span className="text-sm">Chat</span>}
            </Link>
          </li>

          <li className="mb-4">
            <Link
              href="/dashboard/community"
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 transition-colors duration-200 ${isActiveLink("/dashboard/community") ? "bg-white text-green rounded-lg" : "text-[#9CA3AF] hover:text-white"}`}
              title="Community"
              onClick={() => handleLinkClick("/dashboard/community")}>
              <FaPeopleGroup size={20} />
              {isSidebarOpen && <span className="text-sm">Community</span>}
            </Link>
          </li>

          <li className="mb-4">
            <Link
              href="/dashboard/admin"
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 transition-colors duration-200 ${isActiveLink("/dashboard/admin") ? "bg-white text-green rounded-lg" : "text-[#9CA3AF] hover:text-white"}`}
              title="Admin Panel"
              onClick={() => handleLinkClick("/dashboard/admin")}>
              <RiAdminFill size={20} />
              {isSidebarOpen && <span className="text-sm">Admin Panel</span>}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
