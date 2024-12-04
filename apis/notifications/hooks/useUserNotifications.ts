import { useUserProfile } from '@/apis/users';
import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '../apis';

export const useUserNotifications = () => {
  const { data: user } = useUserProfile();

  return useQuery({
    queryKey: ['user_notifications', user],
    queryFn: getNotifications,
    enabled: !!user,
  });
};
