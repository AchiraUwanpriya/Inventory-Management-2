import { AUTH_CONSTANTS } from '../Constants/authconstants';

const user = JSON.parse(localStorage.getItem('adminUser'));

const initialState = user 
  ? { 
      isLoggedIn: true, 
      user: user,
      loading: false,
      error: null
    }
  : { 
      isLoggedIn: false, 
      user: null,
      loading: false,
      error: null
    };

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_CONSTANTS.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case AUTH_CONSTANTS.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.user,
        loading: false,
        error: null
      };
      
    case AUTH_CONSTANTS.LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        loading: false,
        error: action.error
      };
      
    case AUTH_CONSTANTS.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        loading: false,
        error: null
      };
      
    case AUTH_CONSTANTS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
      
    default:
      return state;
  }
}