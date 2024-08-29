import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    beritaList: [],
    formState: {
        id: null,
        judul: '',
        tanggal: '',
        image: null,
        imagePreview: '',
        deskripsi: '',
        validated: false,
        error: '',
    },
};

const beritaSlice = createSlice({
    name: 'berita',
    initialState,
    reducers: {
        setFormState: (state, action) => {
            state.formState = { ...state.formState, ...action.payload };
        },
        addBerita: (state, action) => {
            console.log('action : ', action);
            state.beritaList.push(action.payload);
        },
        updateBerita: (state, action) => {
            state.beritaList = state.beritaList.map(berita =>
                berita.id === action.payload.id ? { ...berita, ...action.payload } : berita
            );
        },
        deleteBerita: (state, action) => {
            state.beritaList = state.beritaList.filter(berita => berita.id !== action.payload);
        },
        resetForm: (state) => {
            state.formState = initialState.formState;
        },
    },
});

export const { setFormState, addBerita, updateBerita, deleteBerita, resetForm } = beritaSlice.actions;
export default beritaSlice.reducer;
