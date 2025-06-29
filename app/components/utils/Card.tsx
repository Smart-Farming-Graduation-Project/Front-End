"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./Card.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/utils/redux/store/store";
import { addToWishlistAPI, removeFromWishlistAPI } from "@/app/utils/redux/slices/wishListSlice";
import { addToCartAPI, deleteProductAPI } from "@/app/utils/redux/slices/CartSlice";
import { Product } from "@/app/utils/types/app";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/utils/contexts/AuthContext";
import toast from "react-hot-toast";
import { Rating } from "@smastrom/react-rating";
import category_img from "../../assets/images/onions.jpg";

const Card = ({ product, currentPageName }: { product: Product; currentPageName?: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useAuth();
  const [isfav, setIsfav] = useState(false);

  const trucnkString = (str: string, num: number) => (str.length > num ? str.slice(0, num) + "..." : str);

  // Check authentication before actions
  const checkAuth = () => {
    if (!user) {
      toast.error("Please login to continue");
      router.push("/signin");
      return false;
    }
    return true;
  };

  return (
    <div
      className="card h-[470px] bg-white border border-[#f5f5f5dc] rounded-xl p-3 relative cursor-pointer flex items-center justify-center flex-col overflow-hidden ease duration-300 hover:shadow-sm"
      onClick={() => router.push(`/shop/category/${product.productId}`)}>
      {currentPageName !== "wishlist" ? (
        !isfav ? (
          <div
            className="favorite cursor-pointer "
            onClick={(e) => {
              e.stopPropagation();
              if (!checkAuth()) return;
              setIsfav(!isfav);
              dispatch(addToWishlistAPI(product));
              dispatch(deleteProductAPI(product.productId));
              toast.success("Item added to wishList!");
            }}>
            <FaRegHeart className="text-green text-[18px] fav_false" />
          </div>
        ) : (
          <div
            className="favorite bg-green cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (!checkAuth()) return;
              setIsfav(!isfav);
              dispatch(removeFromWishlistAPI(product.productId));
            }}>
            <FaHeart className="text-[18px] fav_false text-white" />
          </div>
        )
      ) : (
        <IoIosClose
          className="close hover:text-green cursor-pointer "
          onClick={(e) => {
            e.stopPropagation();
            if (!checkAuth()) return;
            dispatch(removeFromWishlistAPI(product.productId));
          }}
        />
      )}

      {/* Product Image */}
      <div className="img rounded-2xl overflow-hidden">
        <div className="w-full h-[220px] flex items-center justify-center">
          {product.images && product.images.length > 0 ? (
            <Image src={product.images[0]} alt={product.productName} className="rounded-2xl object-contain" width={200} height={220} />
          ) : (
            <Image src={category_img} alt={product.productName} className="rounded-2xl object-contain" width={200} height={220} />
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="card-info py-5 text-center">
        <h4 className="text-lg font-bold">{product.productName}</h4>
        {product.description && <p className="text-sm text-gray-500">{trucnkString(product.description, 50)}</p>}
        <span className="flex items-center gap-[3px] justify-center my-2">
          <Rating style={{ maxWidth: 100 }} value={product.averageRating || 3.5} readOnly />
          <span className="text-md text- mt-[1px]">{product.averageRating || 3.5}</span>
        </span>
        <h3 className="text-green font-extrabold text-xl my-3">{product.price.toFixed(2)} EG</h3>
        <button
          className="py-2 px-4 rounded-[20px] uppercase border border-yellow flex items-center gap-2 justify-center mx-auto mt-4 hover:shadow ease font-[600]"
          onClick={(e) => {
            e.stopPropagation();
            if (!checkAuth()) return;
            dispatch(addToCartAPI({ product }));
            dispatch(removeFromWishlistAPI(product.productId));
            toast.success("Item added to cart!");
          }}>
          <HiOutlineShoppingCart />
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
