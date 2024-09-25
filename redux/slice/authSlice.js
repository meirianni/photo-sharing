import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const API_PHOTO_SHARING = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;


// Initial state
const initialState = {
    data: [],
    loading: false,
    error: null,
    token: null, // Add a token field
};

const authSlice = createSlice({
    name: 'storeAuth',
    initialState,
    reducers: {
      startAuth(state) {
        state.loading = true;
        state.error = null;
      },
      successAuth(state, action) {
        state.data = action.payload;
        state.loading = false;
      },
      failureAuth(state, action) {
        state.error = action.payload;
        state.loading = false;
      },
    },
  });

export const { startAuth, successAuth, failureAuth } = authSlice.actions;

export const postLoginUser = (data, method, link) => async (dispatch) => {
    const config = {
        method: method,
        maxBodyLength: Infinity,
        url: `${API_PHOTO_SHARING}/${link}`,
        headers: {
          'apiKey': "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b",
          'Content-Type': 'application/json',
        },
        data: data
    }
    dispatch(startAuth());

    try {
        const response = await axios(config);
        
        const token = response.data.token;
        Cookies.set('token', token);
        const data = response?.data?.user
        dispatch(successAuth(data));
      } catch (error) {
        console.log(error.response.data.message);
        
        dispatch(failureAuth(error.response.data.message));
      }

}  
export default authSlice.reducer;