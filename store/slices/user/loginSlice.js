import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"; // for client cookie access

// ✅ Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/login", formData, {
        withCredentials: true,
      });

      if (res?.data?.status === 200) {
        // Store token or user in localStorage or cookie
        localStorage.setItem("WMPuser", formData.email);
        return {
          email: formData.email,
          token: Cookies.get("auth-token") || null,
        };
      } else {
        return rejectWithValue(res?.data?.message || "Invalid credentials");
      }
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Network error during login"
      );
    }
  }
);

// ✅ Sync thunk for logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
  } catch (error) {
    console.warn("Logout API failed:", error);
  }
  localStorage.removeItem("WMPuser");
  Cookies.remove("auth-token");
  return true;
});

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Check if already logged in on app load
    checkAuthState: (state) => {
      const storedUser = localStorage.getItem("WMPuser");
      const token = Cookies.get("auth-token");

      if (storedUser && token) {
        state.user = storedUser;
        state.token = token;
        state.isLoggedIn = true;
      } else {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ LOGIN
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isLoggedIn = false;
      })

      // ✅ LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.status = "idle";
      });
  },
});

export const { checkAuthState } = authSlice.actions;
export default authSlice.reducer;
