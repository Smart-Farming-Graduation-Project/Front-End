import React, { useState } from "react";
import Image from "next/image";
import category_img from "../assets/images/apples.png";
import { useDispatch } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdUndo } from "react-icons/io";
import type { CartItem } from "../utils/types/app";
import { AppDispatch } from "../utils/redux/store/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { removeFromCart, revertRemoveFromCart } from "../utils/redux/slices/CartSlice";
import axios from "axios";
import API_BASE_URL from "../utils/api/base";
import { getTokenClient } from "../utils/api/getTokenClient";

interface CartItemProps {
  product: CartItem;
}

const CartItemEnhanced = ({ product }: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isRemoving, setIsRemoving] = useState(false);
  const [showUndoToast, setShowUndoToast] = useState(false);

  const handleRemoveItem = async () => {
    // Immediately remove from UI
    dispatch(removeFromCart(product.productId));
    
    // Show undo option
    const undoTimeoutId = setTimeout(() => {
      setShowUndoToast(false);
    }, 5000);

    // Create undo toast
    const toastId = toast.custom((t) => (
      <div className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">Item removed from cart</p>
              <p className="mt-1 text-sm text-gray-500">{product.productName}</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => {
              dispatch(revertRemoveFromCart(product));
              toast.dismiss(toastId);
              clearTimeout(undoTimeoutId);
              toast.success("Item restored to cart");
            }}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none">
            <IoMdUndo className="mr-1" />
            Undo
          </button>
        </div>
      </div>
    ), { duration: 5000 });

    // Attempt server removal
    setIsRemoving(true);
    try {
      const token = getTokenClient();
      if (!token) throw new Error("No authentication token");
      
      await axios.delete(`${API_BASE_URL}/Cart/RemoveProduct/${product.productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Success - dismiss undo toast
      toast.dismiss(toastId);
      clearTimeout(undoTimeoutId);
      
    } catch (error) {
      console.error("Error removing product:", error);
      
      // Revert the removal on error
      dispatch(revertRemoveFromCart(product));
      toast.dismiss(toastId);
      clearTimeout(undoTimeoutId);
      toast.error("Failed to remove item. Please try again.");
      
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="item relative flex gap-4 mb-4 p-4 border border-gray-200 rounded-lg ease shadow-sm hover:shadow-md transition-all duration-300">
      {/* Delete Button */}
      <button
        onClick={handleRemoveItem}
        disabled={isRemoving}
        className="text-red-600 hover:text-red-800 absolute top-3 right-3 transition-all duration-200 hover:scale-110">
        <RiDeleteBinLine className="text-xl" />
      </button>

      {/* Product Image */}
      <div className="img w-[100px] h-[100px] relative flex-shrink-0 overflow-hidden rounded-md cursor-pointer" onClick={() => router.push(`/shop/category/${product.productId}`)}>
        {product.productImages?.length ? (
          <Image src={product.productImages[0]} alt={product.productName} fill style={{ objectFit: "cover" }} className="rounded-md" />
        ) : (
          <Image src={category_img} alt={product.productName} fill style={{ objectFit: "cover" }} className="rounded-md" />
        )}
      </div>

      {/* Product Info */}
      <div className="product-info flex-grow">
        <h3 className="text-lg font-bold">{product.productName}</h3>
        {product.productDescription && <p className="text-sm text-gray-600 max-w-[600px] my-1">{product.productDescription}</p>}

        {/* Quantity */}
        <span className="font-[600]">× {product.quantity}</span>

        {/* Price */}
        <p className="price text-green-700 font-semibold my-1">{(product.productPrice * product.quantity).toFixed(2)} EG</p>
      </div>
    </div>
  );
};

export default CartItemEnhanced;