// useAuth.js
import { ref, computed } from 'vue';
import AuthService from '@/services/AuthService';
import UserService from '@/services/UserService';

const accessToken = ref(localStorage.getItem('accessToken'));
const userData = ref(null);

export function userAuth() {
  const isAuthenticated = computed(() => !!accessToken.value);

  const login = async (credentials) => {
    try {
      const response = await AuthService.login(credentials);
      accessToken.value = response.access_token;

      const userDataResponse = await UserService.getUser();
      userData.value = userDataResponse;

      localStorage.setItem('userData', JSON.stringify(userData.value));

      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signin = async (userData) => {
    try {
      const response = await AuthService.signin(userData);
      accessToken.value = response.access_token;
      const userDataResponse = await UserService.getUser();
      userData.value = userDataResponse;
      localStorage.setItem('userData', JSON.stringify(userData.value));
      return response;
    } catch (error) {
      console.error('Sign-in failed:', error);
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    accessToken.value = null;
    userData.value = null;
  };

  const refreshToken = async () => {
    try {
      const currentRefreshToken = AuthService.getRefreshToken();
      const newTokenData = await AuthService.refreshToken(currentRefreshToken);
      accessToken.value = newTokenData.accessToken;
      return newTokenData;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw error;
    }
  };

  return {
    accessToken,
    userData,
    isAuthenticated,
    login,
    signin,
    logout,
    refreshToken,
  };
}
