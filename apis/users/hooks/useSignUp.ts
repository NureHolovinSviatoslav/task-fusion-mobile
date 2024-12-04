import { setLocalUserTokens } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { signUp } from '../apis';

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const { replace } = useRouter();

  return useMutation({
    mutationFn: signUp,
    onSettled: async (data) => {
      if (!data) return;
      await setLocalUserTokens(data);

      queryClient.clear();

      replace('/(app)/(tabs)');
    },
  });
};
