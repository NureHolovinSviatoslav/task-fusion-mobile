import { axiosClient } from '@/config';
import { PasswordlessUser } from '../types';

export type ProjectPmUserResponse = PasswordlessUser;

export const getProjectPmUser = async (projectId: number) => {
  const response = await axiosClient.post<ProjectPmUserResponse>(
    '/projects/get-project-pm-user',
    {
      projectId,
    },
  );

  return response.data;
};
