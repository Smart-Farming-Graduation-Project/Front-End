// app/components/shop/Category.tsx

"use client";

import React, { useEffect, useState } from "react";
import shop_crumb from "@/app/assets/images/shop_crumb.jpg";
import Crumb from "@/app/components/banner/Crumb";
import Card from "@/app/components/utils/Card";
import { Product } from "@/app/utils/types/app";
import SearchBarCategory from "./SearchCategory";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useParams } from "next/navigation";
import { getTokenClient } from "@/app/utils/api/getTokenClient";
import axios from "axios";
import API_BASE_URL from "@/app/utils/api/base";
const Category = () => {
  const { category } = useParams();
  const token = getTokenClient();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategory, setFilteredCategory] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const categoryId = Array.isArray(category) ? category[0] : category;
  console.log("token" , token)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/Category/Category/${categoryId}`, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
        });
        setProducts(response.data.data.products);
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategory(filtered);
    setCurrentPage(1);
  }, [searchTerm, products]);

  const totalPages = Math.ceil(filteredCategory.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredCategory.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <main className="category-page">
      <Crumb crumb={shop_crumb} />
      <div className="container p-sec">
        <SearchBarCategory
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className="category-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <Card key={product.productId} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No items match your search.
            </p>
          )}
        </div>
        {currentProducts.length > 0 && (
          <div className="pagination flex justify-center gap-4 items-center py-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-btn text-xl text-gray-700 p-2 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-200"
            >
              <FaArrowLeft />
            </button>
            <span className="text-lg">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="pagination-btn text-xl text-gray-700 p-2 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-200"
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Category;
