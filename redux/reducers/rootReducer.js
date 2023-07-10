import counterSlice from "./counterSlice";
import authSlice from "./authSlice";
import loadingSlice from "./loadingSlice";

export const rootReducer = {
  counter: counterSlice,
  auth: authSlice,
  loading: loadingSlice,
};
