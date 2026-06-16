import { AUTH_CONSTANTS, API_ENDPOINTS } from '../Constants/authconstants';
import { authService } from '../Services/authservice';

export const authActions = {
  login,
  logout,
  clearError
};

function login(username, password) {
  return async dispatch => {
    console.log('🚀 authActions.login called with:', { username, password });
    dispatch(request({ username }));

    try {
      // Call the real backend API (no hardcoding)
      const response = await authService.login(username, password);

      console.log('✅ API Response:', response);

      if (response.StatusCode === 200 && response.Result) {
        // Example: you can modify according to your backend response
        const user = {
          username: response.Result.username,
          role: response.Result.role || 'Admin',
          token: response.Result.token
        };

        // Store in localStorage
        localStorage.setItem('adminToken', user.token);
        localStorage.setItem('adminUser', JSON.stringify(user));

        dispatch(success(user));
        console.log('✅ LOGIN_SUCCESS dispatched');
        return { type: AUTH_CONSTANTS.LOGIN_SUCCESS, user };
      } else {
        const error = response.Message || 'Invalid username or password';
        dispatch(failure(error));
        console.log('❌ Login failed:', error);
        return { type: AUTH_CONSTANTS.LOGIN_FAILURE, error };
      }

    } catch (error) {
      console.log('❌ Login API Error:', error);
      dispatch(failure(error.toString()));
      return { type: AUTH_CONSTANTS.LOGIN_FAILURE, error: error.toString() };
    }
  };

  function request(user) {
    return { type: AUTH_CONSTANTS.LOGIN_REQUEST, user };
  }

  function success(user) {
    return { type: AUTH_CONSTANTS.LOGIN_SUCCESS, user };
  }

  function failure(error) {
    return { type: AUTH_CONSTANTS.LOGIN_FAILURE, error };
  }
}

function logout() {
  console.log('🚪 Logging out...');
  authService.logout();
  return { type: AUTH_CONSTANTS.LOGOUT };
}

function clearError() {
  return { type: AUTH_CONSTANTS.CLEAR_ERROR };
}
