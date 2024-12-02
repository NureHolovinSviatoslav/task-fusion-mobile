import { Stack } from 'expo-router';

export default function Root() {
  // TODO: Implement auth
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
