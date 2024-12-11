import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../slices/CartSlice";
import wishListSlice from "../slices/wishListSlice";
export const store = configureStore({
  reducer: {
    carts: CartSlice,
    wishList: wishListSlice,
  },
});
