import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/admin/userSlice";
import productReducer from "./slices/user/productSlice";
import adminProductReducer from "./slices/admin/adminProductSlice";
import adminCategoryReducer from "./slices/admin/adminCategorySlice";
import userCartReducer from "./slices/user/cartSlice";
import addressReducer from "./slices/user/addressSlice";
import adminOrderSlice from "./slices/admin/adminOrderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    adminProduct: adminProductReducer,
    adminCategory: adminCategoryReducer,
    userCart: userCartReducer,
    address: addressReducer,
    adminOrder: adminOrderSlice,
  },
});

export default store;
