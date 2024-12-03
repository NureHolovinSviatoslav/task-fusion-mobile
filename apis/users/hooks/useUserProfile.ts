import { getLocalUserTokens } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../apis';

export const useUserProfile = () => {
  const { accessToken } = getLocalUserTokens();

  return useQuery({
    queryKey: ['user_profile', accessToken],
    queryFn: getProfile,
  });
};
