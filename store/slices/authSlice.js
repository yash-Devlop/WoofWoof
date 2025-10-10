// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// // Send OTP
// export const sendOtp = createAsyncThunk(
//   "auth/sendOtp",
//   async ({ email, username, phoneNumber }, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post("/api/auth/send-otp", {
//         email,
//         username,
//         phoneNumber,
//       });
//       return data;
//     } catch (err) {
//       return rejectWithValue(
//         err?.response?.data?.message || "Failed to send OTP"
//       );
//     }
//   }
// );

// // Verify OTP
// export const verifyOtp = createAsyncThunk(
//   "auth/verifyOtp",
//   async ({ email, otp }, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post("/api/auth/verify-otp", { email, otp });
//       return data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response.data.message || "Failed to verify OTP"
//       );
//     }
//   }
// );

// export const registerUser = createAsyncThunk(
//   "/auth/registerUser",
//   async ({ email, password, confirmPassword }, { rejectWithValue }) => {
//     try {
//       const res = await axios.post("/api/auth/set-password", {
//         email,
//         password,
//         confirmPassword,
//       });
//       console.log("res data", res);
//       return res.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Registration failed"
//       );
//     }
//   }
// );

// let savedUser = null;

// if (typeof window !== "undefined") {
//   const stored = localStorage.getItem("WMPuser");
//   if (stored) {
//     try {
//       savedUser = JSON.parse(stored);
//     } catch (e) {
//       savedUser = null;
//     }
//   }
// }

// const initialState = {
//   user: savedUser,
//   isAuthenticated: false,
//   role: "user",
//   loading: false,
//   error: null,
//   otpVerified: false,
//   otpSend: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//       state.role = "user";
//       state.loading = false;
//       state.isAuthenticated = false;
//     },
//     resetAuthState: (state) => {
//       state.error = null;
//       state.loading = false;
//       state.otpVerified = false;
//       state.isAuthenticated = false;
//       (state.otpSend = false), (state.error = null);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(sendOtp.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(sendOtp.fulfilled, (state) => {
//         state.loading = false;
//         state.otpSend = true;
//       })
//       .addCase(sendOtp.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // verifyOtp
//       .addCase(verifyOtp.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(verifyOtp.fulfilled, (state) => {
//         state.loading = false;
//         state.otpVerified = true;
//       })
//       .addCase(verifyOtp.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//         state.role = action.payload.role;
//         localStorage.setItem("WMPuser", JSON.stringify(action.payload.email));
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout, resetAuthState } = authSlice.actions;
// export default authSlice.reducer;







import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// --- THUNKS ---

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async ({ email, username, phoneNumber }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/auth/send-otp", { email, username, phoneNumber });
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Failed to send OTP");
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/auth/verify-otp", { email, otp });
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Failed to verify OTP");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/set-password", { email, password, confirmPassword });
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password }, { withCredentials: true });
      if (res?.data?.status === 200) {
        localStorage.setItem("WMPuser", JSON.stringify(res.data.user));
        return res.data.user;
      } else {
        return rejectWithValue(res?.data?.message || "Login failed");
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Network error");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("WMPuser");
      return true;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Logout failed");
    }
  }
);

// --- INITIAL STATE ---
let savedUser = null;
if (typeof window !== "undefined") {
  const stored = localStorage.getItem("WMPuser");
  if (stored) {
    try {
      savedUser = JSON.parse(stored);
    } catch (e) {
      savedUser = null;
    }
  }
}

const initialState = {
  user: savedUser,
  isAuthenticated: !!savedUser,
  role: "user",
  loading: false,
  error: null,
  otpVerified: false,
  otpSend: false,
};

// --- SLICE ---
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.role = "user";
      state.loading = false;
      state.error = null;
      state.otpVerified = false;
      state.otpSend = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // OTP
      .addCase(sendOtp.pending, (state) => { state.loading = true; })
      .addCase(sendOtp.fulfilled, (state) => { state.loading = false; state.otpSend = true; })
      .addCase(sendOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(verifyOtp.pending, (state) => { state.loading = true; })
      .addCase(verifyOtp.fulfilled, (state) => { state.loading = false; state.otpVerified = true; })
      .addCase(verifyOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // REGISTER
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.role = action.payload.role;
        localStorage.setItem("WMPuser", JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // LOGIN
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.role = "user";
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
