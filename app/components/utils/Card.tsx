"use client";
import React, { useEffect, useState } from "react";
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
import { useAuth } from "@/app/utils/contexts/AuthContext"; // Add this import
import toast from "react-hot-toast";
import { Rating } from "@smastrom/react-rating";
import category_img from "../../assets/images/onions.jpg";
import axios from "axios";
import API_BASE_URL from "@/app/utils/api/base";
import { getTokenClient } from "@/app/utils/api/getTokenClient";

const Card = ({ product, currentPageName }: { product: Product; currentPageName?: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useAuth(); // Add this line
  const [isfav, setIsfav] = useState(false);
  const [avgRating, setAvgRating] = useState<number | null>(null);

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

  useEffect(() => {
    const fetchAvgRating = async () => {
      try {
        const token = getTokenClient();
        if (!token) return;

        const response = await axios.get(`${API_BASE_URL}/Review/GetAverageRating/${product.productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAvgRating(response.data.data || 3.5);
      } catch (error) {
        console.error("Failed to fetch average rating:", error);
      }
    };
  }, [product.productId]);

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
              if (!checkAuth()) return; // Add auth check
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
              if (!checkAuth()) return; // Add auth check
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
            if (!checkAuth()) return; // Add auth check
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
          <Rating style={{ maxWidth: 100 }} value={avgRating ? avgRating : 3.5} readOnly />
          <span className="text-md text- mt-[1px]">{avgRating ? avgRating : 3.5}</span>
        </span>
        <h3 className="text-green font-extrabold text-xl my-3">{product.price} EG</h3>
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
