import { createSlice } from "@reduxjs/toolkit";
import { PRODUCT } from "../constants/constants";

const initialState = {
  products: [],
  shoppingCart: [],
  productVariants: [],
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

    getProductVariants: (state, action) => {
      state.productVariants = action.payload;
    },

    searchValue: (state, action) => {
      state.search = action.payload;
    },
    clearSearch: (state) => {
      state.search = "";
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    setPriceSort: (state, action) => {
      state.priceSort = action.payload;
    },
    addToCart: (state, action) => {
      state.shoppingCart = action.payload;
    },

    removeFromCart: (state, action) => {
      state.shoppingCart = state.shoppingCart.filter(
        (product) => product.product_uuid != action.payload
      );
    },
  },
});

export const {
  addToCart,
  searchValue,
  clearSearch,
  setPriceSort,
  removeFromCart,
  setFilter,
  loadCart,
  getProducts,
} = productSlice.actions;

export default productSlice.reducer;
