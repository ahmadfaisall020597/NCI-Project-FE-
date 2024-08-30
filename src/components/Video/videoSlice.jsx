import { createSlice } from '@reduxjs/toolkit';
import CommonService from '../../utils/api/listApi';

const videoSlice = createSlice({
    name: 'video',
    initialState: {
        videos: [],
        loading: false,
        error: null,
        currentPage: 1,
        totalPages: 10,
    },
    reducers: {
        fetchVideosStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchVideosSuccess: (state, action) => {
            state.videos = action.payload;
            state.loading = false;
        },
        fetchVideosFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createVideoStart: (state) => {
            console.log('state : ', state);
            state.loading = true;
            state.error = null;
        },
        createVideoSuccess: (state, action) => {
            state.videos.push(action.payload);
            state.loading = false;
        },
        createVideoFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateVideoStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateVideoSuccess: (state, action) => {
            state.videos = state.videos.map(video =>
                video.id === action.payload.id ? action.payload : video
            );
            state.loading = false;
        },
        updateVideoFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteVideoStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteVideoSuccess: (state, action) => {
            state.videos = state.videos.filter(video => video.id !== action.payload);
            state.loading = false;
        },
        deleteVideoFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        setPagination: (state, action) => {
            console.log('action page : ', action);
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
        },
    },
});

export const {
    fetchVideosStart,
    fetchVideosSuccess,
    fetchVideosFailure,
    createVideoStart,
    createVideoSuccess,
    createVideoFailure,
    updateVideoStart,
    updateVideoSuccess,
    updateVideoFailure,
    deleteVideoStart,
    deleteVideoSuccess,
    deleteVideoFailure,
    setPagination,
} = videoSlice.actions;

export const fetchVideos = (page = 1, searchQuery = '') => async (dispatch) => {
    console.log('hit list video');
    dispatch(fetchVideosStart());
    try {
        const response = await CommonService.listVideo(page, 10, searchQuery);
        console.log('response:', response);

        if (response && response.data) {
            dispatch(fetchVideosSuccess(response.data.data));
            dispatch(setPagination({
                currentPage: page,
                totalPages: response.last_page || 1,
            }));
        } else {
            throw new Error('Invalid response structure');
        }
    } catch (error) {
        console.error('Fetch videos error:', error);
        dispatch(fetchVideosFailure(error.response ? error.response.data : error.message));
    }
};

export const fetchVideosDashboard = () => async (dispatch) => {
    dispatch(fetchVideosStart());
    try {
        const response = await CommonService.listVideoDashboard();
        console.log('response : ', response.data);
        dispatch(fetchVideosSuccess(response.data));
    } catch (error) {
        console.error('Fetch videos error:', error);
        dispatch(fetchVideosFailure(error.response ? error.response.data : error.message));
    }
}


export const createVideo = (payload) => async (dispatch) => {
    console.log('hit create video : ', payload);
    dispatch(createVideoStart());
    try {
        const response = await CommonService.createVideo(payload);
        console.log('sukses : ', response);
        dispatch(createVideoSuccess(response));
    } catch (error) {
        dispatch(createVideoFailure(error.response.data));
    }
};

export const updateVideo = (id, payload) => async (dispatch) => {
    dispatch(updateVideoStart());
    try {
        const response = await CommonService.editVideo(id, payload);
        dispatch(updateVideoSuccess(response.data));
    } catch (error) {
        dispatch(updateVideoFailure(error.response.data));
    }
};

export const deleteVideo = (id) => async (dispatch) => {
    dispatch(deleteVideoStart());
    try {
        await CommonService.deleteVideo(id);
        dispatch(deleteVideoSuccess(id));
    } catch (error) {
        dispatch(deleteVideoFailure(error.response.data));
    }
};

export default videoSlice.reducer;
