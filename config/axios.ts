import axios from 'axios';

import { refreshTokens } from '@/apis/users/apis/refresh-tokens';
import { getLocalUserTokensAsync, setLocalUserTokens } from '@/utils';

export const axiosClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const { accessToken } = await getLocalUserTokensAsync();

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401) return Promise.reject(error);

    try {
      const { refreshToken: oldRefreshToken } = await getLocalUserTokensAsync();

      if (!oldRefreshToken) {
        console.warn('No refresh token available.');

        return Promise.reject(error);
      }

      const tokens = await refreshTokens(oldRefreshToken);

      setLocalUserTokens(tokens);

      originalRequest.headers['Authorization'] = `Bearer ${tokens.accessToken}`;

      const response = await axios(originalRequest);

      return response;
    } catch {
      setLocalUserTokens({ accessToken: null, refreshToken: null });
    }
  },
);
