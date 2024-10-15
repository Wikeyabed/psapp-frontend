import { createSlice } from "@reduxjs/toolkit";
import { PRODUCT } from "../constants/constants";

const initialState = {
  products: [],
  shoppingCart: [],
  productVariants: null,
  allVariants: null,
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

    setProductVariant: (state, action) => {
      state.productVariants = action.payload;
    },

    setAllVariant: (state, action) => {
      state.allVariants = action.payload;
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
        (product) => product.variant_uuid != action.payload
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
  setAllVariant,
  getProducts,
  setProductVariant,
} = productSlice.actions;

export default productSlice.reducer;
