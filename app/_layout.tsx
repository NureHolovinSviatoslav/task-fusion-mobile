import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { queryClient } from '@/config';
import '@/global.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { Slot, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <SafeAreaProvider>
          <Slot />
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
