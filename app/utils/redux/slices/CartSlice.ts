import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import API_BASE_URL from "../../api/base";
import { getTokenClient } from "../../api/getTokenClient";
import axios from "axios";
import { Product } from "../../types/app";
import toast from "react-hot-toast";

type CartItem = {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  productAvailability: string;
  productImages: string[];
  productDescription: string;
  quantity: number;
};

type CartState = {
  carts: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  cartCount: number;
};

const initialState: CartState = {
  carts: [],
  status: "idle",
  error: null,
  cartCount: 0,
};

// Get Cart
export const fetchCart = createAsyncThunk<CartItem[]>("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const token = getTokenClient();
    if (!token) throw new Error("No authentication token");

    const response = await axios.get(`${API_BASE_URL}/Cart/GetCart`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data?.cartItems || [];
  } catch (error: any) {
    console.error("Error fetching cart:", error);
    return rejectWithValue("Failed to fetch cart");
  }
});

// Add Product to Cart
export const addToCartAPI = createAsyncThunk<void, { product: Product; quantity?: number }>("cart/addToCartAPI", async ({ product, quantity = 1 }, { dispatch }) => {
  dispatch(addToCart(product));
  try {
    const token = getTokenClient();
    if (!token) throw new Error("No authentication token");
    await axios.post(
      `${API_BASE_URL}/Cart/AddProduct/${product.productId}?quantity=${quantity}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(fetchCart());
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
});
// Update the deleteProductAPI with optimistic updates
export const deleteProductAPI = createAsyncThunk<void, number>(
  "cart/deleteProductAPI", 
  async (productId, { dispatch, rejectWithValue }) => {
    // Optimistically remove from UI first
    dispatch(removeFromCart(productId));
    
    try {
      const token = getTokenClient();
      if (!token) throw new Error("No authentication token");
      
      await axios.delete(`${API_BASE_URL}/Cart/RemoveProduct/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Update cart count after successful removal
      dispatch(fetchCartCount());
      
    } catch (error) {
      console.error("Error removing product:", error);
      
      // Revert the optimistic update if the API call fails
      // You'll need to pass the product data to revert properly
      toast.error("Failed to remove item. Please try again.");
      
      // Refresh cart to get current state from server
      dispatch(fetchCart());
      
      return rejectWithValue("Failed to remove product");
    }
  }
);

// Add a new action for optimistic removal with revert capability
export const removeFromCartOptimistic = createAsyncThunk<void, { productId: number; productData?: any }>(
  "cart/removeFromCartOptimistic",
  async ({ productId, productData }, { dispatch, rejectWithValue }) => {
    // Store original item for potential revert
    const originalItem = productData;
    
    // Optimistically remove from UI
    dispatch(removeFromCart(productId));
    
    try {
      const token = getTokenClient();
      if (!token) throw new Error("No authentication token");
      
      await axios.delete(`${API_BASE_URL}/Cart/RemoveProduct/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Success - update cart count
      dispatch(fetchCartCount());
      
    } catch (error) {
      console.error("Error removing product:", error);
      
      // Revert the optimistic update
      if (originalItem) {
        dispatch(addToCart(originalItem));
      }
      
      toast.error("Failed to remove item. Please try again.");
      return rejectWithValue("Failed to remove product");
    }
  }
);

export const fetchCartCount = createAsyncThunk<number>("cart/fetchCartCount", async (_, { rejectWithValue }) => {
  try {
    const token = getTokenClient();
    if (!token) throw new Error("No authentication token");

    // Use the correct endpoint - check your API documentation
    const response = await axios.get(`${API_BASE_URL}/Cart/GetCart`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data?.cartItems?.length || 0;
  } catch (error: any) {
    console.error("Error fetching cart count:", error);
    return rejectWithValue(0);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.carts.find((item) => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.carts.push({
          id: Math.random(),
          productId: action.payload.productId,
          productName: action.payload.productName,
          productPrice: action.payload.price,
          productAvailability: action.payload.availability,
          productImages: action.payload.images,
          productDescription: action.payload.description,
          quantity: 1,
        });
      }
      // Update count immediately
      state.cartCount = state.carts.length;
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.carts = state.carts.filter((item) => item.productId !== action.payload);
      // Update count immediately
      state.cartCount = state.carts.length;
    },

    // Add action to revert removal if needed
    revertRemoveFromCart: (state, action: PayloadAction<any>) => {
      const existingItem = state.carts.find((item) => item.productId === action.payload.productId);
      if (!existingItem) {
        state.carts.push(action.payload);
        state.cartCount = state.carts.length;
      }
    },

    clearCart: (state) => {
      state.carts = [];
      state.cartCount = 0;
    },

    setCartCount: (state, action: PayloadAction<number>) => {
      state.cartCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.carts = action.payload;
        state.cartCount = action.payload.length;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch cart";
      })
      .addCase(addToCartAPI.fulfilled, () => {})
      .addCase(deleteProductAPI.fulfilled, () => {
        // Item already removed optimistically, no need to update UI again
      })
      .addCase(deleteProductAPI.rejected, () => {
        // Error handling is done in the thunk
      })
      .addCase(fetchCartCount.fulfilled, (state, action) => {
        state.cartCount = action.payload;
      });
  },
});

export const { addToCart, removeFromCart, revertRemoveFromCart, clearCart, setCartCount } = cartSlice.actions;
export default cartSlice.reducer;
