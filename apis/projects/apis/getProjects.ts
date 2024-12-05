import { axiosClient } from '@/config';
import { UserType } from '@/types/enums';
import {
  ClientProjectResponse,
  DeveloperProjectResponse,
  PmProjectResponse,
} from '../types';

export const getProjects = async (userType: UserType) => {
  const getUrl = () => {
    switch (userType) {
      case UserType.CLIENT:
        return 'get-client-projects';
      case UserType.DEVELOPER:
        return 'get-developer-projects';
      case UserType.PM:
        return 'get-pm-projects';
    }
  };

  const { data } = await axiosClient.get<
    PmProjectResponse | DeveloperProjectResponse | ClientProjectResponse
  >(`/projects/${getUrl()}`);

  return data;
};
