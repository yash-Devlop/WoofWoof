import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createProduct = createAsyncThunk(
  "admin/products/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/admin/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.product;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk to fetch all products
export const fetchAllProductsAdmin = createAsyncThunk(
  "admin/products/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/admin/products");
      return res.data.products;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "admin/products/updateProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const isFormData = productData instanceof FormData;

      const config = {
        headers: {
          "Content-Type": isFormData
            ? "multipart/form-data"
            : "application/json",
        },
      };

      const id = isFormData ? productData.get("id") : productData.id;

      const response = await axios.patch(
        `/api/admin/products?id=${id}`,
        productData,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: "Unknown error" }
      );
    }
  }
);

// Async thunk to delete a product
export const deleteProduct = createAsyncThunk(
  "admin/products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/admin/products?id=${productId}`);
      return res.data; // full deleted product
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: {
    products: [],
    loading: false,
    error: null,
    selectedProduct: null,
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchAllProductsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProductsAdmin.fulfilled, (state, action) => {
        state.products = action.payload || [];
        state.loading = false;
      })
      .addCase(fetchAllProductsAdmin.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      //add product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload.product;

        // Update the local state by replacing the updated product
        state.products = state.products.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedProduct, clearSelectedProduct } =
  adminProductSlice.actions;

export default adminProductSlice.reducer;
