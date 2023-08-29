import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_PRODUCTS } from "../actions/products";
import { IProduct } from "../../interfaces/product";

export const fetchProducts = createAsyncThunk(FETCH_PRODUCTS, async () => {
  const response = await fetch(
    "https://fakestoreapiserver.reactbd.com/products"
  );
  return await response.json();
});

export interface ProductsState {
  products: IProduct[];
  selectedProduct: IProduct | null;
}

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
};

export const productsSlice = createSlice({
  name: "bazaar",
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const { loadProducts, setSelectedProduct } = productsSlice.actions;

export default productsSlice.reducer;
