"use client";
import React, { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut, UserCircle, Shield, Bell, CreditCard, HelpCircle } from "lucide-react";
import { useAuth } from "@/app/utils/contexts/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/signin");
    } catch (error) {
      toast.error("Error logging out");
    }
    setIsOpen(false);
  };

  // Check if user is admin
  const isAdmin = user?.Role && Array.isArray(user.Role) && user.Role.includes("Admin");

  const menuItems = [
    { icon: UserCircle, label: "My Profile", action: () => router.push("/profile") },
    { icon: Settings, label: "Account Settings", action: () => router.push("/settings") },
    ...(isAdmin ? [{ icon: Shield, label: "Admin Panel", action: () => router.push("/dashboard/admin") }] : []),
    { icon: Bell, label: "Notifications", action: () => router.push("/notifications") },
    { icon: CreditCard, label: "Billing", action: () => router.push("/billing") },
    { icon: Shield, label: "Privacy & Security", action: () => router.push("/privacy") },
    { icon: HelpCircle, label: "Help & Support", action: () => router.push("/help") },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200">
        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <div className="hidden lg:block text-left">
          <p className="text-sm font-medium text-white">{user?.given_name}</p>
          <p className="text-xs text-white/70">{user?.email}</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200 max-w-[90vw]">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user?.given_name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-xs text-green-600 font-medium">{isAdmin ? "Admin" : "User"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2 max-h-64 overflow-y-auto">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3">
                <item.icon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 truncate">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Logout Section */}
          <div className="border-t border-gray-100 pt-2">
            <button onClick={handleLogout} className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors duration-200 flex items-center space-x-3 text-red-600">
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
