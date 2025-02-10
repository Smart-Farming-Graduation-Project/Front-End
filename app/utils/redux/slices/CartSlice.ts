import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

type CartItem = Product & {
  quantity: number;
};

type CartState = {
  carts: CartItem[];
};

const updateLocalStorage = (carts: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("carts", JSON.stringify(carts));
  }
};

const getInitialCart = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("carts");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

const initialState: CartState = {
  carts: getInitialCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.carts.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.carts.push({ ...action.payload, quantity: 1 });
      }
      updateLocalStorage(state.carts);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
      updateLocalStorage(state.carts);
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.carts.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        updateLocalStorage(state.carts);
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
        updateLocalStorage(state.carts);
      }
    },

    // Clear entire cart
    clearCart: (state) => {
      state.carts = [];
      updateLocalStorage(state.carts);
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
