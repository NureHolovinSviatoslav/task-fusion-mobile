import { axiosClient } from '@/config';
import { PasswordlessUser } from '../types';

export const getProjectDevelopers = async (projectId: number) => {
  const response = await axiosClient.post<PasswordlessUser[]>(
    '/projects/get-project-developer-users',
    {
      projectId,
    },
  );

  return response.data;
};
