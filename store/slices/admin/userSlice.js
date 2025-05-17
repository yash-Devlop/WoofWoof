import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("admin/users/fetchUsers", async () => {
  const response = await axios.get("/api/admin/users");

  return response.data.users;
});

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      // Send delete request
      await axios.delete(`/api/admin/users?id=${id}`);
      dispatch(fetchUsers()); // Optionally dispatch another action to refresh the user list
    } catch (error) {
      // Handle any error (you can customize the rejection payload)
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
    selectedUser: null, // modal state
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSelectedUser, clearSelectedUser } = userSlice.actions;

export default userSlice.reducer;
