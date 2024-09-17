import axios from 'axios';
import AuthService from '@/services/AuthService';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
instance.interceptors.request.use(
  async (config) => {
    // Skip token validation for login and sign-in requests
    if (config.url === 'auth/login' || config.url === 'auth/signup') {
      return config;
    }

    try {
      const tokenResult = await AuthService.ensureValidToken();
      if (tokenResult && tokenResult.status === 'RE_LOGIN_REQUIRED') {
        // You might want to redirect to login page here
        return Promise.reject('Re-login required');
      }
      if (tokenResult) {
        config.headers['Authorization'] = `Bearer ${tokenResult}`;
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      return Promise.reject(error);
    }
    return config;
  },
  (error) => {
    console.error('Axios Interceptor: Error in request', error);
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log('Received 401, attempting to refresh token');
      originalRequest._retry = true;
      try {
        const refreshToken = AuthService.getRefreshToken();
        console.log('Using refresh token:', refreshToken);
        const response = await AuthService.refreshToken(refreshToken);
        const newAccessToken = response.accessToken;
        console.log('Received new access token:', newAccessToken);
        AuthService.setAccessToken(newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        instance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${newAccessToken}`;
        console.log('Retrying original request with new token');
        return instance(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        AuthService.logout();
        // You might want to redirect to login page here
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
