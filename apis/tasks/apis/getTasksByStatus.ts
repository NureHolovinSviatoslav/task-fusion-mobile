import { axiosClient } from '@/config';
import { TaskStatus } from '@/types/enums';
import { TasksResponse } from '../types';

export const getTasksByStatus = async (
  projectId: number,
  taskStatus: TaskStatus,
): Promise<TasksResponse> => {
  const response = await axiosClient.post<TasksResponse>(
    '/tasks/get-tasks-by-status',
    { projectId, taskStatus },
  );

  return response.data;
};
