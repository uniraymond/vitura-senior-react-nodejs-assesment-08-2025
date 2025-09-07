import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import productReducer from "../services/productSlice";
import filterReducer from "../services/filterSlice";

const store = configureStore({
    reducer: {
        product: productReducer,
        filters: filterReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;