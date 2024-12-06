import { useQuery } from '@tanstack/react-query';
import { getTaskActionsByTaskId } from '../apis';

export const useTaskActions = (taskId: string) => {
  return useQuery({
    queryKey: ['task_actions', taskId],
    queryFn: () => getTaskActionsByTaskId(+taskId),
  });
};
