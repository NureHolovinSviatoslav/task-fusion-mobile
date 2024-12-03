import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthLayout() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
      }}
    >
      <VStack className="w-4/5 flex-1 items-center justify-center gap-2">
        <Heading size="xl">Task Fusion</Heading>
        <Slot />
      </VStack>
    </SafeAreaView>
  );
}
