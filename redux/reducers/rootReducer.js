import counterSlice from "./counterSlice";
import authSlice from "./authSlice";
import loadingSlice from "./loadingSlice";
import productSlice from "./productSlice";

export const rootReducer = {
  counter: counterSlice,
  auth: authSlice,
  loading: loadingSlice,
  product: productSlice,
};
