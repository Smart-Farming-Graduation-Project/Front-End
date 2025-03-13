"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { GiMagicHat } from "react-icons/gi";
import { RiAdminFill, RiLiveFill } from "react-icons/ri";
import { TbHomeStats, TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { FaPeopleGroup } from "react-icons/fa6";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/dashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
  };

  return (
    <div className={`p-2 bg-[#03363D] shadow-lg transition-all duration-300 ${isSidebarOpen ? "w-56" : "w-[72px]"}`}>
      <div className="p-4 text-[#9CA3AF] hover:text-white transition-all duration-300">
        <button onClick={toggleSidebar} className="focus:outline-none flex ml-auto">
          {isSidebarOpen ? <TbLayoutSidebarLeftCollapse size={24} /> : <TbLayoutSidebarLeftExpand size={24} />}
        </button>
      </div>
      <ul className="mt-4">
        <li className="mb-4">
          <Link
            href="/dashboard"
            className={`px-4 py-2 cursor-pointer flex items-center gap-2 ${activeLink === "/dashboard" ? "bg-white text-[#03363D] rounded-lg" : "text-[#9CA3AF] hover:text-white"}`}
            title="Home"
            onClick={() => handleLinkClick("/dashboard")}>
            <TbHomeStats size={20} />
            {isSidebarOpen && <span className="text-sm">Home</span>}
          </Link>
        </li>
        <li className="mb-4">
          <Link
            href="/dashboard/live"
            className={`px-4 py-2  cursor-pointer flex items-center gap-2 ${activeLink === "/dashboard/live" ? "bg-white text-[#03363D] rounded-lg" : "text-[#9CA3AF] hover:text-white"}`}
            title="Live"
            onClick={() => handleLinkClick("/dashboard/live")}>
            <RiLiveFill size={20} />
            {isSidebarOpen && <span className="text-sm">Live</span>}
          </Link>
        </li>
        <li className="mb-4">
          <Link
            href="/dashboard/chat"
            className={`px-4 py-2  cursor-pointer flex items-center gap-2 ${activeLink === "/dashboard/chat" ? "bg-white text-[#03363D] rounded-lg" : "text-[#9CA3AF] hover:text-white"}`}
            title="Chat"
            onClick={() => handleLinkClick("/dashboard/chat")}>
            <GiMagicHat size={20} />
            {isSidebarOpen && <span className="text-sm">Chat</span>}
          </Link>
        </li>
        <li className="mb-4">
          <Link
            href="/dashboard/community"
            className={`px-4 py-2 cursor-pointer flex items-center gap-2 ${activeLink === "/dashboard/community" ? "bg-white text-[#03363D] rounded-lg" : "text-[#9CA3AF] hover:text-white"}`}
            title="Community"
            onClick={() => handleLinkClick("/dashboard/community")}>
            <FaPeopleGroup size={20} />
            {isSidebarOpen && <span className="text-sm">Community</span>}
          </Link>
        </li>
        <li className="mb-4">
          <Link
            href="/dashboard/admin"
            className={`px-4 py-2  cursor-pointer flex items-center gap-2 ${activeLink === "/dashboard/admin" ? "bg-white text-[#03363D] rounded-lg" : "text-[#9CA3AF] hover:text-white"}`}
            title="Admin"
            onClick={() => handleLinkClick("/dashboard/admin")}>
            <RiAdminFill size={20} />
            {isSidebarOpen && <span className="text-sm">Admin</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
