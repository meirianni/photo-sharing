import { getToken } from './token';
import axios from 'axios';

import { ENV } from './constant';
import { SuccessAlert } from './alert';

const API_BASE_URL = ENV.BASE_URL

const API_KEY = ENV.API_KEY


export const handleError = (error) => {
  if (error.response) {
    return error.response.data.message || 'Something went wrong on the server!';
  } else if (error.request) {
    return 'No response from the server. Please try again later.';
  } else {
    return error.message || 'An unexpected error occurred.';
  }
};
// GET request
export const getDataApi = async (method, link, token) => {
    const config = {
        method: method,
        maxBodyLength: Infinity,
        url: `${API_BASE_URL}/${link}`,
        headers: {
          'apiKey': API_KEY,
          'Authorization' :`Bearer ${token}`
        }
      }
    try {
      const response = await axios(config);
      console.log(response?.data, "response?.data?");
      
    //   alert('Error: No response from the server.');
      return response?.data?.data;
    } catch (error) {        
      handleError(error);
    }
};

  //POST REQ
  export const PostDataApi = async (method, link, formdata, token) => {
    const config = {
        method: method,
        maxBodyLength: Infinity,
        url: `${API_BASE_URL}/${link}`,
        headers: {
            'apiKey': API_KEY,
            'Authorization': `Bearer ${token}`
        },
        data: formdata
    };
    
    
    try {
        const response = await axios(config); 
        
        return response?.data;
    } catch (error) {      
      if (error.response) {
      } else {
        throw error;
      }
      throw error;
    }
};

  export const PostDataLogin = async (method, link, formdata) => {
    const config = {
        method: method,
        maxBodyLength: Infinity,
        url: `${API_BASE_URL}/${link}`,
        headers: {
          'apiKey': API_KEY,
          'Authorization' : ''
        },
        data : formdata
      }  
    try {
      const response = await axios(config);
      
      return response?.data
    } catch (error) {      
      throw error;
    }
  };
  export const PostImage =  async (file, link, token) => {
    let data = new FormData();
    data.append('image', file);
  
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_BASE_URL}/${link}`,
      headers: { 
        'apiKey': API_KEY, 
        'Authorization': `Bearer ${token}`, 
        ...data
      },
      data: data,
    };
    try {
      const response = await axios(config);
      return response?.data
    } catch (error) {
      throw error;
    }
  };