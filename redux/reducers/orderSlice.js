import { createSlice } from "@reduxjs/toolkit";
import { ORDER } from "../constants/constants";

const initialState = {
  totalPrice: 0,
  products: [],
};

export const orderSlice = createSlice({
  name: ORDER,
  initialState,
  reducers: {
    setOrderPrice: (state, { payload }) => {
      state.totalPrice = payload.totalPrice;
    },

    setProductsInOrder: (state, { payload }) => {
      state.products = payload.products;
    },
  },
});

export const { setOrderPrice, setProductsInOrder } = orderSlice.actions;

export default orderSlice.reducer;
