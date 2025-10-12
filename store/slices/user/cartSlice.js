import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// -------------------- ADD TO CART --------------------
// -------------------- ADD TO CART --------------------
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity, size, color }, { rejectWithValue, getState }) => {
    const state = getState();
    const isAuthenticated = state.auth?.isAuthenticated;

    // 🧩 GUEST USER LOGIC
    if (!isAuthenticated) {
      try {
        let guestCart = localStorage.getItem("guestCart");
        guestCart = guestCart ? JSON.parse(guestCart) : [];

        // 🧮 Calculate total quantity already in cart
        const totalQuantity = guestCart.reduce(
          (sum, item) => sum + (item.quantity || 0),
          0
        );

        // If adding this item exceeds total limit of 5
        if (totalQuantity + quantity > 5) {
          toast.error("You can only have up to 5 total items in your cart as a guest.");
          return rejectWithValue("Guest cart total quantity limit reached");
        }

        // 🔍 Check if same product already exists
        const existingIndex = guestCart.findIndex((item) => {
          const sameProduct = item.productId === productId;
          const sameSize = item.size === size || (!item.size && !size);
          const sameColor =
            (item.color?.code || null) === (color?.code || null) &&
            (item.color?.name || null) === (color?.name || null);
          return sameProduct && sameSize && sameColor;
        });

        if (existingIndex !== -1) {
          guestCart[existingIndex].quantity += quantity;
        } else {
          guestCart.push({
            productId,
            quantity,
            size: size || null,
            color: color || null,
            addedAt: new Date().toISOString(),
          });
        }

        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        toast.success("Product added to cart!");
        return { guestCart };
      } catch (err) {
        console.error("Guest cart error:", err);
        toast.error("Failed to add product to cart");
        return rejectWithValue("Guest cart error");
      }
    }

    // 🧩 AUTHENTICATED USER LOGIC
    const loadingToast = toast.loading("Adding to cart...");
    try {
      const res = await axios.post(
        "/api/cart/add",
        { productId, quantity, size, color },
        { withCredentials: true }
      );
      toast.dismiss(loadingToast);
      toast.success("Product added to cart!");
      return res.data;
    } catch (error) {
      toast.dismiss(loadingToast);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        return rejectWithValue("Unauthorized");
      }
      toast.error(error.response?.data?.message || "Failed to add to cart.");
      return rejectWithValue(error.message);
    }
  }
);


// -------------------- FETCH CART --------------------
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const isAuthenticated = state.auth?.isAuthenticated;

      // 🧩 Guest user
      if (!isAuthenticated) {
        let guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");

        if (guestCart.length === 0) {
          return {
            _id: null,
            user: null,
            items: [],
            createdAt: null,
            updatedAt: null,
            __v: 0,
          };
        }

        const ids = [...new Set(guestCart.map((i) => i.productId))];
        const res = await axios.post("/api/cart/get", { ids }, { withCredentials: true });
        const products = Array.isArray(res.data) ? res.data : [];

        const items = guestCart.map((item) => ({
          ...item,
          product: products.find((p) => p._id === item.productId) || null,
        }));

        return {
          _id: null,
          user: null,
          items,
          createdAt: null,
          updatedAt: new Date().toISOString(),
          __v: items.length,
        };
      }

      // 🧩 Authenticated user
      const res = await axios.get("/api/cart/get", { withCredentials: true });
      return res?.data || { items: [] };
    } catch (error) {
      console.error("FetchCart Error:", error);
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to load cart.");
    }
  }
);

// -------------------- REMOVE FROM CART --------------------
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, thunkAPI) => {
    const state = thunkAPI.getState();
    const isAuthenticated = state.auth?.isAuthenticated;

    // 🧩 Guest user
    if (!isAuthenticated) {
      try {
        let guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        guestCart = guestCart.filter((item) => item.productId !== productId);
        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        toast.success("Item removed from cart.");
        thunkAPI.dispatch(fetchCart());
        return { guestCart };
      } catch (err) {
        toast.error("Error removing item.");
        return thunkAPI.rejectWithValue(err.message);
      }
    }

    // 🧩 Authenticated user
    try {
      await axios.post("/api/cart/remove", { productId }, { withCredentials: true });
      toast.success("Item removed from cart.");
      thunkAPI.dispatch(fetchCart());
    } catch (err) {
      toast.error("Error removing item.");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// -------------------- UPDATE CART QUANTITY --------------------
// -------------------- UPDATE CART QUANTITY --------------------
export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }, thunkAPI) => {
    const state = thunkAPI.getState();
    const isAuthenticated = state.auth?.isAuthenticated;

    // 🧩 Guest user
    if (!isAuthenticated) {
      try {
        let guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");

        // Calculate total quantity if this update is applied
        const totalQuantity = guestCart.reduce((sum, item) => {
          if (item.productId === productId) return sum + quantity;
          return sum + item.quantity;
        }, 0);

        if (totalQuantity > 5) {
          toast.error("You can only have up to 5 items in your cart as a guest.");
          return rejectWithValue("Guest cart limit reached");
        }

        const index = guestCart.findIndex((item) => item.productId === productId);
        if (index !== -1) {
          guestCart[index].quantity = quantity;
          localStorage.setItem("guestCart", JSON.stringify(guestCart));
          toast.success("Cart updated.");
          thunkAPI.dispatch(fetchCart());
          return { guestCart };
        }
      } catch (err) {
        toast.error("Error updating cart.");
        return rejectWithValue(err.message);
      }
    }


    // 🧩 Authenticated user
    try {
      await axios.post("/api/cart/update", { productId, quantity }, { withCredentials: true });
      thunkAPI.dispatch(fetchCart());
    } catch (err) {
      toast.error("Error updating quantity.");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


// -------------------- SLICE --------------------
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.guestCart) {
          const guestCart = action.payload.guestCart;
          state.cart = { ...state.cart, items: guestCart };
          state.items = guestCart;
        } else {
          state.cart = action.payload;
          state.items = action.payload.items || [];
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error adding to cart";
      })

      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.items = action.payload.items || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove / Update
      .addCase(removeFromCart.pending, (state) => { state.loading = true; })
      .addCase(removeFromCart.fulfilled, (state) => { state.loading = false; })
      .addCase(removeFromCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(updateCartQuantity.pending, (state) => { state.loading = true; })
      .addCase(updateCartQuantity.fulfilled, (state) => { state.loading = false; })
      .addCase(updateCartQuantity.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default cartSlice.reducer;
