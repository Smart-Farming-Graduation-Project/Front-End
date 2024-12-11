import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  carts: JSON.parse(localStorage.getItem("carts")) || [],
};

const CartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    AddToCart: (state, action) => {
      const findProduct = state.carts.find(
        (product) => product.id === action.payload.id
      );
      if (findProduct) {
        findProduct.quantity += 1;
      } else {
        const cloneProduct = { ...action.payload, quantity: 1 };
        state.carts.push(cloneProduct);
      }
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    RemoveFromCart: (state, action) => {
      state.carts = state.carts.filter(
        (product) => product.id !== action.payload.id
      );
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    incrementsQuantity: (state, action) => {
      const findProduct = state.carts.find(
        (product) => product.id === action.payload.id
      );
      findProduct.quantity += 1;
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    decrementsQuantity: (state, action) => {
      const findProduct = state.carts.find(
        (product) => product.id === action.payload.id
      );
      findProduct.quantity -= 1;
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
  },
});
export const {
  AddToCart,
  RemoveFromCart,
  incrementsQuantity,
  decrementsQuantity,
} = CartSlice.actions;
export default CartSlice.reducer;
