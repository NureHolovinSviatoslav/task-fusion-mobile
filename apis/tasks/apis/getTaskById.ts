import { axiosClient } from '@/config';
import { TaskResponse } from '../types';

export const getTaskById = async (taskId: number): Promise<TaskResponse> => {
  const response = await axiosClient.get<TaskResponse>('/tasks/' + taskId);

  return response.data;
};
