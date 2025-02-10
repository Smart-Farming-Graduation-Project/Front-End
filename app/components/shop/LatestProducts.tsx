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

const LatestProducts = () => {
  const products: Product[] = [
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
  ];

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
          {products.map((product) => (
            <SwiperSlide key={product.id}>
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
