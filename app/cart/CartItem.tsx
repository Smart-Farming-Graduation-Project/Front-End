import React from "react";
import Image from "next/image";
import category_img from "../assets/images/apples.png";
import { deleteProductAPI } from "../utils/redux/slices/CartSlice";
import { useDispatch } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import type { CartItem } from "../utils/types/app";
import { AppDispatch } from "../utils/redux/store/store";
import { useRouter } from "next/navigation";

interface CartItemProps {
  product: CartItem;
}

const CartItem = ({ product }: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  return (
    <div className="item relative flex gap-4 mb-4 p-4 border border-gray-200 rounded-lg ease shadow-sm hover:shadow-md">
      {/* Delete Button */}
      <button onClick={() => dispatch(deleteProductAPI(product.productId))} className="text-red-600 hover:text-red-800 absolute top-3 right-3">
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

        {/* Quantity Controls */}
        <span className="font-[600]">× {product.quantity}</span>

        {/* Price */}
        <p className="price text-green-700 font-semibold my-1">{(product.productPrice * product.quantity).toFixed(2)} EG</p>
      </div>
    </div>
  );
};

export default CartItem;
