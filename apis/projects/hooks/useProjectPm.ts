import { useQuery } from '@tanstack/react-query';
import { getProjectPmUser } from '../apis';

export const useProjectPm = (projectId: string | number) => {
  return useQuery({
    queryKey: ['project_pm', projectId],
    queryFn: async () => getProjectPmUser(parseInt(projectId.toString())),
  });
};
