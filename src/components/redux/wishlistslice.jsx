import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

// ✅ Get all wishlists
export const getAllWishlists = createAsyncThunk(
  "wishlist/getAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().users.token;
      const res = await axios.get(`${API_URL}/allwishlists`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Get wishlist by Id
export const getWishlistById = createAsyncThunk(
  "wishlist/getById",
  async (wishlistId, { getState, rejectWithValue }) => {
    try {
      const token = getState().users.token;
      const res = await axios.get(`${API_URL}/wishlist/${wishlistId}`, {  // fixed URL
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Add product to wishlist
export const addProductToWishlist = createAsyncThunk(
  "wishlist/add",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const token = getState().users.token;
      const res = await axios.post(`${API_URL}/wishlist`, { product: productId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data.wishlist;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Remove product from wishlist
export const removeProductFromWishlist = createAsyncThunk(
  "wishlist/removeProduct",
  async ({ wishlistId, productId }, { getState, rejectWithValue }) => {
    try {
      const token = getState().users.token;
      const res = await axios.delete(`${API_URL}/remove/${wishlistId}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data.wishlist;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Delete entire wishlist
export const deleteWishlist = createAsyncThunk(
  "wishlist/delete",
  async (wishlistId, { getState, rejectWithValue }) => {
    try {
      const token = getState().users.token;
      await axios.delete(`${API_URL}/delete/wishlist/${wishlistId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return wishlistId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Update wishlist
export const updateWishlist = createAsyncThunk(
  "wishlist/update",
  async ({ wishlistId, changes }, { getState, rejectWithValue }) => {
    try {
      const token = getState().users.token;
      const res = await axios.put(`${API_URL}/update/${wishlistId}`, changes, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data.wishlist;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlists: [],
    currentWishlist: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all wishlists
      .addCase(getAllWishlists.pending, (state) => { state.loading = true; })
      .addCase(getAllWishlists.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlists = action.payload;
      })
      .addCase(getAllWishlists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get by Id
      .addCase(getWishlistById.pending, (state) => { state.loading = true; })
      .addCase(getWishlistById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWishlist = action.payload;
      })
      .addCase(getWishlistById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add product
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.wishlists.findIndex(w => w._id === updated._id);
        if (index >= 0) state.wishlists[index] = updated;
        else state.wishlists.push(updated);
      })
      // Remove single product
      .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.wishlists.findIndex(w => w._id === updated._id);
        if (index >= 0) state.wishlists[index] = updated;
      })
      // Delete wishlist
      .addCase(deleteWishlist.fulfilled, (state, action) => {
        state.wishlists = state.wishlists.filter(w => w._id !== action.payload);
        if (state.currentWishlist?._id === action.payload) state.currentWishlist = null;
      })
      // Update wishlist
      .addCase(updateWishlist.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.wishlists.findIndex(w => w._id === updated._id);
        if (index >= 0) state.wishlists[index] = updated;
        if (state.currentWishlist?._id === updated._id) state.currentWishlist = updated;
      });
  }
});

export default wishlistSlice.reducer;
