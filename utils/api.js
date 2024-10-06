import { getToken } from './token';
import axios from 'axios';

import { ENV } from './constant';

const API_BASE_URL = ENV.BASE_URL

const API_KEY = ENV.API_KEY


const handleError = (error) => {
    if (error.response) {
      // Server responded with a status other than 2xx
      alert(`Error: ${error.response.data.message || 'Something went wrong!'}`);
    } else if (error.request) {
      // Request was made but no response received
      alert('Error: No response from the server.');
    } else {
      // Something else happened while making the request
      alert(`Error: ${error.message}`);
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
          'Authorization' :`Bearer ${token}`
        },
        data : formdata
      }
      console.log(config, "configg");
    try {
      const response = await axios(config);
      return response?.data
    } catch (error) {        
      handleError(error);
    }
  };