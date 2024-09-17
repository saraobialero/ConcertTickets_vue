// AuthService.js
import axiosIstance from '@/api';
import { jwtDecode } from 'jwt-decode';

class AuthService {
  async login(data) {
    try {
      const response = await axiosIstance.post('auth/login', data);
      if (response.data && response.data.data) {
        const { access_token: accessToken, refresh_token: refreshToken } =
          response.data.data;
        if (accessToken && refreshToken) {
          this.setTokens(accessToken, refreshToken);
          return response.data.data;
        } else {
          throw new Error('Access token or refresh token missing in response');
        }
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async signin(data) {
    try {
      const response = await axiosIstance.post('auth/signup', data);
      if (response.data && response.data.data) {
        const { access_token: accessToken, refresh_token: refreshToken } =
          response.data.data;
        if (accessToken && refreshToken) {
          this.setTokens(accessToken, refreshToken);
          return response.data.data;
        } else {
          throw new Error('Access token or refresh token missing in response');
        }
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error('Sign-in failed:', error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  setAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  setTokens(accessToken, refreshToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  async refreshToken(refreshToken) {
    try {
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      console.log('Sending refresh token:', refreshToken);
      const response = await axiosIstance.post(
        'auth/refresh-token',
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Refresh token response:', response.data);
      const newAccessToken = response.data.data.access_token;
      this.setAccessToken(newAccessToken);
      return { accessToken: newAccessToken };
    } catch (error) {
      console.error('Refresh token failed:', error);
      throw error;
    }
  }

  isTokenExpiringSoon(token) {
    if (!token) return true;

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decodedToken.exp < currentTime + 60;
  }

  async ensureValidToken() {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    if (!accessToken || !refreshToken) {
      console.log('No tokens available, possibly during login process');
      return null;
    }

    if (this.isTokenExpiringSoon(accessToken)) {
      console.log('Access token is expiring soon, attempting to refresh...');

      if (this.isTokenExpiringSoon(refreshToken)) {
        console.log('Refresh token is also expiring, initiating re-login...');
        this.logout();
        return { status: 'RE_LOGIN_REQUIRED' };
      }

      try {
        const newTokenData = await this.refreshToken(refreshToken);
        return newTokenData.accessToken;
      } catch (error) {
        console.error('Failed to refresh token:', error);
        this.logout();
        return { status: 'RE_LOGIN_REQUIRED' };
      }
    }

    return accessToken;
  }
}

export default new AuthService();
