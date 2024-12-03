import { axiosClient } from '@/config';
import { UserType } from '@/types/enums';
import { RefreshTokensResponse } from './refresh-tokens';

export interface SignUpMutationParams {
  email: string;
  password: string;
  name: string;
  description: string;
  position: UserType;
}

export const signUp = async ({
  email,
  name,
  password,
  description,
  position,
}: SignUpMutationParams) => {
  const endpointUrl = (() => {
    if (position === UserType.CLIENT) {
      return '/auth/create-client';
    }

    if (position === UserType.DEVELOPER) {
      return '/auth/create-developer';
    }

    return '/auth/create-pm';
  })();

  const { data } = await axiosClient.post<RefreshTokensResponse>(endpointUrl, {
    email,
    name,
    password,
    description,
    position,
  });

  return data;
};
