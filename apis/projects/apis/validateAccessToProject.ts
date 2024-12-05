import { axiosClient } from '@/config';

export type ValidateAccessToProjectResponse = {
  allowed: boolean;
};

export const validateAccessToProject = async (projectId: number | string) => {
  const response = await axiosClient.get<ValidateAccessToProjectResponse>(
    `/projects/validate-access-to-project/${projectId}`,
  );

  return response.data;
};
