"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "./AuthContext";
import { AppDispatch } from "../redux/store/store";
import { fetchCartCount } from "../redux/slices/CartSlice";
import { fetchWishlistCount } from "../redux/slices/wishListSlice";

const DataInitializer = () => {
  const { user, isLoading } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only fetch data once when user is authenticated and hasn't been initialized
    if (!isLoading && user && !hasInitialized.current) {
      console.log("Initializing data for authenticated user");

      // Fetch cart and wishlist counts
      dispatch(fetchCartCount());
      dispatch(fetchWishlistCount());

      hasInitialized.current = true;
    }

    // Reset initialization flag when user logs out
    if (!user) {
      hasInitialized.current = false;
    }
  }, [user, isLoading, dispatch]);

  // This component doesn't render anything
  return null;
};

export default DataInitializer;