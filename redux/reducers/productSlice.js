import { createSlice } from "@reduxjs/toolkit";
import { PRODUCT } from "../constants/constants";

const initialState = {
  products: [],
  filteredProducts: [],
  shoppingCartIds: [],
  search: "",
  filter: "all",
  priceSort: "cheap",
};

export const productSlice = createSlice({
  name: PRODUCT,
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload;
    },

    getFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },

    searchValue: (state, action) => {
      state.search = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    setPriceSort: (state, action) => {
      state.priceSort = action.payload;
    },
    addToCart: (state, action) => {
      state.shoppingCartIds.push(action.payload);
    },

    removeFromCart: (state, action) => {
      state.shoppingCartIds = state.shoppingCartIds.filter(
        (id) => id !== action.payload
      );
    },

    loadCart: (state, action) => {
      state.shoppingCartIds = action.payload;
    },
  },
});

export const {
  addToCart,
  searchValue,
  setPriceSort,
  removeFromCart,
  setFilter,
  getFilteredProducts,
  loadCart,
  getProducts,
} = productSlice.actions;

export default productSlice.reducer;
