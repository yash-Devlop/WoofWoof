import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/admin/userSlice";
import productReducer from "./slices/user/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,

    product: productReducer,
  },
});

export default store;
