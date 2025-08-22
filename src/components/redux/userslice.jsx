import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

// Async thunks
export const signupUser = createAsyncThunk("users/signup", async (formData) => {
  const res = await axios.post(`${API_URL}/signup`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
});

export const loginUser = createAsyncThunk("users/login", async (data) => {
  const res = await axios.post(`${API_URL}/login`, data, {
    headers: { "Content-Type": "application/json" }
  });
  return res.data
});

export const getAllusers = createAsyncThunk("users/getAll", async () => {
  const res = await axios.get(`${API_URL}/allusers`);
  return res.data;
});

export const getuserById = createAsyncThunk("users/getById", async (id) => {
  const res = await axios.get(`${API_URL}/user/${id}`);
  return res.data;
});

export const updateuser = createAsyncThunk("users/update", async ({ id, data }) => {
  const res = await axios.put(`${API_URL}/update/user/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
});

export const deleteuser = createAsyncThunk("users/delete", async (id) => {
  await axios.delete(`${API_URL}/delete/user/${id}`);
  return id;
});

// Slice
const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    selecteduser: null,
    currentUser: null,
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem("token");
      state.success = false;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Signup
    builder
      .addCase(signupUser.pending, (state) => { state.loading = true; })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.users.push(action.payload);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || action.error.message;
      });

    // Get all users
    builder
      .addCase(getAllusers.pending, (state) => { state.loading = true; })
      .addCase(getAllusers.fulfilled, (state, action) => { state.loading = false; state.users = action.payload; });

    // Get user by ID
    builder
      .addCase(getuserById.pending, (state) => { state.loading = true; })
      .addCase(getuserById.fulfilled, (state, action) => { state.loading = false; state.selecteduser = action.payload; })
      .addCase(getuserById.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });

    // Update
    builder
      .addCase(updateuser.pending, (state) => { state.loading = true; })
      .addCase(updateuser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(updateuser.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });

    // Delete
    builder
      .addCase(deleteuser.pending, (state) => { state.loading = true; })
      .addCase(deleteuser.fulfilled, (state, action) => {
        state.users = state.users.filter(p => p._id !== action.payload);
      })
      .addCase(deleteuser.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
