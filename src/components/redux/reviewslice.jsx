import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

// Thunks
export const getAllreview = createAsyncThunk("review/getAll", async () => {
  const res = await axios.get(`${API_URL}/allreviews`);
  return res.data;
});

export const getreviewById = createAsyncThunk("review/getById", async (id) => {
  const res = await axios.get(`${API_URL}/review/${id}`);
  return res.data;
});

export const createreview = createAsyncThunk("review/create", async (data) => {
  const res = await axios.post(`${API_URL}/review`, data);
  return res.data;
});

export const updatereview = createAsyncThunk("review/update", async ({ id, data }) => {
  const res = await axios.put(`${API_URL}/update/review/${id}`, data);
  return res.data;
});

export const deletereview = createAsyncThunk("review/delete", async (id) => {
  await axios.delete(`${API_URL}/delete/review/${id}`);
  return id;
});

// Slice
const reviewlice = createSlice({
  name: 'reviews',
  initialState: {
    review: [],
    selectedreview: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All review
      .addCase(getAllreview.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllreview.fulfilled, (state, action) => {
        state.loading = false;
        state.review = action.payload;
      })
      .addCase(getAllreview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // review by ID
      .addCase(getreviewById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getreviewById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedreview = action.payload;
      })
      .addCase(getreviewById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })

      // Create
      .addCase(createreview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createreview.fulfilled, (state, action) => {
        state.review.push(action.payload);
      })
      .addCase(createreview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })

      // Update
      .addCase(updatereview.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatereview.fulfilled, (state, action) => {
        const index = state.review.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.review[index] = action.payload;
      })
      .addCase(updatereview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })

      // Delete
      .addCase(deletereview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletereview.fulfilled, (state, action) => {
        state.review = state.review.filter(p => p._id !== action.payload);
      })
      .addCase(deletereview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      });
  },
});

export default reviewlice.reducer;
