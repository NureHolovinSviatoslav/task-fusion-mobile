import { axiosClient } from '@/config';
import { TaskActionsResponse } from '../types';

export const getTaskActionsByTaskId = async (
  taskId: number,
): Promise<TaskActionsResponse> => {
  const response = await axiosClient.get<TaskActionsResponse>(
    '/actions/get-actions-by-task-id/' + taskId,
  );

  return response.data;
};
