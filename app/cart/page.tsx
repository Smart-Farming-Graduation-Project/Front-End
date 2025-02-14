"use client";

import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Heading from "../components/utils/Heading";
import Crumb from "../components/banner/Crumb";
import img_about from "../assets/images/landing.jpeg";
import { RootState } from "../utils/redux/store/store";
import Checkout from "./Checkout";
import CartItem from "./CartItem";
import { Button } from "@/components/ui/button";

const Page = () => {
  const carts = useSelector((state: RootState) => state.carts.carts);

  const total = carts
    .reduce((acc, product) => {
      acc += product.price * product.quantity;
      return acc;
    }, 0)
    .toFixed(2);

  return (
    <div className="cart relative">
      <Crumb crumb={img_about} />
      <div className="container">
        {carts.length > 0 ? (
          <>
            <Heading heading="Your Cart Summary" paragraph="Your Cart Summary" />
            <h4 className="text-2xl">{carts.length} Items In Cart</h4>
            <div className="cart-container my-8 flex flex-1 gap-8 justify-center lg:justify-between items-center lg:items-start flex-col lg:flex-row">
              <div className="items">
                {carts.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </div>

              <Checkout total={parseFloat(total)} />
            </div>
          </>
        ) : (
          <div className="empty-cart flex flex-col items-center justify-center h-[30vh]">
            <p className="text-lg text-gray-600 mb-8">Your wishlist is currently empty.</p>
          </div>
        )}
        <div className=" flex justify-center">
          <Button className="font-normal text-xl py-6 px-6 mb-6">
            <Link href="/shop" className="mx-auto">
              Return To Shop
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
