import counterSlice from "./counterSlice";
import authSlice from "./authSlice";

export const rootReducer = {
  counter: counterSlice,
  auth: authSlice,
};
