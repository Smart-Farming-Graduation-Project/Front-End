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
import axios from "axios";
import { getTokenClient } from "../../../utils/api/getTokenClient";
import API_BASE_URL from "@/app/utils/api/base";
import { addToWishlistAPI } from "@/app/utils/redux/slices/wishListSlice";
import { addToCartAPI } from "@/app/utils/redux/slices/CartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/utils/redux/store/store";

const CardDetails = ({ product }: { product: ProductId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [count, setCount] = useState(1);
  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(Math.max(count - 1, 1));
  const trucnkString = (str: string, num: number) => {
    if (str.length > num) return str.slice(0, num) + "...";
    return str;
  };
  const userID = "name";
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [headline, setHeadline] = useState("");
  const token = getTokenClient();
  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      axios.post(
        `${API_BASE_URL}/Reviews/CreateReview`,
        {
          userID,
          productID: product.productId,
          rating,
          reviewText,
          headline,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to add review:", error);
    }
  };
  const Rev = [
    {
      reviewID: "1",
      userID: "user123",
      productID: 101,
      rating: 4,
      reviewText: "Great product, really enjoyed using it!",
      headline: "Awesome!",
      reviewDate: "2023-10-01",
    },
    {
      reviewID: "2",
      userID: "user456",
      productID: 101,
      rating: 5,
      reviewText: "Exceeded my expectations, highly recommend!",
      headline: "Fantastic!",
      reviewDate: "2023-10-02",
    },
  ];
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/Reviews/GetReviews/${product.productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReviews(response.data.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    getReviews();
  }, [product.productId, token]);

  return (
    <section className="card-details p-sec">
      <div className="container">
        <div className="card-details-container grid grid-cols-1 md:grid-cols-2 gap-1">
          <div className="img-product rounded-lg overflow-hidden flex justify-center items-center">
            <Image src={product.images[0]} alt={product.productName} width={500} height={500} />
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
                }}>
                Add to Cart
              </Button>
              <Button
                className="shadow-none bg-yellow py-6 px-6 sm:px-10 hover:bg-[#eec451] w-full sm:w-auto"
                onClick={() => {
                  dispatch(addToWishlistAPI(product));
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
          <div className="reviews-container">
            {Rev.map((review: ReviewProps) => (
              <div key={review.reviewID} className="review-item p-5 bg-white shadow-sm rounded-2xl mb-4">
                {/* User Info */}
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold text-gray-900 text-lg">{review.userID}</h4>
                  <span className="text-sm text-green">{review.reviewDate}</span>
                </div>

                {/* Rating & Headline */}
                <div className="flex items-center gap-3 mb-3">
                  <Rating value={review.rating} readOnly style={{ maxWidth: 100 }} />
                  <h4 className="font-semibold text-xl text-gray-900">{review.headline}</h4>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-base leading-relaxed">{review.reviewText}</p>
              </div>
            ))}
          </div>
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
          <form className="flex flex-col gap-1 mt-2" onSubmit={handleReview}>
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
