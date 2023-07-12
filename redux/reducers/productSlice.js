import { createSlice } from "@reduxjs/toolkit";
import { PRODUCT } from "../constants/constants";

const initialState = {
  products: [],
  shoppingCartIds: [],
};

export const productSlice = createSlice({
  name: PRODUCT,
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload;
    },

    addToCart: (state, action) => {
      state.shoppingCartIds.push(action.payload);
    },

    removeFromCart: (state, action) => {
      state.shoppingCartIds = state.shoppingCartIds.filter(
        (id) => id !== action.payload
      );
    },

    loadCart: (state, action) => {
      state.shoppingCartIds = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, loadCart, getProducts } =
  productSlice.actions;

export default productSlice.reducer;
