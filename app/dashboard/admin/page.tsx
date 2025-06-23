"use client";
import Manage_Categories from "@/app/components/dashboard/Admin/Manage_Categries";
import Manage_Orders from "@/app/components/dashboard/Admin/Manage_Orders";
import Manage_Products from "@/app/components/dashboard/Admin/Manage_Products";
import Manage_Users from "@/app/components/dashboard/Admin/Manage_Users";
import { useAuth } from "@/app/utils/contexts/AuthContext";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getTokenClient } from "@/app/utils/api/getTokenClient";
import API_BASE_URL from "@/app/utils/api/base";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("products");
  const { user } = useAuth();
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    users: 0,
    orders: 0,
  });

  const tabs = [
    { id: "users", label: "Users", content: <Manage_Users /> },
    { id: "products", label: "Products", content: <Manage_Products /> },
    { id: "categories", label: "Categories", content: <Manage_Categories /> },
    { id: "orders", label: "Orders", content: <Manage_Orders /> },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      const token = getTokenClient();
      if (!token) return;

      try {
        // Fetch real stats from APIs
        const [usersRes, productsRes, categoriesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/User/GetUsers?pageNumber=1&pageSize=1`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE_URL}/Product/ProductsList`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE_URL}/Category/CategoryList`),
        ]);

        setStats({
          users: usersRes.data.meta?.["Total Count"] || 0,
          products: Array.isArray(productsRes.data.data) ? productsRes.data.data.length : 0,
          categories: Array.isArray(categoriesRes.data.data) ? categoriesRes.data.data.length : 0,
          orders: 128, // Replace with real orders count when API is available
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex-1 min-h-screen overflow-x-hidden">
      <div className="p-2 mt-12 md:mt-0">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-bold">Admin Dashboard</h1>
          <span className="bg-green px-2 py-0.5 text-white text-xs rounded-full">Admin</span>
        </div>
        <span className="block h-1 w-14 bg-green rounded-lg"></span>
      </div>

      <div className="w-full px-2 md:px-4 mt-6 max-w-full overflow-hidden">
        {/* Admin info summary */}
        <div className="bg-white rounded-lg shadow-sm p-3 md:p-4 mb-6 w-full">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="font-semibold text-base md:text-lg">Welcome, {user?.given_name || "Admin"}</h2>
              <p className="text-gray-600 text-sm md:text-base">Manage your store products, categories and users</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              <div className="bg-blue-50 px-2 md:px-4 py-2 rounded-lg text-center">
                <p className="text-xs md:text-sm text-gray-600">Products</p>
                <p className="font-bold text-lg md:text-xl">{stats.products}</p>
              </div>
              <div className="bg-green-50 px-2 md:px-4 py-2 rounded-lg text-center">
                <p className="text-xs md:text-sm text-gray-600">Categories</p>
                <p className="font-bold text-lg md:text-xl">{stats.categories}</p>
              </div>
              <div className="bg-amber-50 px-2 md:px-4 py-2 rounded-lg text-center">
                <p className="text-xs md:text-sm text-gray-600">Users</p>
                <p className="font-bold text-lg md:text-xl">{stats.users}</p>
              </div>
              <div className="bg-red-50 px-2 md:px-4 py-2 rounded-lg text-center">
                <p className="text-xs md:text-sm text-gray-600">Orders</p>
                <p className="font-bold text-lg md:text-xl">{stats.orders}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="w-full max-w-full mx-auto">
          {/* Tabs List - Mobile Scrollable */}
          <div className="w-full overflow-x-auto">
            <div className="flex min-w-max sm:grid sm:grid-cols-4 gap-2 p-2 bg-[#f3f4f6] rounded-lg">
              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-md transition-colors duration-200 whitespace-nowrap text-sm md:text-base ${
                    activeTab === tab.id
                      ? "bg-green shadow-sm text-white"
                      : "bg-transparent text-[#4b5563] hover:bg-[#e5e7eb]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs Content */}
          <div className="mt-6 w-full overflow-hidden">
            {tabs.map((tab) => (
              <div key={tab.id} className={`w-full ${activeTab === tab.id ? "block" : "hidden"}`}>
                {tab.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
