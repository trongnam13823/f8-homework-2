import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./services/product";
import productReducer from "./features/product/productSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
});

export default store;
