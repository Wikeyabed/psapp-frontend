import { createSlice } from "@reduxjs/toolkit";
import { AUTH } from "../constants/constants";

const initialState = {
  isLoggedIn: false,
  isTokenSet: false,
  isSmsSent: false,
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

    userLogout: (state) => {
      state.isLoggedIn = false;
      state.userInformation = {
        firstName: null,
        lastName: null,
        phoneNumber: null,
        address: null,
        email: null,
        refer: null,
        invoiceIds: [],
        shoppingCartIds: [],
      };
    },

    sendSms: (state) => {
      state.isSmsSent = true;
    },

    resetSms: (state) => {
      state.isSmsSent = false;
    },

    verifySms: (state) => {
      state.isSmsVerified = true;
    },
  },
});

export const { resetSms, sendSms, userLogin, userLogout, verifySms } =
  authSlice.actions;

export default authSlice.reducer;
