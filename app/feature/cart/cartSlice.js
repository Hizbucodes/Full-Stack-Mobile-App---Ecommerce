import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isItemPresentInTheCart = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (isItemPresentInTheCart) {
        isItemPresentInTheCart.quantity++;
        isItemPresentInTheCart.totalPrice += action.payload.price;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }
      state.totalQuantity++;
    },
    removeFromCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        state.totalQuantity -= 1;
        if (existingItem.quantity === 1) {
          state.cart = state.cart.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          existingItem.quantity -= 1;
          existingItem.totalPrice -= existingItem.price;
        }
      }
    },
    incrementQuantity: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem.quantity === 1) {
        existingItem.quantity = 0;
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      } else {
        existingItem.quantity--;
      }
    },
    cleanCartAfterPaymentProcess: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  cleanCartAfterPaymentProcess,
} = cartSlice.actions;

export default cartSlice.reducer;
