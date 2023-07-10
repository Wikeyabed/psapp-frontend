import { createSlice } from "@reduxjs/toolkit";
import { LOADING } from "../constants/constants";

const initialState = {
  loading: false,
  progress: 0,
};

export const loadingSlice = createSlice({
  name: LOADING,
  initialState,
  reducers: {
    setLoadingOn: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.loading = true;
    },
    setLoadingOff: (state) => {
      state.loading = false;
    },
    startProgress: (state) => {
      state.progress = Math.floor(Math.random() * (50 - 20 + 1) + 20);
    },
    endProgress: (state) => {
      state.progress = 100;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoadingOff, setLoadingOn, startProgress, endProgress } =
  loadingSlice.actions;

export default loadingSlice.reducer;
