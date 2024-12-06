import { useQuery } from '@tanstack/react-query';
import { getTaskById } from '../apis';

export const useTaskById = (taskId: string) => {
  return useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById(+taskId),
  });
};
