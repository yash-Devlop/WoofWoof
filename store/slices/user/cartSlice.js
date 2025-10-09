// /store/slices/user/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Async thunk to add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity, size, color }, { rejectWithValue }) => {
    const userEmail = localStorage.getItem("WMPuser");

    if (!userEmail) {
      toast.error("Please login to add this product to your cart.");
      return rejectWithValue("Not logged in");
    }

    const loadingToast = toast.loading("Adding to cart...");

    try {
      const res = await axios.post(
        "/api/cart/add",
        { productId, quantity, size, color }, // ✅ added
        { withCredentials: true }
      );

      toast.dismiss(loadingToast);
      toast.success("Product added to cart!");
      return res.data;
    } catch (error) {
      toast.dismiss(loadingToast);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        return rejectWithValue("Unauthorized");
      }
      toast.error(error.response?.data?.message || "Failed to add to cart.");
      return rejectWithValue(error.message);
    }
  }
);



// fetch all the cart items
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/cart/get", { withCredentials: true });
      console.log(res.data.items);
      return res?.data?.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Failed to load cart."
      );
    }
  }
);

//remove product from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, thunkAPI) => {
    console.log("productId", productId);
    try {
      await axios.post(
        "/api/cart/remove",
        { productId },
        { withCredentials: true }
      );
      toast.success("Item removed from cart.");
      thunkAPI.dispatch(fetchCart());
    } catch (err) {
      toast.error("Error removing item.");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

//update the quantity of the product in the cart
export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      await axios.post(
        "/api/cart/update",
        { productId, quantity },
        { withCredentials: true }
      );
      thunkAPI.dispatch(fetchCart());
    } catch (err) {
      toast.error("Error updating quantity.");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.cartItems || state.items;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error adding to cart";
      })

      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCartQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
