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
        // state.id = action.payload.id;
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
        const userId = response?.data?.user.id
        Cookies.set('userId', userId);
        
        dispatch(successAuth(data));
      } catch (error) {
        
        dispatch(failureAuth(error.response.data.message));

      }

}  
export const postRegisterUser = (data, method, link) => async (dispatch) => {
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
        const data = response?.data
        
        Cookies.set('token', token);
        // Cookies.set('userId', userId);
        dispatch(successAuth(data));
      } catch (error) {
        
        dispatch(failureAuth(error.response.data));
      }

} 

// export const getDataUser = (method, link, token) => async (dispatch, getState) => {
//   const { id } = getState().storeAuth;
  
//   const config = {
//     method: method,
//     maxBodyLength: Infinity,
//     url: `${API_PHOTO_SHARING}/${link}/id`,
//     headers: {
//       'apiKey': "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b",
//       'Authorization' :`Bearer ${token}`
//     }
  // }
  
  
//   dispatch(startAuth());
//   try {
//     const response = await axios(config);
//     const data = response?.data?.data?.users
    
//     dispatch(successAuth(data));
//   } catch (error) {
//     dispatch(failureAuth(error.response.data));
//   }
// // }
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
  console.log(config, "configgg");
  
  dispatch(startAuth());
  try {
    const response = await axios(config);
    const data = response?.data?.data
    
    dispatch(successAuth(data));
  } catch (error) {
    dispatch(failureAuth(error.response.data));
  }
}

export default authSlice.reducer;