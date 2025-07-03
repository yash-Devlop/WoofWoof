// src/redux/slices/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch all orders
export const fetchOrders = createAsyncThunk(
  "adminOrders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/admin/order");
      return response.data.allOrders; // Adjust based on your backend response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const adminOrderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminOrderSlice.reducer;
