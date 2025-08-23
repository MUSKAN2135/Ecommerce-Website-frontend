import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

// --- Async thunks ---

export const signupUser = createAsyncThunk(
  "users/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/signup`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/login`, data, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data; // { user, token }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const getAllusers = createAsyncThunk(
  "users/getAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().users;
      const res = await axios.get(`${API_URL}/allusers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Fetching users failed");
    }
  }
);

export const getuserById = createAsyncThunk(
  "users/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/user/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Fetching user failed");
    }
  }
);

export const updateuser = createAsyncThunk(
  "users/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/update/user/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

export const deleteuser = createAsyncThunk(
  "users/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/delete/user/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);

export const sendContactMessage = createAsyncThunk(
  "users/sendContactMessage",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/contact`, formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Sending message failed");
    }
  }
);

// --- Slice ---

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    selecteduser: null,
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      state.success = false;
    },
    clearError: (state) => { state.error = null; },
    resetSuccess: (state) => { state.success = false; },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false; state.success = true; state.users.push(action.payload);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false; state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; state.success = false; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false; state.success = true;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("currentUser", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.success = false; state.error = action.payload; })

      // Get all users
      .addCase(getAllusers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getAllusers.fulfilled, (state, action) => { state.loading = false; state.users = action.payload; })
      .addCase(getAllusers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Get user by ID
      .addCase(getuserById.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getuserById.fulfilled, (state, action) => { state.loading = false; state.selecteduser = action.payload; })
      .addCase(getuserById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Update user
      .addCase(updateuser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateuser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(u => u._id === action.payload._id);
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(updateuser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Delete user
      .addCase(deleteuser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteuser.fulfilled, (state, action) => { state.loading = false; state.users = state.users.filter(u => u._id !== action.payload); })
      .addCase(deleteuser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Send contact message
      .addCase(sendContactMessage.pending, (state) => { state.loading = true; state.success = false; state.error = null; })
      .addCase(sendContactMessage.fulfilled, (state, action) => { state.loading = false; state.success = true; })
      .addCase(sendContactMessage.rejected, (state, action) => { state.loading = false; state.success = false; state.error = action.payload; });
  },
});

export const { logout, clearError, resetSuccess } = userSlice.actions;
export default userSlice.reducer;
