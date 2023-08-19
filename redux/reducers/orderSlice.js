import { createSlice } from "@reduxjs/toolkit";
import { ORDER } from "../constants/constants";

const initialState = {
  totalPrice: 0,
  paymentLink: "",
  orderId: "",
};

export const orderSlice = createSlice({
  name: ORDER,
  initialState,
  reducers: {
    setOrderInfo: (state, { payload }) => {
      state.totalPrice = payload.totalPrice;
      state.paymentLink = payload.paymentLink;
      state.orderId = payload.orderId;
    },
  },
});

export const { setOrderInfo } = orderSlice.actions;

export default orderSlice.reducer;
