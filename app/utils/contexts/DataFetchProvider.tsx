"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCart } from "../redux/slices/CartSlice";
import { fetchWishlist } from "../redux/slices/wishListSlice";
import { AppDispatch } from "../redux/store/store";
import { useAuth } from "./AuthContext";

export default function DataFetchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading } = useAuth();
  const [hasFetched, setHasFetched] = useState(false); // << ADD THIS

  useEffect(() => {
    if (user && !isLoading && !hasFetched) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
      setHasFetched(true); // << ONLY ONCE
    }
  }, [dispatch, user, isLoading, hasFetched]);

  return <>{children}</>;
}
