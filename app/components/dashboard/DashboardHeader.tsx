"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Tractor, Home, BarChart3, Users, MessageCircle, Bot, Settings, Bell, Search, Menu, X, User, LogOut, ChevronDown, Leaf, Monitor, AlertTriangle, UserCog, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ProfileDropdown from "./ProfileDropdown";
import SettingsDropdown from "./SettingsDropdown";

const DashboardHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();
  const pathname = usePathname();

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    // Add logout logic here
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="relative top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-green-200 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Tractor className="w-2.5 h-2.5 text-green-800" />
                </div>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">CropGuard</h1>
                <p className="text-xs text-gray-500 -mt-1">Smart Farming</p>
              </div>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 bg-gray-50 border-gray-200 focus:bg-white focus:border-green-300 transition-all duration-200"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </Button>

            {/* Settings Dropdown */}
            <SettingsDropdown />

            {/* Profile Dropdown */}
            <ProfileDropdown />

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 bg-white/95 backdrop-blur-md">
            {/* Mobile Search */}
            <div className="mt-4 px-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-200" />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
