"use client";
import Manage_Categories from "@/app/components/dashboard/Admin/Manage_Categries";
import Manage_Products from "@/app/components/dashboard/Admin/Manage_Products";
import React, { useState } from "react";
const Admin = () => {
  const [activeTab, setActiveTab] = useState("categories");

  const tabs = [
    { id: "profile", label: "Profile", content: "Make changes to your account." },
    { id: "categories", label: "Categories", content: <Manage_Categories /> },
    { id: "products", label: "Products", content: <Manage_Products /> },
  ];

  return (
    <div className="flex-1 p-2">
      <h1 className="text-2xl font-bold">Admin</h1>
      <span className="block h-1 w-14 bg-green rounded-lg"></span>
      <div className="container mt-4">
        <div className="flex justify-center">
          <div className="w-full max-w-3xl mx-auto">
            {/* Tabs List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-2 bg-[#f3f4f6] rounded-lg">
              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full min-w-0 py-2 rounded-md transition-colors duration-200 ${activeTab === tab.id ? "bg-green shadow-sm text-white" : "bg-transparent text-[#4b5563] hover:bg-[#e5e7eb]"}`}>
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Tabs Content */}
            <div className="text-center mt-4">
              {tabs.map((tab) => (
                <div key={tab.id} className={`${activeTab === tab.id ? "block" : "hidden"}`}>
                  {tab.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
