import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import API_BASE_URL from "../../api/base";
import { getTokenClient } from "../../api/getTokenClient";
import axios from "axios";
import { Product } from "../../types/app";
import toast from "react-hot-toast";

type ItemProps = {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  productAvailability: string;
  productImages: string[];
  productDescription: string;
  averageRating?: number; // Add optional averageRating
};

type CartItem = ItemProps & {
  quantity: number;
};

type WishListItem = ItemProps & {
  fav: boolean;
};

type WishListState = {
  wishList: WishListItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  wishlistCount: number;
};

const initialState: WishListState = {
  wishList: [],
  status: "idle",
  error: null,
  wishlistCount: 0,
};

export const fetchWishlist = createAsyncThunk<WishListItem[]>(
  "wishlist/fetchWishlist", 
  async (_, { rejectWithValue }) => {
    try {
      const token = getTokenClient(); // Get token inside the function
      if (!token) throw new Error("No authentication token");
      
      const response = await axios.get(`${API_BASE_URL}/Wishlist/GetWishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      return response.data.data.wishlistItems || [];
    } catch (error: any) {
      console.error("Error fetching wishlist:", error);
      return rejectWithValue("Failed to fetch wishlist");
    }
  }
);

// Fetch Wishlist Count - Fix the endpoint
export const fetchWishlistCount = createAsyncThunk<number>(
  "wishlist/fetchWishlistCount",
  async (_, { rejectWithValue }) => {
    try {
      const token = getTokenClient();
      if (!token) throw new Error("No authentication token");
      
      // Use the correct endpoint - likely GetWishlist instead of GetWishlistItems
      const response = await axios.get(`${API_BASE_URL}/Wishlist/GetWishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Return just the count
      return response.data.data?.wishlistItems?.length || 0;
    } catch (error: any) {
      console.error("Error fetching wishlist count:", error);
      return rejectWithValue(0);
    }
  }
);

// Add to Wishlist
export const addToWishlistAPI = createAsyncThunk<void, Product>(
  "wishlist/addToWishlistAPI", 
  async (product, { dispatch }) => {
    dispatch(addToWishList(product));
    try {
      const token = getTokenClient();
      if (!token) throw new Error("Authentication required");
      
      await axios.post(
        `${API_BASE_URL}/Wishlist/AddProduct/${product.productId}`,
        {}, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      toast.success(`${product.productName} added to wishlist`);
      // Update count instead of fetching entire wishlist
      dispatch(fetchWishlistCount());
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      dispatch(removeFromWishList(product.productId));
      toast.error("Failed to add to wishlist");
    }
  }
);

// Remove from Wishlist
export const removeFromWishlistAPI = createAsyncThunk<void, number>(
  "wishlist/removeFromWishlistAPI", 
  async (productId, { dispatch }) => {
    dispatch(removeFromWishList(productId));
    try {
      const token = getTokenClient();
      if (!token) throw new Error("Authentication required");
      
      await axios.delete(`${API_BASE_URL}/Wishlist/RemoveProduct/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      toast.success("Item removed from wishlist");
      dispatch(fetchWishlistCount());
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove from wishlist");
    }
  }
);

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
          averageRating: action.payload.averageRating || 3.5,
          fav: true,
        });
        state.wishlistCount = state.wishList.length;
      }
    },

    removeFromWishList: (state, action: PayloadAction<number>) => {
      state.wishList = state.wishList.filter((product) => product.productId !== action.payload);
      state.wishlistCount = state.wishList.length;
    },

    setWishlistCount: (state, action) => {
      state.wishlistCount = action.payload;
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
        state.wishlistCount = action.payload.length;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch wishlist";
      })
      .addCase(fetchWishlistCount.fulfilled, (state, action) => {
        state.wishlistCount = action.payload;
      })
      .addCase(addToWishlistAPI.fulfilled, () => {})
      .addCase(removeFromWishlistAPI.fulfilled, () => {});
  },
});

export const { addToWishList, removeFromWishList, setWishlistCount } = wishListSlice.actions;
export default wishListSlice.reducer;
