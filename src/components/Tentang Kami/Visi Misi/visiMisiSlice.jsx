import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    baseLoading: false,
    visi: '',
    misi: [],
    moto: []
}

const visiMisiSlice = createSlice({
    name: "visiMisiSlice",
    initialState,
    reducers: {
        getLoading(state) {
            state.baseLoading = true;
        },
        setVisiMisi(state, action) {
            const { visi, misi, moto } = action.payload;
            state.visi = visi;
            state.misi = misi;
            state.moto = moto;
            state.baseLoading = false;
        }
    }
});

export const {
    getLoading,
    setVisiMisi
} = visiMisiSlice.actions;

export default visiMisiSlice.reducer