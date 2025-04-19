"use client";
import Link from "next/link";
import React, { useState } from "react";
import { GiMagicHat } from "react-icons/gi";
import { RiAdminFill, RiLiveFill } from "react-icons/ri";
import { TbHomeStats, TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { FaPeopleGroup } from "react-icons/fa6";
import logo from "../../assets/images/Logo.png";
import Image from "next/image";
import { useMobileContext } from "@/app/utils/contexts/MobileHandler";

const Sidebar = () => {
  const { isMobile } = useMobileContext();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/dashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
    if (isMobile) setIsSidebarOpen(false);
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
          isMobile ? (isSidebarOpen ? "absolute top-0 left-0 z-50 min-h-screen" : "hidden") : "relative h-screen"
        }`}>
        <div className="p-4 text-[#9CA3AF] hover:text-white transition-all duration-300">
          <button onClick={toggleSidebar} className="focus:outline-none flex items-center w-full">
            {isSidebarOpen ? (
              <div className="flex items-center justify-between w-full">
                <Image src={logo} alt="logo" width={80} height={80} className="w-28 object-contain" />
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
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 ${activeLink === "/dashboard" ? "bg-white text-green rounded-lg" : "text-[#9CA3AF] hover:text-white"}`}
              title="Home"
              onClick={() => handleLinkClick("/dashboard")}>
              <TbHomeStats size={20} />
              {isSidebarOpen && <span className="text-sm">Home</span>}
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/dashboard/live"
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 ${activeLink === "/dashboard/live" ? "bg-white text-green rounded-lg" : "text-[#9CA3AF] hover:text-white"}`}
              title="Live"
              onClick={() => handleLinkClick("/dashboard/live")}>
              <RiLiveFill size={20} />
              {isSidebarOpen && <span className="text-sm">Live</span>}
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/dashboard/chat"
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 ${activeLink === "/dashboard/chat" ? "bg-white text-green rounded-lg" : "text-[#9CA3AF] hover:text-white"}`}
              title="Chat"
              onClick={() => handleLinkClick("/dashboard/chat")}>
              <GiMagicHat size={20} />
              {isSidebarOpen && <span className="text-sm">Chat</span>}
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/dashboard/community"
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 ${activeLink === "/dashboard/community" ? "bg-white text-green rounded-lg" : "text-[#9CA3AF] hover:text-white"}`}
              title="Community"
              onClick={() => handleLinkClick("/dashboard/community")}>
              <FaPeopleGroup size={20} />
              {isSidebarOpen && <span className="text-sm">Community</span>}
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/dashboard/admin"
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 ${activeLink === "/dashboard/admin" ? "bg-white text-green rounded-lg" : "text-[#9CA3AF] hover:text-white"}`}
              title="Admin"
              onClick={() => handleLinkClick("/dashboard/admin")}>
              <RiAdminFill size={20} />
              {isSidebarOpen && <span className="text-sm">Admin</span>}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
