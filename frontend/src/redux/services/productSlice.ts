import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import type { ProductsResponse, ProductState } from "../../types";
import type { RootState } from '../store/store';

const initialState: ProductState = {
    data: [],
    loading: false,
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
                const err = error as { code?: string; name?: string; message?: string; response?: { data?: any; status?: number } };
            return thunkAPI.rejectWithValue({
                message: err.response?.data?.message || err.message,
                status: err.response?.status || 500,
                error: err.response?.data || err.message,
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
            });
    },
});

export default productSlice.reducer;
