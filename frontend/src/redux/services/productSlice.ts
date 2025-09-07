import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios, { isAxiosError } from "axios";
import type { Product, ProductsResponse, ProductState } from "../../types";
import type { RootState } from '../store/store';

const initialState: ProductState = {
    data: [],
    Loading: false,
    status: null,
    error: null,
    count: 0,
};

export const fetchProduct = createAsyncThunk<ProductsResponse, void, {state: RootState}> (
    "data/fetchProduct",
    async (_void, thunkAPI) => {
        try {
            const {view, q, onlyNew} = thunkAPI.getState().filters;

            const response = await axios.get<ProductsResponse>('http://localhost:5050/products', {
                params: {
                    view,
                    ...(q && { q }),
                    ...(onlyNew && { onlyNew: true }),
                },
                signal: thunkAPI.signal,
            });

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({
                message: error.response?.data?.message || error.message,
                status: error.response?.status || 500,
                error: error.response?.data || error.message,
            });
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.loading = true;
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.count = action.payload.count;
                state.status = "succeeded";
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.loading = false;
                state.status = "failed";
                if ((action.payload as any)?.canceled) {
                    return;
                }
                state.error = action.error.message ?? 'Fetch failed';
                state.errorDetails = action.error;
            });
    },
});

export default productSlice.reducer;
