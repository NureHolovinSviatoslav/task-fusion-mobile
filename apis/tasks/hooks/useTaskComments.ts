import { useQuery } from '@tanstack/react-query';
import { getTaskCommentsByTaskId } from '../apis';

export const useTaskComments = (taskId: string) => {
  return useQuery({
    queryKey: ['task_comments', taskId],
    queryFn: () => getTaskCommentsByTaskId(+taskId),
  });
};
