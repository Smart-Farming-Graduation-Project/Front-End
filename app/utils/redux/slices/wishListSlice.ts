import { createSlice } from "@reduxjs/toolkit";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

const initialState: { wishList: Product[] } = {
  wishList: [],
};

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    hydrateWishListFromLocalStorage(state) {
      if (typeof window !== "undefined") {
        const savedWishList = JSON.parse(localStorage.getItem("wishList") || "[]");
        state.wishList = savedWishList;
      }
    },
    addToWishList: (state, action) => {
      const findProduct = state.wishList.find((product: Product) => product.id === action.payload.id);
      if (!findProduct) {
        const cloneProduct: Product = { ...action.payload, fav: true };
        state.wishList.push(cloneProduct);
        localStorage.setItem("wishList", JSON.stringify(state.wishList));
      }
    },
    removeFromWishList: (state, action) => {
      state.wishList = state.wishList.filter((product: Product) => product.id !== action.payload.id);
      localStorage.setItem("wishList", JSON.stringify(state.wishList));
    },
  },
});

export const { hydrateWishListFromLocalStorage, addToWishList, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
