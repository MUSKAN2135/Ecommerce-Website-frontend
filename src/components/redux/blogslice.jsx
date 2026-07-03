import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

// Thunks
export const getAllblog = createAsyncThunk("blog/getAll", async () => {
  const res = await axios.get(`${API_URL}/allblogs`);
  return res.data;
});

export const getblogById = createAsyncThunk("blog/getById", async (id) => {
  const res = await axios.get(`${API_URL}/blog/${id}`);
  return res.data;
});

export const createblog = createAsyncThunk("blog/create", async (data) => {
  const res = await axios.post(`${API_URL}/create-blog`, data);
  return res.data;
});

export const updateblog = createAsyncThunk("blog/update", async ({ id, data }) => {
  const res = await axios.put(`${API_URL}/update/blog/${id}`, data);
  return res.data;
});

export const deleteblog = createAsyncThunk("blog/delete", async (id) => {
  await axios.delete(`${API_URL}/delete/blog/${id}`);
  return id;
});

// Slice
const bloglice = createSlice({
  name: 'blog',
  initialState: {
    blog: [],
    selectedblog: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All blog
      .addCase(getAllblog.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllblog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(getAllblog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // blog by ID
      .addCase(getblogById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getblogById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedblog = action.payload;
      })
      .addCase(getblogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })

      // Create
      .addCase(createblog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createblog.fulfilled, (state, action) => {
        state.blog.push(action.payload);
      })
      .addCase(createblog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })

      // Update
      .addCase(updateblog.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateblog.fulfilled, (state, action) => {
        const index = state.blog.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.blog[index] = action.payload;
      })
      .addCase(updateblog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })

      // Delete
      .addCase(deleteblog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteblog.fulfilled, (state, action) => {
        state.blog = state.blog.filter(p => p._id !== action.payload);
      })
      .addCase(deleteblog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      });
  },
});

export default bloglice.reducer;
