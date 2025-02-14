"use client";

import shop_crumb from "@/app/assets/images/shop_crumb.jpg";
import Crumb from "@/app/components/banner/Crumb";
import Card from "@/app/components/utils/Card";
import { Product } from "@/app/utils/types/app";
import React, { useEffect, useMemo, useState } from "react";
import SearchBarCategory from "./SearchCategory";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Category = () => {
  const products: Product[] = useMemo(
    () => [
      {
        id: 1,
        name: "Organic Apples",
        description: "Fresh organic apples from our farm.",
        price: 5.99,
      },
      {
        id: 2,
        name: "Organic Bananas",
        description: "Fresh organic bananas from our farm.",
        price: 3.99,
      },
      {
        id: 3,
        name: "Organic Oranges",
        description: "Fresh organic oranges from our farm.",
        price: 4.99,
      },
      {
        id: 4,
        name: "Organic Apples",
        description: "Fresh organic apples from our farm.",
        price: 5.99,
      },
      {
        id: 5,
        name: "Organic Bananas",
        description: "Fresh organic bananas from our farm.",
        price: 3.99,
      },
      {
        id: 6,
        name: "Organic Oranges",
        description: "Fresh organic oranges from our farm.",
        price: 4.99,
      },
      {
        id: 7,
        name: "Organic Apples",
        description: "Fresh organic apples from our farm.",
        price: 5.99,
      },
      {
        id: 8,
        name: "Organic Bananas",
        description: "Fresh organic bananas from our farm.",
        price: 3.99,
      },
      {
        id: 9,
        name: "Organic Oranges",
        description: "Fresh organic oranges from our farm.",
        price: 4.99,
      },
      {
        id: 10,
        name: "Organic Apples",
        description: "Fresh organic apples from our farm.",
        price: 5.99,
      },
      {
        id: 11,
        name: "Organic Bananas",
        description: "Fresh organic bananas from our farm.",
        price: 3.99,
      },
      {
        id: 12,
        name: "Organic Oranges",
        description: "Fresh organic oranges from our farm.",
        price: 4.99,
      },
    ],
    []
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategory, setFilteredCategory] = useState<Product[]>(products);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const filtered = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredCategory(filtered);
    setCurrentPage(1);
  }, [searchTerm, products]);

  const totalPages = Math.ceil(filteredCategory.length / itemsPerPage);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredCategory.slice(indexOfFirstProduct, indexOfLastProduct);
  return (
    <main className="category-page">
      <Crumb crumb={shop_crumb} />
      <div className="container p-sec">
        <SearchBarCategory searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="category-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.length > 0 ? currentProducts.map((product) => <Card key={product.id} product={product} />) : <p className="text-center text-gray-600 col-span-full">No items match your search.</p>}
        </div>

        <div className="pagination flex justify-center gap-4 items-center py-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-btn text-xl text-gray-700 p-2 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-200">
            <FaArrowLeft />
          </button>
          <span className="text-lg">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="pagination-btn text-xl text-gray-700 p-2 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-200">
            <FaArrowRight />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Category;
