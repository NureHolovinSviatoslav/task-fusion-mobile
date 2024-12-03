import { queryClient } from '@/config/query-client';
import axios from 'axios';

export interface RefreshTokensResponse {
  accessToken: string;
  refreshToken: string;
}

export const refreshTokens = async (refreshToken: string) => {
  const { data } = await axios.post<RefreshTokensResponse>(
    '/auth/refresh-tokens',
    {},
    {
      headers: { Authorization: `Bearer ${refreshToken}` },
      baseURL: process.env.EXPO_PUBLIC_API_URL,
    },
  );

  queryClient.invalidateQueries({
    queryKey: ['user_profile'],
    exact: false,
  });

  return data;
};
