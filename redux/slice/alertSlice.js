import { SHOW_ALERT, HIDE_ALERT } from '../../utils/actionTypes.js';

const initialState = {
  type: null,     // 'success' or 'error'
  message: null,  // alert message
};

export const alertSlice = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message,
      };
    case HIDE_ALERT:
      return {
        ...state,
        type: null,
        message: null,
      };
    default:
      return state;
  }
};
