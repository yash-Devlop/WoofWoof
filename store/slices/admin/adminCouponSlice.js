import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCoupon = createAsyncThunk(
  "admin/coupons/createCoupon",
  async (couponData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/admin/coupons", couponData);
      return res.data.coupon;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Error creating coupon" });
    }
  }
);

export const fetchAllCoupons = createAsyncThunk(
  "admin/coupons/fetchAllCoupons",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/admin/coupons");
      return res.data.coupons;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Error fetching coupons" });
    }
  }
);

export const updateCoupon = createAsyncThunk(
  "admin/coupons/updateCoupon",
  async (couponData, { rejectWithValue }) => {
    try {
      const id = couponData._id; // take _id
      const body = { id, ...couponData }; // add id field
      delete body._id; // remove _id to avoid duplicate
      const res = await axios.patch(`/api/admin/coupons?id=${id}`, body);
      return res.data.coupon;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Error updating coupon" }
      );
    }
  }
);


export const deleteCoupon = createAsyncThunk(
  "admin/coupons/deleteCoupon",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/admin/coupons?id=${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Error deleting coupon" });
    }
  }
);

const couponSlice = createSlice({
  name: "adminCoupons",
  initialState: {
    coupons: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchAllCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons.unshift(action.payload);
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        state.coupons = state.coupons.map((c) =>
          c._id === updated._id ? updated : c
        );
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = state.coupons.filter(
          (c) => c._id !== action.meta.arg
        );
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default couponSlice.reducer;
