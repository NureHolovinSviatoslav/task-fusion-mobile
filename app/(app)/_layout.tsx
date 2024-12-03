import { useUserProfile } from '@/apis/users';
import { Redirect, SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

export default function Root() {
  const { data, isLoading } = useUserProfile();

  useEffect(() => {
    if (!isLoading) SplashScreen.hide();
  }, [isLoading]);

  if (isLoading) return;

  if (!data) return <Redirect href="/auth/sign-in" />;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
