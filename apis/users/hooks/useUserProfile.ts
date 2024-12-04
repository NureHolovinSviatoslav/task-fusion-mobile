import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../apis';

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user_profile'],
    queryFn: getProfile,
  });
};
