"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Heading from "../components/utils/Heading";
import Crumb from "../components/banner/Crumb";
import img_about from "../assets/images/landing.jpeg";
import { AppDispatch, RootState } from "../utils/redux/store/store";
import CheckoutAmout from "./CheckoutAmout";
import CartItem from "./CartItem";
import { Button } from "@/components/ui/button";
import { fetchCart } from "../utils/redux/slices/CartSlice";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const carts = useSelector((state: RootState) => state.carts.carts);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const total = carts.reduce((acc, product) => {
    return acc + product.productPrice * product.quantity;
  }, 0).toFixed(2);

  return (
    <div className="cart relative">
      <Crumb crumb={img_about} />
      <div className="mt-8">
        <Heading heading="Your Cart Summary" paragraph="Find your favorite products Enjoy seamless shopping!" />
      </div>
      <div className="container">
        {carts.length > 0 ? (
          <>
            <h4 className="text-2xl">{carts.length} Items In Cart</h4>
            <div className="cart-container my-8 flex flex-1 gap-8 justify-center lg:justify-start items-center lg:items-start flex-col lg:flex-row">
              <div className="items flex flex-1 flex-col w-full">
                {carts.map((product) => (
                  <CartItem key={product.productId} product={product} />
                ))}
              </div>

              <CheckoutAmout total={parseFloat(total)} itemsCount={carts.length} />
            </div>
          </>
        ) : (
          <div className="empty-cart flex flex-col items-center justify-center h-[30vh]">
            <p className="text-lg text-gray-600 mb-8">Your cart is currently empty.</p>
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
