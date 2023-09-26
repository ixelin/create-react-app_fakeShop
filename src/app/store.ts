import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/product/productSlice";
import userSlice from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    product: productSlice,
    user: userSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch