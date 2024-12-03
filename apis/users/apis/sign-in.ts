import { axiosClient } from '@/config';
import { RefreshTokensResponse } from './refresh-tokens';

export interface SignInMutationParams {
  email: string;
  password: string;
}

export const signIn = async (variables: SignInMutationParams) => {
  const { data } = await axiosClient.post<RefreshTokensResponse>(
    '/auth/login',
    variables,
  );

  return data;
};
