import { TaskStatus } from '@/types/enums';
import { useQuery } from '@tanstack/react-query';
import { getTasksByStatus } from '../apis';

export const useTasksByStatus = (projectId: string, status: TaskStatus) => {
  return useQuery({
    queryKey: ['project', projectId, 'tasks', status],
    queryFn: () => getTasksByStatus(+projectId, status),
  });
};
