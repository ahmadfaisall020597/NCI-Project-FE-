import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    baseLoading: false,
}

const strukturOrganisasiSlice = createSlice({
    name: "strukturOrganisasiSlice",
    initialState,
    reducers: {
        getLoading(state) {
            state.baseLoading = true;
        }
    }
});

export const {
    getLoading,
} = strukturOrganisasiSlice.actions;

export default strukturOrganisasiSlice.reducer