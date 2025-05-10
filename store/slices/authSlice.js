import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Send OTP
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async ({ email, username, phoneNumber }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/auth/send-otp", {
        email,
        username,
        phoneNumber,
      });
      return data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to send OTP"
      );
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/auth/verify-otp", { email, otp });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response.data.message || "Failed to verify OTP"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "/auth/registerUser",
  async ({ email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/set-password", {
        email,
        password,
        confirmPassword,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  role: "user",
  loading: false,
  error: null,
  otpVerified: false,
  otpSend: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = "user";
      state.loading = false;
      state.isAuthenticated = false;
    },
    resetAuthState: (state) => {
      state.error = null;
      state.loading = false;
      state.otpVerified = false;
      state.isAuthenticated = false;
      (state.otpSend = false), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSend = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // verifyOtp
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.role = action.payload.role;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
