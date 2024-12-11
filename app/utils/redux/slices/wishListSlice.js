import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: JSON.parse(localStorage.getItem("wishList")) || [],
};

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const findProduct = state.wishList.find(
        (product) => product.id === action.payload.id
      );
      if (!findProduct) {
        const cloneProduct = { ...action.payload, fav: true };
        state.wishList.push(cloneProduct);
        localStorage.setItem("wishList", JSON.stringify(state.wishList));
      }
    },
    removeFromWishList: (state, action) => {
      state.wishList = state.wishList.filter(
        (product) => product.id !== action.payload.id
      );
      localStorage.setItem("wishList", JSON.stringify(state.wishList));
    },
  },
});

export const { addToWishList, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
