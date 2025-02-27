import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlistAPI, removeFromWishlistAPI } from "../../utils/redux/slices/wishListSlice";
import toast from "react-hot-toast";
import category_img from "../../assets/images/onions.jpg";
import Image from "next/image";
import { addToCartAPI, deleteProductAPI } from "@/app/utils/redux/slices/CartSlice";
import { usePathname } from "next/navigation";
import "./Card.css";
import { FaBagShopping, FaRegHeart } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Product, WishListItem } from "@/app/utils/types/app";
import { AppDispatch } from "@/app/utils/redux/store/store";
import { getAvgProduct } from "@/app/utils/api/Products";
import { getTokenClient } from "@/app/utils/api/getTokenClient";
import { Rating } from "@smastrom/react-rating";
type CardProps = {
  product: Product;
};

const Card = ({ product }: CardProps) => {
  const { wishList } = useSelector((state: { wishList: { wishList: WishListItem[] } }) => state.wishList);
  const dispatch = useDispatch<AppDispatch>();
  const pathName = usePathname();
  const router = useRouter();
  const currentPageName = pathName?.split("/").pop();
  const initialFav = wishList.some((prod) => prod.productId === product.productId) || false;
  const [isfav, setIsfav] = useState<boolean>(initialFav);
  const token = getTokenClient();
  const trucnkString = (str: string, num: number) => {
    if (str.length > num) return str.slice(0, num) + "...";
    return str;
  };

  const [avgRating, setAvgRating] = useState<number | null>(null);

  React.useEffect(() => {
    const fetchAvgRating = async () => {
      try {
        if (product.productId && token) {
          const rating = await getAvgProduct(product.productId, token);
          setAvgRating(rating);
        }
      } catch (error) {
        console.error("Failed to fetch average rating:", error);
      }
    };

    if (token) {
      fetchAvgRating();
    }
  }, [product.productId, token]);

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
          className="py-2 px-4 rounded-[20px] uppercase border border-yellow flex items-center gap-2 justify-center mx-auto mt-4 hover:shadow ease"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCartAPI({ product }));
            dispatch(removeFromWishlistAPI(product.productId));
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
