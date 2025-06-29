"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../utils/redux/slices/wishListSlice";
import Card from "../components/utils/Card";
import SearchBar from "./SearchWishList";
import Link from "next/link";
import Crumb from "../components/banner/Crumb";
import img_about from "../assets/images/landing.jpeg";
import Heading from "../components/utils/Heading";
import { Button } from "@/components/ui/button";
import { WishListItem } from "../utils/types/app";
import { AppDispatch } from "../utils/redux/store/store";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { wishList } = useSelector((state: { wishList: { wishList: WishListItem[] } }) => state.wishList);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWishlist, setFilteredWishlist] = useState<WishListItem[]>(wishList);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  useEffect(() => {
    const filtered = wishList.filter((product) => product.productName.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredWishlist(filtered);
  }, [searchTerm, wishList]);

  return (
    <div className="wishlist-page">
      <Crumb crumb={img_about} />
      <div className="container p-sec">
        <Heading heading="Your Wishlist" paragraph="Find your favorite products and save them for later!" />
        {wishList.length > 0 ? (
          <>
            <p className="text-lg text-center text-gray-600 mb-8">{wishList.length > 0 ? `You have ${wishList.length} items in your wishlist.` : "Your wishlist is currently empty."}</p>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="wishlist-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
              {filteredWishlist.length > 0 ? (
                filteredWishlist.map((product) => (
                  <Card
                    key={product.id}
                    product={{
                      productId: product.productId,
                      productName: product.productName,
                      price: product.productPrice,
                      availability: product.productAvailability,
                      images: product.productImages,
                      description: product.productDescription,
                      averageRating: 3.5, // Add default average rating
                    }}
                    currentPageName="wishlist"
                  />
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-full">No items match your search.</p>
              )}
            </div>
          </>
        ) : (
          <div className="empty-wishlist text-center">
            <p className="text-lg text-gray-600 mb-8">Your wishlist is currently empty.</p>
            <Link href="/shop" className=" text-white px-6 py-2 rounded-lg hover:bg-opacity-90">
              Browse Products
            </Link>
          </div>
        )}
        <div className=" flex justify-center">
          <Button className="font-normal text-xl py-6 px-6">
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
