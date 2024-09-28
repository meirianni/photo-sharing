// Function to get the token

import Cookies from 'js-cookie';

export const getToken = () => {
    return Cookies.get('token');
};


// Function to remove the token
export const removeToken = () => {
    Cookies.remove('token');
};