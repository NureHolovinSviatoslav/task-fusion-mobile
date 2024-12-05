import { useUserProject } from '@/apis/projects';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Redirect, Slot, useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProjectLayout() {
  const { dismiss } = useRouter();
  const { projectId } = useLocalSearchParams();
  const {
    data: project,
    error,
    isLoading,
  } = useUserProject(Array.isArray(projectId) ? projectId[0] : projectId);

  if (error || (!isLoading && !project)) return <Redirect href="/" />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HStack className="justify-between items-center p-2">
        <Button onPress={() => dismiss()} variant="link" className="w-1/6">
          <ButtonIcon as={ChevronLeft} />
          <ButtonText>Back</ButtonText>
        </Button>
        <Heading className="flex-1 text-center">{project?.title}</Heading>
        <View className="w-1/6" />
      </HStack>
      <Divider />
      <Slot />
    </SafeAreaView>
  );
}
