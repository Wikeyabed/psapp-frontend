import { createSlice } from "@reduxjs/toolkit";
import { NOTIFICATION } from "../constants/constants";

const initialState = {
  showNotification: false,
  message: "",
  color: "",
};

export const notificationSlice = createSlice({
  name: NOTIFICATION,
  initialState,
  reducers: {
    setNotificationOn: (state, { payload }) => {
      state.showNotification = true;
      state.message = payload.message;
      state.color = payload.color;
    },
    setNotificationOff: (state) => {
      state.showNotification = false;
    },
  },
});

export const { setNotificationOff, setNotificationOn } =
  notificationSlice.actions;

export default notificationSlice.reducer;
