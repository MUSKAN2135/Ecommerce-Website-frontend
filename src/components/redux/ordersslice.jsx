import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

// Thunks
export const getAllorders = createAsyncThunk("orders/getAll", async () => {
  const res = await axios.get(`${API_URL}/allorders`);
  return res.data;
});

export const getorderById = createAsyncThunk("orders/getById", async (id) => {
  const res = await axios.get(`${API_URL}/order/${id}`);
  return res.data;
});

export const createorder = createAsyncThunk("orders/create", async (data) => {
  const res = await axios.post(`${API_URL}/order`, data);
  return res.data;
});

export const updateorder = createAsyncThunk("orders/update", async ({ id, data }) => {
  const res = await axios.put(`${API_URL}/update/order/${id}`, data);
  return res.data;
});

export const deleteorder = createAsyncThunk("orders/delete", async (id) => {
  await axios.delete(`${API_URL}/delete/order/${id}`);
  return id;
});

// Slice
const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    selectedorder: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All orders
      .addCase(getAllorders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllorders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllorders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // order by ID
      .addCase(getorderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getorderById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedorder = action.payload;
      })
      .addCase(getorderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })

      // Create
      .addCase(createorder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createorder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(createorder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })

      // Update
      .addCase(updateorder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateorder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.orders[index] = action.payload;
      })
      .addCase(updateorder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      })

      // Delete
      .addCase(deleteorder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteorder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(p => p._id !== action.payload);
      })
      .addCase(deleteorder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
      });
  },
});

export default orderSlice.reducer;
