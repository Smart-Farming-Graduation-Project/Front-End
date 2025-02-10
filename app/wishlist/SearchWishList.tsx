"use client";

import React from "react";

type SearchProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

const SearchBar: React.FC<SearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-bar mb-6 flex justify-center">
      <input type="text" placeholder="Search your wishlist..." className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-[300px]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
  );
};

export default SearchBar;
