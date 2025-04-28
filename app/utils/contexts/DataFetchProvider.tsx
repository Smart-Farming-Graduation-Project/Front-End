"use client";

import React, { useEffect } from "react";
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

  useEffect(() => {
    if (user && !isLoading) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [dispatch, user, isLoading]);

  return <>{children}</>;
}