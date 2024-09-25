import { createSlice, combineReducers } from '@reduxjs/toolkit';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import authSlice from '../slice/authSlice';

const API_PHOTO_SHARING = process.env.NEXT_PUBLIC_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;



// Initial state
const initialState = {
  data: [],
  loading: false,
  error: null,
  token: null, // Add a token field
};

const configData = (body, method, link) => {
  const config = {
    method: method,
    maxBodyLength: Infinity,
    url: `${API_PHOTO_SHARING}/${link}`,
    headers: {
      'apiKey': "c7b411cc-0e7c-4ad1-aa3f-822b00e7734b",
      'Content-Type': 'application/json',
    },
    data: body
  }
  return config

}
// Create Redux slice
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    dataStart(state) {
      state.loading = true;
      state.error = null;
    },
    dataSuccess(state, action) {
      state.token = action.payload;
      state.loading = false;
    },
    dataFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export actions
export const { dataStart, dataSuccess, dataFailure } = dataSlice.actions;

// Define the login action
export const postData = (body, method, link) => async (dispatch) => {
  const config = configData(body, method, link)
  console.log(config, "config");
  
  dispatch(dataStart());
  try {
    const response = await axios(config);
    // console.log(response.data, "ress");
    
    const token = response.data.token;
    // Cookies.set('token', token);
    const data = response?.data?.user == undefined ? response?.data?.data : response?.data?.user; 
    dispatch(dataSuccess(token));
  } catch (error) {
    // console.log(error.response, "erorrr");
    
    dispatch(dataFailure(error.response.data.message));
  }
};

const rootReducer = combineReducers({
  storeAuth: authSlice,
  // storeTwo: storeTwoReducer,
});


// Configure the Redux store
const store = configureStore({
  reducer: rootReducer

  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;



