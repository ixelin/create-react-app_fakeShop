import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./../../types/Product";

interface TInitialState {
  product: Product | null;
  products: Product[];
}

const initialState: TInitialState = {
  product: null,
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    createProduct: (state, action: PayloadAction<Product>) => {
      const largestId = state.products[state.products.length - 1].id
      state.products.push({ ...action.payload,  id: largestId + 1, });
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setProduct: (state, action: PayloadAction<Product | null>) => {
      state.product = action.payload;
    },
  },
});

export const {
  createProduct,
  deleteProduct,
  updateProduct,
  setProducts,
  setProduct,
} = productSlice.actions;

export default productSlice.reducer;
