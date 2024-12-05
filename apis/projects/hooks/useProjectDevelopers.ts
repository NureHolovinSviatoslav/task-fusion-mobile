import { useQuery } from '@tanstack/react-query';
import { getProjectDevelopers } from '../apis';

export const useProjectDevelopers = (projectId: string | number) => {
  return useQuery({
    queryKey: ['project_devs', projectId],
    queryFn: async () => getProjectDevelopers(parseInt(projectId.toString())),
  });
};
