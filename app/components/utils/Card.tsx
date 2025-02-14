"use client";

import React, { useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList, removeFromWishList } from "../../utils/redux/slices/wishListSlice";
import toast from "react-hot-toast";
import category_img from "../../assets/images/onions.jpg";
import Image from "next/image";
import { addToCart, removeFromCart } from "@/app/utils/redux/slices/CartSlice";
import { Product } from "@/app/utils/types/app";
import { usePathname } from "next/navigation";
import "./Card.css";
import { FaBagShopping, FaRegHeart } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { useRouter } from "next/navigation";

type CardProps = {
  product: Product;
};

const Card = ({ product }: CardProps) => {
  const { wishList } = useSelector((state: { wishList: { wishList: Product[] } }) => state.wishList);
  const dispatch = useDispatch();
  const pathName = usePathname();
  const router = useRouter();
  const currentPageName = pathName?.split("/").pop();
  const initialFav = wishList.some((prod) => prod.id === product.id) || false;
  const [isfav, setIsfav] = useState<boolean>(initialFav);
  console.log("currentPageName", isfav);
  const trucnkString = (str: string, num: number) => {
    if (str.length > num) return str.slice(0, num) + "...";
    return str;
  };
  return (
    <div
      className="card h-[470px] bg-white border border-[#f5f5f5dc] rounded-xl p-3 relative cursor-pointer flex items-center justify-center flex-col overflow-hidden ease duration-300 hover:shadow-sm"
      onClick={() => router.push(`/shop/category/${product.id}`)}>
      {currentPageName !== "wishlist" ? (
        !isfav ? (
          <div
            className="favorite cursor-pointer "
            onClick={(e) => {
              e.stopPropagation();
              setIsfav(!isfav);
              dispatch(addToWishList(product));
              dispatch(removeFromCart(product.id));
              toast.success("Item added to wishList!");
            }}>
            <FaRegHeart className="text-green text-[18px] fav_false" />
          </div>
        ) : (
          <div
            className="favorite bg-green cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsfav(!isfav);
              dispatch(removeFromWishList(product));
            }}>
            <FaHeart className="text-[18px] fav_false text-white" />
          </div>
        )
      ) : (
        <IoIosClose
          className="close hover:text-green cursor-pointer "
          onClick={(e) => {
            e.stopPropagation();
            dispatch(removeFromWishList(product));
          }}
        />
      )}

      {/* Product Image */}
      <div className="img rounded-2xl overflow-hidden">
        <Image src={category_img} alt={product.name} className="rounded-2xl" width={200} height={220} />
      </div>

      {/* Product Info */}
      <div className="card-info py-5 text-center">
        <h4 className="text-lg font-bold">{product.name}</h4>
        <p className="">{trucnkString(product.description, 150)}</p>
        <span className="flex items-center gap-2 text-xl justify-center my-2">
          <FaStar className="text-[#FFD700]" />
          <span>4.5</span>
        </span>
        <h3 className="text-green font-extrabold text-xl my-3">{product.price} EG</h3>
        <button
          className="py-2 px-4 rounded-[20px] uppercase border border-yellow flex items-center gap-2 justify-center mx-auto mt-4 hover:shadow ease"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCart(product));
            dispatch(removeFromWishList(product));
            toast.success("Item added to cart!");
          }}>
          <FaBagShopping />
          <span className="font-bold text-sm">Add To Cart</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
