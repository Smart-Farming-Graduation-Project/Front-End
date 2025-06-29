"use client";

import React from "react";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Card from "../utils/Card";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import Heading from "../utils/Heading";
import { Product } from "@/app/utils/types/app";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

interface mostSellsProps {
  mostSells: Product[] | null;
}

const LatestProducts: React.FC<mostSellsProps> = ({ mostSells }) => {
  // const products: Product[] = [
  //   {
  //     productId: 1,
  //     productName: "Organic Apples",
  //     description: "Fresh organic apples from our farm.",
  //     price: 5.99,
  //     availability: "In Stock",
  //     categoryName: "Fruits",
  //     images: ["/apples.png"],
  //   },
  // ];
  if (!mostSells || mostSells.length === 0) {
    return (
      <div className="shop-by-category p-sec text-center">
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  // Ensure we only show maximum 10 products
  const displayProducts = mostSells.slice(0, 10);

  return (
    <section className="LatestProducts p-sec bg-light-green-section">
      <Heading paragraph="Latest Products" heading="Latest Products" />
      <div className="container">
        <Swiper
          modules={[Navigation, Scrollbar]}
          spaceBetween={40}
          slidesPerView={1.2}
          navigation={{
            nextEl: ".right-arrow",
            prevEl: ".left-arrow",
          }}
          scrollbar={{
            el: ".scroll-pagination",
            draggable: true,
          }}
          breakpoints={{
            600: {
              slidesPerView: 2.3,
            },
            1000: {
              slidesPerView: 3.3,
            },
            1440: {
              slidesPerView: 4.5,
            },
          }}>
          {displayProducts.map((product) => (
            <SwiperSlide key={product.productId}>
              <Card product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="arrows px-4 flex items-center justify-center gap-4 mt-4">
          <div className="left-arrow bg-white w-fit rounded-full shadow-md p-2 cursor-pointer z-10">
            <FaArrowLeft className="text-[20px]" />
          </div>
          <div className="right-arrow bg-white w-fit  rounded-full shadow-md p-2 cursor-pointer z-10">
            <FaArrowRight className="text-[20px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;
