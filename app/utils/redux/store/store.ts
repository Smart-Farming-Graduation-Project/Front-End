import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../slices/CartSlice";
import wishListSlice from "../slices/wishListSlice";

export const store = configureStore({
  reducer: {
    carts: CartSlice,
    wishList: wishListSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
