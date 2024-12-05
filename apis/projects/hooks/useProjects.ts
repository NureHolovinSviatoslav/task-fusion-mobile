import { useUserProfile } from '@/apis/users';
import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../apis';

export const useProjects = () => {
  const { data: userProfile } = useUserProfile();

  return useQuery({
    queryKey: ['user_projects', userProfile],
    queryFn: () => getProjects(userProfile!.userType),
    enabled: !!userProfile,
  });
};
