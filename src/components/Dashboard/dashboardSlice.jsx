import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    baseLoading: false,
};

const dashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState,
    reducers: {
        getLoading(state) {
            state.baseLoading = true;
        }
    }
});

export const {
    getLoading,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;