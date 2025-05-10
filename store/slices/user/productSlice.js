import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { getState }) => {
    const { pagination, filters, sorting } = getState().product;

    const query = `?category=${filters.category}&minPrice=${
      filters.minPrice
    }&maxPrice=${filters.maxPrice}&tags=${filters.tags.join(",")}&sortType=${
      sorting.type
    }&sortOrder=${sorting.order}&page=${pagination}`;

    const response = await axios.get(`/api/user/product${query}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    totalPages: 1,
    filters: {
      category: "",
      tags: [],
      minPrice: 0,
      maxPrice: 5000,
    },
    sorting: {
      type: "price", // 'price', 'popularity', or 'latest'
      order: "asc", // 'asc' or 'desc'
    },
    pagination: 1,
    status: "idle",
  },
  reducers: {
    setCategory: (state, action) => {
      state.filters.category = action.payload;
    },
    toogleTag: (state, action) => {
      const tag = action.payload;
      if (state.filters.tags.includes(tag)) {
        state.filters.tags = state.filters.tags.filter((t) => t !== tag);
      } else {
        state.filters.tags.push(tag);
      }
    },
    setPriceRange: (state, action) => {
      const [min, max] = action.payload;
      state.filters.minPrice = min;
      state.filters.maxPrice = max;
    },
    setSort: (state, action) => {
      state.sorting = action.payload; // Expects { type: 'price', order: 'asc' }
    },
    setPage: (state, action) => {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
        console.error("Fetch failed:", action.error);
      });
  },
});

export const { setCategory, toogleTag, setPriceRange, setSort, setPage } =
  productSlice.actions;
export default productSlice.reducer;
