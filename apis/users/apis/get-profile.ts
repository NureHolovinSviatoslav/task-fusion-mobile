import { axiosClient } from '@/config';
import { UserType } from '@/types/enums';

type ClientResponse = {
  id: number;
};

type DeveloperResponse = {
  id: number;
};

type PmResponse = {
  id: number;
};

export type GetProfileResponse = {
  id: number;
  email: string;
  name: string;
  userType: UserType;
  description: string;
} & (
  | {
      userType: UserType.CLIENT;
      client: ClientResponse;
    }
  | {
      userType: UserType.DEVELOPER;
      client: DeveloperResponse;
    }
  | {
      userType: UserType.PM;
      client: PmResponse;
    }
);

export const getProfile = async () => {
  const { data } = await axiosClient.get<GetProfileResponse>('/users/profile');

  return data;
};
