import { createSlice } from "@reduxjs/toolkit";
import { AUTH } from "../constants/constants";

const initialState = {
  isLoggedIn: false,
  isTokenChecked: false,
  isSmsReceived: false,
  isSmsVerified: false,
  tempSmsNumber: 0,
  tempCaptchaText: "",
  userInformation: {
    firstName: null,
    lastName: null,
    phoneNumber: null,
    address: null,
    email: null,
    refer: null,
    r: "",
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

    updateAddress: (state, action) => {
      state.userInformation.address = action.payload;
    },

    userLogout: () => initialState,

    checkToken: (state) => {
      state.isTokenChecked = true;
    },

    receiveSms: (state) => {
      state.isSmsReceived = true;
    },

    requestSmsAgain: (state) => {
      state.isSmsReceived = false;
    },

    verifySms: (state) => {
      state.isSmsVerified = true;
    },

    setTempNumber: (state, { payload }) => {
      state.tempSmsNumber = payload;
    },

    setCaptcha: (state, { payload }) => {
      state.tempCaptchaText = payload.text;
    },
  },
});

export const {
  userLogin,
  setCaptcha,
  checkToken,
  userLogout,
  receiveSms,
  updateAddress,
  verifySms,
  setTempNumber,
  requestSmsAgain,
} = authSlice.actions;

export default authSlice.reducer;
