import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Add new address
export const addUserAddress = createAsyncThunk(
  "address/add",
  async (addressData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/user/address", addressData, {
        withCredentials: true,
      });
      toast.success("Address added successfully!");
      return res.data;
    } catch (error) {
      toast.error("Failed to add address.");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Edit existing address (you'll need to handle it in the API)
export const editUserAddress = createAsyncThunk(
  "address/edit",
  async ({ addressId, updatedData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `/api/user/address/${addressId}`,
        updatedData,
        { withCredentials: true }
      );
      toast.success("Address updated successfully!");
      return res.data;
    } catch (error) {
      toast.error("Failed to update address.");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch all addresses
export const fetchUserAddresses = createAsyncThunk(
  "address/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/user/address", {
        withCredentials: true,
      });
      return res.data.addresses;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.newAddress) {
          state.addresses.push(action.payload.newAddress);
        }
      })
      .addCase(addUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(editUserAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.updatedAddress;
        state.addresses = state.addresses.map((addr) =>
          addr._id === updated._id ? updated : addr
        );
      })
      .addCase(editUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUserAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addressSlice.reducer;
