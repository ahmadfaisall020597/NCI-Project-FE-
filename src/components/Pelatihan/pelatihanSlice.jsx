import { createSlice } from '@reduxjs/toolkit';
import CommonService from '../../utils/api/listApi';


const pelatihanSlice = createSlice({
    name: 'pelatihan',
    initialState: {
      pelatihan: [],
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 10,
    },
    reducers: {
      fetchpelatihanStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      fetchpelatihanSuccess: (state, action) => {
        state.pelatihan = action.payload;
        console.log('state : ', state.pelatihan);
        state.loading = false;
      },
      fetchpelatihanFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      createPelatihanStart: (state) => {
        console.log('state create pelatihan : ', state)
        state.loading = true;
        state.error = null;
      },
      createPelatihanSuccess: (state, action) => {
        state.pelatihan.push(action.payload);
        state.loading = false;
      },
      createPelatihanFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      updatePelatihanStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      updatePelatihanSuccess: (state, action) => {
        state.pelatihan = state.pelatihan.map(pelatihan =>
          pelatihan.id === action.payload.id ? action.payload : pelatihan
        );
        state.loading = false;
      },
      updatePelatihanFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      deletePelatihanStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      deletePelatihanSuccess: (state, action) => {
        state.pelatihan = state.pelatihan.filter(pelatihan => pelatihan.id !== action.payload);
        state.loading = false;
      },
      deletePelatihanFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      setPagination: (state, action) => {
        console.log('action page:', action)
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      },

    },
});

export const {
  fetchpelatihanStart,
  fetchpelatihanSuccess,
  fetchpelatihanFailure,
  createPelatihanStart,
  createPelatihanSuccess,
  createPelatihanFailure,
  updatePelatihanStart,
  updatePelatihanSuccess,
  updatePelatihanFailure,
  deletePelatihanStart,
  deletePelatihanSuccess,
  deletePelatihanFailure,
  setPagination,
} = pelatihanSlice.actions;

export const fetchPelatihan = (page = 1, searchQuery = '') => async (dispatch) => {
  console.log('hit fetch berita')
  dispatch(fetchpelatihanStart());
  try {
    const response = await CommonService.listPelatihan(page, 10, searchQuery);
    
    if(response && response.data) {
      dispatch(fetchpelatihanSuccess(response.data.data));
      dispatch(setPagination({
        currentPage: page,
        totalPages: response.data.last_page || 1,
      }))
    }
      else {
        throw new Error('Invalid response structure');
      }
  } catch (error) {
    dispatch(fetchpelatihanFailure(error.message));
  }
};

export const fetchPelatihanDashboard = () => async (dispatch) => {
  dispatch(fetchpelatihanStart());
  try {
    const response = await CommonService.listPelatihanDashboard();
    console.log('response pelatihan dashboard', response)
    dispatch(fetchpelatihanSuccess(response.data));
  } catch (error) {
    dispatch(fetchpelatihanFailure(error.response ? error.response.data : error.message));
  }
};

export const createPelatihan = (payload) => async (dispatch) => {
    console.log('hit create pelatihan:', payload)
    dispatch(createPelatihanStart());
    try {
      // Create a new FormData object
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("image_kemendikbud_ristek", payload.image_kemendikbud_ristek);
      formData.append("image_logo_nci", payload.image_logo_nci);
      formData.append("image_logo_mitra", payload.image_logo_mitra);
      formData.append("deskripsi", payload.deskripsi);
  
      // Append each persyaratan item separately
      payload.persyaratan.forEach((item) => {
        formData.append("persyaratan[]", item);
      });
  
      formData.append("image_spanduk_pelatihan", payload.image_spanduk_pelatihan);
      formData.append("duration", payload.duration); // gunakan "duration" sesuai dengan postman
      formData.append("location", payload.location);
      formData.append("biaya", payload.biaya);
      formData.append("url_daftar", payload.url_daftar);
      formData.append("output", payload.output);   
      if (payload.date) {
        formData.append('date', payload.date);
      }
  
      // Send FormData to the API
      const response = await CommonService.createPelatihan(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('response : ', response);
      dispatch(createPelatihanSuccess(response));
    } catch (error) {
      dispatch(createPelatihanFailure(error.response?.data || error.message));
    }
  }
  

export const updatePelatihan = (id, payload) => async (dispatch) => {
  dispatch(updatePelatihanStart());
  try {
     // Create a new FormData object
     const formData = new FormData();
     formData.append("title", payload.title);
     formData.append("image_kemendikbud_ristek", payload.image_kemendikbud_ristek);
     formData.append("image_logo_nci", payload.image_logo_nci);
     formData.append("image_logo_mitra", payload.image_logo_mitra);
     formData.append("deskripsi", payload.deskripsi);
 
     // Append each persyaratan item separately
     payload.persyaratan.forEach((item) => {
       formData.append("persyaratan[]", item);
     });
 
     formData.append("image_spanduk_pelatihan", payload.image_spanduk_pelatihan);
     formData.append("duration", payload.duration); // gunakan "duration" sesuai dengan postman
     formData.append("location", payload.location);
     formData.append("biaya", payload.biaya);
     formData.append("url_daftar", payload.url_daftar);
     formData.append("output", payload.output);   
     if (payload.date) {
       formData.append('date', payload.date);
     }

    const response = await CommonService.editPelatihan(id, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch(updatePelatihanSuccess(response.data));
  } catch (error) {
    dispatch(updatePelatihanFailure(error.response.data));
  }
};

export const deletePelatihan = (id) => async (dispatch) => {
  dispatch(deletePelatihanStart());
  try {
    await CommonService.deletePelatihan(id);
    dispatch(deletePelatihanSuccess(id));
  } catch (error) {
    dispatch(deletePelatihanFailure(error.response.data));
  }
};

export default pelatihanSlice.reducer;
