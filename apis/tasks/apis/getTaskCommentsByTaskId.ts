import { axiosClient } from '@/config';
import { TaskCommentsResponse } from '../types';

export const getTaskCommentsByTaskId = async (
  taskId: number,
): Promise<TaskCommentsResponse> => {
  const response = await axiosClient.get<TaskCommentsResponse>(
    '/comments/get-comments-by-task-id/' + taskId,
  );

  return response.data;
};
