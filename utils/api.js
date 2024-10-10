import { getToken } from './token';
import axios from 'axios';

import { ENV } from './constant';
import { SuccessAlert } from './alert';

const API_BASE_URL = ENV.BASE_URL

const API_KEY = ENV.API_KEY


export const handleError = (error) => {
  if (error.response) {
    // Server responded with a status code other than 2xx
    console.error(`Error: ${error.response.status} - ${error.response.data.message}`);
    return error.response.data.message || 'Something went wrong on the server!';
  } else if (error.request) {
    // Request was made, but no response was received
    console.error('Error: No response from the server.');
    return 'No response from the server. Please try again later.';
  } else {
    // Something else happened during the request
    console.error(`Error: ${error.message}`);
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
    console.log(config, "config");
    
    
    try {
        const response = await axios(config);
        return response?.data;
    } catch (error) {
      console.log(error, "error");
      
      if (error.response) {
        console.error('Error response:', error.response);
      } else {
        console.error('Error:', error.message);
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
      // handleError(error);
      throw error;
      // return error.response.data.message
    }
  };