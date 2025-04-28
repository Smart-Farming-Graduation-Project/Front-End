"use client";
import { Tractor } from "lucide-react";

import SearchBar from "./SearchBar";
import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Tractor className="h-8 w-8 text-green-600 mr-2" />
          <h1 className="text-xl font-bold text-gray-800">AgriTech</h1>
        </div>
        <div className="flex items-center space-x-4">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};
export default Header;
