import { useUserProfile } from '@/apis/users';
import { useQuery } from '@tanstack/react-query';
import { getProject, validateAccessToProject } from '../apis';

export const useUserProject = (projectId?: string | number) => {
  const { data: profile } = useUserProfile();

  return useQuery({
    queryKey: ['user_projects', profile, projectId],
    queryFn: async () => {
      if (!projectId) throw new Error();

      const { allowed } = await validateAccessToProject(projectId);

      if (!allowed) throw new Error('User isn`t allowed to view this project.');

      return getProject(projectId);
    },
    enabled: !!profile && !!projectId,
  });
};
