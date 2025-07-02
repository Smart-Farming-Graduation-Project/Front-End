import axios from 'axios';
import { getTokenClient, deleteTokenClient } from './getTokenClient';
import { refreshToken } from './Auth';
import Cookies from 'js-cookie';

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.map(cb => cb(token));
  refreshSubscribers = [];
};

// Request interceptor to add token to headers
axios.interceptors.request.use(
  (config) => {
    const token = getTokenClient();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, wait for it to complete
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axios(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const currentAccessToken = getTokenClient();
        const currentRefreshToken = Cookies.get('refreshToken');

        if (!currentAccessToken || !currentRefreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await refreshToken(currentAccessToken, currentRefreshToken);

        if (response.statusCode === 200 && response.data?.tokens) {
          const { accessToken, refreshToken: newRefreshToken } = response.data.tokens;
          
          Cookies.set('token', accessToken, { expires: 7 });
          Cookies.set('refreshToken', newRefreshToken, { expires: 30 });

          onRefreshed(accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          
          return axios(originalRequest);
        } else {
          throw new Error('Token refresh failed');
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        deleteTokenClient();
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axios;