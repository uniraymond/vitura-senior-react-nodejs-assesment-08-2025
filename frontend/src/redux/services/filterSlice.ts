import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserView } from "../../types";

export type FilterState = {
    view: UserView;
    q: string;
    onlyNew: boolean;
};

const initialState: FilterState = {
    view: 'doctor',
    q: '',
    onlyNew: false,
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setView(state, action: PayloadAction<UserView>) {
            state.view = action.payload;
        },
        setQ(state, action: PayloadAction<string>) {
            state.q = action.payload;
        },
        setOnlyNew(state, action: PayloadAction<boolean>) {
            state.onlyNew = action.payload;
        }
    }
});

export const {setView, setQ, setOnlyNew} = filterSlice.actions;
export default filterSlice.reducer;
