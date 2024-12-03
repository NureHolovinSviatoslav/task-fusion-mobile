import { setLocalUserTokens } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { signIn } from '../apis';

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const { replace } = useRouter();

  return useMutation({
    mutationFn: signIn,
    onSettled: async (data) => {
      if (!data) return;

      await setLocalUserTokens(data);

      queryClient.invalidateQueries({
        queryKey: ['user_profile'],
        exact: false,
      });

      replace('/(app)/(tabs)');
    },
  });
};
