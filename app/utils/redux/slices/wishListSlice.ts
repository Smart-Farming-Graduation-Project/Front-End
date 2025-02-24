import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import API_BASE_URL from "../../api/base";
import { getTokenClient } from "../../api/getTokenClient";
import axios from "axios";
import { Product } from "../../types/app";

const token = getTokenClient();

type WishListItem = {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  productAvailability: string;
  productImages: string[];
  productDescription: string;
  fav: boolean;
};

type WishListState = {
  wishList: WishListItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: WishListState = {
  wishList: [],
  status: "idle",
  error: null,
};

// Fetch Wishlist
export const fetchWishlist = createAsyncThunk<WishListItem[]>("wishlist/fetchWishlist", async () => {
  const response = await axios.get(`${API_BASE_URL}/Wishlist/GetWishlist`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data.wishlistItems;
});

// Add to Wishlist
export const addToWishlistAPI = createAsyncThunk<void, Product>("wishlist/addToWishlistAPI", async (product, { dispatch }) => {
  dispatch(addToWishList(product));
  try {
    await axios.post(
      `${API_BASE_URL}/Wishlist/AddProduct/${product.productId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(fetchWishlist());
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
  }
});

// Remove from Wishlist
export const removeFromWishlistAPI = createAsyncThunk<void, number>("wishlist/removeFromWishlistAPI", async (productId, { dispatch }) => {
  dispatch(removeFromWishList(productId));
  try {
    await axios.delete(`${API_BASE_URL}/Wishlist/RemoveProduct/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(fetchWishlist());
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
  }
});

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action: PayloadAction<Product>) => {
      const findProduct = state.wishList.find((product) => product.productId === action.payload.productId);
      if (!findProduct) {
        state.wishList.push({
          id: Math.random(),
          productId: action.payload.productId,
          productName: action.payload.productName,
          productPrice: action.payload.price,
          productAvailability: action.payload.availability,
          productImages: action.payload.images,
          productDescription: action.payload.description,
          fav: true,
        });
      }
    },

    removeFromWishList: (state, action: PayloadAction<number>) => {
      state.wishList = state.wishList.filter((product) => product.productId !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.wishList = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch wishlist";
      })
      .addCase(addToWishlistAPI.fulfilled, () => {})
      .addCase(removeFromWishlistAPI.fulfilled, () => {});
  },
});

export const { addToWishList, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
