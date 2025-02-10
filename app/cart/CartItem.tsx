import React from "react";
import { ProductCart } from "../utils/types/app";
import Image from "next/image";
import category_img from "../assets/images/apples.png";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../utils/redux/slices/CartSlice";
import { useDispatch } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";

interface CartItemProps {
  product: ProductCart;
}

const CartItem = ({ product }: CartItemProps) => {
  const dispatch = useDispatch();

  return (
    <div className="item relative flex gap-4 mb-4 p-4 border border-gray-200 rounded-lg ease hover:shadow-md ">
      <button onClick={() => dispatch(removeFromCart(product.id))} className="text-red-600 hover:text-red-800 absolute top-3 right-3">
        <RiDeleteBinLine className="text-xl" />
      </button>
      <div className="img w-[100px] h-[100px] relative min-w-[60px] flex-shrink-0">
        <Image src={category_img} alt={product.name} width={100} height={100} className="rounded-md object-cover min-w-[60px] max-w-full" />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="max-w-[600px] my-1">{product.description}</p>
        <div className="quantity flex items-center gap-2 my-1">
          <button onClick={() => dispatch(decrementQuantity(product.id))} className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300">
            -
          </button>
          <span className="font-semibold">{product.quantity}</span>
          <button onClick={() => dispatch(incrementQuantity(product.id))} className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300">
            +
          </button>
        </div>
        <p className="price my-1">{(product.price * product.quantity).toFixed(2)} EG</p>
      </div>
    </div>
  );
};

export default CartItem;
