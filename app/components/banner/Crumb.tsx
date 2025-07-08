"use client";
import Image, { StaticImageData } from "next/image";
import { usePathname, useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./Crumb.css";
import API_BASE_URL from "@/app/utils/api/base";
import { getTokenClient } from "@/app/utils/api/getTokenClient";

interface Props {
  crumb: StaticImageData;
  productName?: string;
  categoryName?: string;
}

const Crumb = ({ crumb, productName, categoryName }: Props) => {
  const pathname = usePathname().slice(1).replaceAll("/", " - ").split(" ").slice(0, 3).join(" ");
  const { category } = useParams();
  const token = getTokenClient();
  const categoryId = Array.isArray(category) ? category[0] : category;

  const [catName, setCategoryName] = useState(categoryName ? categoryName : "");

  const fetchCategoryName = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Category/Category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategoryName(response.data.data.categoryName);
    } catch (error) {
      console.error("Error fetching category name:", error);
    }
  }, [categoryId, token]);
  
  useEffect(() => {
    if (!categoryName && categoryId) {
      fetchCategoryName();
    }
  }, [categoryName, categoryId, fetchCategoryName]);

  const getCrumbText = () => {
    if (pathname.startsWith("shop")) {
      return `Shop - ${catName} ${productName ? "- " + productName : ""}`;
    }
    return pathname;
  };

  return (
    <div className="crumb relative">
      <div className="crumb-img h-[300px] md:h-[400px] w-full relative">
        <Image 
          src={crumb} 
          alt="crumb" 
          width={1920} 
          height={400} 
          className="object-cover h-full w-full" 
          sizes="100vw" 
        />
        <div className="crumb-overlay"></div>
      </div>
      <div className="crumb-text absolute inset-0 flex items-center justify-center z-10">
        <h1 className="text-white text-3xl breadcrumb-text">{getCrumbText()}</h1>
      </div>
    </div>
  );
};

export default Crumb;
