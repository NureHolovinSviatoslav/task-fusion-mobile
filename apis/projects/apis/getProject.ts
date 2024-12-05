import { axiosClient } from '@/config';
import { Project } from '../types';

export const getProject = async (id: number | string) => {
  const { data } = await axiosClient.get<Project>(`/projects/${id}`);

  return data;
};
