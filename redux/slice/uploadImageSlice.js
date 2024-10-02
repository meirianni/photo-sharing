import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const API_PHOTO_SHARING = process.env.NEXT_PUBLIC_BASE_URL;
const initialState = {
    loading: false,
    error: null,
    uploadResponse: null,
};


const uploadImageSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {
      uploadStart(state) {
        state.loading = true;
        state.error = null;
      },
      uploadSuccess(state, action) {
        state.loading = false;
        state.uploadResponse = action.payload;
      },
      uploadFailure(state, action) {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });

  export const { uploadStart, uploadSuccess, uploadFailure } = uploadImageSlice.actions;
  export const uploadImage = (file, link, token) => 
    async (dispatch) => {
    let data = new FormData();
    data.append('image', file);
  
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_PHOTO_SHARING}/${link}`,
      headers: { 
        'apiKey': 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b', 
        'Authorization': `Bearer ${token}`, 
        ...data
      },
      data: data,
    };
    try {
      dispatch(uploadStart());
      const response = await axios(config);      
      dispatch(uploadSuccess(response.data.url));
    } catch (error) {
      dispatch(uploadFailure(error.message || 'Upload failed'));
    }
  };
  
  // Export the reducer
  export default uploadImageSlice.reducer;