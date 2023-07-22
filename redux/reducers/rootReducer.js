import authSlice from "./authSlice";
import loadingSlice from "./loadingSlice";
import notificationSlice from "./notificationSlice";
import productSlice from "./productSlice";

export const rootReducer = {
  auth: authSlice,
  loading: loadingSlice,
  product: productSlice,
  notification: notificationSlice,
};
