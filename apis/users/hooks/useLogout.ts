import { setLocalUserTokens } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { logout } from '../apis';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { replace } = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user_profile'],
        exact: false,
      });

      setLocalUserTokens({ accessToken: null, refreshToken: null });

      replace('/auth/sign-in');
    },
  });
};
