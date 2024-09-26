import { createSlice } from "@reduxjs/toolkit";
import CommonService from "../../utils/api/listApi";

const pengumumanSlice = createSlice({
    name: 'pengumuman',
    initialState: {
        pengumuman: [],
        loading: false,
        error: null,
        currentPage: 1,
        totalPages: 10,
    },
    reducers: {
        fetchPengumumanStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchPengumumanSuccess: (state, action) => {
            state.pengumuman = action.payload;
            state.loading = false;
        },
        fetchPengumumanFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createPengumumanStart: (state) => {
            // console.log('state : ', state);
            state.loading = true;
            state.error = null;
        },
        createPengumumanSuccess: (state, action) => {
            state.pengumuman.push(action.payload);
            state.loading = false;
        },
        createPengumumanFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updatePengumumanStart: (state) => {
            state.loading = true,
                state.error = null;
        },
        updatePengumumanSuccess: (state, action) => {
            state.pengumuman = state.pengumuman.map(pengumuman =>
                pengumuman.id === action.payload.id ? action.payload : pengumuman
            );
            state.loading = false;
        },
        updatePengumumanFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setPagination: (state, action) => {
            console.log('action page : ', action);
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
        },
        deletePengumumanStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deletePengumumanSuccess: (state, action) => {
            state.pengumuman = state.pengumuman.filter(pengumuman => pengumuman.id !== action.payload);
            state.loading = false;
        },
        deletePengumumanFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    fetchPengumumanStart,
    fetchPengumumanSuccess,
    fetchPengumumanFailure,
    createPengumumanStart,
    createPengumumanSuccess,
    createPengumumanFailure,
    updatePengumumanStart,
    updatePengumumanSuccess,
    updatePengumumanFailure,
    setPagination,
    deletePengumumanStart,
    deletePengumumanSuccess,
    deletePengumumanFailure,
} = pengumumanSlice.actions;

export const fetchPengumuman = (page = 1, searchQuery = '') => async (dispatch) => {
    console.log('hit list video');
    dispatch(fetchPengumumanStart());
    try {
        const response = await CommonService.listPengumuman(page, 10, searchQuery);
        console.log('response:', response);

        if (response && response.data) {
            dispatch(fetchPengumumanSuccess(response.data.data));
            dispatch(setPagination({
                currentPage: page,
                totalPages: response.data.last_page || 1,
            }));
        } else {
            throw new Error('Invalid response structure');
        }
    } catch (error) {
        console.error('Fetch videos error:', error);
        dispatch(fetchPengumumanFailure(error.response ? error.response.data : error.message));
    }
};


export const createPengumuman = (payload) => async (dispatch) => {
    console.log('hit create pengumuman : ', payload);
    dispatch(createPengumumanStart());
    try {
        const response = await CommonService.createPengumuman(payload);
        console.log('sukses : ', response);
        dispatch(createPengumumanSuccess(response));
    } catch (error) {
        dispatch(createPengumumanFailure(error.response.data));
    }
};

export const updatePengumuman = (id, payload) => async (dispatch) => {
    dispatch(updatePengumumanStart());
    try {
        const response = await CommonService.editPengumuman(id, payload);
        dispatch(updatePengumumanSuccess(response.data));
    } catch (error) {
        dispatch(updatePengumumanFailure(error.response.data));
    }
}

export const deletePengumuman = (id) => async (dispatch) => {
    dispatch(deletePengumumanStart());
    try {
        await CommonService.deletePengumuman(id);
        dispatch(deletePengumumanSuccess(id));
    } catch (error) {
        dispatch(deletePengumumanFailure(error.response.data));
    }
};

export default pengumumanSlice.reducer;