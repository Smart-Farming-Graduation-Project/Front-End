import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import API_BASE_URL from "../../api/base";
import { getTokenClient } from "../../api/getTokenClient";
import axios from "axios";
import { Product } from "../../types/app";

const token = getTokenClient();

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
};

const initialState: CartState = {
  carts: [],
  status: "idle",
  error: null,
};

// Get Cart
export const fetchCart = createAsyncThunk<CartItem[]>("cart/fetchCart", async () => {
  const response = await axios.get(`${API_BASE_URL}/Cart/GetCart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data.cartItems;
});

// Add Product to Cart
export const addToCartAPI = createAsyncThunk<void, Product>("cart/addToCartAPI", async (product, { dispatch }) => {
  dispatch(addToCart(product));
  try {
    await axios.post(
      `${API_BASE_URL}/Cart/AddProduct/${product.productId}`,
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

// Delete from Cart
export const deleteProductAPI = createAsyncThunk<void, number>("cart/deleteProductAPI", async (productId, { dispatch }) => {
  dispatch(removeFromCart(productId));
  try {
    await axios.delete(`${API_BASE_URL}/Cart/RemoveProduct/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(fetchCart());
  } catch (error) {
    console.error("Error removing product:", error);
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
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.carts.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.carts.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.carts = state.carts.filter((item) => item.id !== action.payload);
        }
      }
    },

    clearCart: (state) => {
      state.carts = [];
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
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch cart";
      })
      .addCase(addToCartAPI.fulfilled, () => {})
      .addCase(deleteProductAPI.fulfilled, () => {});
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
