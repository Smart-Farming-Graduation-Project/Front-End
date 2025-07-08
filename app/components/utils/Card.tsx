"use client";
import React, { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  // Use local state to track favorite status for immediate UI updates
  const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);

  // Update local state when product prop changes
  useEffect(() => {
    setIsFavorite(product.isFavorite || false);
  }, [product.isFavorite]);

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

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!checkAuth()) return;

    // Optimistic UI update - immediately show as favorited
    setIsFavorite(true);

    setIsLoading(true);
    try {
      await dispatch(addToWishlistAPI(product)).unwrap();
      toast.success("Item added to wishlist!");
    } catch (error) {
      // Revert optimistic update if API call fails
      setIsFavorite(false);
      console.error("Failed to add to wishlist:", error);
      toast.error("Failed to add to wishlist");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!checkAuth()) return;

    // Optimistic UI update - immediately show as not favorited
    setIsFavorite(false);

    setIsLoading(true);
    try {
      await dispatch(removeFromWishlistAPI(product.productId)).unwrap();
    } catch (error) {
      // Revert optimistic update if API call fails
      setIsFavorite(true);
      console.error("Failed to remove from wishlist:", error);
      toast.error("Failed to remove from wishlist");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="card h-[470px] bg-white border border-[#f5f5f5dc] rounded-xl p-3 relative cursor-pointer flex items-center justify-center flex-col overflow-hidden ease duration-300 hover:shadow-sm"
      onClick={() => router.push(`/shop/category/${product.productId}`)}>
      {currentPageName !== "wishlist" ? (
        !isFavorite ? (
          <div className="favorite cursor-pointer" onClick={handleAddToWishlist}>
            <FaRegHeart className={`text-green text-[18px] fav_false ${isLoading ? "opacity-50" : ""}`} />
          </div>
        ) : (
          <div className="favorite bg-green cursor-pointer" onClick={handleRemoveFromWishlist}>
            <FaHeart className={`text-[18px] text-white ${isLoading ? "opacity-50" : ""}`} />
          </div>
        )
      ) : (
        <IoIosClose className={`close hover:text-green cursor-pointer ${isLoading ? "opacity-50" : ""}`} onClick={handleRemoveFromWishlist} />
      )}

      {/* Product Image */}
      <div className="img rounded-2xl overflow-hidden">
        <div className="w-full h-[220px] flex items-center justify-center">
          {product.images && product.images.length > 0 ? (
            <Image src={product.images[0]} alt={product.productName} className="rounded-2xl object-contain" width={200} height={220} sizes="(max-width: 768px) 100vw, 200px" />
          ) : (
            <Image src={category_img} alt={product.productName} className="rounded-2xl object-contain" width={200} height={220} sizes="(max-width: 768px) 100vw, 200px" />
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
