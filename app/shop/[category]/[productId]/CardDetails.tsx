"use client";
import React, { useEffect, useState } from "react";
import { ProductId, ReviewProps } from "@/app/utils/types/app";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { FaPlus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";
import { Rating } from "@smastrom/react-rating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getTokenClient } from "../../../utils/api/getTokenClient";
import { addToWishlistAPI, removeFromWishlistAPI } from "@/app/utils/redux/slices/wishListSlice";
import { addToCartAPI, deleteProductAPI } from "@/app/utils/redux/slices/CartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/utils/redux/store/store";
import toast from "react-hot-toast";
import ReviewItem from "@/app/components/shop/ReviewItem";
import { createReview, getReviews } from "@/app/utils/api/Review";
import { useAuth } from "@/app/utils/contexts/AuthContext";

const CardDetails = ({ product }: { product: ProductId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const [count, setCount] = useState(1);
  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(Math.max(count - 1, 1));
  const trucnkString = (str: string, num: number) => {
    if (str.length > num) return str.slice(0, num) + "...";
    return str;
  };
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [headline, setHeadline] = useState("");
  const token = getTokenClient();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReview(product.productId, rating, reviewText, headline, token as string);
      toast.success("Review added successfully!");
      setHeadline("");
      setReviewText("");
      setRating(0);
    } catch {
      toast.error("You already submitted a review for this product..");
    }
  };
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = await getReviews(product.productId, token as string);
      setReviews(fetchedReviews);
    };
    fetchReviews();
  }, [product.productId, token, reviews]);

  return (
    <section className="card-details p-sec">
      <div className="container">
        <div className="card-details-container grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="img-product rounded-lg overflow-hidden flex justify-center items-center">
            <Image src={product.images[0]} alt={product.productName} width={500} height={300} layout="responsive" />
          </div>
          <div className="details">
            <h2 className="font-[700] text-3xl mb-1">{product.productName}</h2>
            <p className="text-green text-2xl font-[500]">{product.price} EG</p>
            <span className="rate flex items-center gap-[3px] my-2">
              <Rating style={{ maxWidth: 100 }} value={product.averageRating} readOnly />
              <span className="text-md text- mt-[1px]">{product.averageRating}</span>
            </span>
            <Separator className="my-2" />
            <p className="mb-4">{trucnkString(product.description, 150)}</p>
            <div className="quantity flex items-center gap-3">
              <span className="text-xl font-semibold">Choose Quantity</span>
              <div className="w-24 h-12 border border-gray-300 rounded-lg flex items-center overflow-hidden">
                <div className="flex-1 text-center font-semibold text-lg">{count}</div>
                <div className="flex flex-col h-full border-l border-gray-300 w-1/3">
                  <button className="flex-1 h-1/2 flex items-center justify-center text-lg font-semibold border-b border-gray-300 hover:bg-gray-200 active:bg-gray-300 transition" onClick={handleIncrement}>
                    <FaPlus size={12} />
                  </button>
                  <button className="flex-1  h-1/2 flex items-center justify-center text-lg font-semibold hover:bg-gray-200 active:bg-gray-300 transition" onClick={handleDecrement}>
                    <TiMinus size={12} />
                  </button>
                </div>
              </div>
            </div>
            <div className="actions flex flex-col sm:flex-row items-center gap-2 mt-4 text-sm w-full">
              <Button
                className="shadow-none py-6 px-6 sm:px-10 w-full sm:w-auto"
                onClick={() => {
                  dispatch(addToCartAPI({ product, quantity: count }));
                  dispatch(removeFromWishlistAPI(product.productId));
                  toast.success("Item added to cart!");
                }}>
                Add to Cart
              </Button>
              <Button
                className="shadow-none bg-yellow py-6 px-6 sm:px-10 hover:bg-[#eec451] w-full sm:w-auto"
                onClick={() => {
                  dispatch(addToWishlistAPI(product));
                  dispatch(deleteProductAPI(product.productId));
                  toast.success("Item added to wishList!");
                }}>
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>
        <div className="description mt-[40px]">
          <h2 className="font-[700] text-3xl mb-1">Description</h2>
          <p>{product.description}</p>
        </div>
        <Separator className="my-6" />
        <div className="reviews">
          <h3 className="text-2xl">
            {reviews.length} review{reviews.length === 1 ? "" : "s"} for {product.productName}
          </h3>
          <div className="reviews-container">{reviews && reviews.length > 0 ? reviews.map((review: ReviewProps) => <ReviewItem key={review.reviewID} review={review} userId={user?.sub ?? ""} />) : <p>No reviews found for this product.</p>}</div>
        </div>
        <div className="add-review">
          <Separator className="my-6" />
          <h3 className="text-2xl">Add a review</h3>
          <div className="flex items-center gap-2 my-4">
            <Rating value={rating} onChange={setRating} style={{ maxWidth: 120 }} transition="zoom" />
            <button type="button" onClick={() => setRating(0)} className="text-red-700">
              Reset
            </button>
          </div>
          <form className="flex flex-col gap-1 mt-2" onSubmit={handleSubmit}>
            <div className="flex items-center gap-1.5 mb-2 flex-row">
              <Input type="text" id="headline" placeholder="headline" className="pl-2 py-[20px] text-sm bg-light-yellow-section shadow-none" value={headline} onChange={(e) => setHeadline(e.target.value)} required />
            </div>
            <Textarea placeholder="Your Review" className="input h-24 text-sm bg-light-yellow-section shadow-none" value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
            <Button className="shadow-none bg-yellow py-6 px-6 hover:bg-[#eec451] w-full sm:w-fit mt-3">Add Review</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CardDetails;
