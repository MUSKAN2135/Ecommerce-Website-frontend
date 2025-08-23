import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

// Fetch all orders
export const getAllorders = createAsyncThunk(
  "orders/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // ✅ dynamic read
      const res = await axios.get(`${API_URL}/allorders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update order
export const updateOrder = createAsyncThunk(
  "orders/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // ✅ dynamic read
      const res = await axios.put(`${API_URL}/update/order/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete order
export const deleteOrder = createAsyncThunk(
  "orders/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // ✅ dynamic read
      await axios.delete(`${API_URL}/delete/order/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get order by ID
export const getorderById = createAsyncThunk(
  "orders/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/order/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create order
export const createorder = createAsyncThunk(
  "orders/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/order`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

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
      // Get all orders
      .addCase(getAllorders.pending, (state) => { state.loading = true; })
      .addCase(getAllorders.fulfilled, (state, action) => { state.loading = false; state.orders = action.payload; })
      .addCase(getAllorders.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Get order by ID
      .addCase(getorderById.pending, (state) => { state.loading = true; })
      .addCase(getorderById.fulfilled, (state, action) => { state.loading = false; state.selectedorder = action.payload; })
      .addCase(getorderById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Create order
      .addCase(createorder.pending, (state) => { state.loading = true; })
      .addCase(createorder.fulfilled, (state, action) => { state.orders.push(action.payload); })
      .addCase(createorder.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Update order
      .addCase(updateOrder.pending, (state) => { state.loading = true; })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.orders[index] = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Delete order
      .addCase(deleteOrder.pending, (state) => { state.loading = true; })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(p => p._id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default orderSlice.reducer;
