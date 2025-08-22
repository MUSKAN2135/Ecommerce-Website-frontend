// src/redux/addtocartslice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL
const BASE_URL = "http://localhost:3000/api/v1";

// Get all carts for logged-in user
export const getAllCarts = createAsyncThunk(
  "cart/getAllCarts",
  async (_, { rejectWithValue, getState }) => {
    const token = getState().users.token;
    try {
      const res = await axios.get(`${BASE_URL}/getAllCarts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// Add product to cart
export const createAddToCart = createAsyncThunk(
  "cart/createAddToCart",
  async (productId, { rejectWithValue, getState }) => {
    const token = getState().users.token;
    try {
      const res = await axios.post(`${BASE_URL}/CreateAddToCart/${productId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// Update product quantity
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ cartId, productId, quantity }, { rejectWithValue, getState }) => {
    const token = getState().users.token;
    try {
      const res = await axios.put(`${BASE_URL}/updateQuantity/${cartId}/${productId}`, { quantity }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// Delete product or entire cart
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ cartId, productId }, { rejectWithValue, getState }) => {
    const token = getState().users.token;
    try {
      const res = await axios.delete( `${BASE_URL}/deleteCart/${cartId}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.cart || null;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllCarts
      .addCase(getAllCarts.pending, (state) => { state.loading = true; })
      .addCase(getAllCarts.fulfilled, (state, action) => { state.loading = false; state.cart = action.payload; })
      .addCase(getAllCarts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // createAddToCart
      .addCase(createAddToCart.pending, (state) => { state.loading = true; })
      .addCase(createAddToCart.fulfilled, (state, action) => { state.loading = false; state.cart = action.payload; })
      .addCase(createAddToCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // updateCartQuantity
      .addCase(updateCartQuantity.pending, (state) => { state.loading = true; })
      .addCase(updateCartQuantity.fulfilled, (state, action) => { state.loading = false; state.cart = action.payload; })
      .addCase(updateCartQuantity.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // deleteCartItem
      .addCase(deleteCartItem.pending, (state) => { state.loading = true; })
      .addCase(deleteCartItem.fulfilled, (state, action) => { state.loading = false; state.cart = action.payload; })
      .addCase(deleteCartItem.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default cartSlice.reducer;
