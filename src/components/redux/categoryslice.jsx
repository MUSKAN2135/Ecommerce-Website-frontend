import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

// Thunks
export const getAllcategories = createAsyncThunk("category/getAll", async () => {
  const res = await axios.get(`${API_URL}/allcategory`);
  return res.data;
});

export const getcategoryById = createAsyncThunk("/getById", async (id) => {
  const res = await axios.get(`${API_URL}/category/${id}`);
  return res.data;
});

export const createcategory = createAsyncThunk("category/create", async (data) => {
  const res = await axios.post(`${API_URL}/category`, data);
  return res.data;
});

export const updatecategory = createAsyncThunk("category/update", async ({ id, data }) => {
  const res = await axios.put(`${API_URL}/update/category/${id}`, data);
  return res.data;
});

export const deletecategory = createAsyncThunk("category/delete", async (id) => {
  await axios.delete(`${API_URL}/delete/category/${id}`);
  return id;
});

// Slice
const categorieslice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    selectedcategory: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All categories
      .addCase(getAllcategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllcategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getAllcategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // category by ID
      .addCase(getcategoryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getcategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedcategory = action.payload;
      })
      .addCase(getcategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })

      // Create
      .addCase(createcategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createcategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(createcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })

      // Update
      .addCase(updatecategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatecategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.categories[index] = action.payload;
      })
      .addCase(updatecategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })

      // Delete
      .addCase(deletecategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletecategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(p => p._id !== action.payload);
      })
      .addCase(deletecategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      });
  },
});

export default categorieslice.reducer;
