import { createSlice } from '@reduxjs/toolkit';
import CommonService from '../../utils/api/listApi';


const beritaSlice = createSlice({
    name: 'berita',
    initialState: {
      news: [],
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 10,
    },
    reducers: {
      fetchnewsStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      fetchnewsSuccess: (state, action) => {
        state.news = action.payload;
        state.loading = false;
      },
      fetchnewsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      createNewsStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      createNewsSuccess: (state, action) => {
        state.news.push(action.payload);
        state.loading = false;
      },
      createNewsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      updateNewsStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      updateNewsSuccess: (state, action) => {
        state.news = state.news.map(news =>
          news.id === action.payload.id ? action.payload : news
        );
        state.loading = false;
      },
      updateNewsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      deleteNewsStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      deleteNewsSuccess: (state, action) => {
        state.news = state.news.filter(news => news.id !== action.payload);
        state.loading = false;
      },
      deleteNewsFailure: (state, action) => {
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
  fetchnewsStart,
  fetchnewsSuccess,
  fetchnewsFailure,
  createNewsStart,
  createNewsSuccess,
  createNewsFailure,
  updateNewsStart,
  updateNewsSuccess,
  updateNewsFailure,
  deleteNewsStart,
  deleteNewsSuccess,
  deleteNewsFailure,
  setPagination,
} = beritaSlice.actions;

export const fetchNews = (page = 1, searchQuery = '') => async (dispatch) => {
  dispatch(fetchnewsStart());
  try {
    const response = await CommonService.listBerita(page, 10, searchQuery);
    
    if(response && response.data) {
      dispatch(fetchnewsSuccess(response.data.data));
      dispatch(setPagination({
        currentPage: page,
        totalPages: response.data.last_page || 1,
      }))
    }
      else {
        throw new Error('Invalid response structure');
      }
  } catch (error) {
    dispatch(fetchnewsFailure(error.message));
  }
};

export const fetchNewsDashboard = () => async (dispatch) => {
  dispatch(fetchnewsStart());
  try {
    const response = await CommonService.listBeritaDashboard();
    dispatch(fetchnewsSuccess(response.data));
  } catch (error) {
    dispatch(fetchnewsFailure(error.response ? error.response.data : error.message));
  }
};

export const createNews = (payload) => async (dispatch) => {
  dispatch(createNewsStart());
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
     const response = await CommonService.createBerita(formData, {
       headers: {
         'Content-Type': 'multipart/form-data',
       },
     });
     dispatch(createNewsSuccess(response));
  } catch (error) {
    dispatch(createNewsFailure(error.response?.data || error.message));
  }
}


export const updateNews = (id, payload) => async (dispatch) => {
  dispatch(updateNewsStart());
  try {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('deskripsi', payload.deskripsi);
    if (payload.date) {
      formData.append('date', payload.date);
    }
    formData.append('image_url', payload.image_url);


    const response = await CommonService.editBerita(id, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch(updateNewsSuccess(response.data));
  } catch (error) {
    dispatch(updateNewsFailure(error.response.data));
  }
};

export const deleteNews = (id) => async (dispatch) => {
  dispatch(deleteNewsStart());
  try {
    await CommonService.deleteBerita(id);
    dispatch(deleteNewsSuccess(id));
  } catch (error) {
    dispatch(deleteNewsFailure(error.response.data));
  }
};

export default beritaSlice.reducer;
