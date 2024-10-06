import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// import { ENV } from '@/utils/constant'; 
const API_PHOTO_SHARING = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;


// Initial state
const initialState = {
    data: [],
    loading: false,
    error: null,
    // token: null, // Add a token field
    // id: null
};

const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
      startData(state) {
        state.loading = true;
        state.error = null;
      },
      successData(state, action) {
        state.data = action.payload;
        state.loading = false;
        // state.id = action.payload.id;
      },
      failureData(state, action) {
        state.error = action.payload;
        state.loading = false;
      },
    },
  });

export const { startData, successData, failureData } = storySlice.actions;

export const getData = (method, link, token) => async (dispatch) => {
  const config = {
    method: method,
    maxBodyLength: Infinity,
    url: `${API_PHOTO_SHARING}/${link}`,
    headers: {
      'apiKey': "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b",
      'Authorization' :`Bearer ${token}`
    }
  }
  dispatch(startData());
  try {
    const response = await axios(config);
    const data = response?.data?.data
    dispatch(successData(data));
  } catch (error) {
    dispatch(failureData(error.response.data));
  }
}
export const postStory = (method, link, formdata, token) => async (dispatch) => {
  const config = {
    method: method,
    maxBodyLength: Infinity,
    url: `${API_PHOTO_SHARING}/${link}`,
    headers: {
      'apiKey': "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b",
      'Authorization' :`Bearer ${token}`
    },
    data : formdata
  }
  dispatch(startData());
  try {
    const response = await axios(config);
    const data = response?.data    
    dispatch(successData(data));
  } catch (error) {
    dispatch(failureData(error.response.data));
  }
}

export default storySlice.reducer;