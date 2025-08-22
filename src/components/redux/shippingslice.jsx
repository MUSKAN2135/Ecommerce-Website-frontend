import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

// Thunks
export const getAllshipping = createAsyncThunk("shipping/getAll", async () => {
  const res = await axios.get(`${API_URL}/allshippingAddress`);
  return res.data;
});

export const getshippingById = createAsyncThunk("shipping/getById", async (id) => {
  const res = await axios.get(`${API_URL}/shipping/${id}`);
  return res.data;
});

export const createshipping = createAsyncThunk("shipping/create", async (data) => {
  const res = await axios.post(`${API_URL}/shipping`, data);
  return res.data;
});

export const updateshipping = createAsyncThunk("shipping/update", async ({ id, data }) => {
  const res = await axios.put(`${API_URL}/update/shipping/${id}`, data);
  return res.data;
});

export const deleteshipping = createAsyncThunk("shipping/delete", async (id) => {
  await axios.delete(`${API_URL}/delete/shipping/${id}`);
  return id;
});

// Slice
const shippinglice = createSlice({
  name: 'shipping',
  initialState: {
    shipping: [],
    selectedshipping: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All shipping
      .addCase(getAllshipping.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllshipping.fulfilled, (state, action) => {
        state.loading = false;
        state.shipping = action.payload;
      })
      .addCase(getAllshipping.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // shipping by ID
      .addCase(getshippingById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getshippingById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedshipping = action.payload;
      })
      .addCase(getshippingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })

      // Create
      .addCase(createshipping.pending, (state) => {
        state.loading = true;
      })
      .addCase(createshipping.fulfilled, (state, action) => {
        state.shipping.push(action.payload);
      })
      .addCase(createshipping.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })

      // Update
      .addCase(updateshipping.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateshipping.fulfilled, (state, action) => {
        const index = state.shipping.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.shipping[index] = action.payload;
      })
      .addCase(updateshipping.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })

      // Delete
      .addCase(deleteshipping.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteshipping.fulfilled, (state, action) => {
        state.shipping = state.shipping.filter(p => p._id !== action.payload);
      })
      .addCase(deleteshipping.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      });
  },
});

export default shippinglice.reducer;
