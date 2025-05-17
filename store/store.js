import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/admin/userSlice";
import productReducer from "./slices/user/productSlice";
import adminProductReducer from "./slices/admin/adminProductSlice";
import adminCategoryReducer from "./slices/admin/adminCategorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    adminProduct: adminProductReducer,
    adminCategory: adminCategoryReducer,
  },
});

export default store;
