// src/redux/slices/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch all orders
export const fetchOrders = createAsyncThunk(
  "adminOrders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/admin/order");
      return response.data.allOrders;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to update order status
export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      console.log("Updating order:", orderId, "to status:", status);
      
      // Note: Using /api/admin/order/[id] - id matches the folder name
      const response = await axios.patch(
        `/api/admin/order/${orderId}`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("Update response:", response.data);
      return response.data.order;
    } catch (error) {
      console.error("Update order error:", error.response?.data || error.message);
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
    updateLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch orders
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
      })
      // Update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      });
  },
});

export default adminOrderSlice.reducer;