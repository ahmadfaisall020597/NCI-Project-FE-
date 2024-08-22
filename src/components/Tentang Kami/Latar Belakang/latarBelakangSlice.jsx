import { createSlice } from "@reduxjs/toolkit"
import latarBelakangData from "./../../../data/latarBelakang.json" 

const initialState = {
    baseLoading: false,
    laterBelakang: latarBelakangData,
}

const latarBelakangSlice = createSlice({
    name: "latarBelakangSlice",
    initialState,
    reducers: {
        getLoading(state) {
            state.baseLoading = true;
        },
        setLatarBelakang(state, action) {
            state.latarBelakang = action.payload,
            state.baseLoading = false
        }
    }
});

export const {
    getLoading,
    setLatarBelakang
} = latarBelakangSlice.actions;

export default latarBelakangSlice.reducer