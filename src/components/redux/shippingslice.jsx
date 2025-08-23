import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

const getAuthHeader = (getState) => {
  const token = getState().users.token;
  return { Authorization: `Bearer ${token}` };
};

// Thunks
export const getAllshipping = createAsyncThunk(
  "shipping/getAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/allShippingAddress`, { headers: getAuthHeader(getState) });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getshippingById = createAsyncThunk(
  "shipping/getById",
  async (id, { getState, rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/shipping/${id}`, { headers: getAuthHeader(getState) });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createshipping = createAsyncThunk(
  "shipping/create",
  async (data, { getState, rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/shipping`, data, { headers: getAuthHeader(getState) });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateshipping = createAsyncThunk(
  "shipping/update",
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/update/shipping/${id}`, data, { headers: getAuthHeader(getState) });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteshipping = createAsyncThunk(
  "shipping/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_URL}/delete/shipping/${id}`, { headers: getAuthHeader(getState) });
      return res.data.id; // ✅ return deleted id
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Slice
const shippingSlice = createSlice({
  name: "shipping",
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
      .addCase(getAllshipping.pending, (state) => { state.loading = true; })
      .addCase(getAllshipping.fulfilled, (state, action) => { state.loading = false; state.shipping = action.payload; })
      .addCase(getAllshipping.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Shipping by ID
      .addCase(getshippingById.pending, (state) => { state.loading = true; })
      .addCase(getshippingById.fulfilled, (state, action) => { state.loading = false; state.selectedshipping = action.payload; })
      .addCase(getshippingById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Create
      .addCase(createshipping.pending, (state) => { state.loading = true; })
      .addCase(createshipping.fulfilled, (state, action) => { state.loading = false; state.shipping.push(action.payload); })
      .addCase(createshipping.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Update
      .addCase(updateshipping.pending, (state) => { state.loading = true; })
      .addCase(updateshipping.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.shipping.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.shipping[index] = action.payload;
      })
      .addCase(updateshipping.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Delete
      .addCase(deleteshipping.pending, (state) => { state.loading = true; })
      .addCase(deleteshipping.fulfilled, (state, action) => {
        state.loading = false;
        state.shipping = state.shipping.filter(p => p._id !== action.payload);
      })
      .addCase(deleteshipping.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default shippingSlice.reducer;
