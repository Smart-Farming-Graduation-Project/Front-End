import React, { useState } from "react";
import Image from "next/image";
import category_img from "../assets/images/apples.png";
import { deleteProductAPI } from "../utils/redux/slices/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import type { CartItem } from "../utils/types/app";
import { AppDispatch, RootState } from "../utils/redux/store/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface CartItemProps {
  product: CartItem;
}

const CartItem = ({ product }: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveItem = async () => {
    setIsRemoving(true);

    try {
      // Dispatch the optimistic removal
      await dispatch(deleteProductAPI(product.productId)).unwrap();
      toast.success("Item removed from cart!");
    } catch (error) {
      toast.error("Failed to remove item. Please try again.");
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div
      className={`item relative flex gap-4 mb-4 p-4 border border-gray-200 rounded-lg ease shadow-sm hover:shadow-md transition-all duration-300 ${
        isRemoving ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {/* Delete Button */}
      <button
        onClick={handleRemoveItem}
        disabled={isRemoving}
        className={`text-red-600 hover:text-red-800 absolute top-3 right-3 transition-all duration-200 ${
          isRemoving ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
        }`}
      >
        <RiDeleteBinLine
          className={`text-xl ${isRemoving ? "animate-pulse" : ""}`}
        />
      </button>

      {/* Product Image */}
      <div
        className="img w-[100px] h-[100px] relative flex-shrink-0 overflow-hidden rounded-md cursor-pointer"
        onClick={() => router.push(`/shop/category/${product.productId}`)}
      >
        {product.productImages?.length ? (
          <Image
            src={product.productImages[0]}
            alt={product.productName}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        ) : (
          <Image
            src={category_img}
            alt={product.productName}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        )}
      </div>

      {/* Product Info */}
      <div className="product-info flex-grow">
        <h3 className="text-lg font-bold">{product.productName}</h3>
        {product.productDescription && (
          <p className="text-sm text-gray-600 max-w-[600px] my-1">
            {product.productDescription}
          </p>
        )}

        {/* Quantity */}
        <span className="font-[600]">× {product.quantity}</span>

        {/* Price */}
        <p className="price text-green-700 font-semibold my-1">
          {(product.productPrice * product.quantity).toFixed(2)} EG
        </p>
      </div>

      {/* Loading overlay for removal */}
      {isRemoving && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center rounded-lg">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
            <span className="text-sm">Removing...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
