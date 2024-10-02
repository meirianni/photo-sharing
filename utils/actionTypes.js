// actionTypes.js
export const SHOW_ALERT = 'SHOW_ALERT';
export const HIDE_ALERT = 'HIDE_ALERT';


export const showAlert = (alert) => ({
    type: SHOW_ALERT,
    payload: alert,  // { type: 'success' | 'error', message: 'Your message here' }
  });
  
  // Hide alert action
  export const hideAlert = () => ({
    type: HIDE_ALERT,
  });