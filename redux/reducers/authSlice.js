import { createSlice } from "@reduxjs/toolkit";
import { AUTH } from "../constants/constants";

const initialState = {
  isLoggedIn: false,
  isTokenChecked: false,
  isSmsReceived: false,
  isSmsVerified: false,
  userInformation: {
    firstName: null,
    lastName: null,
    phoneNumber: null,
    address: null,
    email: null,
    refer: null,
    invoiceIds: [],
    shoppingCartIds: [],
  },
};

export const authSlice = createSlice({
  name: AUTH,
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isLoggedIn = true;
      state.userInformation = action.payload;
    },

    userLogout: () => initialState,

    checkToken: (state) => {
      state.isTokenChecked = true;
    },

    receiveSms: (state) => {
      state.isSmsReceived = true;
    },

    verifySms: (state) => {
      state.isSmsVerified = true;
    },
  },
});

export const { userLogin, checkToken, userLogout, receiveSms, verifySms } =
  authSlice.actions;

export default authSlice.reducer;
