import { createSlice } from '@reduxjs/toolkit';
import CommonService from '../../utils/api/listApi';

const slideShowSlice = createSlice({
    name: 'slideshow',
    initialState: {
      slideshow: [],
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 10,
    },
    reducers: {
      fetchslideshowStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      fetchslideshowSuccess: (state, action) => {
        state.slideshow = action.payload;
        state.loading = false;
      },
      fetchslideshowFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      createSlideShowStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      createSlideShowSuccess: (state, action) => {
        state.slideshow.push(action.payload);
        state.loading = false;
      },
      createSlideShowFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      updateSlideShowStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      updateSlideShowSuccess: (state, action) => {
        state.slideshow = state.slideshow.map(news =>
          news.id === action.payload.id ? action.payload : news
        );
        state.loading = false;
      },
      updateSlideShowFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      deleteSlideShowStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      deleteSlideShowSuccess: (state, action) => {
        state.slideshow = state.slideshow.filter(news => news.id !== action.payload);
        state.loading = false;
      },
      deleteSlideShowFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      setPagination: (state, action) => {
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      },

    },
});

export const {
    fetchslideshowStart,
    fetchslideshowSuccess,
    fetchslideshowFailure,
    createSlideShowStart,
    createSlideShowSuccess,
    createSlideShowFailure,
    updateSlideShowStart,
    updateSlideShowSuccess,
    updateSlideShowFailure,
    deleteSlideShowStart,
    deleteSlideShowSuccess,
    deleteSlideShowFailure,
    setPagination,
  } = slideShowSlice.actions;

  export const fetchSlideShow = (page = 1, searchQuery = '') => async (dispatch) => {
    dispatch(fetchslideshowStart());
    try {
      const response = await CommonService.listSlideShow(page, 10, searchQuery);
      
      if(response && response.data) {
        dispatch(fetchslideshowSuccess(response.data.data));
        dispatch(setPagination({
          currentPage: page,
          totalPages: response.data.last_page || 1,
        }))
      }
        else {
          throw new Error('Invalid response structure');
        }
    } catch (error) {
      dispatch(fetchslideshowFailure(error.message));
    }
  };

  export const fetchSlideShowDashboard = () => async (dispatch) => {
    dispatch(fetchslideshowStart());
    try {
      const response = await CommonService.listSlideShowDashboard();
      dispatch(fetchslideshowSuccess(response.data));
    } catch (error) {
      dispatch(fetchslideshowFailure(error.response ? error.response.data : error.message));
    }
  };

  export const createSlideShow = (payload) => async (dispatch) => {
    dispatch(createSlideShowStart());
    try {
       // Create a new FormData object
       const formData = new FormData();
       formData.append('title', payload.title);
       formData.append('deskripsi', payload.deskripsi);
       formData.append('image_url', payload.image_url); // This should be the file object
       if (payload.date) {
         formData.append('date', payload.date);
       }
   
       // Send FormData to the API
       const response = await CommonService.createSlideShow(formData, {
         headers: {
           'Content-Type': 'multipart/form-data',
         },
       });
       dispatch(createSlideShowSuccess(response));
    } catch (error) {
      dispatch(createSlideShowFailure(error.response?.data || error.message));
    }
  }

  export const updateSlideShow = (id, payload) => async (dispatch) => {
    dispatch(updateSlideShowStart());
    try {
      const formData = new FormData();
      formData.append('title', payload.title);
      formData.append('deskripsi', payload.deskripsi);
      if (payload.date) {
        formData.append('date', payload.date);
      }
      formData.append('image_url', payload.image_url);
  
  
      const response = await CommonService.editSlideShow(id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      dispatch(updateSlideShowSuccess(response.data));
    } catch (error) {
      dispatch(updateSlideShowFailure(error.response.data));
    }
  };

  export const deleteSlideShow = (id) => async (dispatch) => {
    dispatch(deleteSlideShowStart());
    try {
      await CommonService.deleteSlideShow(id);
      dispatch(deleteSlideShowSuccess(id));
    } catch (error) {
      dispatch(deleteSlideShowFailure(error.response.data));
    }
  };

  export default slideShowSlice.reducer;