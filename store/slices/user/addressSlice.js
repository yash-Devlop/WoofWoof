// store/slices/user/addressSlice.js
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
      return res.data;
    } catch (error) {
      toast.error("Failed to add address.");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Edit existing address
export const editUserAddress = createAsyncThunk(
  "address/edit",
  async ({ addressId, updatedData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `/api/user/address/${addressId}`,
        updatedData,
        { withCredentials: true }
      );
      return { ...res.data, addressId };
    } catch (error) {
      toast.error("Failed to update address.");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete address
export const deleteUserAddress = createAsyncThunk(
  "address/delete",
  async (addressId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/user/address/${addressId}`, {
        withCredentials: true,
      });
      toast.success("Address deleted successfully!");
      return { addressId };
    } catch (error) {
      toast.error("Failed to delete address.");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch all addresses
export const fetchUserAddresses = createAsyncThunk(
  "address/fetchAll",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const isAuthenticated = state.auth?.isAuthenticated;

      // Guest user – return empty array
      if (!isAuthenticated) {
        return [];
      }

      // Authenticated user – fetch from API
      const res = await axios.get("/api/user/address", {
        withCredentials: true,
      });
      return res.data.addresses || [];
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
  reducers: {
    clearAddresses: (state) => {
      state.addresses = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Address
      .addCase(addUserAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
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

      // Edit Address
      .addCase(editUserAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        const { addressId, updatedAddress } = action.payload;
        if (updatedAddress && addressId !== undefined) {
          state.addresses[addressId] = updatedAddress;
          
          // If this address is now default, unset others
          if (updatedAddress.isDefault) {
            state.addresses = state.addresses.map((addr, idx) => ({
              ...addr,
              isDefault: idx === addressId,
            }));
          }
        }
      })
      .addCase(editUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Address
      .addCase(deleteUserAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        const { addressId } = action.payload;
        state.addresses.splice(addressId, 1);
        
        // If no addresses left, or if we deleted the default, make first one default
        if (state.addresses.length > 0) {
          const hasDefault = state.addresses.some((addr) => addr.isDefault);
          if (!hasDefault) {
            state.addresses[0].isDefault = true;
          }
        }
      })
      .addCase(deleteUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Addresses
      .addCase(fetchUserAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
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

export const { clearAddresses } = addressSlice.actions;
export default addressSlice.reducer;